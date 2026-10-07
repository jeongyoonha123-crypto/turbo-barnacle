# instagram

게시물 하나당 폴더 하나. 폴더 이름은 `연-월_갈래번호_주제`.

| 폴더 | 갈래 | 게시 제안 | 상태 |
|---|---|---|---|
| `2026-10_사장님노트01_프로필점검` | 사장님 노트 | 10/8(목) 14시 | 제작 완료 |
| `2026-10_사장님알림판01` | 사장님 알림판 | 10/10(토) 오전 | 제작 완료 (10/7 기준, 출처는 `research.md`) |
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

공통 규칙은 `instagram/DESIGN.md`, 공통 스타일은 `instagram/tools/fynd-cards.css`. 새 게시물은 이 CSS를 불러 쓴다.

- 모든 카드: 여백 84px, 위 눈썹 라벨(빨간 점 + 고정폭 라벨), 아래 바(FYND + 고정폭 쪽번호), 레드 #DD010F 하나
- 사장님 대상 시리즈(FYND 이야기·사장님 노트·사장님 알림판): 다크 기본, 격자/버건디/흰 카드로 리듬, 고정 클로징
- 가게 시리즈(가게 소개·이야기): 종이 회색 + 명조 제목 + 정보표, 마지막 장 잉크 + 빨간 CTA
