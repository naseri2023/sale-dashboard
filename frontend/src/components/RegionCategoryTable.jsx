import { useEffect, useState } from "react";
import api from '../services/api.js'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function RegionCategoryTable () {
    const [ regionCategoryData, setRegionCategoryData] = useState([])

    useEffect(() => {
        api.get('/sales/kpi/region-category' ).then((res) => {
            setRegionCategoryData(res.data);
        }).catch(() => {});
    }, []);

    return(
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">Sale by Region & Category</h2>
            <table className="w-full mt-6 text-sm text-right">
                <thead>
                <tr className="border-b border-gray-200">
                    <th className="p-2">Region</th>
                    <th className="p-2">Electronics</th>
                    <th className="p-2">Furniture</th>
                    <th className="p-2">Clothing</th>
                    <th className="p-2">Food</th>
                </tr>
                </thead>
                <tbody>
                {regionCategoryData.map((row) => (
                    <tr key={row.region} className="border-b border-gray-100">
                        <td className="p-2 font-bold">{row.region}</td>
                        <td className="p-2">{row.Electronics?.toLocaleString()}</td>
                        <td className="p-2">{row.Furniture?.toLocaleString()}</td>
                        <td className="p-2">{row.Clothing?.toLocaleString()}</td>
                        <td className="p-2">{row.Food?.toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )

}

export default RegionCategoryTable;