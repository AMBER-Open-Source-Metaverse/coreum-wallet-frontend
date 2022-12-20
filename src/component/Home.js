import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import useCookie from '../useCookie';
import axios from 'axios';

export default function Home() {

    const [balance, setBalance] = useState(0);
    const [isLogged, updateIsLogged] = useCookie('isLogged', 0);
    const [account, setAccount] = useCookie('address', '');
    const backend_endpoint = process.env.REACT_APP_BACKEND_ENDPOINT;
    const denomDecimal = Number(process.env.REACT_APP_DENOM_DECIMAL);

    const getBalance = async (_account) => {
        try {
            const response = await axios.get(`${backend_endpoint}/get-balance/${_account}`, (res, err) => {
                return res.data;
            });
            if (response.data.type == "success") setBalance(Number(response.data.data) / (10 ** denomDecimal));
        } catch (err) {
            console.log(err);
        }
    }

    useState(() => {
        if (account) getBalance(account);
    }, [account]);

    return (
        <div className='home bg-[#0B161E] min-h-screen'>
            <Header />
            {
                isLogged == 1 ?
                    <div className='content flex flex-col text-center justify-center w-full pt-32 '>
                        <p className='font-bold m-3 text-6xl text-[#A1A1A8]'>
                            {balance} CORE
                        </p>
                        <div className='inline-flex justify-center'>
                            <p className='text-[#686E71] font-bold mr-2'>Available Balance</p>
                            <img src='./assets/infoIcon.svg' className='logo w-auto h-full cursor-pointer' />
                        </div>
                    </div>
                    :
                    <div className='content flex flex-col pt-20 text-white text-center'>
                        <p className='font-bold m-3 text-2xl'>
                            Login with Coreum
                        </p>
                        <p className='mt-3 mb-10'>
                            Securely store and stake your CORE tokens and compatible assets with Coreum Wallet.
                        </p>
                        <Link
                            className='bg-gradient-to-r text-[#E8E8E8] from-[#179b69] to-[#25d695] px-10 py-3 rounded-full w-max m-auto'
                            to="/setup-passphrase-new-account"
                        >
                            Create Account
                        </Link>
                        <p className='my-8 text-[#CCCCCC]'>or</p>
                        <Link to="/recover-account" className='text-[#26D695] w-max m-auto'>Import Existing Account</Link>
                    </div>
            }
        </div>
    )
}
