import axios from '../../utils/axios';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ItemData } from '../../redux/slices/item/types';
const Item = () => {
  const [data, setData] = useState<null | ItemData>(null);
  const { collId, itemId } = useParams();

  useEffect(() => {
    axios
      .get(`/items/${itemId}`)
      .then(res => {
        setData(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [itemId]);

  return (
    <>
      {data ? (
        <>
          <h1>{data.title}</h1>{' '}
          <Link to={`/personal/${collId}`}>
            <Button variant="primary">To items</Button>
          </Link>
        </>
      ) : (
        <h1>...</h1>
      )}
    </>
  );
};

export default Item;
