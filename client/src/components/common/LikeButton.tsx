import styled from '@lib/styled-components';
import notify from '@utils/toastify';
import ax from 'axios';
import axios from '@utils/axios';
import { ERROR_MESSAGE_UNKNOWN, LOGIN_REQUIRED } from '@constants/message';
import { useCallback, useState } from 'react';
import { useUser } from '@hooks/query/users';
import { useMutation, useQueryClient } from 'react-query';
import { productDetailQueryKey } from '@hooks/query/products';
import useHistory from '@hooks/useHistory';

interface HeartButtonProps {
  like: boolean;
  productId: string;
}

interface DoLike {
  like: boolean;
}

export default function LikeButton({ like, productId }: HeartButtonProps) {
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
            queryClient.invalidateQueries(productDetailQueryKey(productId));
            // 고객 좋아요 목록 cache clear
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
    <Button onClick={heartClickHandler}>
      {internalLike ? <i className="fas fa-heart" /> : <i className="far fa-heart" />}
    </Button>
  );
}

const Button = styled.button`
  width: 45px;
  height: 45px;
  border: 1px solid #cccccc;
  margin-right: 6px;
  margin-left: auto;
  border-radius: 6px;
  > i {
    color: ${({ theme }) => theme.color.baeminPrimary};
  }
`;
