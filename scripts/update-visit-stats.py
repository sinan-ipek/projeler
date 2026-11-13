#!/usr/bin/env python3
"""Collect aggregated daily GoatCounter page views without publishing an API token."""
import datetime as dt
import json
import os
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urlsplit
from urllib.request import Request, urlopen

TOKEN = os.environ.get("GOATCOUNTER_API_TOKEN", "").strip()
if not TOKEN:
    raise SystemExit("Missing GOATCOUNTER_API_TOKEN GitHub Actions secret.")

BASE = "https://sinan-ipek.goatcounter.com"
NOW = dt.datetime.now(dt.timezone.utc)
start = dt.datetime(2026, 10, 1, tzinfo=dt.timezone.utc)
end = (NOW + dt.timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0)


def get_json(url):
    request = Request(url, headers={
        "Authorization": "Bearer " + TOKEN,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "User-Agent": "GitHubVisitStats/1.1",
    })
    try:
        with urlopen(request, timeout=35) as response:
            return json.load(response)
    except HTTPError as exc:
        # Never print the token. Only print a shortened, sanitized server message.
        try:
            detail = exc.read(500).decode("utf-8", errors="replace")
        except Exception:
            detail = ""
        detail = " ".join(detail.replace(TOKEN, "[REDACTED]").split())[:350]
        path = urlsplit(url).path
        raise RuntimeError(
            f"GoatCounter HTTP {exc.code} for {path}. "
            f"Server response: {detail or '(empty)'}"
        ) from None
    except URLError as exc:
        raise RuntimeError("Could not reach GoatCounter: " + str(exc.reason)) from None
    except json.JSONDecodeError as exc:
        raise RuntimeError("GoatCounter returned non-JSON content: " + str(exc)) from None


def collect():
    # First verify the host and API token independently of the statistics route.
    try:
        get_json(BASE + "/api/v0/me")
    except RuntimeError as exc:
        raise SystemExit(
            "GoatCounter API connection failed. Check the account site URL "
            "and API token site access. " + str(exc)
        ) from None

    excluded = set()
    pages = []
    for _ in range(50):
        params = [
            ("start", start.strftime("%Y-%m-%dT%H:%M:%SZ")),
            ("end", end.strftime("%Y-%m-%dT%H:%M:%SZ")),
            ("group", "day"),
            ("limit", "100"),
        ] + [("exclude_paths", str(i)) for i in sorted(excluded)]
        url = BASE + "/api/v0/stats/hits?" + urlencode(params)
        payload = get_json(url)
        hits = payload.get("hits")
        if not isinstance(hits, list):
            raise RuntimeError("GoatCounter returned an unexpected stats response.")
        pages.extend(hits)
        if not payload.get("more"):
            break
        before = len(excluded)
        for hit in hits:
            if hit.get("path_id") is not None:
                excluded.add(hit["path_id"])
        if len(excluded) == before:
            raise RuntimeError("GoatCounter pagination cannot advance.")
    else:
        raise RuntimeError("Page limit reached; refusing partial statistics.")

    output = []
    all_dates = {}
    for hit in pages:
        if hit.get("event"):
            continue
        path = str(hit.get("path", ""))
        title = str(hit.get("title") or path)
        days = {}
        for point in hit.get("stats", []):
            day = str(point.get("day", ""))[:10]
            if len(day) == 10:
                count = int(point.get("daily") or 0)
                if count:
                    days[day] = days.get(day, 0) + count
                    all_dates[day] = all_dates.get(day, 0) + count
        output.append({"path": path, "title": title, "daily": days})

    output.sort(key=lambda p: sum(p["daily"].values()), reverse=True)
    data = {
        "updated_at": NOW.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "first_day": start.date().isoformat(),
        "total_daily": dict(sorted(all_dates.items())),
        "pages": output,
    }
    destination = Path("istatistik/data.json")
    destination.parent.mkdir(exist_ok=True)
    destination.write_text(
        json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n",
        encoding="utf-8",
    )
    print(f"Collected {len(output)} pages, {sum(all_dates.values())} pageviews")


if __name__ == "__main__":
    try:
        collect()
    except (RuntimeError, ValueError) as exc:
        raise SystemExit(str(exc)) from None
