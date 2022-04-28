import React from 'react'

import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    } from '@ant-design/icons';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
} from "react-router-dom";
import { Queue } from './Queue';
import { CreatTicket } from './CreatTicket';
import { Ingresar } from './Ingresar';
import { Desk } from './Desk';
import { useContext } from 'react';
import { UiContext } from '../context/UiContext';

const {Sider, Content } = Layout;

export const RouterPage = () => {

    const { hideMenu } = useContext( UiContext )

    return (
        <Router>
            <Layout style={{ height: '100vh' }}>
                <Sider
                        collapsedWidth="0"
                        breakpoint='md'
                        hidden = {hideMenu}
                    >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to = "/ingresar">
                            Ingresar
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        <Link to = "/queue">
                            ticket queue
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        <Link to = "/create">
                            create tickets
                        </Link>
                    </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                        >
                        <Routes>
                            <Route path="/ingresar" element={<Ingresar/>}></Route>
                            <Route path="/queue" element={<Queue/>}></Route>
                            <Route path="/create" element={<CreatTicket/>}></Route>
                            <Route path="/desk" element={<Desk/>}></Route>
                            <Route path="*" element={<Navigate to ="/ingresar" />}/>
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    )
}
