import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getCollectionItems } from '../../redux/slices/item/asyncActions';
import { useParams } from 'react-router-dom';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSortOptions } from '../../hooks/options';
import { ThemeContext } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import ReactMarkdown from 'react-markdown';
import Field from '../../components/MyPage/Field';

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
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const { collId } = useParams();
  const { items } = useAppSelector(state => state.item);
  const { collection } = useAppSelector(state => state.collection);
  const [sort, setSort] = useState('dateAsc');

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

  const sortedItems = useMemo(() => {
    let sorted = [...items];
    if (sort === 'dateAsc') return sorted;
    if (sort === 'dateDesc') {
      return sorted.reverse();
    }
    sorted.sort((a, b) => {
      if (Object.keys(a.likes).length < Object.keys(b.likes).length) {
        return sort === 'popularityAsc' ? -1 : 1;
      }
      if (Object.keys(a.likes).length > Object.keys(b.likes).length) {
        return sort === 'popularityAsc' ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [items, sort]);

  return (
    <div>
      <div className="sorting ms-3 mt-2 mt-sm-0">
        <Field
          currentField={sort}
          setCurrentField={setSort}
          options={useSortOptions()}
          label={t('Sorted by:')}
        />
      </div>

      <Table striped bordered hover responsive size="sm" variant={theme}>
        <thead>
          <tr>
            <th>{t('Action')}</th>
            <th>id</th>
            <th>{t('Name')}</th>
            <th>{t('Tags')}</th>
            {collection?.adFields.map(el => (
              <th key={el[0]}>{el[1]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((el, ind) => (
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
              <td>
                <div className="widen">{el.tags.map(tag => `#${tag} `)}</div>
              </td>
              {collection?.adFields
                .filter(el => !el[0].includes('text'))
                .map(field => (
                  <td key={field[0]}>
                    <div className="widen">{el[field[0]]}</div>
                  </td>
                ))}
              {collection?.adFields
                .filter(el => el[0].includes('text'))
                .map(field => (
                  <td key={field[0]}>
                    <ReactMarkdown
                      className="markfield"
                      children={el[field[0]] as string}
                    />
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableItems;
