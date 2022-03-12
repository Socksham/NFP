import React, { useState, useRef, useEffect } from 'react'
import { ethers } from 'ethers'

export default function ConnectButton({ func }) {
    const [defaultAccount, setDefaultAccount] = useState(null)
    const [etherBalance, setEtherBalance] = useState(null)
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        if (window.ethereum) {
            if (window.ethereum.selectedAddress) {
                console.log("UM")
                accountChangedHandler(window.ethereum.selectedAddress)
            }
        } else {
            alert("Install Metamask!")
        }
    }, [])

    function handleConnectWallet() {
        if (window.ethereum) {
            console.log(window.ethereum.selectedAddress)
            console.log("HERE")
            window.ethereum.request({ method: "eth_requestAccounts" }).then((result) => {
                accountChangedHandler(result[0])
            })
        } else {
            alert("Install Metamask!")
        }
    }

    const accountChangedHandler = (account) => {
        setConnected(true)
        setDefaultAccount(account)
        func(account)
        getUserBalance(account)
    }

    const getUserBalance = (address) => {
        window.ethereum.request({ method: "eth_getBalance", params: [address, 'latest'] })
            .then((balance) => {
                setEtherBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(2))
            })
    }

    return (
        <div>
            <div>
                {
                    connected ? (
                        <div className='flex bg-black space-x-2 pr-0.5 pl-1 py-0.5 rounded-lg'>
                            <p className='text-white'>
                                {
                                    etherBalance + "ETH"
                                }
                            </p>
                            {
                                defaultAccount &&
                                <div className='bg-sky-900 px-2 rounded-md'>
                                    <p className='text-white'>
                                        {
                                            defaultAccount.slice(0, 6) + "..." + defaultAccount.slice(defaultAccount.length - 4, defaultAccount.length)
                                        }
                                    </p>
                                </div>
                            }

                        </div>
                    ) : (
                        <div onClick={handleConnectWallet} className="p-4 border border-2 border-black cursor-pointer">
                            <p>Connect to a wallet</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}