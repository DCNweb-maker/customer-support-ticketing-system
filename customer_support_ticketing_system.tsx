import React, { useState } from 'react';
import { 
  User, ShieldCheck, Ticket, PlusCircle, CheckCircle2, Clock, AlertCircle, 
  Send, MessageSquare, LogOut, ArrowLeft, Search, Filter, Settings, FileText,
  UserPlus, Lock, Mail, ChevronRight, BarChart2, CheckSquare, XCircle, LayoutDashboard
} from 'lucide-react';

// Data Awal Tiket Simulasi
const INITIAL_TICKETS = [
  {
    id: 'TKT-1001',
    subject: 'Masalah Log Masuk Akaun',
    category: 'Akaun & Keselamatan',
    priority: 'Tinggi',
    status: 'Baru',
    createdAt: '2026-08-27 09:30',
    updatedAt: '2026-08-27 09:30',
    customerName: 'Ahmad Zaki',
    customerEmail: 'zaki@example.com',
    description: 'Saya tidak boleh log masuk ke dalam akaun selepas menukar kata laluan semalam.',
    messages: [
      { sender: 'customer', name: 'Ahmad Zaki', time: '09:30 AM', text: 'Saya tidak boleh log masuk ke dalam akaun selepas menukar kata laluan semalam. Sila bantu.' }
    ]
  },
  {
    id: 'TKT-1002',
    subject: 'Kegagalan Pembayaran Tiket',
    category: 'Pembayaran & Bil',
    priority: 'Kritikal',
    status: 'Dalam Proses',
    createdAt: '2026-08-26 14:15',
    updatedAt: '2026-08-27 10:00',
    customerName: 'Siti Nurhaliza',
    customerEmail: 'siti@example.com',
    description: 'Kad kredit saya ditolak tetapi baki akaun telah dipotong semasa pembayaran bil.',
    messages: [
      { sender: 'customer', name: 'Siti Nurhaliza', time: '02:15 PM', text: 'Kad kredit saya ditolak tetapi baki akaun telah dipotong.' },
      { sender: 'support', name: 'Kakitangan Khidmat Pelanggan', time: '10:00 AM', text: 'Hai Siti, kami sedang mengesahkan transaksi ini bersama pihak bank anda.' }
    ]
  },
  {
    id: 'TKT-1003',
    subject: 'Pertanyaan Pakej Perkhidmatan',
    category: 'Pertanyaan Umum',
    priority: 'Rendah',
    status: 'Menunggu Pelanggan',
    createdAt: '2026-08-25 11:20',
    updatedAt: '2026-08-26 16:45',
    customerName: 'Tan Wei Ming',
    customerEmail: 'weiming@example.com',
    description: 'Bolehkah saya dapatkan brosur tawaran pakej tahunan?',
    messages: [
      { sender: 'customer', name: 'Tan Wei Ming', time: '11:20 AM', text: 'Bolehkah saya dapatkan brosur tawaran pakej tahunan?' },
      { sender: 'support', name: 'Kakitangan Khidmat Pelanggan', time: '04:45 PM', text: 'Kami telah menghantar brosur ke e-mel anda. Sila semak peti masuk anda.' }
    ]
  },
  {
    id: 'TKT-1004',
    subject: 'Kemas Kini Profil Gagal',
    category: 'Teknikal',
    priority: 'Sederhana',
    status: 'Selesai',
    createdAt: '2026-08-24 08:00',
    updatedAt: '2026-08-25 15:30',
    customerName: 'Muthu Swamy',
    customerEmail: 'muthu@example.com',
    description: 'Ralat 500 berlaku semasa saya ingin mengemaskini nombor telefon.',
    messages: [
      { sender: 'customer', name: 'Muthu Swamy', time: '08:00 AM', text: 'Ralat 500 berlaku semasa saya ingin mengemaskini nombor telefon.' },
      { sender: 'support', name: 'Kakitangan Khidmat Pelanggan', time: '03:30 PM', text: 'Isu ralat telah dibetulkan. Sila cuba sekali lagi.' }
    ]
  }
];

