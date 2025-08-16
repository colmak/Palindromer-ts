import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dictionaryPath = path.join(process.cwd(), 'src', 'dictionary.txt');
    const fileContents = await fs.readFile(dictionaryPath, 'utf8');
    
    return new NextResponse(fileContents, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error('Error reading dictionary file:', error);
    return new NextResponse('Dictionary file not found', { status: 404 });
  }
}
