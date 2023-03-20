import './App.css'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Upload from './artifacts/contracts/Upload.sol/Upload.json'
import FileUpload from './components/FileUpload'
import Display from './components/Display'
import Modal from './components/Modal'

function App() {
  const [account, setAccount] = useState('')
  const [contract, setContract] = useState(null)
  const [provider, setProvider] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on('chainChanged', () => {
          window.location.reload()
        })

        window.ethereum.on('accountsChanged', () => {
          window.location.reload()
        })
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setAccount(address)
        let contractAddresss = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

        const contract = new ethers.Contract(contractAddresss, Upload.abi, signer)
        //console.log(contract)
        setContract(contract)
        setProvider(provider)
      } else {
        alert('Metamask is not installed')
      }
    }
    provider && loadProvider()
  }, [])
  return (
    <>
      {!modalOpen && (
        <button
          className="share"
          onClick={() => {
            setModalOpen(true)
          }}
        >
          Share
        </button>
      )}
      {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract}></Modal>}
      <div className="App">
        <h1 style={{ color: 'white' }}>Drive 3.0</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ color: 'white' }}>Account :{account ? account : 'Not connected'}</p>

        <FileUpload account={account} provider={provider} contract={contract}></FileUpload>
        <Display account={account} provider={provider} contract={contract}></Display>
      </div>
    </>
  )
}

export default App
