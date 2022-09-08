import "./cards.css"

const cards = () => {
  return (
    <>
      <h1 style={{color: 'red'}}>Under Construction</h1>

      {/*The Front Side */}

      <div className="smartCard theFront">
        <img
          className="basicLogo"
          alt="Basic Logo"
          src={require("../../Assets/DiamondLogo.png")}
        ></img>

        <h2 className="Brand">Expensive Banks</h2>

        <p className="cardNumber">0000 0000 0000 0000</p>

        <p className="cardHolder">JOHN DOE</p>

        <div className="expDate">
          <span className="monthDate">00</span>/
          <span className="yearDate">00</span>
        </div>
      </div>

      {/*The Back Side */}

      <div className="smartCard theBack">
        <div className="blackBar"></div>

        <p className="cvcArea">000</p>

        <div className="littleLines">
          <div className="bigLine"> </div>
          <div className="smallerLine"> </div>
          <div className="bigLine"> </div>
          <div className="smallLine"> </div>
          <div className="smallerLine"> </div>
          <div className="bigLine"> </div>
          <div className="smallerLine"> </div>
        </div>
      </div>
    </>
  )
}

export default cards
