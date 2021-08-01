import dbConnect from '~/lib/database';
import Redirect from '~/models/Redirect';

export default async (req, res) => {
  const {
    query: { slug },
    method
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const redirect = await Redirect.findOneAndUpdate(
          { slug },
          { $inc: { visits: 1 } },
          { new: true }
        );

        if (!redirect) {
          return res.status(404).json({ success: false, error: { message: 'Redirect not found' } });
        }
        res.status(200).json({ success: true, data: redirect.url });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).json({
        success: false,
        error: { message: `Method ${method} Not Allowed` }
      });
      break;
  }
};
