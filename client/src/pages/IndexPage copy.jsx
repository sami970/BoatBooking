import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Image from "../Image.jsx";

import Navigation from "../Navigation/Nav";

export default function IndexPage() {
  const [apiBoats, setApiBoats] = useState([])
  const [searchBoatType, setsearchBoatType] = useState('')
  const [searchBoatAddress, setsearchBoatAddress] = useState('')
  // set the initial state of filteredBoats to an empty array
  const [filteredBoats, setFilteredBoats] = useState([])

  useEffect(() => {
    axios.get('/boats').then(response => {
      setApiBoats(response.data);
    });
  }, []);

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value; 
   
    setsearchBoatType(searchTerm)

    // filter the items using the apiUsers state
    const filteredItems = apiBoats.filter((boat) =>
      boat.boattype.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredBoats(filteredItems);
  }


  return (
  <div>
  
    <header className="flex justify-center"> 
    <Navigation query={searchBoatAddress} handleInputChange={handleInputChange} />

      <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">

      <input
          type="text"
          id ="BoatAddressId"
          value={searchBoatAddress}
          
          placeholder='Address'
        /> 

        <div><input type="checkbox" id="pets" name="pets" value="Pets"/> Pets</div>
        <div className="border-l border-gray-300"></div>
        <div><input type="checkbox" id="wifi" name="wifi" value="Wifi"/> Wifi</div>
        <div className="border-l border-gray-300"></div>
      
        <input
          type="text"
          id ="searchBoatType"
          value={searchBoatType}
          onChange={handleInputChange}
          placeholder='Boat type'
        />     
       

        <button className="bg-primary text-white p-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
     
    </header>


    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
     
      {filteredBoats.length > 0 && filteredBoats.map(filteredBoats => (
        <Link to={'/boat/'+filteredBoats._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {filteredBoats.photos?.[0] && (
              <Image className="rounded-2xl object-cover aspect-square" src={filteredBoats.photos?.[0]} alt=""/>
            )}
          </div>
          <h2 className="font-bold">{filteredBoats.address}</h2>
          <h3 className="text-sm text-gray-500">{filteredBoats.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${filteredBoats.price}</span> per day
          </div>
        </Link>
      ))}
    </div>
    </div>
  );
}
