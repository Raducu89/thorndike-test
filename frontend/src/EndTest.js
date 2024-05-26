import React, { useState } from 'react';

function EndTest({ result }) {
    const [showThankYou, setShowThankYou] = useState(false);
    const score = result.score; // access the score
    localStorage.setItem('testFinished', 'true');
    localStorage.setItem('testResult', JSON.stringify(result));
  
    const onMethodChange = async (e) => {
        const method = e.target.value;
        const testId = result.id; 

        try {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tests/method`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ testId, method }),
          });
          
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const responseData = await response.json();
          setShowThankYou(true);
        } catch (error) {
          console.error('Failed to update the method:', error);
        }
    };
  
    if (showThankYou) {
      return (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto items-center justify-center">
              <h1 className="text-xl font-bold mb-4">Thanks for participating!</h1>
          </div>
      );
    }

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">
        {/* <p className="mb-4">Your result is: <span className="font-semibold">{score}</span></p> */}
        <h2 className="text-lg font-semibold mb-2">How did you solve the work sample? Select one of the options below.</h2>
        <form className="space-y-4">
            <div className="flex items-center">
            <input id="sistematic" type="radio" name="solvingMethod" value="Systematic execution" onChange={onMethodChange} className="mr-2" />
            <label htmlFor="sistematic" className="flex-1 min-w-0">
                <b>Systematic execution.</b> <i>When a person scans the entire table sequentially for each given number.</i>
            </label>
            </div>
            <div className="flex items-center">
            <input id="optim" type="radio" name="solvingMethod" value="Optimal mode" onChange={onMethodChange} className="mr-2" />
            <label htmlFor="optim" className="flex-1 min-w-0">
                <b>Optimal mode.</b> <i>It consists in the fact that the subject takes into account several given numbers and looks for them in an organized manner in different places of the table.</i>
            </label>
            </div>
            <div className="flex items-center">
            <input id="haotic" type="radio" name="solvingMethod" value="Chaotic mode" onChange={onMethodChange} className="mr-2" />
            <label htmlFor="haotic" className="flex-1 min-w-0">
                <b>Chaotic mode.</b> <i>Passing the test in a chaotic, random way, without organizing or ordering it in any way.</i>
            </label>
            </div>
            <div className="flex items-center">
            <input id="alta" type="radio" name="solvingMethod" value="Another method" onChange={onMethodChange} className="mr-2" />
            <label htmlFor="alta" className="flex-1 min-w-0">
                <b>Another method</b>
            </label>
            </div>
            
        </form>
        </div>
    );
}

export default EndTest;



