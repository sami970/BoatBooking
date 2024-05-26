import {Link, Navigate,useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import axios from "axios";
import BookingWidget from "../components/Booking/BookingWidget";
import BoatGallery from "../components/Booking/BoatGallery";
import AddressLink from "../components/Booking/AddressLink";
import {useContext} from "react";
import {UserContext} from "../UserContext.jsx";


export default function BoatPage() {
  const {user} = useContext(UserContext);
  const {id} = useParams();
  const [boat,setBoat] = useState(null);
  

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/boats/${id}`).then(response => {
      setBoat(response.data);
    });
  }, [id]);

  if (!boat) return '';

  if (!user)
    {
       return <Navigate to={'/login'} />
       
     
    }



  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{boat.title}</h1>
      <AddressLink>{boat.address}</AddressLink>
      <BoatGallery boat={boat} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {boat.description}
          </div>
          Check-in: {boat.startDate}<br />
          Check-out: {boat.stopDate}<br />
          Max number of guests: {boat.maxGuests}
        </div>
        <div>
          <BookingWidget boat={boat} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{boat.extraInfo}</div>
      </div>
    </div>
  );
}
