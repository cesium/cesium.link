import { useEffect, useState } from 'react';
import LinkTo from '../../utils/LinkTo';
import { Avatar, Menu, Typography, Space } from 'antd';
import { LinkOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';

import API from '../../../utils/api';

import styles from './style.module.css';

export const navbar = {
  links: {
    icon: <LinkOutlined />,
    title: 'Links'
  },
  forms: {
    icon: <FormOutlined />,
    title: 'Forms'
  }
};

function Navbar({ selected }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    API.get('/auth/me').then((response) => setUser(response.data));
  }, []);

  return (
    <Menu selectedKeys={[selected]} mode="horizontal">
      {Object.keys(navbar).map((key) => (
        <Menu.Item key={key} icon={navbar[key].icon}>
          <LinkTo href={`/admin?tab=${key}`}>{navbar[key].title}</LinkTo>
        </Menu.Item>
      ))}
      <Menu.SubMenu
        className={styles.avatar}
        title={
          <Space>
            <Avatar src={user.picture} icon={<UserOutlined />} />
            <Typography.Text>{user.name}</Typography.Text>
          </Space>
        }>
        <Menu.Item>
          <LinkTo href="/api/auth/logout">logout</LinkTo>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
}

export default Navbar;
