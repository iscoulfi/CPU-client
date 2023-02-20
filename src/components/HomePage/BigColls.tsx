import { useEffect, useState } from 'react';
import { CollectionData } from '../../redux/slices/collection/types';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import axios from '../../utils/axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const BigColls = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
      <div className="nameplate">
        <h1>{t('The biggest collections')}</h1>
      </div>
      <div className="cards pt-4">
        <div className="d-flex flex-wrap justify-content-center">
          {colls.map(coll => {
            return (
              <Card
                style={{ width: '20rem' }}
                key={coll._id}
                className="mb-4 mx-md-3"
              >
                <Card.Img
                  variant="top"
                  src={coll.imgUrl ? coll.imgUrl : './img/placeholder.jpg'}
                  className="card_img"
                />
                <Card.Body>
                  <Card.Title className="fw-bold">{`${coll.title} | ${coll.topic}`}</Card.Title>
                  <div className="card-text">
                    {<ReactMarkdown children={coll.text} />}
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/personal/${coll._id}`)}
                  >
                    {t('To collection')}
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BigColls;
