import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";
import { useState } from "react";
import { Provider } from "react-redux";
import AppStore from "./utils/AppStore";

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  return (
    <Provider store={AppStore}>
      <UserContext.Provider value={{ loggedInUser: loggedUser, setLoggedUser }}>
        <div className="App flex flex-col min-h-screen">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
}

export default App;
