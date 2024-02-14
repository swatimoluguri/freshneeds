import Placed from "../assets/placed.gif";
import { Link } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { clearCart } from "../utils/CartSlice";

const Order = () => {
  const dispatch = useDispatch();
  dispatch(clearCart());
  return (
    <div className="m-4 mt-16 p-4 w-6/12 mx-auto text-center">
      <p className="text-green-600 font-bold text-2xl">
        Wohoo !! Your food is on the way.
      </p>
      <img className="w-3/12 mx-auto my-4" src={Placed} alt="Order Placed" />
      <button className="bg-black text-white m-4 p-4">
        <Link to="/">Browse more</Link>
      </button>
    </div>
  );
};

export default Order;
