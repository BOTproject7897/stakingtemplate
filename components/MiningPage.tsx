import {
  ConnectWallet,
  useAddress,
  useContract,
  useMetamask,
} from "@thirdweb-dev/react";
import React from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CurrentGear from "../components/CurrentGear";
import LoadingSection from "../components/LoadingSection";
import OwnedGear from "../components/OwnedGear";
import Rewards from "../components/Rewards";
import Shop from "../components/Shop";
import {
  DROP_EDITION_ADDRESS,
  INITIAL_TOKEN_ADDRESS,
  MINING_CONTRACT_ADDRESS,
  INITIAL_EDITION_ADDRESS,
} from "../const/contract";
import styles from "../styles/App.module.scss";

export default function Play() {
  const address = useAddress();

  const { contract: miningContract } = useContract(MINING_CONTRACT_ADDRESS);
  const { contract: characterContract } = useContract(
    DROP_EDITION_ADDRESS,
    "edition-drop"
  );
  const { contract: pickaxeContract } = useContract(
    INITIAL_EDITION_ADDRESS,
    "edition-drop"
  );
  const { contract: tokenContract } = useContract(INITIAL_TOKEN_ADDRESS, "token");

  if (!address) {
    return (
      <div className={styles.container}>
        <ConnectWallet colorMode="dark" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {miningContract &&
      characterContract &&
      tokenContract &&
      pickaxeContract ? (
    <Container>
      <Row>
        <Col>
          <CurrentGear
            miningContract={miningContract}
            characterContract={characterContract}
            pickaxeContract={pickaxeContract}
          />
		</Col>
        <Col>
          <Rewards
            miningContract={miningContract}
            tokenContract={tokenContract}
          />
		  </Col>
      </Row>
    </Container>
      ) : (
          <>
		  
          </>
      )}


      {pickaxeContract && miningContract ? (
        <>
          <Container>
    <Card style={{
		  marginBottom: "20px"
		  }}>
      <Card.Header>
          <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>
            Your Card
          </h2>
		  </Card.Header>
      <Card.Body>
            <OwnedGear
              pickaxeContract={pickaxeContract}
              miningContract={miningContract}
            />
      </Card.Body>
    </Card>
          </Container>
        </>
      ) : (
          <>
		  
          </>
      )}


      {pickaxeContract && tokenContract ? (
        <>
          <Container>
    <Card>
      <Card.Header>
          <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>Shop</h2>
		  </Card.Header>
      <Card.Body>
            <Shop pickaxeContract={pickaxeContract} />
      </Card.Body>
    </Card>
          </Container>
        </>
      ) : (
          <>
		  
          </>
      )}
    </div>
  );
}
