import type { NextPage } from "next";
import styles from "../styles/App.module.scss";
import {
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { DROP_EDITION_ADDRESS } from "../const/contract";
import LoadingSection from "../components/utils/Loading";
import ConnectWallet from "../components/utils/Connect";
import SwitchNetwork from "../components/utils/Network";
import NavBar from "../components/utils/Navbar";
import CoverPage from "../components/Cover";
import MinerPage from "../components/MiningPage";
import MintContainer from "../components/MintContainer";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { contract: editionDrop } = useContract(
    DROP_EDITION_ADDRESS,
    "edition-drop"
  );

  const address = useAddress();
  const router = useRouter();

  const {
    data: ownedNfts,
    isLoading,
    isError,
  } = useOwnedNFTs(editionDrop, address);

  // 0. Wallet Connect - required to check if they own an NFT
  if (!address) {
    return (
      <div className={styles.container}>
	    <CoverPage />
        <ConnectWallet />
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSection />;
  }

  if (!ownedNfts || isError) {
    return <div className={styles.midcenter}>Error</div>;
  }

  if (ownedNfts.length === 0) {
    return (
      <div className={styles.container}>
	   <SwitchNetwork />
  <NavBar />
        <MintContainer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
	   <SwitchNetwork />
  <NavBar />
        <MinerPage />
    </div>
  );
};

export default Home;
