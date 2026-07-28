import { useEffect } from 'react';

const TestimonialCard = ({ quote, name, role, location, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[1.75rem] border border-white/10 bg-white/5 p-8 shadow-[0_20px_40px_rgba(255,255,255,0.05)] transition-all duration-300 hover:bg-white/[0.08] hover:border-white/15 hover:shadow-[0_24px_60px_rgba(255,255,255,0.08)] hover:-translate-y-1 cursor-pointer"
    >
      <p className="text-lg text-neutral-100 leading-relaxed mb-6 line-clamp-4">
        {quote}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-sm font-semibold text-white shrink-0">
          {name.charAt(0)}
        </div>
        <div>
          <div className="text-white font-semibold text-base">{name}</div>
          <div className="text-neutral-500 text-sm">{role}{location ? `, ${location}` : ''}</div>
        </div>
      </div>
    </button>
  );
};

const TestimonialModal = ({ isOpen, onClose, quote, name, role, location }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className={`relative w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-8 md:p-10 shadow-2xl transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <svg className="w-10 h-10 text-white/15 mb-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
        </svg>

        <p className="text-xl text-neutral-100 leading-relaxed mb-8">
          {quote}
        </p>

        <div className="flex items-center gap-3 pt-6 border-t border-white/10">
          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-base font-semibold text-white shrink-0">
            {name.charAt(0)}
          </div>
          <div>
            <div className="text-white font-semibold text-lg">{name}</div>
            <div className="text-neutral-500 text-sm">{role}{location ? `, ${location}` : ''}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TestimonialCard, TestimonialModal };
