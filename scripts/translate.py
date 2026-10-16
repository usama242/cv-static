#!/usr/bin/env python3
"""
Zero-Dependency Build-Time Auto-Translator for public/data.json -> data.it.json & data.es.json
Uses ONLY Python's built-in standard library (urllib + json).
Bypasses macOS Homebrew PEP 668 externally-managed-environment completely!
"""

import copy
import json
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE_JSON = ROOT / "public" / "data.json"
TARGET_LANGS = ["it", "es"]


def translate_text(text: str, target_lang: str) -> str:
    """Translates a single string using the free Google Translate GTX API via stdlib urllib."""
    if not text or not text.strip():
        return text

    params = urllib.parse.urlencode({
        "client": "gtx",
        "sl": "en",
        "tl": target_lang,
        "dt": "t",
        "q": text
    })
    url = f"https://translate.googleapis.com/translate_a/single?{params}"
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"}
    )

    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            payload = json.loads(response.read().decode("utf-8"))
            # Combine all translated sentence segments returned in payload[0]
            return "".join(segment[0] for segment in payload[0] if segment[0])
    except Exception as exc:
        print(f"  ⚠️ Warning: Could not translate '{text[:30]}...' ({exc}). Keeping original.")
        return text


def translate_list(items: list[str], target_lang: str) -> list[str]:
    """Translates a list of strings in a single HTTP request using a newline delimiter."""
    if not items:
        return []
    joined = "\n ||| \n".join(items)
    translated_joined = translate_text(joined, target_lang)
    parts = [p.strip() for p in translated_joined.split("|||")]
    if len(parts) == len(items):
        return parts
    # Fallback to individual translation if delimiter splitting shifted
    return [translate_text(i, target_lang) for i in items]


def build_translated_json(source_data: dict, lang: str):
    print(f"🌍 Translating `public/data.json` -> `{lang.upper()}` (Zero-Dependency Stdlib)...")
    data = copy.deepcopy(source_data)

    # 1. Personal Bio, Experience Counter Title & Localized CV Downloads
    if data.get("personal", {}).get("bio"):
        data["personal"]["bio"] = translate_text(data["personal"]["bio"], lang)
    if data.get("experienceCounter", {}).get("title"):
        data["experienceCounter"]["title"] = translate_text(data["experienceCounter"]["title"], lang)

    if lang == "it":
        data["personal"]["resumeDownloads"] = [
            {
                "lang": "it",
                "label": "Italiano",
                "url": "assets/Resume_MohamadUsamaKUNNATHUR_DevOps_Italian.pdf"
            },
            {
                "lang": "en",
                "label": "Inglese",
                "url": "assets/Resume_MohamadUsamaKUNNATHUR_DevOps.pdf"
            },
            {
                "lang": "es",
                "label": "Spagnolo",
                "url": "assets/Resume_MohamadUsamaKUNNATHUR_DevOps_Spanish.pdf"
            }
        ]
    elif lang == "es":
        data["personal"]["resumeDownloads"] = [
            {
                "lang": "es",
                "label": "Español",
                "url": "assets/Resume_MohamadUsamaKUNNATHUR_DevOps_Spanish.pdf"
            },
            {
                "lang": "en",
                "label": "Inglés",
                "url": "assets/Resume_MohamadUsamaKUNNATHUR_DevOps.pdf"
            },
            {
                "lang": "it",
                "label": "Italiano",
                "url": "assets/Resume_MohamadUsamaKUNNATHUR_DevOps_Italian.pdf"
            }
        ]

    # 2. Experiences
    for exp in data.get("experiences", []):
        if exp.get("role"):
            exp["role"] = translate_text(exp["role"], lang)
        if exp.get("period") and "Present" in exp["period"]:
            exp["period"] = exp["period"].replace("Present", "Presente")
        if exp.get("highlights"):
            exp["highlights"] = translate_list(exp["highlights"], lang)
        time.sleep(0.1)

    # 3. Education
    for edu in data.get("education", []):
        if edu.get("program"):
            edu["program"] = translate_text(edu["program"], lang)
        if edu.get("scholarship") and edu["scholarship"].get("text"):
            edu["scholarship"]["text"] = translate_text(edu["scholarship"]["text"], lang)
        if edu.get("scholarship") and edu["scholarship"].get("credentialText"):
            edu["scholarship"]["credentialText"] = translate_text(edu["scholarship"]["credentialText"], lang)
        if edu.get("gpa") and edu["gpa"].get("text"):
            edu["gpa"]["text"] = translate_text(edu["gpa"]["text"], lang)
        if edu.get("highlights"):
            edu["highlights"] = translate_list(edu["highlights"], lang)
        time.sleep(0.1)

    # 4. Skills
    for group in data.get("skills", []):
        if group.get("category"):
            group["category"] = translate_text(group["category"], lang)
        texts = [item.get("text", "") for item in group.get("items", [])]
        translated_texts = translate_list(texts, lang)
        for item, new_txt in zip(group.get("items", []), translated_texts):
            item["text"] = new_txt
        time.sleep(0.1)

    # 5. Projects
    for proj in data.get("projects", []):
        if proj.get("category"):
            proj["category"] = translate_text(proj["category"], lang)
        texts = [item.get("text", "") for item in proj.get("items", [])]
        translated_texts = translate_list(texts, lang)
        for item, new_txt in zip(proj.get("items", []), translated_texts):
            item["text"] = new_txt
        time.sleep(0.1)

    # 6. Interests
    for interest in data.get("interests", []):
        if interest.get("title"):
            interest["title"] = translate_text(interest["title"], lang)
        if interest.get("description"):
            interest["description"] = translate_text(interest["description"], lang)

    out_path = ROOT / "public" / f"data.{lang}.json"
    out_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  ✓ Generated {out_path.relative_to(ROOT)}")


def main():
    if not SOURCE_JSON.exists():
        print(f"❌ Error: {SOURCE_JSON} not found.")
        sys.exit(1)

    source_data = json.loads(SOURCE_JSON.read_text(encoding="utf-8"))
    for lang in TARGET_LANGS:
        build_translated_json(source_data, lang)
    print("\n✅ Success! `public/data.it.json` and `public/data.es.json` are ready.")


if __name__ == "__main__":
    main()