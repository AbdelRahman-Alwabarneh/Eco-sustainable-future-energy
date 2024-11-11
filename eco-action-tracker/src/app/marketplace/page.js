"use client";
import React, { useState } from 'react';
import { Battery, Zap, Wind, Sun, Droplet, DollarSign, Award, X } from 'lucide-react';

const products = [
  {
    title: "Solar Garden Lights",
    description: "Illuminate your garden sustainably with solar-powered LED lights.",
    icon: <Sun className="h-6 w-6 text-[#fdb713]" />,
    image: "https://www.thesolarcentre.co.uk/images/products/so2nsgl.jpg", // Replace with actual image URL
    metric: "Up to 12 hours of illumination",
    price: 49.99,
    points: 499,
  },
  {
    title: "Compost Bin",
    description: "Transform kitchen waste into nutrient-rich compost for your garden.",
    icon: <Droplet className="h-6 w-6 text-[#fdb713]" />,
    image: "https://www.planetnatural.com/wp-content/uploads/2023/01/compost-tumbler.jpg", // Replace with actual image URL
    metric: "Holds up to 80 gallons",
    price: 79.99,
    points: 799,
  },
  {
    title: "Rain Barrel Kit",
    description: "Collect and reuse rainwater for irrigation and household use.",
    icon: <Droplet className="h-6 w-6 text-[#fdb713]" />,
    image: "https://m.media-amazon.com/images/I/91IDgQL9JaL._AC_UF350,350_QL80_.jpg", // Replace with actual image URL
    metric: "Capacity: 50 gallons",
    price: 119.99,
    points: 1199,
  },
  {
    title: "Eco-Friendly Cleaning Kit",
    description: "A set of biodegradable cleaning products that are safe for your home and the environment.",
    icon: <Zap className="h-6 w-6 text-[#fdb713]" />,
    image: "https://mlcvmo0gntjk.i.optimole.com/cb:ICH-.67306/w:1046/h:1045/q:87/f:best/ig:avif/https://www.ecos.com/wp-content/uploads/2023/04/ECOS-household-cleaners-1-updated.jpg", // Replace with actual image URL
    metric: "Includes 5 essential cleaners",
    price: 39.99,
    points: 399,
  },
  {
    title: "Reusable Beeswax Wraps",
    description: "Eco-friendly alternative to plastic wrap for food storage.",
    icon: <Award className="h-6 w-6 text-[#fdb713]" />,
    image: "https://i.etsystatic.com/13457690/r/il/8272ee/2897314011/il_570xN.2897314011_3673.jpg", // Replace with actual image URL
    metric: "Set of 3 wraps in various sizes",
    price: 19.99,
    points: 199,
  },
  {
    title: "Bamboo Toothbrush Set",
    description: "Sustainable bamboo toothbrushes to reduce plastic waste.",
    icon: <Award className="h-6 w-6 text-[#fdb713]" />,
    image: "https://moonbreezecrafts.com/cdn/shop/files/BambooToothbrushSoftBristle4-Pack_NaturalSoftToothbrushesforAdults_BlackCharcoalToothbrushesIncluded_EcoFriendlyWoodenToothbrushesSoftBristles_BiodegradableBambooToothbrushes-134.jpg?v=1706386107&width=1946", // Replace with actual image URL
    metric: "Set of 4 toothbrushes",
    price: 14.99,
    points: 149,
  },
];



const ProductCard = ({ product, onBuy }) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');

  return (
    <div className="bg-[#FAF8ED] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
      <img className="w-full h-80" src={product.image} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-[#2D3134] rounded-full p-2">{product.icon}</div>
          <span className="text-sm font-medium text-[#2D3134]">{product.metric}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-[#2D3134]">{product.title}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded-full text-sm ${paymentMethod === 'cash' ? 'bg-[#2D3134] text-[#FAF8ED]' : 'bg-gray-200 text-[#2D3134]'
                }`}
              onClick={() => setPaymentMethod('cash')}
            >
              Cash
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${paymentMethod === 'points' ? 'bg-[#2D3134] text-[#FAF8ED]' : 'bg-gray-200 text-[#2D3134]'
                }`}
              onClick={() => setPaymentMethod('points')}
            >
              Points
            </button>
          </div>
          <span className="text-[#fdb713] font-bold">
            {paymentMethod === 'cash' ? `$${product.price.toFixed(2)}` : `${product.points} pts`}
          </span>
        </div>
        <button
          className="w-full bg-[#2D3134] text-[#FAF8ED] py-2 rounded-full hover:bg-opacity-90 transition duration-300 flex items-center justify-center"
          onClick={() => onBuy(product, paymentMethod)}
        >
          {paymentMethod === 'cash' ? (
            <>
              <DollarSign className="h-5 w-5 mr-2" />
              Buy Now
            </>
          ) : (
            <>
              <Award className="h-5 w-5 mr-2" />
              Redeem with Points
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const CheckoutPopup = ({ product, paymentMethod, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">{product.title}</h3>
          <p>{product.description}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Payment Method:</p>
          <p>{paymentMethod === 'cash' ? 'Cash' : 'Points'}</p>
        </div>
        <div className="mb-6">
          <p className="font-semibold">Total:</p>
          <p className="text-xl text-[#fdb713]">
            {paymentMethod === 'cash' ? `$${product.price.toFixed(2)}` : `${product.points} pts`}
          </p>
        </div>
        <button
          onClick={onConfirm}
          className="w-full bg-[#2D3134] text-[#FAF8ED] py-2 rounded-full hover:bg-opacity-90 transition duration-300"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

const OrderConfirmation = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
        <p className="mb-6">Thank you for your order. We're preparing it for delivery.</p>
        <button
          onClick={onClose}
          className="bg-[#2D3134] text-[#FAF8ED] py-2 px-4 rounded-full hover:bg-opacity-90 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const EcoMarketplace = () => {
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [checkoutPaymentMethod, setCheckoutPaymentMethod] = useState(null);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  const handleBuy = (product, paymentMethod) => {
    setCheckoutProduct(product);
    setCheckoutPaymentMethod(paymentMethod);
  };

  const handleCloseCheckout = () => {
    setCheckoutProduct(null);
    setCheckoutPaymentMethod(null);
  };

  const handleConfirmOrder = () => {
    setCheckoutProduct(null);
    setCheckoutPaymentMethod(null);
    setShowOrderConfirmation(true);
  };

  const handleCloseOrderConfirmation = () => {
    setShowOrderConfirmation(false);
  };

  return (
    <div className="bg-[#2D3134] min-h-screen py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#FAF8ED]">
          Eco-Sustainable Energy Marketplace
        </h1>
        <p className="text-lg mb-12 text-center text-[#FAF8ED] max-w-3xl mx-auto">
          Discover cutting-edge products that harness renewable energy sources and contribute to a sustainable future.
          Choose to pay with cash or redeem your eco-points!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} onBuy={handleBuy} />
          ))}
        </div>
      </div>
      {checkoutProduct && (
        <CheckoutPopup
          product={checkoutProduct}
          paymentMethod={checkoutPaymentMethod}
          onClose={handleCloseCheckout}
          onConfirm={handleConfirmOrder}
        />
      )}
      {showOrderConfirmation && (
        <OrderConfirmation onClose={handleCloseOrderConfirmation} />
      )}
    </div>
  );
};

export default EcoMarketplace;
