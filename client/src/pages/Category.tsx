import useParams from '@hooks/useParams';

export default function Category() {
  const { id } = useParams();

  return <div>카테고리 페이지, id: {id}</div>;
}
