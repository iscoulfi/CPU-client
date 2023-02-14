import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TagCloud } from 'react-tagcloud';
import { useOutletProps } from '../../hooks/useOutletProps';
import axios from '../../utils/axios';

interface ITag {
  value: string;
  count: number;
}

const TagsCloud = () => {
  const [tags, setTags] = useState([]);
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

  const options = {
    luminosity: 'bright',
    hue: 'blue',
  };

  const searchByTag = (tag: string) => {
    navigate('/search');
    setSearchValue(tag);
    updateSearchItems(tag);
  };
  return (
    <div className="mt-4">
      <h1>Tags</h1>
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
