import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { userKeypair } from "./helpers";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { keypairIdentity } from "@metaplex-foundation/umi";

const umi = createUmi('https://api.devnet.solana.com');

const keypair = umi.edds.createKeypairFromSecretKey(userKeypair.secretKey);

umi.use(keypairIdentity(keypair))
	.use(mplTokenMetadata())