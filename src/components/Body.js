import Card from "./Card";
import Shimmer from "./Shimmer";
import { API_URL } from "./Api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Body = () => {
  const n = 12;
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [topFilter, setTopFilter] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(API_URL);
    const jsonList = await data.json();
    //console.log(jsonList.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
    setListOfRestaurants(
      jsonList.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
    setFilteredRestaurants(
      jsonList.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  return (
    <>
      <div className="m-auto w-4/5">
        <div className="mx-20 my-4">
          <input
            className="focus:ring-2 focus:ring-green-600 focus:outline-none appearance-none w-64 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm "
            type="text"
            placeholder="Search restaurants..."
            value={searchText}
            onChange={(e) => {
              const updatedsearchtext = e.target.value;
              setSearchText(updatedsearchtext);
              const filtered = listOfRestaurants.filter(
                (res) =>
                  res.info.name
                    .toLowerCase()
                    .includes(updatedsearchtext.toLowerCase()) ||
                  res.info.cuisines
                    .join(", ")
                    .toLowerCase()
                    .includes(updatedsearchtext.toLowerCase())
              );
              setFilteredRestaurants(filtered);
            }}
          />
          <button
            className={`btn btn--primary inline ${
              topFilter ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={() => {
              const filtered = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4
              );
              setFilteredRestaurants(filtered);
              setTopFilter(topFilter === true ? false : true);
            }}
          >
            Top Rated
          </button>
          <button
            className={`btn btn--secondary inline ${
              topFilter ? "block" : "hidden"
            }`}
            onClick={() => {
              setFilteredRestaurants(listOfRestaurants);
              setTopFilter(topFilter === true ? false : true);
            }}
          >
            X
          </button>
        </div>
        <div className="mx-6 my-8 flex flex-wrap gap-8 justify-around">
          {searchText.length === 0 ? (
            filteredRestaurants.length !== 0 ? (
              filteredRestaurants.map((restaurant) => (
                <Link
                  to={"/restaurant/" + restaurant.info.id}
                  key={restaurant.info.id}
                >
                  <Card key={restaurant.info.id} resdata={restaurant} />
                </Link>
              ))
            ) : (
              [...Array(n)].map((_, i) => <Shimmer key={i} />)
            )
          ) : filteredRestaurants.length !== 0 ? (
            filteredRestaurants.map((restaurant) => (
              <Link
                to={"/restaurant/" + restaurant.info.id}
                key={restaurant.info.id}
              >
                <Card key={restaurant.info.id} resdata={restaurant} />
              </Link>
            ))
          ) : (
            <p className="min-h-screen">
              Couldn't find a restaurant/cuisines with the name "{searchText}".
              Please try again later.
            </p>
          )}
        </div>
      </div>
    </>
  );
};
export default Body;
