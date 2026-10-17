import React from 'react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Sarah Khan',
      city: 'Karachi (Clifton)',
      stars: 5,
      comment: 'Hands down the crunchiest fried chicken burger in town! Delivery arrived piping hot in 22 minutes. The Monster Crunch is unbeatable value.',
      tag: 'Verified Foodie'
    },
    {
      name: 'Usman Malik',
      city: 'Lahore (Gulberg)',
      stars: 5,
      comment: 'Ordering directly via WhatsApp from their web menu was super smooth. The Garlic Dynamite Dip and loaded fries are on another level!',
      tag: 'Frequent Buyer'
    },
    {
      name: 'Hamza Tariq',
      city: 'Islamabad (F-7)',
      stars: 5,
      comment: 'Build Your Box combo gave our family incredible value for money in PKR. Quality is easily better than big international chains.',
      tag: 'Burger Enthusiast'
    }
  ];

  return (
    <section className="space-y-6 pt-4">
      <div className="text-center space-y-1">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
          What Food Lovers Say Across Pakistan
        </h3>
        <p className="text-xs sm:text-sm text-gray-400">
          Over 10,000+ satisfied crispy cravings served fresh every month.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, idx) => (
          <div 
            key={idx}
            className="bg-brand-card p-6 rounded-2xl border border-white/10 space-y-3.5 hover:border-brand-gold/40 transition-all shadow-lg flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex text-brand-gold text-xs gap-1">
                  {[...Array(rev.stars)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>
                <span className="text-[10px] bg-brand-surface text-gray-300 px-2 py-0.5 rounded-full border border-white/10 font-medium">
                  {rev.tag}
                </span>
              </div>
              <p className="text-xs text-gray-300 italic leading-relaxed">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white group-hover:text-brand-gold transition-colors">
                  {rev.name}
                </div>
                <div className="text-[10px] text-gray-400 flex items-center gap-1">
                  <i className="fa-solid fa-location-dot text-brand-gold text-[9px]"></i>
                  {rev.city}
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-brand-surface border border-white/10 flex items-center justify-center text-xs text-brand-gold">
                🍗
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

