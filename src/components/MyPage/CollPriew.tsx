import { useAppDispatch } from '../../redux/store';
import { removeCollection } from '../../redux/slices/collection/asyncActions';
import { storage } from '../../assets/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { CollectionData } from '../../redux/slices/collection/types';
import { removeItem } from '../../redux/slices/item/asyncActions';
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

  const deleteCollection = (id: string, url: string, items: string[]) => {
    if (url) {
      let fileRef = ref(storage, url);
      deleteObject(fileRef);
    }
    items.forEach(i => dispatch(removeItem({ itemId: i, collId: id })));
    dispatch(removeCollection(id));
  };

  return (
    <Accordion.Item eventKey={`${ind}`} key={collection._id}>
      <Accordion.Header>{`${collection.title} | ${collection.topic}`}</Accordion.Header>
      <Accordion.Body>
        <Container>
          <Row>
            <Col sm={6} md={5} lg={4} xl={3} className="picture">
              <div>
                <img
                  src={
                    collection.imgUrl
                      ? collection.imgUrl
                      : './img/placeholder.jpg'
                  }
                  className="rounded coll_img"
                  alt=""
                />
              </div>
            </Col>
            <Col>
              <div className="ms-4">
                <ReactMarkdown children={collection.text} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="buttons">
              <div className="my-2 d-flex gap-2">
                <Button
                  variant="primary"
                  onClick={() => navigate(`/personal/${collection._id}/edit`)}
                >
                  {t('Edit')}
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/personal/${collection._id}`)}
                >
                  {t('To items')}
                </Button>
                <Button
                  variant="danger "
                  onClick={() =>
                    deleteCollection(
                      collection._id,
                      collection.imgUrl,
                      collection.items
                    )
                  }
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
