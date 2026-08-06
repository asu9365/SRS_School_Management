import os, sys

base = r"d:\XAMPP\htdocs\SRS_Project\frontend\src\modules\administration"
os.makedirs(base, exist_ok=True)

filename = sys.argv[1]
content  = sys.stdin.read()
with open(os.path.join(base, filename), "w", encoding="utf-8") as f:
    f.write(content)
print(f"{filename} written ({len(content)} bytes)")
