import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/CartSlice";
import Empty_cart from "../assets/empty_cart.png";


function Cart() {
  const cart = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const counts = {};
  const prices = {};

  cart.forEach((item) => {
    const id = item?.card?.info?.id;
    const name = item?.card?.info?.name;
    const cost = item?.card?.info?.price / 100;
    const key = `${id}_${name}`;
    counts[key] = (counts[key] || 0) + 1;
    prices[key] = (prices[key] || 0) + cost;
  });
  const uniqueItemsWithPrice = Object.keys(counts).map((key) => {
    const [id, name] = key.split("_");
    return {
      id: parseInt(id),
      name,
      counts: counts[key],
      price: counts[key] * prices[key],
    };
  });

  const handleClearCart = () => {
    dispatch(clearCart());
    console.log(cart);
  };
  return cart.length !== 0 ? (
    <>
      <h3 className="mx-auto text-3xl font-bold mt-10 text-green-600">Cart</h3>
      <div className="mt-10 rounded-xl p-4 m-4 bg-slate-100 w-6/12 mx-auto">
        <h2 className="p-4 text-xl font-bold">{cart[0]?.restaurantName}</h2>
        <hr />
        <ul className="m-4 p-4">
          {uniqueItemsWithPrice?.map((itm) => (
            <li className="list-none flex justify-between" key={itm?.id}>
              <span>
                {itm?.name} x {itm?.counts}
              </span>
              <span className="font-bold">₹ {itm?.price}</span>
            </li>
          ))}
        </ul>
        <hr />
        <div className="m-4 p-4 flex justify-between text-green-600 text-xl font-bold">
          <span>Total Payable</span>
          <span>
            ₹{uniqueItemsWithPrice.reduce((acc, item) => acc + item.price, 0)}
          </span>
        </div>
      </div>
      <div className="flex justify-between w-6/12 mx-auto">
        <button
          className="bg-black text-white m-4 p-4"
          onClick={() => handleClearCart()}
        >
          Clear Cart
        </button>
        <button className="bg-green-600 text-white m-4 p-4">
          Place Order{" "}
        </button>
      </div>
    </>
  ) : (
    <div className="mt-10 rounded-xl p-4 m-4 w-6/12 mx-auto text-center">
      <img className="mx-auto" src={Empty_cart} alt="empty cart" />
      <h1 className="text-xl font-bold p-4">Your cart is empty</h1>
      <p>You can go to home page to view more restaurants</p>
    </div>
  );
}

export default Cart;
