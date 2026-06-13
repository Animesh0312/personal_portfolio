import { Quote, Sparkles } from "lucide-react";
import type { TestimonialItem } from "../types/portfolio";

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials.length) {
    return null;
  }

  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden bg-[#090909] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center gap-3 text-white/50">
          <Sparkles size={18} className="text-fuchsia-300" />
          <span className="text-sm uppercase tracking-[0.3em]">Testimonials</span>
          <Sparkles size={18} className="text-orange-300" />
        </div>
        <div className="testimonial-track overflow-x-auto pb-4 motion-reduce:snap-x motion-reduce:snap-mandatory">
          <div className="testimonial-marquee flex w-max gap-5">
            {marqueeItems.map((testimonial, index) => (
              <article
                key={`${testimonial.id}-${index}`}
                className="testimonial-card w-[320px] shrink-0 snap-start rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-glow"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold text-white"
                    style={{ backgroundColor: testimonial.avatarColor }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <Quote size={18} className="text-white/28" />
                </div>
                <p className="text-lg italic leading-8 text-white/76">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6">
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-white">{testimonial.name}</p>
                  <p className="mt-2 text-sm text-white/46">{testimonial.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
