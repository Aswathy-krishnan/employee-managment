import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import DeletePopup from "./DeletePopup";
import CommonToast from "../../../common/components/CommonToast";

function EmployeeTable({
  employeeDetails,
  setShowAddorUpdateEmployee,
  setEmployeeInputValues,
  setEmployeeDetails,
}) {
  const showUpdatePopUp = (id) => {
    if (!id) {
      return;
    }
    let selectedEmployee = employeeDetails.find(
      (employee) => employee.id === id
    );
    if (!selectedEmployee) {
      return;
    }
    setEmployeeInputValues(selectedEmployee);
    setShowAddorUpdateEmployee(true);
  };

  const [deleteId, setDeleteId] = useState(0);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [toastDetails, setToastDetails] = useState({
    show: false,
    bg: "success",
    text: "",
  });
  const onDeleteEmployee = (id) => {
    setDeleteId(id);
    setShowDeletePopUp(true);
  };
  const OnConfirmDeletePopUP = () => {
    if (!deleteId) {
      return;
    }
    let value = employeeDetails.filter((employee) => employee.id !== deleteId);
    if (!value.length) {
      localStorage.removeItem("VUEZ_EMPLOYEE_DETAILS");
    }
    setEmployeeDetails(value);
    setShowDeletePopUp(false);
    setToastDetails({
      show: true,
      bg: "success",
      text: "Successfully Deleted!",
    });
  };
  return (
    <div className="table-main">
      <CommonToast
        showToast={toastDetails.show}
        closeToast={() => {
          setToastDetails((preVal) => {
            return { ...preVal, show: false };
          });
        }}
        bg={toastDetails.bg}
        text={toastDetails.text}
      />
      {employeeDetails.length ? (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Name</th>
              <th>Job Title</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employeeDetails.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.job}</td>
                <td>{employee.email}</td>
                <td>
                  <i
                    className="bi bi-pencil update-icon mr-5 "
                    onClick={() => showUpdatePopUp(employee.id)}
                  ></i>
                  <i
                    className="bi bi-archive-fill delete-icon ml-5"
                    onClick={() => onDeleteEmployee(employee.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No employee found. Please add an employee !</div>
      )}

      <DeletePopup
        showDeletePopUp={showDeletePopUp}
        setShowDeletePopUp={setShowDeletePopUp}
        OnConfirmDeletePopUP={OnConfirmDeletePopUP}
      />
    </div>
  );
}

export default EmployeeTable;
