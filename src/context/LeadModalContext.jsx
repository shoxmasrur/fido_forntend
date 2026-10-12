import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import LeadModal from '../components/lead/LeadModal';

const LeadModalContext = createContext(null);

export function LeadModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      <LeadModal isOpen={isOpen} onClose={close} />
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const context = useContext(LeadModalContext);
  if (!context) throw new Error('useLeadModal must be used inside LeadModalProvider');
  return context;
}
