import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import dbConnect from '../../../utils/database';
import Redirect from '../../../models/Redirect';

export default withApiAuthRequired(async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const redirects = await Redirect.find({}).sort({ created: 'asc' });
        res.status(200).json({ success: true, data: redirects });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;
    case 'POST':
      try {
        const redirect = await Redirect.create(req.body);
        res.status(201).json({ success: true, data: redirect });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({
        success: false,
        error: { message: `Method ${method} Not Allowed` }
      });
      break;
  }
});
