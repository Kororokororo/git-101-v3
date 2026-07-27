import React from 'react';
import { X, Coffee, Heart, CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CoffeeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-sm glass-card rounded-3xl p-6 text-center border border-slate-200/80 dark:border-slate-800 shadow-2xl bg-white/90 dark:bg-slate-900/90">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-500 flex items-center justify-center shadow-inner">
          <Coffee className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-1">
          ซื้อกาแฟสนับสนุนงาน ☕
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
          ขอบคุณมากครับสำหรับกำลังใจ! ทุกแก้วคือกำลังใจสำคัญในการพัฒนาซอฟต์แวร์ดีๆ ต่อไป ✨
        </p>

        {/* Coffee Options */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {[
            { amount: '1 แก้ว', price: '฿50' },
            { amount: '2 แก้ว', price: '฿100' },
            { amount: '5 แก้ว', price: '฿250' }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                triggerConfetti();
                alert(`ขอบคุณสำหรับการสนับสนุน ${item.amount} (${item.price}) ครับ! ❤️`);
              }}
              className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-800 dark:text-slate-200 transition group"
            >
              <div className="text-xs font-bold text-rose-500 mb-0.5 group-hover:scale-110 transition-transform">
                {item.price}
              </div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {item.amount}
              </div>
            </button>
          ))}
        </div>

        {/* PromptPay QR Mock */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 mb-5 flex items-center gap-3">
          <div className="w-12 h-12 bg-white p-1 rounded-lg border flex-shrink-0">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PROMPTPAY_MOCK"
              alt="PromptPay QR Code"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
              PromptPay (พร้อมเพย์)
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              09x-xxx-xxxx (ณัฐกร)
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            triggerConfetti();
            onClose();
          }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-violet-600 text-white font-bold text-sm shadow-lg shadow-rose-500/30 hover:opacity-95 active:scale-95 transition"
        >
          ส่งกำลังใจสำเร็จ 🎉
        </button>
      </div>
    </div>
  );
};
