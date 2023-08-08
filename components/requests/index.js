import { Button, Input, Text } from "@nextui-org/react";
import Link from "next/link";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { DotsIcon } from "../icons/accounts/dots-icon";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { Flex } from "../styles/flex";
import { TableWrapper } from "../table-requests/index";
import { CONSTANTS } from "../../constants/index.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const Requests = () => {
  var url = `${CONSTANTS.API_URL_PROD}/admin/get-requests`;
  const [user, setUser] = useState("");
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const headers = { Authorization: accessToken };
        const { data } = await axios.get(url, {
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
          <ReportsIcon />
          <CrumbLink href="#">Requests</CrumbLink>
          <Text>/</Text>
        </Crumb>
        <Crumb>
          <CrumbLink href="#">List</CrumbLink>
        </Crumb>
      </Breadcrumbs>

      <Text h3>All Requests</Text>

      <TableWrapper />
    </Flex>
  );
};
