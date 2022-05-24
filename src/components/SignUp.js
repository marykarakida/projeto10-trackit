import { Link } from "react-router-dom";
import styled from "styled-components";

export default function SignUp() {
    return (
        <Content>
            <Forms>
                <input placeholder="email"></input>
                <input placeholder="senha"></input>
                <input placeholder="nome"></input>
                <input placeholder="foto"></input>
                <Button type="submit">Cadastrar</Button>
            </Forms>
            <LoginLink to="/">Já tem uma conta? Faça login!</LoginLink>
        </Content>
    )
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 32px auto;
    padding: 0 36px;
    max-width: 372px;
`

const Forms = styled.form`
    width: 100%;

    input {
        margin: 3px 0;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding: 6px;
        background: #FFFFFF;
        height: 44px;
        width: 100%;
    }

    input::placeholder {
        font-size: 20px;
        color: #DBDBDB;
    }
`

const Button = styled.button`
    margin: 3px 0 24px;
    border: transparent;
    border-radius: 4px;
    height: 44px;
    width: 100%;
    background: #52B6FF;
    font-size: 20px;
    color: #FFFFFF;
`

const LoginLink = styled(Link)`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 14px;
    color: #52B6FF;
`