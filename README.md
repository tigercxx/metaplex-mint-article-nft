## Metaplex mint article nft

```bash
yarn install
yarn run dev
```

On first try, unable to upload pdf normally, need to do some sort of rerendering (try saving the code to cause a hot reload). After that it should do everything properly. Also weirdly need to "ctr+C" twice to stop.

Use [the one time use](https://github.com/tigercxx/metaplex-mint-one-time-use) repo to create the original NFT. Then copy the mint address of the NFT created and add it as the value to the collection key in the metaplex.nfts().create function.

Upload your own image to NFTStore and use that link for your image for each NFT.

Use the [nft-routing-server](https://github.com/tigercxx/nftstore-routing-server) to handle uploads to NFT of pdf and metadata.
