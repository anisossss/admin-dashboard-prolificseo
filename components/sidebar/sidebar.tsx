import React, {useState} from 'react';
import {Box} from '../styles/box';
import {Sidebar} from './sidebar.styles';
import {Avatar, Tooltip} from '@nextui-org/react';
import {Flex} from '../styles/flex';
import {HomeIcon} from '../icons/sidebar/home-icon';
import {PaymentsIcon} from '../icons/sidebar/payments-icon';
import {BalanceIcon} from '../icons/sidebar/balance-icon';
import {AccountsIcon} from '../icons/sidebar/accounts-icon';
import {CustomersIcon} from '../icons/sidebar/customers-icon';
import {ProductsIcon} from '../icons/sidebar/products-icon';
import {ReportsIcon} from '../icons/sidebar/reports-icon';

import {SidebarItem} from './sidebar-item';
import {SidebarMenu} from './sidebar-menu';
import {useSidebarContext} from '../layout/layout-context';
import {ChangeLogIcon} from '../icons/sidebar/changelog-icon';
import {useRouter} from 'next/router';
import Image from 'next/image';

export const SidebarWrapper = () => {
   const router = useRouter();
   const {collapsed, setCollapsed} = useSidebarContext();

   return (
      <Box
         as="aside"
         css={{
            height: '100vh',
            zIndex: 202,
            position: 'sticky',
            top: '0',
         }}
      >
         {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}
         <Sidebar collapsed={collapsed}>
<Image src={"/logo.svg"} width={70} height={70} alt='' objectFit='contain'/>
         
            <Flex
               direction={'column'}
               justify={'between'}
               css={{height: '100%'}}
            >
               <Sidebar.Body className="body sidebar">
                  <SidebarItem
                     title="Dashboard"
                     icon={<HomeIcon />}
                     isActive={router.pathname === '/'}
                     href="/"
                  />
                  <SidebarMenu title=" ">
                    
                     <SidebarItem
                        isActive={router.pathname === '/users'}
                        title="Users Accounts"
                        icon={<AccountsIcon />}

                        // icon={<PaymentsIcon />}
                     />
                

                     <SidebarItem
                        isActive={router.pathname === '/payments'}
                        title="Payments"
                        icon={<PaymentsIcon />}

                        // icon={<CustomersIcon />}
                        // icon={<AccountsIcon />}

                     />
                     <SidebarItem
                        isActive={router.pathname === '/plans'}
                        title="Plans"
                        icon={<ProductsIcon />}
                     />
                     <SidebarItem
                        isActive={router.pathname === '/support'}
                        title="Support Requests"
                        icon={<ReportsIcon />}
                     />
                  </SidebarMenu>
  
               </Sidebar.Body>
           
            </Flex>
         </Sidebar>
      </Box>
   );
};
