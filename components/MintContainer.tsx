import React from "react";
import Image from 'next/image';
import {
  useAddress,
  useClaimNFT,
  useContract
} from "@thirdweb-dev/react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { explorerUrl } from '../const/aLinks';
import { DROP_EDITION_ADDRESS } from "../const/contract";
import styles from "../styles/App.module.scss";

export default function MintContainer() {
  const { contract: editionDrop } = useContract(
    DROP_EDITION_ADDRESS,
    "edition-drop"
  );
  const { mutate: claim, isLoading } = useClaimNFT(editionDrop);
  const address = useAddress();

const MemberCard = '/testnet.gif'
const Claim = 'Claim 0.01 MATIC'
const Minting = 'Approving...'
  
  async function mint() {
    try {
      claim(
        {
            quantity: 1,
            to: address as string,
            tokenId: 1,
          },
        {
          onSuccess: (data) => {
            Swal.fire({
              title: 'Success!',
              text: 'Member Card berhasil diclaim..',
              icon: 'success',
              confirmButtonText: 'Cool',
			  footer: '<a href="https://testnets.opensea.io/assets/mumbai/0x265a9970dbf96f33f4f20387946ea7b914c30d11/1" target="_blank">Check item at opensea.</a>'
              });
          },
          onError: (error) => {
            const e = error;
            Swal.fire({
              title: 'Error!',
              text: 'Claim Member Card Gagal..',
              icon: 'error',
              confirmButtonText: 'Blah',
			  footer: '<a href="https://mumbaifaucet.com/" target="_blank">You Need Mumbai?</a>'
              });
          },
        }
      );
    } catch (error) {
            Swal.fire({
              title: 'Error!',
              text: 'Do you want to continue',
              icon: 'error',
              confirmButtonText: 'Blah'
              });
        }
  }
  
  return (
    <>
<div className={styles.midcenter}>
      <h1>ORIDA member</h1>

      <p>Claim your Card Member to Enter</p>

      <Card className={`${styles.nftBox} ${styles.spacerBottom}`}>
        <Image src={MemberCard} height="400" width="280" alt="enter" />

      <div className={styles.smallMargin}>
        {isLoading ? (
      <Button className={styles.btn_absBottom} disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span> {Minting}</span>
      </Button>
    ) : (
      <Button className={styles.btn_absBottom}
        onClick={() =>
          mint()
        }

      >{Claim}</Button>
 )}
      </div>
      </Card>
</div>
    </>
  );
}
