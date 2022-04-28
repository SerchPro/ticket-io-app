import React from 'react';
import { Button, Card, Col, Divider, List, Row, Tag, Typography} from 'antd';
import { useHideMenu } from '../hooks/useHideMenu';
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { getLatest } from '../helpers/getLatest';

const { Title, Text} = Typography;

export const Queue = () => {

  useHideMenu(true);
  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    socket.on('assigned-ticket', (assigned) =>{
      console.log(assigned)
      setTickets(assigned);
    })
    return () => {
      socket.off('assigned-ticket')
    }
  }, [socket]);


  useEffect( () =>{
    getLatest().then( tickets => setTickets(tickets) )
  }, []);

  return (
    <>
      <Title level = {1}> Serving the client </Title>
      <Row>
        <Col span={ 12 }>
          <List
            dataSource = { tickets.slice(0,3)}
            renderItem = { item => (
              <List.Item>
                <Card
                  style={{ width:300, marginTop: 16}}
                  actions={[
                    <Tag color="volcano"> { item.agent }</Tag>,
                    <Tag color="magenta"> Desk: { item.desk }</Tag>,
                  ]}
                  >
                    <Title> No. {item.number}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>

        <Col span={ 12 }>
            <Divider> Record </Divider>
            <List
              dataSource={ tickets.slice(3) }
              renderItem = { item => (
                <List.Item>
                  <List.Item.Meta
                    title={`Ticket No. ${item.number}`}
                    description = {
                      <>
                        <Text type = "secondary"> On the desk: </Text>
                        <Tag color="magenta"> {item.desk} </Tag>

                        <Text type = "secondary"> Agent: </Text>
                        <Tag color="volcano"> {item.agent} </Tag>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
        </Col>
      </Row>
    </>
  )
}
