import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#D6FF3D',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#111111',
          fontWeight: 900,
          borderRadius: '8px',
          border: '2px solid #111111',
          fontFamily: 'sans-serif',
        }}
      >
        A
      </div>
    ),
    {
      ...size,
    }
  );
}
