import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Login() {
    return (
        <Content>
            <Forms>
                <input placeholder="email"></input>
                <input placeholder="senha"></input>
                <Button type="submit">Entrar</Button>
            </Forms>
            <SignUpLink to="/cadastro">Não tem uma conta? Cadastre-se!</SignUpLink>
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

const SignUpLink = styled(Link)`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 14px;
    color: #52B6FF;
`