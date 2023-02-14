import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { useOutletProps } from '../hooks/useOutletProps';

const SearchItem = () => {
  const { items } = useOutletProps();

  return (
    <Container style={{ maxWidth: '800px' }}>
      <ListGroup variant="flush" as="ol">
        {items.map(item => {
          return (
            <ListGroup.Item key={item._id}>
              <div className="fw-bold h3">
                <Link
                  to={`/personal/${item.coll}/${item._id}`}
                  style={{ textDecoration: 'none' }}
                >
                  {item.title}
                </Link>
              </div>
              <div>
                <span className="text-secondary">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
};

export default SearchItem;
