import { useEffect, useState } from 'react';
import { getCampaigns } from '../api';
import CampaignCard from '../components/CampaignCard';

const CATEGORIES = ['All', 'Water', 'Health', 'Education', 'Environment', 'Community'];

export default function Discover() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    getCampaigns()
      .then((data) => {
        setCampaigns(Array.isArray(data) ? data : []);
      })
      .catch(() => setCampaigns([]))
      .finally(() => setLoading(false));
  }, []);

  const visible =
    filter === 'All' ? campaigns : campaigns.filter((c) => c.category === filter);

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-2xl font-bold">Discover</h1>
      <p className="text-sm text-gray-500 -mt-2">
        Amplify messages beyond your network.
      </p>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`whitespace-nowrap text-xs px-3 py-1.5 rounded-full border transition ${
              filter === cat
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border p-4 animate-pulse">
              <div className="w-full h-40 bg-gray-200 rounded-xl mb-3" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-full mb-1" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
            </div>
          ))}
        </div>
      )}

      {!loading && visible.length === 0 && (
        <div className="text-center py-12">
          <p className="text-4xl mb-2">🔍</p>
          <p className="text-gray-500">No campaigns in this category yet.</p>
        </div>
      )}

      {!loading &&
        visible.map((c) => <CampaignCard key={c._id} c={c} />)}
    </div>
  );
}