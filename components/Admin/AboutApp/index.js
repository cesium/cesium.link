import { Descriptions, Row, Badge, Space } from 'antd';

const AboutApp = () => (
  <Row justify="center">
    <Descriptions bordered>
      <Descriptions.Item label="Name" span={3}>
        {process.env.APP_NAME}
      </Descriptions.Item>
      <Descriptions.Item label="Description" span={3}>
        {process.env.APP_DESCRIPTION}
      </Descriptions.Item>
      <Descriptions.Item label="Version" span={3}>
        v{process.env.APP_VERSION}
      </Descriptions.Item>
      <Descriptions.Item label="Homepage" span={2}>
        <a href={process.env.HOMEPAGE}>{process.env.HOMEPAGE}</a>
      </Descriptions.Item>
      <Descriptions.Item label="Status" span={1}>
        <Badge status="processing" text="Running" />
      </Descriptions.Item>
      <Descriptions.Item label="Repository URL" span={3}>
        <a href={process.env.REPOSITORY_URL}>{process.env.REPOSITORY_URL}</a>
      </Descriptions.Item>
      <Descriptions.Item label="Bug Tracker" span={3}>
        <a href={process.env.BUG_TRACKER}>{process.env.BUG_TRACKER}</a>
      </Descriptions.Item>
      <Descriptions.Item label="Hash" span={3}>
        <a href={`${process.env.REPOSITORY_URL}/tree/${process.env.COMMIT_HASH}`}>
          {process.env.COMMIT_HASH.substring(0, 8)}
        </a>
      </Descriptions.Item>
      <Descriptions.Item label="License" span={3}>
        {process.env.APP_LICENSE}
      </Descriptions.Item>
    </Descriptions>
  </Row>
);

export default AboutApp;
