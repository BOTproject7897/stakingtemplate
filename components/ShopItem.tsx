import {
  ThirdwebNftMedia,
  useActiveClaimCondition,
  Web3Button,
} from "@thirdweb-dev/react";
import { EditionDrop, NFT } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Swal from 'sweetalert2';
import { INITIAL_EDITION_ADDRESS } from "../const/contract";
import styles from "../styles/App.module.scss";

type Props = {
  pickaxeContract: EditionDrop;
  item: NFT;
};
  const Symbol = '$ORD';

export default function ShopItem({ item, pickaxeContract }: Props) {
  const { data: claimCondition } = useActiveClaimCondition(
    pickaxeContract,
    item.metadata.id
  );

  return (
    <Card className={styles.nftBox} key={item.metadata.id.toString()}>
      <ThirdwebNftMedia
        metadata={item.metadata}
        className={`${styles.nftMedia}`}
        height={"64"}
      />
      <Card.Body>
        <Card.Title>{item.metadata.name}</Card.Title>
        <Card.Text className="mb-2 text-muted">{item.metadata.description}</Card.Text>
      <ListGroup variant="flush">
        <ListGroup.Item>
        Price:{" "}
        <b>
          {claimCondition && ethers.utils.formatUnits(claimCondition?.price)}{" "}
          {Symbol}
        </b></ListGroup.Item>
      </ListGroup>

      <div className={styles.smallMargin}>
        <Web3Button 
		  colorMode="dark"
		  accentColor="#0d6efd"
          contractAddress={INITIAL_EDITION_ADDRESS}
          action={(contract) => contract.erc1155.claim(item.metadata.id, 1)}
          onSuccess={() => {
            Swal.fire({
              title: 'Success!',
              text: 'Pembelian Level Card berhasil, Silahkan Staking..',
              icon: 'success',
              confirmButtonText: 'Cool'
              });
          }
		 }
          onError={(error) => {
            const e = error;
            Swal.fire({
              title: 'Error!',
              text: 'Pembelian Level Card Gagal..',
              icon: 'error',
              confirmButtonText: 'Blah',
			  footer: '<a href="https://mumbaifaucet.com/" target="_blank">Beli token ORD di UNISWAP?</a>'
              });
          }
		 }
        >
          Beli
        </Web3Button>
      </div>
      </Card.Body>
    </Card>
  );
}
