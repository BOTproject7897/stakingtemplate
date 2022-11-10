import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Disconnect from './Disconnect';

const TxtTitle = 'Mumbai Testnet';

function Navigation() {
  return (
      <Navbar bg="white" variant="light" sticky="top">
        <Container>
          <Navbar.Brand href="#">{TxtTitle}</Navbar.Brand>
          <Disconnect/>
        </Container>
      </Navbar>
  );
}

export default Navigation;
