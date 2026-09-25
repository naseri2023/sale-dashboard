import TotalProfit from "./components/TotalProfitCard.jsx";
import TotalSale from "./components/TotalSaleCard.jsx";
import TopProducts from "./components/TopProductsCard.jsx";
import TopDiscounts from "./components/TopDiscounts.jsx";
import SalesCategory from "./components/SalesByCategoryChart.jsx";
import SalesByRegion from "./components/SalesByRegion.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DiscountSale from "./components/DiscountVsQuantity.jsx";
import PriceSale from "./components/PriceVsQuantity.jsx";

import Login from "./pages/Login.jsx";
import { Routes, Route } from 'react-router-dom';
import RegionCategory from "./components/RegionCategoryBreakdown.jsx";
import RegionCategoryTable from "./components/RegionCategoryTable.jsx";



function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">داشبورد تحلیل فروش</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <TotalProfit/>
                <TotalSale/>
                <TopProducts/>
                <TopDiscounts/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SalesCategory/>
                <SalesByRegion/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <RegionCategory/>
                <RegionCategoryTable/>
            </div>
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={
                <ProtectedRoute>
                    <Dashboard/>
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default App;