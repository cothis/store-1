import styled from '@lib/styled-components';
import notify from '@utils/toastify';
import ax from 'axios';
import axios from '@utils/axios';
import { ERROR_MESSAGE_UNKNOWN, LIKE_MESSAGE, LOGIN_REQUIRED, UNLIKE_MESSAGE } from '@constants/message';
import { useCallback, useState } from 'react';
import { USER_LIKE_QUERY_KEY, useUser } from '@hooks/query/users';
import { useMutation, useQueryClient } from 'react-query';
import { PRODUCT_DETAIL_QUERY_KEY } from '@hooks/query/products';
import useHistory from '@hooks/useHistory';

interface HeartButtonProps {
  like: boolean;
  productId: string;
  className?: string;
}

interface DoLike {
  like: boolean;
}

export default function LikeButton({ like, productId, className }: HeartButtonProps) {
  const [internalLike, setInternalLike] = useState(like);
  const queryClient = useQueryClient();
  const { isError: anonymouse, data: user } = useUser();
  const history = useHistory();
  const doLike = useMutation((data: DoLike) => axios.put(`/api/v1/products/${productId}/like`, data));

  const heartClickHandler = useCallback(() => {
    if (anonymouse) {
      notify('error', LOGIN_REQUIRED);
    } else {
      setInternalLike(!internalLike);
      doLike.mutate(
        { like: !internalLike },
        {
          onSuccess: () => {
            // 상품 상세 cache clear
            queryClient.invalidateQueries(PRODUCT_DETAIL_QUERY_KEY);
            // 고객 좋아요 목록 cache clear
            queryClient.invalidateQueries(USER_LIKE_QUERY_KEY);
            notify(!internalLike ? 'success' : 'warning', !internalLike ? LIKE_MESSAGE : UNLIKE_MESSAGE);
          },
          onError: (e) => {
            setInternalLike(internalLike);
            if (ax.isAxiosError(e)) {
              if (e.response?.status === 401) {
                notify('error', LOGIN_REQUIRED);
                history.replace({ pathname: '/signin', search: { redirect: `/products/${productId}` } });
                return;
              }
            }
            notify('error', ERROR_MESSAGE_UNKNOWN);
          },
        },
      );
    }
  }, [user, anonymouse, internalLike, setInternalLike]);

  return (
    <Button className={className} onClick={heartClickHandler}>
      {internalLike ? <i className="fas fa-heart" /> : <i className="far fa-heart" />}
    </Button>
  );
}

const Button = styled.button`
  width: 45px;
  height: 45px;
  border: 1px solid #cccccc;
  margin-left: auto;
  border-radius: 6px;
  background-color: #ffffff;

  > i {
    color: ${({ theme }) => theme.color.baeminPrimary};
  }
`;
