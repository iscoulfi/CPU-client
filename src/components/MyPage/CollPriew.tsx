import { useAppDispatch } from '../../redux/store';
import { removeCollection } from '../../redux/slices/collection/asyncActions';
import { useNavigate } from 'react-router-dom';
import { CollectionData } from '../../redux/slices/collection/types';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface CollPreviewParams {
  collection: CollectionData;
  ind: number;
}

const CollPriew = ({ collection, ind }: CollPreviewParams) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { _id, title, topic, imgUrl, text } = collection;

  const deleteCollection = (id: string, url: string) => {
    dispatch(removeCollection({ id, url }));
  };

  return (
    <Accordion.Item eventKey={`${ind}`} key={_id}>
      <Accordion.Header>{`${title} | ${topic}`}</Accordion.Header>
      <Accordion.Body>
        <Container>
          <Row>
            <Col sm={6} md={5} lg={4} xl={3} className="picture">
              <div>
                <img
                  src={imgUrl ? imgUrl : './img/placeholder.jpg'}
                  className="rounded coll_img"
                  alt=""
                />
              </div>
            </Col>
            <Col>
              <div className="ms-4">
                <ReactMarkdown children={text} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="buttons">
              <div className="my-2 d-flex gap-2">
                <Button
                  variant="primary"
                  onClick={() => navigate(`/personal/${_id}/edit`)}
                >
                  {t('Edit')}
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/personal/${_id}`)}
                >
                  {t('To items')}
                </Button>
                <Button
                  variant="danger "
                  onClick={() => deleteCollection(_id, imgUrl)}
                >
                  {t('Delete')}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default CollPriew;
