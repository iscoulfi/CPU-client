import { DebouncedFunc } from 'lodash';
import { Dispatch, SetStateAction } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ItemPreview } from '../layouts/MainLayout';

type ContextType = {
  items: [] | ItemPreview[];
  setSearchValue: Dispatch<SetStateAction<string>>;
  updateSearchItems: DebouncedFunc<(str: string) => Promise<void>>;
  loading: boolean;
};

export const useOutletProps = () => {
  return useOutletContext<ContextType>();
};
