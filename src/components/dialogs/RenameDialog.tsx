import { useState } from 'react';

type Props = {
  currentName: string;
  onCancel: () => void;
  onConfirm: (newName: string) => void;
};

export default function RenameDialog({ currentName, onCancel, onConfirm }: Props) {
  const [name, setName] = useState(currentName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed === '' || trimmed === currentName) return;
    onConfirm(trimmed);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4" onClick={onCancel}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-dark-900 border border-dark-800 rounded-lg p-4 flex flex-col gap-3"
      >
        <h2 className="text-lg font-semibold">Rename</h2>

        <input
          type="text"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => e.target.select()}
          className="w-full bg-dark-950 border border-dark-800 rounded-lg px-3 py-2 outline-none focus:border-dark-700"
        />

        <div className="flex justify-end gap-2 mt-1">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg hover:bg-dark-800 transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            disabled={name.trim() === '' || name.trim() === currentName}
            className="px-4 py-2 rounded-lg bg-dark-500 hover:bg-dark-600 transition-colors disabled:opacity-50"
          >
            Rename
          </button>
        </div>
      </form>
    </div>
  );
}
