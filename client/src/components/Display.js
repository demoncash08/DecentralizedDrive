import { useState } from 'react'
import './Display.css'
const Display = (props) => {
  const [data, SetData] = useState('')
  const getData = async (event) => {
    let dataArray
    const otherAdd = document.querySelector('.address').value

    try {
      if (otherAdd) {
        dataArray = await props.contract.display(otherAdd)
        console.log(dataArray)
      } else {
        dataArray = await props.contract.display(props.account)
        //console.log(dataArray)
      }

      const isEmpty = Object.keys(dataArray).length === 0
      if (!isEmpty) {
        const str = dataArray.toString()
        const strArray = str.split(',')

        const images = strArray.map((item, i) => {
          return (
            <a href={item} key={i} target="_blank">
              <img
                key={i}
                src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                alt="new"
                className="image-list"
              ></img>
            </a>
          )
        })
        SetData(images)
      } else {
        alert('No image to display')
      }
    } catch (error) {
      alert("You don't have access")
    }
  }
  return (
    <>
      <div className="image-list">{data}</div>
      <input type="text" placeholder="Enter address" className="address"></input>
      <button className="center button" onClick={getData}>
        Get data
      </button>
    </>
  )
}
export default Display
