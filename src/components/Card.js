import { ASSET_URL } from "./Api";
import redRating from "../assets/red_rating.png";
import greenRating from "../assets/green_rating.png";
import orangeRating from "../assets/orange_rating.png";
import time from "../assets/time.png";

const Card = (props) => {
  return (
    <>
      <div className="rounded-xl w-60 bg-slate-200 hover:bg-slate-300 hover:cursor-pointer transition-transform ease-in-out duration-300 transform hover:scale-95">
        <div className="h-52 relative">
          <img
            className="rounded-t-xl w-full h-full object-cover"
            src={ASSET_URL + props.resdata.info.cloudinaryImageId}
            alt="restaurant"
          />
          <div className="absolute bottom-0 w-full text-white bg-gradient-to-t from-slate-950 to-transparent flex items-center pt-2">
            <img className="pl-2 h-5 inline" src={time} alt="restaurant" />
            <h2 className="font-bold pl-1">
              {props.resdata.info.sla.slaString}
            </h2>
            <div className="h-14"></div>
          </div>
        </div>

        <div className="m-4 pb-4">
          <div className="font-bold text-lg">
            <h2 className="overflow-hidden whitespace-nowrap text-ellipsis">
              {props.resdata.info.name}
            </h2>
          </div>
          <div className="py-2 flex justify-between">
            <div>
              <img
                className="align-middle h-5 inline"
                src={
                  props.resdata.info.avgRating >= 4
                    ? greenRating
                    : props.resdata.info.avgRating >= 3
                    ? orangeRating
                    : redRating
                }
                alt="restaurant"
              />
              <p className="font-bold inline pl-1 align-middle">
                {props.resdata.info.avgRating}
              </p>
              <p className="text-xs text-slate-600 inline align-middle">
                {" "}
                ({props.resdata.info.totalRatingsString})
              </p>
            </div>
            <div>
              <p className="align-middle font-bold">
                {props.resdata.info.costForTwo}
              </p>
            </div>
          </div>

          <div className="">
            <p className="text-sm text-slate-600 overflow-hidden whitespace-nowrap text-ellipsis">
              {props.resdata.info.cuisines.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
