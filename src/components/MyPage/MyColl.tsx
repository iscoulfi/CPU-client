import { useAppSelector } from '../../redux/store';
import Accordion from 'react-bootstrap/Accordion';
import CollPriew from './CollPriew';

function MyColl() {
  const { collections } = useAppSelector(state => state.collection);

  return (
    <Accordion>
      {collections.map((collection, ind) => (
        <CollPriew collection={collection} ind={ind} key={collection._id} />
      ))}
    </Accordion>
  );
}

export default MyColl;
