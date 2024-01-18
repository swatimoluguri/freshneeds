import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
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
            <li className="px-4">
              <Link to="/">Home</Link>
            </li>
            <li className="px-4">
              <Link to="/restaurant">Restaurants</Link>
            </li>
            <li className="px-4">
              <Link to="/">Categories</Link>
            </li>
            <li className="px-4">
              <Link to="/">Login/Signup</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Header;
