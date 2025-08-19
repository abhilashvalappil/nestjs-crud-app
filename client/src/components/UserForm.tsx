import React, { useEffect, useState } from 'react';
import type { User } from '../api'; 

export default function UserForm({ initial, onSubmit, submitLabel = 'Create' } : {
  initial?: User,
  onSubmit: (vals: User) => Promise<void>,
  submitLabel?: string
}) {
  const [form, setForm] = useState<User>({ fullName: '', email: '', role: '' });

  useEffect(() => { if (initial) setForm({ fullName: initial.fullName, email: initial.email, role: initial.role || '' }); }, [initial]);

  const handle = (k: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  return (
    <form onSubmit={async (e) => { e.preventDefault(); await onSubmit(form); setForm({ fullName: '', email: '', role: '' }); }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input value={form.fullName} onChange={handle('fullName')} placeholder="Full name" className="p-2 border rounded" required />
        <input value={form.email} onChange={handle('email')} placeholder="Email" type="email" className="p-2 border rounded" required />
        <input value={form.role} onChange={handle('role')} placeholder="Role" className="p-2 border rounded" />
      </div>
      <div className="mt-2">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{submitLabel}</button>
      </div>
    </form>
  );
}
