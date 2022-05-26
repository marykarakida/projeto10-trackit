import styled from "styled-components";

export default function DailyHabit(props) {
    const { habit, changeHabitStaus } = props;

    const newHighestSequence = habit.currentSequence >= habit.highestSequence && habit.done;
    const highestSequence = habit.currentSequence >= habit.highestSequence ? habit.currentSequence : habit.highestSequence;

    return (
        <Habit>
            <HabitInfo>
                <h3>{habit.name}</h3>
                <div>
                    <p>Sequência atual: <Sequence checked={habit.done} >{habit.currentSequence}</Sequence ></p>
                    <p>Seu recorde: <Sequence newHighestSequence={newHighestSequence} >{highestSequence}</Sequence ></p>
                </div>
            </HabitInfo>
            <Checkbox checked={habit.done}>
                <ion-icon name="checkbox" onClick={changeHabitStaus} ></ion-icon>
            </Checkbox>
        </Habit>
    )
}

const Habit = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    padding: 6px 6px 6px 12px;
    width: 100%;
    font-family: 'Lexend Deca', sans-serif;
    background-color: #FFFFFF;
`

const HabitInfo = styled.div `
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: #666666;

    h3 {
        font-size: 20px;
    }

    p {
        font-size: 14px;
    }
`

const Sequence = styled.span `
    color: ${props => (props.checked || props.newHighestSequence) ? "#8FC549" : "#666666" }
`

const Checkbox = styled.div `
    ion-icon {
        height: 86px;
        min-width: 86px;
        color: ${props => props.checked ? "#8FC549" : "#EBEBEB" };
        cursor: pointer;
    }
`