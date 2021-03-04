import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { AdminContextProvider } from '../../components/Admin/Context';
import LinksTable from '../../components/Admin/LinksTable';
import FormsTable from '../../components/Admin/FormsTable';
import Navbar, { navbar as entries } from '../../components/Admin/Navbar';
import Footer from '../../components/Footer';

import 'antd/dist/antd.css';

export async function getServerSideProps({ query }) {
  const { tab } = query;

  if (!tab || !(tab in entries)) {
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
      {(!tab || tab === 'forms') && <FormsTable />}
      <Footer />
    </AdminContextProvider>
  );
}

export default withPageAuthRequired(Admin);
