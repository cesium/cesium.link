import {
  FormOutlined,
  InboxOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  QrcodeOutlined,
  TagsOutlined
} from '@ant-design/icons';

export const DEFAULT_NAVBAR_ENTRIES = [
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
    key: 'qrcodes',
    path: '/admin/qrcodes',
    icon: <QrcodeOutlined />,
    title: 'QR Codes'
  },
  {
    key: 'about',
    path: '/admin/about',
    icon: <InfoCircleOutlined />,
    title: 'About'
  }
];
