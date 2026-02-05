import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className=" p-3 " id="supportWrapper">
        <h4 style={{ marginLeft: "100px",marginTop:"8px" }}>Support Portal</h4>
        <a href="" style={{ marginRight: "200px" ,marginTop:"10px"}}>Track Tickets</a>
      </div>
      <div className="row  p-5 m-3 ">
        <div className="col-6  p-5 ">
          <h1 className="fs-5" style={{ lineHeight: "2rem" }}>
            Search for an answer or browse help topics to create a ticket
          </h1>
          <input
            style={{
              marginTop: "10px",
              width: "90%",
              padding: "12px 16px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
            placeholder="Eg: how do i activate F&O, why is my order getting rejected..."
          />
          <br />
          <a href="" className="me-2" >Track account opening</a> 
          <a href="" className="me-2">Track segment activation</a>
          <a href="" className="me-2">Intraday</a>
          <a href="" className="me-2">margins </a>
          <a href="" className="me-2">Kite user manual</a>
        </div>
        <div className="col-6  p-5 ">
          <h1 className="fs-3">Featured</h1>
          <ol>
            {" "}
            <li style={{marginBottom:"15px"}}>
              <a href="" >
                Current Takeovers and Delisting - January 2024
              </a>
            </li>
            <li>
              <a href="">
                Latest Intraday leverages - MIS & CO
              </a>{" "}
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
