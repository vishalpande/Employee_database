import React, { useEffect, useState } from "react";
import { json, useLocation, useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../service/EmployeeService";

function Edit({ empData }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [formDetails, setFormDetails] = useState({
    id: "",
    name: "",
    age: "",
    city: "",
  });

  useEffect(() => {
    if (
      location.state &&
      location.state.empArr &&
      location.state.empArr.length > 0
    ) {
      const employee = location.state.empArr[0];
      setFormDetails(employee);
    } else {
      setFormDetails({
        id: "",
        name: "",
        age: "",
        city: "",
      });
    }
  }, [location.state]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formDetails.id ||
      !formDetails.name ||
      !formDetails.age ||
      !formDetails.city
    ) {
      alert("Please fill all the fields");
      return;
    }

    const employee = {
      id: parseInt(formDetails.id),
      name: formDetails.name,
      age: parseInt(formDetails.age),
      city: formDetails.city,
    };

    EmployeeService.updateEmployee(employee)
      .then((result) => {
        console.log(result);
        setFormDetails({
          id: "",
          name: "",
          age: "",
          city: "",
        });
        navigate("/table");
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
        // Handle error appropriately (e.g., display error message)
      });
  };

  return (
    <div className="container  container-add  " style={{ width: "950px" }}>
      <h2>Employee Update Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="empId">Employee ID:</label>
          <input
            type="text"
            className="form-control"
            id="empId"
            name="id"
            value={formDetails.id}
            onChange={handleChange}
            required
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={formDetails.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">city:</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formDetails.city}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

export default Edit;
