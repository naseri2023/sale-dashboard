import { useEffect, useState } from "react";
import api from '../services/api.js'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function SalesCategory () {
    const [ salesCategory, setSalesCategory] = useState([])
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const params = {};
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;

        api.get('/sales/kpi/by-category', { params }).then((res) => {
            setSalesCategory(res.data);
        }).catch(() => {});
    }, [startDate, endDate]);

    return(
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center ">Top Sale Category by Date</h2>

            <div className="flex gap-2 mb-4">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min="2023-01-01"
                    max="2024-01-01"
                    className="border border-gray-300 rounded-md p-1 text-sm"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min="2023-01-01"
                    max="2024-01-01"
                    className="border border-gray-300 rounded-md p-1 text-sm"
                />
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesCategory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip />
                    <Bar dataKey="totalSale" fill="#3B82F6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )

}

export default SalesCategory;