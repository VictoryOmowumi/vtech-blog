import './globals.css'
import '../styles/globals.css'
import { Header } from '@/components'
export const metadata = {
  title: 'Vtech Blog',
  description: 'A blog about tech and stuff',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">

    <head>
    <title>{metadata.title}</title>
    <meta name="description" content={metadata.description} />
    </head>

      <body >
        <Header />
      {children}
      </body>
    </html>
  )
}

export default RootLayout