import { ImageResponse } from 'next/og';

export const alt = 'Akshat Agrawal | Full-stack developer & AI engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#F3F0E8',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          color: '#111111',
          border: '16px solid #EBE7DE',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#D6FF3D',
              padding: '10px 24px',
              borderRadius: '9999px',
              fontSize: '20px',
              fontWeight: 700,
              color: '#111111',
              letterSpacing: '-0.5px',
            }}
          >
            <span>AKSHAT AGRAWAL</span>
            <span>{"//"}</span>
            <span>PORTFOLIO</span>
          </div>

          <div
            style={{
              fontSize: '18px',
              color: '#6B6B66',
              fontWeight: 600,
              fontFamily: 'monospace',
            }}
          >
            DELHI NCR · IST
          </div>
        </div>

        {/* Middle Main Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '66px',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-2px',
              color: '#111111',
            }}
          >
            Building where AI meets software.
          </div>

          <div
            style={{
              fontSize: '28px',
              color: '#6B6B66',
              fontWeight: 400,
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            Full-stack developer, AI engineer, and designer. Turning complex problems into practical software.
          </div>
        </div>

        {/* Bottom Tags */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {['FULL-STACK', 'AI SYSTEMS', 'FASTAPI', 'REACT', 'PYTHON'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '8px 18px',
                  borderRadius: '12px',
                  backgroundColor: '#EBE7DE',
                  border: '1px solid #DAD6CB',
                  fontSize: '16px',
                  fontFamily: 'monospace',
                  color: '#111111',
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: '18px',
              color: '#6B6B66',
              fontFamily: 'monospace',
            }}
          >
            open for internships 2026–27
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
