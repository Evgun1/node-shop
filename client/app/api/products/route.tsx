export default async function GET() {
  const res = await fetch('http://localhost:5000/products');
  if (!res.ok) {
    throw new Error('');
  }
  const resData = await res.json();
  return Response.json(resData);
}
