#!/usr/bin/env python3
"""Check that every local destination, asset and in-page target exists."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist'
class Document(HTMLParser):
 def __init__(self):
  super().__init__(); self.ids=[]; self.links=[]; self.assets=[]; self.headings=0; self.images=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag=='a' and 'href' in a:self.links.append(a['href'])
  if tag in ('img','script') and 'src' in a:self.assets.append(a['src'])
  if tag=='link' and 'href' in a:self.assets.append(a['href'])
  if tag=='h1':self.headings+=1
  if tag=='img':self.images.append(a)
docs={}
for path in OUT.rglob('*.html'):
 if path.name.startswith('__qa'):continue
 doc=Document();doc.feed(path.read_text());docs[path]=doc
errors=[]
for path,doc in docs.items():
 if doc.headings!=1:errors.append(f'{path}: expected one h1')
 if len(doc.ids)!=len(set(doc.ids)):errors.append(f'{path}: duplicate ids')
 for img in doc.images:
  if 'alt' not in img or not img.get('width') or not img.get('height'):errors.append(f'{path}: image missing dimensions or alt')
 for url in doc.links+doc.assets:
  u=urlsplit(url)
  if u.scheme or u.netloc:continue
  target=OUT/unquote(u.path.lstrip('/')) if u.path.startswith('/') else path.parent/unquote(u.path)
  if not u.path:target=path
  if target.is_dir():target=target/'index.html'
  if not target.exists():errors.append(f'{path.relative_to(OUT)}: missing {url}')
  elif u.fragment and target.suffix=='.html' and target in docs and u.fragment not in docs[target].ids:errors.append(f'{path.relative_to(OUT)}: missing anchor {url}')
data=json.loads((ROOT/'content.json').read_text())
assert len(data['services'])==9 and len(data['locations'])==6
if errors:raise SystemExit('\n'.join(errors))
print(f'Checked {len(docs)} HTML documents: all local links, assets, image metadata, headings and anchors pass.')
