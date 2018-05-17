import styled from 'styled-components';

export const Button = styled.button`
  border: 0;
  cursor: pointer;
  background: none;
  color: #965679;
  font-weight: 500;
  padding: 0.5rem 0;
  margin: 0;
  background-color: rgba(255, 255, 255, 0.5);
  transition: background-color 0.2s;
  border: 2px solid #fff;

  & svg {
    vertical-align: middle;
    transform: translate3d(0, 0, 0);
    transition: transform 0.3s;
  }

  &[disabled] {
    color: #aaa;
    cursor: default;
    pointer-events: none;
  }

  &:hover,
  &:active {
    border-color: #965679;
  }
`;

export const NextButton = Button.extend`
  float: right;
  padding-left: 0.75rem;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  &:hover,
  &:focus {
    & svg {
      transform: translate3d(2px, 0, 0);
    }
  }
`;

export const PrevButton = Button.extend`
  float: left;
  padding-right: 0.75rem;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;

  &:hover,
  &:focus {
    & svg {
      transform: translate3d(-2px, 0, 0);
    }
  }
`;
