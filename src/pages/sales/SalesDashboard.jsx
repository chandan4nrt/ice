export default function SalesDashboard() {
  console.log("user>>>>>")

  return (
    <div className="min-h-screen bg-[#040a10] text-white">

      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 bg-[#0b1627]">
        <h1 className="font-bold text-xl">User Dashboard</h1>
      </div>

      <div className="p-4">

        {/* Welcome */}
        <div className="bg-[#121b2b] rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">
            Welcome Back 👋
          </h2>
          <p className="text-gray-400 text-sm">
            Track your orders and manage requests.
          </p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-2 gap-3">

          <div className="bg-[#121b2b] p-4 rounded-xl">
            <p className="text-xs text-gray-400">My Orders</p>
            <h2 className="text-3xl font-bold text-blue-400">12</h2>
          </div>

          <div className="bg-[#121b2b] p-4 rounded-xl">
            <p className="text-xs text-gray-400">Pending</p>
            <h2 className="text-3xl font-bold text-yellow-400">3</h2>
          </div>

        </div>

      </div>

    </div>
  );
}