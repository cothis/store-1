import styled from '@lib/styled-components';
import { useCallback, useEffect, useRef, useState, MouseEvent } from 'react';

const LENS_URL = require('@assets/images/lens.gif');

const LENS_WIDTH = 200;
const LENS_HEIGHT = 200;

const ZOOM_WIDTH = 500;
const ZOOM_HEIGHT = 500;

import size from '@constants/size';

interface Props {
  src: string;
}

export default function ZoomImage({ src }: Props) {
  const [show, setShow] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const lensImageRef = useRef<HTMLImageElement>(null);
  const zoomImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (zoomImageRef.current) {
      zoomImageRef.current.style.backgroundImage = `url(${src})`;
    }
  }, [show]);

  const handleMouseEnter = useCallback(() => {
    if (window.innerWidth > size.medium) {
      setShow(true);
    }
  }, [setShow]);
  const handleMouseLeave = useCallback(() => setShow(false), [setShow]);
  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLImageElement>) => {
      if (!show || !imageRef.current) {
        return;
      }

      const { width: iw, height: ih } = imageRef.current;
      const pos = imageRef.current.getBoundingClientRect();
      const [x, y] = [e.clientX - pos.left, e.clientY - pos.top];

      // 렌즈 크기
      const hw = LENS_WIDTH / 2;
      const hh = LENS_HEIGHT / 2;

      // 렌즈 좌표
      let left = 0;
      let top = 0;

      if (x - hw <= 0) {
        // 왼쪽 충돌
        left = 0;
      } else if (x + hw >= iw) {
        // 오른쪽 충돌
        left = iw - LENS_WIDTH;
      } else {
        left = x - hw;
      }

      if (y - hh <= 0) {
        // 위 충돌
        top = 0;
      } else if (y + hh >= ih) {
        // 아래 충돌
        top = ih - LENS_HEIGHT;
      } else {
        top = y - hh;
      }

      if (lensImageRef.current) {
        lensImageRef.current.style.transform = `translate(${left}px, ${top}px)`;
      }
      if (zoomImageRef.current) {
        const bw = (ZOOM_WIDTH * iw) / LENS_WIDTH;
        const bh = (ZOOM_HEIGHT * ih) / LENS_HEIGHT;
        const zl = (ZOOM_WIDTH / LENS_WIDTH) * left;
        const zt = (ZOOM_HEIGHT / LENS_HEIGHT) * top;
        zoomImageRef.current.style.backgroundPosition = `-${zl}px -${zt}px`;
        zoomImageRef.current.style.backgroundSize = `${bw}px ${bh}px`;
      }
    },
    [show, imageRef, lensImageRef, zoomImageRef],
  );

  return (
    <Container>
      <ImageContainer onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ProductImage ref={imageRef} src={src} alt="상품 이미지" />
        {/* @ts-ignore */}
        {show && <LensImage ref={lensImageRef} />}
        {show && <ZoomedImage ref={zoomImageRef} />}
      </ImageContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;

  max-width: 473px;
  width: 45%;
  max-height: 100%;
  @media (max-width: ${({ theme }) => theme.media.medium}) {
    width: 90%;
    margin-bottom: 5%;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ProductImage = styled.img`
  width: 100%;
  background-color: red;
`;

const LensImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${LENS_WIDTH}px;
  height: ${LENS_HEIGHT}px;
  background-image: url(${LENS_URL});
`;

const ZoomedImage = styled.img`
  position: absolute;
  top: 0;
  right: -${ZOOM_WIDTH + 15}px;
  z-index: 10;
  width: ${ZOOM_WIDTH}px;
  height: ${ZOOM_HEIGHT}px;
  border: 1px solid black;
  background-repeat: no-repeat;
`;
