// import { NextResponse } from 'next/server';
// import bcrypt from 'bcrypt';
// import { User } from '@/models/User';

// export default async function createuser(req, res) {
//     const { method } = req;


//     if (method === 'POST') {
//         const { country, role, password, username, name, phone, email } = req.body;



//         // return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 })
//         res.status(200).json({ message: email });
//     } else {
//         res.status(405).json({ message: 'Method Not Allowed' });
//     }
// }








import { mongooseConnect } from "@/lib/mongoose";
import { User } from '@/models/User';

export default async function createuser(req, res) {

    // If authenticated, connect to MongoDB
    await mongooseConnect();

    const { method } = req;


    if (method === 'POST') {
        const { name, role, username, country, email, phone, password, image, bio, facebook, github, linkedin } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }
        const productDoc = await User.create({
            name, role, username, country, email, phone, password, image, bio, facebook, github, linkedin
        })

        res.json(productDoc)
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await User.findById(req.query.id));
        } else if (req.query?.email) {
            // Fetch blogs by bcategory
            const user = await User.find({ slug: req.query.email });
            res.json(user.reverse());
        } else {
            res.json((await User.find()).reverse())
        }
    }


    if (method === 'PUT') {
        const { _id, name, role, username, country, email, phone, password, image, bio, facebook, github, linkedin } = req.body;

        const existingUser = await User.findOne({ email });

        await User.updateOne({ email }, {
            name, role, username, country, email, phone, password, image, bio, facebook, github, linkedin
        });

        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await User.deleteOne({ _id: req.query?.id });
            res.json(true)
        }
    }
}