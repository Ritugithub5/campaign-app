import { Link } from 'react-router-dom';

export default function CampaignCard({ c }) {
  const pct = c.goalAmount
    ? Math.min(100, Math.round((c.raisedAmount / c.goalAmount) * 100))
    : 0;

  return (
    <Link
      to={`/campaign/${c._id}`}
      className="block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
    >
      <div className="h-40 bg-gray-200 relative">
        {c.imageUrl ? (
          <img
            src={c.imageUrl}
            alt={c.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-emerald-100 to-emerald-200">
            📢
          </div>
        )}
        {c.category && (
          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur text-xs font-medium text-gray-700 px-2 py-0.5 rounded-full">
            {c.category}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900">{c.title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{c.message}</p>
        <div className="mt-3">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>${c.raisedAmount} raised</span>
            <span>Goal ${c.goalAmount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}