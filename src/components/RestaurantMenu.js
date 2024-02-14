import { MENU_URL } from "./Api";
import { useState, useEffect } from "react";
import ShimmerMenu from "./ShimmerMenu";
import { useParams } from "react-router-dom";
import RestaurantBanner from "./RestaurantBanner";
import RetaurantMenuItems from "./RetaurantMenuItems";

const RestaurantMenu = () => {
  const resId = useParams();
  const n = 12;
  const [menuList, setMenuList] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [showItems, SetShowItems] = useState(1);

  useEffect(() => {
    const fetchmenu = async () => {
      const data = await fetch(MENU_URL + resId.resId);
      const jsondata = await data.json();
      const newMenuList =
        jsondata?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
      const resData = jsondata?.data?.cards[0]?.card?.card.info;
      setMenuList(newMenuList);
      setRestaurantData(resData);
    };
    fetchmenu();
  }, [resId.resId]);

  if (menuList.length === 0)
    return [...Array(n)].map((_, i) => <ShimmerMenu key={i} />);
  return (
    <>
      <RestaurantBanner restaurantData={restaurantData} />
      {menuList.map(
        (item, idx) =>
          item.card.card.hasOwnProperty("title") &&
          !item.card.card.hasOwnProperty("carousel") && (
            <div className="w-10/12 md:w-6/12 mx-auto my-2" key={item?.card?.card?.title}>
              <div
                className="p-4 shadow-lg text-lg flex justify-between cursor-pointer"
                onClick={() => {
                  showItems === idx ? SetShowItems(null) : SetShowItems(idx);
                }}
              >
                <h2 className="font-bold">{item?.card?.card?.title}</h2>
                {showItems=== idx?<p>⬆️</p>:<p>⬇️</p>}
              </div>
              <RetaurantMenuItems
                key={item?.card?.card?.title + "menu"}
                itemList={item?.card?.card}
                resName={restaurantData.name}
                showItems={idx === showItems ? true : false}
              />
            </div>
          )
      )}
    </>
  );
};
export default RestaurantMenu;
