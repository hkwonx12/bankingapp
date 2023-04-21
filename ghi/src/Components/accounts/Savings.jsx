import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleTotalAmountChange, handleInterestRateChange, handleAccountNumberChange,
         handleRoutingNumberChange, handleOwnerIdChange } from "../Components/features/accounts/savingsSlice";
import { useSavingsMutation } from "../services/savings";
import ErrorNotification from "../ErrorNotification";


const Savings = () => {
    const { data } = useGet

    return <>
        <div className="row">
            <div className="offset-3 col-9">
                <div className="shadow p-6 mt-5">
                    <h1>Savings Account</h1>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th>Total Amount</th>
                                <th>Interest Rate</th>
                            </tr>
                        </thead>

                        <tbody>
                                {autos.filter(auto => auto.is_sold === false).map(auto => {
                                    return (
                                        <tr key={ auto.id }>
                                            <td>{ auto.vin }</td>
                                            <td>{ auto.color }</td>
                                            <td>{ auto.year }</td>
                                            <td>{ auto.model.name }</td>
                                            <td>{ auto.model.manufacturer.name }</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}
