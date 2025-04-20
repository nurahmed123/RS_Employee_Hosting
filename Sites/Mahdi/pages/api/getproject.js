import { mongooseConnect } from "@/lib/mongoose";
import { Project } from "@/models/Project";

export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();

    if (method === 'GET') {
        if (req.query?.id) {
            // Fetch a single blog by id
            const blog = await Project.findById(req.query.id);
            res.json(blog);
        } else if (req.query?.projectcategory) {
            // Fetch blogs by projectcategory
            const blogs = await Project.find({ projectcategory: req.query.projectcategory });
            res.json(blogs.reverse());
        } else if (req.query?.tags) {
            // Fetch blogs by projectcategory
            const blogs = await Project.find({ tags: req.query.tags });
            res.json(blogs.reverse());
        } else if (req.query?.slug) {
            // Fetch blogs by bcategory
            const blogs = await Project.find({ slug: req.query.slug });
            res.json(blogs.reverse());
        } else {
            // Fetch all blogs
            const blogs = await Project.find();
            res.json(blogs.reverse());
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
