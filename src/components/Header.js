import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import greencart from "../assets/cart-green.png";
import blackcart from "../assets/cart-black.png";
import { useState, useContext, useEffect } from "react";
import UserContext from "../utils/UserContext";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../utils/CartSlice";

const Header = () => {
  const cart = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const { setLoggedUser, loggedInUser } = useContext(UserContext);

  useEffect(() => {
    const storedCart = JSON.parse(window.localStorage.getItem("cart"));
    const storedUser = JSON.parse(window.localStorage.getItem("user"));
    if (storedUser && storedUser.length > 0) setLoggedUser(storedUser);
    if (storedCart && storedCart.length > 0)
      storedCart.forEach((item) => dispatch(addItem(item)));
  }, [dispatch, setLoggedUser]);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const HandleLogout = () => {
    setLoggedUser("");
  };
  const getImageSrc = () => {
    return isHovered ? greencart : blackcart;
  };

  return (
    <>
      <div className="flex flex-col p-4 justify-center shadow-md items-center md:flex-row md:justify-around">
        <div>
          <div className="w-full py-2 px-20 md:w-64 md:p-0">
            <Link to="/">
              <img src={Logo} alt="freshneeds logo" />
            </Link>
          </div>
        </div>
        <div className="my-4 md:my-0">
          {loggedInUser.length > 0 && (
            <p className="px-4 inline text-green-700">Hi! {loggedInUser}</p>
          )}
        </div>
        <div>
          <ul className="flex justify-around m-3">
            <li className="px-4 hover:text-green-700">
              <Link to="/">Home</Link>
            </li>
            <li className="px-4  hover:text-green-700">
              <Link to="/about">About</Link>
            </li>
            {loggedInUser.length > 0 ? (
              <li
                className="px-4 cursor-pointer hover:text-green-700"
                onClick={() => HandleLogout()}
              >
                Logout
              </li>
            ) : (
              <li className="px-4  hover:text-green-700">
                <Link to="/login">Login</Link>
              </li>
            )}
            <li className="px-4 hover:text-green-700">
              <Link to="/cart">
                <img
                  className="w-6 inline"
                  src={getImageSrc()}
                  alt="cart"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
                {cart.length > 0 ? (
                  <span className="text-red-600 font-bold">
                    {cart.length > 0} ({cart.length} items)
                  </span>
                ) : (
                  <></>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Header;
