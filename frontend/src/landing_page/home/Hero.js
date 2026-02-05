import React from 'react';

function Hero() {
  return (
  <div>
    <div className='container p-5 mb-5 '>
      <div className='row text-center'>
       <img src="media/images/homeHero.png" alt="Hero Image"  className='mb-5'/>
        <h1 className='mt-5 '>Invest In Everything</h1>
        <p>Online Platoform to invest in stocks,derivatives,mutual funds and more</p>
        <button className='p-2 btn btn-primary fs-5 mb-5' style={{width:"18%",margin:"0 auto"}}>Signup Now</button>
      </div>
    </div>
  </div>
  );
}

export default Hero;
