import React from "react";
import { Box } from "../styles/box";
import { Sidebar } from "./sidebar.styles";
import { Flex } from "../styles/flex";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";

import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { useRouter } from "next/router";
import Image from "next/image";

export const SidebarWrapper = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <Box
      as="aside"
      css={{
        height: "100vh",
        zIndex: 202,
        position: "sticky",
        top: "0",
      }}
    >
      {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}
      <Sidebar collapsed={collapsed}>
        <Image
          src={"/logo.svg"}
          width={70}
          height={70}
          alt=""
          objectFit="contain"
        />

        <Flex direction={"column"} justify={"between"} css={{ height: "100%" }}>
          <Sidebar.Body className="body sidebar">
            <SidebarItem
              title="Dashboard"
              icon={<HomeIcon />}
              isActive={router.pathname === "/dashboard"}
              href="/dashboard"
            />
            <SidebarMenu title=" ">
              <SidebarItem
                isActive={router.pathname === "/accounts"}
                title="Users Accounts"
                icon={<AccountsIcon />}
                href="/accounts"
              />
              <SidebarItem
                isActive={router.pathname === "/orders"}
                title="Orders"
                icon={<PaymentsIcon />}
                href="/orders"
              />
              <SidebarItem
                isActive={router.pathname === "/requests"}
                title="Support Requests"
                icon={<ReportsIcon />}
                href="/requests"
              />
            </SidebarMenu>
          </Sidebar.Body>
        </Flex>
      </Sidebar>
    </Box>
  );
};
