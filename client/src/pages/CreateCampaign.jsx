import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCampaign } from '../api';

const emptyForm = {
  title: '',
  message: '',
  story: '',
  imageUrl: '',
  category: 'Other',
  goalAmount: 1000,
  reachTarget: 10000,
};

export default function CreateCampaign() {
  const [form, setForm] = useState(emptyForm);
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg('');
    try {
      const res = await createCampaign({
        ...form,
        goalAmount: Number(form.goalAmount),
        reachTarget: Number(form.reachTarget),
        creatorId: '64b000000000000000000001', // Demo User
      });
      if (res._id) {
        setMsg('✅ Submitted! Awaiting admin review.');
        setForm(emptyForm);
        setTimeout(() => navigate('/admin'), 1500); // Send to admin page to approve
      } else {
        setMsg('❌ ' + (res.error || 'Unknown error'));
      }
    } catch (err) {
      setMsg('❌ ' + err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-4 space-y-3">
      <h1 className="text-2xl font-bold">Create Campaign</h1>
      <p className="text-sm text-gray-500 -mt-2 mb-2">
        Submit your message for amplification.
      </p>

      <input
        name="title"
        value={form.title}
        onChange={onChange}
        placeholder="Campaign title"
        required
        className="w-full border rounded-lg px-3 py-2"
      />

      <textarea
        name="message"
        value={form.message}
        onChange={onChange}
        placeholder="The core message you want people to see"
        required
        rows="2"
        className="w-full border rounded-lg px-3 py-2"
      />

      <textarea
        name="story"
        value={form.story}
        onChange={onChange}
        placeholder="Story / context / why this matters"
        rows="3"
        className="w-full border rounded-lg px-3 py-2"
      />

      {/* IMAGE URL WITH PREVIEW */}
      <div className="space-y-1">
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={onChange}
          placeholder="Cover image URL (optional, e.g. https://...)"
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Preview"
            className="w-full h-32 object-cover rounded-lg border"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}
      </div>

      <select
        name="category"
        value={form.category}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
      >
        <option>Water</option>
        <option>Health</option>
        <option>Education</option>
        <option>Environment</option>
        <option>Community</option>
        <option>Other</option>
      </select>

      <div className="flex gap-2">
        <input
          type="number"
          name="goalAmount"
          value={form.goalAmount}
          onChange={onChange}
          placeholder="Goal ($)"
          min="1"
          required
          className="w-1/2 border rounded-lg px-3 py-2"
        />
        <input
          type="number"
          name="reachTarget"
          value={form.reachTarget}
          onChange={onChange}
          placeholder="Reach target"
          min="1"
          required
          className="w-1/2 border rounded-lg px-3 py-2"
        />
      </div>

      <button
        disabled={busy}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg py-2 font-medium"
      >
        {busy ? 'Submitting…' : 'Submit for review'}
      </button>

      {msg && <p className="text-sm font-medium text-emerald-600 text-center">{msg}</p>}
    </form>
  );
}