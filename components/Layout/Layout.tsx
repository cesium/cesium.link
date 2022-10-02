import Head from 'next/head';
import { PropsWithChildren } from 'react';

import Footer from '~/components/Footer';

import styles from './style.module.css';

interface Props {
  title: string;
}

const Layout = ({ children, title }: PropsWithChildren<Props>) => (
  <div className={styles.Container}>
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </Head>

    <main className={styles.Main}>{children}</main>

    <Footer />
  </div>
);

export default Layout;
