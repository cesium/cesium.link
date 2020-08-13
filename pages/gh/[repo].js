import { social } from '../../data/settings.json';

export default function Repo() {}

Repo.getInitialProps = ({ res, query }) => {
  const { repo } = query;
  const { github } = social;

  res.writeHead(301, {
    Location: `${github}/${repo}`,
  });
  res.end();
};
