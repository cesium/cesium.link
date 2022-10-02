import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'antd/dist/antd.css';
import { PropsWithChildren } from 'react';

import Footer from '~/components/Footer';
import Navbar from '~/components/Navbar';

import { NAVBAR_ENTRIES } from './config';
import styles from './style.module.css';

const queryClient = new QueryClient();

interface Props {
  tab: string;
}

export default function AdminLayout({ tab, children }: PropsWithChildren<Props>) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.Container}>
        <div>
          <Navbar entries={NAVBAR_ENTRIES} selected={tab} />
          {children}
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
