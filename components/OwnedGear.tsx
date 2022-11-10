import {
  ThirdwebNftMedia,
  useAddress,
  useOwnedNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import { EditionDrop, SmartContract } from "@thirdweb-dev/sdk";
import React from "react";
import Card from 'react-bootstrap/Card';
import LoadingSection from "./utils/Loading";
import styles from "../styles/App.module.scss";
import { MINING_CONTRACT_ADDRESS } from "../const/contract";

type Props = {
  pickaxeContract: EditionDrop;
  miningContract: SmartContract<any>;
};

/**
 * This component shows the:
 * - Pickaxes the connected wallet has
 * - A stake button underneath each of them to equip it
 */
export default function OwnedGear({ pickaxeContract, miningContract }: Props) {
  const address = useAddress();
  const { data: ownedPickaxes, isLoading } = useOwnedNFTs(
    pickaxeContract,
    address
  );

  if (isLoading) {
    return <LoadingSection />;
  }

  async function equip(id: string) {
    if (!address) return;

    // The contract requires approval to be able to transfer the pickaxe
    const hasApproval = await pickaxeContract.isApproved(
      address,
      MINING_CONTRACT_ADDRESS
    );

    if (!hasApproval) {
      await pickaxeContract.setApprovalForAll(MINING_CONTRACT_ADDRESS, true);
    }

    await miningContract.call("stake", id);

    // Refresh the page
    window.location.reload();
  }

  return (
    <>
      <div className={styles.nftBoxGrid}>
        {ownedPickaxes?.map((p) => (
          <Card className={styles.nftBox} key={p.metadata.id.toString()}>
            <ThirdwebNftMedia
              metadata={p.metadata}
              className={`${styles.nftMedia}`}
              height={"64"}
            />
      <Card.Body>
        <Card.Title>{p.metadata.name}</Card.Title>

            <div className={styles.smallMargin}>
              <Web3Button
                colorMode="dark"
				accentColor="#0d6efd"
                contractAddress={MINING_CONTRACT_ADDRESS}
                action={() => equip(p.metadata.id)}
              >
                Stake
              </Web3Button>
            </div>
      </Card.Body>
    </Card>
        ))}
      </div>
    </>
  );
}
