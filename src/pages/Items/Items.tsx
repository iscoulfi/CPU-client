import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCollection } from '../../redux/slices/collection/asyncActions';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Button from 'react-bootstrap/Button';
import TableItems from '../../components/Items/TableItems';
import { removeItem } from '../../redux/slices/item/asyncActions';

const Items = () => {
  const { collId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [checkedItemId, setCheckedItemId] = useState('');
  const [activeCheckbox, setActiveCheckbox] = useState<null | number>(null);

  const { collection } = useAppSelector(state => state.collection);

  useEffect(() => {
    dispatch(getCollection(collId as string));
  }, [dispatch, collId]);

  const deleteItem = (itemId: string) => {
    if (collId) {
      dispatch(removeItem({ itemId, collId }));
      setActiveCheckbox(null);
      setCheckedItemId('');
    }
  };

  return (
    <div>
      {collection ? (
        <div className="items">
          <div className="text-center my-3">
            <h1>{`${collection.title} | ${collection.topic}`}</h1>
            <Button
              variant="outline-primary"
              className=" mx-2"
              onClick={() => navigate(`/personal`)}
            >
              To collections
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => navigate(`/personal/${collId}/addItem`)}
            >
              Add New Item
            </Button>
          </div>

          <div className="mb-3 d-flex gap-2 justify-content-center">
            <Button
              variant="primary"
              disabled={!checkedItemId}
              onClick={() =>
                navigate(`/personal/${collId}/${checkedItemId}/edit`)
              }
            >
              Edit
            </Button>

            <Button
              variant="primary"
              disabled={!checkedItemId}
              onClick={() => navigate(`/personal/${collId}/${checkedItemId}`)}
            >
              To item
            </Button>

            <Button
              variant="danger "
              disabled={!checkedItemId}
              onClick={() => deleteItem(checkedItemId)}
            >
              Delete
            </Button>
          </div>

          <TableItems
            setCheckedItemId={setCheckedItemId}
            activeCheckbox={activeCheckbox}
            setActiveCheckbox={setActiveCheckbox}
          />
        </div>
      ) : (
        <span>loading...</span>
      )}
    </div>
  );
};

export default Items;
