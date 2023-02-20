import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt, resolution, numberImage} = req.body;
    
    console.log(`Pedindo ${numberImage} imagem(es)`);

    const aiResponse = await openai.createImage({
      prompt,
      n: numberImage,
      size: resolution,
      response_format: 'b64_json',
    });

    console.log(`Gerando ${numberImage} imagem(es)`);

    const image = aiResponse.data.data.map((data) => {
      return {
        data: data.b64_json
      }
    });
    
    res.status(200).json({image});
    
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;