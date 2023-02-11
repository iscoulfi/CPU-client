import { useCallback, useEffect, useMemo, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { storage } from '../../assets/firebase';
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CollInputs } from '../../types/appinterface';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  getCollection,
  updateCollection,
} from '../../redux/slices/collection/asyncActions';
import { useNavigate, useParams } from 'react-router';

import MultiField from '../../components/MyPage/MultiField';
import SimpleMDE from 'react-simplemde-editor';
import { options } from './AddColl';
import 'easymde/dist/easymde.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const fileTypes = ['JPG', 'PNG'];

const EditColl = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { collection } = useAppSelector(state => state.collection);
  const [file, setFile] = useState<File | null>(null);
  const [value, setFValue] = useState('');
  const [currentFields, setCurrentFields] = useState<[] | string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CollInputs>();

  useEffect(() => {
    if (collection) {
      reset({
        title: collection.title,
        ...Object.fromEntries(collection.adFields),
      });
    }
  }, [collection, reset]);

  useEffect(() => {
    dispatch(getCollection(params.collId as string));
  }, [dispatch, params.collId]);

  const onChange = useCallback((value: string) => {
    setFValue(value);
  }, []);

  useMemo(() => {
    if (collection) {
      setFValue(collection.text);
      setCurrentFields(collection.adFields.map(el => el[0]));
    }
  }, [collection]);

  const handleChange = (file: File) => {
    setFile(file);
  };

  const changeImage = async () => {
    if (collection)
      if (file && collection.imgUrl !== '') {
        let fileRef = ref(storage, collection.imgUrl);
        deleteObject(fileRef);
      }
    if (file) {
      const storageRef = ref(storage, `files/${Math.random()}${file.name}`);
      const uploadImage = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(uploadImage.ref);
      return url;
    }
  };

  const handleFormSubmit: SubmitHandler<CollInputs> = async values => {
    const { title, ...additionals } = values;
    const map = new Map(Object.entries(additionals));
    const adFields = Array.from(map).filter(el =>
      (currentFields as string[]).includes(el[0])
    );
    try {
      const imgUrl = await changeImage();
      if (collection)
        dispatch(
          updateCollection({
            title: title ? title : collection.title,
            text: value ? value : collection.text,
            imgUrl: imgUrl ? imgUrl : collection.imgUrl,
            adFields,
            id: collection._id,
          })
        );
      navigate('/personal');
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <div className="container mb-4 mt-4">
      <h1 className="form">Edit collection</h1>
      <Form className="addcoll">
        <FileUploader
          handleChange={handleChange}
          name="file"
          label="Change image (optional)"
          types={fileTypes}
          classes="drop_area"
        />
        <Form.Group className="my-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Change title (optional)"
            {...register('title')}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <SimpleMDE value={value} onChange={onChange} options={options} />
        </Form.Group>

        <MultiField
          currentFields={currentFields}
          setCurrentFields={setCurrentFields}
        />

        {currentFields.map(f => (
          <Form.Group className="mb-3" key={f}>
            <Form.Label>{f.replace(/\d/g, '')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={`Enter ${f.replace(/\d/g, '')} field name`}
              {...register(f, { required: true })}
              isInvalid={!!errors[f]}
              autoComplete="off"
            />
          </Form.Group>
        ))}

        <Button
          variant="secondary"
          onClick={() => navigate('/personal')}
          className="my-3 "
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit(handleFormSubmit)}
          className="my-3 mx-2"
        >
          Save changes
        </Button>
      </Form>
    </div>
  );
};

export default EditColl;
