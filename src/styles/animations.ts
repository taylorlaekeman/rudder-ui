import { css } from 'styled-components';

const animations = {
  fadein: css`
    animation: fadein 0.5s;
    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,
  spin: css`
    animation: spin 2s linear infinite;
    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  `,
};

export default animations;
