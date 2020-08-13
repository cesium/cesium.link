import { domain } from '../../data/settings.json';

export default function News() {}

News.getInitialProps = ({ res, query }) => {
  const { id } = query;

  res.writeHead(301, {
    Location: `${domain}/articles/${id}`,
  });
  res.end();
};
