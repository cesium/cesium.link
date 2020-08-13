import { social } from '../../data/settings.json';

export default function Repo() {}

Repo.getInitialProps = ({ res, query }) => {
  const { repo } = query;
  const { gitlab } = social;

  res.writeHead(301, {
    Location: `${gitlab}/${repo}`,
  });
  res.end();
};
