import { fetchProductDetail } from '@utils/product';

export const formToObject = <T>(form: HTMLFormElement | unknown) => {
  if (!(form instanceof HTMLFormElement)) {
    throw new Error(`form을 HTMLFormElement로 변환할 수 없습니다. 타입을 확인해주세요.\n${form}`);
  }

  try {
    const formData = new FormData(form);
    const result: Record<string, unknown> = {};
    for (const [key, value] of formData) {
      result[key] = value;
    }
    return result as T;
  } catch (err) {
    throw new Error('타입을 변환할 수 없습니다. generic 타입을 확인해주세요.');
  }
};
