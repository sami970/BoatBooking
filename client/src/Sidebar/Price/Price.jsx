import Input from "../../components/Input";
import "./Price.css";

const Price = ({ handleChange }) => {
  return (
    <>
      <div className="ml">        

        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test2" />
          <span className="checkmark"></span>All
        </label>

        <Input
          handleChange={handleChange}
          value={1500}
          title="0 -1500$"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={1900}
          title="0 -1900$"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={2300}
          title="0 -2300$"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={4000}
          title="0 -4000$"
          name="test2"
        />
      </div>
    </>
  );
};

export default Price;
