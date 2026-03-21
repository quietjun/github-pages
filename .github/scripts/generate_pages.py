#!/usr/bin/env python3
"""
generate_pages.py
폴더 구조를 스캔해서 pages.json을 자동 생성.
- index.html, 404.html, _로 시작하는 파일/폴더 제외
- HTML의 <title> 태그를 라벨로 사용 (없으면 파일명)
- 폴더명을 그대로 트리 노드로 사용
"""

import os
import re
import json

# ── 설정 ──────────────────────────────────────────
ROOT_DIR = "."                          # 스캔 루트 (저장소 루트)
OUTPUT_FILE = "pages.json"             # 출력 파일
EXCLUDE_FILES = {"index.html", "404.html"}   # 제외할 파일명
EXCLUDE_DIRS = {".git", ".github", "node_modules", "_site"}  # 제외할 폴더
EXCLUDE_PREFIX = "_"                   # 이 문자로 시작하는 파일/폴더 제외
SCAN_EXTENSIONS = {".html", ".htm"}    # 스캔할 확장자
# ──────────────────────────────────────────────────


def get_title(filepath):
    """HTML 파일에서 <title> 내용 추출, 없으면 파일명 반환."""
    try:
        with open(filepath, encoding="utf-8", errors="ignore") as f:
            content = f.read(4096)  # 앞부분만 읽기
        match = re.search(r"<title[^>]*>(.*?)</title>", content, re.IGNORECASE | re.DOTALL)
        if match:
            title = re.sub(r"<[^>]+>", "", match.group(1)).strip()
            if title:
                return title
    except Exception:
        pass
    # fallback: 파일명(확장자 제거)
    return os.path.splitext(os.path.basename(filepath))[0]


def scan_dir(abs_path, rel_path):
    """디렉토리를 재귀 스캔해서 트리 노드 리스트 반환."""
    entries = sorted(os.scandir(abs_path), key=lambda e: (e.is_file(), e.name.lower()))
    nodes = []

    for entry in entries:
        name = entry.name

        # 제외 조건
        if name.startswith(EXCLUDE_PREFIX):
            continue
        if entry.is_dir() and name in EXCLUDE_DIRS:
            continue

        if entry.is_dir():
            children = scan_dir(entry.path, f"{rel_path}/{name}" if rel_path else name)
            if children:  # 빈 폴더 제외
                nodes.append({
                    "label": name,
                    "children": children
                })

        elif entry.is_file():
            ext = os.path.splitext(name)[1].lower()
            if ext not in SCAN_EXTENSIONS:
                continue
            if name in EXCLUDE_FILES:
                continue

            file_rel = f"{rel_path}/{name}" if rel_path else name
            label = get_title(entry.path)
            nodes.append({
                "label": label,
                "path": file_rel
            })

    return nodes


def main():
    tree = scan_dir(ROOT_DIR, "")
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(tree, f, ensure_ascii=False, indent=2)
    print(f"✅ {OUTPUT_FILE} 생성 완료 — {len(tree)}개 최상위 항목")


if __name__ == "__main__":
    main()
