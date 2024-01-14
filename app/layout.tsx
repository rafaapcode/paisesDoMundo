import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import Link from 'next/link'

const nunito = Nunito_Sans({ subsets: ['latin'], weight: '500' })

export const metadata: Metadata = {
  title: 'Paises do Mundo',
  description: 'Um lista de todos os paises do mundo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <main className='bg-gray-100 h-min-screen flex flex-col items-center'>
          <nav className='w-full bg-white h-16 flex items-center justify-center'>
            <section className='container flex items-center gap-3'>
              <Link href={`/`}>
                <Image width={42} height={42} src="./Logo-mundo.svg" alt='Logo do mapa mundi' />
              </Link>
              <h1 className='font-bold text-2xl'>Lista de Países</h1>
            </section>
          </nav>
          {children}
        </main>
      </body>
    </html>
  )
}
