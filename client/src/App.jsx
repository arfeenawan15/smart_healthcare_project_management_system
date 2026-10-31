// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import DashboardView from './components/DashboardView';
import InitiationView from './components/InitiationView';
import ScopeView from './components/ScopeView';
import ScheduleView from './components/ScheduleView';
import CostEVMView from './components/CostEVMView';
import QualityRiskView from './components/QualityRiskView';
import ReportModal from './components/ReportModal';
import {
  fetchDashboard,
  resetDatabase,
  approveChangeRequest
} from './api';

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['dashboard', 'initiation', 'scope', 'schedule', 'cost', 'quality'].includes(tabParam)) {
      return tabParam;
    }
    const hash = window.location.hash.replace('#', '');
    if (hash && ['dashboard', 'initiation', 'scope', 'schedule', 'cost', 'quality'].includes(hash)) {
      return hash;
    }
    return 'dashboard';
  });
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['dashboard', 'initiation', 'scope', 'schedule', 'cost', 'quality'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const loadDashboard = async () => {
    setRefreshing(true);
    try {
      const data = await fetchDashboard();
      if (data.success) {
        setDashboard(data);
      }
    } catch (err) {
      console.error("Error fetching dashboard:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleReset = async () => {
    if (!window.confirm("Reset database back to initial Case Study baseline (16 weeks, PKR 5,000,000 budget, pending AI & Mobile CRs)?")) {
      return;
    }
    try {
      const res = await resetDatabase();
      alert(res.message);
      await loadDashboard();
    } catch (err) {
      alert("Error resetting database: " + err.message);
    }
  };

  const handleQuickApproveCR = async () => {
    try {
      const res1 = await approveChangeRequest('CR-001');
      const res2 = await approveChangeRequest('CR-002');
      alert(`Scope Change Applied Successfully!\n${res1.message}\n${res2.message}`);
      await loadDashboard();
    } catch (err) {
      alert("Error applying scope changes: " + err.message);
    }
  };

  const handleSingleApproveCR = async (id) => {
    try {
      const res = await approveChangeRequest(id);
      alert(res.message);
      await loadDashboard();
    } catch (err) {
      alert("Error approving CR: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800">
      {/* 1. Left Vertical Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dashboard={dashboard}
        onReset={handleReset}
        onQuickApproveCR={handleQuickApproveCR}
        onOpenReport={() => setShowReport(true)}
      />

      {/* 2. Main Workspace Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Top Header */}
        <TopHeader
          activeTab={activeTab}
          dashboard={dashboard}
          onOpenReport={() => setShowReport(true)}
          onQuickApproveCR={handleQuickApproveCR}
        />

        {/* View Content */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-3">
              <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-teal-600"></div>
              <p className="text-xs text-slate-500 font-medium">Loading Smart Healthcare SPM System...</p>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <DashboardView
                  dashboard={dashboard}
                  onNavigate={setActiveTab}
                  onApproveCR={handleSingleApproveCR}
                  refreshing={refreshing}
                />
              )}
              {activeTab === 'initiation' && (
                <InitiationView onRefresh={loadDashboard} />
              )}
              {activeTab === 'scope' && (
                <ScopeView onRefresh={loadDashboard} />
              )}
              {activeTab === 'schedule' && (
                <ScheduleView onRefresh={loadDashboard} />
              )}
              {activeTab === 'cost' && (
                <CostEVMView onRefresh={loadDashboard} />
              )}
              {activeTab === 'quality' && (
                <QualityRiskView onRefresh={loadDashboard} />
              )}
            </>
          )}
        </main>

        {/* Subtle Bottom Bar */}
        <footer className="border-t border-slate-200 bg-white py-3 px-6 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 no-print">
          <div>
            <strong>Smart Healthcare Project Management System</strong> • 5 Hospitals Network
          </div>
          <div className="flex items-center space-x-2 text-slate-400">
            <span>Baseline: 16 Wks / PKR 5.0M</span>
            <span>•</span>
            <span>Scope Change: +3 Wks / +PKR 800k</span>
            <span>•</span>
            <span className="font-semibold text-teal-600">MERN Stack</span>
          </div>
        </footer>
      </div>

      {/* Printable Report Modal */}
      {showReport && (
        <ReportModal
          dashboard={dashboard}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
}
