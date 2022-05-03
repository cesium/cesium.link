import Head from 'next/head';
import Footer from '../Footer';

import styles from './style.module.css';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => (
  <div className={styles.container}>
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </Head>

    <main className={styles.main}>{children}</main>

    <Footer />
  </div>
);

export default Layout;
