import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Image from "../Image.jsx";
import Sidebar from "../Sidebar/Sidebar";
import Title from "../Title/Title";
import City from "../City/City";

export default function IndexPage() {
  const [apiBoats, setApiBoats] = useState([])
  const [selectedSidePrice, setSelectedSidePrice] = useState(null); 

  useEffect(() => {
    axios.get('/boats').then(response => {
      setApiBoats(response.data);
    });
  }, []);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");

  const handleInputTitleChange = (event) => {
    setQuery(event.target.value);
  };
  const handleInputCityChange = (event) => {
    setCity(event.target.value);
  };


  const filteredItems = apiBoats.filter(
    (boat) => boat.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );


  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedSidePrice(event.target.value);
  };

  function filteredData(apiBoats, selected, query,city) {
    let filteredProducts = apiBoats;

    // Filtering Input Items
    if (query) {
      //apiBoats = filteredItems;
      filteredProducts =filteredItems;
    }

    if (city) {
      console.log(city);
      //apiBoats = filteredItems;
      filteredProducts = filteredProducts.filter(
        (boat) => boat.address.toLowerCase().indexOf(city.toLowerCase()) !== -1
      );
    }

    // Applying selected filter
    if (selected) 
    {  

      filteredProducts = filteredProducts.filter(
        
        ({ address, price, title }) =>
          price.toString() === selected ||
           address === selected ||  
           title === selected
      );
    }

    return filteredProducts;
  }

  const result = filteredData(apiBoats, selectedSidePrice, query,city);

  return (
  <div>    
   

    <header className="flex justify-center">   
   
      <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-5 shadow-md shadow-gray-300">
      <Sidebar className="flex justify-between" handleChange={handleChange} />
      <Title query={query} handleInputChange={handleInputTitleChange} />                   
      <City query={city} handleInputChange={handleInputCityChange} />                   
     
      </div>
     
    </header>


    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
     
      {result.length > 0 && result.map(result => (
        <Link to={'/boat/'+result._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {result.photos?.[0] && (
              <Image className="rounded-2xl object-cover aspect-square" src={result.photos?.[0]} alt=""/>
            )}
          </div>
          <h2 className="font-bold">{result.address}</h2>
          <h3 className="text-sm text-gray-500">{result.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${result.price}</span> per day
          </div>
        </Link>
      ))}
    </div>
    </div>
  );
}
