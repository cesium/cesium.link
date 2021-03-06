import dbConnect from '../../../../utils/database';
import Link from '../../../../models/Link';

export default async (req, res) => {
  const {
    query: { id: slug },
    method
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const link = await Link.findOneAndUpdate({ slug }, { $inc: { clicks: 1 } }, { new: true });

        if (!link) {
          return res.status(404).json({ success: false, error: { message: 'Link not found' } });
        }
        res.status(200).json({ success: true, data: link.url });
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
