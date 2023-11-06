import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Image from 'next/image';

import Card from '~/components/Card';
import Layout from '~/components/Layout';
import dbConnect from '~/lib/database';
import { pick } from '~/lib/utils';
import Link, { ILink } from '~/models/Link';
import styles from '~/styles/Home.module.css';

export const getStaticProps: GetStaticProps<{ links: ILink[] }> = async () => {
  await dbConnect();

  const result = await Link.find({
    $or: [{ archived: false }, { archived: { $exists: false } }]
  }).sort({
    index: 'asc'
  });
  const links = result.map((doc) => {
    const link = doc.toObject();

    return pick(link, ['id', 'emoji', 'title', 'link', 'attention']) as ILink;
  });

  return { props: { links }, revalidate: 5 };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ links }) => (
  <Layout title="CeSIUM">
    <Image src="/cesium-logo.png" alt="CeSIUM's Logo" width={150} height={150} />

    <h1 className={styles.title}>CeSIUM</h1>

    <p className={styles.description}>Centro de Estudantes de Engenharia Informática da UMinho</p>

    <div className={styles.grid}>
      {links.map((link) => (
        <Card key={link.id} {...link} />
      ))}
    </div>
  </Layout>
);

export default Home;
