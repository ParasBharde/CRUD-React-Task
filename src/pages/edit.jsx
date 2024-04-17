import React, { useState, useEffect } from "react";
import { Dropdown, Form } from "react-bootstrap";
import axios from "axios";
import MyButton from "../components/button";
import EditMemberModal from "../components/editMember";

function Edit() {
  const [memberOptions, setMemberOptions] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [selectName, setName] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // const API_URL = "https://crudcrud.com/api/ed659bfd8a3847eb8cff4dc878b1b448/members";
  const API_URL = "http://localhost:8888/nadsoft/members";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setMemberOptions(response.data.data);
      })
      .catch((error) => {
        console.log("Error fetching member data:", error);
      });
  }, [selectedMemberId]);

  const handleMemberSelect = (memberId) => {
    setSelectedMemberId(memberId);
  };

  return (
    <>
      <h3>Select Member</h3>
      <Form>
        <Form.Group controlId="formMember" className="mb-4">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-member">
              {selectedMemberId
                ? memberOptions.find(
                    (member) => member._id === selectedMemberId
                  )?.name || "Select"
                : "Select Member"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {memberOptions.map((member) => (
                <Dropdown.Item
                  eventKey={member._id}
                  onClick={() => {
                    handleMemberSelect(member._id), setName(member.name);
                  }}
                >
                  {member?.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        {selectedMemberId && (
          <Form.Group>
            <MyButton
              variant={"secondary"}
              onClick={() => setShowUpdateModal(true)}
            >
              Update {selectName}
            </MyButton>
          </Form.Group>
        )}
      </Form>
      {showUpdateModal && (
        <EditMemberModal
          id={selectedMemberId}
          show={showUpdateModal}
          handleClose={() => setShowUpdateModal(false)}
        />
      )}
    </>
  );
}

export default Edit;
