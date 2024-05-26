// src/ConsentForm.js
import React, { useEffect, useState } from 'react';
import InfoForm from './InfoForm';

function ConsentForm({ onConsent }) {
    const [consentGiven, setConsentGiven] = useState(false);
    const [submittedAndAgree, setSubmittedAndAgree] = useState(false);
    const [fadeEffect, setFadeEffect] = useState('');

    useEffect(() => {
        setFadeEffect('fade-enter-active');
    }, []);

    const handleCheckboxChange = (e) => {
        setConsentGiven(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setFadeEffect('fade-exit-active');
        setTimeout(() => {
            setConsentGiven(true);

            let submittedAndAgree = consentGiven
            setSubmittedAndAgree(submittedAndAgree);

            if(consentGiven) {
                onConsent(); // Notifică componenta App că consimțământul a fost acordat
            }
        }, 0);
    };

    return (
        <div className={`transition-opacity fade-effect ${fadeEffect}`}>
            {!submittedAndAgree ? (
                <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen p-4">
                    <div className="max-w-2xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-left">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 text-sm text-gray-700">
                                <p className="pb-2">Hello,</p>

                                <p className="pb-2">We invite you to participate in a research project carried out by a group of students at the Faculty of Psychology and Educational Sciences of Transilvania Brașov University.</p>

                                <p className="pb-2">To participate in this study you need to fill out this form which contains some demographic data and a work sample. The working sample consisted of detecting 10 predetermined numbers from an array of 100 random numbers. The data collected is anonymous and will be used exclusively for academic purposes. </p>

                                <p className="pb-2">It takes about 6 minutes to complete, and by completing this form you are giving your consent to participate in the study.</p>

                                <p className="pb-2">Your participation is voluntary, carries no risks or benefits, and you can withdraw at any time without consequence or need for explanation.</p>

                                <p className="pb-2">If you would like more information about the study, you can contact us at the following email address:</p>

                                <a href= "mailto: email@student.ro" className="text-blue-500 hover:text-blue-700"> email@student.ro </a>
                            </div>
                            <div className="mb-4">
                                <label className="inline-flex items-center">
                                    <input type="checkbox" className="form-checkbox" onChange={handleCheckboxChange} />
                                    <span className="ml-2">I confirm that I agree to participate in the study.</span>
                                </label>
                            </div>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" disabled={!consentGiven}>
                                Keep going
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <InfoForm />
            )}
        </div>
    );
}

export default ConsentForm;
