import { Card, Text } from "@nextui-org/react";
import { Community } from "../icons/community";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";
import { CONSTANTS } from "../../constants/index.js";
import axios from "axios";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

export const CardBalance1 = () => {
  const { accessToken } = useSelector((state) => state.auth);

  var url = `${CONSTANTS.API_URL_PROD}/admin/statistics`;
  const [totalUsers, setTotalUsers] = useState("");

  useEffect(() => {
    const fetchNbrUsers = async () => {
      try {
        const headers = { Authorization: accessToken };
        const { data } = await axios.get(url, {
          headers,
        });
        setTotalUsers(data.nbrUsers);
      } catch (error) {
        console.error("Error fetching", error);
      }
    };
    fetchNbrUsers();
  }, []);
  return (
    <Card
      css={{
        width: "400px",
        height: "120px",

        bg: "$purple200",
        borderRadius: "$xl",
        px: "$6",
      }}
    >
      <Card.Body css={{ py: "$10" }}>
        <Flex css={{ gap: "$5" }}>
          <Community color={"$accents9"} />
          <Flex direction={"column"}>
            <Text span>Total Users</Text>
          </Flex>
        </Flex>
        <Flex css={{ gap: "$6", py: "$4" }} align={"center"}>
          <Text span size={"$xl"} weight={"semibold"}>
            {totalUsers}
          </Text>
        </Flex>
        <Flex css={{ gap: "$12" }} align={"center"}>
          <Box>
            <Text
              span
              size={"$xs"}
              css={{ color: "$purple400" }}
              weight={"semibold"}
            ></Text>
            <Text span size={"$xs"}></Text>
          </Box>
          <Box>
            <Text
              span
              size={"$xs"}
              css={{ color: "$red600" }}
              weight={"semibold"}
            ></Text>
            <Text span size={"$xs"} css={{ color: "$white" }}></Text>
          </Box>
          <Box>
            <Text
              span
              size={"$xs"}
              css={{ color: "$purple400" }}
              weight={"semibold"}
            ></Text>
            <Text span size={"$xs"} css={{ color: "$white" }}></Text>
          </Box>
        </Flex>
      </Card.Body>
    </Card>
  );
};
