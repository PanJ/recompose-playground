import React from 'react';
import './App.css';

import { withState, compose, withHandlers, setDisplayName, branch, renderNothing, renderComponent, mapProps, lifecycle, pure } from 'recompose';

import { pick } from 'lodash';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


  // state = {
  //   collapsed: false,
  //   mode: 'inline',
  // };
  // onCollapse = (collapsed) => {
  //   console.log(collapsed);
  //   this.setState({
  //     collapsed,
  //     mode: collapsed ? 'vertical' : 'inline',
  //   });
  // }

const Collapsed = ({ collapsed }) => <p>collapsed: {collapsed ? 'true' : 'false'}</p>

const enhancer = compose(
  setDisplayName('AntdCollapsibleMenuHOC'),
  withState('collapsed', 'setCollapsed', false),
  withState('mode', 'setMode', 'inline'),
  withHandlers({
    onCollapse: ({ setCollapsed, setMode }) => (collapsed) => {
      if (collapsed) {
        setCollapsed(true);
        setMode('vertical');
      } else {
        setCollapsed(false);
        setMode('inline');
      }
    }
  }),
  mapProps((props) => pick(props, ['collapsed', 'onCollapse', 'mode'])),
  lifecycle(
    {
      componentDidMount() {
        this.props.onCollapse(true);
      }
    }
  ),
  pure
);

export const App = ({ collapsed, onCollapse, mode, setCollapsed }) => {
  console.log(setCollapsed);
  return (
  <Layout>
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <div className="logo" />
      <Menu theme="dark" mode={mode} defaultSelectedKeys={['6']}>
        <SubMenu
          key="sub1"
          title={<span><Icon type="user" /><span className="nav-text">User</span></span>}
        >
          <Menu.Item key="1">Tom</Menu.Item>
          <Menu.Item key="2">Bill</Menu.Item>
          <Menu.Item key="3">Alex</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={<span><Icon type="team" /><span className="nav-text">Team</span></span>}
        >
          <Menu.Item key="4">Team 1</Menu.Item>
          <Menu.Item key="5">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="6">
          <span>
            <Icon type="file" />
            <span className="nav-text">File</span>
          </span>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          Bill is a cat.
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    </Layout>
  </Layout>
);
}

export default enhancer(App);
