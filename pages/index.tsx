import { GetStaticProps } from 'next';
import Image from 'next/image';
import Layout from '~/components/Layout';
import Card from '~/components/Card';

import dbConnect from '~/lib/database';
import Link, { ILink } from '~/models/Link';

import styles from '~/styles/Home.module.css';

export const getStaticProps: GetStaticProps = async () => {
  await dbConnect();

  const result = await Link.find({}).sort({ index: 'asc' });
  const links = result.map((doc) => {
    const link = doc.toObject();
    link._id = link._id.toString();
    link.created = link.created.toString();
    return link;
  });

  return { props: { links: links }, revalidate: 5 };
};

export default function Home({ links }: { links: ILink[] }) {
  return (
    <Layout title="CoderDojo Braga">

      <div>
        <div className={styles.rectangle} />
        <div className={styles.curve} />
        <div className={styles.base} />
      </div>

      <div className={styles.logo}>
        <Image src="/logo_lettering.png" alt="CoderDojo Braga Logo" width={345} height={100} />
      </div>

      <p className={styles.description}>
        O CoderDojo Braga integra-se num movimento global, voluntário,
        sem fins lucrativos e que visa ensinar crianças e jovens dos 7 aos 17 anos a programar.
      </p>

      <div className={styles.grid}>
        {links.map((link) => (
          <Card key={link._id} {...link} />
        ))}
      </div>
    </Layout>
  );
}
