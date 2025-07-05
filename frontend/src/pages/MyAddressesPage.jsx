
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import addressService from '../services/addressService.js';

const MyAddressesPage = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const [addressForm, setAddressForm] = useState({
    street: '', number: '', complement: '', neighborhood: '', city: '', state: '', zipcode: '', isDefault: false
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const fetchedAddresses = await addressService.getAddresses();
        setAddresses(fetchedAddresses);
      } catch (err) {
        setError(err.response?.data?.message || 'Falha ao carregar seus endereços.');
        console.error('Erro ao buscar endereços:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [user]);

  const handleEditClick = (address) => {
    setEditingAddress(address);
    setAddressForm({
      street: address.street,
      number: address.number,
      complement: address.complement || '',
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode,
      isDefault: address.isDefault || false,
    });
    setShowAddressForm(true);
    setFormError('');
    setFormSuccess('');
  };

  const handleSubmitAddress = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    try {
      let savedAddress;
      if (editingAddress) {
        savedAddress = await addressService.updateAddress(editingAddress.id, addressForm);
        setAddresses(addresses.map(addr => addr.id === savedAddress.id ? savedAddress : addr));
        setFormSuccess('Endereço atualizado com sucesso!');
      } else {
        savedAddress = await addressService.addAddress(addressForm);
        setAddresses([...addresses, savedAddress]);
        setFormSuccess('Endereço adicionado com sucesso!');
      }

      if (savedAddress.isDefault) {
          setAddresses(prevAddresses => prevAddresses.map(addr => 
              addr.id === savedAddress.id ? savedAddress : { ...addr, isDefault: false }
          ));
      }

      setTimeout(() => {
        setShowAddressForm(false);
        setEditingAddress(null);
        setAddressForm({ street: '', number: '', complement: '', neighborhood: '', city: '', state: '', zipcode: '', isDefault: false });
        setFormSuccess('');
      }, 1500);
      
    } catch (err) {
      setFormError(err.response?.data?.message || 'Erro ao salvar o endereço.');
      console.error('Erro ao salvar endereço:', err);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este endereço?')) {
      setFormError('');
      setFormSuccess('');
      try {
        await addressService.deleteAddress(id);
        setAddresses(addresses.filter(addr => addr.id !== id));
        setFormSuccess('Endereço removido com sucesso!');
      } catch (err) {
        setFormError(err.response?.data?.message || 'Existe um endereço que esta sendo utilizado em um pedido');
        console.error('Erro ao remover endereço:', err);
      }
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return 'Endereço inválido';
    return `${addr.street || ''}, ${addr.number || ''} ${addr.complement ? '- ' + addr.complement : ''}, ${addr.neighborhood || ''}, ${addr.city || ''} - ${addr.state || ''}, ${addr.zipcode || ''}`;
  };

  const formInputClass = "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500";


  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center text-lg text-gray-600">
        Carregando endereços...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center text-lg text-red-600">
        {error}
        <p className="mt-4">
          <Link to="/perfil" className="text-blue-600 hover:underline">Voltar ao Perfil</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Meus Endereços</h1>

        {formSuccess && (
          <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg text-center">{formSuccess}</div>
        )}
        {formError && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg text-center">{formError}</div>
        )}

        <div className="mb-6 text-right">
          <button
            onClick={() => {
              setShowAddressForm(!showAddressForm);
              setEditingAddress(null);
              setAddressForm({ street: '', number: '', complement: '', neighborhood: '', city: '', state: '', zipcode: '', isDefault: false });
              setFormError('');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            {showAddressForm ? 'Cancelar' : 'Adicionar Novo Endereço'}
          </button>
        </div>

        {showAddressForm && (
          <form onSubmit={handleSubmitAddress} className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{editingAddress ? 'Editar Endereço' : 'Adicionar Novo Endereço'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" placeholder="Rua" required value={addressForm.street} onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })} className={formInputClass} />
              <input type="text" placeholder="Número" required value={addressForm.number} onChange={(e) => setAddressForm({ ...addressForm, number: e.target.value })} className={formInputClass} />
              <input type="text" placeholder="Complemento (Opcional)" value={addressForm.complement} onChange={(e) => setAddressForm({ ...addressForm, complement: e.target.value })} className={formInputClass} />
              <input type="text" placeholder="Bairro" required value={addressForm.neighborhood} onChange={(e) => setAddressForm({ ...addressForm, neighborhood: e.target.value })} className={formInputClass} />
              <input type="text" placeholder="Cidade" required value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} className={formInputClass} />
              <input type="text" placeholder="Estado (ex: SP)" required value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} className={formInputClass} />
              <input type="text" placeholder="CEP" required value={addressForm.zipcode} onChange={(e) => setAddressForm({ ...addressForm, zipcode: e.target.value })} className={formInputClass} />
            </div>
            <div className="flex items-center mb-6">
              <input type="checkbox" id="isDefault" checked={addressForm.isDefault} onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="isDefault" className="ml-2 text-gray-700 text-sm">Definir como endereço padrão</label>
            </div>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
              {editingAddress ? 'Salvar Alterações' : 'Adicionar Endereço'}
            </button>
          </form>
        )}

        {addresses.length === 0 && !showAddressForm ? (
          <div className="text-center py-8 text-gray-600">
            <p className="text-xl mb-4">Você ainda não tem endereços cadastrados.</p>
            <p>Adicione um novo endereço para prosseguir com suas compras.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {addresses.map((address) => (
              <div key={address.id} className="p-5 border border-gray-200 rounded-lg bg-gray-50 shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-semibold text-lg text-gray-800">{formatAddress(address)}</p>
                  {address.isDefault && (
                    <span className="mt-1 inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Endereço Padrão</span>
                  )}
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEditClick(address)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteClick(address.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/perfil" className="text-blue-600 hover:underline">Voltar ao Perfil</Link>
        </div>
      </div>
    </div>
  );
};

export default MyAddressesPage;