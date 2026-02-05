 import React from 'react';
 
 function Universe() {
    return ( 
           <div className="container mt-5">
            <div className="row text-center">
      <div className="row text-center ">
         <h1>The Zerodha Universe</h1>
         <p>Extend your trading and investment experience even further with our partner platforms</p>
        </div>
        <div className="col-4 p-3 ">
          <img src="media/images/smallcaseLogo.png" className="mb-3"/>
          <p className='text-small text-muted'>Thematic investiment platform</p>
        </div>
         <div className="col-4 p-3">
         <img src="media/images/streakLogo.png " style={{width:"30%", marginTop:"16px"}} className="mb-3"/>
         <p className='text-small text-muted'>Algo & strategy platform</p>
        </div>
         <div className="col-4 p-3">
          <img src="media/images/sensibullLogo.svg" style={{width:"50%", marginTop:"16px"}} className="mb-3" />
         <p className='text-small text-muted'>Options trading platform</p>
        </div>
         <div className="col-4 p-3 mt-5">
          <img src="media/images/zerodhaFundhouse.png" style={{width:"50%"}} className="mb-3"/>
          <p className='text-small text-muted'>Asset management</p>
        </div>
         <div className="col-4 p-3 mt-5">
         <img src="media/images/goldenpiLogo.png" className="mb-3"/>
         <p className='text-small text-muted'>Bonds trading platform</p>
        </div>
         <div className="col-4 p-3 mt-5">
          <img src="media/images/dittoLogo.png" style={{width:"30%"}} className="mb-3" />
         <p className='text-small text-muted'>Insurance</p>
        </div>
        <button className='p-2 btn btn-primary fs-5 mb-5' style={{width:"18%",margin:"0 auto"}}>Signup Now</button>
        </div>
      </div>
  

     );
 }
 
 export default Universe;