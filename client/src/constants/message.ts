export const SUCCESS_ADD_CART = (title: string, count: number) => {
  return `${title} 상품 ${count}개가 장바구니에 추가되었습니다. 🙌`;
};

export const SEARCH_INPUT_INVALID = '😭 검색어는 2글자 이상 20글자 이하만 가능합니다.';

export const ERROR_MESSAGE_ID = '아이디는 영문, 숫자만 8글자부터 16글자까지 가능합니다.';
export const ERROR_MESSAGE_NAME = '이름은 한 글자 이상 20글자 이하여야 합니다.';
export const ERROR_MESSAGE_EMAIL = '제대로 된 이메일 형식이 아닙니다.';
export const ERROR_MESSAGE_PASSWORD = '비밀번호는 영문, 숫자, 특수문자로 8글자부터 16글자까지 가능합니다.';
export const ERROR_MESSAGE_PASSWORD_DUPLICATE = '비밀번호가 서로 다릅니다.';
