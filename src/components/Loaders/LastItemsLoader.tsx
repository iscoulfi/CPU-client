import ListGroup from 'react-bootstrap/ListGroup';
import Placeholder from 'react-bootstrap/Placeholder';

const LastItemsLoader = () => {
  return (
    <>
      {[...new Array(7)].map((_, ind) => (
        <ListGroup.Item key={ind} className="d-flex justify-content-between">
          <Placeholder animation="glow">
            <Placeholder style={{ width: 80 }} bg="primary" />
          </Placeholder>
          <Placeholder animation="glow">
            <Placeholder style={{ width: 157 }} bg="secondary" />
          </Placeholder>
        </ListGroup.Item>
      ))}
    </>
  );
};

export default LastItemsLoader;
