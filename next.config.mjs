import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    output:"export",
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ui-avatars.com',
          },
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
            },
            {
                protocol: 'https',
                hostname: 'img.daisyui.com',
            },
            {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
          },
            {
              protocol: 'https',
              hostname: 'www.facebook.com',
          },
        ],
      },
};

export default withNextIntl(nextConfig);
