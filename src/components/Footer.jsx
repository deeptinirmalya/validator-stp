import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 py-10 px-6 z-20 relative bg-[#050505]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-neutral-500 text-sm">
          {t('footer.rights', { year: currentYear })}
        </div>
        <div className="flex gap-6">
          <Link to="/privacy" className="text-sm text-neutral-500 hover:text-white transition-colors">{t('footer.privacy')}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
