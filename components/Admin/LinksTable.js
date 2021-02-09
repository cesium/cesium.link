import { useEffect, useState } from "react";
import { useLinks } from "../../components/Admin/Context";
import { Twemoji } from "react-emoji-render";
import { Table, Checkbox, notification } from "antd";
import Actions from "./Actions";
import NewEntry from "../../components/Admin/NewEntry";

import API from "../../utils/api";

const columns = [
  {
    title: "Emoji",
    dataIndex: "emoji",
    key: "emoji",
    fixed: "left",
    align: "center",
    render: function Emoji(emoji) {
      return <Twemoji svg text={emoji} />;
    },
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Attention",
    dataIndex: "attention",
    key: "attention",
    align: "center",
    render: function Attention(state) {
      return <Checkbox checked={state} disabled={true} />;
    },
  },
  {
    title: "URL",
    dataIndex: "url",
    key: "url",
    render: function Url(url) {
      return <a href={url}>{url}</a>;
    },
  },
  {
    title: "Action",
    key: "action",
    fixed: "right",
    render: function Action(_, record) {
      return <Actions record={record} />;
    },
  },
];

function LinksTable() {
  const [loading, setLoading] = useState(true);
  const { links, dispatch } = useLinks();

  useEffect(() => {
    API.get("/links")
      .then((response) => {
        dispatch({ type: "INIT", links: response.data.data.reverse() });
        setLoading(false);
      })
      .catch((error) => {
        notification["error"]({
          message: `${error.response.statusText}`,
          description: error.message,
        });
      });
  }, []);

  return (
    <Table
      columns={columns}
      loading={loading}
      bordered
      rowKey="_id"
      pagination={{ position: ["bottomCenter"] }}
      dataSource={links}
      footer={() => <NewEntry />}
    />
  );
}

export default LinksTable;
