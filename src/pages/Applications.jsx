import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  Trash2, 
  Edit3, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Save, 
  MoveRight,
  TrendingUp,
  Coins
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export default function Applications() {
  const { 
    applications, 
    addApplication, 
    updateApplicationStatus, 
    updateApplication, 
    deleteApplication 
  } = useStudent();

  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal State for New / Edit Application
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    provider: '',
    amount: '₹1,50,000 / year',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'Interested',
    notes: '',
  });

  const columns = [
    { id: 'Interested', title: 'Interested', color: 'border-slate-300 dark:border-slate-700' },
    { id: 'Preparing', title: 'Preparing', color: 'border-amber-400' },
    { id: 'Submitted', title: 'Submitted', color: 'border-blue-400' },
    { id: 'Under Review', title: 'Under Review', color: 'border-indigo-400' },
    { id: 'Approved', title: 'Approved', color: 'border-emerald-500' },
    { id: 'Rejected', title: 'Rejected', color: 'border-rose-400' },
  ];

  const handleOpenAddModal = () => {
    setEditingApp(null);
    setFormData({
      title: '',
      provider: '',
      amount: '₹1,50,000 / year',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Interested',
      notes: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (app) => {
    setEditingApp(app);
    setFormData({
      title: app.title,
      provider: app.provider,
      amount: app.amount,
      deadline: app.deadline,
      status: app.status,
      notes: app.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingApp) {
      updateApplication(editingApp.id, formData);
    } else {
      addApplication(formData);
    }
    setIsModalOpen(false);
  };

  // Filtered Applications
  const filteredApps = applications.filter((app) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = app.title.toLowerCase().includes(q) || (app.provider || '').toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Approved funding summary
  const approvedCount = applications.filter(a => a.status === 'Approved').length;
  const inReviewCount = applications.filter(a => ['Submitted', 'Under Review'].includes(a.status)).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-theme-card border border-theme shadow-theme-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge-pill bg-theme-secondary text-theme-main text-xs font-bold">
              Student Command Center
            </span>
            <span className="text-xs text-theme-muted">
              • Total Tracked: <strong>{applications.length} Applications</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-theme-main font-heading">
            Application Pipeline & Tracker
          </h1>
          <p className="text-xs sm:text-sm text-theme-muted max-w-xl">
            Track your student scholarship applications through each milestone from initial interest to final award disbursement.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="btn-primary px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-theme-sm self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Application</span>
        </button>
      </div>

      {/* Quick Status Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-theme-card border border-theme shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted">Total Tracked</span>
          <div className="text-2xl font-black text-theme-main font-heading">{applications.length}</div>
        </div>
        <div className="p-4 rounded-2xl bg-theme-card border border-theme shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted">In Scrutiny / Review</span>
          <div className="text-2xl font-black text-indigo-600 font-heading">{inReviewCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-theme-card border border-theme shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted">Approved Awards</span>
          <div className="text-2xl font-black text-emerald-600 font-heading">{approvedCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-theme-card border border-theme shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted">Pipeline Health</span>
          <div className="text-2xl font-black text-theme-primary font-heading">Active</div>
        </div>
      </div>

      {/* Toolbar: Search, Filter & View Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-theme-card border border-theme">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-theme-muted absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search applications..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none font-semibold"
          >
            <option value="All">All Statuses</option>
            {columns.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 border border-theme rounded-xl p-1 bg-theme-main self-end sm:self-auto">
          <button
            onClick={() => setViewMode('kanban')}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'kanban' ? 'bg-theme-secondary text-theme-main shadow-xs' : 'text-theme-muted'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Kanban</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'list' ? 'bg-theme-secondary text-theme-main shadow-xs' : 'text-theme-muted'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List</span>
          </button>
        </div>
      </div>

      {/* KANBAN VIEW */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {columns.map((col) => {
            const colApps = filteredApps.filter(a => a.status === col.id);

            return (
              <div
                key={col.id}
                className="rounded-3xl bg-theme-secondary/40 border border-theme p-3.5 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-theme/60">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
                    <h3 className="font-extrabold text-xs text-theme-main font-heading">
                      {col.title}
                    </h3>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-theme-card border border-theme text-[10px] font-bold text-theme-main flex items-center justify-center">
                    {colApps.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colApps.length === 0 ? (
                    <div className="p-4 text-center text-[11px] text-theme-muted border border-dashed border-theme/80 rounded-2xl">
                      No applications
                    </div>
                  ) : (
                    colApps.map((app) => (
                      <div
                        key={app.id}
                        className="p-3.5 rounded-2xl bg-theme-card border border-theme shadow-xs hover:shadow-theme-sm transition-all space-y-2 group"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-extrabold text-xs text-theme-main font-heading line-clamp-2">
                            {app.title}
                          </h4>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleOpenEditModal(app)}
                              className="p-1 rounded text-theme-muted hover:text-theme-main"
                              title="Edit"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => deleteApplication(app.id)}
                              className="p-1 rounded text-theme-muted hover:text-rose-500"
                              title="Delete"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div className="text-[11px] font-semibold text-theme-primary">
                          {app.amount}
                        </div>

                        {app.notes && (
                          <p className="text-[10px] text-theme-muted line-clamp-2 italic bg-theme-main/60 p-1.5 rounded-lg">
                            "{app.notes}"
                          </p>
                        )}

                        <div className="flex items-center justify-between text-[10px] text-theme-muted pt-1 border-t border-theme/60">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-rose-500" />
                            {app.deadline}
                          </span>
                        </div>

                        {/* Quick Move Status Selector */}
                        <div className="pt-1">
                          <select
                            value={app.status}
                            onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                            className="w-full text-[10px] font-bold p-1 rounded-lg border border-theme bg-theme-secondary text-theme-main focus:outline-none"
                          >
                            {columns.map(c => (
                              <option key={c.id} value={c.id}>Move to: {c.title}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="p-4 sm:p-6 rounded-3xl bg-theme-card border border-theme shadow-theme-sm overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[650px]">
            <thead>
              <tr className="border-b border-theme text-theme-muted uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Opportunity</th>
                <th className="py-3 px-4">Funding</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4">Notes</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-theme">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-theme-secondary/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-extrabold text-sm text-theme-main block">{app.title}</span>
                    <span className="text-[11px] text-theme-muted">{app.provider}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-theme-main">
                    {app.amount}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-rose-500">
                    {app.deadline}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={app.status}
                      onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                      className="text-xs font-bold py-1 px-2 rounded-xl border border-theme bg-theme-secondary text-theme-main"
                    >
                      {columns.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-theme-muted max-w-xs truncate">
                    {app.notes || '—'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditModal(app)}
                        className="p-1.5 rounded-lg border border-theme hover:bg-theme-secondary text-theme-muted"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="p-1.5 rounded-lg border border-theme hover:bg-rose-50 text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-theme-card border border-theme shadow-theme-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-theme">
              <h3 className="text-base font-extrabold text-theme-main font-heading">
                {editingApp ? 'Edit Application Record' : 'Track New Opportunity'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-theme-muted hover:text-theme-main"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-theme-main mb-1">Scholarship Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  placeholder="e.g. National Merit Engineering Grant"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1">Provider / Organization</label>
                  <input
                    type="text"
                    value={formData.provider}
                    onChange={(e) => setFormData(prev => ({ ...prev, provider: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                    placeholder="e.g. Tata Trusts / Gov"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1">Funding Amount</label>
                  <input
                    type="text"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1">Target Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1">Pipeline Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary font-semibold"
                  >
                    {columns.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-theme-main mb-1">Application Notes / Checklist</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="e.g. Awaiting HOD recommendation letter. Drafted SOP v1."
                  className="w-full px-3 py-2 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-theme-muted hover:bg-theme-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
