import { useRouter } from 'next/router';
import Image from 'next/image';
import { ConfigProvider, Form, Input, Layout, Button, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import withSession from '~/lib/session';
import Footer from '~/components/Footer';

import API from '~/lib/api';

import 'antd/dist/antd.css';

import styles from '~/styles/Login.module.css';

export const getServerSideProps = withSession(async function ({ req }) {
  const auth = req.session.get('auth');

  if (auth && auth.id) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
});

export default function Login() {
  const router = useRouter();

  const onFinish = (values) => {
    API.post('/api/auth/login', values)
      .then((_response) => {
        router.replace('/admin?tab=links');
      })
      .catch((error) => console.log(error));
  };

  return (
    <ConfigProvider componentSize="large">
      <Layout className={styles.layout}>
        <Layout.Content className={styles.content}>
          <Row className={styles.brand}>
            <Image src="/logo_lettering.png" alt="CoderDojo Braga" width={364} height={106} />
          </Row>

          <Form name="normal_login" className={styles.form} onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true
                }
              ]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!'
                }
              ]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.submit}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Layout.Content>
        <Layout.Footer>
          <Footer isThemeDark />
        </Layout.Footer>
      </Layout>
    </ConfigProvider>
  );
}
