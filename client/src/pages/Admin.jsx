import { useEffect, useState } from 'react';
import { getPendingCampaigns, getRejectedCampaigns, reviewCampaign } from '../api';

export default function Admin() {
  const [tab, setTab] = useState('pending');
  const [pending, setPending] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [notes, setNotes] = useState('');
  const [checks, setChecks] = useState({
    notMisleading: false,
    hasSources: false,
    notDonation: false,
    noProhibited: false,
  });

  const load = async () => {
    setLoading(true);
    const [p, r] = await Promise.all([
      getPendingCampaigns(),
      getRejectedCampaigns(),
    ]);
    setPending(Array.isArray(p) ? p : []);
    setRejected(Array.isArray(r) ? r : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setOpenId(null);
    setNotes('');
    setChecks({
      notMisleading: false,
      hasSources: false,
      notDonation: false,
      noProhibited: false,
    });
  };

  const handleReview = async (id, status) => {
    await reviewCampaign(id, {
      status,
      reviewedBy: 'Admin',
      reviewNotes: notes,
      checklist: checks,
    });
    resetForm();
    await load();
  };

  const list = tab === 'pending' ? pending : rejected;

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-2xl font-bold">Review Queue</h1>
      <p className="text-sm text-gray-500 -mt-2 mb-2">
        Check eligibility before promoting.
      </p>

      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setTab('pending')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${
            tab === 'pending'
              ? 'bg-emerald-600 text-white'
              : 'bg-white border text-gray-700'
          }`}
        >
          Pending ({pending.length})
        </button>
        <button
          onClick={() => setTab('rejected')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${
            tab === 'rejected'
              ? 'bg-red-600 text-white'
              : 'bg-white border text-gray-700'
          }`}
        >
          Rejected ({rejected.length})
        </button>
      </div>

      {loading && <p className="text-center text-gray-500 py-4">Loading…</p>}

      {!loading && list.length === 0 && (
        <div className="text-center text-gray-500 py-10 bg-white rounded-xl border">
          <p className="text-3xl mb-2">✅</p>
          <p className="font-medium">All clear!</p>
          <p className="text-sm">No {tab} campaigns.</p>
        </div>
      )}

      {list.map((c) => {
        const isOpen = openId === c._id;
        return (
          <div key={c._id} className="bg-white rounded-xl border p-3 shadow-sm">
            <p className="font-semibold">{c.title}</p>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{c.message}</p>

            {tab === 'pending' && (
              <button
                onClick={() => {
                  if (isOpen) resetForm();
                  else setOpenId(c._id);
                }}
                className="mt-2 text-sm text-emerald-600 font-medium"
              >
                {isOpen ? '▲ Close review' : '▼ Open review checklist'}
              </button>
            )}

            {isOpen && (
              <div className="mt-3 space-y-3 border-t pt-3">
                {c.story && (
                  <div>
                    <p className="text-xs font-semibold text-gray-600">Story</p>
                    <p className="text-sm">{c.story}</p>
                  </div>
                )}
                {c.sources?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-600">Sources</p>
                    <ul className="list-disc list-inside text-xs text-emerald-700">
                      {c.sources.map((s, i) => (
                        <li key={i}>
                          <a href={s.url} target="_blank" rel="noreferrer">
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    Eligibility checklist
                  </p>
                  {[
                    ['notMisleading', 'Message is not misleading'],
                    ['hasSources', 'Supporting sources provided'],
                    ['notDonation', 'Not a direct donation solicitation'],
                    ['noProhibited', 'No prohibited content'],
                  ].map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 text-sm py-1">
                      <input
                        type="checkbox"
                        checked={checks[key]}
                        onChange={(e) =>
                          setChecks({ ...checks, [key]: e.target.checked })
                        }
                      />
                      {label}
                    </label>
                  ))}
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    Reviewer notes (optional)
                  </p>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows="2"
                    placeholder="Any context for the decision…"
                    className="w-full border rounded-lg px-2 py-1 text-sm"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleReview(c._id, 'approved')}
                    className="flex-1 bg-emerald-600 text-white rounded-lg py-2 text-sm font-medium"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleReview(c._id, 'rejected')}
                    className="flex-1 bg-red-600 text-white rounded-lg py-2 text-sm font-medium"
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            )}

            {tab === 'rejected' && c.reviewNotes && (
              <p className="mt-2 text-xs text-gray-500 bg-red-50 p-2 rounded">
                <b>Notes:</b> {c.reviewNotes}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}