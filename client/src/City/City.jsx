
import "./City.css";

const City = ({ handleInputChange, city }) => {
  return (
    <city>
      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={city}
          placeholder="Enter any address."
        />
      </div>
     
    </city>
  );
};

export default City;
