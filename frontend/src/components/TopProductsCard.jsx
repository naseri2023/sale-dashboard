import { useEffect, useState } from "react";
import api from '../services/api.js'

function TopProducts() {
    const [ topProducts, setTopProducts] = useState([])

    useEffect(() => {
        api.get('/sales/kpi/top-product').then((res) => {
            setTopProducts(res.data)
        }).catch(() => {});
    }, []);

    return(
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4">Top Products</h2>
            <ul className="space-y-2">
                {topProducts.map((product) => (
                    <li key={product._id} className="flex justify-between items-center text-sm text-gray-600 border-b border-gray-100 pb-2">
                        <span>محصول {product._id}</span>
                        <span className="font-bold text-blue-600">{product.totalQuantity} عدد</span>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default TopProducts;