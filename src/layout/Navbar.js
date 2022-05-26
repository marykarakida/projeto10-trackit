import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import { useEffect, useContext } from "react";
import 'react-circular-progressbar/dist/styles.css';
import UserContext from "../contexts/UserContext";

export default function Navbar() {
    const { userToken, dailyProgress, setDailyProgress } = useContext(UserContext);

    useEffect(() => {
        if (dailyProgress === null) {
            const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
            const promise = axios.get(URL, {
                headers: {Authorization: `Bearer ${userToken}`}
            });
            promise.then(({data})=> updateDailyProgress(data));
        }
    }) 

    function updateDailyProgress(habits) {
        const finishedHabitsCounter = habits.filter((habit) => habit.done === true).length;
        const progress = Math.ceil(finishedHabitsCounter / habits.length * 100);

        setDailyProgress(progress);
    }

    return (
        <FixedContainer>
            <Content>
                <NavbarLink to="/habitos">Hábitos</NavbarLink>
                <NavbarLink to="/hoje">
                    <DailyProgressbar>
                            <CircularProgressbar background={true} backgroundPadding={6} value={dailyProgress} text="Hoje"/>
                    </DailyProgressbar>
                </NavbarLink>
                <NavbarLink to="/historico">Histórico</NavbarLink>
            </Content>
        </FixedContainer>
    )
}

const FixedContainer = styled.div `
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    height: 70px;
    background-color: #FFFFFF;
`

const Content = styled.div `
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    max-width: 600px;
`

const NavbarLink = styled(Link) `
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    text-decoration: none;
    color: #52B6FF;
`

const DailyProgressbar = styled.div `
    margin-bottom: 40px;
    height: 90px;
    width: 90px;

    .CircularProgressbar-path {
        stroke: #FFFFFF;
    }
    .CircularProgressbar-trail {
        stroke: #52B6FF;
    }
    .CircularProgressbar-text {
        fill: #FFFFFF;
    }
    .CircularProgressbar-background {
        fill: #52B6FF;
    }
`

