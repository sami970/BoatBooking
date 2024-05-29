import BoatType from "./BoatType/BoatType";
import Price from "./Price/Price";

import "./Sidebar.css";

const Sidebar = ({ handleChange }) => {
  return (
    <>
      <section className="sidebar">
        
       
        <Price handleChange={handleChange} />
 
      </section>
    </>
  );
};

export default Sidebar;
