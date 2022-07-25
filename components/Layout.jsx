import Head from 'next/head'

import { Header } from './'

const Layout = ({ children }) => (
  <div>
    <Head>
      <title>Rock Store</title>
      <meta name="description" content="The store that sells rocks." />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />
    
    <main>
      {children}
    </main>
  </div>
)

export default Layout