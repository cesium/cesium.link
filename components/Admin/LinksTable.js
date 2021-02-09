import { useLinks } from "../../components/Admin/Context";
import { Twemoji } from "react-emoji-render";
import { Table, Checkbox } from "antd";
import Actions from "./Actions";
import NewEntry from "../../components/Admin/NewEntry";

const columns = [
    {
        title: "Emoji",
        dataIndex: "emoji",
        key: "emoji",
        align: "center",
        render: (emoji) => <Twemoji svg text={emoji} />,
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
        title: "Atention",
        dataIndex: "atention",
        key: "atention",
        align: "center",
        render: (state) => <Checkbox checked={state} disabled={true} />,
    },
    {
        title: "URL",
        dataIndex: "url",
        key: "url",
        render: (url) => <a href={url}>{url}</a>,
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => <Actions record={record} />,
    },
];

function LinksTable() {
    const { links } = useLinks();

    return (
        <Table
            columns={columns}
            bordered
            rowKey="_id"
            pagination={{ position: ["bottomCenter"] }}
            dataSource={links}
            footer={() => <NewEntry />}
        />
    );
}

export default LinksTable;