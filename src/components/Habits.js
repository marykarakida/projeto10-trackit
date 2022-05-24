import styled from "styled-components";

export default function Habits() {
    return (
        <Content>
            <TopBar>
                <h2>Meus hábitos</h2>
                <AddButton>+</AddButton>
            </TopBar>
            <UserHabitsList>
        aaa
            </UserHabitsList>
            <Aviso>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</Aviso>
        </Content>
    )
}

const Content = styled.div `
    display: flex;
    flex-direction: column;
    margin: 90px auto;
    padding: 0 18px;
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
    width: 100%;
`

const Aviso = styled.p `
    font-family: 'Lexend Deca', sans-serif;
    margin-top: 30px;
    font-size: 18px;
    color: #666666;
`