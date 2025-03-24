
import React from 'react';
import Header from '../components/Header';
import AdminDashboard from '../components/AdminDashboard';

const Admin = () => {
  return (
    <div className="min-h-screen bg-valorant-black text-white">
      <Header />
      <AdminDashboard />
      
      <footer className="bg-black/90 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Team Tragic Admin Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;
