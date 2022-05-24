import styled from "styled-components";

export default function Logo() {
    return (
        <ImageContainer>
            <img src="./assets/images/logo.png" alt="Logo do app TrackIt" />
        </ImageContainer>
    )
}

const ImageContainer = styled.div `
    margin: 68px auto 32px;
    height: 180px;
    width: 180px;
`