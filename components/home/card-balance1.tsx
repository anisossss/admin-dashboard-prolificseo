import {Card, Text} from '@nextui-org/react';
import React from 'react';
import {Community} from '../icons/community';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';

export const CardBalance1 = () => {
   return (
      <Card
         css={{
                    width: '400px',
            height: '120px',

            bg: '$purple200',
            borderRadius: '$xl',
            px: '$6',
         }}
      >
         <Card.Body css={{py: '$10'}}>
            <Flex css={{gap: '$5'}}>
               <Community color={'$accents9'}/>
               <Flex direction={'column'}>
                  <Text span >
                     Total Users
                  </Text>
               
               </Flex>
            </Flex>
            <Flex css={{gap: '$6', py: '$4'}} align={'center'}>
               <Text
                  span
                  size={'$xl'}
                  weight={'semibold'}
               >
                  5,910
               </Text>
              
            </Flex>
            <Flex css={{gap: '$12'}} align={'center'}>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{color: '$purple400'}}
                     weight={'semibold'}
                  >
                    
                  </Text>
                  <Text span size={'$xs'} >
                    
                  </Text>
               </Box>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{color: '$red600'}}
                     weight={'semibold'}
                  >
                   
                  </Text>
                  <Text span size={'$xs'} css={{color: '$white'}}>
                   
                  </Text>
               </Box>
               <Box>
                  <Text
                     span
                     size={'$xs'}
                     css={{color: '$purple400'}}
                     weight={'semibold'}
                  >
                     
                  </Text>
                  <Text span size={'$xs'} css={{color: '$white'}}>
                     
                  </Text>
               </Box>
            </Flex>
         </Card.Body>
      </Card>
   );
};
