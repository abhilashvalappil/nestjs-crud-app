 
import api from '../api';
import type { User } from '../api';
import UserForm from './UserForm';
import UserCard from './UserCard';
import { useEffect, useState } from 'react';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [editing, setEditing] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (u: User) => {
    try {
      await api.post('/users', u);
      fetchUsers();
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  const handleUpdate = async (id: string, u: Partial<User>) => {
    try {
      await api.put(`/users/${id}`, u);
      fetchUsers();
      setEditing(null);
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete user?')) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div>
      <UserForm onSubmit={handleCreate} />

      <div className="mt-6 space-y-4">
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            onEdit={(u) => setEditing(u)}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {editing && (
        <div className="mt-6">
          <h3 className="font-medium mb-2">Edit User</h3>
          <UserForm
            initial={editing}
            onSubmit={(vals) => editing._id && handleUpdate(editing._id, vals)}
            submitLabel="Update"
          />
        </div>
      )}
    </div>
  );
}
