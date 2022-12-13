import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ContextProvider } from '../contexts/ContextProvider';
import { RequestPay } from '../components/RequestPay';
require('@solana/wallet-adapter-react-ui/styles.css');

export default function Home() {
  return (
    <ContextProvider>
    <div className={styles.container}>
      <Head>
        <title>Solana lfg</title>
        <meta name="description" content="kekw" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to kms payment testing!
        </h1>
        <br />
        <br />
        <WalletMultiButton className="btn btn-ghost mr-4" />
        <br />
        <br />
        {/* <button style={{fontSize: "1.6em", backgroundColor:"purple", borderRadius:"10%"}}>
          Pay
        </button> */}
        <RequestPay/>
        

        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          DeJournalism
        </a>
      </footer>
    </div>
    </ContextProvider>
  )
}
