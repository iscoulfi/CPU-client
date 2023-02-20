import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import { ItemInputs } from '../../types/appinterface';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import SimpleMDE from 'react-simplemde-editor';
import { options } from '../MyPage/AddColl';
import 'easymde/dist/easymde.min.css';
import { useCallback, useEffect, useState } from 'react';
import { getCollection } from '../../redux/slices/collection/asyncActions';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddItem = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { collId, itemId } = useParams();
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');

  const { collection } = useAppSelector(state => state.collection);

  const isEditing = Boolean(itemId);
  //try to fix
  const onChange1 = useCallback((value: string) => {
    setText1(value);
  }, []);
  const onChange2 = useCallback((value: string) => {
    setText2(value);
  }, []);
  const onChange3 = useCallback((value: string) => {
    setText3(value);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemInputs>();

  useEffect(() => {
    if (itemId) {
      (async () => {
        try {
          const { data } = await axios.get(`/items/${itemId}`);
          setText1(data.text1);
          setText2(data.text2);
          setText3(data.text3);
          reset({
            title: data.title,
            tags: data.tags.join(' '),
            number1: data.number1,
            number2: data.number2,
            number3: data.number3,
            string1: data.string1,
            string2: data.string2,
            string3: data.string3,
            date1: data.date1,
            date2: data.date2,
            date3: data.date3,
            checkbox1: data.checkbox1,
            checkbox2: data.checkbox2,
            checkbox3: data.checkbox3,
          });
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [reset, itemId]);

  const handleFormSubmit: SubmitHandler<ItemInputs> = async values => {
    try {
      const fields = {
        ...values,
        text1,
        text2,
        text3,
      };

      const { data } = isEditing
        ? await axios.put(`/items/${itemId}`, fields)
        : await axios.post(`/items/${collId}`, fields);

      const _id = isEditing ? itemId : data._id;

      navigate(`/personal/${collId}/${_id}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(getCollection(collId as string));
  }, [dispatch, collId]);

  return (
    <div className="container mb-5 mt-4 coll-items">
      <h1 className="form">{isEditing ? t('Edit item') : t('Add item')}</h1>
      <Form className="additem" onSubmit={handleSubmit(handleFormSubmit)}>
        <Form.Group className="mt-3 mb-2">
          <Form.Label>{t('Title')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('Enter title') as string}
            {...register('title', { required: true })}
            isInvalid={!!errors.title}
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group className="mt-2 mb-2">
          <Form.Label>{t('Tags')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('Enter tags separated by spaces') as string}
            {...register('tags', { required: true })}
            isInvalid={!!errors.tags}
            autoComplete="off"
          />
        </Form.Group>

        {collection?.adFields
          .filter(
            el =>
              !el[0].replace(/\d/g, '').includes('text') &&
              !el[0].replace(/\d/g, '').includes('checkbox')
          )
          .map(el => (
            <Form.Group className="mb-3" controlId="formBasicEmail" key={el[0]}>
              <Form.Label>{el[1]}</Form.Label>
              <Form.Control
                placeholder={el[1]}
                type={el[0].replace(/\d/g, '')}
                autoComplete="off"
                {...register(el[0])}
              />
            </Form.Group>
          ))}

        {collection?.adFields
          .filter(el => el[0].replace(/\d/g, '').includes('checkbox'))
          .map(el => (
            <Form.Group className="mb-3" controlId="formBasicEmail" key={el[0]}>
              <Form.Check type="checkbox" label={el[1]} {...register(el[0])} />
            </Form.Group>
          ))}

        {collection?.adFields
          .filter(el => el[0].replace(/\d/g, '').includes('text'))
          .map(el => (
            <Form.Group key={el[0]}>
              <Form.Label>{el[1]}</Form.Label>
              <SimpleMDE
                value={
                  el[0] === 'text1' ? text1 : el[0] === 'text2' ? text2 : text3
                }
                onChange={
                  el[0] === 'text1'
                    ? onChange1
                    : el[0] === 'text2'
                    ? onChange2
                    : onChange3
                }
                options={options}
              />
            </Form.Group>
          ))}

        <Button
          variant="secondary"
          onClick={() => navigate(`/personal/${collId}`)}
          className="my-3"
        >
          {t('Cancel')}
        </Button>
        <Button variant="primary" type="submit" className="my-3 mx-2">
          {t('Submit')}
        </Button>
      </Form>
    </div>
  );
};

export default AddItem;
