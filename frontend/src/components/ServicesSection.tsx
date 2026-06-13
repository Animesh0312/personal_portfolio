import { motion } from "framer-motion";
import { BrainCircuit, Cloud, Layers2, Server } from "lucide-react";

const services = [
  {
    name: "Backend",
    summary: "Typed APIs, distributed services, queue-backed workflows, and reliable data models for products that need to scale without drama.",
    icon: Server,
  },
  {
    name: "AI/LLM",
    summary: "Applied AI systems, RAG pipelines, evaluation loops, and production-ready interfaces that make model behavior useful and observable.",
    icon: BrainCircuit,
  },
  {
    name: "Frontend",
    summary: "Fast, refined interfaces with strong interaction design, accessibility, and component architecture that helps teams move with consistency.",
    icon: Layers2,
  },
  {
    name: "Cloud",
    summary: "Infrastructure, delivery pipelines, and observability foundations that turn releases into a repeatable engineering habit instead of a risk event.",
    icon: Cloud,
  },
];

export function ServicesSection() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.32em] text-white/42">Services</p>
          <h2 className="hero-heading mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Built for teams that need both speed and engineering confidence.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.article
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="group rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-glow"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-medium tracking-[-0.05em] text-white/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/70 transition group-hover:border-white/20 group-hover:text-white">
                  <service.icon size={20} />
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em] text-white">{service.name}</h3>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/64">{service.summary}</p>
            </motion.article>
          ))}
        </div>
      </div>
      {/* TODO: Move services data to portfolio.json when service content needs to be editable. */}
    </section>
  );
}
