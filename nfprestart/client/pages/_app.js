import '../styles/globals.css'
import ConnectButton from '../components/ConnectButton'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
    const [address, setAddress] = useState("")
    return (
        <div>
            <div>
                <ConnectButton func={setAddress} />
            </div>
            <Component {...pageProps} address={address}/>
        </div>
    )
}

export default MyApp
