import { Request, Response } from 'express';
import { client } from '../config';

const search = async (req: Request, res: Response) => {
  const body = {
    size: 200,
    from: 0,
    query: {
      match_phrase_prefix: {
        name: req.query['q']
      }
    }
  };

  try {
    const results = await client.search({
      index: 'es-node',
      body: body,
      type: 'citiesList'
    });
    res.send(results.hits);
  } catch (error) {
    console.log(error);
    res.send([]);
  }
};

export default search;
