import styled from "styled-components";

export default function Today() {
    return (
        <Content>
            <TopBar>
                <h2>Segunda, 17/05</h2>
                <p>Nenhum hábito concluído ainda</p>
            </TopBar>
            <UserDailyHabitsList>
        aaa
            </UserDailyHabitsList>
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
    width: 100%;

    h2 {
        font-family: 'Lexend Deca', sans-serif;
        font-size: 22px;
        line-height: 30px;
        color: #126BA5;
    }

    p {
        font-size: 18px;
        line-height: 22px;
        /* color: #BABABA; */
        color: #8FC549;
    }
`

const UserDailyHabitsList = styled.div `
    width: 100%;
`
