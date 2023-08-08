import {
  Table,
  Text,
  Button,
  Col,
  Row,
  Modal,
  Grid,
  Input,
  Tooltip,
} from "@nextui-org/react";
import React from "react";
import { useState, useEffect } from "react";
import { CONSTANTS } from "../../constants/index.js";
import { IconButton } from "../icons/IconButton.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { DeleteIcon } from "../icons/table/delete-icon.tsx";
import { EyeIcon } from "../icons/table/eye-icon.jsx";
import { BsDatabaseAdd } from "react-icons/bs";
import { downloadExcel } from "react-export-table-to-excel";
import { AiFillFileExcel } from "react-icons/ai";
import { AddUser } from "./add-user.js";
import { Flex } from "../styles/flex.ts";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export const TableWrapper = () => {
  const router = useRouter();
  const { accessToken } = useSelector((state) => state.auth);
  const [addCreditsVisible, setAddCreditsVisible] = useState(false);
  const [deleteUserVisible, setDeleteUserVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const openAddCreditsModal = (user) => {
    setSelectedUser(user);
    setAddCreditsVisible(true);
  };
  const openDeleteUserModal = (user) => {
    setSelectedUser(user);
    setDeleteUserVisible(true);
  };
  const closeAddCreditsModal = () => {
    setAddCreditsVisible(false);
    setSelectedUser(null);
  };
  const closeDeleteUserModal = () => {
    setDeleteUserVisible(false);
    setSelectedUser(null);
  };

  var url = `${CONSTANTS.API_URL_PROD}/admin/users-accounts`;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const headers = { Authorization: accessToken };
        const response = await axios.get(url, {
          headers,
        });
        console.log("data", response.data.users);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchUsers();
  }, []);
  function handleDownloadExcel() {
    downloadExcel({
      fileName: "All users",
      sheet: "All users",
      tablePayload: {
        header: ["Email", "Verified", "Orders", "Current Plan", "Credits"],
        body: users.map((item) => [
          item.email,
          item.verified,
          item.orders,
          item.currentPlan,
          item.credits,
        ]),
      },
    });
  }
  const [creditsToAdd, setCreditsToAdd] = useState(0);

  const handleAddCredits = async () => {
    try {
      const headers = { Authorization: accessToken };
      const response = await axios.post(
        `${CONSTANTS.API_URL_PROD}/admin/add-credits/${selectedUser._id}`,
        { credits: creditsToAdd },
        { headers }
      );
      console.log("Credits added successfully");
      router.reload();
    } catch (error) {
      console.error("Error adding credits", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const headers = { Authorization: accessToken };
      console.log("headers", headers);

      const response = await axios.post(
        `${CONSTANTS.API_URL_PROD}/admin/delete-user/${selectedUser._id}`,
        {},
        { headers }
      );
      console.log("User deleted successfully");
      router.reload();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting user", error);
      toast.error("Error deleting user");
    }
  };

  return (
    <>
      <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
        <AddUser />
        <Button
          auto
          onClick={handleDownloadExcel}
          iconRight={<AiFillFileExcel />}
        >
          Export to CSV
        </Button>
      </Flex>
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          px: 0,
        }}
      >
        <Table.Header>
          <Table.Column>Email</Table.Column>
          <Table.Column>Verified</Table.Column>
          <Table.Column>Orders</Table.Column>
          <Table.Column>Current Plan</Table.Column>
          <Table.Column>Credits</Table.Column>
          <Table.Column css={{ textAlign: "center" }}>Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user._id}>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.emailVerified ? "✅" : "❌"}</Table.Cell>
              <Table.Cell>{user.orders.length}</Table.Cell>
              <Table.Cell>{user.currentPlan}</Table.Cell>
              <Table.Cell>{user.credits}</Table.Cell>
              <Table.Cell>
                <Row justify="center" align="center">
                  <Col>
                    <Tooltip content="Add Credits">
                      <Button
                        onClick={() => openAddCreditsModal(user)}
                        css={{
                          background: "transparent",
                          width: "10em",
                          textAlign: "right",
                        }}
                      >
                        <BsDatabaseAdd />
                      </Button>
                    </Tooltip>
                    <Modal
                      closeButton
                      preventClose
                      open={addCreditsVisible}
                      onClose={closeAddCreditsModal}
                      scroll
                      width="500px"
                      aria-labelledby="modal-title"
                      aria-describedby="modal-description"
                    >
                      <Toaster
                        position="top-center"
                        toastOptions={{
                          duration: 5000,
                        }}
                      />
                      <Modal.Header>
                        <Text h3>Add Credits</Text>
                      </Modal.Header>
                      <Modal.Body>
                        <Input
                          color="primary"
                          type="number"
                          value={creditsToAdd}
                          onChange={(e) => setCreditsToAdd(e.target.value)}
                        />
                      </Modal.Body>
                      <Modal.Footer css={{ margin: "auto" }}>
                        <Button onClick={handleAddCredits}>Add</Button>
                        <Button onClick={closeAddCreditsModal} color="error">
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                  <Col>
                    <Tooltip content="Delete user" color="error">
                      <IconButton onClick={() => openDeleteUserModal(user)}>
                        <DeleteIcon size={20} fill="#FF0080" />

                        <Modal
                          closeButton
                          preventClose
                          open={deleteUserVisible}
                          onClose={closeDeleteUserModal}
                          scroll
                          width="500px"
                          aria-labelledby="modal-title"
                          aria-describedby="modal-description"
                        >
                          <Toaster
                            position="top-center"
                            toastOptions={{
                              duration: 7000,
                            }}
                          />
                          <Modal.Header>
                            <Text span id="modal-title" size={18}>
                              Are you sure to delete this user ?<br></br>
                              <br></br>
                            </Text>
                          </Modal.Header>
                          <Modal.Body>
                            <Button
                              flat
                              color="error"
                              onPress={closeDeleteUserModal}
                            >
                              Cancel
                            </Button>
                            <Button
                              color="secondary"
                              onPress={handleDeleteUser}
                            >
                              Yes
                            </Button>
                          </Modal.Body>
                        </Modal>
                      </IconButton>
                    </Tooltip>
                  </Col>
                </Row>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
