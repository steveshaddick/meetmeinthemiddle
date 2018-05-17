import { css } from 'styled-components';

const styledMediaQuery = {
  minTablet: (...args) => css`
    @media (min-width: 768px) {
      ${css(...args)};
    }
  `,
};

export default styledMediaQuery;
