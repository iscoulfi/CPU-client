import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TagCloud } from 'react-tagcloud';
import { useOutletProps } from '../../hooks/useOutletProps';
import { useTranslation } from 'react-i18next';
import axios from '../../utils/axios';

interface ITag {
  value: string;
  count: number;
}

const options = {
  luminosity: 'bright',
  hue: 'blue',
};

const TagsCloud = () => {
  const [tags, setTags] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setSearchValue, updateSearchItems } = useOutletProps();

  const tagsData = useMemo(
    () =>
      tags.map(tag => {
        const container = { value: '', count: 0 };
        container.value = tag;
        container.count = Math.floor(Math.random() * (31 - 10)) + 10;
        return container;
      }),
    [tags]
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/items/tags/last');
        setTags(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const searchByTag = (tag: string) => {
    navigate('/search');
    setSearchValue(tag);
    updateSearchItems(tag);
  };
  return (
    <div className="mt-4 tagscloud">
      <div className="nameplate">
        <h1>{t('Tag cloud')}</h1>
      </div>
      <div className="tags">
        <TagCloud
          minSize={16}
          maxSize={24}
          colorOptions={options}
          tags={tagsData}
          onClick={(tag: ITag) => searchByTag(tag.value)}
        />
      </div>
    </div>
  );
};

export default TagsCloud;
