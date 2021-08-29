import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ConfigProvider } from 'antd';
import dbConnect from '~/lib/database';
import withSession from '~/lib/session';
import Account from '~/models/Account';
import { AdminContextProvider } from '~/components/Admin/Context';
import LinksTable from '~/components/Admin/LinksTable';
import FormsTable from '~/components/Admin/FormsTable';
import RedirectsTable from '~/components/Admin/RedirectsTable';
import AccountsTable from '~/components/Admin/AccountsTable';
import Navbar, { navbar as entries } from '~/components/Admin/Navbar';
import Footer from '~/components/Footer';

import 'antd/dist/antd.css';

export const getServerSideProps = withSession(async function ({ req }) {
  const auth = req.session.get('auth');

  if (auth && auth.id) {
    await dbConnect();

    const user = await Account.findById(auth.id);

    if (user) {
      const { password, ...data } = user.toObject();

      data._id = data._id.toString();
      data.created = data.created.toString();
      data.updated = data.updated.toString();

      return {
        props: { currentUser: data }
      };
    }
  }

  return {
    redirect: {
      destination: '/admin/login',
      permanent: false
    }
  };
});

export default function Admin({ currentUser }) {
  const router = useRouter();
  const { tab } = router.query;

  useEffect(() => {
    if (!tab || tab instanceof Array || !(tab in entries)) {
      router.push('/admin?tab=links');
    }
  }, [router, tab]);

  return (
    <AdminContextProvider initialState={{}}>
      <ConfigProvider componentSize="large">
        <Navbar selected={tab instanceof Array ? tab[0] : tab} user={currentUser} />
        {tab === 'links' && <LinksTable />}
        {tab === 'forms' && <FormsTable />}
        {tab === 'redirects' && <RedirectsTable />}
        {tab === 'accounts' && <AccountsTable />}
        <Footer />
      </ConfigProvider>
    </AdminContextProvider>
  );
}
