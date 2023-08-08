import { Table, Button } from "@nextui-org/react";
import React from "react";
import { useState, useEffect } from "react";
import { CONSTANTS } from "../../constants/index.js";
import { IconButton } from "../icons/IconButton.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { downloadExcel } from "react-export-table-to-excel";
import { AiFillFileExcel } from "react-icons/ai";
import { Flex } from "../styles/flex.js";

export const TableWrapper = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const url = `${CONSTANTS.API_URL_PROD}/admin/get-orders`;

  const [orders, setOrders] = useState([]);
  function handleDownloadExcel() {
    downloadExcel({
      fileName: "All orders",
      sheet: "All orders",
      tablePayload: {
        header: ["User", "Status", "Plan", "Created At"],
        body: orders.map((order) => [
          order.userName,
          order.status,
          order.plan,
          order.createAt,
        ]),
      },
    });
  }
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const headers = { Authorization: accessToken };
        const { data } = await axios.get(url, {
          headers,
        });
        setOrders(data.orders);
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchOrders();
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
          <Table.Column>User</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Plan</Table.Column>
          <Table.Column>Created At</Table.Column>
        </Table.Header>
        <Table.Body>
          {orders.map((order) => (
            <Table.Row key={order._id}>
              <Table.Cell>{order.userName}</Table.Cell>
              <Table.Cell>{order.status}</Table.Cell>
              <Table.Cell>{order.plan}</Table.Cell>
              <Table.Cell>
                {new Date(order.createdAt).toLocaleDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};
