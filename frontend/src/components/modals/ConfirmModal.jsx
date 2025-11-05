export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="text-slate-300">{message}</p>

      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white"
          onClick={onCancel}
        >
          Annuler
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
          onClick={() => {
            onConfirm?.();
            onCancel?.();
          }}
        >
          Confirmer
        </button>
      </div>
    </div>
  );
}
