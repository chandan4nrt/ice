import { useState } from "react";

const ORDERS = [
  { id:"REP58475", items:1, qty:15, status:"Completed" },
  { id:"REP78459", items:4, qty:52, status:"In Process" },
  { id:"REP68485", items:2, qty:24, status:"Rejected" }
];

export default function AdminDashboard() {

  const [slide,setSlide] = useState(0);

  return (
    <div className="min-h-screen bg-[#040a10] text-white">

      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 bg-[#0b1627]">
        <h1 className="font-bold text-xl">Admin Dashboard</h1>
        <div className="text-sm text-gray-400">Inventory Panel</div>
      </div>

      <div className="p-4">

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">

          <div className="bg-[#121b2b] p-4 rounded-xl">
            <p className="text-xs text-gray-400">Total Stock</p>
            <h2 className="text-3xl font-bold text-green-400">325</h2>
          </div>

          <div className="bg-[#121b2b] p-4 rounded-xl">
            <p className="text-xs text-gray-400">Total Sales</p>
            <h2 className="text-3xl font-bold text-yellow-400">284</h2>
          </div>

        </div>

        {/* Orders */}
        <h2 className="font-bold mb-3">Recent Orders</h2>

        <div className="space-y-3">

          {ORDERS.map(o => (
            <div key={o.id} className="bg-[#121b2b] p-4 rounded-xl">

              <div className="flex justify-between">

                <p className="font-bold">
                  Request ID: <span className="text-blue-300">{o.id}</span>
                </p>

                <span className="text-xs bg-green-500 px-2 py-1 rounded">
                  {o.status}
                </span>

              </div>

              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>Items: {o.items}</span>
                <span>Qty: {o.qty}</span>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}