import {css} from "styled-components";

export const  WrapperStyles = css`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  max-width: var(--max-width);
  margin-top: 6rem;
`;

export const SubmitButtonStyles = css`
    padding: .7rem 2rem;
    border: 1px solid #13aa52;
    border-radius: 5px;

    margin-top: auto;
    box-shadow: rgba(0, 0, 0, .1) 0 2px 4px 0;
    outline: none;
    font-size: .9em;
    color: #fff;
    background-color: #13aa52;
    cursor: pointer;

    :hover {
      box-shadow: rgba(0, 0, 0, .15) 0 3px 9px 0;
    }
`;