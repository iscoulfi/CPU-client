import { useEffect, useState } from 'react';
import { ItemPreview } from '../../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from '../../utils/axios';

function LastItems() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
      <div className="nameplate">
        <h1>{t('Last items')}</h1>
      </div>
      <ListGroup>
        {items.map(item => {
          return (
            <ListGroup.Item
              action
              key={item._id}
              className="d-flex justify-content-between"
              onClick={() => {
                navigate(`/personal/${item.coll}/${item._id}`);
              }}
            >
              <div className="fw-bold">{item.title}</div>

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
