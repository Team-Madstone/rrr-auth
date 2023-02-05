export const VALIDATE_MESSAGE = {
  Required: (field: string) => `${field} 필드가 누락되었습니다.`,
  Email: "올바른 이메일 형식이 아닙니다.",
  Min: (field: string, min: number) =>
    `${field} 필드의 최소 길이는 ${min}자 입니다.`,
  Max: (field: string, max: number) =>
    `${field} 필드의 최대 길이는 ${max}자 입니다.`,
};
