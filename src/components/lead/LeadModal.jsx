import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../ui/Modal';
import LeadForm from './LeadForm';
import LeadSuccess from './LeadSuccess';

export default function LeadModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) setSubmitted(false);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={submitted ? t('form.success.header') : t('form.title')}>
      {submitted ? <LeadSuccess onClose={onClose} /> : <LeadForm onSuccess={() => setSubmitted(true)} />}
    </Modal>
  );
}
