import formidable from "formidable";
import { readFileSync, unlinkSync } from "fs";
import { NextApiHandler } from "next";
import { File, NFTStorage } from "nft.storage";
import { NFTSTORAGETOKEN } from "../../../config";

const client = new NFTStorage({ token: NFTSTORAGETOKEN });

const handler: NextApiHandler = async (req, res) => {
  if (req.method != "POST") {
    return res.status(403).json({ error: `Unsupported method ${req.method}` });
  }

  try {
    // Parse req body and save image in /tmp
    const data: any = await new Promise((res, rej) => {
      const uploadDir = `${process.cwd()}/tmp`;
      const form = formidable({ multiples: true, uploadDir });
      form.parse(req, (err, fields, files) => {
        if (err) rej(err);
        res({ ...fields, ...files });
      });
    });

    // Read image from /tmp
    const {
      filepath,
      originalFilename = "image",
      mimetype = "image/*",
    } = data.image[0];

    const buffer = readFileSync(data.image[0].filepath);
    const arraybuffer = Uint8Array.from(buffer).buffer;

    const file = new File([arraybuffer], originalFilename, {
      type: mimetype,
    });

    // Upload data to nft.storage
    const metadata = await client.store({
      name: data.name[0],
      description: data.description[0],
      image: file,
    });

    // Delete tmp image
    unlinkSync(filepath);
    // return tokenURI
    res.status(201).json({ uri: metadata.url });
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
};

// Must disable bodyParser for formidable to work
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
