import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from '../utils/axios';
import debounce from 'lodash.debounce';
import Navibar from '../components/Navs/Navibar';

export type ItemPreview = {
  _id: string;
  title: string;
  coll: string;
  createdAt: string;
};

const MainLayout = () => {
  const [items, setItems] = useState<[] | ItemPreview[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line
  const updateSearchItems = useCallback(
    debounce(async (str: string) => {
      try {
        const { data } = await axios.get(`/items?search=${str}`);
        setItems(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }, 200),
    []
  );

  return (
    <>
      <Navibar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        updateSearchItems={updateSearchItems}
      />
      <Outlet context={{ items, setSearchValue, updateSearchItems, loading }} />
    </>
  );
};

export default MainLayout;
