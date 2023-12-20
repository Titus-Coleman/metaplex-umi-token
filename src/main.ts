import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { userKeypair } from "./helpers";
import { mplTokenMetadata, createV1, TokenStandard, mintV1, createAndMint  } from "@metaplex-foundation/mpl-token-metadata";
import { keypairIdentity, generateSigner, percentAmount, signerIdentity, signerPayer } from "@metaplex-foundation/umi";
import * as readline from "readline"
import * as util from "util"
import * as process from "process"

const umi = createUmi('https://api.devnet.solana.com');

const keypair = umi.eddsa.createKeypairFromSecretKey(userKeypair.secretKey);

umi.use(keypairIdentity(keypair))
.use(mplTokenMetadata())

const rl = readline.createInterface({input: process.stdin, output:process.stdout})
	
interface Metadata {
    tokenName: string;
    symbol: string; 
    uri: string;
    tokenSupply: string;
  }
const metadata: Metadata = {
    tokenName: null!,
    symbol: null!,
    uri: null!,
    tokenSupply: null!,
};


    rl.question("What do you want to call this token?: ", (name) => {
        rl.question("Please enter a 3-4 letter ticker symbol: ", (ticker) => {
          rl.question("Where did you post the JSON metadata file? (Paste url): ", (uri) => {
            rl.question("How many tokens do you want to create?: ", (supply) => {
                metadata.tokenName = name ;
                metadata.symbol = ticker;
                metadata.uri = uri;
                metadata.tokenSupply = supply;
            rl.close();
            console.log(metadata)
            console.log(`\nSuccessfully minted ${metadata.tokenSupply} ${metadata.symbol}\nToken Address: ${mint.publicKey}`);
            // createMyToken()
          });
        });
      });
    })





// https://developers.metaplex.com/token-metadata/mint

const mint = generateSigner(umi);


async function createMyToken() {
    await createAndMint(umi, {
        mint,
        authority: umi.identity,
        name: metadata.tokenName,
        symbol: metadata.symbol,
        uri: metadata.uri,
        sellerFeeBasisPoints: percentAmount(0),
        decimals: 9,
        amount: Number(metadata.tokenSupply),
        tokenOwner: umi.identity.publicKey,
        tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi).then(() => {
        console.log(`Successfully minted ${metadata.tokenSupply} ${metadata.symbol}, '\n' Token Address: ${mint.publicKey}`);
    })

}

