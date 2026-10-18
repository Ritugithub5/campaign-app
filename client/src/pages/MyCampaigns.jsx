import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCampaigns, reviewCampaign } from '../api';

export default function MyCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [busy, setBusy] = useState(null);

  const load = () =>
    getAllCampaigns().then((d) => setCampaigns(Array.isArray(d) ? d : []));

  useEffect(() => {
    load();
  }, []);

  const approve = async (id) => {
    setBusy(id);
    await reviewCampaign(id, 'approved');
    await load();
    setBusy(null);
  };

  const reject = async (id) => {
    setBusy(id);
    await reviewCampaign(id, 'rejected');
    await load();
    setBusy(null);
  };

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-2xl font-bold">Track</h1>
      <p className="text-sm text-gray-500 -mt-2 mb-2">
        Funding &amp; distribution progress.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
        🔧 <b>Admin panel:</b> approve pending campaigns to make them appear in Discover.
      </div>

      {campaigns.length === 0 && (
        <p className="text-gray-500 text-center py-8">No campaigns yet.</p>
      )}

      {campaigns.map((c) => {
        const pct = c.goalAmount
          ? Math.min(100, Math.round((c.raisedAmount / c.goalAmount) * 100))
          : 0;
        return (
          <div key={c._id} className="bg-white rounded-xl border p-3 space-y-2">
            <Link to={`/campaign/${c._id}`} className="block">
              <p className="font-medium">{c.title}</p>
              <p className="text-xs text-gray-500 mt-1">
                ${c.raisedAmount} / ${c.goalAmount} ·{' '}
                <span
                  className={
                    c.status === 'pending'
                      ? 'text-amber-600'
                      : c.status === 'approved'
                      ? 'text-emerald-600'
                      : 'text-gray-500'
                  }
                >
                  {c.status}
                </span>
              </p>
              <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </Link>

            {c.status === 'pending' && (
              <div className="flex gap-2 pt-1">
                <button
                  disabled={busy === c._id}
                  onClick={() => approve(c._id)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm rounded-lg py-1.5"
                >
                  {busy === c._id ? 'Working…' : 'Approve'}
                </button>
                <button
                  disabled={busy === c._id}
                  onClick={() => reject(c._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-sm rounded-lg py-1.5"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}