import { useEffect, useState, useRef } from 'react';

import { ethers } from 'ethers';

import {
    nftaddress
} from '../config'

// import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'
// import PandaNFT from '../artifacts/contracts/PandaNFT.sol/Panda.json';
import NFT from '../src/contracts/Panda.json'

const MintToken = ({address}) => {

    const contentId = 'Qmdbpbpy7fA99UkgusTiLhMWzyd3aETeCFrz7NpYaNi6zY';
    const metadataURI = useRef(null);
    const imageURI = useRef(null);

    const nftcontract = useRef("")
    const marketcontract = useRef("")
    const signer = useRef(null)

    const [count, setCount] = useState();
    useEffect(() => {
        async function func() {
            
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // window.ethereum.enable()
            // // get the end user
            // signer.current = provider.getSigner();

            // // get the smart contract
            // nftcontract.current = new ethers.Contract(nftaddress, NFT.abi, signer.current);
            // // marketcontract.current = new ethers.Contract(nftmarketaddress, Market.abi, signer.current)
            // // console.log(marketcontract.current)
            // let countTemp = await getCount()
            // let tokenId = countTemp + 1
            // console.log(tokenId)
            // metadataURI.current = `${contentId}/${tokenId}.json`;
            // imageURI.current = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
            // setCount(countTemp)
        }

        func()

        // getMintedStatus();
    }, []);

    // useEffect(() => {
    //     let countTemp = getCount()
    //     let tokenId = countTemp + 1
    //     metadataURI = `${contentId}/${tokenId}.json`;
    //     imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
    //     setCount(countTemp)
    // }, [count])

    const getCount = async () => {
        if (nftcontract.current != null) {
            const count = await nftcontract.current.count();
            console.log(parseInt(count));
            return parseInt(count)
        }
    };

    // const getMintedStatus = async () => {
    //     const result = await contract.isContentOwned(metadataURI);
    //     console.log(result)
    //     setIsMinted(result);
    // };

    const mintToken = async () => {
        if (nftcontract.current != "") {
            // const web3Modal = new Web3Modal()
            // const connection = await web3Modal.connect(signer.current)
            console.log(marketcontract.current)
            const connection = nftcontract.current.connect(signer.current);
            console.log(connection)
            const addr = connection.address;
            console.log(metadataURI)
            console.log(addr)
            const transaction = await nftcontract.current.payToMint("0x1fA3597fBc9248E24eB9e928234D7940E6990312", metadataURI.current, {
                value: ethers.utils.parseEther('1'),
            });
            let tx = await transaction.wait()
            let event = tx.events[0]
            let value = event.args[2]
            let tokenId = value.toNumber()
            console.log(tokenId)
            // const web3Modal = new Web3Modal()
            // const connection = await web3Modal.connect()
            // const provider = new ethers.providers.Web3Provider(connection)
            // // const signer = provider.getSigner()
            // // const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

            // /* user will be prompted to pay the asking proces to complete the transaction */
            // console.log("Creating transaction")
            // const transaction2 = await marketcontract.current.createMarketItem(nftaddress, tokenId)
            // console.log("Awaiting transaction")
            // await transaction2.wait()

            // transaction = await marketcontract.createMarketItem(nftaddress, tokenId, 0.0, { value: 0.0 })
            // await transaction.wait()
            getCount();
        }

    };

    async function getURI() {
        const uri = await contract.tokenURI(tokenId);
        alert(uri);
    }
    return (
        <div className="" style={{ width: '18rem' }}>
            <div className="bg-red-400 rounded-md p-4" onClick={() => { mintToken() }}>
                <p>Click to mint</p>
            </div>
        </div>
    );
};

export default MintToken;
