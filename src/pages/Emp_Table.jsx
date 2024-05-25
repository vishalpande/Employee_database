import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Employee from "../service/EmployeeService";

function Emp_Table() {
  debugger;
  var [empArr, setEmpArr] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    Employee.getAllEmployees()
      .then((result) => {
        setEmpArr(result); // Update state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };
  const onDelete=(id)=>{
    Employee.deleteEmployee(id)
    .then((result)=>{
        fetchData(); 
    })
    .catch(()=>{})

}
  return (
    <div className="container">
      <h2>Employee Information Table</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {empArr.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.age}</td>
              <td>{employee.city}</td>
              <td>
                <Link
                  to={{
                    pathname: `/edit/${employee.id}`,
                  }}
                  state={{ empArr: empArr }}
                  className="btn btn-warning btn-sm mr-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Emp_Table;
