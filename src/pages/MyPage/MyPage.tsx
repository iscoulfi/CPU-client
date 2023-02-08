import MyColl from '../../components/MyPage/MyColl';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { getMyCollections } from '../../redux/slices/collection/asyncActions';

const MyPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMyCollections());
  }, [dispatch]);

  return (
    <div>
      <div className="text-center">
        <Link to="/personal/addcoll">
          <Button variant="outline-primary" type="submit" className="my-3">
            Add New Collection
          </Button>
        </Link>
      </div>

      <MyColl />
    </div>
  );
};

export default MyPage;
