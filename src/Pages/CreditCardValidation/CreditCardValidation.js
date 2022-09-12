import "./CreditCardValidation.css"
import { addSmallShrink, addDots } from "../methods"
import { useState } from "react"

const CreditCardValidation = () => {
  //    <functions in use>
  const render = (inputQueryClass, updatedQueryClass) => {
    let data = document.querySelector(inputQueryClass).value
    document.querySelector(updatedQueryClass).innerText = data
  }

  const initializeEmpty = (queryClass, initialValue) => {
    if (document.querySelector(queryClass).value === "") {
      document.querySelector(queryClass).value = initialValue
    } else if (document.querySelector(queryClass).innerText === "") {
      document.querySelector(queryClass).innerText = initialValue
    }
  }

  const removeActive = (querySelector) => {
    if (document.querySelector(querySelector).classList.contains("active")) {
      document.querySelector(querySelector).classList.remove("active")
    }
  }
  //    </Functions in use>

  //    <Input Changes>

  const numberChange = () => {
    removeActive(".ig1 .incorrect")
    render("#numberInput", ".cardNumber")
    initializeEmpty(".cardNumber", "0000 0000 0000 0000")
  }

  const [nameDots, setNameDots] = useState()
  const nameChange = () => {
    // the world's longest name is 1000+ characters long so i will just not limit this input,
    // instead i'll make the text shrink and if it's too long have 3 dots at the end
    removeActive(".ig2 .incorrect")
    render("#nameInput", ".cardHolder")
    addSmallShrink(".cardHolder")
    addDots(".cardHolder", nameDots, setNameDots, 80)
    initializeEmpty(".cardHolder", "JOHN DOE")
    document.querySelector(".cardHolder").innerText = document
      .querySelector(".cardHolder")
      .innerText.toUpperCase()
  }

  const monthChange = () => {
    removeActive(".ig3 .incorrect")
    render("#monthInput", ".monthDate")
    initializeEmpty(".monthDate", "00")
  }

  const yearChange = () => {
    removeActive(".ig3 .incorrect")
    render("#yearInput", ".yearDate")
    initializeEmpty(".yearDate", "00")
  }

  const cvcChange = () => {
    removeActive(".ig4 .incorrect")
    render("#cvcInput", ".cvcArea")
    initializeEmpty(".cvcArea", "000")
  }
  //    </Input Changes>

  //       <Effects>

  const handleFocus = (linkedQueryClass) => {
    let style = document.querySelector(linkedQueryClass).style
    style.borderRadius = "4px"
    style.boxShadow = "0 0 0 1px white"
  }
  const handleBlur = (linkedQueryClass) => {
    document.querySelector(linkedQueryClass).style.boxShadow = "none"
  }
  //       </Effects>

  //       <Submitting>

  const handleSubmit = (e) => {
    //i could've used XMLHttpRequest Here but there's no backend server so i'll just simulate it
    //POST method goes here to send Input data but there's no backend so i'm simulating only GET.
    const data = JSON.stringify(require("./fakeBackend.json")) //here i'm simulating the initial responseText
    const parsedData = JSON.parse(data)
    //in this section if the input is tested by the backend and sent back as true, we give the
    //<p class="incorrect"> a class of 'active' and if it's active in css the <p> text will be shown.
    let Submittable = true
    Object.values(parsedData).forEach((boolean, i) => {
      if (!boolean) {
        const classes = document.querySelector(
          `.ig${i + 1} .incorrect`
        ).classList
        if (!classes.contains("active")) classes.add("active")
        Submittable = false
      }
    })
    if (!Submittable) e.preventDefault()
  }
  //      </Submitting>

  return (
    <div className="content">
      <h1 style={{ color: "red" }}>Under Construction: Responsiveness</h1>

      {/*            ----THE FORM----             */}

      <form action="#" onSubmit={handleSubmit}>
        {/*divs are used to align items horizontally without the paragraphs centered */}
        <div className="input-group ig1">
          <label htmlFor="numberInput">Card Number</label>
          <input
            pattern="\d{4}\s?\d{4}\s?\d{4}\s?\d{4}|\d{4}\s?\d{6}\s?\d{5}"
            title="Card Number"
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
          <p className="incorrect">inCorrect card number!</p>
        </div>

        <div className="input-group ig2">
          <label htmlFor="nameInput">Card Holder name</label>
          <input
            title="Cardholder Name"
            onChange={nameChange}
            onFocus={() => handleFocus(".cardHolder")}
            onBlur={() => handleBlur(".cardHolder")}
            id="nameInput"
            className="formInput"
            placeholder="e.g John Doe"
            required
          />
          <p className="incorrect">inCorrect cardholder name!</p>
        </div>

        <div className="spaceBetween">
          {/*this is used to align items responsively to the screen, else it'd be unresponsive and bulky*/}

          <div className="input-group ig3">
            <label htmlFor="monthInput">Exp. Date</label>
            <input
              pattern="\d{2}"
              title="Expiary Month"
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
              title="Expiary Year"
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
            <p className="incorrect">inCorrect expiry date!</p>
          </div>

          <div className="input-group ig4">
            <label htmlFor="cvcInput">CVC</label>
            <input
              pattern="\d{3,4}"
              title="Cvc Code"
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
            <p className="incorrect">inCorrect Cvc number!</p>
          </div>
        </div>
        <input className="submitButton" type="submit" value="Confirm" />
      </form>

      {/*            ----CREDIT CARDS----             */}

      {/*The Front Side */}

      <div className="smartCard theFront">
        <div>
          <img
            className="basicLogo"
            alt="Basic Logo"
            src={require("../../Assets/DollarLogo.png")}
          ></img>
          <h2 className="Brand">Expensive Banks</h2>
        </div>

        <p className="cardNumber">0000 0000 0000 0000</p>

        <div>
          <p className="cardHolder">JOHN DOE</p>
          <div className="expDate">
            <span className="monthDate">00</span>/
            <span className="yearDate">00</span>
          </div>
        </div>
      </div>

      {/*The Back Side */}

      <div className="smartCard theBack">
        <div className="blackBar"></div>

        <p className="cvcArea">000</p>

        <div className="littleLines">
          <div className="bigLine" />
          <div className="Line" />
          <div className="smallLine" />
          <div className="Line" />
          <div className="smallLine" />
          <div className="bigLine" />
          <div className="bigLine" />
          <div className="smallLine" />
        </div>
      </div>
    </div>
  )
}
export default CreditCardValidation
