import { useAppSelector, useAppDispatch } from '../../redux/store';
import { Link } from 'react-router-dom';
import { removeCollection } from '../../redux/slices/collection/asyncActions';
import { storage } from '../../assets/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import Placeholder from 'react-bootstrap/Placeholder';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import EditColl from '../../pages/MyPage/EditColl';

function MyColl() {
  const { collections } = useAppSelector(state => state.collection);
  const dispatch = useAppDispatch();
  const [coll, setColl] = useState(collections[0]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const deleteCollection = (id: string, url: string) => {
    if (url) {
      let fileRef = ref(storage, url);
      deleteObject(fileRef);
    }
    dispatch(removeCollection(id));
  };

  return (
    <Accordion>
      {collections.map((collection, ind) => (
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
                onClick={() => {
                  setColl(collection);
                  handleShow();
                }}
              >
                Edit
              </Button>

              <Link to="/personal/items">
                <Button variant="primary">To items</Button>
              </Link>
              <Button
                variant="danger "
                onClick={() =>
                  deleteCollection(collection._id, collection.imgUrl)
                }
              >
                Delete
              </Button>
            </div>
          </Accordion.Body>
          <EditColl show={show} setShow={setShow} collection={coll} />
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default MyColl;
