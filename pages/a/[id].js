import { domain } from '../../data/settings.json';

export default function Activity() {}

Activity.getInitialProps = ({ res, query }) => {
  const { id } = query;

  res.writeHead(301, {
    Location: `${domain}/activities/${id}`,
  });
  res.end();
};
