import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { AdminContextProvider } from '../../components/Admin/Context';
import LinksTable from '../../components/Admin/LinksTable';
import Footer from '../../components/Footer';

import 'antd/dist/antd.css';

function Admin() {
  return (
    <AdminContextProvider initialState={[]}>
      <LinksTable />
      <Footer />
    </AdminContextProvider>
  );
}

export default withPageAuthRequired(Admin);
