import { LinkOutlined } from '@ant-design/icons';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Input, Row, Space } from 'antd';
import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

import AdminLayout from '~/components/AdminLayout';

function Page() {
  const [url, setUrl] = useState<string>('');

  return (
    <Row style={{ paddingTop: '20px' }} align="middle" justify="center">
      <Space align="center" direction="vertical" size="large">
        <Input
          size="large"
          placeholder="Type an URL..."
          prefix={<LinkOutlined />}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {url && (
          <QRCode
            value={url}
            logoImage={'/logo.png'}
            fgColor="#ff794d"
            removeQrCodeBehindLogo
            size={500}
          />
        )}
      </Space>
    </Row>
  );
}

Page.getLayout = function getLayout(page) {
  return <AdminLayout tab="qrcodes">{page}</AdminLayout>;
};

export const getServerSideProps = withPageAuthRequired();

export default Page;
