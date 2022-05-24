import styled from "styled-components";
import logo from "../assets/images/logo.png"

export default function Logo() {
    return (
        <ImageContainer>
            <img src={logo} alt="Logo do app TrackIt" />
        </ImageContainer>
    )
}

const ImageContainer = styled.div `
    margin: 68px auto 32px;
    height: 180px;
    width: 180px;
`