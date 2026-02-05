 import React from 'react';
 
 function RightSection({
  imageURL,
  productName,
  productDescription,
  learnMore,

}) {
    return (
     <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <div mt-3>
           <a href={learnMore} style={{textDecoration: 'none'}}>
              learnMore 
            </a>
          </div>
        </div>
        <div className="col-6 p-5">
          <img src={imageURL} style={{ width: "100%" }} />
        </div>
        
      </div>
    </div> );
 }
 
 export default RightSection;