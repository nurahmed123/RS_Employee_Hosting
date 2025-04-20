import { mongooseConnect } from "@/lib/mongoose";
import { Url_Shortner } from "@/models/Url_Shortner";

export default async function handle(req, res) {
    try {
        // Connect to MongoDB
        await mongooseConnect();

        const { method } = req;

        switch (method) {
            case "POST": {
                const { username, code, url, click } = req.body;

                if (!url) {
                    return res.status(400).json({ error: "URL is required" });
                }

                // If no username is provided, set expiresAt to 5 minutes from now
                let expiresAt = null;
                if (!username) {
                    expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Set to 30 days from now
                }

                const newEntry = await Url_Shortner.create({ username: username || "", code, url, click, expiresAt });
                return res.status(201).json(newEntry);
            }

            case "GET": {
                const { id, username } = req.query;

                if (id) {
                    const entry = await Url_Shortner.findById(id);
                    if (!entry) {
                        return res.status(404).json({ error: "Entry not found" });
                    }
                    return res.status(200).json(entry);
                }

                if (username) {
                    const entries = await Url_Shortner.find({ username }).sort({ createdAt: 1 });
                    return res.status(200).json(entries);
                }

                const allEntries = await Url_Shortner.find().sort({ createdAt: 1 });
                return res.status(200).json(allEntries);
            }

            case "PUT": {
                const { _id, username, code, url, click } = req.body;

                if (!_id) {
                    return res.status(400).json({ error: "ID is required for updating" });
                }

                const updatedEntry = await Url_Shortner.findByIdAndUpdate(
                    _id,
                    { username, code, url, click },
                    { new: true } // Return the updated document
                );

                if (!updatedEntry) {
                    return res.status(404).json({ error: "Entry not found for update" });
                }

                return res.status(200).json(updatedEntry);
            }

            case "DELETE": {
                const { id } = req.query;

                if (!id) {
                    return res.status(400).json({ error: "ID is required for deletion" });
                }

                const deletedEntry = await Url_Shortner.findByIdAndDelete(id);

                if (!deletedEntry) {
                    return res.status(404).json({ error: "Entry not found for deletion" });
                }

                return res.status(200).json({ success: true, message: "Entry deleted successfully" });
            }

            default:
                return res.status(405).json({ error: `Method ${method} not allowed` });
        }
    } catch (error) {
        console.error("Error in /api/shortUrl handler:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
