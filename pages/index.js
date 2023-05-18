import Head from "next/head";
import styles from "../styles/Home.module.css";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import moment from 'moment';

let startTime = "2023-05-18 11:44:11";

export default function Home() {
  let initBlock = {num:0,times:0};
  const [blocks, setBlocks] = useState(initBlock);

  useEffect(() => {
    const provider = new ethers.WebSocketProvider("wss://mainnet.infura.io/ws/v3/8c5975bf0119494789ae0c227dce2b83");
   
    provider.on("block", async (block) => {
      const blockInfo = await provider.getBlock(block);
      let formatted = moment(blockInfo.timestamp * 1000).format("YYYY-MM-DD HH:mm:ss"); 
      let newBlock = { ...blocks, num: blockInfo.number, times: formatted };
      setBlocks(newBlock);
      //console.log("userEffect");
      console.log(block);
    
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>subscription block</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">ThinkingChain</a>
        </h1>

        <p className={styles.description}>Start Times :{startTime}</p>
        <p className={styles.description}>Current Times :{blocks.times}</p>
        <p className={styles.description}>Current Block :{blocks.num}</p>
      </main>

      <footer>
        <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
          Powered by <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
