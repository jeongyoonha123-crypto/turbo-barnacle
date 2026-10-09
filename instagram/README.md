# instagram

게시물 하나당 폴더 하나. 폴더 이름은 `연-월_갈래번호_주제`.

| 폴더 | 갈래 | 게시 제안 | 상태 |
|---|---|---|---|
| `2026-10_사장님노트01_프로필점검` | 사장님 노트 | 10/14(수) 14시 | 제작 완료 |
| `2026-10_사장님알림판01` | 사장님 알림판 | 10/10(토) 오전 | 제작 완료 (10/7 기준, 출처는 `research.md`) |
| `2026-10_알림판자세히01_경영안정바우처` | 알림판 자세히 | 10/15(목) 14시 | 제작 완료 (10/9 기준, 누리집 캡처 배경) |
| `2026-10_동네지도01_내포` | 동네 지도 | - | **보류** (억지스럽다는 피드백, 10/7) |

각 폴더에는 `slides.html`(원본), `slide-NN.png`(1080×1350 결과물), `caption.md`(캡션·게시 정보·DM 틀)가 있습니다. 알림판처럼 사실 확인이 필요한 게시물은 `research.md`에 출처를 남깁니다.

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
- 사장님 알림판: 표지·점검표·마지막 장은 블랙 캔버스, 소식 장은 흰 바탕 공지문(상단 잉크 띠 + 항목표 + 할 일 상자 + 출처)
- 로고: 첫 장과 마지막 장에만, 왼쪽 위(left 96px, top 40px)에 높이 30px로 작게. 어두운 바탕은 `assets/fynd-logo-white.png`(흰 글자), 흰 바탕은 `assets/fynd-logo.png`(원본)
- 자세한 규칙은 `CLAUDE.md`의 디자인 항목과 `docs/01_FYND_개요.md`의 인스타그램 운영 섹션
