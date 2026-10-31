// client/src/components/ScheduleView.jsx
import React, { useState, useEffect } from 'react';
import {
  fetchActivities,
  fetchTeam,
  updateActivity
} from '../api';
import {
  Clock,
  AlertTriangle,
  Calendar,
  Users
} from 'lucide-react';

export default function ScheduleView({ onRefresh }) {
  const [activities, setActivities] = useState([]);
  const [team, setTeam] = useState([]);
  const [scheduleInfo, setScheduleInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('gantt'); // 'gantt', 'table', 'resources'

  const loadAll = async () => {
    setLoading(true);
    try {
      const [actRes, teamRes] = await Promise.all([
        fetchActivities(),
        fetchTeam()
      ]);
      if (actRes.success) {
        setActivities(actRes.activities);
        setScheduleInfo({
          projectForecastEndWeek: actRes.projectForecastEndWeek,
          deadlineWeeks: actRes.deadlineWeeks,
          isScheduleOverrun: actRes.isScheduleOverrun,
          projectDelayWeeks: actRes.projectDelayWeeks,
          delayedActivitiesCount: actRes.delayedActivitiesCount
        });
      }
      if (teamRes.success) setTeam(teamRes.team);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleUpdateProgress = async (actId, newProgress) => {
    try {
      const res = await updateActivity(actId, { progress: Number(newProgress) });
      if (res.success) {
        await loadAll();
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      alert("Error updating progress: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  const maxTimelineWeek = Math.max(19, scheduleInfo?.deadlineWeeks || 16, scheduleInfo?.projectForecastEndWeek || 16);
  const weeksArray = Array.from({ length: maxTimelineWeek }, (_, i) => i + 1);
  const currentWeek = 12;

  return (
    <div className="space-y-4">
      {/* Subnav Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex space-x-1 bg-slate-200/80 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveTab('gantt')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'gantt' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Gantt Timeline
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'table' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Activities & Precedence ({activities.length})
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'resources' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Team Workload ({team.length})
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Current Progress: Week 12
        </div>
      </div>

      {/* Compact Schedule Impact Strip */}
      <div className="bg-white rounded-lg border border-slate-200 px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Schedule Ripple Effect:</strong> Testing defects in appointment race condition (DEF-001) & EMR sync (DEF-002) delay <strong>ACT-09</strong> by 2 weeks, pushing dependent deployment (<strong>ACT-10</strong>) to Week 16.
          </span>
        </div>
        <div className="font-semibold text-slate-700 whitespace-nowrap text-[11px]">
          Deadline: {scheduleInfo?.deadlineWeeks}w • Forecast: <strong className="text-amber-700">Wk {scheduleInfo?.projectForecastEndWeek}</strong>
        </div>
      </div>

      {/* 1. COMPACT GANTT TIMELINE */}
      {activeTab === 'gantt' && (
        <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
            <span className="font-bold text-slate-800">Timeline Schedule (Weeks 1 to {maxTimelineWeek})</span>
            <div className="flex items-center space-x-3 text-[11px] text-slate-500">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded bg-emerald-500"></span>
                <span>Completed</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded bg-blue-500"></span>
                <span>In Progress</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded bg-rose-500"></span>
                <span>Delayed</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded bg-purple-500"></span>
                <span>Change Request</span>
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[780px]">
              {/* Week Grid Header */}
              <div className="grid grid-cols-12 gap-1 mb-1.5 text-center text-[10px] font-mono font-bold text-slate-500">
                <div className="col-span-4 text-left pl-1">Activity</div>
                <div className="col-span-8 grid" style={{ gridTemplateColumns: `repeat(${maxTimelineWeek}, minmax(0, 1fr))` }}>
                  {weeksArray.map((wk) => (
                    <div
                      key={wk}
                      className={`py-0.5 rounded ${
                        wk === currentWeek
                          ? 'bg-teal-600 text-white font-bold'
                          : wk === scheduleInfo?.deadlineWeeks
                          ? 'bg-slate-300 text-slate-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      W{wk}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rows */}
              <div className="space-y-1.5">
                {activities.map((act) => {
                  const startCol = act.calculatedStartWeek || act.startWeek;
                  const endCol = act.calculatedEndWeek || act.endWeek;
                  const span = Math.max(1, endCol - startCol + 1);

                  const isCRTask = act.id === "ACT-11" || act.id === "ACT-12";
                  const isDelayed = act.isDelayed;
                  const isCompleted = act.status === "Completed";

                  let barColor = "bg-blue-500";
                  if (isCompleted) barColor = "bg-emerald-500";
                  else if (isDelayed) barColor = "bg-rose-500";
                  else if (isCRTask) barColor = "bg-purple-500";

                  return (
                    <div
                      key={act.id}
                      className="grid grid-cols-12 gap-1 items-center hover:bg-slate-50/70 p-0.5 rounded text-xs transition-colors"
                    >
                      <div className="col-span-4 pr-2 flex items-center space-x-1.5 truncate">
                        <span className="font-mono text-[10px] text-slate-500 w-11 flex-shrink-0 font-bold">{act.id}</span>
                        <span className="font-medium text-slate-800 truncate text-[11px]">{act.name}</span>
                      </div>

                      <div
                        className="col-span-8 grid relative items-center h-6 bg-slate-50 rounded border border-slate-100"
                        style={{ gridTemplateColumns: `repeat(${maxTimelineWeek}, minmax(0, 1fr))` }}
                      >
                        {/* Current week line */}
                        <div
                          className="absolute top-0 bottom-0 border-r-2 border-teal-500 z-10 pointer-events-none opacity-50"
                          style={{ left: `${((currentWeek - 0.5) / maxTimelineWeek) * 100}%` }}
                        />

                        {/* Bar */}
                        <div
                          className={`relative h-4.5 rounded shadow-xs flex items-center px-1 text-[9px] font-bold text-white transition-all overflow-hidden ${barColor}`}
                          style={{
                            gridColumnStart: startCol,
                            gridColumnEnd: `span ${span}`,
                          }}
                        >
                          <div
                            className="absolute top-0 bottom-0 left-0 bg-black/20"
                            style={{ width: `${act.progress}%` }}
                          />
                          <span className="relative z-10 truncate">{act.progress}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. COMPACT ACTIVITIES TABLE */}
      {activeTab === 'table' && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-2 px-3">Act ID</th>
                <th className="py-2 px-3">Activity Name</th>
                <th className="py-2 px-3">Assigned To</th>
                <th className="py-2 px-3 text-center">Dur</th>
                <th className="py-2 px-3 text-center">Scheduled</th>
                <th className="py-2 px-3">Predecessors</th>
                <th className="py-2 px-3 text-center">Status</th>
                <th className="py-2 px-3 text-center">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activities.map((act) => (
                <tr key={act.id} className="hover:bg-slate-50/60">
                  <td className="py-2 px-3 font-mono font-bold text-slate-600">{act.id}</td>
                  <td className="py-2 px-3">
                    <span className="font-semibold text-slate-900">{act.name}</span>
                    <span className="text-[10px] text-slate-400 block">WBS: {act.wbsCode}</span>
                  </td>
                  <td className="py-2 px-3 text-slate-700">{act.assignedTo}</td>
                  <td className="py-2 px-3 text-center font-bold">{act.durationWeeks}w</td>
                  <td className="py-2 px-3 text-center text-slate-600 font-mono text-[11px]">
                    Wk {act.startWeek}-{act.endWeek}
                  </td>
                  <td className="py-2 px-3">
                    {act.dependencies && act.dependencies.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {act.dependencies.map((d) => (
                          <span key={d} className="px-1 py-0.2 bg-slate-100 text-slate-600 rounded font-mono text-[10px]">
                            {d}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400 italic text-[11px]">None</span>
                    )}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      act.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      act.status === 'Delayed' ? 'bg-rose-100 text-rose-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {act.status}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <div className="flex items-center justify-center space-x-1.5">
                      <span className="font-mono text-[10px] w-6 text-right">{act.progress}%</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={act.progress}
                        onChange={(e) => handleUpdateProgress(act.id, e.target.value)}
                        className="w-14 accent-teal-600 cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. COMPACT TEAM RESOURCE WORKLOAD */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {team.map((m) => (
            <div key={m.id} className="bg-white rounded-lg border border-slate-200 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">{m.name}</h4>
                  <p className="text-[10px] text-slate-500">{m.role}</p>
                </div>
                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-bold">
                  {m.capacityHoursPerWeek}h/wk
                </span>
              </div>
              <div className="bg-slate-50 p-2 rounded text-[11px] space-y-0.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Assigned Tasks:</span>
                  <span className="font-bold text-slate-800">{m.assignedTasksCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Tasks:</span>
                  <span className="font-bold text-teal-700">{m.activeTasksCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Budget:</span>
                  <span className="font-mono font-bold text-slate-800">PKR {m.totalPlannedCostPKR.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
