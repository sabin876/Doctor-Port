import os
import re
from pathlib import Path

dist_dir = Path('c:/Users/DELL/OneDrive/Desktop/Dr Ulhas/Doctor-Port/dist')
html_files = list(dist_dir.glob('**/*.html'))

print(f"Total HTML files generated: {len(html_files)}")

zero_opacity_count = 0
empty_root_count = 0

for hf in html_files:
    content = hf.read_text(encoding='utf-8')
    rel = hf.relative_to(dist_dir)
    
    if '<div id="root"></div>' in content or '<div id="root">\n</div>' in content:
        print(f"WARNING: Empty root in {rel}")
        empty_root_count += 1
        
    zero_ops = re.findall(r'style="[^"]*opacity:\s*0[;"][^"]*"', content)
    if zero_ops:
        zero_opacity_count += len(zero_ops)
        print(f"WARNING: {len(zero_ops)} opacity:0 matches in {rel}")

if zero_opacity_count == 0 and empty_root_count == 0:
    print("SUCCESS: 100% of HTML files have rich rendered content and ZERO opacity:0 elements!")
else:
    print(f"Summary: {zero_opacity_count} zero opacity elements, {empty_root_count} empty roots found.")
