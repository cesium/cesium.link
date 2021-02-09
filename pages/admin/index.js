import { AdminContextProvider } from "../../components/Admin/Context";
import LinksTable from '../../components/Admin/LinksTable';
import Footer from "../../components/Footer";

import API from "../../utils/api";

import "antd/dist/antd.css";

export async function getServerSideProps() {
  const response = await API.get("/links")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });

  return { props: { links: response.data.data.reverse() } };
}

function Admin({ links }) {
  return (
    <AdminContextProvider initialState={links}>
      <LinksTable />
      <Footer />
    </AdminContextProvider>
  );
}

export default Admin;
