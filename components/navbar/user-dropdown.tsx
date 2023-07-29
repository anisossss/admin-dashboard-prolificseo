import {Avatar, Dropdown, Navbar, Text} from '@nextui-org/react';
import { useRouter } from "next/router";
import React from 'react';

export const UserDropdown = () => {
  const router = useRouter();

     const handleLogout = () => {
    localStorage.clear(); // clear cache
    router.push("/auth/login"); // redirect to login page
  };
   return (
      <Dropdown placement="bottom-right">
         <Navbar.Item>
            <Dropdown.Trigger>
               <Avatar
                  bordered
                  zoomed
                  as="button"
                  size="md"
                  src="/img/avatar1.png"
               />
            </Dropdown.Trigger>
         </Navbar.Item>
         <Dropdown.Menu
            aria-label="User menu actions"
            onAction={(actionKey) => console.log({actionKey})}
         >
            <Dropdown.Item key="profile" css={{height: '$18'}}>
               <Text b color="inherit" css={{d: 'flex'}}>
                  Signed in as
               </Text>
               <Text b color="inherit" css={{d: 'flex'}}>
                  admin@prolificseo.com
               </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
               Settings
            </Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error" >
              <Text span onClick={handleLogout}>
               Logout
              </Text>
            </Dropdown.Item>
         
         </Dropdown.Menu>
      </Dropdown>
   );
};
