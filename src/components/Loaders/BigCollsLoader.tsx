import Placeholder from 'react-bootstrap/Placeholder';
import Card from 'react-bootstrap/Card';

const BigCollsLoader = () => {
  return (
    <>
      {[...new Array(4)].map((_, ind) => (
        <Card style={{ width: '20rem' }} className="mb-4 mx-md-3" key={ind}>
          <Card.Img
            variant="top"
            src="./img/placeholder.jpg"
            className="card_img"
          />
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} />
              <Placeholder xs={4} /> <Placeholder xs={6} />
              <Placeholder xs={8} />
            </Placeholder>
            <Placeholder.Button variant="primary" xs={5} />
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default BigCollsLoader;
