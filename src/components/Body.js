import Card from "./Card";
import { API_URL } from "./Api";
import { useState, useEffect } from "react";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(API_URL);
    const jsonList = await data.json();
    setListOfRestaurants(
      jsonList.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  return (
    <>
      <div className="restaurants">
        {listOfRestaurants.map((restaurant) => (
          <Card key={restaurant.info.id} resdata={restaurant} />
        ))}
      </div>
    </>
  );
};
export default Body;
