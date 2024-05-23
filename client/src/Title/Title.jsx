
import "./Title.css";

const Title = ({ handleInputChange, query }) => {
  return (
    <title>
      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Enter your search title."
        />
      </div>
     
    </title>
  );
};

export default Title;
