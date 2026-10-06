#!/usr/bin/env bash
# Noto Sans KR(400/500/700/900)과 Noto Serif KR(700)을 내려받고 로컬 @font-face CSS를 만든다.
# 사용법: bash instagram/tools/fetch-fonts.sh <폰트 폴더>
set -euo pipefail
dir="${1:?폰트 폴더를 지정하세요}"
mkdir -p "$dir"
css_url="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&family=Noto+Serif+KR:wght@700"
# 기본 curl User-Agent로 요청하면 구글 폰트가 분할되지 않은 TTF를 내려준다.
curl -sS "$css_url" | python3 -c '
import re, subprocess, sys
d = sys.argv[1]
out = []
for b in re.findall(r"@font-face\s*{(.*?)}", sys.stdin.read(), re.S):
    fam = re.search(r"font-family:\s*\x27([^\x27]+)\x27", b).group(1)
    w = re.search(r"font-weight:\s*(\d+)", b).group(1)
    url = re.search(r"url\((https://[^)]+)\)", b).group(1)
    fn = fam.replace(" ", "") + "-" + w + ".ttf"
    subprocess.run(["curl", "-sS", "-o", d + "/" + fn, url], check=True)
    out.append("@font-face{font-family:\x27%s\x27;font-weight:%s;font-style:normal;src:url(\x27%s\x27) format(\x27truetype\x27);}" % (fam, w, fn))
open(d + "/fonts.css", "w").write("\n".join(out) + "\n")
print(d + "/fonts.css")
' "$dir"
