import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getCollectionItems } from '../../redux/slices/item/asyncActions';
import { useParams } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

type TableParams = {
  setCheckedItemId: Dispatch<SetStateAction<string>>;
};

const TableItems = ({ setCheckedItemId }: TableParams) => {
  const { collId } = useParams();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.item);
  const [activeCheckbox, setActiveCheckbox] = useState<null | number>(null);

  useEffect(() => {
    dispatch(getCollectionItems(collId as string));
  }, [dispatch, collId]);

  const activeItem = (ind: number, id: string) => {
    if (ind === activeCheckbox) {
      setActiveCheckbox(null);
      setCheckedItemId('');
    } else {
      setActiveCheckbox(ind);
      setCheckedItemId(id);
    }
  };

  return (
    <Table striped bordered hover responsive size="sm">
      <thead>
        <tr>
          <th>Action</th>
          <th>Id</th>
          <th>Name</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {items.map((el, ind) => (
          <tr key={el._id}>
            <td>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                checked={ind === activeCheckbox}
                onChange={() => {
                  activeItem(ind, el._id);
                }}
              />
            </td>
            <td>{el._id}</td>
            <td>{el.title}</td>
            <td>{el.tags.map(tag => `#${tag} `)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableItems;
