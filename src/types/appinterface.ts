import { Dispatch, SetStateAction } from 'react';

export interface IOption {
  label: string;
  value: string;
}

export interface IField {
  currentField: string;
  setCurrentField: Dispatch<SetStateAction<string>>;
}

export interface IFields {
  currentFields: string[];
  setCurrentFields: Dispatch<SetStateAction<string[]>>;
}

export type AdditionalFields = {
  number1?: string;
  number2?: string;
  number3?: string;
  string1?: string;
  string2?: string;
  string3?: string;
  text1?: string;
  text2?: string;
  text3?: string;
  date1?: string;
  date2?: string;
  date3?: string;
  checkbox1?: string;
  checkbox2?: string;
  checkbox3?: string;
};

export type StandardCollFields = {
  title: string;
};
export type CollInputs = AdditionalFields & StandardCollFields;
