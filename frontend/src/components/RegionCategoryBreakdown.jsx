import { useEffect, useState } from "react";
import api from '../services/api.js'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function RegionCategory () {
    const [ regionCategory, setRegionCategory] = useState([])

    useEffect(() => {
        api.get('/sales/kpi/region-category' ).then((res) => {
            setRegionCategory(res.data);
        }).catch(() => {});
    }, []);

    return(
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">Sale by Region & Category</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionCategory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Electronics" stackId="a" fill="#3B82F6" />
                    <Bar dataKey="Furniture" stackId="a" fill="#10B981" />
                    <Bar dataKey="Clothing" stackId="a" fill="#F59E0B" />
                    <Bar dataKey="Food" stackId="a" fill="#EF4444" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )

}

export default RegionCategory;