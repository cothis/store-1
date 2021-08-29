export const SUCCESS_ADD_CART = (title: string, count: number) => {
  return `${title} 상품 ${count}개가 장바구니에 추가되었습니다. 🙌`;
};

export const SEARCH_INPUT_INVALID = '😭 검색어는 2글자 이상 20글자 이하만 가능합니다.';

export const LOGIN_REQUIRED = '😭 로그인 후 이용해주세요.';
export const ERROR_MESSAGE_ID = '아이디는 영문, 숫자만 8글자부터 16글자까지 가능합니다.';
export const ERROR_MESSAGE_NAME = '이름은 한 글자 이상 10글자 이하여야 합니다.';
export const ERROR_MESSAGE_EMAIL = '제대로 된 이메일 형식이 아닙니다.';
export const ERROR_MESSAGE_PASSWORD = '비밀번호는 영문, 숫자, 특수문자로 8글자부터 16글자까지 가능합니다.';
export const ERROR_MESSAGE_PASSWORD_DUPLICATE = '비밀번호가 서로 다릅니다.';

export const INPUT_REQUIRED = '⚠️ 필수 입력 사항을 입력해 주십시오.';
export const SUCCESS_BOARD_POST = '🎉 성공적으로 작성을 완료하였습니다.';

export const ERROR_DUPLICATED = '중복된 아이디 혹은 중복된 이메일입니다.';
export const ERROR_MESSAGE_UNKNOWN = '알 수 없는 에러가 발생했습니다.';
