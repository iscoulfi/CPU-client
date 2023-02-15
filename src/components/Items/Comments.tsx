import { useForm } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import {
  createComment,
  getItemComments,
} from '../../redux/slices/comment/asyncActions';
import { CommentData } from '../../redux/slices/comment/types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

type Comment = {
  comment: string;
};

function Comments() {
  const socket = io(process.env.REACT_APP_SERVER as string);

  const dispatch = useAppDispatch();
  const { itemId } = useParams();
  const { comments } = useAppSelector(state => state.comment);
  const { user } = useAppSelector(state => state.auth);

  const sendComment = ({ comment }: Comment) => {
    try {
      if (itemId && user)
        dispatch(createComment({ itemId, comment, author: user.username }));
      socket.emit('refresh', itemId);
      reset({ comment: '' });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getItemComments(itemId as string));
  }, [itemId, dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Comment>();

  return (
    <>
      <div className="comment_form mt-2 shadow">
        <Form onSubmit={handleSubmit(sendComment)}>
          <FloatingLabel controlId="floatingTextarea2" label="Comment">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
              {...register('comment', { required: true })}
              isInvalid={!!errors.comment}
            />
          </FloatingLabel>
          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={() => reset({ comment: '' })}
              size="sm"
              className="mt-2 text-end"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              size="sm"
              className="mt-2 mx-2"
            >
              Send
            </Button>
          </div>
        </Form>
      </div>
      {comments.map((c: CommentData) => (
        <div className="comment_card mt-3 shadow" key={c._id}>
          <span className="fw-bold">
            {c.author} | {new Date(c.createdAt).toLocaleString()}
          </span>
          <p>{c.comment}</p>
        </div>
      ))}
    </>
  );
}

export default Comments;
