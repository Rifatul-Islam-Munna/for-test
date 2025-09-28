
export const metadata = {
  title: 'Book Bazaar',
  description: 'Buy and sell books online',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
      }}>
        {children}
      </body>
    </html>
  )
}
