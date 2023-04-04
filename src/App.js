import Theme from "./context/theme";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import Board from "./components/Board";
import BoardProvider, { BoardContext } from "./context/boardContext";
import { useContext } from "react";

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  display: flex;
  height: 100%;
  max-height: calc(100% - 91px);
`

function BoardContainer() {
  
  const { currentBoard } = useContext(BoardContext);

  return currentBoard && (
    <AppContainer>
      <Header />
      <Content>
        <Sidebar />
        <Board />
      </Content>
    </AppContainer>
  )
}

function App() {

  return (
    <Theme>
      <BoardProvider>
        <BoardContainer />
      </BoardProvider>
    </Theme>
  );
}

export default App;
