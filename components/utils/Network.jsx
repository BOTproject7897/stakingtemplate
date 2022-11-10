import React, { useState } from 'react';
import {
  useNetwork,
  useNetworkMismatch,
  ChainId,
  useChainId
} from "@thirdweb-dev/react"
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiErrorWarningFill } from "react-icons/ri";
import { FaEthereum } from "react-icons/fa";
import { ChainIdname } from '../../const/aLinks';
import styles from "../../styles/App.module.scss";


export default function SwitchNetwork() {
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);

  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const networkName = ChainIdname();
  const Polygon = "/icons/poligon.png"

  return (
<>
{networkMismatch ? (
      <Modal show={showModal}
        centered
        backdrop="static"
        keyboard={false}>
        <Modal.Header style={{justifyContent: 'center'}}>
          <Modal.Title style={{color: '#cd0228',justifyContent: 'center'}} className={styles.flx_center}><RiErrorWarningFill/> Salah Jaringan</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center', color: '#000'}}>Silahkan ganti ke jaringan {networkName}.
        <br /><p />
    <Button onClick={() => switchNetwork(Number(process.env.NEXT_PUBLIC_CHAIN_ID))} className={styles.switchButton}>
      <FaEthereum size={24} /> {networkName}
    </Button>
    </Modal.Body>
      </Modal>) : (<></>)}
</>
    );
}
