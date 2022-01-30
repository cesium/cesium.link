import { useEffect, useState } from 'react';
import LinkTo from '~/components/LinkTo';
import { Avatar, Col, Menu, Row, Space, Typography } from 'antd';
import { LinkOutlined, FormOutlined, TagsOutlined, UserOutlined } from '@ant-design/icons';

import API from '~/lib/api';

import styles from './style.module.css';

export const navbar = {
  links: {
    icon: <TagsOutlined />,
    title: 'Links'
  },
  forms: {
    icon: <FormOutlined />,
    title: 'Forms'
  },
  redirects: {
    icon: <LinkOutlined />,
    title: 'Redirects'
  }
};

function Navbar({ selected }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    API.get('/api/auth/me').then((response) => setUser(response.data));
  }, []);

  return (
    <Row justify="space-between">
      <Col span={12}>
        <Menu selectedKeys={[selected]} mode="horizontal">
          {Object.keys(navbar).map((key) => (
            <Menu.Item key={key} icon={navbar[key].icon}>
              <LinkTo href={`/admin?tab=${key}`}>{navbar[key].title}</LinkTo>
            </Menu.Item>
          ))}
        </Menu>
      </Col>
      <Col>
        <Menu mode="horizontal">
          <Menu.SubMenu
            className={styles.avatar}
            title={
              <Space>
                <Avatar src={user.picture} icon={<UserOutlined />} />
                <Typography.Text>{user.name}</Typography.Text>
              </Space>
            }
          >
            <Menu.Item>
              <LinkTo href="/api/auth/logout">logout</LinkTo>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Col>
    </Row>
  );
}

export default Navbar;
