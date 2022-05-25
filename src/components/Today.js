import axios from "axios";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useState, useEffect, useContext } from "react";
import { ThreeDots } from  'react-loader-spinner';
import UserContext from "../contexts/UserContext";
import DailyHabit from "./DailyHabit";

export default function Today() {
    const { userToken, dailyProgress, setDailyProgress } = useContext(UserContext);

    const [dailyHabits, setDailyHabits] = useState(null);

    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const promise = axios.get(URL, {
            headers: {Authorization: `Bearer ${userToken}`}
        });
        promise.then(({data})=> {
            updateDailyProgress(data)   
            setDailyHabits(data)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function changeHabitStaus(index) {
        const newDailyHabits = [...dailyHabits];
        const habit = newDailyHabits[index];

        if (habit.done) {
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`;
            axios.post(URL, {}, {
                headers: {Authorization: `Bearer ${userToken}`}
            })
            habit.currentSequence -= 1;
        } else {
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`;
            axios.post(URL, {}, {
                headers: {Authorization: `Bearer ${userToken}`}
            })
            habit.currentSequence += 1;
        }

        habit.done = !habit.done;

        updateDailyProgress(newDailyHabits);
        setDailyHabits(newDailyHabits);
    }

    function updateDailyProgress(habits) {
        const finishedHabitsCounter = habits.filter((habit) => habit.done === true).length;
        const progress = Math.ceil(finishedHabitsCounter / habits.length * 100);

        setDailyProgress(progress);
    }

    function showTopBar() {
        if (dailyHabits === null) {
            return <ThreeDots color="#FFFFFF" height={20} width={50} />
        }

        const currentDate = dayjs().locale('pt-br').format("dddd, D/MM");
        if (dailyProgress === 0) {
            return (
                <TopBar>
                    <h2>{currentDate.charAt(0).toUpperCase() + currentDate.slice(1)}</h2>
                    <p>Nenhum hábito concluído ainda</p>
                </TopBar>
        )} else {
            return (
                <TopBar progress>
                    <h2>{currentDate.charAt(0).toUpperCase() + currentDate.slice(1)}</h2>
                    <p>{dailyProgress}% dos hábitos concluídos</p>
                </TopBar>
        )}
    }

    function showUserHabitsList() {
        if (dailyHabits === null) {
            return <></>
        } else {
            return (
                <UserDailyHabitsList>
                    {dailyHabits.map((habit, index) => <DailyHabit key={habit.id} habit={habit} changeHabitStaus={() => changeHabitStaus(index)} />)}
                </UserDailyHabitsList>
        )}
    }

    const topBar = showTopBar();
    const userDailyHabitsList = showUserHabitsList();

    return (
        <Content>
            {topBar}
            {userDailyHabitsList}
        </Content>
    )
}

const Content = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 90px auto 120px;
    padding: 0 18px;
    max-width: 636px;
`

const TopBar = styled.div `
    width: 100%;
    font-family: 'Lexend Deca', sans-serif;

    h2 {
        font-size: 22px;
        line-height: 30px;
        color: #126BA5;
    }

    p {
        font-size: 18px;
        line-height: 22px;
        color: ${props => props.progress ? "#8FC549" : "#BABABA" }
    }
`

const UserDailyHabitsList = styled.div `
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 26px;
    width: 100%;
`
