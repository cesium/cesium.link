import { domain } from '../../data/settings.json';

export default function Job() {}

Job.getInitialProps = ({ res, query }) => {
  const { id } = query;

  res.writeHead(301, {
    Location: `${domain}/jobs/${id}`,
  });
  res.end();
};
