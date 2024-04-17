// user tabel component
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import MyButton from "./button";
import Pagination from "react-bootstrap/Pagination";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputField from "./input";
import AddMemberModal from "./addMember";
import DeleteModal from "./deleteMember";
import { useNavigate } from "react-router-dom";

const UserTabel = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState("");
  const [getSelectId, setSelectID] = useState("");

  // const API_URL = "https://crudcrud.com/api/ed659bfd8a3847eb8cff4dc878b1b448/members";
  const API_URL = "http://localhost:8888/nadsoft/members";

  // Handle Modal
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleAddMember = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
 
  // Search FIlter
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(member.age).includes(searchQuery) || String(member.parent_id).includes(searchQuery)
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // API Function call
  const callFun = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API_URL,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setMembers(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    try {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${API_URL}/${getSelectId}`,
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          alert("Deleted Successfully");
          setShowDeleteModal(false);
          callFun();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    callFun();
  }, []);

  // Pagination
  const itemsPerPage = 5;
  const totalItems = filteredMembers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Container>
      <Row className="mb-3 justify-content-between">
        <Col>
          <InputField
            placeholder={"Search Member"}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Col>
        <Col>
          <MyButton variant={"success"} onClick={handleAddMember}>
            Add Member
          </MyButton>
        </Col>
        <Col>
          <MyButton variant={"secondary"} onClick={() => navigate("/edit")}>
            Edit Member
          </MyButton>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>id</th>
                <th>Member Name</th>
                <th>Member Email</th>
                <th>Member Age</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((member) => (
                  <tr key={member.parent_id}>
                    <td>{member.parent_id}</td>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>{member.age}</td>
                    <td>
                      <MyButton
                        variant={"danger"}
                        onClick={() => {
                          setShowDeleteModal(true), setSelectID(member._id);
                        }}
                      >
                        Delete
                      </MyButton>
                    </td>
                   
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Pagination>
            <Pagination.Prev
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Col>
      </Row>
      {showModal && (
        <AddMemberModal
          show={showModal}
          handleClose={handleCloseModal}
          callGetFunction={callFun}
        />
      )}

     

      <DeleteModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
      />
    </Container>
  );
};

export default UserTabel;
