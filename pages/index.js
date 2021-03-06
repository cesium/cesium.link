import Image from 'next/image';
import Layout from '../components/Layout';
import Card from '../components/Card';

import dbConnect from '../utils/database';
import Link from '../models/Link';

import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
  await dbConnect();

  const result = await Link.find({}).sort({ index: 'asc' });
  const links = result.map((doc) => {
    const link = doc.toObject();
    link._id = link._id.toString();
    link.created = link.created.toString();
    link.url = `${process.env.NEXT_PUBLIC_APP_URL}/r/${link.slug}`;
    return link;
  });

  return { props: { links: links } };
}

export default function Home({ links }) {
  return (
    <Layout title="CeSIUM">
      <Image src="/2020.png" alt="CeSIUM's T-shirt 2020/21" width={150} height={150} />

      <h1 className={styles.title}>CeSIUM</h1>

      <p className={styles.description}>Centro de Estudantes de Engenharia Informática da UMinho</p>

      <div className={styles.grid}>
        {links.map((link) => (
          <Card key={link._id} {...link} />
        ))}
      </div>
    </Layout>
  );
}
