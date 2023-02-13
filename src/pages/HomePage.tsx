import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LastItems from '../components/HomePage/LastItems';
import BigColls from '../components/HomePage/BigColls';
import TagsCloud from '../components/HomePage/TagsCloud';

const HomePage = () => {
  return (
    <Container className="home">
      <Row>
        <Col sm={{ span: 4, order: 'last' }}>
          <TagsCloud />
        </Col>
        <Col sm={8}>
          <LastItems />
          <BigColls />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
