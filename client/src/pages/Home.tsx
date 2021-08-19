import styled from '@lib/styled-components';
import Carousel, { ICarouselItem } from '@components/Carousel';
import bannerOne from '@assets/images/banner_one.gif';
import bannerTwo from '@assets/images/banner_two.gif';
import bannerThree from '@assets/images/banner_three.gif';

const slideBanner: ICarouselItem[] = [
  {
    imageUrl: bannerOne,
    url: '/products/1',
    title: '텀블러백',
  },
  {
    imageUrl: bannerTwo,
    url: '/products/2',
    title: '맥주짠 세트',
  },
  {
    imageUrl: bannerThree,
    url: '/products/3',
    title: '흑심있어요',
  },
];

const Home = () => {
  return (
    <HomeContents>
      <Carousel items={slideBanner} carouselWidth={'100vw'} />
    </HomeContents>
  );
};

const HomeContents = styled.div``;

export default Home;
