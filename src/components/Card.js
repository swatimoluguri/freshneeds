import { ASSET_URL } from "./Api";

const Card = (props) => {
  return (
    <>
      <div className="card">
        <div className="card-img">
          <img src={ASSET_URL+props.resdata.info.cloudinaryImageId} alt="restaurant"/>
        </div>
        <div className="card-heading">
          <h2>{props.resdata.info.name}</h2>
        </div>
        <div className="card-text">
          <p>{props.resdata.info.cuisines.join(", ")}</p>
          <p>Rating: {props.resdata.info.avgRating}</p>
          <p>{props.resdata.info.costForTwo}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
