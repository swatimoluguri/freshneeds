import React, { useState, useEffect, useContext } from "react";
import UserContext from "../utils/UserContext";
import Food from "../assets/food.jpg";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const { setLoggedUser, loggedInUser } = useContext(UserContext);

  const isFormValid = () => {
    return username && password.length >= 8;
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordBlur = () => {
    setIsPasswordTouched(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedUser(username);
    alert("Account Created! Welcome onboard " + username);
  };

  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  return (
    <div className="relative h-screen">
      <img src={Food} alt="food-background" className="w-full h-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50">
        <div className="relative w-2/3 md:w-1/3 bg-black bg-opacity-60 mx-auto mt-36 left-0 right-0 align-middle ">
          <div className="flex flex-col p-8 my-4">
            <h3 className="font-bold text-2xl my-2 p-2 text-white">Sign In</h3>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <input
                className="my-4 p-4 bg-transparent border-white border rounded-lg text-white"
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />

              <input
                className="my-4 p-4 bg-transparent border-white border rounded-lg text-white"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
              />
              {isPasswordTouched && password.length < 8 && (
                <p className="text-red-500">
                  Password should have at least 8 characters
                </p>
              )}
              <button
                className="bg-green-500 my-4 p-4 rounded-lg font-semibold disabled:bg-gray-500"
                disabled={!isFormValid()}
              >
                Sign In
              </button>
            </form>

            <h3 className="text-white">
              New to freshneeds?{" "}
              <span className="font-bold hover:text-green-500 hover:cursor-pointer">
                Sign Up now
              </span>{" "}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
