import { ASSET_URL, MENU_URL } from "./Api";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import redRating from "../assets/red_rating.png";
import greenRating from "../assets/green_rating.png";
import orangeRating from "../assets/orange_rating.png";
import cycle from "../assets/cycle.png";
import time from "../assets/time.png";

const RestaurantMenu = () => {
  const resId = useParams();
  const n = 12;
  const [menuList, setMenuList] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    const fetchmenu = async () => {
      const data = await fetch(MENU_URL + resId.resId);
      const jsondata = await data.json();
      const newMenuList =
        jsondata?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
      const resData = jsondata?.data?.cards[0]?.card?.card.info;
      setMenuList(newMenuList);
      setRestaurantData(resData);
      console.log(resData);
    };
    fetchmenu();
  }, [resId.resId]);

  if (menuList.length === 0)
    return [...Array(n)].map((_, i) => <Shimmer key={i} />);
  return (
    <>
      <div className="h-56 bg-green-950 text-white flex items-center justify-center">
        <div className="h-44 w-60">
          <img
            className="rounded-xl w-full h-full object-cover"
            src={ASSET_URL + restaurantData.cloudinaryImageId}
            alt="restaurant"
          />
        </div>
        <div className="ml-10 flex flex-col gap-2">
          <h1 className="text-4xl">{restaurantData.name}</h1>
          <h1 className="text-sm text-slate-300">
            {restaurantData.cuisines.join(", ")}
          </h1>
          <div>
            <img
              className="align-middle h-5 inline"
              src={
                restaurantData.avgRating >= 4
                  ? greenRating
                  : restaurantData.avgRating >= 3
                  ? orangeRating
                  : redRating
              }
              alt="restaurant"
            />
            <p className="font-bold inline pl-1 align-middle">
              {restaurantData.avgRating}
            </p>
            <p className="text-xs text-slate-200 inline align-middle">
              {" "}
              ({restaurantData.totalRatingsString})
            </p>
          </div>
          <div className="w-fit rounded-lg border-solid	border border-slate-50 px-4 py-2 my-2 flex gap-6">
            <div>
              <img
                className="align-middle h-5 inline"
                src={time}
                alt="restaurant"
              />
              <p className="pl-2 align-middle inline">
                {restaurantData.sla.slaString}
              </p>
            </div>
            <div>
              <p className="align-middle inline">|</p>
            </div>
            <div>
              <img
                className="align-middle h-5 inline"
                src={cycle}
                alt="restaurant"
              />
              <p className="pl-2 align-middle inline">
                {restaurantData.sla.lastMileTravelString}
              </p>
            </div>
          </div>
        </div>
      </div>
      {menuList.map((item) =>
        item.card.card.hasOwnProperty("title") &&
        !item.card.card.hasOwnProperty("carousel") ? (
          <div key={item.card.card.title}>
            <hr />
            <h2 className="font-bold">{item.card.card.title}</h2>
            {item.card.card.hasOwnProperty("categories") ? (
              item.card.card.categories.map((itm) => (
                <div>
                  <h4 className="font-bold">{itm.title}</h4>
                  <ul>
                    {itm.itemCards.map((categoryItm) => (
                      <li key={categoryItm.card.info.id}>
                        {categoryItm.card.info.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <ul>
                {item.card.card.itemCards.map((itm) => (
                  <li key={itm.card.info.id}>{itm.card.info.name}</li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div></div>
        )
      )}
    </>
  );
};
export default RestaurantMenu;
