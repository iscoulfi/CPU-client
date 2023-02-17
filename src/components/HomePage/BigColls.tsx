import { useEffect, useState } from 'react';
import { CollectionData } from '../../redux/slices/collection/types';
import { useNavigate } from 'react-router';
import axios from '../../utils/axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const BigColls = () => {
  const navigate = useNavigate();
  const [colls, setColls] = useState<CollectionData[] | []>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/collections');
        setColls(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div className="mt-4">
      <h1>The biggest collections</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {colls.map(coll => {
          return (
            <Card
              style={{ width: '20rem' }}
              key={coll._id}
              className="mb-4 ms-md-4"
            >
              <Card.Img
                variant="top"
                src={coll.imgUrl ? coll.imgUrl : './img/placeholder.jpg'}
                className="card_img"
              />
              <Card.Body>
                <Card.Title className="fw-bold">{`${coll.title} | ${coll.topic}`}</Card.Title>
                <Card.Text>{coll.text}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/personal/${coll._id}`)}
                >
                  To collection
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BigColls;
