import { NFT } from "@thirdweb-dev/sdk";
import React from "react";
import Image from "next/image";
import styles from "../styles/Gameplay.module.css";

const GoldGem = (
  <div className={styles.slide}>
    <Image src="./gold-gem.png" height="48" width="48" alt="gold-gem" />
  </div>
);

type Props = {
  pickaxe: NFT | undefined;
};

export default function GameplayAnimation({ pickaxe }: Props) {
  if (!pickaxe) {
    return <footer className="blockquote-footer blockquote mb-0">
	Stake your card level to start mining..</footer>;
  }

  return (
    <div className={styles.slider}>
      <div className={styles.slideTrack}>
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
        {GoldGem}
      </div>
    </div>
  );
}
