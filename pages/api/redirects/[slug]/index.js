import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import dbConnect from '~/lib/database';
import Redirect from '~/models/Redirect';

export default withApiAuthRequired(async (req, res) => {
  const {
    query: { slug },
    method
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const redirect = await Redirect.findOne({ slug });

        if (!redirect) {
          return res.status(404).json({ success: false, error: { message: 'Redirect not found' } });
        }
        res.status(200).json({ success: true, data: redirect });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;

    case 'PUT':
      try {
        const redirect = await Redirect.findOneAndUpdate(
          slug,
          { ...req.body, updated: Date.now() },
          {
            new: true,
            runValidators: true
          }
        );
        if (!redirect) {
          return res.status(404).json({ success: false, error: { message: 'Redirect not found' } });
        }
        res.status(200).json({ success: true, data: redirect });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;

    case 'DELETE':
      try {
        const deleted = await Redirect.deleteOne({ slug });
        if (!deleted) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({
        success: false,
        error: { message: `Method ${method} Not Allowed` }
      });
      break;
  }
});
