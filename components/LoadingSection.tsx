import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import styles from "../styles/Home.module.css";

export default function LoadingSection() {
  return <Stack className="col-md-5 mx-auto">
      <Spinner animation="border" variant="warning" />
    </Stack>;
}
