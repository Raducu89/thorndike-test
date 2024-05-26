import React, { useState, useEffect  } from 'react';
import ConsentForm from './ConsentForm';
import InfoForm from './InfoForm';
import ParentComponent from './ParentComponent';

function App() {
  // Stări pentru a controla afișarea componentelor
  const [consentGiven, setConsentGiven] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Verifica daca exista informatii despre itilizator in localStorage
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setFormSubmitted(true);
    }
  }, []);

  // Funcția care va fi apelată când consimțământul este acordat
  const handleConsent = () => {
    setConsentGiven(true);
  };

  // Funcția care va fi apelată când formularul de informații este completat
  const handleFormSubmit = () => {
    setFormSubmitted(true);
  };

  return (
    <div className="App">
      {!formSubmitted ? (
        !consentGiven ? (
          <ConsentForm onConsent={handleConsent} />
        ) : (
          <InfoForm onSubmit={handleFormSubmit} />
        )
      ) : (
        <ParentComponent />
      )}
    </div>
  );
}

export default App;
