import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { userKeypair } from "./helpers";
import { mplTokenMetadata, createV1, TokenStandard, mintV1, createAndMint  } from "@metaplex-foundation/mpl-token-metadata";
import { keypairIdentity, generateSigner, percentAmount, signerIdentity, signerPayer } from "@metaplex-foundation/umi";

const umi = createUmi('https://api.devnet.solana.com');

const keypair = umi.eddsa.createKeypairFromSecretKey(userKeypair.secretKey);

umi.use(keypairIdentity(keypair))
.use(mplTokenMetadata())
	


const metadata = {
    name: "Vin Moon",
    symbol: "VMO",
    uri: "https://raw.githubusercontent.com/Titus-Coleman/metaplex-umi-token/main/src/test-asset.json",
};


// https://developers.metaplex.com/token-metadata/mint

const mint = generateSigner(umi);

async function createMyToken() {
    await createAndMint(umi, {
        mint,
        authority: umi.identity,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        sellerFeeBasisPoints: percentAmount(0),
        decimals: 9,
        amount: 10_000,
        tokenOwner: umi.identity.publicKey,
        tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi).then(() => {
        console.log("Success VMO (", mint.publicKey, ") minted");
    })
// async function createMetadataDetails() {
//     await createV1(umi, {
//         mint,
//         authority: umi.identity,
//         name: metadata.name,
//         symbol: metadata.symbol,
//         uri: metadata.uri,
//         sellerFeeBasisPoints: percentAmount(0),
//         decimals: 9,
//         tokenStandard: TokenStandard.Fungible,
//     }).sendAndConfirm(umi)
}

// async function mintToken() {
//     await mintV1(umi, {
//         mint: mint.publicKey,
//         authority: umi.identity,
//         amount: 10_000,
//         tokenOwner: umi.identity.publicKey,
//         tokenStandard: TokenStandard.Fungible,
//     }).sendAndConfirm(umi)
// }

// createMetadataDetails()
// mintToken()

createMyToken()