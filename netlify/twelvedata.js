export default async (request, context) => {
  const url = new URL(request.url);
  const symbol = url.searchParams.get('symbol');
  const interval = url.searchParams.get('interval') || '1day';
  const outputsize = url.searchParams.get('outputsize') || '30';

  if (!symbol) {
    return new Response(JSON.stringify({ error: 'No symbol' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const API_KEY = Netlify.env.get('TWELVEDATA_KEY');

  const apiUrl = `https://api.twelvedata.com/time_series?symbol=${encodeURIComponent(symbol)}&interval=${interval}&outputsize=${outputsize}&apikey=${API_KEY}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
