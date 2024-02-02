import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";
import { useState } from "react";

function App() {
  const [loggedUser,setLoggedUser]=useState('');
  return (
    <UserContext.Provider value={{loggedInUser:loggedUser,setLoggedUser}}>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
