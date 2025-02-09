import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function Modal({
  isOpen,
  date,
  initialValue,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  date: Date | null;
  initialValue: string;
  onClose: () => void;
  onSave: (title: string) => void;
}) {
  const [title, setTitle] = useState(initialValue);

  useEffect(() => {
    setTitle(initialValue);
  }, [initialValue]);

  if (!isOpen || !date) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-gray-600 text-lg font-bold">
          {format(date, "yyyy年MM月dd日")}
        </h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトルを入力"
          className="border p-2 text-gray-600 w-full mt-2"
          maxLength={30}
        />
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => onSave(title)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            保存
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            キャンセル
          </button>
          <button
            onClick={() => onSave("")}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
}
