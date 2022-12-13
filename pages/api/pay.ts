// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
    Transaction,
    SystemProgram,
    PublicKey,
    Connection,
    clusterApiUrl,
    Keypair,
} from "@solana/web3.js";
import bs58 from "bs58";
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback } from 'react';

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {
      switch(req.method){
        case "POST":
          const accountField = req.body.account;
          const account = new PublicKey(accountField);
          const connection = new Connection(clusterApiUrl("devnet"));
          // create the transaction
          const transaction = new Transaction();
      



      }
    } catch (error) {
        console.log("error", error);
    }
}

// res.statusMessage = "LFG IT FKING WORKS!!!"
// res.status(200).end();
