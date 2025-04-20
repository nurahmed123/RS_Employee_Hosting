import { Url_Shortner } from "@/models/Url_Shortner";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { code } = req.query;

        // Connect to MongoDB
        await mongooseConnect();

        try {
            const data = await Url_Shortner.findOne({ code });
            console.log(data);

            if (data) {
                // Increment click count and save
                data.click += 1;
                await data.save();

                // Redirect to the original URL
                return res.redirect(data.url);
            } else {
                // Redirect to custom 404 page
                return res.redirect("/404");
            }
        } catch (error) {
            console.error("Error fetching URL:", error);

            // Redirect to custom 404 page for unexpected errors
            return res.redirect("/404");
        }
    } else {
        // Return 400 for unsupported HTTP methods
        return res.status(400).json({ error: "Bad request" });
    }
}
