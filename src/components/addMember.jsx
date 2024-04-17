import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import InputField from "./input";

function AddMemberModal({ show, handleClose, callGetFunction }) {
  const [memberInfo, setMemberInfo] = useState({
    name: "",
    email: "",
    age: "",
    pid: "",
  });

  // const API_URL = "https://crudcrud.com/api/ed659bfd8a3847eb8cff4dc878b1b448/members";
  const API_URL = "http://localhost:8888/nadsoft/members";


  const handleSubmit = () => {
    try {
      let data = JSON.stringify({
        name: memberInfo.name,
        email: memberInfo.email,
        age: memberInfo.age,
        parent_id: memberInfo.pid,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: API_URL,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          handleClose();
          callGetFunction()
          alert("Member Create Succesfully")

        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Member Name</Form.Label>
            <InputField
              type="text"
              placeholder="Enter name"
              name="name"
              value={memberInfo.name}
              onChange={(e) =>
                setMemberInfo({ ...memberInfo, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Member Email</Form.Label>
            <InputField
              type="email"
              placeholder="Enter email"
              name="email"
              value={memberInfo.email}
              onChange={(e) =>
                setMemberInfo({ ...memberInfo, email: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formAge" >
            <Form.Label>Member Age</Form.Label>
            <InputField
              type="number"
              placeholder="Enter age"
              name="age"
              value={memberInfo.age}
              onChange={(e) =>
                setMemberInfo({ ...memberInfo, age: e.target.value })
              }
            />
          </Form.Group>
            <Form.Group controlId="formAge" className="mb-4">
              <Form.Label>Parent Id</Form.Label>
              <InputField
                type="number"
                placeholder="Enter Id"
                name="parentid"
                value={memberInfo.pid}
                onChange={(e) =>
                  setMemberInfo({ ...memberInfo, pid: e.target.value })
                }
              />
            </Form.Group>

          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddMemberModal;
