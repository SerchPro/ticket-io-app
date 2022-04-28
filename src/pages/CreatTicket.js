import React  from 'react'
import { Button, Col, Row, Typography} from 'antd'

import { CloudDownloadOutlined } from '@ant-design/icons';
import { useHideMenu } from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';
import  { useState, useContext }  from 'react'

const { Title, Text} = Typography;

export const CreatTicket = () => {

  useHideMenu(true);

  const { socket } = useContext(SocketContext);
  const [ticket, setTicket ] = useState(null);


  const newTicket = () =>{
    console.log("new ticket")
    socket.emit('request-ticket', null , (ticket) => {
      console.log(ticket)
      setTicket(ticket);
    });
  }
  return (
    <>
      <Row>
        <Col span={ 14 } offset={6} align="center">
          <Title>
            Press the button for a new ticket
          </Title>

          <Button
            type="primary"
            shape="round"
            icon={<CloudDownloadOutlined />}
            size="large"
            onClick={ newTicket }
          >
              new ticket
          </Button>
        </Col>
      </Row>
      {
        ticket && (
          <Row style={{ marginTop: 100 }}>
            <Col span={14} offset={6} align="center">
              <Text level={2}>
                Su número
              </Text>
              <br/>
              <Text type="success" style={{ fontSize: 55 }}>
                {ticket.number}
              </Text>
            </Col>
          </Row>
        )
      }

    </>
  )
}
