 
import type { User } from '../api';  

interface Props {
  user: User;
  onEdit: (u: User) => void;
  onDelete: (id: string) => void;
}

export default function UserCard({ user, onEdit, onDelete }: Props) {
  return (
    <div className="p-4 bg-white rounded shadow flex items-center justify-between">
      <div>
        <div className="font-semibold">{user.fullName}</div>
        <div className="text-sm text-gray-600">
          {user.email} • {user.role || '—'}
        </div>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(user)}
          className="px-3 py-1 border rounded"
        >
          Edit
        </button>
        {user._id && (
          <button
            onClick={() => onDelete(user._id!)}
            className="px-3 py-1 border rounded"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
