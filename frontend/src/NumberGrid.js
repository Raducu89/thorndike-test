import React, { useState, useEffect } from 'react';


function NumberGrid({ onTestFinish, setTestResult }) {
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [numbers, setNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [controlNumbers, setControlNumbers] = useState([]);
  const [startTime] = useState(Date.now());

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
  };

  useEffect(() => {
    // Generate 10 random control numbers
    let tempControlNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 900) + 100);
    setControlNumbers(tempControlNumbers);

    // Complete the rest of the numbers with random numbers
    let allNumbersSet = new Set(tempControlNumbers);
    while(allNumbersSet.size < 100) {
      allNumbersSet.add(Math.floor(Math.random() * 900) + 100);
    }

    // Transofrm the set into an array and shuffle it
    let allNumbersArray = shuffleArray([...allNumbersSet]);
    setNumbers(allNumbersArray);

    // Set the interval for the countdown
    const countdown = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft <= 1) clearInterval(countdown);
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const toggleSelection = (number) => {
    setSelectedNumbers(prevSelected => prevSelected.includes(number) ? prevSelected.filter(n => n !== number) : [...prevSelected, number]);
  };


  const handleSubmit = async () => {
    const endTime = Date.now();
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    const data = {
        userInfo: {
          name: userInfo.name,
          apt:userInfo.apt,
          email: userInfo.email,
          gender:userInfo.gender,
          age: userInfo.age,
          faculty: userInfo.faculty,
          otherGender: userInfo.otherGender,
          otherFaculty: userInfo.otherFaculty,
          universityYear: userInfo.universityYear, 
        },
        controlNumbers,
        gridNumbers: numbers, 
        correctNumbersCount: selectedNumbers.filter(number => controlNumbers.includes(number)).length,
        missedNumbersCount: controlNumbers.filter(number => !selectedNumbers.includes(number)).length,
        errorsCount: selectedNumbers.filter(number => !controlNumbers.includes(number)).length,
        selectedNumbers,
        extraNumbersCount: 0, 
        solvingMode: 'manual', 
        startTime,
        submitTime: endTime,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setTestResult(result); // Use the function passed as prop to set the test result
      onTestFinish(); // Call the function passed as prop to notify the parent component
    } catch (error) {
      console.error('Failed to submit the test:', error);
    }
  };

  // Update the time left and check if the test is finished
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  return (
    <div className="container mx-auto my-10 p-2 bg-white shadow-lg max-w-4xl">      
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-center mb-2">Number Search Teste</h1>
        <p className="text-sm text-center">Find the 10 check numbers in the table as fast as possible...</p>
        <div className="bg-black text-white px-3 py-1 rounded-full text-center my-4">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        <div className="flex space-x-2 mb-4 justify-center">
          {controlNumbers.map((num, index) => (
            <span key={index} className="font-bold text-lg text-base">{num}</span>
          ))}
        </div>
      </div>
      
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div className="grid grid-cols-10  gap-0 mb-6 p-1 border-1 border-gray-300 rounded-lg">
          {numbers.map((number, index) => (
            <button
              key={index}
              type="button"
              onClick={() => toggleSelection(number)}
              className={`w-full h-full border border-gray-300 rounded flex space-x-4 items-center justify-center cursor-pointer select-none ${selectedNumbers.includes(number) ? 'bg-sky-200' : ''}`}
            >
              {number}
            </button>
          ))}
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default NumberGrid;