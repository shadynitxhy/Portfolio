import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Developer & Designer — Portfolio",
  description:
    "Crafting digital experiences at the intersection of design and engineering.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        />
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@300,400,500,600,700&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@300,400,500,600,700&display=swap"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --font-body: 'Inter', system-ui, sans-serif;
                --font-display: 'Clash Display', 'ClashDisplay', system-ui, sans-serif;
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-surface font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
