import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '白葉太陽のポートフォリオ',
  description: '便利を追求するエンジニア、白葉太陽のポートフォリオサイトです。',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
