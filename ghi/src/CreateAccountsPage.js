import CreateCheckingAccountForm from "./components/checking/createCheckingAccount";
import CreateSavingsAccountForm from "./components/savings/createSavingsAccount";
import CreateInvestmentAccountForm from "./components/investment/createInvestmentAccount";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import{Link} from "react-router-dom"



function CreateAccountsPage() {

    const {token} = useAuthContext();

        return token && (
            <>
            <section>
                <div className="flex items-center justify-between flex-wrap bg-purple-500 p-6">
                    <h1 className="text-white text-lg font-bold font-serif">Croissant United Bank</h1>
                    <button className="text-white"><Link to="/mainpage"> View your mainpage here</Link></button>
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-8 py-24 px-24">
                        <div className=" md:w-8/12 lg:ml-6 ">
                            <CreateCheckingAccountForm />
                        </div>
                            <div className="pb-10 md:w-8/12 lg:ml-6 ">
                                <CreateSavingsAccountForm />
                            </div>
                            <div className=" md:w-8/12 lg:ml-6 ">
                            <CreateInvestmentAccountForm />
                        </div>
                    </div>
                </div>
            </section>
            </>
        )

}
export default CreateAccountsPage;
