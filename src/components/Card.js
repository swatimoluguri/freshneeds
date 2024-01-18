import { ASSET_URL } from "./Api";

const Card = (props) => {
  return (
    <>
      <div className="rounded-xl w-72 m-4 bg-slate-200 hover:bg-slate-300 hover: cursor-pointer">
        <div className="h-64">
          <img className="rounded-t-xl w-full h-full object-cover" src={ASSET_URL+props.resdata.info.cloudinaryImageId} alt="restaurant"/>
        </div>
        <div className=" m-4 font-bold text-lg">
          <h2>{props.resdata.info.name}</h2>
        </div>
        <div className="px-4 pb-4">
          <p>{props.resdata.info.cuisines.join(", ")}</p>
          <p>Rating: {props.resdata.info.avgRating}</p>
          <p>{props.resdata.info.costForTwo}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
