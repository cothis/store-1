import styled from '@lib/styled-components';
import { CSSProperties } from 'react';

export const AgreementWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  text-align: center;
  margin: 0 auto;

  > p {
    margin: 20px 0;
  }

  .checkbox {
    user-select: none;
    margin: 10px 0;
  }

  @media screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    width: 90%;
  }
`;

export const OrderWrapper = styled.div`
  max-width: ${({ theme }) => theme.media.desktop};
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export const DaumPostcodeStyle: CSSProperties = {
  width: '50%',
  position: 'absolute',
  top: '70%',
  left: '75%',
  zIndex: 11,
  transform: 'translate(-100%,-100%)',
};

export const OrderDetailDiv = styled.div`
  padding: 10px 0;
`;

export const OrderForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

export const Modal = styled.div`
  display: ${({ props }) => (props.$modal ? 'block' : 'none')};
`;

export const ModalBackground = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%;
  background-color: black;
  opacity: 0.5;
`;

export const H1 = styled.h1`
  font-size: 1.5rem;
  margin: 5px 0;
`;

export const H2 = styled.h2`
  font-size: 1.3rem;
  padding: 15px 0;
`;

export const Product = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid black;
  user-select: none;
  font-size: 20px;

  &:first-of-type {
    border-top: 1px solid black;
  }

  > .product-info-header {
    flex-basis: 80%;
  }

  > .product-image-wrapper {
    flex-basis: 10%;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 0 5px 0 ${({ theme }) => theme.color.lightblack};

    > a {
      width: 100%;
      overflow: hidden;

      > .product-image {
        width: 100%;
        object-fit: cover;

        &:hover {
          transform: scale(1.1);
          transition: 200ms;
        }
      }
    }

    &:hover {
      box-shadow: 0 0 5px 0 ${({ theme }) => theme.color.baeminDark};

      & ~ .product-title span {
        color: ${({ theme }) => theme.color.baeminPrimary};
      }
    }
  }

  > .product-title {
    flex-basis: 70%;
    display: flex;
    align-items: center;

    span {
      transition: 200ms;
      cursor: pointer;
    }

    span:hover {
      color: ${({ theme }) => theme.color.baeminPrimary};
    }
  }

  > .product-quantity {
    flex-basis: 10%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #d0d0d0;
  }

  > .product-price {
    flex-basis: 10%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #d0d0d0;
  }

  > .product-total-price {
    flex-basis: 10%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #d0d0d0;
  }
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 60px;
  border-bottom: 1px solid #3d3d3d;
  font-size: 18px;

  &:first-child {
    border-top: 1px solid #3d3d3d;
  }

  > .description {
    width: 20%;
    padding-left: 15px;
    background-color: #bababa;
    display: flex;
    align-items: center;
    position: relative;

    &.required::before {
      content: '*';
      position: absolute;
      left: 5px;
      display: block;
      width: 10px;
      height: 10px;
    }
  }

  > .content {
    width: 80%;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;

    padding: 0 10px;

    &.address-wrapper {
      padding: 10px;
    }

    .input-wrapper {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      gap: 5px;
      padding: 10px 0;

      input {
        width: 40%;
        font-size: 1em;

        &.full-width {
          width: 100%;
        }
      }
    }

    div.address-search {
      flex-basis: 100%;
      display: flex;
      gap: 10px;

      button {
        width: 100px;
        padding: 0;
        font-size: 12px;
      }
    }

    div.address {
      flex-basis: 100%;
      display: flex;
      gap: 10px;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.media.medium}) {
    font-size: 14px;

    > .description {
      width: 40%;
    }

    > .content {
      width: 60%;

      .input-wrapper {
        width: 100%;
        padding: 20px 0;
        position: relative;

        input {
          flex-basis: 100%;
          font-size: 1em;
          flex-grow: 1;
        }

        button {
          width: 20%;
        }

        .error-message {
          position: absolute;
          bottom: 7px;
          font-size: 0.9em;
          left: 2px;
        }
      }

      div.address-search {
        flex-basis: 100%;
        display: flex;
        gap: 10px;

        button {
          font-size: 10px;
        }
      }

      div.address {
        flex-basis: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    font-size: 12px;
    min-height: 40px;
  }
`;

export const ButtonWrapper = styled.section`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  width: 30%;
  background-color: ${({ theme }) => theme.color.baeminPrimary};
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.color.inputBorder};
  border-radius: 3px;
  transition: 200ms;

  &:hover {
    background-color: #9ed3fe;
  }

  @media screen and (max-width: ${({ theme }) => theme.media.medium}) {
    width: 70%;
  }

  @media screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    width: 90%;
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.color.red};
  display: none;
  font-size: 12px;

  &.show {
    display: block;
  }
`;

export const DeliveryInfoDiv = styled.div`
  h2 {
    button {
      font-size: 1.1rem;
      margin-left: 10px;
      padding: 10px;
      width: 180px;
    }
  }

  .address-search {
    .input-wrapper {
      padding: 10px 0;
      padding-bottom: 0;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.media.medium}) {
    .address {
      .input-wrapper {
        padding: 0 0 10px;
      }

      .input-wrapper:first-child {
        padding: 0;
      }
    }
  }
`;
