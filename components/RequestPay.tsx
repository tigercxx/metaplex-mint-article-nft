import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
    Transaction,
    LAMPORTS_PER_SOL,
    TransactionSignature,
    SystemProgram,
    PublicKey,
} from "@solana/web3.js";
import { FC, useCallback, useState, ChangeEvent, SetStateAction } from "react";
import {
    Metaplex,
    walletAdapterIdentity,
    bundlrStorage,
} from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, PublicKeyInitData, Signer } from "@solana/web3.js";

export const RequestPay: FC = () => {
    const { connection } = useConnection();
    // const { publicKey, sendTransaction } = useWallet();
    const wallet = useWallet();
    const SOL_PRICE_OF_LIKE = 0.1;
    const metaplex = Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet))
        .use(
            bundlrStorage({
                address: "https://devnet.bundlr.network",
                providerUrl:
                    "https://shy-frequent-resonance.solana-devnet.discover.quiknode.pro/599801ea48c337f34c36579cb1d17a6836979506/",
                timeout: 60000,
            })
        );
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [file, setFile] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("http://localhost:3000/upload_article", {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
            },
        });
        console.log("pdf uploaded");
        const data = await response.json();
        console.log(data.link);
        return `${data.link}`;
    };

    const handleMetadataUpload = async (
        event: { preventDefault: () => void },
        pdfURI: any
    ) => {
        event.preventDefault();
        console.log(`[inputs in meta] ${title} ${description} ${author}`)
        const metadataUpload = JSON.stringify({
            title: `${title} meta`,
            description: `${description}`,
            author: `${author}`,
            image: "https://nftstorage.link/ipfs/bafkreiexugso4wk3ugovkz5zi6nbhvr4h3zysg5pwtmmvppt4y7rpypwnq",
            timestamp: Date.now(),
            properties: {
                files: 
                    {
                        type: "application/pdf",
                        uri: `${pdfURI}`,
                    },
                
            },
        });
        const response = await fetch("http://localhost:3000/upload_metadata", {
            "method": "POST",
            "body": metadataUpload,
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        });
        const data = await response.json();
        console.log(data.link);
        return `${data.link}`;
    };

    // const bundlrs = metaplex.storage().driver() as BundlrStorageDriver;

    const onClick = useCallback(
        async (event: { preventDefault: () => void }) => {
            console.log("new click");
            if (!wallet.publicKey) {
                console.log("error", "Wallet not connected!");
                alert("Wallet not Connected!");
                return;
            }
            const pdfURI = await handleUpload(event);
            console.log(`pdf uri ${pdfURI}`)
            const URI = await handleMetadataUpload(event, pdfURI);
            console.log(`metadata uri ${URI}`);
            try {
                const { nft } = await metaplex.nfts().create({
                    uri: URI,
                    name: `${title} nft`,
                    sellerFeeBasisPoints: 500, // Represents 5.00%.
                    symbol: "OYC",
                    updateAuthority: metaplex.identity(),
                    creators: [
                        {
                            address: wallet.publicKey,
                            authority: metaplex.identity(),
                            share: 100,
                        }, // subsequent ones only need address and share
                    ],
                    isMutable: false,
                    isCollection: true,
                    collection: new PublicKey(
                        "6Qj2wrdUqdA3Vxad5pKbaw8BJNK2sajxjE9z3MzSCraM"
                    ),
                    collectionIsSized: true,
                });
                // alert("Transaction Confirmed!");
                console.log(nft);
                console.log(nft.address.toString());
            } catch (error: any) {
                alert(error);
                console.log(error);
            }
        },
        [wallet.publicKey, connection]
    );

    const titleHandler = (e: { target: { value: SetStateAction<string> } }) => {
        console.log("title");
        setTitle(e.target.value);
    };
    
    const descriptionHandler = (e: { target: { value: SetStateAction<string> } }) => {
        console.log("description");
        setDescription(e.target.value);
    };
    
    const authorHandler = (e: { target: { value: SetStateAction<string> } }) => {
        console.log("author");
        setAuthor(e.target.value);
    };
    
    return (
        <div>
            <form>
            <label>
                    {" "}
                    Title:{" "}
                    <input
                        type="text"
                        value={title}
                        onChange={titleHandler}
                    />{" "}
                </label><br></br>
                <label>
                    {" "}
                    Description:{" "}
                    <input
                        type="text"
                        value={description}
                        onChange={descriptionHandler}
                    />{" "}
                </label><br></br>
                <label>
                    {" "}
                    Author:{" "}
                    <input
                        type="text"
                        value={author}
                        onChange={authorHandler}
                    />{" "}
                </label><br></br>
                <label>
                    {" "}
                    PDF: <input type="file" onChange={handleFileChange} />{" "}
                </label><br></br>

                <button
                    className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
                    onClick={onClick}
                >
                    <span>Submit</span>
                </button>
            </form>
        </div>
    );
};
