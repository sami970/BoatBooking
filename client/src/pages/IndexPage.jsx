import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Image from "../Image.jsx";
import Sidebar from "../components/Sidebar/Sidebar";
import Title from "../components/Title/Title";
import City from "../components/City/City";



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
  const [boatType, setBoatType] = useState("");

  const handleInputTitleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleInputBoatTypeChange = (event) => {
    console.log(event.target.value);
    setBoatType(event.target.value);
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

  function filteredData(apiBoats, selected, query,city,boatType) {
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


    
    if (boatType ) {
      console.log(boatType);
      
      if(boatType.toLowerCase()==="all"){
        filteredProducts = filteredProducts
      }
      else{
        filteredProducts = filteredProducts.filter(
          (boat) => boat.boattype.toLowerCase().indexOf(boatType.toLowerCase()) !== -1
        );
      }

      
    }

    // Applying selected filter
    if (selected) 
    {  

      filteredProducts = filteredProducts.filter(
        
        ({price }) =>
          price <= parseInt(selected)  
      );
    }

    return filteredProducts;
  }

  const result = filteredData(apiBoats, selectedSidePrice, query,city,boatType);

  return (
  <div>    
   

    <header className="flex justify-center">   
   
      <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-5 shadow-md shadow-gray-300">
      <Sidebar className="flex justify-between" handleChange={handleChange} />
      <Title query={query} handleInputChange={handleInputTitleChange} />        
      
      <select
        className="flex gap-2 border border-gray-300 rounded-full py-2 px-5 shadow-md shadow-gray-300 w-51 h-10 bg-blue-200 rounded-partial-tl "
        name="boatType"
        value={boatType}
        onChange={handleInputBoatTypeChange}
      >
        <option value="all">All</option>
        <option value="motorboat">Motorboat</option>
        <option value="rib">RIB</option>
        <option value="jet ski">Jet ski</option>
        <option value="houseboat">Houseboat</option>
        <option value="motor yacht">Motor yacht</option>
        <option value="sailboat">Sailboat</option>
        <option value="catamaran">Catamaran</option>
        <option value="gulet">Gulet</option>
        <option value="sailing yacht">Sailing yacht</option>
      </select>    

      <City query={city} handleInputChange={handleInputCityChange} />                   
     
      </div>
     
    </header>


    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
     
      {result.length > 0 && result.map(result => (
        <Link to={'/boat/'+result._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {result.photos?.[0] && (
              <Image className="rounded-2xl object-cover aspect-square"
               src={result.photos?.[0]} alt=""/>
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
