import Theme from "./context/theme";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import styled from "styled-components";
import Board from "./components/board";
import BoardProvider from "./context/boardContext";

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  overflow: hidden;
`

const Content = styled.div`
  display: flex;
  height: 100%;
`

function App() {

  return (
    <Theme>
      <BoardProvider>
        <AppContainer>
          <Header />
          <Content>
            <Sidebar />
            <Board />
          </Content>
        </AppContainer>
      </BoardProvider>
    </Theme>
  );
}

export default App;
