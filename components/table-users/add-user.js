import { Button, Divider, Input, Modal, Text } from "@nextui-org/react";
import React, { useState } from "react";
import { Flex } from "../styles/flex";
import { useSelector } from "react-redux";
import { CONSTANTS } from "../../constants/index.js";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
export const AddUser = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const handler = () => setVisible(true);
  const { accessToken } = useSelector((state) => state.auth);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const url = `${CONSTANTS.API_URL_PROD}/admin/add-user`;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const addUser = async () => {
    try {
      const headers = { Authorization: accessToken };
      const data = await axios.post(
        url,
        { user },
        {
          headers,
        }
      );
      toast.success(data.data.message);
      router.reload();
    } catch (error) {
      console.error("Error adding user", error);
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (e, field) => {
    setUser((prevUser) => ({ ...prevUser, [field]: e.target.value }));
  };

  return (
    <div>
      <Button auto onClick={handler} color={"secondary"}>
        Add User
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        width="600px"
        open={visible}
        onClose={closeHandler}
      >
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 5000,
          }}
        />
        <Modal.Header css={{ justifyContent: "start" }}>
          <Text id="modal-title" h4>
            Add new user
          </Text>
        </Modal.Header>
        <Divider css={{ my: "$5" }} />
        <Modal.Body css={{ py: "$10" }}>
          <Flex
            direction={"column"}
            css={{
              flexWrap: "wrap",
              gap: "$8",
              "@lg": { flexWrap: "nowrap", gap: "$12" },
            }}
          >
            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                label="Name"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Last Name"
                value={user.name}
                onChange={(e) => handleInputChange(e, "name")}
              />
              <Input
                label="Email"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Email"
                value={user.email}
                onChange={(e) => handleInputChange(e, "email")}
              />
            </Flex>

            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                label="Password"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Password"
                value={user.password}
                onChange={(e) => handleInputChange(e, "password")}
              />
              <Input
                label="Confirm Password"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChange={(e) => handleInputChange(e, "confirmPassword")}
              />
            </Flex>
          </Flex>
        </Modal.Body>
        <Divider css={{ my: "$5" }} />
        <Modal.Footer>
          <Button auto onClick={addUser} color={"secondary"}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
