import React from "react";
import {
  ThirdwebNftMedia,
  useAddress,
  useContractRead,
  useMetadata,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { SmartContract, Token } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import styles from "../styles/App.module.scss";
import ApproxRewards from "./ApproxRewards";
import { MINING_CONTRACT_ADDRESS } from "../const/contract";

type Props = {
  miningContract: SmartContract<any>;
  tokenContract: Token;
};

/**
 * This component shows the:
 * - Metadata of the token itself (mainly care about image)
 * - The amount this wallet holds of this wallet
 * - The amount this user can claim from the mining contract
 */
export default function Rewards({ miningContract, tokenContract }: Props) {
  const address = useAddress();
  const Symbol = '$ORD';

  const { data: tokenMetadata } = useMetadata(tokenContract);
  const { data: currentBalance } = useTokenBalance(tokenContract, address);
  const { data: unclaimedAmount } = useContractRead(
    miningContract,
    "calculateRewards",
    address
  );
  
  async function claim() {
    if (!address) return;

    await miningContract.call("claim");
  }

  return (
    <Card style={{
		  marginBottom: "20px"
		  }}>
      <Card.Header>
        Your <b>{Symbol} Token</b>
      </Card.Header>
<Card.Body>
      {tokenMetadata && (
        <ThirdwebNftMedia
          // @ts-ignore
          metadata={tokenMetadata}
          height={"48"}
        />
      )}
      <p>
        Balance: <b>{currentBalance?.displayValue} {Symbol}</b>
      </p>

        <Alert variant="success">
      <ApproxRewards miningContract={miningContract} />

      <p>
        Unclaimed:{" "}
        <b>{unclaimedAmount && ethers.utils.formatUnits(unclaimedAmount)} {Symbol}</b>
      </p>
      <div className={styles.smallMargin} style={{ float: "right" }}>
        <Button variant="success" size="sm"
        onClick={() => claim()}
        >
          Claim
        </Button>
      </div>
        </Alert>
</Card.Body>
    </Card>
  );
}
