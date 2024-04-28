import React, { useEffect, useState } from "react";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeAddorUpdate from "./components/EmployeeAddorUpdate";
import "../home/home.css";
import { Button } from "react-bootstrap";
function Home() {
  const [showAddorUpdateEmployee, setShowAddorUpdateEmployee] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [employeeInputValues, setEmployeeInputValues] = useState({
    id: 0,
    name: "",
    job: "",
    email: "",
  });
  const [searchValue, setSearchValue] = useState("");
  const getLocalEmployeData = () => {
    let employeeDetails = [];
    let localData = localStorage.getItem("VUEZ_EMPLOYEE_DETAILS");
    if (!localData) {
      return employeeDetails;
    }
    employeeDetails = JSON.parse(localData);
    return employeeDetails;
  };
  useEffect(() => {
    setEmployeeDetails(getLocalEmployeData());
  }, []);

  useEffect(() => {
    if (!employeeDetails.length) {
      return;
    }
    if (searchValue) {
      return;
    }
    localStorage.setItem(
      "VUEZ_EMPLOYEE_DETAILS",
      JSON.stringify(employeeDetails)
    );
  }, [employeeDetails]);

  const onSearchChange = (e) => {
    let search = e.target?.value;
    setSearchValue(search);
    search = search.toLowerCase();
    let localValue = getLocalEmployeData();
    let searchData = localValue.filter(
      (employe) =>
        employe?.name.toLowerCase().includes(search) ||
        employe?.job.toLowerCase().includes(search) ||
        employe?.email.toLowerCase().includes(search)
    );
    setEmployeeDetails(searchData);
  };
  return (
    <div>
      <EmployeeAddorUpdate
        showAddorUpdateEmployee={showAddorUpdateEmployee}
        setShowAddorUpdateEmployee={setShowAddorUpdateEmployee}
        setEmployeeDetails={setEmployeeDetails}
        employeeInputValues={employeeInputValues}
        setEmployeeInputValues={setEmployeeInputValues}
        employeeDetails={employeeDetails}
      />
      <h3 className="mb-3">Employee Management Table</h3>
      <div className="text-right mb-4  search-add">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          onChange={onSearchChange}
          value={searchValue}
        />
        <Button
          onClick={() => setShowAddorUpdateEmployee(true)}
          variant="primary"
        >
          <i className="bi bi-plus mr-2"></i>
          Add Employee
        </Button>
      </div>
      <div>
        <EmployeeTable
          employeeDetails={employeeDetails}
          setShowAddorUpdateEmployee={setShowAddorUpdateEmployee}
          setEmployeeInputValues={setEmployeeInputValues}
          setEmployeeDetails={setEmployeeDetails}
        />
      </div>
    </div>
  );
}

export default Home;
