import React from "react";

export default function Testimonial() {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content flex-col lg:flex-row'>
        <div className='mockup-phone border-primary'>
          <div className='camera'></div>
          <div className='display'>
            <div className='artboard artboard-demo phone-1'>
              <img src='/fuel-gif.gif' className='max-w-container  shadow-2xl' />
            </div>
          </div>
        </div>

        <div>
          <h1 className='text-5xl font-bold'>Box Office News!</h1>
          <p className='py-6'>
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button className='btn btn-primary'>Get Started</button>
        </div>
      </div>
    </div>
  );
}
