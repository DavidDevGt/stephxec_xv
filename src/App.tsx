import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import Envelope from './components/Envelope';
import Invitation from './components/Invitation';

const App: React.FC = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // Get guest name from URL query parameter
  const guestName = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('name') || null;
  }, []);

  return (
    <div className="w-full min-h-screen relative">
      <AnimatePresence mode="wait">
        {!isEnvelopeOpen ? (
          <Envelope key="envelope" onOpen={() => setIsEnvelopeOpen(true)} guestName={guestName} />
        ) : (
          <Invitation key="invitation" guestName={guestName} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;