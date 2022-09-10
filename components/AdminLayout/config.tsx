import {
  FormOutlined,
  InboxOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  TagsOutlined
} from '@ant-design/icons';

export const NAVBAR_ENTRIES = [
  {
    key: 'links',
    path: '/admin',
    icon: <TagsOutlined />,
    title: 'Links'
  },
  {
    key: 'forms',
    path: '/admin/forms',
    icon: <FormOutlined />,
    title: 'Forms'
  },
  {
    key: 'redirects',
    path: '/admin/redirects',
    icon: <LinkOutlined />,
    title: 'Redirects'
  },
  {
    key: 'archived',
    path: '/admin/archived',
    icon: <InboxOutlined />,
    title: 'Archived'
  },
  {
    key: 'about',
    path: '/admin/about',
    icon: <InfoCircleOutlined />,
    title: 'About'
  }
];
