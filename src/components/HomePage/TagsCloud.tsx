import { useEffect, useMemo, useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import axios from '../../utils/axios';

interface ITag {
  value: string;
  count: number;
}

const TagsCloud = () => {
  const [tags, setTags] = useState([]);

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

  return (
    <div className="mt-4">
      <h1>Tags</h1>
      <div className="tags">
        <TagCloud
          minSize={16}
          maxSize={24}
          colorOptions={options}
          tags={tagsData}
          onClick={(tag: ITag) => console.log(tag)}
        />
      </div>
    </div>
  );
};

export default TagsCloud;
