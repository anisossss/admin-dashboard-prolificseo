import { Card, Text } from "@nextui-org/react";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { CONSTANTS } from "../../constants/index.js";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

export const CardBalance2 = () => {
  const { accessToken } = useSelector((state) => state.auth);

  var url = `${CONSTANTS.API_URL_PROD}/admin/statistics`;
  const [totalOrders, setTotalOrders] = useState("");

  useEffect(() => {
    const fetchNbrOrders = async () => {
      try {
        const headers = { Authorization: accessToken };
        const { data } = await axios.get(url, {
          headers,
        });
        setTotalOrders(data.nbrUsers);
      } catch (error) {
        console.error("Error fetching", error);
      }
    };
    fetchNbrOrders();
  }, []);
  return (
    <Card
      css={{
        width: "400px",
        height: "120px",
        bg: "$accents0",
        borderRadius: "$xl",
        px: "$6",
      }}
    >
      <Card.Body css={{ py: "$10" }}>
        <Flex css={{ gap: "$5" }}>
          <PaymentsIcon />
          <Flex direction={"column"}>
            <Text span css={{ color: "" }}>
              Total Orders
            </Text>
          </Flex>
        </Flex>
        <Flex css={{ gap: "$6", py: "$4" }} align={"center"}>
          <Text span size={"$xl"} weight={"semibold"}>
            {totalOrders}
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
          </Box>
          <Box>
            <Text
              span
              size={"$xs"}
              css={{ color: "$red600" }}
              weight={"semibold"}
            ></Text>
            <Text span size={"$xs"}></Text>
          </Box>
          <Box>
            <Text
              span
              size={"$xs"}
              css={{ color: "$purple400" }}
              weight={"semibold"}
            ></Text>
            <Text span size={"$xs"}></Text>
          </Box>
        </Flex>
      </Card.Body>
    </Card>
  );
};
