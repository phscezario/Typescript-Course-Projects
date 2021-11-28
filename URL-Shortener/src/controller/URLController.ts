import { config } from '../config/Constants';
import { Request, Response } from 'express';
import shortId from 'shortid';
import { URLModel } from '../database/model/URL';

export class URLController {
    public async shorten(req: Request, res: Response): Promise<void> {
        // Verify if URL exist
        const { originURL } = req.body;
        const url = await URLModel.findOne({ originURL });

        if (url) {
            res.json(url);
            return;
        }
        
        // Make URL HASH
        const hash = shortId.generate();
        const shortURL = `${config.API_URL}/${hash}`;

        // Save URL at BD
        const newURL = await URLModel.create({ originURL, hash, shortURL });

        // Return URL
        res.json(newURL);
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        // Take URL hash
        const { hash } = req.params;
        // Find original URL by hash
        const url = await URLModel.findOne({ hash });

        if (url) {
            res.redirect(url.originURL)
            return;
        }

        // Redirect to original URL
        res.status(400).json({ error: 'URL not found' });
    }
}