import styled, { css } from "styled-components";

interface IForm {
  type?: "modal" | "regular"; // Define the type for the 'type' prop
}

const Form = styled.form<IForm>`
  ${(props: any) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props: any) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular"
}
export default Form;
