import { useUser } from '@auth0/nextjs-auth0';
import LinkTo from '~/components/LinkTo';
import { Avatar, Col, Menu, Row, Space, Typography } from 'antd';
import {
  InboxOutlined,
  FormOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  TagsOutlined,
  UserOutlined
} from '@ant-design/icons';

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
  },
  archived: {
    icon: <InboxOutlined />,
    title: 'Archive'
  },
  about: {
    icon: <InfoCircleOutlined />,
    title: 'About'
  }
};

function Navbar({ selected }) {
  const { user } = useUser();

  return (
    <Row justify="space-between">
      <Col flex="auto">
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
