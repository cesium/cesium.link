import dbConnect from '../../../../utils/database';
import Form from '../../../../models/Form';

export default async (req, res) => {
  const {
    query: { slug },
    method
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const form = await Form.findOneAndUpdate({ slug }, { $inc: { visits: 1 } }, { new: true });

        if (!form) {
          return res.status(404).json({ success: false, error: { message: 'Form not found' } });
        }
        res.status(200).json({ success: true, data: form.url });
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
