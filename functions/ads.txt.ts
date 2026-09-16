export const onRequestGet = async () => {
  return new Response('google.com, pub-2683919410645700, DIRECT, f08c47fec0942fa0\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*'
    }
  });
};
