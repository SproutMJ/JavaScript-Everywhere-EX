import styled from "styled-components";

const Button = styled.button`
    display: block;
    padding: 10px;
    border: none;
    border-radius: 5px;
    color: #555;
    background-color: #0077cc;
    cursor: pointer;
    
    :hover{
        opacity: 0.8;
    }
    
    :active {
        background-color: #005fa3;
    }
`

export default Button