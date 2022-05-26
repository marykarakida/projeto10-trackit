import axios from "axios";
import styled from "styled-components";
import dayjs from "dayjs";
import { useState, useContext, useEffect } from "react";
import { ThreeDots } from  'react-loader-spinner';

import 'react-calendar/dist/Calendar.css';
import UserContext from "../contexts/UserContext";

import Calendar from 'react-calendar';

export default function History() {
    const { userToken } = useContext(UserContext);

    const [habitsHistory, setHabitsHistory] = useState(null);

    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";
        const promise = axios.get(URL, {
            headers: {Authorization: `Bearer ${userToken}`}
        });
        promise.then(({data})=> {
            setHabitsHistory(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function changeDay(date) {
        const tileDate = dayjs(date).format("DD/MM/YYYY");

        for (let i = 0 ; i < habitsHistory.length ; i ++) {
            const day = habitsHistory[i].day;
            if (tileDate === day) {
                const areAllDailyHabitsCompleted = !habitsHistory[i].habits.some(habit => habit.done === false);
                if (areAllDailyHabitsCompleted) {
                    return "dailyHabitsCompleted";
                } else {
                    return "dailyHabitsFailed";
                }
            }
        }
    }

    function showHabitCalendar() {
        if (habitsHistory === null) {
            return <ThreeDots color="#FFFFFF" height={20} width={50} />
        } else {
            return (
            <HabitCalendar 
                calendarType="US"  
                tileClassName={({ activeStartDate, date, view }) => changeDay(date)} 
            />
        )}
    }

    const habitCalendar = showHabitCalendar();

    return (
        <Content>
            <TopBar>
                <h2>Histórico</h2>
            </TopBar>
            {habitCalendar}
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

    h2 {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 22px;
        line-height: 30px;
        color: #126BA5;
    }
`

const HabitCalendar = styled(Calendar) `
    margin: 10px auto 0;

    .dailyHabitsCompleted abbr {
        border-radius: 15px;
        padding: 6px 8px;
        background-color: #8CC654;
    }

    .dailyHabitsFailed abbr {
        border-radius: 15px;
        padding: 6px 8px;
        background-color: #FC4A62;
    }
`