import { UserOutlined } from '@ant-design/icons';
import { useUser } from '@auth0/nextjs-auth0';
import { Avatar, Col, Menu, Row, Space, Typography } from 'antd';
import Link from 'next/link';

import { DEFAULT_NAVBAR_ENTRIES } from './config';
import styles from './style.module.css';

interface Props {
  selected: string;
  entries?: { key: string; path: string; title: string; icon: JSX.Element }[];
}

function Navbar({ selected, entries = DEFAULT_NAVBAR_ENTRIES }: Props) {
  const { user } = useUser();

  return (
    <Row justify="space-between">
      <Col flex="auto">
        <Menu selectedKeys={[selected]} mode="horizontal">
          {entries.map(({ key, path, title, icon }) => (
            <Menu.Item key={key} icon={icon}>
              <Link href={path}>{title}</Link>
            </Menu.Item>
          ))}
          <Menu.SubMenu
            className={styles.avatar}
            title={
              <Space>
                <Avatar src={user?.picture} icon={<UserOutlined />} />
                <Typography.Text>{user?.name}</Typography.Text>
              </Space>
            }
          >
            <Menu.Item>
              <Link href="/api/auth/logout">logout</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Col>
    </Row>
  );
}

export default Navbar;
