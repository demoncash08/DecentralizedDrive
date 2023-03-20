import axios from 'axios'
import { useState } from 'react'
import './FileUpload.css'
const FileUpload = (props) => {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('No image selected')
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (file) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        console.log('here', formData)
        const resFile = await axios({
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data: formData,
          headers: {
            pinata_api_key: `86bb6f104dd38c83e7d7`,
            pinata_secret_api_key: `
ff71f29abf5e4838246ae68d24c9edf2e6881759e77d121f754d2cb185c19185`,
            'Content-Type': 'multipart/form-data',
          },
        })
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`
        //const signer = props.contract.connect(props.provider.getSigner())
        props.contract.add(props.account, ImgHash)
        alert('Image uploaded successfully ')
        setFile(null)
        setFileName('No image selected')
      } catch (error) {
        console.log(error)
        alert('Some error occured')
      }
    }
  }
  const retrieveFile = async (event) => {
    const data = event.target.files[0]
    //console.log(data)
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(data)
    reader.onloadend = () => {
      setFile(event.target.files[0])
    }
    setFileName(event.target.files[0].name)
    event.preventDefault()
  }
  return (
    <>
      <div className="top">
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="file-upload" className="choose">
            Choose image
          </label>
          <input disabled={!props.account} type="file" id="file-upload" name="data" onChange={retrieveFile}></input>
          <span className="textArea">Image:{fileName}</span>
          <button type="submit" className="upload" disabled={!file}>
            Upload
          </button>
        </form>
      </div>
    </>
  )
}
export default FileUpload
