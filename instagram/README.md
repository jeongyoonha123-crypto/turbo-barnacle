# instagram

게시물 하나당 폴더 하나. 폴더 이름은 `연-월_갈래번호_주제`.

| 폴더 | 갈래 | 게시 제안 | 상태 |
|---|---|---|---|
| `2026-10_사장님노트01_프로필점검` | 사장님 노트 | 10/8(목) 14시 | 제작 완료 |
| `2026-10_동네지도01_내포` | 동네 지도 | 10/10(토) 11시 | 제작 완료, 사진 4장 채우기 |

각 폴더에는 `slides.html`(원본), `slide-NN.png`(1080×1350 결과물), `caption.md`(캡션·게시 정보·DM 틀)가 있습니다.

## 다시 렌더링하기

슬라이드 문구를 고친 뒤 PNG를 다시 만들 때:

```bash
bash instagram/tools/fetch-fonts.sh /tmp/fynd-fonts          # 처음 한 번 (Noto Sans KR / Noto Serif KR)
FONT_CSS=/tmp/fynd-fonts/fonts.css node instagram/tools/render.cjs "instagram/<폴더>/slides.html"
```

`render.cjs`는 Node용 Playwright(Chromium)가 필요합니다. 사진 자리는 점선 박스로 비워 두고, 실제 사진은 Canva에서 채웁니다.

## 디자인 규격

- 가게 시리즈(동네 지도·가게 이야기·소개): 종이 회색 #F0F0F1 + 잉크 #121214, 제목 Noto Serif KR Bold, 본문 Noto Sans KR, 레드 #DD010F는 태그·숫자·CTA에만. 마지막 장은 잉크 블랙 + 레드 CTA
- 블랙 캔버스(사장님 노트·FYND 이야기): 다크 #0A0A0B + 화이트, 배경 리듬은 은은한 격자 / 다크 버건디 / 흰 배경 한 장
- 자세한 규칙은 `CLAUDE.md`의 디자인 항목과 `docs/01_FYND_개요.md`의 인스타그램 운영 섹션
