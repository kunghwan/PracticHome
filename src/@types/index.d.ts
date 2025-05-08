interface User {
  uid?: string; // 유저 ID (Firebase UID 등)
  email?: string; // 이메일
  password?: string; // 비밀번호
  name?: string; // 이름
  tel?: string; // 전화번호
  birth?: string; // 생년월일
  agreeLocation?: boolean; // 위치정보 제공 동의 여부

  // 👇 SNS 관련 추가 필드
  nickname?: string; // 닉네임
  profileImageUrl?: string; // 프로필 이미지 (파일 업로드 시 URL로 저장)
  bio?: string; // 자기소개
}
interface PromiseResult {
  message?: string;
  success?: boolean;
}
