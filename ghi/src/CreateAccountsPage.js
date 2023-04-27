import CreateDepositForm from "./components/checking/createDeposit";
import CreateSavingsDepositForm from "./components/savings/createSavingsDeposit";
import CreateInvestmentDepositForm from "./components/investment/investmentDeposit";
import{Link} from "react-router-dom"

function CreateAccountsPage() {

    return (
        <>
        <section>
            <div className="flex items-center justify-between flex-wrap bg-purple-500 p-6">
                <h1 className="text-white text-lg font-bold font-serif">Croissant United Bank</h1>
                <button className="text-white"><Link to="/mainpage"> Return To Dashboard</Link></button>
            </div>
            <div>
                <div className="grid grid-cols-3 gap-8 py-24">
                    <div className="md:w-8/12 lg:ml-6 ">
                        <CreateDepositForm />
                    </div>
                        <div className="md:w-8/12 lg:ml-6 ">
                            <CreateSavingsDepositForm />
                        </div>
                        <div className="md:w-8/12 lg:ml-6 ">
                        <CreateInvestmentDepositForm />
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
export default CreateAccountsPage;
