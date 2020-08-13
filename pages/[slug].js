import { domain } from '../data/settings.json';

export default function Slug() {}

Slug.getInitialProps = ({ res, query }) => {
  const { slug } = query;

  res.writeHead(301, {
    Location: `${domain}/${slug}`,
  });
  res.end();
};
