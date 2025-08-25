export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <a href="#" className="text-2xl font-bold text-[var(--text-primary)] mb-4 block">
              HipeG
            </a>
            <p className="text-[var(--text-secondary)] mb-4">
              Trasformiamo le tue idee in progetti digitali di successo.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition duration-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" />
                </svg>
              </a>
              <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition duration-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition duration-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
              <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition duration-300">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.299 1.634 4.208 3.807 4.649-.63.172-1.295.223-1.994.187.653 1.954 2.551 3.32 4.814 3.359-1.921 1.503-4.32 2.37-6.898 2.37-.447 0-.89-.026-1.326-.077 2.492 1.603 5.465 2.541 8.675 2.541 10.411 0 16.121-8.62 15.823-16.342.998-.722 1.864-1.633 2.559-2.658z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[var(--text-primary)] font-semibold mb-4">Link Rapidi</h4>
            <div className="w-10 h-0.5 bg-purple-500 mb-4"></div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-[var(--text-primary)] transition duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--text-primary)] transition duration-300">
                  Chi Siamo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--text-primary)] transition duration-300">
                  Servizi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--text-primary)] transition duration-300">
                  Contatti
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--text-primary)] font-semibold mb-4">Servizi</h4>
            <div className="w-10 h-0.5 bg-purple-500 mb-4"></div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-[var(--text-primary)] transition duration-300">
                  Siti Web & eCommerce
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--text-primary)] transition duration-300">
                  Gestione Social Media
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--text-primary)] transition duration-300">
                  Video & Foto Making
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--text-primary)] transition duration-300">
                  Grafica & Branding
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--text-primary)] transition duration-300">
                  E-learning & Formazione
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--text-primary)] font-semibold mb-4">Contatti</h4>
            <div className="w-10 h-0.5 bg-purple-500 mb-4"></div>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li>Via Roma 123, Milano</li>
              <li>info@hipeg.it</li>
              <li>+39 02 1234567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border-primary)] mt-12 pt-8 text-center text-[var(--text-secondary)]">
          <p>&copy; 2023 HipeG Creative Company. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}