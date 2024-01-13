import Logo from "../assets/logo.png"

const Header = () => {
  return (
    <>
        <div className="navbar">
            <div className="nav-item">
                <div className="logo">
                    <img src={Logo}  alt="freshneeds logo"/>
                </div>
            </div>
            <div className="nav-item">
                    <ul className="nav-links">
                        <li>Home</li>
                        <li>Restaurants</li>
                        <li>Categories</li>
                        <li>Login/Signup</li>
                    </ul>
            </div>
        </div>
    </>
  );
};
export default Header;
