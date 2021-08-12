import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
    ${reset};
    * {
        box-sizing:border-box;
        user-select: none;
    }
    a {
        text-decoration: none;
    }
    button {
        border: none;
        background: none;
        margin: 0;
        padding: 0;
        color: inherit;
        font: inherit;
        &:hover {
            pointer: cursor;
        }
    }
    input,
    button,
    select,
    textarea {
        &:focus {
            outline: none;
        }
    }
`;
