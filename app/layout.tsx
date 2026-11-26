import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Get Glammed by Sobhna | Beauty & Care', description: 'Discover beauty, makeup, hair and wellness services.', icons: { icon: '/images/get-glammed-logo.png' } };
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
