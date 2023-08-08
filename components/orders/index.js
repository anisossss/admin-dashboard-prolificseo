import { Button, Input, Text } from "@nextui-org/react";
import Link from "next/link";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { Flex } from "../styles/flex";
import { TableWrapper } from "../table-orders/index";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { CONSTANTS } from "../../constants/index.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

export const Orders = () => {
  const { accessToken } = useSelector((state) => state.auth);

  var url = `${CONSTANTS.API_URL_PROD}/admin/get-orders`;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const headers = { Authorization: accessToken };
        const data = await axios.get(url, {
          headers,
        });
        setOrders(data.data.orders);
        console.log("data", data.data.orders);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchOrders();
  }, []);
  return (
    <Flex
      css={{
        mt: "$5",
        px: "$6",
        "@sm": {
          mt: "$10",
          px: "$16",
        },
      }}
      justify={"center"}
      direction={"column"}
    >
      <Breadcrumbs>
        <Crumb>
          <HouseIcon />
          <Link href={"/"}>
            <CrumbLink href="#">Home</CrumbLink>
          </Link>
          <Text>/</Text>
        </Crumb>

        <Crumb>
          <PaymentsIcon />
          <CrumbLink href="#">Orders</CrumbLink>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">List</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>All Orders</Text>

      <TableWrapper />
    </Flex>
  );
};
