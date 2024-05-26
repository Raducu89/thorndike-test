import React, { useState, useEffect, useRef } from 'react';

function InfoForm({ onSubmit }) {
    const [info, setInfo] = useState({
        age: '',
        apt: '',
        gender: '',
        otherGender: '',
        faculty: '',
        otherFaculty: ''
    });

    const [counter, setCounter] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const intervalIdRef = useRef(null); // Adăugăm o referință pentru intervalId

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Indică începerea procesului de submit
        localStorage.setItem('userInfo', JSON.stringify(info));
        
        // Setăm intervalIdRef.current la noul interval creat
        intervalIdRef.current = setInterval(() => {
            setCounter((prevCounter) => {
                const updatedCounter = prevCounter - 1;
                if(updatedCounter <= 0) {
                    //clearInterval(intervalIdRef.current); // Oprim intervalul
                    onSubmit(); // Apelăm onSubmit pentru a naviga mai departe
                }
                return updatedCounter;
            });
        }, 1000);
    };

    useEffect(() => {
        // Curățăm intervalul la demontarea componentei folosind valoarea din intervalIdRef
        return () => clearInterval(intervalIdRef.current);
    }, []);
    
    return (
        <div className="bg-gray-50 flex items-center justify-center min-h-screen">
            <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label htmlFor="apt" className="block text-gray-700 text-sm font-bold mb-2">Do you feel physically and mentally fit to participate in this research?</label>
                        <select name="apt" onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>    
                            <option value="">Select...</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Age</label>
                        <input type="number" id="age" name="age" value={info.age} onChange={handleChange} placeholder="Your age" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 float-left">What gender do you identify with?</label>
                        <select name="gender" onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>
                            <option value="">Select...</option>
                            <option value="Female">Female</option>
                            <option value="Masculin">Masculin</option>
                            <option value="Male">Male</option>
                            <option value="I prefer not to answer">I prefer not to answer</option>
                            <option value="Other">Other</option>
                        </select>
                        {info.gender === 'Other' && (
                            <input type="text" name="otherGender" placeholder="Specify" onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-2 leading-tight focus:outline-none focus:shadow-outline" />
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 float-left">What college is she currently a student at?</label>
                        <select name="faculty" onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required>
                            <option value="">Select...</option>
                            <option value="Faculty of Psychology and Educational Sciences">Faculty of Psychology and Educational Sciences</option>
                            <option value="law School">law School</option>
                            <option value="Faculty of Medicine">Faculty of Medicine</option>
                            <option value="Other">Other</option>
                        </select>
                        {info.faculty === 'Other' && (
                            <input type="text" name="otherFaculty" placeholder="Specify" onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 mt-2 leading-tight focus:outline-none focus:shadow-outline" />
                        )}
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="universityYear" className="block text-gray-700 text-sm font-bold mb-2">What year are you a student?</label>
                        <input type="text" id="universityYear" name="universityYear" value={info.universityYear} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required />
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={isSubmitting}>
                            {isSubmitting ? `Test begins in: ${counter}s` : 'Begin test'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default InfoForm;
