// frontend/src/pages/Checkout/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 
import { useCart } from '../context/CartContext.jsx'; 
import addressService from '../services/addressService.js'; 
import paymentService from '../services/paymentService.js'; 
import orderService from '../services/orderService.js'; 

const CheckoutPage = () => {
  const { user } = useAuth();

  const { cart, loading: cartLoading, error: cartError, clearCurrentCart } = useCart();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1); 
  const [addresses, setAddresses] = useState([]); 
  const [selectedAddressId, setSelectedAddressId] = useState(''); 
  const [paymentMethods, setPaymentMethods] = useState([]); 
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); 
  const [checkoutError, setCheckoutError] = useState(''); 
  const [isProcessingOrder, setIsProcessingOrder] = useState(false); 

  
  const [newAddressForm, setNewAddressForm] = useState({
    street: '', number: '', complement: '', neighborhood: '', city: '', state: '', zipcode: '', isDefault: false
  });
  const [showNewAddressForm, setShowNewAddressForm] = useState(false); 
  const [newAddressError, setNewAddressError] = useState(''); 

  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        navigate('/login');
        return;
      }
      
      if (cartLoading) return;
      if (cartError) {
        setCheckoutError('Erro ao carregar o carrinho para o checkout.');
        return;
      }
      if (!cart || cart.cartItems.length === 0) {
        navigate('/cart'); 
        return;
      }

      try {
        
        const fetchedAddresses = await addressService.getAddresses();
        setAddresses(fetchedAddresses);
        
        if (fetchedAddresses.length > 0) {
          const defaultAddress = fetchedAddresses.find(addr => addr.isDefault) || fetchedAddresses[0];
          setSelectedAddressId(defaultAddress.id);
        }

        
        const fetchedPaymentMethods = await paymentService.getAvailablePaymentMethods();
        setPaymentMethods(fetchedPaymentMethods);
        if (fetchedPaymentMethods.length > 0) {
          setSelectedPaymentMethod(fetchedPaymentMethods[0].id); 
        }

      } catch (err) {
        setCheckoutError(err.response?.data?.message || 'Erro ao carregar informações de endereço/pagamento.');
        console.error('Checkout fetch data error:', err);
      }
    };

    fetchData();
  }, [user, cart, cartLoading, cartError, navigate]); 
  
  const handleNewAddressSubmit = async (e) => {
    e.preventDefault();
    setNewAddressError('');
    try {
      
      const savedAddress = await addressService.addAddress(newAddressForm);
      setAddresses([...addresses, savedAddress]); 
      setSelectedAddressId(savedAddress.id); 
      setShowNewAddressForm(false); 
      
      setNewAddressForm({ street: '', number: '', complement: '', neighborhood: '', city: '', state: '', zipcode: '', isDefault: false });
    } catch (err) {
      setNewAddressError(err.response?.data?.message || 'Erro ao adicionar novo endereço.');
      console.error('Erro ao adicionar endereço:', err);
    }
  };


  
  const handlePlaceOrder = async () => {
    setCheckoutError('');
    if (!selectedAddressId) {
      setCheckoutError('Por favor, selecione um endereço de entrega.');
      return;
    }
    if (!selectedPaymentMethod) {
      setCheckoutError('Por favor, selecione um método de pagamento.');
      return;
    }
    if (!cart || cart.cartItems.length === 0) {
        setCheckoutError('Seu carrinho está vazio. Por favor, adicione itens.');
        navigate('/cart'); 
        return;
    }

    setIsProcessingOrder(true); 
    try {
      
      const orderData = {
        addressId: selectedAddressId,
        paymentId: selectedPaymentMethod, 
        
      };

      console.log(orderData)
      
      const newOrder = await orderService.finalizeOrder(orderData); 

      
      clearCurrentCart(); 
      navigate(`/order-confirmation/${newOrder.id}`); 
    } catch (err) {
      setCheckoutError(err.response?.data?.message || 'Falha ao finalizar o pedido. Verifique os dados e tente novamente.');
      console.error('Erro ao finalizar pedido:', err);
    } finally {
      setIsProcessingOrder(false); 
    }
  };


  
  if (cartLoading || !user) { 
    return (
      <div className="container mx-auto py-8 text-center text-lg text-gray-600">
        Carregando checkout...
      </div>
    );
  }

  if (checkoutError && !cartError) { 
    return (
      <div className="container mx-auto py-8 text-center text-lg text-red-600">
        {checkoutError}
      </div>
    );
  }

  if (!cart || cart.cartItems.length === 0) { 
    return (
        <div className="container mx-auto py-8 text-center text-lg text-gray-600">
          Seu carrinho está vazio. <Link to="/products" className="text-blue-600 hover:underline">Começar a comprar</Link>
        </div>
      );
  }

  const formatAddress = (addr) => {
    if (!addr) return 'Endereço inválido';
    return `${addr.street || ''}, ${addr.number || ''} ${addr.complement ? '- ' + addr.complement : ''}, ${addr.neighborhood || ''}, ${addr.city || ''} - ${addr.state || ''}, ${addr.zipcode || ''}`;
  };

  
  const formInputClass = "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500";


  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Finalizar Pedido</h1>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        {checkoutError && !cartError && ( 
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {checkoutError}
          </div>
        )}

        
        <div className="mb-8 border-b pb-8 border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Endereço de Entrega</h2>
          
          {addresses.length === 0 && !showNewAddressForm ? (
            <p className="text-gray-600 mb-4">Você não tem endereços cadastrados. Por favor, adicione um.</p>
          ) : (
            <div className="mb-4 space-y-3">
              {addresses.map(addr => (
                <div key={addr.id} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    id={`address-${addr.id}`}
                    name="deliveryAddress"
                    value={addr.id}
                    checked={selectedAddressId === addr.id}
                    onChange={(e) => setSelectedAddressId(parseInt(e.target.value))}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor={`address-${addr.id}`} className="ml-3 text-gray-700 flex-1">
                    {formatAddress(addr)} {addr.isDefault && <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Padrão</span>}
                  </label>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowNewAddressForm(!showNewAddressForm)}
            className="text-blue-600 hover:text-blue-800 font-medium py-2 px-4 rounded-md border border-blue-600 hover:border-blue-800 transition-colors mt-4"
          >
            {showNewAddressForm ? 'Cancelar Novo Endereço' : 'Adicionar Novo Endereço'}
          </button>

          {showNewAddressForm && (
            <form onSubmit={handleNewAddressSubmit} className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Detalhes do Novo Endereço</h3>
              {newAddressError && <div className="text-red-500 text-sm mb-3">{newAddressError}</div>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Rua" required value={newAddressForm.street} onChange={(e) => setNewAddressForm({ ...newAddressForm, street: e.target.value })} className={formInputClass} />
                <input type="text" placeholder="Número" required value={newAddressForm.number} onChange={(e) => setNewAddressForm({ ...newAddressForm, number: e.target.value })} className={formInputClass} />
                <input type="text" placeholder="Complemento (Opcional)" value={newAddressForm.complement} onChange={(e) => setNewAddressForm({ ...newAddressForm, complement: e.target.value })} className={formInputClass} />
                <input type="text" placeholder="Bairro" required value={newAddressForm.neighborhood} onChange={(e) => setNewAddressForm({ ...newAddressForm, neighborhood: e.target.value })} className={formInputClass} />
                <input type="text" placeholder="Cidade" required value={newAddressForm.city} onChange={(e) => setNewAddressForm({ ...newAddressForm, city: e.target.value })} className={formInputClass} />
                <input type="text" placeholder="Estado (ex: SP)" required value={newAddressForm.state} onChange={(e) => setNewAddressForm({ ...newAddressForm, state: e.target.value })} className={formInputClass} />
                <input type="text" placeholder="CEP" required value={newAddressForm.zipcode} onChange={(e) => setNewAddressForm({ ...newAddressForm, zipcode: e.target.value })} className={formInputClass} />
              </div>
              <div className="mt-4 flex items-center">
                <input type="checkbox" id="isDefault" checked={newAddressForm.isDefault} onChange={(e) => setNewAddressForm({ ...newAddressForm, isDefault: e.target.checked })} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor="isDefault" className="ml-2 text-gray-700 text-sm">Definir como endereço padrão</label>
              </div>
              <button type="submit" className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md">
                Salvar Endereço
              </button>
            </form>
          )}
        </div>

        
        <div className="mb-8 border-b pb-8 border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Método de Pagamento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map(method => (
              <div key={method.id} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  id={`payment-${method.id}`}
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedPaymentMethod === method.id}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <label htmlFor={`payment-${method.id}`} className="ml-3 text-gray-700 font-medium">
                  {method.name} <span className="text-gray-500 text-sm">({method.description})</span>
                </label>
              </div>
            ))}
          </div>
          {selectedPaymentMethod === '1' && ( // Se for cartão de crédito, exibe campos fictícios
            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Dados do Cartão de Crédito (Apenas para Teste)</h3>
              <input type="text" placeholder="Número do Cartão" className={`${formInputClass} mb-3`} />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Validade (MM/AA)" className={formInputClass} />
                <input type="text" placeholder="CVC" className={formInputClass} />
              </div>
            </div>
          )}
          {selectedPaymentMethod === '2' && ( // Se for cartão de debito
            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Dados do Cartão de Débito(Apenas para Teste)</h3>
              <input type="text" placeholder="Número do Cartão" className={`${formInputClass} mb-3`} />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Validade (MM/AA)" className={formInputClass} />
                <input type="text" placeholder="CVC" className={formInputClass} />
              </div>
            </div>
          )}
        </div>
          
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Resumo do Pedido</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-bold text-lg mb-2 border-b border-gray-300 pb-2">Itens do Carrinho:</h3>
            <ul className="list-disc pl-5 mb-4 space-y-1">
                {console.log(cart.cartItems)}
              {cart.cartItems.map(item => (
                <li key={item.id} className="text-gray-700 text-base flex justify-between">
                  <span>{item.product.name} ({item.variations.size} - {item.variations.color}) x {item.quantity}</span>
                  <span>R$ {item.subtotalPrice ? item.subtotalPrice.toFixed(2).replace('.', ',') : '0,00'}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-300 my-4"></div>
            <div className="flex justify-between items-center text-xl font-bold text-gray-900 mb-6">
              <span>Total a Pagar:</span>
              <span>R$ {cart.total ? cart.total.toFixed(2).replace('.', ',') : '0,00'}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">Ao confirmar o pedido, você concorda com nossos termos e condições.</p>
        </div>

        
        <div className="mt-8 text-center">
          <button
            onClick={handlePlaceOrder}
            disabled={isProcessingOrder || !selectedAddressId || !selectedPaymentMethod || cart.cartItems.length === 0}
            className={`py-3 px-10 rounded-md font-bold text-white transition duration-300 shadow-lg
              ${(isProcessingOrder || !selectedAddressId || !selectedPaymentMethod || cart.cartItems.length === 0)
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
          >
            {isProcessingOrder ? 'Processando Pedido...' : 'Confirmar Pedido'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;