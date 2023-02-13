import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navibar from '../components/Navibar';

export type ItemPreview = {
  _id: string;
  title: string;
  coll: string;
  createdAt: string;
};

const MainLayout = () => {
  const [items, setItems] = useState<[] | ItemPreview[]>([]);
  return (
    <>
      <Navibar setItems={setItems} />
      <Outlet context={items} />
    </>
  );
};

export default MainLayout;
