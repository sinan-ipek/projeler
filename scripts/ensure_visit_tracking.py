#!/usr/bin/env python3
"""Ensure each GitHub Pages HTML document has exactly one visit tracker."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
TRACKER = '<script src="/projeler/analytics.js?v=20261114-auto"></script>'

# shared-ui.js already loads analytics.js; injecting again is unnecessary.
EXISTING = re.compile(
    r'analytics\.js|shared-ui\.js|data-goatcounter|gc\.zgo\.at/count\.js|'
    r'goatcounter\.com/count', re.IGNORECASE
)
CLOSING_BODY = re.compile(r'</body\s*>', re.IGNORECASE)


def main():
    added, existing, skipped = [], [], []
    for path in sorted(ROOT.rglob('*.html')):
        rel = path.relative_to(ROOT).as_posix()
        if '.git' in path.parts or rel == 'istatistik/index.html':
            skipped.append(rel)
            continue
        original = path.read_text(encoding='utf-8-sig')
        if EXISTING.search(original):
            existing.append(rel)
            continue
        matches = list(CLOSING_BODY.finditer(original))
        if not matches:
            print(f'WARNING: missing closing body tag in {rel}; no unsafe edit attempted')
            skipped.append(rel)
            continue
        match = matches[-1]
        updated = original[:match.start()] + TRACKER + '\n' + original[match.start():]
        path.write_text(updated, encoding='utf-8')
        added.append(rel)
    print(f'Added tracking to {len(added)} files; {len(existing)} already track; {len(skipped)} skipped.')
    for name in added:
        print('ADDED:', name)
    for name in skipped:
        print('SKIPPED:', name)
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
