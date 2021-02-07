import Head from "next/head";
import Image from "next/image";
import Card from "../components/Card";
import Footer from "../components/Footer";

import dbConnect from "../utils/database";
import Link from "../models/Link";

// import links from "../data/links.yml";
import styles from "../styles/Home.module.css";

export async function getServerSideProps() {
  await dbConnect();

  const result = await Link.find({});
  const links = result.map((doc) => {
    const link = doc.toObject();
    link._id = link._id.toString();
    link.created = link.created.toString();
    return link;
  });

  return { props: { links: links.reverse() } };
}

export default function Home({ links }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>CeSIUM</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <main className={styles.main}>
        <Image
          src="/2020.png"
          alt="CeSIUM's T-shirt 2020/21"
          width={150}
          height={150}
        />
        <h1 className={styles.title}>CeSIUM</h1>

        <p className={styles.description}>
          Centro de Estudantes de Engenharia Informática da UMinho
        </p>

        <div className={styles.grid}>
          {links.map((link) => (
            <Card key={link._id} {...link} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
