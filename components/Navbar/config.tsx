import {
  FormOutlined,
  InboxOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  TagsOutlined
} from '@ant-design/icons';

export const DEFAULT_NAVBAR_ENTRIES = [
  {
    key: 'links',
    path: '/admin?tab=links',
    icon: <TagsOutlined />,
    title: 'Links'
  },
  {
    key: 'forms',
    path: '/admin?tab=forms',
    icon: <FormOutlined />,
    title: 'Forms'
  },
  {
    key: 'redirects',
    path: '/admin?tab=redirects',
    icon: <LinkOutlined />,
    title: 'Redirects'
  },
  {
    key: 'archives',
    path: '/admin?tab=archives',
    icon: <InboxOutlined />,
    title: 'Archive'
  },
  {
    key: 'about',
    path: '/admin?tab=about',
    icon: <InfoCircleOutlined />,
    title: 'About'
  }
];
