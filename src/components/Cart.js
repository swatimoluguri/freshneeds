import { useSelector } from "react-redux";

function Cart() {
  const cart = useSelector((store) => store.cart.items);
  console.log(cart);
  return (
    <>
      {cart?.map((itm)=>(
      <li key={itm?.card?.info?.id}>{itm?.card?.info?.name}</li>))}
    </>
  );
}

export default Cart;
