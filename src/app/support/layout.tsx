import type { Metadata } from 'next';
import { CONTACT_INFO } from '../../constants/site';

export const metadata: Metadata = {
  title: `Support - ${CONTACT_INFO.name}`,
  description: 'Get support for applications and projects. Contact for help, bug reports, or feature requests.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

