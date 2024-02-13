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
  useEffect(() => {
    const storedCart = JSON.parse(window.localStorage.getItem("cart"));
    if (storedCart && storedCart.length > 0)
      storedCart.forEach((item) => dispatch(addItem(item)));
  }, [dispatch]);
  const [isHovered, setIsHovered] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const getImageSrc = () => {
    return isHovered ? greencart : blackcart;
  };

  return (
    <>
      <div className="flex p-4 justify-around shadow-md">
        <div>
          <div className="w-64">
            <Link to="/">
              <img src={Logo} alt="freshneeds logo" />
            </Link>
          </div>
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
              <li className="px-4  text-green-700">Hi! {loggedInUser}</li>
            ) : (
              <li className="px-4  hover:text-green-700">
                <Link to="/login">Login/Signup</Link>
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
