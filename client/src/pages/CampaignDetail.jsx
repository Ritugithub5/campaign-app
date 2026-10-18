import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCampaign, contribute } from '../api';

export default function CampaignDetail() {
  const { id } = useParams();
  const [c, setC] = useState(null);
  const [amount, setAmount] = useState(50);
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getCampaign(id).then(setC).catch(() => setC(null));
  }, [id]);

  const onContribute = async () => {
    setBusy(true);
    setMsg('');
    try {
      const res = await contribute(id, Number(amount));
      if (res.campaign) {
        setC(res.campaign);
        setMsg(`✅ Contributed $${amount} toward distribution`);
      } else {
        setMsg('❌ Something went wrong');
      }
    } catch (err) {
      setMsg('❌ ' + err.message);
    } finally {
      setBusy(false);
    }
  };

  if (!c) return <p className="p-4">Loading…</p>;

  const pct = c.goalAmount
    ? Math.min(100, Math.round((c.raisedAmount / c.goalAmount) * 100))
    : 0;

  return (
    <div className="p-4 space-y-4">
      <Link to="/" className="text-emerald-600 text-sm">
        ← Back
      </Link>

      {c.imageUrl && (
        <img
          src={c.imageUrl}
          alt={c.title}
          className="w-full h-56 object-cover rounded-xl"
        />
      )}

      <div>
        {c.category && (
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
            {c.category}
          </span>
        )}
        <h1 className="text-2xl font-bold mt-1">{c.title}</h1>
      </div>

      <p className="text-gray-700">{c.message}</p>

      {c.story && (
        <div className="bg-white rounded-xl p-3 border">
          <h2 className="font-semibold mb-1">Story</h2>
          <p className="text-sm text-gray-700">{c.story}</p>
        </div>
      )}

      {c.sources?.length > 0 && (
        <div className="bg-white rounded-xl p-3 border">
          <h2 className="font-semibold mb-1">Sources</h2>
          <ul className="list-disc list-inside text-sm text-emerald-700">
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

      <div className="bg-white rounded-xl p-3 border">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span>${c.raisedAmount} raised</span>
          <span>Goal ${c.goalAmount}</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Reach: {c.reachDelivered.toLocaleString()} / {c.reachTarget.toLocaleString()}
        </p>
      </div>

      <div className="bg-white rounded-xl p-3 border">
        <p className="text-xs text-gray-500 mb-2">
          ℹ️ Contributions fund <b>distribution</b>, not the cause itself.
        </p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border rounded-lg px-3 py-2 w-24"
          />
          <button
            onClick={onContribute}
            disabled={busy}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg px-4 py-2 font-medium"
          >
            {busy ? 'Contributing…' : 'Contribute'}
          </button>
        </div>
        {msg && <p className="text-sm mt-2">{msg}</p>}
      </div>

      <Link
        to={`/campaign/${id}/report`}
        className="block text-center text-emerald-600 text-sm underline"
      >
        View amplification report →
      </Link>
    </div>
  );
}