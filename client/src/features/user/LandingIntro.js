import Lottie from "lottie-react";
import animationData from "../../assets/88044-car-safety-edit.json";

function LandingIntro() {
  return (
    <div className='hero min-h-full rounded-l-xl bg-base-200'>
      <div className='hero-content py-12'>
        <div className='max-w-md'>
          <h1 className='text-3xl text-center font-bold '>
            <img
              src='/logo192.png'
              className='w-12 inline-block mr-2 mask mask-circle'
              alt='dailymotors-logo'
            />
            DailyMotors
          </h1>

          <div className='text-center mt-12'>
            <Lottie animationData={animationData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingIntro;
