import type { Metadata } from 'next';
import { CONTACT_INFO } from '../../constants/site';

export const metadata: Metadata = {
  title: `Privacy Policy - ${CONTACT_INFO.name}`,
  description: 'Privacy policy for beuxbunk.com. We do not collect, store, or process any personal data from visitors.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

