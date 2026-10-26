import React, { useState } from 'react';
import { Lock, KeyRound, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface PasswordGateProps {
  onSuccess: () => void;
}

const ACCESS_PASSWORD = '123456';

export const PasswordGate: React.FC<PasswordGateProps> = ({ onSuccess }) => {
  const [inputPass, setInputPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPass === ACCESS_PASSWORD) {
      if (rememberMe) {
        localStorage.setItem('methyl_cpg_auth', 'true');
      } else {
        sessionStorage.setItem('methyl_cpg_auth', 'true');
      }
      onSuccess();
    } else {
      setErrorMsg('Incorrect password. Please try again.');
      setInputPass('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background Glow & Ambient Decor */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 relative z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Icon */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-blue-700 via-indigo-600 to-cyan-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/25 mb-3.5">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight m-0">
            Methyl-CpG Hotspot Explorer
          </h2>
          <p className="text-xs text-slate-500 mt-1 m-0">
            Clinical Genetics Platform • Restricted Access
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Access Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                autoFocus
                value={inputPass}
                onChange={e => {
                  setInputPass(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Enter password..."
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errorMsg
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-300 focus:ring-blue-500'
                }`}
              />
            </div>
            {errorMsg && (
              <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errorMsg}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span>Remember this device</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Unlock &amp; Enter Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security badge footer */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Password-protected clinical bioinformatics workspace</span>
        </div>
      </div>
    </div>
  );
};
