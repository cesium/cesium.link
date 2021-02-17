import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import API from '../../utils/api';

import styles from './style.module.css';

function Navbar({ selected }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    API.get('/auth/me').then((response) => setUser(response.data));
  }, []);

  return (
    <Menu selectedKeys={[selected]} mode="horizontal">
      {Object.keys(navbar).map((key) => (
        <Menu.Item key={key} icon={navbar[key].icon}>
          <Link href={`/admin?tab=${key}`}>
            <a>{navbar[key].title}</a>
          </Link>
        </Menu.Item>
      ))}
      <Dropdown
        className={styles.avatar}
        overlay={
          <Menu>
            <Menu.Item>
              <Link href="/api/auth/logout">
                <a>logout</a>
              </Link>
            </Menu.Item>
          </Menu>
        }>
        <div>
          <Avatar src={user.picture} icon={<UserOutlined />} /> {user.name}
        </div>
      </Dropdown>
    </Menu>
  );
}

export default Navbar;
