import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import AdminLayout from '~/components/AdminLayout';
import LinksTable from '~/components/LinksTable';

function Page() {
  return <LinksTable />;
}

Page.getLayout = function getLayout(page) {
  return <AdminLayout tab="links">{page}</AdminLayout>;
};

export const getServerSideProps = withPageAuthRequired();

export default Page;
