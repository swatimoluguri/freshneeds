import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="navbar">
        <div className="nav-item">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="freshneeds logo" />
            </Link>
          </div>
        </div>
        <div className="nav-item">
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/restaurant">Restaurants</Link>
            </li>
            <li>
              <Link to="/">Categories</Link>
            </li>
            <li>
              <Link to="/">Login/Signup</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Header;
