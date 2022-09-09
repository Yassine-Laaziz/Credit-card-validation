import "./form.css"

import { addSmallShrink, addDots } from "../methods"
import { useState } from "react"

const Form = () => {
  const render = (inputQueryClass, updatedQueryClass) => {
    let data = document.querySelector(inputQueryClass).value
    document.querySelector(updatedQueryClass).innerText = data
  }

  const initializeEmpty = (queryClass, initialValue) => {
    if (document.querySelector(queryClass).value === "") {
      document.querySelector(queryClass).value = initialValue
    }else if (document.querySelector(queryClass).innerText === ""){
      document.querySelector(queryClass).innerText = initialValue
    }
  }

  const numberChange = () => {
    render("#numberInput", ".cardNumber")
    initializeEmpty(".cardNumber", "0000 0000 0000 0000")
  }

  const [nameDots, setNameDots] = useState()
  const nameChange = () => {
    // the world's longest name is 1000+ characters long so i will just not limit this input,
    // instead i'll make the text shrink and if it's too long have 3 dots at the end
    render("#nameInput", ".cardHolder")
    addSmallShrink(".cardHolder")
    addDots(".cardHolder", nameDots, setNameDots, 80)
    initializeEmpty(".cardHolder", "JOHN DOE")
    document.querySelector(".cardHolder").innerText = 
    document.querySelector(".cardHolder").innerText.toUpperCase()
  }

  const monthChange = () => {
    render("#monthInput", ".monthDate")
    initializeEmpty(".monthDate", "00")
  }

  const yearChange = () => {
    render("#yearInput", ".yearDate")
    initializeEmpty(".yearDate", "00")
  }

  const cvcChange = () => {
    render("#cvcInput", ".cvcArea")
    initializeEmpty(".cvcArea", "000")
  }

  const handleFocus = (linkedQueryClass, e) => {
    let style = document.querySelector(linkedQueryClass).style
    style.borderRadius = "4px"
    style.boxShadow = "0 0 0 1px white"
  }
  const handleBlur = (linkedQueryClass) => {
    document.querySelector(linkedQueryClass).style.boxShadow = "none"
  }

  const handleSubmit = (e) => {
    //i could've used XMLHttpRequest Here but there's no backend server so i'll just simulate it
    const data = JSON.stringify(require('./fakeBackend.json'))//simulating initial responseText
    const parsedData = JSON.parse(data)//parsing the simulated text
    //in this section we give the input-group a class of 'active' and if a input-group 
    // is active in css the unvalid message text will be shown with display:block
    let Submittable;
    parsedData.forEach(object => {
      if (!object.value) {
        document.querySelector(Object.keys(object)).classList.toggle('active')
        Submittable = false
    }})
    if (!Submittable) e.preventDefault()
  }

  return (
    <>
      {/*            ----The Form----             */}

      <form action="results" onSubmit={handleSubmit}>
        {/*divs are used to align items horizontally without the paragraphs centered */}
        <div className="input-group ig1">
          <label htmlFor="numberInput">Card Number</label>
          <input
            pattern="\d{4}\s?\d{4}\s?\d{4}\s?\d{4}|\d{4}\s?\d{6}\s?\d{5}"
            title="A valid card number required"
            minLength={15}
            maxLength={19}
            onChange={numberChange}
            onFocus={() => handleFocus(".cardNumber")}
            onBlur={() => handleBlur(".cardNumber")}
            id="numberInput" //for the label
            className="formInput"
            placeholder="---- ---- ---- ----"
            required
          />
          <p className="unvalid">unvalid card number</p>
        </div>

        <div className="input-group ig2">
          <label htmlFor="nameInput">Card Holder name</label>
          <input
            onChange={nameChange}
            onFocus={() => handleFocus(".cardHolder")}
            onBlur={() => handleBlur(".cardHolder")}
            id="nameInput"
            className="formInput"
            placeholder="e.g John Doe"
            required
          />
          <p className="unvalid">unvalid cardholder name</p>
        </div>

        <div className="spaceBetween">
          {/*this is used to align items responsively to the screen, else it'd be unresponsive and bulky*/}

          <div className="input-group ig3">
            <label htmlFor="monthInput">Exp. Date</label>
            <input
              pattern="\d{2}"
              minLength={2}
              maxLength={2}
              onChange={monthChange}
              onFocus={() => handleFocus(".monthDate")}
              onBlur={() => handleBlur(".monthDate")}
              id="monthInput"
              className="formInput dateInput"
              placeholder="MM"
              required
            />
            <input
              pattern="\d{2}"
              minLength={2}
              maxLength={2}
              onChange={yearChange}
              onFocus={() => handleFocus(".yearDate")}
              onBlur={() => handleBlur(".yearDate")}
              id="yearInput"
              className="formInput dateInput"
              placeholder="YY"
              required
            />
            <p className="unvalid">unvalid expiry date</p>
          </div>

          <div className="input-group ig4">
            <label htmlFor="cvcInput">CVC</label>
            <input
              pattern="\d{3,4}"
              minLength={3}
              maxLength={4}
              onChange={cvcChange}
              onFocus={() => handleFocus(".cvcArea")}
              onBlur={() => handleBlur(".cvcArea")}
              id="cvcInput"
              className="formInput"
              placeholder="---"
              required
            />
            <p className="unvalid">unvalid Cvc number</p>
          </div>
        </div>
        <input
          className="submitButton"
          type="submit"
          value="Confirm"
        />
      </form>
    </>
  )
}

export default Form
