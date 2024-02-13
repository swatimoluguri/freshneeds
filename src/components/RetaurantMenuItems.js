import { ASSET_URL } from "./Api";
import nonveg from "../assets/nonveg.png";
import veg from "../assets/veg.png";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCart } from "../utils/CartSlice";
import { useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "../index.css";

const RetaurantMenuItems = ({ itemList, resName, showItems }) => {
  const resId = useParams();
  const [showSubItems, SetShowSubItems] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart.items);
  const HandleClick = () => {
    SetShowSubItems(!showSubItems);
  };
  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const HandleAddItemToCart = (itm) => {
    if (
      cart.length === 0 ||
      (cart.length > 0 && cart[cart.length - 1].restaurantId === resId.resId)
    ) {
      const newItem = {
        ...itm,
        restaurantId: resId.resId,
        restaurantName: resName,
      };
      dispatch(addItem(newItem));
    } else {
      confirmAlert({
        title: "Items already in cart !",
        message:
          "Your cart contains items from another restaurant. Would you like to reset your cart for adding items from this restaurant?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              dispatch(clearCart());
              const newItem = {
                ...itm,
                restaurantId: resId.resId,
                restaurantName: resName,
              };
              dispatch(addItem(newItem));
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    }
  };

  return (
    showItems && (
      <div>
        {itemList?.hasOwnProperty("categories") ? (
          itemList?.categories?.map((itm) => (
            <div className="p-4 shadow-lg " onClick={HandleClick}>
              <h4 className="font-bold">{itm?.title}</h4>
              {showSubItems && (
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
              {itemList?.itemCards?.map((itm) => (
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
                    <button
                      className="absolute bg-green-600 text-white px-4 py-1 rounded-lg font-semibold shadow-md bottom-0 transform translate-y-1 active:scale-95"
                      onClick={() => HandleAddItemToCart(itm)}
                    >
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
    )
  );
};

export default RetaurantMenuItems;
