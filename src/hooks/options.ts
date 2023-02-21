import { IOption } from '../types/appinterface';
import { useTranslation } from 'react-i18next';

export const useTopicOptions = (): IOption[] => {
  const { t } = useTranslation();
  return [
    { value: 'alcohol', label: t('Alcohol') },
    { value: 'perfume', label: t('Perfume') },
    { value: 'books', label: t('Books') },
  ];
};

export const useSortOptions = (): IOption[] => {
  const { t } = useTranslation();
  return [
    { value: 'dateAsc', label: t('date (asc)') },
    { value: 'dateDesc', label: t('date (desc)') },
    { value: 'popularityAsc', label: t('popularity (asc)') },
    { value: 'popularityDesc', label: t('popularity (desc)') },
  ];
};

export const useFields = (): IOption[] => {
  const { t } = useTranslation();
  return [
    { value: 'number1', label: t('Number') },
    { value: 'number2', label: t('Number') },
    { value: 'number3', label: t('Number') },
    { value: 'string1', label: t('String') },
    { value: 'string2', label: t('String') },
    { value: 'string3', label: t('String') },
    { value: 'text1', label: t('Text') },
    { value: 'text2', label: t('Text') },
    { value: 'text3', label: t('Text') },
    { value: 'date1', label: t('Date') },
    { value: 'date2', label: t('Date') },
    { value: 'date3', label: t('Date') },
    { value: 'checkbox1', label: t('Checkbox') },
    { value: 'checkbox2', label: t('Checkbox') },
    { value: 'checkbox3', label: t('Checkbox') },
  ];
};
