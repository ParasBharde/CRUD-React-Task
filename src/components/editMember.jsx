import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import InputField from "./input";
import { useNavigate } from "react-router-dom";

function EditMemberModal({ show, handleClose, id }) {
  const [memberInfo, setMemberInfo] = useState({
    name: "",
    email: "",
    age: "",
  });

  // const API_URL = "https://crudcrud.com/api/ed659bfd8a3847eb8cff4dc878b1b448/members";
  const API_URL = "http://localhost:8888/nadsoft/members";
const navigate = useNavigate()
  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/${id}`)
        .then((response) => {
          const { name, email, age } = response.data.data;
          setMemberInfo({ name, email, age });
        })
        .catch((error) => {
          console.log("Error fetching member data:", error);
        });
    }
  }, [id]);

  const handleUpdate = () => {
    try {
      let data = JSON.stringify({
        name: memberInfo.name,
        email: memberInfo.email,
        age: memberInfo.age,
      });

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${API_URL}/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          handleClose();
          alert("Member Update Succesfully");
          navigate("/")
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
        <Modal.Title>Update Member</Modal.Title>
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
          <Form.Group controlId="formAge" className="mb-4">
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

          <Button variant="primary" onClick={handleUpdate}>
            Update Member
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditMemberModal;
