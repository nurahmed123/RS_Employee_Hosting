import { mongooseConnect } from "@/lib/mongoose";
import { Comment } from "@/models/Comment";


export default async function createuser(req, res) {

    // If authenticated, connect to MongoDB
    await mongooseConnect();

    const { method } = req;


    if (method === 'POST') {
        const { userid, username, comment, slug } = req.body;

        const productDoc = await Comment.create({
            userid, username, comment, slug
        })

        res.json(productDoc)
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Comment.findById(req.query.id));
        } else if (req.query?.slug) {
            // Fetch blogs by bcategory
            const comment = await Comment.find({ slug: req.query.slug });
            res.json(comment.reverse());
        }
        else {
            res.json((await Comment.find()).reverse())
        }
    }


    if (method === 'PUT') {
        const { editingCommentId, userid, username, comment, slug } = req.body;

        await Comment.updateOne({ _id: editingCommentId }, {
            userid, username, comment, slug
        });

        res.json(true);
    }

    if (method === 'DELETE') {
        const { commentId } = req.body;
        if (commentId) {
            // console.log(commentId)
            await Comment.deleteOne({ _id: commentId });
            res.json(true)
        }

        // try {
        //     await Comment.findByIdAndDelete(id);
        //     res.status(200).json({ success: true });
        // } catch (error) {
        //     res.status(400).json({ success: false, error });
        // }


        // try {
        //     await Comment.deleteOne({ _id: req.query?.id });
        //     res.status(200).json({ success: true });
        // } catch (error) {
        //     res.status(400).json({ success: false, error });
        // }

    }
}