import {useContext, useEffect, useState} from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {UserContext} from "./UserContext.jsx";

export default function BookingWidget({boat}) {
  const [startDate,setStartDate] = useState('');
  const [stopDate,setstopDate] = useState('');
  const [numberOfGuests,setNumberOfGuests] = useState(1);
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [redirect,setRedirect] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfdags = 0;
  if (startDate && stopDate) {
    numberOfdags = differenceInCalendarDays(new Date(stopDate), new Date(startDate));
  }

  async function bookThisboat() {
    const response = await axios.post('/bookings', {
      startDate,stopDate,numberOfGuests,name,phone,
      boat:boat._id,
      price:numberOfdags * boat.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${boat.price} / per day
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Start date:</label>
            <input type="date"
                   value={startDate}
                   onChange={ev => setStartDate(ev.target.value)}/>
          </div>
          <div className="py-3 px-4 border-l">
            <label>Stop date:</label>
            <input type="date" value={stopDate}
                   onChange={ev => setstopDate(ev.target.value)}/>
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input type="number"
                 value={numberOfGuests}
                 onChange={ev => setNumberOfGuests(ev.target.value)}/>
        </div>
        {numberOfdags > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input type="text"
                   value={name}
                   onChange={ev => setName(ev.target.value)}/>
            <label>Phone number:</label>
            <input type="tel"
                   value={phone}
                   onChange={ev => setPhone(ev.target.value)}/>
          </div>
        )}
      </div>
      <button onClick={bookThisboat} className="primary mt-4">
        Book this boat
        {numberOfdags > 0 && (
          <span> ${numberOfdags * boat.price}</span>
        )}
      </button>
    </div>
  );
}