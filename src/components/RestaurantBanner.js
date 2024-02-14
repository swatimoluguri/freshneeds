import redRating from "../assets/red_rating.png";
import greenRating from "../assets/green_rating.png";
import orangeRating from "../assets/orange_rating.png";
import cycle from "../assets/cycle.png";
import time from "../assets/time.png";
import { ASSET_URL } from "./Api";

const RestaurantBanner = (props) => {
  return (
    <div className="h-56 bg-green-950 text-white flex items-center justify-center">
      <div className="m-2 h-1/2 w-1/4 md:h-3/4 md:w-1/6">
        <img
          className="rounded-xl w-full h-full object-cover"
          src={ASSET_URL + props.restaurantData.cloudinaryImageId}
          alt="restaurant"
        />
      </div>
      <div className="m-2 md:ml-10 flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl">{props.restaurantData.name}</h1>
        <h1 className="text-sm text-slate-300">
          {props.restaurantData.cuisines.join(", ")}
        </h1>
        <div>
          <img
            className="align-middle h-5 inline"
            src={
              props.restaurantData.avgRating >= 4
                ? greenRating
                : props.restaurantData.avgRating >= 3
                ? orangeRating
                : redRating
            }
            alt="restaurant"
          />
          <p className="font-bold inline pl-1 align-middle">
            {props.restaurantData.avgRating}
          </p>
          <p className="text-xs text-slate-200 inline align-middle">
            {" "}
            ({props.restaurantData.totalRatingsString})
          </p>
        </div>
        <div className="w-fit rounded-lg border-solid	border border-slate-50 px-4 py-1 md:py-2 my-1 md:my-2 flex gap-1 md:gap-6">
          <div>
            <img
              className="align-middle h-5 inline"
              src={time}
              alt="restaurant"
            />
            <p className="text-xs md:text-lg pl-2 align-middle inline">
              {props.restaurantData.sla.slaString}
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
            <p className="text-xs md:text-lg pl-2 align-middle inline">
              {props.restaurantData.sla.lastMileTravelString}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RestaurantBanner;
