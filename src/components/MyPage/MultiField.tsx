import Select, { OnChangeValue } from 'react-select';
import { IOption, IFields } from '../../types/appinterface';
import { fields } from '../../assets/options';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';

const Field = ({ currentFields, setCurrentFields }: IFields) => {
  const { t } = useTranslation();

  const getValue = () =>
    currentFields
      ? fields.filter(f => currentFields.indexOf(f.value) >= 0)
      : [];

  const onChange = (newValue: OnChangeValue<IOption, boolean>) => {
    setCurrentFields((newValue as IOption[]).map(v => v.value));
  };

  return (
    <>
      <Form.Label>{t('Additional fields')}</Form.Label>
      <Select
        className="mb-3"
        onChange={onChange}
        value={getValue()}
        options={fields}
        placeholder={t('Select additional fields...') as string}
        isMulti
      />
    </>
  );
};

export default Field;
