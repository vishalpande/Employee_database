import React, { useRef } from "react";
import { useState } from "react";
import EmployeeService from "../service/EmployeeService";
function AddEmp({ addData }) {
  const [formdetails, setformdetails] = useState({
    id: "",
    name: "",
    age: "",
    city: "",
  });
  const handlechange = (event) => {
    //name is value of the textbox on which change event occur
    //values is the value typed in the text box

    var name = event.target.name;
    var value = event.target.value;

    //var {name,value}=event.target;

    setformdetails({ ...formdetails, [name]: value });
  };

  const addproduct = (event) => {
    event.preventDefault(); //stops the default refresh action of submit button
    if (
      formdetails.id === "" ||
      formdetails.name === "" ||
      formdetails.age === "" ||
      formdetails.city === ""
    ) {
      alert("Pls fill all the fields");
      return;
    }
    //create a product object
    var p = {
      id: parseInt(formdetails.id),
      name: formdetails.name,
      age: parseInt(formdetails.age),
      city: formdetails.city,
    };
    //add a new product in array
    EmployeeService.addEmployee(p)

      .then((result) => {
        console.log(result);
        //to clear the form
        setformdetails({ id: "", name: "", age: "", city: "" });
        //to navigate to table url through program
        navigate("/table");
      })
      .catch(() => {});
  };

  return (
    <div className="container  container-add  " style={{ width: "950px" }}>
      <h2>Employee Information Form</h2>
      <form onSubmit={addproduct}>
        <div className="form-group">
          <label htmlFor="empId">Employee ID:</label>
          <input
            type="text"
            className="form-control"
            id="empId"
            name="id"
            value={formdetails.id}
            onChange={handlechange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formdetails.name}
            onChange={handlechange}
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
            value={formdetails.age}
            onChange={handlechange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formdetails.city}
            onChange={handlechange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddEmp;
