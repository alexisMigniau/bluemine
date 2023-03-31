import Theme from "./context/theme";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <Theme>
      <Header />
      <Sidebar />
    </Theme>
  );
}

export default App;
