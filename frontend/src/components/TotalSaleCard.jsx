import { useEffect, useState } from "react";
import api from '../services/api.js'

function TotalSale() {
    const [ totalSale, setTotalSale] = useState(0)

    useEffect(() => {
        api.get('/sales/kpi/total-sale').then((res) => {
            setTotalSale(res.data.totalSale)
        }).catch(() => {});
    }, []);

    return(
        <>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                <h2 className="text-lg font-bold text-gray-700">Total Sale</h2>
                <span className="text-3xl font-bold text-green-600">{totalSale}</span>
            </div>
        </>
    )


}

export default TotalSale;