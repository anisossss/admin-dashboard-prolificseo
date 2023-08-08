import {
  Table,
  Button,
  Modal,
  Text,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import React from "react";
import { useState, useEffect } from "react";
import { CONSTANTS } from "../../constants/index.js";
import { IconButton } from "../icons/IconButton.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { BsFillReplyAllFill } from "react-icons/bs";
import { AiFillFileExcel } from "react-icons/ai";
import { downloadExcel } from "react-export-table-to-excel";
import { Flex } from "../styles/flex.js";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export const TableWrapper = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const router = useRouter();
  const { accessToken } = useSelector((state) => state.auth);
  const url = `${CONSTANTS.API_URL_PROD}/admin/get-requests`;
  const [reply, setReply] = useState("");
  const openReplyModal = (request) => {
    setSelectedRequest(request);
  };

  const replyHandler = async () => {
    const urlReply = `${CONSTANTS.API_URL_PROD}/admin/reply-requests/${selectedRequest._id}`;
    try {
      const headers = { Authorization: accessToken };
      const data = await axios.post(urlReply, { reply }, { headers });
      toast.success(data.data.message);
    } catch (error) {
      console.error("Error replying to request", error);
      toast.error(error.response.data.message);
    }
  };

  const handleDownloadExcel = () => {
    downloadExcel({
      fileName: "All Requests",
      sheet: "All Requests",
      tablePayload: {
        header: ["Email", "Subject", "Created At"],
        body: requests.map((request) => [
          request.email,
          request.subject,
          new Date(request.createdAt).toLocaleDateString(),
        ]),
      },
    });
  };

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const headers = { Authorization: accessToken };
        const { data } = await axios.get(url, { headers });
        setRequests(data.requests);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchRequests();
  }, []);

  return (
    <>
      <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
        <Button
          auto
          onClick={handleDownloadExcel}
          iconRight={<AiFillFileExcel />}
        >
          Export to CSV
        </Button>
      </Flex>
      <br></br>
      <br></br>
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          minWidth: "100%",
          boxShadow: "none",
          width: "100%",
          px: 0,
        }}
      >
        <Table.Header>
          <Table.Column>Email</Table.Column>
          <Table.Column>Subject</Table.Column>
          <Table.Column>Created At</Table.Column>
          <Table.Column
            css={{
              justifyContent: "flex-start",
            }}
          >
            Actions
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {requests?.map((request) => (
            <Table.Row key={request._id}>
              <Table.Cell>{request.email}</Table.Cell>
              <Table.Cell>{request.subject}</Table.Cell>
              <Table.Cell>
                {new Date(request.createdAt).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell
                css={{
                  alignItems: "right",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Tooltip content="Reply to request">
                  <IconButton onClick={() => openReplyModal(request)}>
                    <BsFillReplyAllFill size={20} />
                  </IconButton>
                </Tooltip>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {selectedRequest && (
        <Modal
          closeButton
          aria-labelledby="modal-title"
          width="600px"
          open={Boolean(selectedRequest)}
          onClose={() => setSelectedRequest(null)}
        >
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 5000,
            }}
          />
          <Modal.Header css={{ justifyContent: "start" }}>
            <Text id="modal-title" h3>
              Reply to {selectedRequest.email}
            </Text>
          </Modal.Header>
          <Modal.Body css={{ py: "$10" }}>
            <Textarea
              clearable
              bordered
              fullWidth
              size="lg"
              placeholder="Type your reply here..."
              value={selectedRequest.reply}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button auto onClick={replyHandler} color={"secondary"}>
              <Text span>Reply</Text>
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
