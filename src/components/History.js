import styled from "styled-components";

export default function History() {
    return (
        <Content>
            <TopBar>
                <h2>Histórico</h2>
            </TopBar>
            <Aviso>Em breve você poderá ver o histórico dos seus hábitos aqui!</Aviso>
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
        font-family: 'Lexend Deca', sans-serif;
        font-size: 18px;
        line-height: 22px;
        /* color: #BABABA; */
        color: #8FC549;
    }
`

const Aviso = styled.p `
    font-family: 'Lexend Deca', sans-serif;
    margin-top: 20px;
    font-size: 18px;
    color: #666666;
`