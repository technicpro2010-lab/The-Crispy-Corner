import { STORE_CONTACT } from '../data/menuData';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12 mt-16 text-xs text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* Brand Col */}
        <div className="space-y-3">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="w-8 h-8 bg-brand-gold rounded-xl flex items-center justify-center font-heading font-black text-lg text-black">
              C
            </div>
            <div className="font-heading font-black text-xl text-white">
              THE CRISPY <span className="text-brand-gold">CORNER</span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-gray-400">
            Pakistan’s favorite destination for golden crispy fried chicken, gourmet smash burgers, loaded dynamite fries, and signature dipping sauces.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 font-bold text-[11px]">
            <i className="fa-solid fa-certificate"></i> 100% Certified Halal Ingredients
          </div>
        </div>

        {/* Timings */}
        <div>
          <h4 className="text-sm font-bold text-white mb-3 font-heading uppercase tracking-wider">
            Opening Hours
          </h4>
          <p className="text-xs text-gray-300">Monday - Sunday: 12:00 PM - 03:00 AM</p>
          <p className="text-xs text-brand-gold font-semibold mt-1">
            ⚡ Late Night Midnight Delivery Available
          </p>
          <p className="text-[11px] text-gray-500 mt-2">Dine-in, Takeaway & Contactless Home Delivery</p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-bold text-white mb-3 font-heading uppercase tracking-wider">
            Order & Contact
          </h4>
          <p className="text-xs text-gray-300">Hotline: <strong className="text-white">{STORE_CONTACT.phoneDisplay}</strong></p>
          <p className="text-xs text-gray-300 mt-1">WhatsApp Orders: <strong className="text-emerald-400">{STORE_CONTACT.phoneDisplay}</strong></p>
          <p className="text-xs text-gray-400 mt-1">Email: orders@thecrispycorner.pk</p>
          <p className="text-[11px] text-brand-gold mt-2 font-medium">Karachi • Lahore • Islamabad • Rawalpindi</p>
        </div>

        {/* Social & Payment Badges */}
        <div>
          <h4 className="text-sm font-bold text-white mb-3 font-heading uppercase tracking-wider">
            Connect With Us
          </h4>
          <div className="flex items-center justify-center md:justify-start gap-3 text-lg mb-4">
            <a href="#instagram" className="w-8 h-8 rounded-full bg-brand-surface flex items-center justify-center text-gray-300 hover:text-brand-gold hover:bg-neutral-800 transition-colors">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#facebook" className="w-8 h-8 rounded-full bg-brand-surface flex items-center justify-center text-gray-300 hover:text-brand-gold hover:bg-neutral-800 transition-colors">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#tiktok" className="w-8 h-8 rounded-full bg-brand-surface flex items-center justify-center text-gray-300 hover:text-brand-gold hover:bg-neutral-800 transition-colors">
              <i className="fa-brands fa-tiktok"></i>
            </a>
            <a href={STORE_CONTACT.whatsappUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-brand-surface flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors" title={`Chat on WhatsApp (${STORE_CONTACT.phone})`}>
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
          <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Accepted Payments</span>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 text-[10px] text-gray-300">
            <span className="bg-brand-surface px-2 py-0.5 rounded border border-white/5">Cash on Delivery</span>
            <span className="bg-brand-surface px-2 py-0.5 rounded border border-white/5">JazzCash</span>
            <span className="bg-brand-surface px-2 py-0.5 rounded border border-white/5">Easypaisa</span>
            <span className="bg-brand-surface px-2 py-0.5 rounded border border-white/5">Visa / PayPak</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-600 mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          © 2026 The Crispy Corner (Pakistan). All Rights Reserved.
        </div>
        <div className="flex items-center gap-4 text-[11px] text-gray-500">
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Terms of Delivery</span>
          <span>•</span>
          <span>Halal Certified Kitchen</span>
        </div>
      </div>
    </footer>
  );
}

