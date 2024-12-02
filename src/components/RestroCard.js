import { CDN_URL } from "../../utils/constants";

const RestroCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } = resData.info;
  return (
    <div className="restro-card">
      <div>
        <img className="res-logo" src={CDN_URL+cloudinaryImageId}></img>
      </div>
      <h3>{name}</h3>
      <p>{cuisines.join(", ")}</p>
      <p>{avgRating}</p>
      <p>{costForTwo}</p>
      <p>{sla.deliveryTime} min</p>
    </div>
  );
};
export default RestroCard;
