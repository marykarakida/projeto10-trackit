import axios from "axios";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { ThreeDots } from  'react-loader-spinner';
import UserContext from "../contexts/UserContext";

export default function AddHabitInterface(props) {
    const { isAddButtonClicked, setIsAddButtonClicked, addNewHabitToList } = props;
    const { userToken } = useContext(UserContext);

    const [selectedWeekdays, setSelectedWeekdays] = useState(null);
    const [areInputFieldsDisabled, setAreInputFieldsDisabled] = useState(false);
    const [newHabitName, setNewHabitName] = useState("");

    useEffect(() => {
        resetSelectedWeekdays();
    }, [])

    function resetSelectedWeekdays() {
        const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
        const newSelectedWeekdays = weekdays.map((weekday, index) => ({ weekday: weekday, index: index, isSelected: false }));
        setSelectedWeekdays(newSelectedWeekdays);
    }

    function selectWeekday(index) {
        const newSelectedWeekdays = [...selectedWeekdays];
        newSelectedWeekdays[index].isSelected = !newSelectedWeekdays[index].isSelected;
        setSelectedWeekdays(newSelectedWeekdays);
    }

    function createNewHabit(event) {
        event.preventDefault();
        setAreInputFieldsDisabled(true);

        const selected = selectedWeekdays.filter(weekday => weekday.isSelected === true).map(weekday => weekday.index);
        if (selected.length === 0) {
            alert("Selecione pelo menos uma dia da semana")
            return
        }

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const promise = axios.post(URL, {
            name: newHabitName,
            days: selected
        }, {
            headers: {Authorization: `Bearer ${userToken}`}
        });
        promise.then (({data} )=> {
            setNewHabitName("");
            resetSelectedWeekdays();
            setIsAddButtonClicked(false);
            setAreInputFieldsDisabled(false);
            addNewHabitToList(data);
        })
        promise.catch(() => {
            alert("Houve um erro durante a criação do novo hábito. Tente novamente.");
            setAreInputFieldsDisabled(false);
        })
    }

    function showInputFields() {
        if (!isAddButtonClicked) {
            return <></>
        }
        if (areInputFieldsDisabled) {
            return (
                <InputFields disabled>
                    <input required type="text" placeholder="nome do hábito" value={newHabitName} onChange={(e) => setNewHabitName(e.target.value)}></input>
                    <div>
                        {selectedWeekdays.map((day, index) => {
                            const { weekday, isSelected } = day;
                            return (<Weekday key={index} onClick={() => selectWeekday(index)} isSelected={isSelected}>{weekday}</Weekday>)
                        })}
                    </div>
                </InputFields>
        )} else {
            return(
                <InputFields>
                    <input required type="text" placeholder="nome do hábito" value={newHabitName} onChange={(e) => setNewHabitName(e.target.value)}></input>
                    <div>
                        {selectedWeekdays.map((day, index) => {
                            const { weekday, isSelected } = day;
                            return (
                                <Weekday key={index} onClick={() => selectWeekday(index)} isSelected={isSelected}>{weekday}</Weekday>
                            )
                        })}
                    </div>
                </InputFields>
        )}
    }

    function showButtonContainer() {
        if (!isAddButtonClicked) {
            return <></>
        }
        if (areInputFieldsDisabled) {
            return (     
                <ButtonContainer disabled>
                    <button onClick={() => setIsAddButtonClicked(false)} ><ThreeDots color="#FFFFFF" height={20} width={50} /></button>
                    <button type="submit" >Salvar</button>
                </ButtonContainer>
        )} else {
            return (
                <ButtonContainer>
                    <button onClick={() => setIsAddButtonClicked(false)} >Cancelar</button>
                    <button type="submit" >Salvar</button>
                </ButtonContainer>
        )}
    }

    const inputFields = showInputFields();
    const buttonContainer = showButtonContainer();

    return (
        <Container>
            <Forms onSubmit={createNewHabit}>
                {inputFields}
                {buttonContainer}
            </Forms>
        </Container>
    )
}

const Container = styled.div`
    margin: 10px 0 10px;
    border-radius: 5px;
    width: 100%;
    background-color: #FFFFFF;
`

const Forms = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
`

const InputFields = styled.div `
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 16px 16px 0;

    input {
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding: 6px;
        background-color: ${props => props.disabled ? "#F2F2F2" : "#FFFFFF"};
        height: 44px;
        color: #666666;
        pointer-events: ${props => props.disabled ? "none" : "initial"}
    }

    input::placeholder {
        font-size: 20px;
        color: ${props => props.disabled ? "#AFAFAF" : "#DBDBDB"};
    }

    div {
        display: flex;
        gap: 4px;
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
    cursor: pointer;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 0 16px 16px;

    button {
        border: transparent;
        border-radius: 4px;
        height: 34px;
        width: 84px;
        font-size: 16px;
        cursor: pointer;
    }

    button:nth-of-type(1) {
        background-color: #FFFFFF;
        color: #52B6FF;
    }

    button:nth-of-type(2) {
        background-color: #52B6FF;
        color: #FFFFFF;
    }
`