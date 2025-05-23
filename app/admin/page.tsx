'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Truck, UserCheck } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  status: string;
  createdAt: string;
  seller: {
    name: string;
    email: string;
  };
  purchases: Array<{
    buyer: {
      name: string;
      email: string;
    }
  }>;
  buyer: {
    name: string;
    email: string;
  } | null;
}

export default function AdminPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBuyer, setSelectedBuyer] = useState<string>('');

  useEffect(() => {
    if (session?.user?.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    fetchProducts();
    fetchUsers();
  }, [session]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  const updateProductStatus = async (productId: string, newStatus: 'SOLD' | 'SHIPPED') => {
    try {
      if (newStatus === 'SOLD' && !selectedBuyer) {
        alert('Por favor, selecione um comprador');
        return;
      }

      const response = await fetch(`/api/admin/products/${productId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: newStatus,
          buyerId: newStatus === 'SOLD' ? selectedBuyer : undefined
        }),
      });

      if (response.ok) {
        setSelectedBuyer('');
        fetchProducts();
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'Disponível';
      case 'PENDING':
        return 'Pendente';
      case 'SOLD':
        return 'Vendido';
      case 'SHIPPED':
        return 'Enviado';
      case 'DELIVERED':
        return 'Entregue';
      default:
        return status;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-apple-blue drop-shadow">Painel Administrativo</h1>
        <span className="text-gray-500 text-sm">Gerencie produtos, vendas e usuários</span>
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-apple-blue to-blue-400 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Produto</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Vendedor</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Comprador</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Data</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={product.id} className={idx % 2 === 0 ? 'bg-gray-50 hover:bg-blue-50 transition' : 'bg-white hover:bg-blue-50 transition'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-semibold text-gray-900 text-base">{product.name}</div>
                  <div className="text-sm text-gray-500">R$ {product.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">{product.seller.name}</div>
                  <div className="text-xs text-gray-500">{product.seller.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.buyer ? (
                    <>
                      <div className="text-sm text-gray-900 font-medium flex items-center gap-1"><UserCheck className="w-4 h-4 text-green-500" />{product.buyer.name}</div>
                      <div className="text-xs text-gray-500">{product.buyer.email}</div>
                    </>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs font-bold rounded-full shadow-sm
                    ${product.status === 'SOLD' ? 'bg-green-100 text-green-700 border border-green-300' :
                      product.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                      product.status === 'DELIVERED' ? 'bg-purple-100 text-purple-700 border border-purple-300' :
                      product.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' :
                      'bg-gray-100 text-gray-700 border border-gray-300'}`}
                  >
                    {getStatusLabel(product.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(product.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(product.status === 'PENDING' || product.status === 'AVAILABLE') && (
                    <div className="flex flex-col gap-2 min-w-[180px]">
                      <select
                        value={selectedBuyer}
                        onChange={(e) => setSelectedBuyer(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-apple-blue focus:ring-apple-blue sm:text-sm"
                      >
                        <option value="">Selecione um comprador</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name} ({user.email})
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => updateProductStatus(product.id, 'SOLD')}
                        className="flex items-center gap-2 justify-center bg-apple-blue text-white px-3 py-1 rounded shadow hover:bg-blue-700 transition disabled:bg-gray-300 disabled:text-gray-500"
                        disabled={!selectedBuyer}
                      >
                        <CheckCircle className="w-4 h-4" /> Marcar como Vendido
                      </button>
                    </div>
                  )}
                  {product.status === 'SOLD' && (
                    <button
                      onClick={() => updateProductStatus(product.id, 'SHIPPED')}
                      className="flex items-center gap-2 justify-center bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-700 transition"
                    >
                      <Truck className="w-4 h-4" /> Marcar como Enviado
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 