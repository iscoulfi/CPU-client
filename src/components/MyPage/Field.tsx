import Select, { SingleValue } from 'react-select';
import { IOption, IField } from '../../types/appinterface';
import Form from 'react-bootstrap/Form';

const Field = ({ currentField, setCurrentField, options, label }: IField) => {
  const getValue = () =>
    currentField ? options.find(r => r.value === currentField) : '';

  const onChange = (newValue: SingleValue<string | IOption>) => {
    setCurrentField((newValue as IOption).value);
  };

  return (
    <>
      <Form.Label>{label}</Form.Label>
      <Select
        className="mb-3"
        onChange={onChange}
        value={getValue()}
        options={options}
        placeholder="Select..."
      />
    </>
  );
};

export default Field;
