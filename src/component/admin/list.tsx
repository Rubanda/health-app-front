'use client'
import React from 'react'
import { Card, Flex, List, ListItem, Title } from '@tremor/react'

export const ListUser = ({users}:any) => {
  return (
    <>
     <Card className="mt-7">
                <List>
                    <ListItem>
                        <Title>Admin</Title>
                        {users?.map((item: any, index: number) => (
                            <ListItem key={item.id + index}>
                                <Flex>
                                    <span>{item.name}</span>
                                    <span>{item.username}</span>
                                </Flex>
                            </ListItem>
                        ))}
                    </ListItem>
                </List>
            </Card>
    </>
  )
}
