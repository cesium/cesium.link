import { domain } from '../data/settings.json';

export default function Index() {}

Index.getInitialProps = ({ res }) => {
  res.writeHead(301, {
    Location: domain,
  });
  res.end();
};
