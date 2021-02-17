import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { LinkOutlined } from '@ant-design/icons';
import { AdminContextProvider } from '../../components/Admin/Context';
import LinksTable from '../../components/Admin/LinksTable';
import Navbar from '../../components/Admin/Navbar';
import Footer from '../../components/Footer';

import 'antd/dist/antd.css';

const navbar = {
  links: {
    icon: <LinkOutlined />,
    title: 'Links'
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
      <Navbar selected={tab} />
      {(!tab || tab === 'links') && <LinksTable />}
      <Footer />
    </AdminContextProvider>
  );
}

export default withPageAuthRequired(Admin);
