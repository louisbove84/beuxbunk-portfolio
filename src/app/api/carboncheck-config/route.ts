import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const mapsKey = process.env.CARBONCHECK_GOOGLE_MAPS_API_KEY ?? '';
  const body = `var GOOGLE_MAPS_API_KEY = '${mapsKey}';`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}
