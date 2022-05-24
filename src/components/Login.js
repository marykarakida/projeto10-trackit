import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from  'react-loader-spinner';
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function Login() {
    const navigate = useNavigate();
    const { setUserProfilePicture, setUserToken } = useContext(UserContext);

    const [areInputFieldsDisabled, setAreInputFieldsDisabled] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function loginToApp(event) {
        event.preventDefault();
        setAreInputFieldsDisabled(true);

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", {
            email,
            password
        });
        promise.then (({data} )=> {
            const { image, token} = data;
            setUserProfilePicture(image);
            setUserToken(token);
            navigate("/hoje");
        })
        promise.catch(() => {
            alert("O usuário ou a senha estão incorretos.");
            setAreInputFieldsDisabled(false);
        })
    }

    function showFormsState() {
        if (areInputFieldsDisabled) {
            return (
                <Forms disabled>
                    <input required type="email" placeholder="email" value={email} ></input>
                    <input required type="password" placeholder="senha" value={password} ></input>
                    <Button type="submit" disabled ><ThreeDots color="#FFFFFF" height={20} width={50} /></Button>
                </Forms>
            )
        } else {
            return (
                <Forms onSubmit={loginToApp}>
                    <input required type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} ></input>
                    <input required type="password" placeholder="senha" value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                    <Button type="submit">Entrar</Button>
                </Forms>
        )}
    }

    const forms = showFormsState();

    return (
        <Content>
            {forms}
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
        background-color: ${props => props.disabled ? "#F2F2F2" : "#FFFFFF" };
        height: 44px;
        width: 100%;
        pointer-events: ${props => props.disabled ? "none" : "initial" }
    }

    input::placeholder {
        font-size: 20px;
        color: #DBDBDB;
    }
`

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3px 0 24px;
    border: transparent;
    border-radius: 4px;
    height: 44px;
    width: 100%;
    background: #52B6FF;
    opacity: ${props => props.disabled ? 0.7 : 1 };
    font-size: 20px;
    color: #FFFFFF;
    cursor: pointer;
`

const SignUpLink = styled(Link)`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 14px;
    color: #52B6FF;
`