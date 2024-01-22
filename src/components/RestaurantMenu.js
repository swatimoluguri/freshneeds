import { MENU_URL } from "./Api";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import RestaurantBanner from "./RestaurantBanner";
import RetaurantMenuItems from "./RetaurantMenuItems";

const RestaurantMenu = () => {
  const resId = useParams();
  const n = 12;
  const [menuList, setMenuList] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [showItems, SetShowItems] = useState(false);

  useEffect(() => {
    const fetchmenu = async () => {
      const data = await fetch(MENU_URL + resId.resId);
      const jsondata = await data.json();
      const newMenuList =
        jsondata?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
      const resData = jsondata?.data?.cards[0]?.card?.card.info;
      setMenuList(newMenuList);
      console.log(newMenuList);
      setRestaurantData(resData);
    };
    fetchmenu();
  }, [resId.resId]);

  const HandleClick = () => {
    SetShowItems(!showItems);
  };

  if (menuList.length === 0)
    return [...Array(n)].map((_, i) => <Shimmer key={i} />);
  return (
    <>
      <RestaurantBanner restaurantData={restaurantData} />
      {menuList.map(
        (item) =>
          item.card.card.hasOwnProperty("title") &&
          !item.card.card.hasOwnProperty("carousel") && (
            <div className="w-6/12 m-auto my-4" key={item?.card?.card?.title}>
              <div
                className="p-4 shadow-lg text-lg flex justify-between"
                onClick={HandleClick}
              >
                <h2 className="font-bold">{item?.card?.card?.title}</h2>
                <p>⬇️</p>
              </div>
              {showItems && (
                <RetaurantMenuItems
                  key={item?.card?.card?.title + "menu"}
                  itemList={item?.card?.card}
                />
              )}
            </div>
          )
      )}
    </>
  );
};
export default RestaurantMenu;
