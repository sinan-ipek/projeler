#!/usr/bin/env python3
"""Collect aggregated daily page views without publishing an API token."""
import datetime as dt
import json
import os
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

TOKEN = os.environ.get("GOATCOUNTER_API_TOKEN", "").strip()
if not TOKEN:
    raise SystemExit("Missing GOATCOUNTER_API_TOKEN GitHub Actions secret.")
NOW = dt.datetime.now(dt.timezone.utc)
start = dt.datetime(2026, 10, 1, tzinfo=dt.timezone.utc)
end = (NOW + dt.timedelta(days=1)).replace(hour=0,minute=0,second=0,microsecond=0)
root = "https://sinan-ipek.goatcounter.com/api/v0/stats/hits"
excluded = set()
pages = []
for _ in range(50):
    params = [
        ("start",start.strftime("%Y-%m-%dT%H:%M:%SZ")),
        ("end",end.strftime("%Y-%m-%dT%H:%M:%SZ")),
        ("group","day"), ("limit","100")
    ] + [("exclude_paths",str(i)) for i in sorted(excluded)]
    request = Request(root + "?" + urlencode(params),
        headers={"Authorization":"Bearer "+TOKEN,"Accept":"application/json"})
    with urlopen(request, timeout=35) as response:
        payload = json.load(response)
    hits = payload.get("hits")
    if not isinstance(hits,list):
        raise ValueError("GoatCounter returned an unexpected API response")
    pages.extend(hits)
    if not payload.get("more"):
        break
    old = len(excluded)
    for hit in hits:
        if hit.get("path_id") is not None:
            excluded.add(hit["path_id"])
    if len(excluded)==old:
        raise ValueError("GoatCounter pagination cannot advance")
else:
    raise ValueError("Page limit reached; refusing partial statistics")
output = []
all_dates = {}
for h in pages:
    if h.get("event"):
        continue
    path = str(h.get("path",""))
    title = str(h.get("title") or path)
    days = {}
    for point in h.get("stats", []):
        day = str(point.get("day",""))[:10]
        if len(day)==10:
            count = int(point.get("daily") or 0)
            if count:
                days[day] = days.get(day,0)+count
                all_dates[day] = all_dates.get(day,0)+count
    output.append({"path":path,"title":title,"daily":days})
output.sort(key=lambda p:sum(p["daily"].values()),reverse=True)
data = {
    "updated_at":NOW.strftime("%Y-%m-%dT%H:%M:%SZ"),
    "first_day":start.date().isoformat(),
    "total_daily":dict(sorted(all_dates.items())),
    "pages":output
}
destination = Path("istatistik/data.json")
destination.parent.mkdir(exist_ok=True)
destination.write_text(json.dumps(data,ensure_ascii=False,separators=(",",":"))+"\n",encoding="utf-8")
print(f"Collected {len(output)} pages, {sum(all_dates.values())} pageviews")
