import { useCallback, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { storage } from '../../assets/firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CollInputs } from '../../types/appinterface';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { createCollection } from '../../redux/slices/collection/asyncActions';
import { topicOptions } from '../../assets/options';
import SimpleMDE from 'react-simplemde-editor';
import MDE from 'easymde';
import 'easymde/dist/easymde.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Field from '../../components/MyPage/Field';
import MultiField from '../../components/MyPage/MultiField';

const fileTypes = ['JPG', 'PNG'];

export const options = {
  spellChecker: false,
  maxHeight: '140px',
  autofocus: true,
  placeholder: '...',
  status: false,
  toolbar: [
    'bold',
    'italic',
    '|',
    'unordered-list',
    'ordered-list',
    '|',
    'guide',
  ],
} as MDE.Options;

const AddColl = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [topic, setTopic] = useState('books');
  const [value, setValue] = useState(' ');
  const [currentFields, setCurrentFields] = useState(['number1', 'string1']);

  const handleChange = (file: File) => {
    setFile(file);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CollInputs>();

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  const handleFormSubmit: SubmitHandler<CollInputs> = async values => {
    const { title, ...additionals } = values;
    const map = new Map(Object.entries(additionals));
    const adFields = Array.from(map).filter(el =>
      currentFields.includes(el[0])
    );
    try {
      let imgUrl = '';
      if (file) {
        const storageRef = ref(storage, `files/${Math.random()}${file.name}`);
        const uploadImage = await uploadBytes(storageRef, file);
        imgUrl = await getDownloadURL(uploadImage.ref);
      }
      dispatch(
        createCollection({
          title,
          topic,
          text: value,
          imgUrl,
          adFields,
        })
      );
      navigate('/personal');
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <div className="container mb-5 mt-4">
      <h1 className="form">Add collection</h1>
      <Form className="addcoll" onSubmit={handleSubmit(handleFormSubmit)}>
        <FileUploader
          handleChange={handleChange}
          name="file"
          label="Upload image"
          types={fileTypes}
          classes="drop_area"
        />

        <Form.Group className="mt-3 mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            {...register('title', { required: true })}
            isInvalid={!!errors.title}
          />
        </Form.Group>

        <Field
          currentField={topic}
          setCurrentField={setTopic}
          options={topicOptions}
          label={'Topic'}
        />

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <SimpleMDE
            value={value}
            onChange={onChange}
            options={options}
            className="mb-2"
          />
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
          className="mb-3 "
        >
          Cancel
        </Button>
        <Button variant="primary" type="submit" className="mb-3 mx-2">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddColl;
