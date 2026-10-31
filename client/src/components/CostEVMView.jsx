// client/src/components/CostEVMView.jsx
import React, { useState, useEffect } from 'react';
import {
  fetchEVM,
  fetchCostBreakdown,
  updateActivity
} from '../api';
import {
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Edit2,
  Check,
  Calculator
} from 'lucide-react';

export default function CostEVMView({ onRefresh }) {
  const [evmData, setEvmData] = useState(null);
  const [breakdown, setBreakdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingActId, setEditingActId] = useState(null);
  const [editActualCost, setEditActualCost] = useState(0);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [evmRes, costRes] = await Promise.all([
        fetchEVM(),
        fetchCostBreakdown()
      ]);
      if (evmRes.success) setEvmData(evmRes);
      if (costRes.success) setBreakdown(costRes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleSaveCost = async (actId) => {
    try {
      await updateActivity(actId, { actualCostPKR: Number(editActualCost) });
      setEditingActId(null);
      await loadAll();
      if (onRefresh) onRefresh();
    } catch (err) {
      alert("Error saving actual cost: " + err.message);
    }
  };

  if (loading || !evmData) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  const { evm } = evmData;
  const isCostOverrun = evm.CPI < 1.0;
  const isScheduleDelayed = evm.SPI < 1.0;

  return (
    <div className="space-y-4">
      {/* 1. THRESHOLD WARNING BANNER */}
      {(isCostOverrun || isScheduleDelayed) && (
        <div className="p-3 rounded-lg bg-rose-50/70 border border-rose-200 text-xs text-rose-900 flex items-start space-x-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Automated Performance Alert:</strong> CPI is <strong>{evm.CPI}</strong> (Cost Overrun: CV -PKR {Math.abs(evm.CV).toLocaleString()}) and SPI is <strong>{evm.SPI}</strong> (Schedule Delay: SV -PKR {Math.abs(evm.SV).toLocaleString()}). Forecasted completion cost is <strong>PKR {evm.EAC.toLocaleString()}</strong>, an anticipated overrun of <strong>PKR {Math.abs(evm.VAC).toLocaleString()}</strong>.
          </div>
        </div>
      )}

      {/* 2. COMPACT EVM 4-CORE METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="bg-white p-3 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold">
            <span>Planned Value (PV)</span>
            <span>BCWS</span>
          </div>
          <div className="text-lg font-bold text-slate-900 mt-1">
            PKR {evm.PV.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Scheduled to Wk {evm.currentWeek}</div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold">
            <span>Earned Value (EV)</span>
            <span className="text-indigo-600 font-bold">BCWP</span>
          </div>
          <div className="text-lg font-bold text-indigo-700 mt-1">
            PKR {evm.EV.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">{evm.overallPercentComplete}% Work Complete</div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold">
            <span>Actual Cost (AC)</span>
            <span>ACWP</span>
          </div>
          <div className="text-lg font-bold text-slate-900 mt-1">
            PKR {evm.AC.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Expended to date</div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold">
            <span>Budget at Completion</span>
            <span className="text-teal-600 font-bold">BAC</span>
          </div>
          <div className="text-lg font-bold text-teal-700 mt-1">
            PKR {evm.BAC.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Total approved budget</div>
        </div>
      </div>

      {/* 3. PERFORMANCE INDICES & FORMULAS (Compact Split Table) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Indices Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-200 font-bold text-slate-800">
            EVM Performance Summary
          </div>
          <table className="w-full text-left">
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2 px-3 text-slate-600 font-medium">Cost Index (CPI = EV / AC)</td>
                <td className={`py-2 px-3 text-right font-mono font-bold ${evm.CPI < 1 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {evm.CPI}
                </td>
                <td className="py-2 px-3 text-slate-500 text-[11px]">
                  {evm.CPI < 1 ? 'Over Budget' : 'Within Budget'}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-600 font-medium">Schedule Index (SPI = EV / PV)</td>
                <td className={`py-2 px-3 text-right font-mono font-bold ${evm.SPI < 1 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {evm.SPI}
                </td>
                <td className="py-2 px-3 text-slate-500 text-[11px]">
                  {evm.SPI < 1 ? 'Behind Schedule' : 'On Schedule'}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-600 font-medium">Cost Variance (CV = EV - AC)</td>
                <td className={`py-2 px-3 text-right font-mono font-bold ${evm.CV < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {evm.CV < 0 ? '-' : '+'}PKR {Math.abs(evm.CV).toLocaleString()}
                </td>
                <td className="py-2 px-3 text-slate-500 text-[11px]">Direct Overrun</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-600 font-medium">Schedule Variance (SV = EV - PV)</td>
                <td className={`py-2 px-3 text-right font-mono font-bold ${evm.SV < 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {evm.SV < 0 ? '-' : '+'}PKR {Math.abs(evm.SV).toLocaleString()}
                </td>
                <td className="py-2 px-3 text-slate-500 text-[11px]">Delayed Volume</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-600 font-medium">Estimate at Completion (EAC)</td>
                <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                  PKR {evm.EAC.toLocaleString()}
                </td>
                <td className="py-2 px-3 text-slate-500 text-[11px]">Projected Cost</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-600 font-medium">Variance at Completion (VAC)</td>
                <td className={`py-2 px-3 text-right font-mono font-bold ${evm.VAC < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {evm.VAC < 0 ? '-' : '+'}PKR {Math.abs(evm.VAC).toLocaleString()}
                </td>
                <td className="py-2 px-3 text-slate-500 text-[11px]">Forecasted Deficit</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* EVM Formula Guide */}
        <div className="bg-slate-900 text-slate-300 rounded-lg p-3.5 space-y-2">
          <div className="flex items-center space-x-1.5 text-teal-400 font-bold text-xs uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Mathematical Formula Reference</span>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="bg-slate-800 p-2 rounded flex justify-between">
              <span className="text-slate-400">Cost Variance (CV):</span>
              <span className="font-mono text-teal-300 font-bold">EV - AC</span>
            </div>
            <div className="bg-slate-800 p-2 rounded flex justify-between">
              <span className="text-slate-400">Schedule Variance (SV):</span>
              <span className="font-mono text-teal-300 font-bold">EV - PV</span>
            </div>
            <div className="bg-slate-800 p-2 rounded flex justify-between">
              <span className="text-slate-400">Cost Performance (CPI):</span>
              <span className="font-mono text-teal-300 font-bold">EV / AC (Threshold: &lt; 1.0)</span>
            </div>
            <div className="bg-slate-800 p-2 rounded flex justify-between">
              <span className="text-slate-400">Schedule Performance (SPI):</span>
              <span className="font-mono text-teal-300 font-bold">EV / PV (Threshold: &lt; 1.0)</span>
            </div>
            <div className="bg-slate-800 p-2 rounded flex justify-between">
              <span className="text-slate-400">Estimate at Completion (EAC):</span>
              <span className="font-mono text-teal-300 font-bold">BAC / CPI</span>
            </div>
            <div className="bg-slate-800 p-2 rounded flex justify-between">
              <span className="text-slate-400">Variance at Completion (VAC):</span>
              <span className="font-mono text-teal-300 font-bold">BAC - EAC</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. ACTIVITY COST LEDGER TABLE */}
      {breakdown && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden text-xs">
          <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-slate-800">
            <span>Activity Cost & Earned Value Ledger</span>
            <span className="text-[11px] font-normal text-slate-500">Click pencil to edit actual expenditure</span>
          </div>

          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-600 border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-2 px-3">Act ID</th>
                <th className="py-2 px-3">Activity</th>
                <th className="py-2 px-3">Assigned</th>
                <th className="py-2 px-3 text-right">Planned (PV)</th>
                <th className="py-2 px-3 text-right">Actual Cost (AC)</th>
                <th className="py-2 px-3 text-right">Earned (EV)</th>
                <th className="py-2 px-3 text-center">CPI</th>
                <th className="py-2 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {breakdown.activityCosts.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60">
                  <td className="py-2 px-3 font-mono font-bold text-slate-600">{item.id}</td>
                  <td className="py-2 px-3 font-semibold text-slate-800">{item.name}</td>
                  <td className="py-2 px-3 text-slate-600">{item.assignedTo}</td>
                  <td className="py-2 px-3 text-right font-mono text-slate-700">
                    PKR {item.plannedCostPKR.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                    {editingActId === item.id ? (
                      <input
                        type="number"
                        step="10000"
                        value={editActualCost}
                        onChange={(e) => setEditActualCost(e.target.value)}
                        className="w-24 border border-teal-500 px-1 py-0.5 rounded text-right outline-none text-xs"
                        autoFocus
                      />
                    ) : (
                      <span>PKR {item.actualCostPKR.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="py-2 px-3 text-right font-mono text-indigo-700 font-semibold">
                    PKR {item.earnedValuePKR.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                      item.cpi < 1 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.cpi}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    {editingActId === item.id ? (
                      <button
                        onClick={() => handleSaveCost(item.id)}
                        className="text-emerald-600 hover:text-emerald-700 font-bold p-1"
                        title="Save cost"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingActId(item.id);
                          setEditActualCost(item.actualCostPKR);
                        }}
                        className="text-slate-400 hover:text-teal-600 p-1"
                        title="Edit actual cost"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
