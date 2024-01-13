import Card from "./Card";
import Shimmer from "./Shimmer";
import { API_URL } from "./Api";
import { useState, useEffect } from "react";

const Body = () => {
  const n = 12;
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(API_URL);
    const jsonList = await data.json();
    setListOfRestaurants(
      jsonList.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
    setFilteredRestaurants(
        jsonList.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
      );
      console.log(listOfRestaurants);
  };

  return (
    <>
      <div className="body">
        <div className="filter-btn">
          <button onClick={() => {
            const filtered=listOfRestaurants.filter((res)=>res.info.avgRating>4);
            setFilteredRestaurants(filtered);
          }}>Top Rated Restaurants</button>
        </div>
        <div className="restaurants">
          {filteredRestaurants.length !== 0
            ? filteredRestaurants.map((restaurant) => (
                <Card key={restaurant.info.id} resdata={restaurant} />
              ))
            : [...Array(n)].map((i) => <Shimmer key={i} />)}
        </div>
      </div>
    </>
  );
};
export default Body;
