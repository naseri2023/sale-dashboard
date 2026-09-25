import { useEffect, useState } from "react";
import api from '../services/api.js'

function TopDiscounts() {
    const [ topDiscounts, setTopDiscounts] = useState([])

    useEffect(() => {
        api.get('/sales/kpi/top-discount').then((res) => {
            setTopDiscounts(res.data)
        }).catch(() => {});
    }, []);

    return(
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Top Discount</h2>
            <ul className="space-y-2">
                {topDiscounts.map((discount) => (
                    <li key={discount._id} className="flex justify-between items-center text-sm text-gray-600 border-b border-gray-100 pb-2">
                        <span>محصول {discount._id}</span>
                        <span className="font-bold text-blue-600">{discount.maxDiscount} درصد </span>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default TopDiscounts;