export default function App() {
  // Pengurusan Halaman Utama
  // Halaman: 'analysis', 'login', 'register', 'cust_dashboard', 'create_ticket', 'my_tickets', 'cust_ticket_details', 'supp_dashboard', 'supp_ticket_mgmt', 'supp_ticket_details'
  const [activePage, setActivePage] = useState('analysis');
  const [currentUserRole, setCurrentUserRole] = useState('customer'); // 'customer' atau 'support'
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [selectedTicketId, setSelectedTicketId] = useState('TKT-1001');

  // Borang Tiket Baharu State
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState('Teknikal');
  const [newPriority, setNewPriority] = useState('Sederhana');
  const [newDescription, setNewDescription] = useState('');

  // Balasan State
  const [replyText, setReplyText] = useState('');

  // Carian & Tapis State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  // Pemandu Tiket Terpilih
  const currentTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  // Tambah Tiket Baharu
  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newSubject || !newDescription) return;

    const newTicketObj = {
      id: `TKT-${1000 + tickets.length + 1}`,
      subject: newSubject,
      category: newCategory,
      priority: newPriority,
      status: 'Baru',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      customerName: 'Pengguna Aktif',
      customerEmail: 'user@example.com',
      description: newDescription,
      messages: [
        { sender: 'customer', name: 'Pengguna Aktif', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: newDescription }
      ]
    };

    setTickets([newTicketObj, ...tickets]);
    setNewSubject('');
    setNewDescription('');
    setSelectedTicketId(newTicketObj.id);
    setActivePage('my_tickets');
  };

  // Tambah Mesej Balasan
  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicketId) {
        const newMsg = {
          sender: currentUserRole,
          name: currentUserRole === 'customer' ? 'Pengguna Aktif' : 'Pegawai Sokongan',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: replyText
        };
        
        let newStatus = t.status;
        if (currentUserRole === 'customer' && t.status === 'Menunggu Pelanggan') {
          newStatus = 'Dalam Proses';
        } else if (currentUserRole === 'support' && t.status === 'Baru') {
          newStatus = 'Buka';
        }

        return {
          ...t,
          status: newStatus,
          updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    });

    setTickets(updatedTickets);
    setReplyText('');
  };

  // Kemas Kini Status Tiket oleh Sokongan
  const handleStatusChange = (ticketId, newStatus) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: newStatus, updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ') } : t));
  };

  // Kemas Kini Keutamaan Tiket oleh Sokongan
  const handlePriorityChange = (ticketId, newPriority) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, priority: newPriority } : t));
  };

  // Penapisan Tiket
  const filteredTickets = tickets.filter(t => {
    const matchSearch = t.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        t.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'Semua' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Warna Lencana Status
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Baru': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Buka': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Dalam Proses': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Menunggu Pelanggan': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Selesai': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Ditutup': return 'bg-slate-200 text-slate-700 border-slate-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Warna Keutamaan
  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'Kritikal': return 'bg-rose-600 text-white';
      case 'Tinggi': return 'bg-red-500 text-white';
      case 'Sederhana': return 'bg-amber-500 text-white';
      case 'Rendah': return 'bg-emerald-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Bar Navigasi Utama */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActivePage('cust_dashboard')}>
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Ticket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">HelpDesk Pro</h1>
              <p className="text-xs text-slate-400">Sistem Tiket Sokongan Pelanggan</p>
            </div>
          </div>

          {/* Pemilih Penglihatan & Navigasi Pantas */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setActivePage('analysis')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition flex items-center space-x-1 ${
                activePage === 'analysis' 
                  ? 'bg-amber-500 text-slate-950 font-semibold' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Dokumen Analisis (Tugasan 3.1)</span>
            </button>

            {/* Suis Peranan Pengguna */}
            <div className="bg-slate-800 p-1 rounded-lg flex items-center border border-slate-700">
              <button
                onClick={() => {
                  setCurrentUserRole('customer');
                  setActivePage('cust_dashboard');
                }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition flex items-center space-x-1 ${
                  currentUserRole === 'customer' 
                    ? 'bg-indigo-600 text-white shadow' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Pelanggan</span>
              </button>
              <button
                onClick={() => {
                  setCurrentUserRole('support');
                  setActivePage('supp_dashboard');
                }}
                className={`px-3 py-1 rounded-md text-xs font-medium transition flex items-center space-x-1 ${
                  currentUserRole === 'support' 
                    ? 'bg-purple-600 text-white shadow' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Sokongan</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Bar Sub-Navigasi Mengikut Peranan / Halaman */}
      <nav className="bg-white border-b border-slate-200 shadow-sm px-4 py-2 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between min-w-max">
          <div className="flex space-x-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider self-center mr-2">
              Menu Halaman (Tugasan 3.2):
            </span>
            
            {/* Halaman Bebas/Umum */}
            <button 
              onClick={() => setActivePage('login')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium ${activePage === 'login' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              1. Log Masuk
            </button>
            <button 
              onClick={() => setActivePage('register')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium ${activePage === 'register' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              2. Pendaftaran
            </button>

            {/* Halaman Pelanggan */}
            <div className="h-4 w-px bg-slate-300 self-center mx-1" />
            <button 
              onClick={() => { setCurrentUserRole('customer'); setActivePage('cust_dashboard'); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium ${activePage === 'cust_dashboard' ? 'bg-indigo-600 text-white' : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'}`}
            >
              3. Dashboard Pelanggan
            </button>
            <button 
              onClick={() => { setCurrentUserRole('customer'); setActivePage('create_ticket'); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium ${activePage === 'create_ticket' ? 'bg-indigo-600 text-white' : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'}`}
            >
              4. Cipta Tiket
            </button>
            <button 
              onClick={() => { setCurrentUserRole('customer'); setActivePage('my_tickets'); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium ${activePage === 'my_tickets' ? 'bg-indigo-600 text-white' : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'}`}
            >
              5. Tiket Saya
            </button>
            <button 
              onClick={() => { setCurrentUserRole('customer'); setActivePage('cust_ticket_details'); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium ${activePage === 'cust_ticket_details' ? 'bg-indigo-600 text-white' : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100'}`}
            >
              6. Butiran & Perbualan
            </button>

            {/* Halaman Sokongan */}
            <div className="h-4 w-px bg-slate-300 self-center mx-1" />
            <button 
              onClick={() => { setCurrentUserRole('support'); setActivePage('supp_dashboard'); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium ${activePage === 'supp_dashboard' ? 'bg-purple-600 text-white' : 'text-purple-700 bg-purple-50 hover:bg-purple-100'}`}
            >
              7. Dashboard Sokongan
            </button>
            <button 
              onClick={() => { setCurrentUserRole('support'); setActivePage('supp_ticket_mgmt'); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium ${activePage === 'supp_ticket_mgmt' ? 'bg-purple-600 text-white' : 'text-purple-700 bg-purple-50 hover:bg-purple-100'}`}
            >
              8. Pengurusan Tiket
            </button>
            <button 
              onClick={() => { setCurrentUserRole('support'); setActivePage('supp_ticket_details'); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium ${activePage === 'supp_ticket_details' ? 'bg-purple-600 text-white' : 'text-purple-700 bg-purple-50 hover:bg-purple-100'}`}
            >
              9. Butiran Tiket Sokongan
            </button>
          </div>
        </div>
      </nav>

      {/* Kandungan Utama Sistem */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">

        {/* ========================================== */}
        {/* TUGASAN 3.1: DOKUMEN ANALISIS SISTEM */}
        {/* ========================================== */}
        {activePage === 'analysis' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <span className="inline-block px-3 py-1 bg-amber-400 text-slate-950 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                Laporan Dokumen Rasmi
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold">Task 3.1: Analisis Sistem Tiket Sokongan Pelanggan</h2>
              <p className="mt-2 text-slate-300 text-sm max-w-3xl">
                Dokumen analisis keperluan sistem, peranan pengguna, aliran kerja tiket (*Ticket Workflow*), dan skema pangkalan data bagi platform pengurusan tiket sokongan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sasaran Pengguna & Fungsi Utama */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                  <User className="text-indigo-600" />
                  1. Sasaran Pengguna & Fungsi Utama
                </h3>
                
                <div className="space-y-3">
                  <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
                    <h4 className="font-bold text-indigo-900 text-sm flex items-center gap-1.5">
                      <User className="w-4 h-4 text-indigo-600" />
                      Pelanggan (Customer)
                    </h4>
                    <ul className="mt-2 text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                      <li><strong>Mendaftar Akaun & Log Masuk:</strong> Membuka akaun pengguna baharu dan akses portal.</li>
                      <li><strong>Penyerahan Tiket (Submit Ticket):</strong> Membuka isu baharu dengan tajuk, kategori, keutamaan, dan penerangan.</li>
                      <li><strong>Semakan Status Tiket (View Status):</strong> Mengesan status terkini tiket (Baru, Dalam Proses, Menunggu Pelanggan, Selesai).</li>
                      <li><strong>Balasan & Perbualan (Reply):</strong> Mengirim mesej tambahan atau jawapan kepada pegawai sokongan.</li>
                      <li><strong>Log Keluar:</strong> Keluar dari akaun secara selamat.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
                    <h4 className="font-bold text-purple-900 text-sm flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      Kakitangan Sokongan (Support Personnel)
                    </h4>
                    <ul className="mt-2 text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                      <li><strong>Log Masuk Kakitangan:</strong> Akses ke papan pemuka pengurusan sokongan.</li>
                      <li><strong>Paparan Senarai Tiket:</strong> Melihat tiket mengikut status, carian, dan tahap keutamaan.</li>
                      <li><strong>Balasan Tiket (Respond):</strong> Memberi maklum balas dan penyelesaian teknikal.</li>
                      <li><strong>Kemas Kini Keutamaan & Status:</strong> Mengubah status (*In Progress*, *Waiting for Customer*, *Resolved*) dan tahap keutamaan (*Critical*, *High*, dll).</li>
                      <li><strong>Penyelesaian & Penutupan (Resolve & Close):</strong> Menanda tiket sebagai selesai atau menutup tiket.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Ticket Workflow Visualizer */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                  <Clock className="text-amber-500" />
                  2. Aliran Kerja Tiket (Ticket Workflow)
                </h3>

                <p className="text-xs text-slate-600">
                  Kitaran hayat tiket bergerak mengikut urutan fasa berikut:
                </p>

                <div className="space-y-2">
                  {[
                    { state: '1. New (Baru)', desc: 'Tiket baru dihantar oleh pelanggan dan belum dilihat oleh pegawai.', color: 'border-blue-500 bg-blue-50 text-blue-900' },
                    { state: '2. Open (Buka)', desc: 'Tiket telah disemak oleh kakitangan sokongan dan sedia untuk ditindaklanjuti.', color: 'border-purple-500 bg-purple-50 text-purple-900' },
                    { state: '3. In Progress (Dalam Proses)', desc: 'Kakitangan sokongan sedang menjalankan penyelidikan / penyelesaian masalah.', color: 'border-amber-500 bg-amber-50 text-amber-900' },
                    { state: '4. Waiting for Customer (Menunggu Pelanggan)', desc: 'Pegawai memerlukan maklumat tambahan daripada pihak pelanggan.', color: 'border-orange-500 bg-orange-50 text-orange-900' },
                    { state: '5. Resolved (Selesai)', desc: 'Masalah telah diselesaikan dan sedia disahkan oleh pelanggan.', color: 'border-emerald-500 bg-emerald-50 text-emerald-900' },
                    { state: '6. Closed (Ditutup)', desc: 'Tiket ditutup sepenuhnya secara muktamad.', color: 'border-slate-400 bg-slate-100 text-slate-800' },
                  ].map((wf, idx) => (
                    <div key={idx} className={`p-3 border-l-4 rounded-r-lg text-xs ${wf.color}`}>
                      <span className="font-bold block text-sm">{wf.state}</span>
                      <span>{wf.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skema Pangkalan Data / Entiti Maklumat */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 border-b pb-3 flex items-center gap-2">
                <BarChart2 className="text-indigo-600" />
                3. Keperluan Skema Pangkalan Data (Required Database Information)
              </h3>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm border-b pb-1">Jadual Pengguna (Users)</h4>
                  <ul className="space-y-1 font-mono text-slate-600">
                    <li>- user_id (PK)</li>
                    <li>- full_name</li>
                    <li>- email (Unique)</li>
                    <li>- password_hash</li>
                    <li>- role (Customer / Support)</li>
                    <li>- created_at</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm border-b pb-1">Jadual Tiket (Tickets)</h4>
                  <ul className="space-y-1 font-mono text-slate-600">
                    <li>- ticket_id (PK)</li>
                    <li>- customer_id (FK)</li>
                    <li>- subject</li>
                    <li>- category</li>
                    <li>- priority (Low, Med, High, Crit)</li>
                    <li>- status (New, Open, In Progress...)</li>
                    <li>- assigned_staff_id (FK)</li>
                    <li>- created_at, updated_at</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm border-b pb-1">Jadual Perbualan (Replies)</h4>
                  <ul className="space-y-1 font-mono text-slate-600">
                    <li>- reply_id (PK)</li>
                    <li>- ticket_id (FK)</li>
                    <li>- sender_id (FK)</li>
                    <li>- sender_type (Customer/Staff)</li>
                    <li>- message_content</li>
                    <li>- timestamp</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Butang Pintasan ke Sistem Interface */}
            <div className="p-6 bg-indigo-50 border border-indigo-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-indigo-950 text-base">Terus ke Prototip Rekabentuk Antara Muka (Task 3.2)</h4>
                <p className="text-xs text-indigo-700">Uji 9 muka surat interaktif yang telah dibangunkan sepenuhnya.</p>
              </div>
              <button
                onClick={() => setActivePage('cust_dashboard')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow flex items-center gap-2 whitespace-nowrap"
              >
                <span>Buka Dashboard Pelanggan</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* HALAMAN 1: LOG MASUK (LOGIN PAGE) */}
        {/* ========================================== */}
        {activePage === 'login' && (
          <div className="max-w-md mx-auto my-12 bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <div className="text-center space-y-2 mb-6">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Log Masuk Sistem</h2>
              <p className="text-xs text-slate-500">Sila masukkan e-mel dan kata laluan anda</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setActivePage(currentUserRole === 'customer' ? 'cust_dashboard' : 'supp_dashboard'); }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">E-Mel</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input 
                    type="email" 
                    defaultValue="user@example.com"
                    required
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="nama@domain.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kata Laluan</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input 
                    type="password" 
                    defaultValue="password123"
                    required
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center space-x-2 text-slate-600">
                  <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <span>Ingat Saya</span>
                </label>
                <a href="#" className="text-indigo-600 hover:underline">Lupa kata laluan?</a>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg shadow transition"
              >
                Log Masuk
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
              Belum mempunyai akaun?{' '}
              <button 
                onClick={() => setActivePage('register')}
                className="text-indigo-600 font-bold hover:underline"
              >
                Daftar Akaun Baharu
              </button>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* HALAMAN 2: PENDAFTARAN (REGISTRATION PAGE) */}
        {/* ========================================== */}
        {activePage === 'register' && (
          <div className="max-w-md mx-auto my-8 bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <div className="text-center space-y-2 mb-6">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <UserPlus className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Pendaftaran Pelanggan</h2>
              <p className="text-xs text-slate-500">Cipta akaun baharu untuk menghantar tiket sokongan</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setActivePage('cust_dashboard'); }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Penuh</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Contoh: Muhammad Ali"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat E-Mel</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="nama@domain.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kata Laluan</label>
                <input 
                  type="password" 
                  required
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Minimum 8 aksara"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sahkan Kata Laluan</label>
                <input 
                  type="password" 
                  required
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Ulang kata laluan"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg shadow transition"
              >
                Daftar Akaun
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
              Sudah ada akaun?{' '}
              <button 
                onClick={() => setActivePage('login')}
                className="text-indigo-600 font-bold hover:underline"
              >
                Log Masuk di sini
              </button>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* HALAMAN 3: DASHBOARD PELANGGAN (CUSTOMER DASHBOARD) */}
        {/* ========================================== */}
        {activePage === 'cust_dashboard' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Selamat Datang, Ahmad Zaki 👋</h2>
                <p className="text-xs text-slate-500">Urus dan pantau status tiket sokongan teknikal anda di sini.</p>
              </div>
              <button
                onClick={() => setActivePage('create_ticket')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg flex items-center space-x-2 shadow"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Cipta Tiket Baharu</span>
              </button>
            </div>

            {/* Statistik Ringkas Pelanggan */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500">Jumlah Tiket</span>
                <p className="text-2xl font-bold text-slate-900 mt-1">{tickets.length}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-amber-600">Dalam Proses</span>
                <p className="text-2xl font-bold text-amber-600 mt-1">
                  {tickets.filter(t => t.status === 'Dalam Proses' || t.status === 'Baru' || t.status === 'Buka').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-orange-600">Menunggu Balasan</span>
                <p className="text-2xl font-bold text-orange-600 mt-1">
                  {tickets.filter(t => t.status === 'Menunggu Pelanggan').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-emerald-600">Selesai</span>
                <p className="text-2xl font-bold text-emerald-600 mt-1">
                  {tickets.filter(t => t.status === 'Selesai' || t.status === 'Ditutup').length}
                </p>
              </div>
            </div>

            {/* Tiket Terkini */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 text-sm">Tiket Terkini Anda</h3>
                <button 
                  onClick={() => setActivePage('my_tickets')}
                  className="text-xs text-indigo-600 hover:underline font-semibold"
                >
                  Lihat Semua Tiket →
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {tickets.slice(0, 3).map(ticket => (
                  <div key={ticket.id} className="p-4 hover:bg-slate-50 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-slate-500">{ticket.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getPriorityBadge(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-900 text-sm">{ticket.subject}</h4>
                      <p className="text-xs text-slate-500">Kategori: {ticket.category} • Dicipta: {ticket.createdAt}</p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedTicketId(ticket.id);
                        setActivePage('cust_ticket_details');
                      }}
                      className="px-3 py-1.5 border border-slate-300 hover:bg-slate-100 rounded text-xs font-medium text-slate-700"
                    >
                      Buka Perbualan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* HALAMAN 4: CIPTA TIKET (CREATE TICKET PAGE) */}
        {/* ========================================== */}
        {activePage === 'create_ticket' && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <PlusCircle className="text-indigo-600" />
                Hantar Tiket Sokongan Baharu
              </h2>
              <p className="text-xs text-slate-500 mt-1">Sila isi maklumat isu anda untuk bantuan kakitangan kami.</p>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subjek / Tajuk Isu *</label>
                <input 
                  type="text" 
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Contoh: Gagal memuat turun invois transaksi"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori Isu</label>
                  <select 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Teknikal">Teknikal</option>
                    <option value="Akaun & Keselamatan">Akaun & Keselamatan</option>
                    <option value="Pembayaran & Bil">Pembayaran & Bil</option>
                    <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tahap Keutamaan</label>
                  <select 
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Rendah">Rendah</option>
                    <option value="Sederhana">Sederhana</option>
                    <option value="Tinggi">Tinggi</option>
                    <option value="Kritikal">Kritikal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Penerangan Terperinci *</label>
                <textarea 
                  rows="5"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Terangkan masalah yang anda hadapi secara jelas..."
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setActivePage('cust_dashboard')}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium shadow"
                >
                  Hantar Tiket
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================== */}
        {/* HALAMAN 5: TIKET SAYA (MY TICKETS PAGE) */}
        {/* ========================================== */}
        {activePage === 'my_tickets' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Senarai Tiket Saya</h2>
                <p className="text-xs text-slate-500">Semua senarai permohonan tiketing anda.</p>
              </div>
              <button
                onClick={() => setActivePage('create_ticket')}
                className="px-4 py-2 bg-indigo-600 text-white text-xs font-medium rounded-lg shadow flex items-center space-x-1"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Tiket Baharu</span>
              </button>
            </div>

            {/* Carian & Penapis */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari ID tiket atau subjek..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="py-2 px-3 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Semua">Semua Status</option>
                  <option value="Baru">Baru</option>
                  <option value="Buka">Buka</option>
                  <option value="Dalam Proses">Dalam Proses</option>
                  <option value="Menunggu Pelanggan">Menunggu Pelanggan</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>
            </div>

            {/* Jadual Tiket */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="p-3">ID Tiket</th>
                    <th className="p-3">Subjek</th>
                    <th className="p-3">Kategori</th>
                    <th className="p-3">Keutamaan</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Kemas Kini</th>
                    <th className="p-3 text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTickets.map(ticket => (
                    <tr key={ticket.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-700">{ticket.id}</td>
                      <td className="p-3 font-medium text-slate-900">{ticket.subject}</td>
                      <td className="p-3 text-slate-500">{ticket.category}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getPriorityBadge(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">{ticket.updatedAt}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedTicketId(ticket.id);
                            setActivePage('cust_ticket_details');
                          }}
                          className="px-2.5 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded font-medium"
                        >
                          Lihat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* HALAMAN 6: BUTIRAN TIKET PELANGGAN (CUSTOMER TICKET DETAILS / CONVERSATION) */}
        {/* ========================================== */}
        {activePage === 'cust_ticket_details' && (
          <div className="space-y-6">
            <button 
              onClick={() => setActivePage('my_tickets')}
              className="flex items-center space-x-1 text-xs text-slate-500 hover:text-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Tiket Saya</span>
            </button>

            {/* Header Tiket */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm font-bold text-slate-400">{currentTicket.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getPriorityBadge(currentTicket.priority)}`}>
                      {currentTicket.priority}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(currentTicket.status)}`}>
                      {currentTicket.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">{currentTicket.subject}</h2>
                </div>
                <div className="text-xs text-slate-500">
                  Kategori: <span className="font-semibold text-slate-700">{currentTicket.category}</span>
                </div>
              </div>

              {/* Garis Masa Perbualan */}
              <div className="space-y-4 pt-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <span>Sejarah Perbualan</span>
                </h3>

                <div className="space-y-3">
                  {currentTicket.messages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-xl max-w-2xl text-xs space-y-1 ${
                        msg.sender === 'customer' 
                          ? 'bg-indigo-50 border border-indigo-100 ml-auto' 
                          : 'bg-slate-100 border border-slate-200 mr-auto'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-500">
                        <span className="font-bold text-slate-700">{msg.name} ({msg.sender === 'customer' ? 'Pelanggan' : 'Sokongan'})</span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="text-slate-800 leading-relaxed text-xs">{msg.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Borang Balas Mesej */}
              <form onSubmit={handleSendReply} className="pt-4 border-t space-y-3">
                <label className="block text-xs font-semibold text-slate-700">Tulis Balasan</label>
                <textarea 
                  rows="3"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Taip mesej balasan anda..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium flex items-center space-x-1 shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Hantar Balasan</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* HALAMAN 7: DASHBOARD SOKONGAN (SUPPORT DASHBOARD) */}
        {/* ========================================== */}
        {activePage === 'supp_dashboard' && (
          <div className="space-y-6">
            <div className="bg-purple-900 text-white p-6 rounded-xl shadow-md flex justify-between items-center">
              <div>
                <span className="text-xs text-purple-200 uppercase tracking-wider font-bold">Portal Kakitangan Sokongan</span>
                <h2 className="text-xl font-bold">Papan Pemuka Pentadbiran Sokongan</h2>
              </div>
              <button
                onClick={() => setActivePage('supp_ticket_mgmt')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium rounded-lg shadow"
              >
                Urus Semua Tiket →
              </button>
            </div>

            {/* Statistik Kakitangan */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-blue-600">Tiket Baru</span>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {tickets.filter(t => t.status === 'Baru').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-amber-600">Dalam Proses</span>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {tickets.filter(t => t.status === 'Dalam Proses').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-red-600">Keutamaan Kritikal</span>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {tickets.filter(t => t.priority === 'Kritikal').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-emerald-600">Kadar Penyelesaian</span>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {Math.round((tickets.filter(t => t.status === 'Selesai').length / tickets.length) * 100)}%
                </p>
              </div>
            </div>

            {/* Tugasan Tiket Diperlukan Action */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Tiket Memerlukan Tindakan Segera</h3>
              <div className="space-y-3">
                {tickets.filter(t => t.status === 'Baru' || t.priority === 'Kritikal').map(t => (
                  <div key={t.id} className="p-3 border rounded-lg flex items-center justify-between text-xs bg-slate-50">
                    <div>
                      <span className="font-mono font-bold text-slate-600">{t.id}</span> — <span className="font-semibold text-slate-900">{t.subject}</span>
                      <p className="text-[10px] text-slate-500">Pelanggan: {t.customerName} ({t.customerEmail})</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedTicketId(t.id);
                        setActivePage('supp_ticket_details');
                      }}
                      className="px-3 py-1 bg-purple-600 text-white rounded font-medium"
                    >
                      Kendalikan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* HALAMAN 8: PENGURUSAN TIKET SOKONGAN (TICKET MANAGEMENT PAGE) */}
        {/* ========================================== */}
        {activePage === 'supp_ticket_mgmt' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Pengurusan Tiket Kakitangan</h2>
                <p className="text-xs text-slate-500">Kemas kini status, keutamaan dan beri jawapan pantas.</p>
              </div>
            </div>

            {/* Jadual Utama Pengurusan */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="p-3">ID Tiket</th>
                    <th className="p-3">Pelanggan</th>
                    <th className="p-3">Subjek</th>
                    <th className="p-3">Keutamaan</th>
                    <th className="p-3">Tukar Status</th>
                    <th className="p-3 text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tickets.map(ticket => (
                    <tr key={ticket.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-700">{ticket.id}</td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-900">{ticket.customerName}</div>
                        <div className="text-[10px] text-slate-500">{ticket.customerEmail}</div>
                      </td>
                      <td className="p-3 font-medium text-slate-900">{ticket.subject}</td>
                      <td className="p-3">
                        <select
                          value={ticket.priority}
                          onChange={(e) => handlePriorityChange(ticket.id, e.target.value)}
                          className="px-2 py-1 text-[11px] font-bold border rounded bg-slate-50"
                        >
                          <option value="Rendah">Rendah</option>
                          <option value="Sederhana">Sederhana</option>
                          <option value="Tinggi">Tinggi</option>
                          <option value="Kritikal">Kritikal</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <select
                          value={ticket.status}
                          onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                          className="px-2 py-1 text-[11px] font-semibold border rounded bg-white"
                        >
                          <option value="Baru">Baru</option>
                          <option value="Buka">Buka</option>
                          <option value="Dalam Proses">Dalam Proses</option>
                          <option value="Menunggu Pelanggan">Menunggu Pelanggan</option>
                          <option value="Selesai">Selesai</option>
                          <option value="Ditutup">Ditutup</option>
                        </select>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedTicketId(ticket.id);
                            setActivePage('supp_ticket_details');
                          }}
                          className="px-3 py-1 bg-purple-600 text-white rounded font-medium hover:bg-purple-700"
                        >
                          Tindak
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* HALAMAN 9: BUTIRAN TIKET SOKONGAN (SUPPORT TICKET DETAILS PAGE) */}
        {/* ========================================== */}
        {activePage === 'supp_ticket_details' && (
          <div className="space-y-6">
            <button 
              onClick={() => setActivePage('supp_ticket_mgmt')}
              className="flex items-center space-x-1 text-xs text-slate-500 hover:text-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Pengurusan Tiket</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Ruangan Utama Perbualan & Balasan */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <div className="border-b pb-4">
                    <span className="font-mono text-xs font-bold text-slate-400">{currentTicket.id}</span>
                    <h2 className="text-xl font-bold text-slate-900 mt-1">{currentTicket.subject}</h2>
                    <p className="text-xs text-slate-500 mt-1">Dihantar oleh: {currentTicket.customerName} ({currentTicket.customerEmail})</p>
                  </div>

                  {/* Perbualan */}
                  <div className="space-y-3 pt-2">
                    {currentTicket.messages.map((msg, idx) => (
                      <div 
                        key={idx} 
                        className={`p-4 rounded-xl text-xs space-y-1 ${
                          msg.sender === 'support' 
                            ? 'bg-purple-50 border border-purple-100 ml-auto max-w-xl' 
                            : 'bg-slate-100 border border-slate-200 mr-auto max-w-xl'
                        }`}
                      >
                        <div className="flex justify-between items-center text-[10px] text-slate-500">
                          <span className="font-bold text-slate-700">{msg.name}</span>
                          <span>{msg.time}</span>
                        </div>
                        <p className="text-slate-800 leading-relaxed">{msg.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Borang Balas Kakitangan */}
                  <form onSubmit={handleSendReply} className="pt-4 border-t space-y-3">
                    <label className="block text-xs font-semibold text-purple-900">Respons Pegawai Sokongan</label>
                    <textarea 
                      rows="3"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Taip jawapan atau maklum balas teknikal kepada pelanggan..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(currentTicket.id, 'Selesai')}
                          className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-medium hover:bg-emerald-700"
                        >
                          Tanda Selesai
                        </button>
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-medium flex items-center space-x-1 shadow"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Hantar Respons</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Ruangan Kawalan Kanan (Panel Kawalan Kakitangan) */}
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
                  <h3 className="font-bold text-slate-900 text-sm border-b pb-2">Tetapan Tiket Sokongan</h3>
                  
                  <div>
                    <label className="block text-slate-500 mb-1">Status Tiket</label>
                    <select
                      value={currentTicket.status}
                      onChange={(e) => handleStatusChange(currentTicket.id, e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg font-semibold bg-slate-50"
                    >
                      <option value="Baru">Baru</option>
                      <option value="Buka">Buka</option>
                      <option value="Dalam Proses">Dalam Proses</option>
                      <option value="Menunggu Pelanggan">Menunggu Pelanggan</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Ditutup">Ditutup</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1">Tahap Keutamaan</label>
                    <select
                      value={currentTicket.priority}
                      onChange={(e) => handlePriorityChange(currentTicket.id, e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg font-bold bg-slate-50"
                    >
                      <option value="Rendah">Rendah</option>
                      <option value="Sederhana">Sederhana</option>
                      <option value="Tinggi">Tinggi</option>
                      <option value="Kritikal">Kritikal</option>
                    </select>
                  </div>

                  <div className="pt-2 border-t space-y-2">
                    <span className="block text-slate-500 font-medium">Maklumat Tambahan</span>
                    <p><strong>Dicipta:</strong> {currentTicket.createdAt}</p>
                    <p><strong>Kategori:</strong> {currentTicket.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Kakisumber / Footer */}
      <footer className="bg-slate-900 text-slate-400 py-4 text-center text-xs border-t border-slate-800">
        <p>© 2026 Customer Support Ticketing System (HelpDesk Pro) — Task 3.1 & 3.2</p>
      </footer>
    </div>
  );
}