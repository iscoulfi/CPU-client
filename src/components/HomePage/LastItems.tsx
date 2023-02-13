import { useEffect, useState } from 'react';
import { ItemPreview } from '../../layouts/MainLayout';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from '../../utils/axios';

function LastItems() {
  const [items, setItems] = useState<ItemPreview[] | []>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/items');
        setItems(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div className="mt-4">
      <h1>Last items</h1>
      <ListGroup>
        {items.map(item => {
          return (
            <ListGroup.Item
              key={item._id}
              className="d-flex justify-content-between "
            >
              <div className="fw-bold">
                <Link to={`/personal/${item.coll}/${item._id}`}>
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
    </div>
  );
}

export default LastItems;
