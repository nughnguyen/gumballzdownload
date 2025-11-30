import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, videoQuality, audioFormat, filenameStyle, videoCodec, tiktokSound, downloadMode, cobaltApiUrl } = body;

    const apiUrl = cobaltApiUrl || 'https://cobalt.api.wuk.sh';
    const response = await fetch(`${apiUrl}/api/json`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        videoQuality: videoQuality === 'max' ? 'max' : videoQuality,
        youtubeVideoCodec: videoCodec,
        audioFormat,
        filenameStyle,
        tiktokFullAudio: tiktokSound,
        downloadMode: downloadMode || 'auto',
        disableMetadata: false, 
      }),
    });

    const data = await response.json();
    console.log('Cobalt API Status:', response.status);
    console.log('Cobalt API Response:', JSON.stringify(data, null, 2));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Cobalt API Error:', error);
    return NextResponse.json({ status: 'error', text: 'Failed to process request' }, { status: 500 });
  }
}
