import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { contentService } from '../../services/contentService';
import { sendLead, TelegramConfigError } from '../../services/telegramService';
import { useContent } from '../../hooks/useContent';
import { formatPhone, isEmail, isPhoneComplete } from '../../utils/format';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import styles from './LeadForm.module.css';

const INITIAL = { fullName: '', position: '', company: '', phone: '', email: '', product: '', message: '' };
const REQUIRED = ['fullName', 'company', 'phone'];

function validate(values) {
  const errors = {};
  REQUIRED.forEach((field) => {
    if (!values[field].trim()) errors[field] = 'required';
  });
  if (values.phone && !errors.phone && !isPhoneComplete(values.phone)) errors.phone = 'phone';
  if (values.email && !isEmail(values.email)) errors.email = 'email';
  return errors;
}

export default function LeadForm({ onSuccess }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { data: products = [], lang } = useContent(contentService.getProducts);

  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const [submitError, setSubmitError] = useState('');

  const setField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setField(name, name === 'phone' ? (value ? formatPhone(value) : '') : value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus('sending');
    setSubmitError('');
    try {
      const product = products?.find((item) => item.id === values.product)?.name;
      await sendLead({ ...values, product, lang, page: window.location.origin + pathname });
      setValues(INITIAL);
      setStatus('idle');
      onSuccess();
    } catch (error) {
      setStatus('error');
      setSubmitError(error instanceof TelegramConfigError ? t('form.errors.config') : t('form.errors.send'));
    }
  };

  const field = (name, { type = 'text', autoComplete, inputMode } = {}) => (
    <div className={styles.field}>
      <label htmlFor={`lead-${name}`} className={styles.label}>
        {t(`form.${name}`)}
        {REQUIRED.includes(name) && <span className={styles.required}>*</span>}
      </label>
      <input
        id={`lead-${name}`}
        name={name}
        type={type}
        value={values[name]}
        onChange={onChange}
        placeholder={t(`form.${name}Placeholder`)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={Boolean(errors[name])}
        className={`${styles.input} ${errors[name] ? styles.invalid : ''}`}
      />
      {errors[name] && <span className={styles.error}>{t(`form.errors.${errors[name]}`)}</span>}
    </div>
  );

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.fields}>
        {field('fullName', { autoComplete: 'name' })}
        {field('position', { autoComplete: 'organization-title' })}
        {field('company', { autoComplete: 'organization' })}
        {field('phone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
        {field('email', { type: 'email', autoComplete: 'email' })}

        <div className={styles.field}>
          <label htmlFor="lead-product" className={styles.label}>
            {t('form.product')}
          </label>
          <div className={styles.selectWrap}>
            <select
              id="lead-product"
              name="product"
              value={values.product}
              onChange={onChange}
              className={`${styles.input} ${styles.select} ${values.product ? '' : styles.placeholder}`}
            >
              <option value="">{t('form.productPlaceholder')}</option>
              {products?.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <Icon name="chevronDown" size={20} className={styles.chevron} />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="lead-message" className={styles.label}>
            {t('form.message')}
          </label>
          <textarea
            id="lead-message"
            name="message"
            rows={4}
            value={values.message}
            onChange={onChange}
            placeholder={t('form.messagePlaceholder')}
            className={`${styles.input} ${styles.textarea}`}
          />
        </div>
      </div>

      {status === 'error' && (
        <p className={styles.submitError} role="alert">
          {submitError}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" block disabled={status === 'sending'}>
        {status === 'sending' ? t('form.sending') : t('form.submit')}
      </Button>
      <p className={styles.agreement}>{t('form.agreement')}</p>
    </form>
  );
}
