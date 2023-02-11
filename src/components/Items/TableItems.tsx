import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getCollectionItems } from '../../redux/slices/item/asyncActions';
import { useParams } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

type TableParams = {
  setCheckedItemId: Dispatch<SetStateAction<string>>;
  activeCheckbox: number | null;
  setActiveCheckbox: Dispatch<SetStateAction<number | null>>;
};

const TableItems = ({
  setCheckedItemId,
  activeCheckbox,
  setActiveCheckbox,
}: TableParams) => {
  const { collId } = useParams();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.item);
  const { collection } = useAppSelector(state => state.collection);

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
          {collection?.adFields.map(el => (
            <th key={el[0]}>{el[1]}</th>
          ))}
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
            {collection?.adFields.map(field => (
              <td key={field[0]}>{el[field[0]]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableItems;
