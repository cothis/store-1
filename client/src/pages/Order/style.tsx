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
  padding: 1rem;
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
  .product-wrapper {
    padding: 0.5rem 1rem;
    background-color: white;
    border-radius: 6px;
    box-shadow: rgb(0 0 0 / 15%) 0px 0px 10px;
  }
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
  font-size: 1.2rem;
  margin: 1em 0;
  font-weight: bold;
`;

export const H2 = styled.h2`
  font-size: 1.2rem;
  padding: 1em 0;
`;

export const Product = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr 1fr;
  grid-gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 0;
  user-select: none;

  &:first-of-type {
    border-bottom: 1px solid #555;
  }
  &:nth-child(n + 3) {
    border-top: 1px solid #ddd;
  }
  .mobile-price {
    display: none;
  }
  > .product-info-header {
    grid-column-start: 1;
    grid-column-end: 3;
  }

  > .product-image-wrapper {
    overflow: hidden;
    border-radius: 6px;

    .product-image {
      width: 100%;
      object-fit: cover;
    }
  }

  > .product-quantity {
    grid-column-start: 3;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    grid-template-columns: repeat(4, 1fr);
    &:first-of-type {
      display: none;
    }
    .none-mobile {
      display: none !important;
    }
    .product-title {
      grid-column-start: 2;
      grid-column-end: 5;
    }
    .mobile-price {
      display: block;
      grid-column-start: 1;
      grid-column-end: 3;
    }
    .product-total-price {
      text-align: right;
      grid-column-start: 3;
      grid-column-end: 5;
    }
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
  border-bottom: 1px solid #ddd;

  &:first-child {
    border-top: 1px solid #ddd;
  }

  > .description {
    width: 20%;
    padding-left: 15px;
    background-color: #fcfcf7;
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
        padding: 2em 0;
        position: relative;

        input {
          flex-basis: 100%;
          font-size: 1em;
          flex-grow: 1;
        }

        .error-message {
          height: 2em;
          position: absolute;
          bottom: 0;
          font-size: 0.9em;
          left: 0;
        }
      }

      div.address-search {
        flex-basis: 100%;
        display: flex;
        gap: 10px;
        input {
          width: 100%;
        }

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
  > button {
    width: 100%;
    max-width: 300px;
  }
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.color.baeminPrimary};
  padding: 0.6em;
  color: white;
  border-radius: 6px;

  &:hover {
    opacity: 0.8;
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.color.red};
  display: none;
  font-size: 12px;

  &.show {
    ${({ theme }) => theme.flexCenter};
  }
`;

export const DeliveryInfoDiv = styled.div`
  h2 {
    button {
      font-size: 0.8rem;
      margin-left: 10px;
    }
  }

  .address-search {
    .input-wrapper {
      padding: 10px 0;
      padding-bottom: 0;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.media.medium}) {
    .address-search {
      .input-wrapper {
        flex-direction: column;
      }
    }
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
