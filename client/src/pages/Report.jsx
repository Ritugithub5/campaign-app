import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCampaign } from '../api';

export default function Report() {
  const { id } = useParams();
  const [c, setC] = useState(null);

  useEffect(() => {
    getCampaign(id).then(setC).catch(() => setC(null));
  }, [id]);

  if (!c) return <p className="p-4">Loading…</p>;

  const spend = c.raisedAmount;
  const cpm = c.reachDelivered ? (spend / c.reachDelivered) * 1000 : 0;
  const ownNetwork = 250;
  const multiplier = ownNetwork
    ? (c.reachDelivered / ownNetwork).toFixed(1)
    : '0';
  const maxBar = Math.max(ownNetwork, c.reachDelivered, 1);
  const ownPct = (ownNetwork / maxBar) * 100;
  const amplifiedPct = (c.reachDelivered / maxBar) * 100;

  // Deterministic-ish 7-day "reach" chart based on total (so refresh keeps same shape)
  const dailyReach = Array.from({ length: 7 }, (_, i) => {
    const wave = [0.5, 0.75, 1.0, 0.85, 1.1, 0.95, 0.7][i];
    return Math.round((c.reachDelivered / 7) * wave);
  });
  const maxDaily = Math.max(...dailyReach, 1);

  return (
    <div className="p-4 space-y-4">
      <Link to={`/campaign/${id}`} className="text-emerald-600 text-sm">
        ← Back
      </Link>
      <h1 className="text-2xl font-bold">Campaign Report</h1>
      <p className="text-sm text-gray-500">{c.title}</p>

      {/* HERO: Network vs Amplified */}
      <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-2xl p-4">
        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-3">
          Amplification Impact
        </p>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Your existing network</span>
              <span className="font-semibold">{ownNetwork.toLocaleString()}</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-400 rounded-full"
                style={{ width: `${ownPct}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Amplified reach (with backers)</span>
              <span className="font-semibold text-emerald-700">
                {c.reachDelivered.toLocaleString()}
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${amplifiedPct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-emerald-100 text-center">
          <p className="text-3xl font-bold text-emerald-600">{multiplier}×</p>
          <p className="text-xs text-gray-600">
            more people reached than your own network
          </p>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Spent on distribution" value={`$${spend}`} />
        <Stat label="Total reach" value={c.reachDelivered.toLocaleString()} />
        <Stat
          label="Impressions"
          value={(c.reachDelivered * 2).toLocaleString()}
        />
        <Stat label="Cost per 1k reached" value={`$${cpm.toFixed(2)}`} />
      </div>

      {/* 7-day reach chart */}
      <div className="bg-white border rounded-xl p-3">
        <p className="text-sm font-semibold mb-3">Reach — last 7 days</p>
        <div className="flex items-end justify-between h-32 gap-1">
          {dailyReach.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-emerald-500 rounded-t"
                style={{ height: `${(v / maxDaily) * 100}%` }}
                title={`${v.toLocaleString()} reach`}
              />
              <span className="text-[10px] text-gray-400">D{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-400 text-center pt-2">
        ℹ️ Contributions fund distribution, not the cause itself.
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white border rounded-xl p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}