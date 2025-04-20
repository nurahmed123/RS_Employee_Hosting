import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
    
       // If authenticated, connect to MongoDB
    await mongooseConnect();
    
    const { method } = req;


    if (method === 'POST') {
        const { title, slug, author, description, blogcategory, tags, keywords, metadescription, primarystatus, status } = req.body;
        // console.log(author)
        // console.log(title)
        // console.log(description)

        const productDoc = await Blog.create({
            title, slug, author, description, blogcategory, tags, keywords, metadescription, primarystatus, status
        })

        res.json(productDoc)
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Blog.findById(req.query.id));
        } else {
            res.json((await Blog.find()).reverse())
        }
    }


    if (method === 'PUT') {
        const { _id, title, slug, author, description, blogcategory, tags, keywords, metadescription, primarystatus, status } = req.body;
        await Blog.updateOne({ _id }, {
            title, slug, author, description, blogcategory, tags, keywords, metadescription, primarystatus, status
        });

        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Blog.deleteOne({ _id: req.query?.id });
            res.json(true)
        }
    }
}