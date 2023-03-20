import uuid from 'react-uuid'
import { useEffect } from 'react'
import Select from 'react-select'
import './Modal.css'
const Modal = (props) => {
  const sharing = async () => {
    const otherAdd = document.querySelector('.address').value
    await props.contract.allow(otherAdd)
    props.setModalOpen(false)
  }
  const revoke = async (event) => {
    const otherAdd = document.querySelector('.address').value
    await props.contract.disallow(otherAdd)
    props.setModalOpen(false)
  }
  useEffect(() => {
    const accessList = async () => {
      const addList = await props.contract.shareAccess()
      let select = document.querySelector('#selectNumber')
      const options = addList

      console.log(addList)
      for (let i = 0; i < options.length; i++) {
        let opt = options[i]
        let e1 = document.createElement('option')
        e1.textContent = opt
        e1.value = opt

        select.appendChild(e1)
      }
    }
    props.contract && accessList()
  }, [])
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input type="text" className="address" placeholder="Enter address"></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People with access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                props.setModalOpen(false)
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={sharing}>Share</button>
            <button onClick={revoke} id="cancelBtn">
              Revoke
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Modal
