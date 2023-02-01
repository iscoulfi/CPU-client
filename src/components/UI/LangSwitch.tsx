import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LangSwitch = () => {
  const { i18n } = useTranslation();
  const [activeLang, setActiveLang] = useState('en');

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <p className="lang me-2">
      <span
        className={activeLang === 'en' ? 'en' : ''}
        onClick={() => {
          changeLanguage('en');
          setActiveLang('en');
        }}
      >
        eng
      </span>
      <span>-</span>
      <span
        className={activeLang === 'ru' ? 'ru' : ''}
        onClick={() => {
          changeLanguage('ru');
          setActiveLang('ru');
        }}
      >
        ru
      </span>
    </p>
  );
};

export default LangSwitch;
