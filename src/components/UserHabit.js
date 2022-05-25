import axios from "axios";
import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function UserHabit(props) {
    const { index, habit, deleteHabitFromList } = props;
    const { userToken } = useContext(UserContext);
    const weekdaysList = ["D", "S", "T", "Q", "Q", "S", "S"];

    function deleteHabit() {
        if (!window.confirm(`Você realmente deseja deletar o hábito "${habit.name}?`)) {
            return
        }

        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`;
        const promise = axios.delete(URL, {
            headers: {Authorization: `Bearer ${userToken}`}
        })
        promise.then(() => deleteHabitFromList(index))
    }

    function showWeekdays() {
        return (
            <>
                {weekdaysList.map((weekday, index) => {
                    const isSelected = habit.days.some((day) => day === index);
                    return (<Weekday key={index} isSelected={isSelected}>{weekday}</Weekday>)
                })}
            </>
        )
    }

    const weekdays = showWeekdays();

    return (
        <Habit>
            <TopBar>
                <h3>{habit.name}</h3>
                <ion-icon name="trash-outline" onClick={deleteHabit} ></ion-icon>
            </TopBar>
            <div>
                {weekdays}
            </div>
        </Habit>
    )
}

const Habit = styled.div `
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-radius: 5px;
    padding: 10px 16px 16px;
    width: 100%;
    font-family: 'Lexend Deca', sans-serif;
    background-color: #FFFFFF;

    div {
        display: flex;
        gap: 4px;
    }
`

const TopBar = styled.div `
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    line-height: 25px;
    color: #666666;

    ion-icon {
        height: 15px;
        width: 13px;
        cursor: pointer;
    }
`

const Weekday = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    padding: 14px;
    height: 30px;
    width: 30px;
    background-color: ${props => props.isSelected ? "#DBDBDB" : "#FFFFFF"};
    font-family: 'Lexend Deca', sans-serif;
    color: ${props => props.isSelected ? "#FFFFFF" : "#DBDBDB"};
`;