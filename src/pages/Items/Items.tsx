import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCollection } from '../../redux/slices/collection/asyncActions';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { removeItem } from '../../redux/slices/item/asyncActions';
import { checkIsAdmin } from '../../redux/slices/auth/slice';
import Button from 'react-bootstrap/Button';
import TableItems from '../../components/Items/TableItems';

const Items = () => {
  const { collId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAdmin = useAppSelector(checkIsAdmin);
  const [checkedItemId, setCheckedItemId] = useState('');
  const [activeCheckbox, setActiveCheckbox] = useState<null | number>(null);

  const { collection } = useAppSelector(state => state.collection);
  const { user } = useAppSelector(state => state.auth);

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
          <h1 className="mt-3 text-center">{`${collection.title} | ${collection.topic}`}</h1>
          {user?.collections.includes(collId as string) || isAdmin ? (
            <>
              <div className="text-center my-3">
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

              <div className=" d-flex gap-2 justify-content-center">
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
                  onClick={() =>
                    navigate(`/personal/${collId}/${checkedItemId}`)
                  }
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
            </>
          ) : (
            <div className="text-center">
              <Button
                variant="primary"
                disabled={!checkedItemId}
                onClick={() => navigate(`/personal/${collId}/${checkedItemId}`)}
              >
                To item
              </Button>
            </div>
          )}

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
