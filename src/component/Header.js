import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header({isLogged, setIsLogged}) {

    const [account, setAccount] = useState('39d01814113b4c7d3bcd05549fa6b8845316b39407525cbf45b052e47455c557');
    const [showAccount, isShowAccount] = useState(false);

    return (
        <div className='header absolute w-full'>
            <div className='absolute z-20 w-full h-7 flex flex-row justify-between items-center mt-3 px-2'>
                <img src='./assets/logo.png' className='logo w-auto h-full' />
                {
                    isLogged ?
                        <div
                            className='user-account flex items-center w-max p-2 rounded-full bg-[#122633] cursor-pointer'
                            onClick={() => isShowAccount((p) => p ? false : true)}
                        >
                            <div className='account-wrapper overflow-hidden max-w-[200px] text-[#999999] text-ellipsis font-bold px-3'>
                                {account}
                            </div>
                            <div className="icon-wrapper flex rotate-90 rounded-full bg-[#10573C] min-w-[25px] min-h-[25px] justify-center items-center w-max">
                                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="chevron-icon">
                                    <path d="M1 13L7 7L1 1" stroke="#1CA674" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        :
                        <></>
                }
            </div>
            <div className={classNames('absolute z-10 flex flex-col bg-[#0B161E] w-full min-h-screen px-2 pt-20 overflow-hidden overflow-y-hidden', showAccount ? 'block' : 'hidden')}>
                <p className='label text-md text-[#999999] mb-1'>Account</p>
                <div
                    className='user-account flex items-center w-full p-5 rounded-lg bg-[#122633] overflow-hidden justify-between'
                >
                    <div className='account-wrapper overflow-hidden max-w-full text-[#999999] text-ellipsis font-bold'>
                        {account}
                    </div>
                    <img src="./assets/copyIconGreen.svg" alt='Copy Icon' className='h-[18px]' />
                </div>
                <div className='flex w-full bottom-10 absolute'>
                    <button 
                        className='text-[#727279] font-bold m-auto'
                        onClick={() => {
                            setIsLogged(false);
                            isShowAccount(false);
                        }}
                    >
                        Log out
                    </button>
                </div>
            </div>
        </div>

    )
}
