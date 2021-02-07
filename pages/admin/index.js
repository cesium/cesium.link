import { useState } from "react";
import { Twemoji } from "react-emoji-render";
import { Table, Space, Popconfirm, Checkbox, Button } from "antd";
import Footer from "../../components/Footer";
import NewEntry from "../../components/Admin/NewEntry";

import API from "../../utils/api";

import "antd/dist/antd.css";

async function getLinks() {
    const response = await API.get("/links")
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        });

    return response;
}

async function deleteLink(id) {
    const response = await API.delete(`/links/${id}`)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        });
}

export async function getServerSideProps() {
    const response = await getLinks();

    return { props: { links: response.data.data } };
}

function Actions({ record }) {
    const [isVisible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    async function confirmDelete() {
        setLoading(true);
        await deleteLink(record._id);
        setVisible(false);
        setLoading(false);
    }

    return (
        <Space size="middle">
            <a>Edit</a>
            <Popconfirm
                title="Are you sure you?"
                okText="Yes"
                cancelText="No"
                visible={isVisible}
                onConfirm={confirmDelete}
                okButtonProps={{ loading: loading }}
                onCancel={() => setVisible(false)}
            >
                <Button onClick={() => setVisible(true)} type="link" danger>
                    Delete
                </Button>
            </Popconfirm>
        </Space>
    );
}

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

function Admin({ links }) {
    return (
        <>
            <Table
                columns={columns}
                bordered
                rowKey="_id"
                pagination={{ position: ["bottomCenter"] }}
                dataSource={links}
                footer={() => <NewEntry />}
            />
            <Footer />
        </>
    );
}

export default Admin;
