
import { NavLink } from "react-router-dom";

function LandingPage() {
  return (
    <>
     <div className="flex items-center justify-between flex-wrap bg-purple-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
            <span className="font-semibold text-xl tracking-tight">Croissant United Bank</span>
        </div>
         <div className="flex gap-4">
             <div>
                 <NavLink to="/login" className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-light-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Login</NavLink>
             </div>
             <div>
                 <NavLink to="/signup" className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-light-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</NavLink>
             </div>
         </div>
     </div>
     <div className="bg-white">
  <div className="relative isolate px-6 pt-14 lg:px-8">
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div className="text-base font-semibold leading-7 text-purple-600">
          Experience a tast of financial excellence with Croissant United Bank
        </div>
      </div>
      <div className="text-center pt-6">
        <img
          src="/CroissantLogo.PNG"
          className="w-full"
          alt="Bank Logo"/>
        <br/>
        <p className="mt-6 text-lg leading-8 text-gray-600">Sign up in 2 minutes! Unlock these features, when you open a Croissant United Checking Account: </p>
        <br/>
        <li>No Monthly fees or late fees</li>
        <br/>
        <li>No minimum balances</li>
      </div>
    </div>
  </div>
</div>
<div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-purple-600">Investments</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Save. Invest. Retire well</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Start saving today to meet your future goals. The key is to start
                as early as you can and invest consistently over time. At Croissant United Bank
                we make it our life goal, to help you rech your life goals.
              </p>
            </div>
          </div>
          <img
            src="https://i2.cdn.turner.com/money/dam/assets/180516153902-start-investing-780x439.jpg"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple no-tricks accounts</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Better banking is just a few steps away.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-purple-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Find an ATM ASAP</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Find thousands of fee-free ATMs at stores like Walgreens, 7-Eleven, CVS Pharmacy
              & more. Thats more than the top 3 national banks combined.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">We'll pay you to join</h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-purple-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">Recieve $350 when you open a new checking account</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">$350</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                </p>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br/>
      <br/>
      <br/>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl text-center">
      Ready to go?
      Join today!
    </h1>
     <div className="mt-10 flex items-center justify-center gap-x-6">
          <NavLink to="/signup" className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Get started</NavLink>
        </div>
    </div>
    </>
  );
}

export default LandingPage;
