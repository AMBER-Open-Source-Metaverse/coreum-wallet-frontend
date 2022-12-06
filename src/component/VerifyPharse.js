import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function VerfiyPharse({setIsLogged}) {
    const [seedPhraseVerificationWordNumber, setSeedPhraseVerificationWordNumber] = useState(7);
    const [wordInputValue, setWordInputValue] = useState('');
    const history = useHistory();

    const verifyComplete = () => {
        setIsLogged(true);
        history.push("/");
    }

    return <div>
        <div className='verify-pharse bg-[#0B161E] pt-2 min-h-screen'>
            <div className='content flex flex-col pt-20 text-white mx-2'>
                <p className='font-bold my-3 text-2xl'>
                    Verify Pharse
                </p>
                <p className='mt-3 mb-10 text-left text-[#A2A2A7]'>
                    Enter the following word from your recovery pharse to complete the setup process.
                </p>
                <div className='text-left mb-10'>
                    <p className='label text-md text-[#A2A2A7] mb-1'>Word <span className='font-bold'>#{seedPhraseVerificationWordNumber}</span></p>
                    <input
                        className={classNames(
                            wordInputValue ? 'border-[#25d695]' : 'border-[#10573C]',
                            'bg-transparent text-[18px] text-[#CCCCCC] border-2 rounded-md w-full p-2 outline-none'
                        )}
                        type='text'
                        value={wordInputValue}
                        onChange={(e) => setWordInputValue(e.target.value)}
                    />
                </div>

                <button
                    className={classNames(
                        wordInputValue ? 'bg-gradient-to-r from-[#179b69] to-[#25d695]' : 'bg-[#10573C] text-[#727279]',
                        'px-10 py-3 rounded-full font-bold'
                    )}
                    disabled={ wordInputValue ? false: true }
                    onClick={verifyComplete}
                >
                    Verify & Complete
                </button>
                <Link to="/" className='text-[#727279] text-center my-10 font-bold'>Start over</Link>
            </div>
        </div>
    </div>
}