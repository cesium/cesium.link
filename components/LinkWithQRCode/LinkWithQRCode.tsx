import { Dropdown, Space, Typography } from 'antd';
import { QRCode } from 'react-qrcode-logo';

const LinkWithQRCode = ({ link }) => (
  <Space>
    <Typography.Link href={link} copyable>
      {link}
    </Typography.Link>

    <Dropdown
      overlay={
        <QRCode
          value={link}
          ecLevel="H"
          logoImage={'/logo.png'}
          removeQrCodeBehindLogo
          size={500}
        />
      }
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()}>(QR Code)</a>
    </Dropdown>
  </Space>
);

export default LinkWithQRCode;
