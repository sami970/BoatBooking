import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import {Navigate, useParams} from "react-router-dom";

export default function BoatsFormPage() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [boattype,setBoatType] = useState('');
  const [address,setAddress] = useState('');
  const [addedPhotos,setAddedPhotos] = useState([]);
  const [description,setDescription] = useState('');
  const [perks,setPerks] = useState([]);
  const [extraInfo,setExtraInfo] = useState('');
  const [startDate,setStartDate] = useState('');
  const [stopDate,setStopDate] = useState('');
  const [maxGuests,setMaxGuests] = useState(1);
  const [price,setPrice] = useState(100);
  const [redirect,setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/boats/'+id).then(response => {
       const {data} = response;
       setTitle(data.title);
       setBoatType(data.boattype);
       setAddress(data.address);
       setAddedPhotos(data.photos);
       setDescription(data.description);
       setPerks(data.perks);
       setExtraInfo(data.extraInfo);
       setStartDate(data.startDate);
       setStopDate(data.stopDate);
       setMaxGuests(data.maxGuests);
       setPrice(data.price);
    });
  }, [id]);
  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }
  function preInput(header,description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function saveBoat(ev) {
    ev.preventDefault();
    const boatData = {
      title, boattype,address, addedPhotos,
      description, perks, extraInfo,
      startDate, stopDate, maxGuests, price,
    };
    if (id) {
      // update
      await axios.put('/boats', {
        id, ...boatData
      });
      setRedirect(true);
    } else {
      // new boat
      await axios.post('/boats', boatData);
      setRedirect(true);
    }

  }

  if (redirect) {
    return <Navigate to={'/account/boats'} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={saveBoat}>
        {preInput('Title', 'Title for your boat. should be short and catchy as in advertisement')}
        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt"/>
        
        {preInput('Boat type', 'Choose boat type')}
        <input type="text" value={boattype} onChange={ev => setBoatType(ev.target.value)} placeholder="boat type"/>

        {preInput('Address', 'Address to this boat')}
        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)}placeholder="address"/>
        {preInput('Photos','more = better')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput('Description','description of the boat')}
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
        {preInput('Perks','select all the perks of your boat')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput('Extra info','house rules, etc')}
        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
        {preInput('Start & Stop dates','add start and stop times, remember to have some time window for cleaning the boat between guests')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Start date</h3>
            <input type="text"
                   value={startDate}
                   onChange={ev => setStartDate(ev.target.value)}
                   placeholder="14"/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Stop date</h3>
            <input type="text"
                   value={stopDate}
                   onChange={ev => setStopDate(ev.target.value)}
                   placeholder="11" />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input type="number" value={maxGuests}
                   onChange={ev => setMaxGuests(ev.target.value)}/>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per day</h3>
            <input type="number" value={price}
                   onChange={ev => setPrice(ev.target.value)}/>
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}