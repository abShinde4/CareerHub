import { useAuth } from '../../context/useAuth';

export default function Settings() {
  const { admin } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      <div className="bg-white rounded-2xl p-6 border border-gray-100 max-w-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-gray-500">Name:</span>{' '}
            <span className="font-medium text-gray-900">{admin?.name}</span>
          </div>
          <div>
            <span className="text-gray-500">Email:</span>{' '}
            <span className="font-medium text-gray-900">{admin?.email}</span>
          </div>
          <div>
            <span className="text-gray-500">Role:</span>{' '}
            <span className="font-medium text-gray-900">{admin?.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
