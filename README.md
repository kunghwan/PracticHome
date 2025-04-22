## folder Structure

- src
  - app (page 관련)
  - components (공통적으로 쓰이는 컴포넌트 + 특정 페이지에서 보일 컴포넌트)
    - ui (공통 ui)
      - index.ts
    - features (특정 페이지용 컴포넌트)
      - signup
        - index.ts (여기서 취합해서 내보내기)
  - contextApi
    - zustand
      - index.ts(zustand 전용 취합장)
    - react.context
      - index.ts(react만든 context 전용)
    - provider
      - index.ts(각종 Provider 전용)
  - lib
    - firebase.ts
    - index.ts (firebase만 내보내기 하기)
    - validations.ts / utils.ts (따로 내보내기)
    - **lib에서 가져온 건 데이터베이스 관련 파이어베이스 사용**
    - **lib/validation 에서 가져온 것은 인증관련 함수로 사용**
- hooks
  - api/related
    - kakaomap api
    - tourism api
    - index.ts
- react-query
  - usePost.ts
  - index.ts

폴더 스트럭쳐 (설계한 이유를)
@/components
vite에서는 지원 x

# 취합장 쓰면 좋은 장점

1. 어떤 영역에서 쓰이는지 알 수 있음
2. 하나의 폴더에서 가져오는 것처럼 import 영역이 깔끔해짐 (가독성)
