export default async (request, context) => {
  const url = new URL(request.url);
  const symbol = url.searchParams.get('symbol');

  if (!symbol) {
    return new Response(JSON.stringify({ error: 'No symbol' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const FINNHUB_KEY = Netlify.env.get('FINNHUB_KEY');

  const response = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}`,
    { headers: { 'X-Finnhub-Token': FINNHUB_KEY } }
  );

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
