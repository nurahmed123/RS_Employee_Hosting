import { mongooseConnect } from "@/lib/mongoose";
import { Achievement } from "@/models/Achievement";

export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();

    if (method === "GET") {
        if (req.query?.id) {
            // Fetch a single blog by id
            const blog = await Achievement.findById(req.query.id);
            res.json(blog);
        } else if (req.query?.achievementcategory) {
            // Fetch blogs by blogcategory
            const blogs = await Achievement.find({
                achievementcategory: req.query.achievementcategory,
            });
            res.json(blogs.reverse());
        } else if (req.query?.tags) {
            // Fetch blogs by blogcategory
            const blogs = await Achievement.find({ tags: req.query.tags });
            res.json(blogs.reverse());
        } else if (req.query?.slug) {
            // Fetch blogs by bcategory
            const blogs = await Achievement.find({ slug: req.query.slug });
            res.json(blogs.reverse());
        } else {
            // Fetch all blogs
            const blogs = await Achievement.find();
            res.json(blogs.reverse());
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
