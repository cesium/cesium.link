import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Badge, Col, Descriptions, Row, Typography } from 'antd';
import Image from 'next/image';

import AdminLayout from '~/components/AdminLayout';
import { getUrl, getVersion } from '~/lib/config';

const VERSION = getVersion();
const URL = getUrl();

const About = () => (
  <Col>
    <Row justify="center">
      <Image src="/cesium-logo.png" alt="CeSIUM's Logo" width={150} height={150} />
    </Row>

    <Row justify="center">
      <Typography.Title>CeSIUM</Typography.Title>
    </Row>

    <Row justify="space-around">
      <Descriptions bordered>
        <Descriptions.Item label="Name" span={3}>
          {process.env.APP_NAME}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={3}>
          {process.env.APP_DESCRIPTION}
        </Descriptions.Item>
        <Descriptions.Item label="Version" span={3}>
          v{VERSION.tag}-{VERSION.env}.
          <a href={`${process.env.REPOSITORY_URL}/tree/${VERSION.ref}`}>
            {VERSION.ref.substring(0, 8)}
          </a>
        </Descriptions.Item>
        <Descriptions.Item label="Application" span={2}>
          <a href={URL}>{URL}</a>
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={1}>
          <Badge status="processing" text="Running" />
        </Descriptions.Item>
        <Descriptions.Item label="Homepage" span={3}>
          <a href={process.env.HOMEPAGE}>{process.env.HOMEPAGE}</a>
        </Descriptions.Item>
        <Descriptions.Item label="Repository URL" span={3}>
          <a href={process.env.REPOSITORY_URL}>{process.env.REPOSITORY_URL}</a>
        </Descriptions.Item>
        <Descriptions.Item label="Bug Tracker" span={3}>
          <a href={process.env.BUG_TRACKER}>{process.env.BUG_TRACKER}</a>
        </Descriptions.Item>
        <Descriptions.Item label="License" span={3}>
          <a href={`${process.env.REPOSITORY_URL}/blob/main/LICENSE.txt`}>
            {process.env.APP_LICENSE}
          </a>
        </Descriptions.Item>
      </Descriptions>
    </Row>
  </Col>
);

About.getLayout = function getLayout(page) {
  return <AdminLayout tab="about">{page}</AdminLayout>;
};

export const getServerSideProps = withPageAuthRequired();

export default About;
