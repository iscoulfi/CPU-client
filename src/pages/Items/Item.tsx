import axios from '../../utils/axios';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCollection } from '../../redux/slices/collection/asyncActions';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import ReactMarkdown from 'react-markdown';
import { getItem } from '../../redux/slices/item/asyncActions';
import { setItem } from '../../redux/slices/item/slice';
import { getItemComments } from '../../redux/slices/comment/asyncActions';
import { useTranslation } from 'react-i18next';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Comments from '../../components/Items/Comments';

const Item = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { collId, itemId } = useParams();
  const { collection } = useAppSelector(state => state.collection);
  const { item } = useAppSelector(state => state.item);
  const { user } = useAppSelector(state => state.auth);
  const { socket } = useAppSelector(state => state.socket);
  const isLiked = Boolean(item.likes[user?._id as string]);
  const likeCounter = Object.keys(item.likes).length;

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', itemId);
    }
  }, [socket, itemId]);

  useEffect(() => {
    dispatch(getCollection(collId as string));
    dispatch(getItem(itemId as string));
  }, [dispatch, collId, itemId]);

  const setLike = async () => {
    if (!user) return;
    try {
      const { data } = await axios.patch(`/items/${itemId}/like`);
      dispatch(setItem(data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('refresh-comments', (id: string) => {
        dispatch(getItemComments(id));
      });
      return () => socket.off('refresh-comments');
    }
  }, [socket, dispatch, itemId]);

  return (
    <div className="coll-items">
      <div className="item_preview shadow">
        <div className="p-3">
          <h1>{item.title}</h1>
          <p>{item.tags.map(tag => `#${tag} `)}</p>
          <div className="likes d-flex gap-1 mb-2">
            <div onClick={setLike} className="like">
              {isLiked ? <FcLike /> : <FcLikePlaceholder />}
            </div>
            <p>{likeCounter}</p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate(`/personal/${collId}`)}
            size="sm"
          >
            {t('To collection')}
          </Button>
        </div>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{t('Additional Info')}</Accordion.Header>
            <Accordion.Body>
              {collection?.adFields
                .filter(el => !el[0].includes('text'))
                .map(el => (
                  <div key={el[0]}>
                    <span className="fw-bold">{el[1]}: </span>
                    {item[el[0]]}
                  </div>
                ))}
              {collection?.adFields
                .filter(el => el[0].includes('text'))
                .map(el => (
                  <div key={el[0]}>
                    <p className="fw-bold m-0">{el[1]}</p>
                    <ReactMarkdown children={item[el[0]] as string} />
                  </div>
                ))}
              {collection?.adFields.length === 0 && (
                <p>{t('Unfortunately there is nothing here...')}</p>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      <Comments />
    </div>
  );
};

export default Item;
