import { IOption } from '../types/appinterface';

export const topicOptions: IOption[] = [
  { value: 'alcohol', label: 'Alcohol' },
  { value: 'perfume', label: 'Perfume' },
  { value: 'books', label: 'Books' },
];

export const sortOptions: IOption[] = [
  { value: 'dateAsc', label: 'date (asc)' },
  { value: 'dateDesc', label: 'date (desc)' },
  { value: 'popularityAsc', label: 'popularity (asc)' },
  { value: 'popularityDesc', label: 'popularity (desc)' },
];

export const fields: IOption[] = [
  { value: 'number1', label: 'Number' },
  { value: 'number2', label: 'Number' },
  { value: 'number3', label: 'Number' },
  { value: 'string1', label: 'String' },
  { value: 'string2', label: 'String' },
  { value: 'string3', label: 'String' },
  { value: 'text1', label: 'Text' },
  { value: 'text2', label: 'Text' },
  { value: 'text3', label: 'Text' },
  { value: 'date1', label: 'Date' },
  { value: 'date2', label: 'Date' },
  { value: 'date3', label: 'Date' },
  { value: 'checkbox1', label: 'Checkbox' },
  { value: 'checkbox2', label: 'Checkbox' },
  { value: 'checkbox3', label: 'Checkbox' },
];
