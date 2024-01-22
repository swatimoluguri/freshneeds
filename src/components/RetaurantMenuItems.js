import { ASSET_URL } from "./Api";
import nonveg from "../assets/nonveg.png";
import veg from "../assets/veg.png";
import { useState } from "react";

const RetaurantMenuItems = (props) => {
  const [showItems, SetShowItems] = useState(false);
  const HandleClick = () => {
    SetShowItems(!showItems);
  };
  return (
    <div>
      {props.itemList?.hasOwnProperty("categories") ? (
        props.itemList?.categories?.map((itm) => (
          <div className="p-4 shadow-lg " onClick={HandleClick}>
            <h4 className="font-bold">{itm?.title}</h4>
            {showItems && (
              <ul>
                {itm?.itemCards?.map((categoryItm) => (
                  <li key={categoryItm?.card?.info?.id}>
                    <p>{categoryItm?.card?.info?.name}</p>
                    <p>₹{categoryItm?.card?.info?.price / 100}</p>
                    <img
                      src={ASSET_URL + categoryItm?.card?.info?.imageId}
                      alt={categoryItm?.card?.info?.name}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      ) : (
        <div>
          <ul>
            {props.itemList?.itemCards?.map((itm) => (
              <li
                className="flex justify-between p-2 border-b-2"
                key={itm?.card?.info?.id}
              >
                <div className="w-9/12 flex flex-col ">
                  <img
                    className="mt-5 h-4 w-4"
                    src={
                      itm?.card?.info?.itemAttribute?.vegClassifier === "VEG"
                        ? veg
                        : nonveg
                    }
                    alt=""
                  />
                  <p className="font-bold">{itm?.card?.info?.name}</p>
                  <p>₹{itm?.card?.info?.price / 100}</p>
                  <p className="font-extralight text-gray-400 text-sm">
                    {itm?.card?.info?.description}
                  </p>
                </div>

                <div className="w-3/12 flex flex-col justify-center items-center relative my-2">
                  <button className="absolute bg-white px-4 py-1 rounded-lg font-semibold shadow-md">
                    ADD
                  </button>

                  {itm?.card?.info?.showImage && (
                    <div className="overflow-hidden rounded-3xl h-28 w-full">
                      <img
                        className="object-cover w-full h-full p-2"
                        src={ASSET_URL + itm?.card?.info?.imageId}
                        alt={itm?.card?.info?.name}
                      />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RetaurantMenuItems;
