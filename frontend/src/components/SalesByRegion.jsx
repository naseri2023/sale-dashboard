import { useEffect, useState } from "react";
import api from '../services/api.js'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function SalesRegion () {
    const [ salesRegion, setSalesRegion] = useState([])
    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

    useEffect(() => {
        api.get('/sales/kpi/by-region', ).then((res) => {
            setSalesRegion(res.data);
        }).catch(() => {});
    }, []);

    return(
        <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">Sale by Region</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={salesRegion}
                        dataKey="totalSale"
                        nameKey="_id"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {salesRegion.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )

}

export default SalesRegion;