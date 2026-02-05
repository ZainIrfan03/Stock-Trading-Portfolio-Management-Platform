import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div className="row p-5  mt-5 text-center border-top">
        <div className="col-8 p-4 ">
          <h1 className="fs-5">
            <a href="" style={{ textDecoration: "none" }}>
              Brokerage calculator
            </a>
          </h1>
          <ul style={{ textAlign: "left", lineHeight: "2.5",fontSize:"12px"  }} className="text-muted pt-4">
            <li>
              Call & Trade and RMS auto-squareoff: Additional charges of 250 GST
              per order
            </li>
            <li>Digital contract notes will be sent via e-mail</li>
            <li>
              Physical copies of contract notes, if required, shall be charged
              220 per contract note. Courier charges apply.
            </li>
            <li>
              For NR1 account (non-PIS), 0.5% or 2100 per executed order for
              equity (whichever is lower).
            </li>
            <li>
              For NRI account (PIS), 0.5% or 7200 per executed order for equity
              (whichever is lower)
            </li>
            <li>
              If the account is in debit balance, any order placed will be
              charged 240 per executed order instead of 20 per executed order
            </li>
          </ul>
        </div>
        <div className="col-4 p-4">
          <h1 className="fs-5">
            <a href="" style={{ textDecoration: "none" }}>
              List of charges
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
