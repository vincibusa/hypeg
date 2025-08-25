'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Contattaci</h2>
          <div className="w-20 h-1 bg-purple-600 mt-2 mb-4 mx-auto"></div>
          <p className="text-gray-600">Hai un progetto in mente? Parliamone!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          <form className="bg-white p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                Nome
              </label>
              <input
                type="text"
                id="name"
                placeholder="Il tuo nome"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="La tua email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 text-sm font-medium mb-2">
                Oggetto
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Oggetto del messaggio"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">
                Messaggio
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Il tuo messaggio"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="inline-block w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:scale-105 transform transition duration-300"
              >
                Invia
              </button>
            </div>
          </form>

          <div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="text-purple-600 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Indirizzo</h4>
                  <p className="text-gray-600">Via Roma 123, 20100 Milano, Italia</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="text-purple-600 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-600">info@hipeg.it</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="text-purple-600 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Telefono</h4>
                  <p className="text-gray-600">+39 02 1234567</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gray-200 h-80 rounded-lg flex items-center justify-center text-gray-500">
              Mappa Google
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}