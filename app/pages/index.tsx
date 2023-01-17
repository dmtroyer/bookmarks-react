import Head from 'next/head'
import { Nunito } from '@next/font/google'

const nunito = Nunito({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Bookmarks</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={nunito.className}>

        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">
            Bookmarks
          </h1>
        </div>

      </main>
    </>
  )
}
