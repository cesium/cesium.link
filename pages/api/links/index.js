import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import dbConnect from '../../../utils/database';
import Link from '../../../models/Link';

export default withApiAuthRequired(async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const links = await Link.find({}).sort({ index: 'asc' });
        res.status(200).json({ success: true, data: links });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;
    case 'POST':
      try {
        const link = await Link.create(req.body);
        res.status(201).json({ success: true, data: link });
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
