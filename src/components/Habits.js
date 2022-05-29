import axios from "axios";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { ThreeDots } from  'react-loader-spinner';
import UserContext from "../contexts/UserContext";
import AddHabitInterface from "./AddHabitInterface";
import UserHabit from "./UserHabit";

export default function Habits() {
    const { userToken } = useContext(UserContext);
    
    const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);
    const [userHabits, setUserHabits] = useState(null);

    useEffect(() => {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const promise = axios.get(URL, {
            headers: {Authorization: `Bearer ${userToken}`}
        });
        promise.then(({data})=> {
            setUserHabits(data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function addNewHabitToList(newHabit) {
        setUserHabits([...userHabits, newHabit]);
    }

    function deleteHabitFromList(position) {
        setUserHabits([...userHabits].filter((habit, index) => position !== index));
    }

    function showUserHabits() {
        if (userHabits === null) {
            return <></>
        } else {
            return (userHabits.map((habit, index) => <UserHabit key={habit.id} index={index} habit={habit} deleteHabitFromList={deleteHabitFromList} />))
        }
    }

    function showWarning() {
        if (userHabits === null) {
            return <ThreeDots color="#FFFFFF" height={20} width={50} />
        }
        if (userHabits.length === 0) {
            return <Warning>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Warning>
        } else {
            return <></>
        }
    }

    const userHabitsList = showUserHabits();
    const warning = showWarning();

    return (
        <Container>
            <Content>
                <TopBar>
                    <h2>Meus hábitos</h2>
                    <AddButton onClick={() => setIsAddButtonClicked(!isAddButtonClicked)}>+</AddButton>
                </TopBar>
                <AddHabitInterface isAddButtonClicked={isAddButtonClicked} setIsAddButtonClicked={setIsAddButtonClicked} addNewHabitToList={addNewHabitToList} />
                <UserHabitsList>
                    {userHabitsList}
                </UserHabitsList>
                {warning}
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    h2 {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 22px;
        color: #126BA5;
    }
`

const AddButton = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4.63636px;
    height: 35px;
    width: 40px;
    background-color: #52B6FF;
    font-size: 26px;
    color: #FFFFFF;
    cursor: pointer;
`

const UserHabitsList = styled.div `
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`

const Warning = styled.p `
    font-family: 'Lexend Deca', sans-serif;
    margin-top: 30px;
    font-size: 18px;
    color: #666666;
`