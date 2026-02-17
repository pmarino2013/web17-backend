const SectionCard = ({ title, description, children }) => {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-slate-950/40">
      <h2 className="text-xl font-bold text-cyan-300">{title}</h2>
      {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
};

export default SectionCard;
