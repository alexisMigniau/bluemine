import Theme from "./context/theme";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import Board from "./components/Board";
import ViewProvider, { ViewContext } from "./context/ViewContext";
import { useContext, useEffect, useState } from "react";
import LoginModal from "./components/modal/LoginModal";

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

function ViewContainer() {
  
  const { currentView } = useContext(ViewContext);

  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if(!localStorage.getItem("apikey")) {
      setShowLoginModal(true);
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('apikey')
    setShowLoginModal(true)
  }

  return currentView && (
    <AppContainer>
      <Header/>
      <Content>
        <Sidebar onLogout={handleLogout} />
        <Board />
      </Content>
      <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)}/>
    </AppContainer>
  )
}

function App() {

  return (
    <Theme>
      <ViewProvider>
        <ViewContainer />
      </ViewProvider>
    </Theme>
  );
}

export default App;
