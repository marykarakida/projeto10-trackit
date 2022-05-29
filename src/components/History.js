import axios from "axios";
import styled from "styled-components";
import dayjs from "dayjs";
import { useState, useContext, useEffect } from "react";
import 'react-calendar/dist/Calendar.css';
import UserContext from "../contexts/UserContext";
import Calendar from 'react-calendar';
import { ThreeDots } from  'react-loader-spinner';

export default function History() {
    const { userToken } = useContext(UserContext);

    const [habitsHistory, setHabitsHistory] = useState(null);
    const [clickedDayHabits, setClickedDayHabits] = useState(null);

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

    function showClickedDayHabits(value) {
        const tileDate = dayjs(value).format("DD/MM/YYYY");

        for (let i = 0 ; i < habitsHistory.length ; i ++) {
            const day = habitsHistory[i].day;
            if (tileDate === day) {
                setClickedDayHabits(habitsHistory[i]);
                return
            }
        }
        
        setClickedDayHabits(null)
    }

    function showHabitCalendar() {
        if (habitsHistory === null) {
            return <ThreeDots color="#FFFFFF" height={20} width={50} />
        } else {
            return (
            <HabitCalendar 
                calendarType="US"  
                tileClassName={({ activeStartDate, date, view }) => changeDay(date)} 
                onClickDay={(value, event) => showClickedDayHabits(value)}
            />
        )}
    }

    function showClickedDay() {
        if (clickedDayHabits === null) {
            return <></>
        } else {
            return (
                <ClickedDay>
                    <TopBar>
                        <h2>{clickedDayHabits.day}</h2>
                    </TopBar>
                    {clickedDayHabits.habits.map((habit) => {
                        const { id, name, done } = habit;
                        return (
                            <div key={id}>
                                {done 
                                    ? <ion-icon name="checkmark-circle"></ion-icon>
                                    : <ion-icon name="close-circle"></ion-icon>
                                }
                                <h3>{name}</h3>
                            </div>
                        )
                    })}
                </ClickedDay>
            )
        }
    }

    const habitCalendar = showHabitCalendar();
    const clickedDay = showClickedDay();

    return (
        <Container>
            <Content>
                <TopBar>
                    <h2>Histórico</h2>
                </TopBar>
                {habitCalendar}
                {clickedDay}   
            </Content>
        </Container>
    )
}

const Container = styled.div `
    padding: 70px 0;
    min-height: 100vh;
    background-color: #F2F2F2;
`

const Content = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 10px 18px 40px;
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

const ClickedDay = styled.div `
    margin-top: 20px;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    max-width: 350px;
    background-color: #FFFFFF;

    div {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
    }

    ion-icon {
        min-width: 16px;

        &[name= "checkmark-circle"] {
            color: green;
        }

        &[name= "close-circle"] {
            color: red;
        }
    }
`