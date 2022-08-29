import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import AdminLayout from '~/components/AdminLayout';
import ArchivedLinksTable from '~/components/ArchivedLinksTable';

function Page() {
  return <ArchivedLinksTable />;
}

Page.getLayout = function getLayout(page) {
  return <AdminLayout tab="archived">{page}</AdminLayout>;
};

export const getServerSideProps = withPageAuthRequired();

export default Page;
