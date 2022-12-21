import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import useCookie from '../useCookie';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function RecoverAccount() {
    const [wordInputValue, setWordInputValue] = useState('');
    const [isLogged, updateIsLogged] = useCookie('isLogged', 0);
    const [account, setAccount] = useCookie('address', '');
    const [wordInputValueIsCorrect, setWordInputValueIsCorrect] = useState(true);

    const history = useHistory();
	const backend_endpoint = process.env.REACT_APP_BACKEND_ENDPOINT;
    const cookieExpirationDay = process.env.REACT_APP_COOKIE_EXPIRATION_DAY;

    const findAccount = async () => {
        console.log("wordInputValue:", wordInputValue);
        var bodyFormData = new FormData();
        bodyFormData.append('mnemonic', wordInputValue);
        try {
            const response = await axios.post(`${backend_endpoint}/recovery-wallet`, {
                headers: {'Access-Control-Allow-Origin': '*'}
            }, bodyFormData , (res, err) => {
                return res.data;
            });
            if (response.data.type == "failed") {
                setWordInputValueIsCorrect(false);
            } else {
                updateIsLogged(1, cookieExpirationDay);
                setAccount(response.data, cookieExpirationDay);
                history.push("/");
            }
            
        } catch (err) {
            setWordInputValueIsCorrect(false);
            console.log(err);
        }
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
                    <p className='label text-md text-[#CCCCCC] mb-1'>Passpharse (24 words)</p>
                    <input
                        className={classNames(
                            'bg-transparent text-[18px] text-[#CCCCCC] border-2 rounded-md w-full p-2 outline-none',
                            wordInputValueIsCorrect == false ? 'border-[#b70f36]' : wordInputValue ? 'border-[#25d695]' : 'border-[#10573C]'
                        )}
                        type='text'
                        value={wordInputValue}
                        placeholder='correct horse battery staple...'
                        onChange={(e) => {
                            setWordInputValueIsCorrect(true);
                            setWordInputValue(e.target.value);
                        }}
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