import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#f97316", "#fb923c", "#fdba74", "#fed7aa"];

const formatNumber = (value) => {
  if (value === null || value === undefined || isNaN(Number(value))) return 0;
  return Number(value).toLocaleString("en-NG");
};

const formatCurrency = (value) => {
  if (value === null || value === undefined || isNaN(Number(value))) return "0";
  return Number(value).toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

const TicketAnalytics = ({ ticketTypes }) => {
  if (!ticketTypes || ticketTypes.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-orange-300/70 dark:border-zinc-700 bg-orange-50/40 dark:bg-zinc-900/40 px-4 py-6 text-center">
        <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
          No ticket analytics available yet
        </p>
        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          Create ticket types and start selling to see performance insights.
        </p>
      </div>
    );
  }

  const data = ticketTypes.map((ticket) => {
    const total = ticket.totalQuantity || 0;
    const available = ticket.availableQuantity || 0;
    const sold = total - available;
    const revenue = sold * (ticket.price || 0);

    return {
      name: ticket.type,
      sold,
      remaining: available,
      revenue,
    };
  });

  const totalSold = data.reduce((acc, t) => acc + t.sold, 0);
  const totalRevenue = data.reduce((acc, t) => acc + t.revenue, 0);
  const totalRemaining = data.reduce((acc, t) => acc + t.remaining, 0);

  return (
    <section className="mt-6 bg-orange-100/40 dark:bg-zinc-900/40 backdrop-blur-sm border border-orange-200/80 dark:border-zinc-700 rounded-2xl p-6 shadow-lg">
      <header className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Ticket Analytics
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Overview of ticket sales and revenue across all ticket types.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-6 items-start">
        {/* Overview stats */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/70 dark:bg-zinc-800/80 border border-orange-100 dark:border-zinc-700 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Total Sold
              </p>
              <p className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {formatNumber(totalSold)}
              </p>
            </div>
            <div className="rounded-xl bg-white/70 dark:bg-zinc-800/80 border border-orange-100 dark:border-zinc-700 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Remaining
              </p>
              <p className="mt-1 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {formatNumber(totalRemaining)}
              </p>
            </div>
            <div className="rounded-xl bg-white/70 dark:bg-zinc-800/80 border border-orange-100 dark:border-zinc-700 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Revenue
              </p>
              <p className="mt-1 text-xl font-semibold text-emerald-700 dark:text-emerald-300">
                ₦{formatCurrency(totalRevenue)}
              </p>
            </div>
          </div>

          {/* Per-ticket breakdown */}
          <div className="mt-2 rounded-xl bg-white/60 dark:bg-zinc-800/80 border border-orange-100 dark:border-zinc-700 px-4 py-3 max-h-56 overflow-y-auto">
            <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              <span>Ticket type</span>
              <span className="flex gap-6">
                <span>Sold</span>
                <span>Remaining</span>
                <span>Revenue</span>
              </span>
            </div>
            <ul className="space-y-2 text-sm">
              {data.map((ticket, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between text-zinc-800 dark:text-zinc-100"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span className="font-medium">{ticket.name}</span>
                  </div>
                  <div className="flex gap-6 text-xs sm:text-sm">
                    <span className="min-w-[60px] text-right">
                      {formatNumber(ticket.sold)}
                    </span>
                    <span className="min-w-[60px] text-right text-gray-600 dark:text-gray-400">
                      {formatNumber(ticket.remaining)}
                    </span>
                    <span className="min-w-[80px] text-right font-medium">
                      ₦{formatCurrency(ticket.revenue)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chart */}
        <div className="h-52 md:h-60 lg:h-64 rounded-xl bg-white/60 dark:bg-zinc-800/80 border border-orange-100 dark:border-zinc-700 flex items-center justify-center px-2">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="sold"
                nameKey="name"
                outerRadius="80%"
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatNumber(value)}
                labelFormatter={(label) => `Ticket type: ${label}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default TicketAnalytics;
