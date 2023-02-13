import { useAppDispatch } from '../../redux/store';
import { removeCollection } from '../../redux/slices/collection/asyncActions';
import { storage } from '../../assets/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Placeholder from 'react-bootstrap/Placeholder';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { CollectionData } from '../../redux/slices/collection/types';
import { removeItem } from '../../redux/slices/item/asyncActions';

interface CollPreviewParams {
  collection: CollectionData;
  ind: number;
}

const CollPriew = ({ collection, ind }: CollPreviewParams) => {
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
        <div className="d-flex">
          <div>
            {collection.imgUrl ? (
              <img
                src={collection.imgUrl}
                className="rounded coll_img"
                alt=""
              />
            ) : (
              <Placeholder
                style={{ width: '150px', height: '150px' }}
                className="rounded"
              />
            )}
          </div>
          <div className="ms-4">
            <ReactMarkdown children={collection.text} />
          </div>
        </div>
        <div className="my-2 gap-2 d-flex gap-2">
          <Button
            variant="primary"
            onClick={() => navigate(`/personal/${collection._id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate(`/personal/${collection._id}`)}
          >
            To items
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
            Delete
          </Button>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default CollPriew;
