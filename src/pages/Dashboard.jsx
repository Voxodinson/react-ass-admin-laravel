import React, { useState, useEffect } from 'react';
import {
  BarChart,
  ShoppingCart,
  Users,
  DollarSign,
  Package,
  CalendarDays,
  TrendingUp,
} from 'lucide-react';

import apiHandle from '../services/apiHandle';
import axios from 'axios';
import { format } from 'date-fns';

const Dashboard = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [salesByDay, setSalesByDay] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [customerInsights, setCustomerInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiHandle.get('dashboard/overview');
            setOverviewData(response.general_overview);
            setRecentOrders(response.recent_orders);
            setSalesByDay(response.sales_by_day);
            setTopSellingProducts(response.top_selling_products);
            setCustomerInsights(response.customer_insights);
        } catch (err) {
            setError(err.message || 'Failed to fetch dashboard data');
            console.error('Error fetching dashboard data:', err);
        } finally {
            setLoading(false);
        }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="bg-gray-100 min-h-screen p-6 flex justify-center items-center">Loading dashboard data...</div>;
    }

    if (error) {
        return <div className="bg-gray-100 min-h-screen p-6 text-red-500">Error: {error}</div>;
    }

    if (!overviewData) {
        return <div className="bg-gray-100 min-h-screen p-6">No dashboard data available.</div>;
    }

    return (
        <div 
            className="h-[92vh] bg-white rounded-md mt-2 border-gray-200 border-[1px] overflow-auto p-3">
            <section 
                className="grid grid-cols-4 gap-3 *:border-[1px] *:border-gray-200">
                <div 
                    className=" bg-white rounded-lg p-6 flex items-center justify-between">
                    <div 
                        className="flex items-center space-x-4">
                        <div 
                            className="p-3 bg-indigo-100 rounded-full">
                            <ShoppingCart 
                                className="text-indigo-500 w-6 h-6" />
                        </div>
                        <div>
                            <h3 
                                className="text-lg font-semibold text-gray-700">
                                Total Orders
                            </h3>
                            <p 
                                className="text-gray-500">
                                {overviewData.total_orders}
                            </p>
                        </div>
                    </div>
                </div>
                <div 
                    className="bg-white rounded-lg p-6 flex items-center justify-between">
                    <div 
                        className="flex items-center space-x-4">
                        <div 
                            className="p-3 bg-green-100 rounded-full">
                            <DollarSign 
                                className="text-green-500 w-6 h-6" />
                        </div>
                        <div>
                            <h3 
                                className="text-lg font-semibold text-gray-700">
                                Total Revenue
                            </h3>
                            <p 
                                className="text-gray-500">
                                ${overviewData.total_revenue}
                            </p>
                        </div>
                    </div>
                </div>
                <div 
                    className="bg-white rounded-lg p-6 flex items-center justify-between">
                    <div 
                        className="flex items-center space-x-4">
                        <div 
                            className="p-3 bg-blue-100 rounded-full">
                            <Users 
                                className="text-blue-500 w-6 h-6" />
                        </div>
                        <div>
                            <h3 
                                className="text-lg font-semibold text-gray-700">
                                New Customers
                            </h3>
                            <p 
                                className="text-gray-500">
                                {overviewData.new_customers}
                            </p>
                        </div>
                    </div>
                </div>
                <div 
                    className="bg-white rounded-lg p-6 flex items-center justify-between">
                    <div 
                        className="flex items-center space-x-4">
                        <div 
                            className="p-3 bg-yellow-100 rounded-full">
                            <Package 
                                className="text-yellow-500 w-6 h-6" />
                        </div>
                        <div>
                            <h3 
                                className="text-lg font-semibold text-gray-700">
                                Products Sold
                            </h3>
                            <p 
                                className="text-gray-500">
                                {overviewData.total_products_sold}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div 
                className="flex flex-col gap-3 mt-3">
                <div 
                    className=" p-3 rounded-md border-[1px] border-gray-200 bg-[#E4EFE7]">
                    <h2 
                        className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                        <ShoppingCart 
                            className="text-gray-600 w-5 h-5" />
                        <span>
                            Recent Orders
                        </span>
                    </h2>
                    <div 
                        className="overflow-x-auto border-[1px] border-gray-200 rounded-md overflow-hidden">
                        <table 
                            className="w-full z-40">
                            <thead
                                className='bg-[#5F99AE]'>
                                <tr className='*:text-white *:px-4 *:py-3 *:text-left *:text-xs *:font-semibold *:uppercase *:tracking-wider'>
                                    <th >
                                        Order ID
                                    </th>
                                    <th >
                                        Customer
                                    </th>
                                    <th >
                                        Order Date
                                    </th>
                                    <th >
                                        Total
                                    </th>
                                    <th >
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map(order => (
                                    <tr key={order.id}>
                                        <td 
                                            className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                            #{order.id}
                                        </td>
                                        <td 
                                            className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                            {order.user?.name || 'Guest'}
                                        </td>
                                        <td 
                                            className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                            {format(new Date(order.created_at), 'yyyy-MM-dd')}
                                        </td>
                                        <td 
                                            className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                            ${order.total_amount}
                                        </td>
                                        <td 
                                            className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                            <span 
                                                className={`inline-block py-1 px-2 rounded-full text-xs font-semibold capitalize ${
                                                    order.payment_status === 'paid' ? 'bg-green-200 text-green-800' :
                                                    order.payment_status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                                                    'bg-red-200 text-red-800'
                                                }`}>
                                                {order.payment_status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {recentOrders.length === 0 && (
                                    <tr>
                                        <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm text-gray-500" colSpan="5">No recent orders.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 border-[1px] border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                        <TrendingUp 
                            className="text-gray-600 w-5 h-5" />
                        <span>
                            Sales Overview (Last 30 Days)
                        </span>
                    </h2>
                    {salesByDay.length > 0 ? (
                        <div 
                            className="h-64">
                            <p 
                                className="text-gray-600">
                                {salesByDay.map(sale => `$${sale.daily_sales}`).join(', ')}
                            </p>
                            <div 
                                className="flex justify-start items-end h-full">
                               {salesByDay.map(sale => {
                                    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                                    return (
                                        <div
                                            key={sale.sale_day}
                                            className="rounded-t-md w-fit px-2 flex items-end "
                                            style={{
                                                height: `${(sale.daily_sales / Math.max(...salesByDay.map(s => s.daily_sales)) * 100) || 10}%`,
                                                backgroundColor: randomColor
                                            }}>
                                            <span
                                                className="block text-white ">
                                                {format(new Date(sale.sale_day), 'dd')} <br/>
                                                {format(new Date(sale.sale_day), 'MMM')}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">
                            No sales data available for the last 30 days.
                        </p>
                    )}
                </div>
            </div>

            <div 
                className="mt-3 mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div 
                    className=" border-[1px] border-gray-200 rounded-lg p-3 bg-blue-400 *:text-white">
                    <h2 
                        className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                        <Package 
                            className="text-white w-5 h-5" />
                        <span>
                            Top Selling Products
                        </span>
                    </h2>
                    <ul>
                        {
                            topSellingProducts.length > 0 ? (
                            topSellingProducts.map(product => (
                                <li key={product.product_id} className="py-2 border-b last:border-b-0">
                                    <span 
                                        className="font-semibold text-white">
                                        {product.product?.name || 'N/A'}
                                    </span> - Sold: {product.total_sold}
                                </li>
                            ))) : (
                                <li 
                                    className="text-gray-500">
                                    No product sales data available.
                                </li>
                            )
                        }
                    </ul>
                </div>

                <div className=" border-[1px] border-gray-200 rounded-lg p-3 bg-blue-400 *:text-white">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                        <Users 
                            className="text-white w-5 h-5" />
                        <span>
                            Customer Insights (Last Month)
                        </span>
                    </h2>
                    {customerInsights ? (
                        <div>
                            <p className="text-white">
                                <span 
                                    className="font-semibold">
                                    New Customers:
                                </span> 
                                &ensp;
                                {customerInsights.new_customers_last_month}
                            </p>
                            <p className="textwhite">
                                <span className="font-semibold">
                                    Returning Customers:
                                </span> 
                                &ensp;
                                {customerInsights.returning_customers_last_month}
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-500">
                            No customer insights available.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;