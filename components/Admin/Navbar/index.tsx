import Link from 'next/link';
import { Avatar, Col, Menu, Row, Space, Typography } from 'antd';
import { LinkOutlined, FormOutlined, TagsOutlined, TeamOutlined } from '@ant-design/icons';
import { getNameInitials, getHexColor } from '~/lib/strings';
import { IAccount } from '~/models/Account';

import styles from './style.module.css';

export const navbar = {
  links: {
    icon: <TagsOutlined />,
    title: 'Links',
    admin: false
  },
  forms: {
    icon: <FormOutlined />,
    title: 'Forms',
    admin: false
  },
  redirects: {
    icon: <LinkOutlined />,
    title: 'Redirects',
    admin: false
  },
  accounts: {
    icon: <TeamOutlined />,
    title: 'Accounts',
    admin: true
  }
};

interface NavbarProps {
  selected: string;
  user: IAccount;
}

const Navbar = ({ selected, user }: NavbarProps) => (
  <Row justify="space-between">
    <Col span={12}>
      <Menu selectedKeys={[selected]} mode="horizontal">
        {Object.keys(navbar)
          .filter((key) => !navbar[key].admin || user.admin)
          .map((key) => (
            <Menu.Item key={key} icon={navbar[key].icon}>
              <Link href={`/admin?tab=${key}`}>
                <a>{navbar[key].title}</a>
              </Link>
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
              <Avatar style={{ backgroundColor: getHexColor(user.name) }}>
                {getNameInitials(user.name)}
              </Avatar>
              <Typography.Text>{user.name}</Typography.Text>
            </Space>
          }>
          <Menu.Item key="logout">
            <Link href="/api/auth/logout">
              <a>logout</a>
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Col>
  </Row>
);

export default Navbar;
