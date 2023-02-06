import MyColl from '../components/MyPage/MyColl';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const MyPage = () => {
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
