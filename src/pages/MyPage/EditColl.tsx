import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { storage } from '../../assets/firebase';
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';
import { useForm, SubmitHandler } from 'react-hook-form';
import { StandardCollFields } from '../../types/appinterface';
import { useAppDispatch } from '../../redux/store';
import { updateCollection } from '../../redux/slices/collection/asyncActions';
import { CollectionData } from '../../redux/slices/collection/types';
import SimpleMDE from 'react-simplemde-editor';
import MDE from 'easymde';
import 'easymde/dist/easymde.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const fileTypes = ['JPG', 'PNG'];

interface Show {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  collection: CollectionData;
}

const EditColl = ({ show, setShow, collection }: Show) => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState('');
  const { register, handleSubmit, reset } = useForm<StandardCollFields>();

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  const options = useMemo(() => {
    return {
      spellChecker: false,
      maxHeight: '140px',
      autofocus: true,
      placeholder: 'Change description... (optional)',
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
  }, []);

  const resetStates = () => {
    reset({ title: '' });
    setFile(null);
    setValue('');
  };

  const handleClose = () => {
    setShow(false);
    resetStates();
  };

  const handleChange = (file: File) => {
    setFile(file);
  };

  const changeImage = async () => {
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

  const handleFormSubmit: SubmitHandler<StandardCollFields> = async ({
    title,
  }) => {
    try {
      resetStates();
      const imgUrl = await changeImage();
      dispatch(
        updateCollection({
          title: title ? title : collection.title,
          text: value ? value : collection.text,
          imgUrl: imgUrl ? imgUrl : collection.imgUrl,
          id: collection._id,
        })
      );
      handleClose();
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit collection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container mb-4 mt-4">
          <Form className="addcoll">
            <FileUploader
              handleChange={handleChange}
              name="file"
              label="Change image (optional)"
              types={fileTypes}
              classes="drop_area"
            />

            <Form.Group className="my-3">
              <Form.Control
                type="text"
                placeholder="Change title (optional)"
                {...register('title')}
              />
            </Form.Group>
            <SimpleMDE value={value} onChange={onChange} options={options} />
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit(handleFormSubmit)}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditColl;
