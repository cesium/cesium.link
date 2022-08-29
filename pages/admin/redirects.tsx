import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Form } from 'antd';

import AdminLayout from '~/components/AdminLayout';
import RedirectsTable from '~/components/RedirectsTable';
import { EditingProvider } from '~/hooks/Editing';

function Page() {
  const [form] = Form.useForm();

  return (
    <EditingProvider initialState={{ key: '', form: form }}>
      <RedirectsTable />
    </EditingProvider>
  );
}

Page.getLayout = function getLayout(page) {
  return <AdminLayout tab="redirects">{page}</AdminLayout>;
};

export const getServerSideProps = withPageAuthRequired();

export default Page;
