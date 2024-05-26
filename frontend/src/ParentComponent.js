import React, { useState, useEffect } from 'react';
import NumberGrid from './NumberGrid';
import EndTest from './EndTest';

function ParentComponent() {
  const [testFinished, setTestFinished] = useState(false);
  const [testResult, setTestResult] = useState({});

  useEffect(()=> {
    const testFinished = localStorage.getItem('testFinished') === 'true';
    const savedTestResult = localStorage.getItem('testResult');
    
    if (testFinished && savedTestResult) {
      setTestFinished(true);
      setTestResult(JSON.parse(savedTestResult));
    }
  }, []);

  return (
    <div>
      {!testFinished ? (
        <NumberGrid 
          onTestFinish={() => setTestFinished(true)} 
          setTestResult={setTestResult}
          
        />
      ) : (
        <EndTest result={testResult} />
      )}
    </div>
  );
}


export default ParentComponent;
