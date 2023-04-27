import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { useEffect, useState } from 'react';
import CheckingAccount from './components/checking/checkingAccount';
import SavingsAccount from './components/savings/savingsAccount';
import InvestmentAccountDetail from './components/investment/investmentAccountDetail';

function MainPage() {

    return (
      <>
        <CheckingAccount />
        <SavingsAccount />
        <InvestmentAccountDetail />
      </>
    )
}


export default MainPage;
