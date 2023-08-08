import { Button, Divider, Input, Modal, Text } from "@nextui-org/react";
import React, { useState } from "react";
import { Flex } from "../styles/flex";
import { useSelector } from "react-redux";
import { CONSTANTS } from "../../constants/index.js";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export const Reply = () => {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const { accessToken } = useSelector((state) => state.auth);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  var url = `${CONSTANTS.API_URL_PROD}/admin/reply-requests`;
  const [user, setUser] = useState("");

  const replyRequest = async () => {
    try {
      const headers = { Authorization: accessToken };
      const { data } = await axios.post(
        url,
        { data },
        {
          headers,
        }
      );
      setUser(data.user);
    } catch (error) {
      console.error("Error adding user", error);
    }
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
              />
              <Input
                label="Email"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Email"
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
              />
              <Input
                label="Confirm Password"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Confirm Password"
              />
            </Flex>
          </Flex>
        </Modal.Body>
        <Divider css={{ my: "$5" }} />
        <Modal.Footer>
          <Button auto onClick={closeHandler} color={"secondary"}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
