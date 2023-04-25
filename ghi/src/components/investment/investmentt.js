// import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
// import { useEffect, useState } from 'react';

// function InvestmentInformation() {
//     const {token, user} = useAuthContext();
//     const [investmentTotal, setInvestmentTotal] = useState([]);
//     const [stock, setStock] = useState([])

//     const getData = async () => {
//         const response = await fetch(`http://localhost:8000/api/investment_account/${owner_id}`,
//         {headers: {Authorization: `Bearer ${token}`}});

//         if (response.ok){
//             const data = await response.json();
//             investmentTotal(data.total_amount)
//         }
//     };
//     const getStockData = async () => {
//         const response = await fetch('http://localhost:8000/api/stock/QQQ')
//         if (response.ok){
//             const stockData = await response.json()
//             setStock(stockData)
//         }

//     }

//     useEffect(() => {
//         if (token) getData();
//         if (user){

//         }
//     }, [token, user]);
// return (
//     <></>
// )
// }
// export default InvestmentInformation
