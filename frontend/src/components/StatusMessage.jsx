const styleMap = {
  success: "border-emerald-600/60 bg-emerald-900/40 text-emerald-100",
  error: "border-rose-600/60 bg-rose-900/40 text-rose-100",
  info: "border-cyan-600/60 bg-cyan-900/40 text-cyan-100",
};

const StatusMessage = ({ type = "info", text }) => {
  if (!text) {
    return null;
  }

  return (
    <p className={`rounded-md border px-3 py-2 text-sm ${styleMap[type]}`}>
      {text}
    </p>
  );
};

export default StatusMessage;
