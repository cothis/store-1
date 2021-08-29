import styled from '@lib/styled-components';
import Board from '@components/Board';

export default function Notice() {
  return (
    <NoticeWrapper>
      <Board header="공지사항" type="notice" id={''} user={undefined} />
    </NoticeWrapper>
  );
}

const NoticeWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.media.desktop};
`;
