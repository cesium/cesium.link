import { social } from '../../data/settings.json';

export default function GitHub() {}

GitHub.getInitialProps = ({ res }) => {
  const { github } = social;

  res.writeHead(301, {
    Location: `${github}`,
  });
  res.end();
};
