import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ItemInputs } from '../../types/appinterface';

const AddItem = () => {
  const { collId, itemId } = useParams();
  const navigate = useNavigate();

  const isEditing = Boolean(itemId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemInputs>();

  const handleFormSubmit: SubmitHandler<ItemInputs> = async values => {
    try {
      const fields = {
        ...values,
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

  return (
    <div className="container mb-5 mt-4">
      <h1 className="form">Add collection</h1>
      <Form className="addcoll" onSubmit={handleSubmit(handleFormSubmit)}>
        <Form.Group className="mt-3 mb-2">
          <Form.Control
            type="text"
            placeholder="Enter title"
            {...register('title', { required: true })}
            isInvalid={!!errors.title}
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group className="mt-2 mb-2">
          <Form.Control
            type="text"
            placeholder="Enter tags separated by spaces"
            {...register('tags', { required: true })}
            isInvalid={!!errors.tags}
            autoComplete="off"
          />
        </Form.Group>

        <Button
          variant="secondary"
          onClick={() => navigate(`/personal/${collId}`)}
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

export default AddItem;
