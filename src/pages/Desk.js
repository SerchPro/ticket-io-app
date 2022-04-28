import React from 'react';
import { Row , Col, Typography, Button, Divider } from 'antd';
import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { useHideMenu } from '../hooks/useHideMenu';
import { useState } from 'react';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import {  Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const { Title, Text} = Typography;

export const Desk = () => {
  const [user] = useState(getUsuarioStorage());
  const [ticket, setTicket] = useState(null);
  const navigate = useNavigate();
  const {socket} = useContext( SocketContext)

  useHideMenu(false);

  const salir = () =>{
    console.log("out");
    localStorage.clear()
    navigate('/ingresar');
  }
  

  const nexTicket = () =>{
    socket.emit('next-ticket-to-work', user, (ticket) =>{
      console.log(ticket);
      setTicket(ticket);
    });
  }

  if (!user.agent || !user.desk){
    return <Navigate to="/ingresar" />;

  }
  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}> {user.agent} </Title>
          <Text> You are working at the desk </Text>
          <Text type="success"> {user.desk} </Text>
        </Col>

        <Col span = {4} align="right">
          <Button
            shape = "round"
            type = "danger"
            onClick={salir}
          >
            <CloseCircleOutlined/>
            Go out
          </Button>
        </Col>
      </Row>

      <Divider/>

      {
        ticket && (
          <Row>
            <Col>
              <Text>You are attending ticket number: </Text>
              <Text
                style = {{fontSize: 30}}
                type = "danger"
              >
                {ticket.number}
              </Text>
            </Col>
          </Row>
        )
      }

      <Row>
        <Col offset={18} span = {6} align="right">
          <Button
            onClick={nexTicket}
            shape="round"
            type="primary"
          >
            <RightOutlined />
            next
          </Button>

        </Col>
      </Row>
    </>
  )
}
