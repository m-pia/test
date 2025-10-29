# Google Git Commit Message Convention

이 문서는 프로젝트의 일관성 있는 Git 커밋 메시지 스타일을 위한 Google의 가이드를 설명합니다.

## 커밋 메시지 구조

커밋 메시지는 다음과 같은 구조를 가집니다.

```
type(scope): subject

body

footer
```

---

### **1. `type`**

커밋의 종류를 나타내며, 아래 중 하나여야 합니다.

-   **feat**: 새로운 기능 추가
-   **fix**: 버그 수정
-   **docs**: 문서 변경 (사용자 대상 문서)
-   **style**: 코드 스타일 변경 (포매팅, 세미콜론 등)
-   **refactor**: 프로덕션 코드 리팩토링
-   **test**: 테스트 코드 추가 또는 수정
-   **chore**: 빌드 작업, 패키지 매니저 설정 등 (프로덕션 코드 변경 없음)
-   **revert**: 이전 커밋으로 되돌리기

### **2. `scope` (선택 사항)**

커밋이 영향을 미치는 코드의 범위를 나타냅니다. 예를 들어, `(auth)`, `(profile)`, `(ui)` 와 같이 특정 모듈이나 컴포넌트 이름을 사용할 수 있습니다.

### **3. `subject`**

커밋에 대한 간결한 요약입니다.

-   명령문, 현재 시제로 작성합니다. ("Add" not "Added")
-   첫 글자는 대문자로 시작합니다.
-   끝에 마침표를 찍지 않습니다.

**좋은 예:** `feat(auth): Add social login functionality`
**나쁜 예:** `added social login`

### **4. `body` (선택 사항)**

-   커밋의 동기와 맥락을 설명합니다.
-   무엇을, 왜 변경했는지 상세히 작성합니다.
-   어떻게 변경했는지는 코드 자체로 설명되어야 하므로, 여기에 장황하게 쓸 필요는 없습니다.

### **5. `footer` (선택 사항)**

-   **Breaking Changes (주요 변경 사항):** 이전 버전과 호환되지 않는 변경 사항이 있을 경우 `BREAKING CHANGE:` 로 시작하는 섹션을 추가합니다.
-   **Closes (이슈 트래킹):** 이 커밋과 관련된 이슈를 닫을 때 `Closes #123` 형식으로 작성합니다.

---

## 예시

### 예시 1: 새로운 기능 추가

```
feat(api): Add endpoint for user profile information

- Add GET /api/users/:id endpoint.
- The endpoint returns user's name, email, and profile picture.
```

### 예시 2: 버그 수정 및 이슈 닫기

```
fix(auth): Prevent crash on invalid login credentials

The application would previously crash if a user entered an incorrect
password. This commit adds proper error handling to the login flow.

Closes #42
```

### 예시 3: 주요 변경 사항이 있는 리팩토링

```
refactor(database): Migrate user schema from v1 to v2

BREAKING CHANGE: The user 'name' field has been split into
'firstName' and 'lastName'. All API clients need to be updated
to reflect this change.
```
