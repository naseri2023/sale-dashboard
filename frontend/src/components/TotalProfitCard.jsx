import { useEffect, useState } from "react";
import api from '../services/api.js'

function TotalProfit() {
    const [ totalProfit, setTotalProfit] = useState(0)

    useEffect(() => {
        api.get('/sales/kpi/total-profit').then((res) => {
            setTotalProfit(res.data.totalProfit)
        }).catch(() => {});
    }, []);

    return(
        <>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                <h2 className="text-lg font-bold text-gray-700">Total Profit</h2>
                <span className="text-3xl font-bold text-green-600">{totalProfit}</span>
            </div>
        </>
    )

}

export default TotalProfit;