import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Discover from './pages/Discover';
import CampaignDetail from './pages/CampaignDetail';
import CreateCampaign from './pages/CreateCampaign';
import MyCampaigns from './pages/MyCampaigns';
import Report from './pages/Report';
import Admin from './pages/Admin'; // NEW

export default function App() {
  return (
    <BrowserRouter>
      <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-16">
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/campaign/:id" element={<CampaignDetail />} />
          <Route path="/create" element={<CreateCampaign />} />
          <Route path="/my" element={<MyCampaigns />} />
          <Route path="/campaign/:id/report" element={<Report />} />
          <Route path="/admin" element={<Admin />} /> {/* NEW */}
        </Routes>

        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="max-w-md mx-auto flex justify-around py-2 text-[10px]">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1 ${
                  isActive ? 'text-emerald-600 font-semibold' : 'text-gray-500'
                }`
              }
            >
              <span className="text-lg">🔍</span>
              <span>Discover</span>
            </NavLink>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1 ${
                  isActive ? 'text-emerald-600 font-semibold' : 'text-gray-500'
                }`
              }
            >
              <span className="text-lg">➕</span>
              <span>Create</span>
            </NavLink>
            <NavLink
              to="/my"
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1 ${
                  isActive ? 'text-emerald-600 font-semibold' : 'text-gray-500'
                }`
              }
            >
              <span className="text-lg">📊</span>
              <span>Track</span>
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1 ${
                  isActive ? 'text-emerald-600 font-semibold' : 'text-gray-500'
                }`
              }
            >
              <span className="text-lg">🛡️</span>
              <span>Admin</span>
            </NavLink>
          </div>
        </nav>
      </div>
    </BrowserRouter>
  );
}