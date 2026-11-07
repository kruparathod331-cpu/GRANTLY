import React, { useState } from 'react';
import { 
  FolderLock, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Upload, 
  Trash2, 
  Edit3, 
  ShieldCheck, 
  X, 
  Check, 
  FileCheck,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export default function DocumentVault() {
  const { 
    documents, 
    updateDocument, 
    addDocument, 
    deleteDocument, 
    documentMetrics 
  } = useStudent();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Resume/CV',
    status: 'Pending',
    fileName: '',
    notes: '',
    isRequired: true,
  });

  const categories = [
    'All',
    'Resume/CV',
    'Academic transcripts',
    'Mark sheets',
    'Income certificate',
    'Identity documents',
    'Recommendation letters',
    'Statement of Purpose',
    'Other documents'
  ];

  const handleOpenAdd = () => {
    setEditingDoc(null);
    setFormData({
      name: '',
      category: 'Resume/CV',
      status: 'Pending',
      fileName: '',
      notes: '',
      isRequired: true,
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (doc) => {
    setEditingDoc(doc);
    setFormData({
      name: doc.name,
      category: doc.category,
      status: doc.status,
      fileName: doc.fileName || '',
      notes: doc.notes || '',
      isRequired: doc.isRequired ?? true,
    });
    setIsAddModalOpen(true);
  };

  const handleSaveDoc = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingDoc) {
      updateDocument(editingDoc.id, formData);
    } else {
      addDocument(formData);
    }
    setIsAddModalOpen(false);
  };

  // Mock File Upload Simulator
  const handleSimulatedFileUpload = (docId, e) => {
    const file = e.target.files?.[0];
    if (file) {
      updateDocument(docId, {
        fileName: file.name,
        status: 'Ready',
        lastUpdated: new Date().toISOString().split('T')[0],
      });
    }
  };

  const filteredDocs = documents.filter((doc) => {
    if (selectedCategory === 'All') return true;
    return doc.category === selectedCategory;
  });

  // Missing or pending urgent items alert
  const pendingOrMissing = documents.filter(d => d.isRequired && d.status !== 'Ready');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-theme-card border border-theme shadow-theme-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge-pill bg-theme-secondary text-theme-main text-xs font-bold">
              Verification Vault
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Client-Only Secure Storage
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-theme-main font-heading">
            Student Document Vault
          </h1>
          <p className="text-xs sm:text-sm text-theme-muted max-w-xl">
            Keep your transcripts, certificates, recommendation letters, and SOP drafts organized and ready before portal deadlines.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-primary px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-theme-sm self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Document Item</span>
        </button>
      </div>

      {/* Honest Local Demo Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs flex items-start gap-3">
        <Info className="w-4 h-4 text-theme-primary shrink-0 mt-0.5" />
        <div className="text-theme-muted leading-relaxed">
          <strong className="text-theme-main">Privacy & Data Notice:</strong> All documents, metadata, and simulated attachments exist purely within your local browser session. No personal records or financial files are uploaded to any external cloud server.
        </div>
      </div>

      {/* Vault Progress & Analytics Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Readiness Meter */}
        <div className="p-5 rounded-3xl bg-theme-card border border-theme shadow-xs flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-xs shrink-0"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            {documentMetrics.percentage}%
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted block">
              Readiness Score
            </span>
            <h4 className="text-sm font-extrabold text-theme-main font-heading">
              {documentMetrics.ready} of {documentMetrics.total} Ready
            </h4>
            <span className="text-[11px] text-theme-muted">Audit-ready for portals</span>
          </div>
        </div>

        {/* Ready Docs */}
        <div className="p-5 rounded-3xl bg-theme-card border border-theme shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">
            Verified / Ready
          </span>
          <div className="text-2xl font-black text-theme-main font-heading">
            {documentMetrics.ready}
          </div>
          <span className="text-[11px] text-theme-muted">Attached with valid formats</span>
        </div>

        {/* Pending Docs */}
        <div className="p-5 rounded-3xl bg-theme-card border border-theme shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 block mb-1">
            Pending Issuance
          </span>
          <div className="text-2xl font-black text-theme-main font-heading">
            {documentMetrics.pending}
          </div>
          <span className="text-[11px] text-theme-muted">Awaiting stamp or registrar</span>
        </div>

        {/* Missing Required */}
        <div className="p-5 rounded-3xl bg-theme-card border border-theme shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block mb-1">
            Missing Documents
          </span>
          <div className="text-2xl font-black text-rose-500 font-heading">
            {documentMetrics.missing}
          </div>
          <span className="text-[11px] text-theme-muted">Urgent for fellowship cycles</span>
        </div>
      </div>

      {/* Missing Document Alerts (if any) */}
      {pendingOrMissing.length > 0 && (
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
              Document Vault Attention Required ({pendingOrMissing.length} Items)
            </h4>
          </div>
          <p className="text-xs text-amber-800 dark:text-amber-300">
            The following verification documents are still marked as <em>Pending</em> or <em>Missing</em>. Scholarship portals typically auto-disqualify incomplete document packets:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {pendingOrMissing.map(d => (
              <span 
                key={d.id} 
                className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white dark:bg-amber-900/60 border border-amber-300 text-amber-900 dark:text-amber-100"
              >
                {d.name} ({d.status})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5 p-3 rounded-2xl bg-theme-card border border-theme">
        <span className="text-xs font-bold text-theme-muted mr-2">Filter Category:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'btn-primary shadow-xs'
                : 'bg-theme-secondary text-theme-muted hover:text-theme-main border border-theme'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Document Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => {
          const isReady = doc.status === 'Ready';
          const isPending = doc.status === 'Pending';

          return (
            <div
              key={doc.id}
              className="p-5 rounded-3xl bg-theme-card border border-theme shadow-xs hover:shadow-theme-sm transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="badge-pill bg-theme-secondary text-theme-main text-[10px] font-bold">
                      {doc.category}
                    </span>
                    {doc.isRequired && (
                      <span className="text-[10px] font-bold text-rose-500 uppercase">
                        Required
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(doc)}
                      className="p-1.5 rounded-lg border border-theme text-theme-muted hover:text-theme-main hover:bg-theme-secondary"
                      title="Edit item"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteDocument(doc.id)}
                      className="p-1.5 rounded-lg border border-theme text-theme-muted hover:text-rose-500 hover:bg-rose-50"
                      title="Delete item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="font-extrabold text-sm text-theme-main font-heading mt-2">
                  {doc.name}
                </h4>

                {doc.notes && (
                  <p className="text-xs text-theme-muted mt-1 leading-relaxed">
                    {doc.notes}
                  </p>
                )}

                {/* File Attachment status */}
                <div className="mt-3 p-2.5 rounded-xl bg-theme-secondary/50 border border-theme text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-theme-primary shrink-0" />
                    <span className="font-mono text-[11px] text-theme-main truncate">
                      {doc.fileName || 'No file selected yet'}
                    </span>
                  </div>

                  {/* Simulated Upload Input */}
                  <label className="cursor-pointer text-xs font-bold text-theme-primary hover:underline shrink-0 ml-2">
                    <span>{doc.fileName ? 'Replace' : 'Upload File'}</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleSimulatedFileUpload(doc.id, e)}
                    />
                  </label>
                </div>
              </div>

              {/* Status Switcher Footer */}
              <div className="pt-2 border-t border-theme/60 flex items-center justify-between">
                <span className="text-[11px] text-theme-subtle">
                  Updated: {doc.lastUpdated || 'Not set'}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateDocument(doc.id, { status: 'Ready' })}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      isReady 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-theme-secondary text-theme-muted hover:text-theme-main'
                    }`}
                  >
                    Ready
                  </button>
                  <button
                    onClick={() => updateDocument(doc.id, { status: 'Pending' })}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      isPending 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-theme-secondary text-theme-muted hover:text-theme-main'
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => updateDocument(doc.id, { status: 'Missing' })}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      doc.status === 'Missing' 
                        ? 'bg-rose-500 text-white' 
                        : 'bg-theme-secondary text-theme-muted hover:text-theme-main'
                    }`}
                  >
                    Missing
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-theme-card border border-theme shadow-theme-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-theme">
              <h3 className="text-base font-extrabold text-theme-main font-heading">
                {editingDoc ? 'Edit Document Entry' : 'Add Document to Vault'}
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-theme-muted hover:text-theme-main"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDoc} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-theme-main mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  placeholder="e.g. 1st to 4th Sem Official Transcripts"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none font-semibold"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1">
                    Verification Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none font-semibold"
                  >
                    <option value="Ready">Ready</option>
                    <option value="Pending">Pending</option>
                    <option value="Missing">Missing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-theme-main mb-1">
                  File Reference / Name
                </label>
                <input
                  type="text"
                  value={formData.fileName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fileName: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none"
                  placeholder="e.g. Transcripts_Certified_2026.pdf"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-theme-main mb-1">
                  Notes / Expiry / Requirements
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="e.g. Sealed envelope required for US university application."
                  className="w-full px-3 py-2 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-theme-muted hover:bg-theme-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2 rounded-xl text-xs font-bold shadow-xs"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
