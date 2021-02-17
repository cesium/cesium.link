import Link from 'next/link';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Menu } from 'antd';
import { LinkOutlined, QuestionOutlined } from '@ant-design/icons';
import { AdminContextProvider } from '../../components/Admin/Context';
import LinksTable from '../../components/Admin/LinksTable';
import Footer from '../../components/Footer';

import 'antd/dist/antd.css';

const navbar = {
  links: {
    icon: <LinkOutlined />,
    title: 'Links'
  },
  forms: {
    icon: <QuestionOutlined />,
    title: 'Forms'
  }
};

export async function getServerSideProps({ query }) {
  const { tab } = query;

  if (!tab || !(tab in navbar)) {
    return {
      redirect: {
        destination: '/admin?tab=links',
        permanent: false
      }
    };
  }

  return {
    props: { tab }
  };
}

function Admin({ tab }) {
  return (
    <AdminContextProvider initialState={[]}>
      <Menu selectedKeys={[tab]} mode="horizontal">
        {Object.keys(navbar).map((key) => (
          <Menu.Item key={key} icon={navbar[key].icon}>
            <Link href={`/admin?tab=${key}`}>
              <a>{navbar[key].title}</a>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
      {(!tab || tab === 'links') && <LinksTable />}
      <Footer />
    </AdminContextProvider>
  );
}

export default withPageAuthRequired(Admin);
