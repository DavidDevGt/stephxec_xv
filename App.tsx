import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Envelope from './components/Envelope';
import Invitation from './components/Invitation';

const App: React.FC = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  return (
    <div className="w-full min-h-screen relative">
      <AnimatePresence mode="wait">
        {!isEnvelopeOpen ? (
          <Envelope key="envelope" onOpen={() => setIsEnvelopeOpen(true)} />
        ) : (
          <Invitation key="invitation" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;