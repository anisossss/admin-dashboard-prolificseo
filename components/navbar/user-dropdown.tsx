import {Avatar, Dropdown, Navbar, Text} from '@nextui-org/react';
import React from 'react';

export const UserDropdown = () => {
   return (
      <Dropdown placement="bottom-right">
         <Navbar.Item>
            <Dropdown.Trigger>
               <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
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
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
          
            
            <Dropdown.Item key="logout" withDivider color="error">
               Log Out
            </Dropdown.Item>
         
         </Dropdown.Menu>
      </Dropdown>
   );
};
