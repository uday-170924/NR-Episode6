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

  // const fetchData = async () => {
  //   const data = await fetch(
  //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  //   );
  //   const json = await data.json();
  //   console.log(json);
  //   //optional chaining 
  //   setListOfRestaurents(
  //     json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
  //   );
  //   setFilteredRestaurent(
  //     json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
  //   ); 
  //   console.log(json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
  // };
  const fetchData = async () => {
    const url = "https://www.swiggy.com/api/seo/getListing?lat=12.8399090&lng=77.6629680&isDineoutCollection=false";
    const proxyUrl = "https://thingproxy.freeboard.io/fetch/";

    // https://cors-anywhere.herokuapp.com/
    // https://thingproxy.freeboard.io/fetch/
    // https://api.allorigins.win/raw?url=
    
    // Construct the complete payload
    const requestBody = {
        lat: 12.960059122809971,
        lng: 77.57337538383284,
        isDineoutCollection: false,
        sortAttribute: "relevance",
        isFiltered: false,
        nextOffset: "CJY7ELQ4KIDA4Z7D0pfxEzDUEDgE",
        queryId: "seo-data-b2e80253-e09c-4f50-81d6-fad42fd20342",
        seoParams: {
            apiName: "CityPage",
            brandId: "",
            seoUrl: "www.swiggy.com/city/bangalore",
            pageType: "CITY_PAGE",
            businessLine: "FOOD"
        },
        widgetOffset: {
            NewListingView_category_bar_chicletranking_TwoRows: "",
            NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
            Restaurant_Group_WebView_PB_Theme: "",
            Restaurant_Group_WebView_SEO_PB_Theme: "",
            collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: "86",
            inlineFacetFilter: "",
            restaurantCountWidget: ""
        }
    };

    try {
        const response = await fetch(proxyUrl+url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();

        // console.log(jsonData.data.success.cards[0].card.card.gridElements.infoWithStyle.restaurants)


        // Optional chaining to safely access nested properties

        setListOfRestaurents(jsonData.data.success.cards[0].card.card.gridElements.infoWithStyle.restaurants);
        setFilteredRestaurent(jsonData.data.success.cards[0].card.card.gridElements.infoWithStyle.restaurants);
    } catch (error) {
        console.error("Fetch error: ", error);
    }
};
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
            const filteredData = listOfRestaurents.filter(
              (res) => res?.info?.avgRating >= 4.2
            );
            setFilteredRestaurent(filteredData);
            console.log("button clicked");
            console.log(filteredData);
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
