import elasticsearch from 'elasticsearch';

export const client = new elasticsearch.Client({
  hosts: ['http://localhost:9200']
});

const ping = () => {
 return client.ping(
  {
    requestTimeout: 30000
  },
  (error: any) => {
    if (error) {
      console.log('elasticsearch cluster is down');
    } else {
      console.log('  elasticsearch is active');
    }
  }
);
};


export default ping;


