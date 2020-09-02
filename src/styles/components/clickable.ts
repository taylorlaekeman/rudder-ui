import { css } from 'styled-components';

const buttons = {
  button: css`
    align-items: center;
    appearance: none;
    background-color: ${({ theme }) => theme.colours.background.button.normal};
    border: none;
    border-radius: 4px;
    color: ${({ theme }) => theme.colours.text.button.normal};
    cursor: pointer;
    display: flex;
    padding: 8px 16px;
    text-decoration: none;
    width: max-content;

    ${({ theme }) => theme.fonts.button}

    &:focus, &:hover {
      background-color: ${({ theme }) => theme.colours.background.button.focus};
      color: ${({ theme }) => theme.colours.text.button.focus};
      outline: none;

      svg {
        fill: ${({ theme }) => theme.colours.icon.focus};
      }
    }
  `,
  link: css`
    align-items: flex-start;
    appearance: none;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    text-decoration: none;

    ${({ theme }) => theme.fonts.link}

    &:focus, &:hover {
      text-decoration: underline;
    }
  `,
};

export default buttons;
