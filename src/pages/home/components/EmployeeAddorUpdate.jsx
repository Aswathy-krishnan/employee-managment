import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../../home/home.css";
import { Modal } from "react-bootstrap";
import CommonToast from "../../../common/components/CommonToast";
function EmployeeAddorUpdate({
  showAddorUpdateEmployee,
  setShowAddorUpdateEmployee,
  employeeDetails,
  setEmployeeDetails,
  employeeInputValues,
  setEmployeeInputValues,
}) {
  const [toastDetails, setToastDetails] = useState({
    show: false,
    bg: "success",
    text: "",
  });
  const [validation, setValidation] = useState({
    name: {
      isError: false,
      errorMsg: "",
    },
    job: {
      isError: false,
      errorMsg: "",
    },
    email: {
      isError: false,
      errorMsg: "",
    },
  });
  const onChange = (e) => {
    setEmployeeInputValues((preval) => {
      return {
        ...preval,
        [e.target.name]: e.target.value,
      };
    });
  };
  const addNewEmployeeDetail = () => {
    console.log(employeeInputValues);
    if (employeeInputValues.id) {
      let filterEmployee = employeeDetails.filter(
        (employee) => employee.id !== employeeInputValues.id
      );
      setEmployeeDetails(() => {
        return [...filterEmployee, employeeInputValues];
      });
      setToastDetails({
        show: true,
        bg: "success",
        text: "Successfully Updated!",
      });
    } else {
      setToastDetails({
        show: true,
        bg: "success",
        text: "Successfully Added!",
      });
      setEmployeeDetails((preVal) => {
        return [...preVal, { ...employeeInputValues, id: preVal.length + 1 }];
      });
    }

    setShowAddorUpdateEmployee(false);
    clearInputField();
  };
  const clearInputField = () => {
    setEmployeeInputValues(() => {
      return {
        id: 0,
        name: "",
        job: "",
        email: "",
      };
    });
  };
  const closeAddEmployeePopUP = () => {
    setShowAddorUpdateEmployee(false);
    clearInputField();
  };

  const onSaveAddEmployee = () => {
    let isError = false;
    setValidation({
      name: {
        isError: false,
        errorMsg: "",
      },
      job: {
        isError: false,
        errorMsg: "",
      },
      email: {
        isError: false,
        errorMsg: "",
      },
    });

    if (!employeeInputValues.name) {
      isError = true;
      setValidation((preVal) => {
        return {
          ...preVal,
          name: { isError: true, errorMsg: "Please enter a valid name" },
        };
      });
    }
    if (!employeeInputValues.job) {
      isError = true;

      setValidation((preVal) => {
        return {
          ...preVal,
          job: { isError: true, errorMsg: "Please enter a valid job" },
        };
      });
    }
    if (!employeeInputValues.email) {
      isError = true;
      setValidation((preVal) => {
        return {
          ...preVal,
          email: { isError: true, errorMsg: "Please enter a email" },
        };
      });
    } else {
      let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if (!pattern.test(employeeInputValues.email)) {
        isError = true;
        setValidation((preVal) => {
          return {
            ...preVal,
            email: {
              isError: true,
              errorMsg: "Please enter a valid email format",
            },
          };
        });
      }
    }

    if (!isError) {
      addNewEmployeeDetail();
    }
  };
  return (
    <>
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
      <Modal
        show={showAddorUpdateEmployee}
        className="pa-5"
        onHide={closeAddEmployeePopUP}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {employeeInputValues.id ? "Update" : "Add"} Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="validationCustom03"
            >
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={employeeInputValues.name}
                  onChange={onChange}
                  isInvalid={validation.name.isError}
                />
                <Form.Control.Feedback type="invalid">
                  {validation.name.errorMsg}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Job Title
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Job Title"
                  name="job"
                  value={employeeInputValues.job}
                  onChange={onChange}
                  isInvalid={validation.job.isError}
                />
                <Form.Control.Feedback type="invalid">
                  {validation.job.errorMsg}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="email"
                  value={employeeInputValues.email}
                  onChange={onChange}
                  placeholder="Email"
                  isInvalid={validation.email.isError}
                />
                <Form.Control.Feedback type="invalid">
                  {validation.email.errorMsg}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <div>
              {" "}
              <Button variant="success" onClick={onSaveAddEmployee}>
                {employeeInputValues.id ? "UPDATE" : "ADD"}
              </Button>{" "}
              <Button variant="danger" onClick={closeAddEmployeePopUP}>
                CANCEL
              </Button>{" "}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EmployeeAddorUpdate;
