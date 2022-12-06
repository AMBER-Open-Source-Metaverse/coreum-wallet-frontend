import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function RecoverAccount() {
    const [wordInputValue, setWordInputValue] = useState('');
    const history = useHistory();

    const findAccount = () => {
        history.push("/");
    }

    return <div>
        <div className='verify-pharse bg-[#0B161E] min-h-screen'>
            <Header />
            <div className='content flex flex-col pt-20 text-white mx-2'>
                <p className='font-bold my-3 text-2xl'>
                    Recover using Passpharse
                </p>
                <p className='mt-3 mb-10 text-left text-[#CCCCCC]'>
                    Enter the backup passpharse associated with the account.
                </p>
                <div className='text-left mb-10'>
                    <p className='label text-md text-[#CCCCCC] mb-1'>Passpharse (12 words)</p>
                    <input
                        className={classNames(
                            wordInputValue ? 'border-[#25d695]' : 'border-[#10573C]',
                            'bg-transparent text-[18px] text-[#CCCCCC] border-2 rounded-md w-full p-2 outline-none'
                        )}
                        type='text'
                        value={wordInputValue}
                        placeholder='correct horse battery staple...'
                        onChange={(e) => setWordInputValue(e.target.value)}
                    />
                </div>

                <button
                    className={classNames(
                        wordInputValue ? 'bg-gradient-to-r from-[#179b69] to-[#25d695]' : 'bg-[#10573C] text-[#727279]',
                        'px-10 py-3 rounded-full font-bold'
                    )}
                    disabled={wordInputValue ? false : true}
                    onClick={findAccount}
                >
                    Find My Account
                </button>
                <Link to="/" className='text-[#727279] my-10 font-bold w-max m-auto'>Cancel</Link>
            </div>
        </div>
    </div>
}