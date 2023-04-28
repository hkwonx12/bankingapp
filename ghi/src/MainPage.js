import CheckingAccount from './components/checking/checkingAccount';
import SavingsAccount from './components/savings/savingsAccount';
import InvestmentAccountDetail from './components/investment/investmentAccountDetail';
import useToken from "@galvanize-inc/jwtdown-for-react";


function MainPage() {
    const { login } = useToken();
    const { token } = useToken();

    return token && (
      <>
        <CheckingAccount />
        <SavingsAccount />
        <InvestmentAccountDetail />
      </>
    )
}


export default MainPage;
