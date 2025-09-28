
export const metadata = {
  title: 'Food Express',
  description: 'Delicious meals delivered fast',
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
