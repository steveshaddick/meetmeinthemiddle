import styled from 'styled-components';

import { darkPurple, purple } from './colours';

export const Button = styled.button`
  border: 0;
  cursor: pointer;
  background: none;
  color: ${purple};
  font-weight: 500;
  padding: 0.5rem 0 0.25rem;
  margin: 0;
  background-color: rgba(255, 255, 255, 0.5);
  transition: background-color 0.2s;
  border: 2px solid #fff;

  & svg {
    vertical-align: middle;
    transform: translate3d(0, 0, 0);
    transition: transform 0.3s;
  }

  &:disabled {
    color: #aaa;
    cursor: default;
    pointer-events: none;
  }

  &:enabled {
    &:hover,
    &:active {
      border-color: ${purple};
    }

    &:focus {
      border-color: ${purple};
      outline: none;
    }
  }
`;

export const NextButton = Button.extend`
  float: right;
  padding-left: 0.75rem;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  &:enabled {
    &:hover,
    &:active {
      & svg {
        transform: translate3d(2px, 0, 0);
      }
    }
  }
`;

export const PrevButton = Button.extend`
  float: left;
  padding-right: 0.75rem;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;

  &:enabled {
    &:hover,
    &:active {
      & svg {
        transform: translate3d(-2px, 0, 0);
      }
    }
  }
`;

export const Link = styled.a`
  color: ${purple};
  position: relative;
  text-decoration: none;

  transition: 300ms color;

  &:after {
    content: '';
    display: block;
    position: absolute;
    background-color: ${purple};
    width: 100%;
    height: 1px;
    bottom: 1px;
    right: 0;

    transition: 300ms width, 300ms background-color;
  }

  &:hover,
  &:active {
    color: ${darkPurple};
    &:after {
      background-color: ${darkPurple};
      width: 0%;
    }
  }

  &:focus {
    outline-color: ${darkPurple};
  }
`;
