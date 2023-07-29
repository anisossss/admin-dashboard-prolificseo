import React from 'react';
import {Text, Link} from '@nextui-org/react';
import {Box} from '../styles/box';
import dynamic from 'next/dynamic';
import {Flex} from '../styles/flex';
import {TableWrapper} from '../table/table';
import NextLink from 'next/link';
import {CardBalance1} from './card-balance1';
import {CardBalance2} from './card-balance2';


export const Content = () => (

   <Box css={{overflow: 'hidden', height: '100%', width:"100%"}}>
      <Flex
         direction={'column'}
         justify={'center'}
         css={{
            'width': '100%',
            'py': '$10',
            'px': '$10',
            'mt': '$8',
            '@sm': {px: '$20'},
         }}
      >
         <Flex
            css={{
               'mt': '$8',
               '@xsMax': {px: '$10'},
            }}
            direction={'column'}
         >
            {/* Card Section Top */}
            <Box>
               <Text
                  h3
                  css={{
                     'textAlign': 'center',
                     '@sm': {
                        textAlign: 'inherit',
                     },
                  }}
               >
                  Current Statistics
               </Text>
         <br></br>

               <Flex
                  css={{
                     'gap': '$10',
                     'flexWrap': 'wrap',
                     'justifyContent': 'center',
                     '@sm': {
                        flexWrap: 'nowrap',
                     },
                  }}
                  direction={'row'}
               >
                  <CardBalance1 />
                  <CardBalance2 />
               </Flex>
            </Box>

        
         </Flex>

        
      </Flex>

      {/* Table Latest Users */}
      <Flex
         direction={'column'}
         justify={'center'}
         css={{
            'width': '100%',
            'py': '$10',
            'px': '$10',
            'mt': '$8',
            '@sm': {px: '$20'},
         }}
      >
         <Flex justify={'between'} wrap={'wrap'}>
            <Text
               h3
               css={{
                  'textAlign': 'center',
                  '@lg': {
                     textAlign: 'inherit',
                  },
               }}
            >
               Latest Users
            </Text>
            <NextLink href="/accounts">
               <Link
                  block
                  color="secondary"
                  css={{
                     'textAlign': 'center',
                     '@lg': {
                        textAlign: 'inherit',
                     },
                  }}
               >
                  View All
               </Link>
            </NextLink>
         </Flex>
         <TableWrapper />
      </Flex>
   </Box>
);
