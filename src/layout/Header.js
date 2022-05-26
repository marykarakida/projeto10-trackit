import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function Header() {
    const {userProfilePicture} = useContext(UserContext);

    return (
        <FixedContainer>
            <Content>
                <AppName>TrackIt</AppName>
                <ProfilePicture>
                    <img src={userProfilePicture} alt="Foto de perfil do usuário" />
                </ProfilePicture>
            </Content>
        </FixedContainer>
    )
}

const FixedContainer = styled.div `
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    height: 70px;
    background-color: #126BA5;
`

const Content = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 18px;
    width: 100%;
    max-width: 600px;
`

const AppName = styled.h1 `
    font-family: 'Playball';
    font-size: 38px;
    color: #FFFFFF;
`

const ProfilePicture = styled.div `
    height: 50px;
    max-width: 50px;
    border-radius: 98px;

    img {
        border-radius: 98px;
    }
`