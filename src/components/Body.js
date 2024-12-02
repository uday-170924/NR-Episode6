import RestroCard from "./RestroCard";
// import resObj from "../../utils/mockdata";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurents, setListOfRestaurents] = useState([]);
  const [filteredRestaurent, setFilteredRestaurent] = useState([]);
  const [searchText, setSearchText] = useState("");
  // console.log("body compoents is rendering on every letter typing in input box")
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.956924&lng=77.701127&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    // console.log(json);
    //optional chaining 
    setListOfRestaurents(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurent(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  // if ( listOfRestaurents.length === 0) {
  //   return <h1>Loading...</h1>;
  // }

  return listOfRestaurents.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="input-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              const filteredRestaurent = listOfRestaurents.filter((restaurants) =>
                restaurants.info.name.toLowerCase().includes(searchText)
              );
              setFilteredRestaurent(filteredRestaurent);
            }}
          >
            search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredLIst = listOfRestaurents.filter(
              (res) => res.info.avgRating > 4.4
            );
            setListOfRestaurents(filteredLIst);
          }}
        >
          Top-rated Restaurant
        </button>
      </div>
      <div className="restro-container">
        {filteredRestaurent.map((restaurant) => (
          <RestroCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
