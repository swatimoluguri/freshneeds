import { MENU_URL } from "./Api";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const resId = useParams();
  const n = 12;
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    fetchmenu();
  }, []);
  const fetchmenu = async () => {
    const data = await fetch(MENU_URL + resId.resId);
    const jsondata = await data.json();
    setMenuList(
      jsondata.data.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
        ?.card?.itemCards
    );
    setRestaurantDetails(jsondata.data.cards[0]?.card?.card?.info);
  };
  if (menuList.length === 0)
    return [...Array(n)].map((_, i) => <Shimmer key={i} />);
  return (
    <>
      <div>
        <h2>{restaurantDetails.name}</h2>
        <h3>{restaurantDetails.cuisines.join(", ")}</h3>
        <h3>Rs. {restaurantDetails.costForTwoMessage}/- </h3>
        <h3>Menu Items</h3>
        <ul>
          {menuList.map((item) => (
            <li key={item.card.info.id}>{item.card.info.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default RestaurantMenu;
