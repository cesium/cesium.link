import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import dbConnect from '../../../utils/database';
import Link from '../../../models/Link';

export default withApiAuthRequired(async (req, res) => {
  const {
    query: { id },
    method
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const link = await Link.findById(id);

        if (!link) {
          return res.status(404).json({ success: false, error: { message: 'Link not found' } });
        }
        res.status(200).json({ success: true, data: link });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;

    case 'PUT':
      try {
        const link = await Link.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!link) {
          return res.status(404).json({ success: false, error: { message: 'Link not found' } });
        }
        res.status(200).json({ success: true, data: link });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;

    case 'DELETE':
      try {
        const deleted = await Link.deleteOne({ _id: id });
        if (!deleted) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).json({
        success: false,
        error: { message: `Method ${method} Not Allowed` }
      });
      break;
  }
});
