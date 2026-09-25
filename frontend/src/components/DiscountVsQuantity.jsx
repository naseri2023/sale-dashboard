import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import api from '../services/api.js'
import { useEffect, useState } from "react";

function DiscountSale () {
    const [ discountSale, setDiscountSale] = useState([])

    useEffect(() => {
        api.get('/sales' ).then((res) => {
            setDiscountSale(res.data);
        }).catch(() => {});
    }, []);

    return(
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">Sale by Discount</h2>
            <ResponsiveContainer width="100%" height={300}>
                <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="discount" name="Discount" />
                    <YAxis dataKey="quantitySold" name="Quantity Sold" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter data={discountSale} fill="#3B82F6" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    )

}

export default DiscountSale;