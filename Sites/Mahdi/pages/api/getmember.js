import { mongooseConnect } from "@/lib/mongoose";
import { Member } from "@/models/Member";

export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();

    if (method === 'GET') {
        if (req.query?.id) {
            // Fetch a single member by id
            const member = await Member.findById(req.query.id);
            res.json(member || {});
        } else if (req.query?.role) {
            // Fetch members by role
            const members = await Member.find({ role: req.query.role });
            res.json(members.reverse());
        } else if (req.query?.email) {
            // Fetch members by email
            const members = await Member.find({ tags: req.query.email });
            res.json(members.reverse());
        } else if (req.query?.phone) {
            // Fetch members by phone
            const members = await Member.find({ slug: req.query.phone });
            res.json(members.reverse());
        } else if (req.query?.status) {
            // Fetch members by status
            const members = await Member.find({ status: req.query.status });
            res.json(members.reverse());
        } else {
            // Fetch all members
            const members = await Member.find();
            res.json(members.reverse());
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
