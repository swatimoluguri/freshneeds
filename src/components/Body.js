import Card from "./Card";
import Shimmer from "./Shimmer";
import { API_URL } from "./Api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Body = () => {
  const n = 12;
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
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
  };

  return (
    <>
      <div className="m-4">
        <div className="m-4">
          <input
            className="focus:ring-2 focus:ring-green-600 focus:outline-none appearance-none w-64 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm "
            type="text"
            placeholder="Search here..."
            value={searchText}
            onChange={(e) => {
              const updatedsearchtext = e.target.value;
              setSearchText(updatedsearchtext);
              const filtered = listOfRestaurants.filter((res) =>
                res.info.name
                  .toLowerCase()
                  .includes(updatedsearchtext.toLowerCase())
              );
              setFilteredRestaurants(filtered);
            }}
          />
          <button className="btn btn--primary"
            onClick={() => {
              const filtered = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4
              );
              setFilteredRestaurants(filtered);
            }}
          >
            Top Rated Restaurants
          </button>
          <button className="btn btn--secondary"
            onClick={() => {
              setFilteredRestaurants(listOfRestaurants);
            }}
          >
            Reset
          </button>
        </div>
        <div className="flex flex-wrap">
          {filteredRestaurants.length !== 0
            ? filteredRestaurants.map((restaurant) => (
                <Link to={"/restaurant/" + restaurant.info.id}>
                  <Card key={restaurant.info.id} resdata={restaurant} />
                </Link>
              ))
            : [...Array(n)].map((_, i) => <Shimmer key={i} />)}
        </div>
      </div>
    </>
  );
};
export default Body;
