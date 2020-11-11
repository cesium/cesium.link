import forms from '../../data/forms.json';

export default function Form() {}

Form.getInitialProps = ({ res, query }) => {
  const { name } = query;
  const link = forms[name];

  res.writeHead(301, {
    Location: link,
  });
  res.end();
};
