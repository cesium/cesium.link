import { social } from '../../data/settings.json';

export default function GitLab() {}

GitLab.getInitialProps = ({ res }) => {
  const { gitlab } = social;

  res.writeHead(301, {
    Location: `${gitlab}`,
  });
  res.end();
};
