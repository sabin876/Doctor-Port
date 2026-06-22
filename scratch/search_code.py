import os

search_dir = r'c:\Users\DELL\OneDrive\Desktop\Backend\dr-ulhas-ortho\src'
query = 'MS Ortho'

print(f"Searching for '{query}' in {search_dir}...")

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith(('.js', '.jsx', '.ts', '.tsx', '.json', '.html', '.css')):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if query in content:
                        print(f"Found in: {path}")
                        # print lines
                        lines = content.split('\n')
                        for i, line in enumerate(lines):
                            if query in line:
                                print(f"  Line {i+1}: {line.strip()}")
            except Exception as e:
                pass
