// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { handleTotalAmountChange, handleOwnerIdChange, reset } from "../features/accounts/checkingSlice";
// import { useCreateCheckingAccountMutation } from "../services/checking";
// import ErrorNotification from '../ErrorNotification'

// const CreateCheckingAccount = () => {
//     const dispatch = useDispatch()
//     const [createCheckingAccount] = useCreateCheckingAccountMutation()
//     const { errorNotification, fields } = useSelector(state => state.createCheckingAccount)

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         const {total_amount, owner_id} = fields;
//         createCheckingAccount ({
//             total_amount,
//             owner_id,

//         })
//         dispatch(reset())
//     }
//     console.log(fields)
//     return (
//         <div className="card">
//             <div className="card-body">
//                 <h5 className="card-title">Total Amount</h5>
//                 <hr />
//                 <form onSubmit={handleSubmit}>
//                     {errorNotification && <ErrorNotification>{errorNotification}</ErrorNotification>}
//                     <div className="mb-3">
//                         <label htmlFor="CreateCheckingAccount__total_amount" className='form-label'>
//                             Total Amount:
//                         </label>
//                         <input
//                             className="form-control form-control-sm"
//                             type={`number`}
//                             id='CreateCheckingAccount_total_amount'
//                             value={fields.total_amount}
//                             onChange={e => dispatch(handleTotalAmountChange(e.target.value))}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="CreateCheckingAccount__owner_id" className='form-label'>
//                             Owner ID:
//                         </label>
//                         <input
//                             className="form-control form-control-sm"
//                             type={`number`}
//                             id='CreateCheckingAccount__owner_id'
//                             value={fields.owner_id}
//                             onChange={e => dispatch(handleOwnerIdChange(e.target.value))}
//                         />
//                     </div>
//                     <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Create Checking Account</button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default CreateCheckingAccount;
