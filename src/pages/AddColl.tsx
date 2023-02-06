import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { storage } from '../assets/firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AdditionalFields, CollInputs } from '../types/appinterface';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Field from '../components/MyPage/Field';
import MultiField from '../components/MyPage/MultiField';
import { createCollection } from '../redux/slices/collection/asyncActions';

const fileTypes = ['JPG', 'PNG'];

const Upload = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [topic, setTopic] = useState('books');
  const [currentFields, setCurrentFields] = useState(['num1', 'string1']);

  const handleChange = (file: File) => {
    setFile(file);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const handleFormSubmit: SubmitHandler<CollInputs> = async values => {
    const { title, description, ...adFields } = values;

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
          description,
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
    <div className="container message mb-5 mt-4">
      <Form className="addcoll" onSubmit={handleSubmit(handleFormSubmit)}>
        <FileUploader
          handleChange={handleChange}
          name="file"
          label="Upload image"
          types={fileTypes}
          classes="drop_area"
        />

        <Form.Group className="my-3">
          <Form.Control
            type="text"
            placeholder="Enter title"
            {...register('title', { required: true })}
            isInvalid={!!errors.title}
          />
        </Form.Group>

        <Field currentField={topic} setCurrentField={setTopic} />

        <FloatingLabel
          className="mb-3"
          controlId="floatingTextarea2"
          label="Description"
        >
          <Form.Control
            as="textarea"
            placeholder="Description"
            style={{ height: '100px' }}
            {...register('description', { required: true })}
            isInvalid={!!errors.description}
          />
        </FloatingLabel>

        <MultiField
          currentFields={currentFields}
          setCurrentFields={setCurrentFields}
        />

        {currentFields.map(f => (
          <Form.Group className="mb-3" key={f}>
            <Form.Control
              type="text"
              placeholder={`Enter ${f.replace(/\d/g, '')} field name`}
              {...register(f, { required: true })}
              isInvalid={!!errors[f]}
              autoComplete="off"
            />
          </Form.Group>
        ))}

        <Button variant="secondary" type="submit" className="mb-3">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Upload;
