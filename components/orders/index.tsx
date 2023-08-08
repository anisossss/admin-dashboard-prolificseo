import { Button, Input, Text } from "@nextui-org/react";
import Link from "next/link";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { Flex } from "../styles/flex";
import { TableWrapper } from "../table-orders/table";
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
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const headers = { Authorization: accessToken };
        const { data } = await axios.post(url, {
          headers,
        });
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchRequests();
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
      <Flex
        css={{ gap: "$8" }}
        align={"center"}
        justify={"between"}
        wrap={"wrap"}
      >
        <Flex
          css={{
            gap: "$6",
            flexWrap: "wrap",
            "@sm": { flexWrap: "nowrap" },
          }}
          align={"center"}
        >
          <Input
            css={{ width: "100%", maxW: "410px" }}
            placeholder="Search users"
          />
        </Flex>
      </Flex>

      <TableWrapper />
    </Flex>
  );
};
