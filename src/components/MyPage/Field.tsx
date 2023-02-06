import Select, { SingleValue } from 'react-select';
import { IOption, IField } from '../../types/appinterface';
import { options } from '../../assets/options';
import Form from 'react-bootstrap/Form';

const Field = ({ currentField, setCurrentField }: IField) => {
  const getValue = () =>
    currentField ? options.find(r => r.value === currentField) : '';

  const onChange = (newValue: SingleValue<string | IOption>) => {
    setCurrentField((newValue as IOption).value);
  };

  return (
    <>
      <Form.Label>Topic</Form.Label>
      <Select
        className="mb-3"
        onChange={onChange}
        value={getValue()}
        options={options}
        placeholder="Select topic..."
      />
    </>
  );
};

export default Field;
