import os
from pypdf import PdfReader

files = [f for f in os.listdir('.') if f.endswith('.pdf')]
for f in files:
    print(f"--- START {f} ---")
    try:
        reader = PdfReader(f)
        for page in reader.pages:
            print(page.extract_text())
    except Exception as e:
        print(f"Error reading {f}: {e}")
    print(f"--- END {f} ---")
