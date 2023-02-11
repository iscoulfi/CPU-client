import axios from '../../utils/axios';
import { useAppSelector } from '../../redux/store';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ItemData } from '../../redux/slices/item/types';
import Button from 'react-bootstrap/Button';

const Item = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<null | ItemData>(null);
  const { collId, itemId } = useParams();
  const { collection } = useAppSelector(state => state.collection);

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
          <h1>{data.title}</h1>
          <p>{data.tags.map(tag => `#${tag} `)}</p>
          {collection?.adFields.map(el => (
            <p key={el[0]}>
              {el[1]} = {data[el[0]]}
            </p>
          ))}
          <Button
            variant="primary"
            onClick={() => navigate(`/personal/${collId}`)}
          >
            To items
          </Button>
        </>
      ) : (
        <h1>...</h1>
      )}
    </>
  );
};

export default Item;
