import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import VerfiyPharse from './VerifyPharse';
import axios from 'axios';
import useClipboard from 'react-use-clipboard';

export default function SetupPassPhraseNewAccount() {
	const [passphrase, setPassphrase] = useState([]);
	const [step, setStep] = useState('displayPasspharse');
	const [mnemonicStr, setMnemonicStr] = useState('');
	const [selectedWordIndex, setSelectedWordIndex] = useState();
	const [account, setAccount] = useState();
	const [isCopied, setIsCopied] = useClipboard(mnemonicStr, {
		successDuration: 200,
	});
	const backend_endpoint = process.env.REACT_APP_BACKEND_ENDPOINT;

	const createNewAccount = async () => {
		try {
			const response = await axios.get(`${backend_endpoint}/create-new-wallet`, (res, err) => {
				return res.data;
			});
			setMnemonicStr(response.data.mnemonic);
			setPassphrase(response.data.mnemonic.split(/[ ,]+/));
			setAccount(response.data.address);
		} catch (err) {
			console.log(err);
		}
	}

	const handleContinue = () => {
		setSelectedWordIndex(Math.floor(Math.random() * passphrase.length));
		setStep('verifyPasspharse');
	}

	useEffect(() => {
		createNewAccount();
	}, []);

	return (
		<div className='setup-passphrase-new-account bg-[#0B161E] min-h-screen'>
			<Header />
			{
				step == 'displayPasspharse' ?
					<div className='content flex flex-col pt-20 mx-2 text-white'>
						<p className='font-bold my-3 text-2xl'>
							Setup Your Secure Passphrase
						</p>
						<p className='mt-3 mb-10 text-left text-[#A2A2A7]'>
							Write down the following words in order and keep them somewhere safe.
							<span className='font-bold'>Anyone with access to will also have access to your account! </span>
							Your'll be asked to verify your passphrase next.
						</p>
						<div className='bg-[#0B161E] divide-y divide-[#122633] mb-10'>
							<div className='passphrase-words grid grid-cols-3 pb-2'>
								{
									passphrase?.map((word, index) => {
										return <div key={index} className="gap-5 p-3 m-2 bg-[#122633]">
											<p className='text-left'>
												<span className='text-[#25d695]'>{index + 1} </span>
												<span className='text-[#179b69]'>{word}</span>
											</p>
										</div>
									})
								}
							</div>
							<div className='actions flex pt-3'>
								<button
									className='bg-[#122633] px-10 py-3 rounded-full w-max m-auto inline-flex items-center'
									onClick={setIsCopied}
								>
									<img src={isCopied ? "./assets/copiedIcon.svg" : "./assets/copyIcon.svg"} alt='Copy Icon' className='h-[18px]' />
									<p className='font-bold ml-2 text-[#25d695]'>Cpoy</p>
								</button>
								<button
									className='bg-[#122633] px-10 py-3 rounded-full w-max m-auto inline-flex items-center'
									onClick={createNewAccount}
								>
									<img src="./assets/syncIcon.svg" alt='Sync Icon' className='h-[18px]' />
									<p className='font-bold ml-2 text-[#25d695]'>Generate New</p>
								</button>
							</div>
						</div>
						<button
							className='bg-gradient-to-r from-[#179b69] to-[#25d695] px-10 py-3 rounded-full font-bold'
							onClick={handleContinue}
						>
							Continue
						</button>
						<Link to="/" className='text-[#727279] my-10 font-bold w-max m-auto'>Cancel</Link>
					</div>
					:
					<VerfiyPharse targetWord={passphrase[selectedWordIndex]} targetIndex={selectedWordIndex} account={account}/>
			}

		</div>
	)
}