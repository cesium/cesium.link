import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { AdminContextProvider } from '../../components/Admin/Context';
import LinksTable from '../../components/Admin/LinksTable';
import FormsTable from '../../components/Admin/FormsTable';
import Navbar, { navbar as entries } from '../../components/Admin/Navbar';
import Footer from '../../components/Footer';

import 'antd/dist/antd.css';

function Admin() {
  const router = useRouter();

  const { tab } = router.query;

  if (!tab || !(tab in entries)) {
    router.push('/admin?tab=links');
  }

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
