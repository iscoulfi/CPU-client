import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import { getCollection } from '../../redux/slices/collection/asyncActions';
import { removeItem } from '../../redux/slices/item/asyncActions';
import { checkIsAdmin } from '../../redux/slices/auth/slice';
import Button from 'react-bootstrap/Button';
import TableItems from '../../components/Items/TableItems';
import ClipLoader from 'react-spinners/ClipLoader';

const Items = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { collId } = useParams();
  const isAdmin = useAppSelector(checkIsAdmin);
  const [checkedItemId, setCheckedItemId] = useState('');
  const [activeCheckbox, setActiveCheckbox] = useState<null | number>(null);

  const { collection, status } = useAppSelector(state => state.collection);
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
    <div className="coll-items">
      {status !== 'loading' && collection ? (
        <div className="items">
          <h1 className="mt-3 text-center">{`${collection.title} | ${collection.topic}`}</h1>
          {user?._id === collection.author || isAdmin ? (
            <>
              <div className="text-center my-3">
                <Button
                  variant="outline-primary"
                  onClick={() => navigate(`/personal/${collId}/addItem`)}
                >
                  {t('Add New Item')}
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
                  {t('Edit')}
                </Button>

                <Button
                  variant="primary"
                  disabled={!checkedItemId}
                  onClick={() =>
                    navigate(`/personal/${collId}/${checkedItemId}`)
                  }
                >
                  {t('To item')}
                </Button>

                <Button
                  variant="danger "
                  disabled={!checkedItemId}
                  onClick={() => deleteItem(checkedItemId)}
                >
                  {t('Delete')}
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
                {t('To item')}
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
        <div className="text-center pt-5">
          <ClipLoader color="#428bff" className="loader" />
        </div>
      )}
    </div>
  );
};

export default Items;
