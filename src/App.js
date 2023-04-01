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
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  display: flex;
  height: 100%;
  max-height: calc(100% - 91px);
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
