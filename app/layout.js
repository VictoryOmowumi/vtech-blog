import './globals.css'
import '../styles/globals.css'
import { Header } from '@/components'
export const metadata = {
  title: 'Vtech Blog',
  description: 'A blog about tech and stuff',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Header />
      {children}
      </body>
    </html>
  )
}
