#!/usr/bin/env python3
"""
Zero-Dependency Build-Time Auto-Translator for public/data.json
Reads target languages dynamically from `public/data.json`'s "languages" key.
Uses ONLY Python's built-in standard library (urllib + json).
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

    # 1. Personal Info
    personal = data.get("personal", {})
    if personal.get("title"):
        personal["title"] = translate_text(personal["title"], lang)
    if personal.get("heroTitleLine1"):
        personal["heroTitleLine1"] = translate_text(personal["heroTitleLine1"], lang)
    if personal.get("heroTitleLine2"):
        personal["heroTitleLine2"] = translate_text(personal["heroTitleLine2"], lang)
    if personal.get("bio"):
        personal["bio"] = translate_text(personal["bio"], lang)

    # Localize resume download labels while preserving exact array structure and order
    if isinstance(personal.get("resumeDownloads"), list):
        for d in personal["resumeDownloads"]:
            if d.get("label"):
                d["label"] = translate_text(d["label"], lang)

    # 2. Overview & Highlight Card
    overview = data.get("overview", {})
    if overview.get("eyebrow"):
        overview["eyebrow"] = translate_text(overview["eyebrow"], lang)
    if overview.get("title"):
        overview["title"] = translate_text(overview["title"], lang)

    highlight = data.get("highlightCard", {})
    if highlight.get("badge"):
        highlight["badge"] = translate_text(highlight["badge"], lang)
    if highlight.get("unit"):
        highlight["unit"] = translate_text(highlight["unit"], lang)
    if highlight.get("description"):
        highlight["description"] = translate_text(highlight["description"], lang)
    if highlight.get("cta"):
        highlight["cta"] = translate_text(highlight["cta"], lang)

    # 3. Experience Counter
    exp_counter = data.get("experienceCounter", {})
    if exp_counter.get("title"):
        exp_counter["title"] = translate_text(exp_counter["title"], lang)
    if exp_counter.get("description"):
        exp_counter["description"] = translate_text(exp_counter["description"], lang)

    # 4. Experiences
    for exp in data.get("experiences", []):
        if exp.get("role"):
            exp["role"] = translate_text(exp["role"], lang)
        if exp.get("period") and "Present" in exp["period"]:
            exp["period"] = exp["period"].replace("Present", "Presente" if lang in ["it", "es"] else "Présent" if lang == "fr" else "Present")
        if exp.get("highlights"):
            exp["highlights"] = translate_list(exp["highlights"], lang)
        time.sleep(0.05)

    # 5. Education
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
        time.sleep(0.05)

    # 6. Skills
    for group in data.get("skills", []):
        if group.get("category"):
            group["category"] = translate_text(group["category"], lang)
        texts = [item.get("text", "") for item in group.get("items", [])]
        translated_texts = translate_list(texts, lang)
        for item, new_txt in zip(group.get("items", []), translated_texts):
            item["text"] = new_txt
        time.sleep(0.05)

    # 7. Projects
    for proj in data.get("projects", []):
        if proj.get("category"):
            proj["category"] = translate_text(proj["category"], lang)
        texts = [item.get("text", "") for item in proj.get("items", [])]
        translated_texts = translate_list(texts, lang)
        for item, new_txt in zip(proj.get("items", []), translated_texts):
            item["text"] = new_txt
            if item.get("type"):
                item["type"] = translate_text(item["type"], lang)
        time.sleep(0.05)

    # 8. Interests
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

    # Discover target languages from data.json or fallback
    target_langs = []
    if "languages" in source_data and isinstance(source_data["languages"], list):
        for l in source_data["languages"]:
            code = l["code"] if isinstance(l, dict) else l
            if code and code != "en":
                target_langs.append(code)
    else:
        target_langs = ["it", "es"]

    if not target_langs:
        print("ℹ️ Only English specified in `languages`. No other language files to build.")
        return

    for lang in target_langs:
        build_translated_json(source_data, lang)
    print(f"\n✅ Success! Generated translated json files for: {', '.join(target_langs)}.")


if __name__ == "__main__":
    main()