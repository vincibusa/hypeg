'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

export default function TermsOfServiceClient() {
  const sections = [
    {
      id: "oggetto",
      title: "1. Oggetto e Campo di Applicazione",
      content: `
        I presenti Termini di Servizio disciplinano il rapporto contrattuale tra HipeG Creative Company 
        (di seguito "HipeG", "noi" o "la Società") e il Cliente per la fornitura di servizi di comunicazione digitale.
        
        **1.1 Servizi offerti:**
        - Social Media Management (gestione Instagram, Facebook, LinkedIn, TikTok)
        - Sviluppo e gestione siti web ed e-commerce
        - Grafica e branding aziendale
        - Video making e fotografia
        - Consulenza di marketing digitale
        - E-learning e formazione online
        
        **1.2 Accettazione dei termini:**
        L'utilizzo dei nostri servizi e/o l'invio di un ordine comporta l'accettazione integrale 
        dei presenti Termini di Servizio. Il Cliente dichiara di aver letto, compreso e accettato 
        tutte le clausole qui contenute.
        
        **1.3 Modifiche:**
        HipeG si riserva il diritto di modificare i presenti termini in qualsiasi momento. 
        Le modifiche saranno comunicate al Cliente e diventeranno efficaci dalla data indicata nella comunicazione.
      `
    },
    {
      id: "dati-societari",
      title: "2. Dati Societari",
      content: `
        **HipeG Creative Company**
        Via Antonio Daneu 30, 90142 Palermo (PA), Italia
        Email: commerciale@pubbliworks.it
        Telefono: +39 349 385 0703
        P.IVA: [Da inserire]
        
        **Foro competente:** Tribunale di Palermo
        **Legge applicabile:** Normativa italiana ed europea
      `
    },
    {
      id: "ordini-contratti",
      title: "3. Ordini e Conclusione del Contratto",
      content: `
        **3.1 Procedura di ordine:**
        - Il Cliente può richiedere i servizi tramite il sito web, email o contatto telefonico
        - Ogni richiesta costituisce proposta contrattuale
        - Il contratto si perfeziona con l'accettazione da parte di HipeG
        - L'accettazione può avvenire tramite conferma scritta o inizio dell'esecuzione
        
        **3.2 Preventivi:**
        - I preventivi sono validi 30 giorni dalla data di emissione
        - I prezzi si intendono IVA esclusa, salvo diversa indicazione
        - HipeG si riserva il diritto di modificare i prezzi per servizi non ancora confermati
        
        **3.3 Documenti contrattuali:**
        Il rapporto è disciplinato da:
        - Proposta commerciale o preventivo
        - Presenti Termini di Servizio
        - Eventuali allegati tecnici
        - Brief e specifiche tecniche
      `
    },
    {
      id: "servizi-social",
      title: "4. Servizi di Social Media Management",
      content: `
        **4.1 Descrizione del servizio:**
        - Creazione e pubblicazione contenuti
        - Gestione community e interazioni
        - Strategia editoriale personalizzata
        - Report periodici sulle performance
        - Gestione campagne pubblicitarie (se previste)
        
        **4.2 Obblighi del Cliente:**
        - Fornire accessi amministratori ai profili social
        - Condividere materiali necessari (loghi, foto, testi)
        - Approvare i contenuti entro i tempi concordati
        - Rispettare le policy delle piattaforme social
        
        **4.3 Responsabilità:**
        - HipeG non è responsabile per sospensioni/ban dei profili dovuti a violazioni delle policy
        - Il Cliente mantiene la proprietà dei propri profili social
        - HipeG mantiene i diritti sui contenuti creativi originali prodotti
        
        **4.4 Durata e rinnovo:**
        - Contratti a durata determinata con rinnovo automatico salvo disdetta
        - Preavviso di disdetta: 30 giorni prima della scadenza
        - Servizi attivi fino alla fine del periodo pagato
      `
    },
    {
      id: "servizi-web",
      title: "5. Servizi di Sviluppo Web",
      content: `
        **5.1 Sviluppo siti web:**
        - Analisi requisiti e progettazione
        - Design grafico personalizzato
        - Sviluppo responsive e ottimizzazione SEO
        - Test e collaudo pre-lancio
        - Formazione base all'utilizzo
        
        **5.2 Hosting e dominio:**
        - Registrazione dominio inclusa per i primi 12 mesi
        - Hosting professionale con backup automatici
        - Certificato SSL incluso
        - Supporto tecnico base
        
        **5.3 Consegna e collaudo:**
        - Consegna entro i tempi indicati nel preventivo
        - Periodo di collaudo di 15 giorni
        - Correzioni incluse per eventuali difetti di conformità
        - Rilascio finale previo saldo del pagamento
        
        **5.4 Proprietà intellettuale:**
        - Il Cliente acquisisce la proprietà del sito web sviluppato
        - HipeG mantiene i diritti sui propri framework e strumenti proprietari
        - Codice sorgente personalizzato fornito al Cliente
      `
    },
    {
      id: "pagamenti",
      title: "6. Pagamenti e Fatturazione",
      content: `
        **6.1 Modalità di pagamento:**
        - PayPal per pagamenti online
        - Bonifico bancario per importi elevati
        - Pagamenti ricorrenti per servizi in abbonamento
        
        **6.2 Tempi di pagamento:**
        - Servizi ricorrenti: anticipo mensile/annuale
        - Progetti one-time: 50% all'avvio, 50% alla consegna
        - Servizi urgenti: pagamento anticipato richiesto
        
        **6.3 Ritardati pagamenti:**
        - Sospensione servizi dopo 15 giorni di ritardo
        - Interessi di mora: tasso legale + 2%
        - Recupero crediti tramite procedure legali
        
        **6.4 Fatturazione:**
        - Fatture elettroniche tramite Sistema di Interscambio
        - Emissione entro 15 giorni dalla prestazione
        - Dati fatturazione da fornire prima dell'inizio servizi
      `
    },
    {
      id: "proprieta-intellettuale",
      title: "7. Proprietà Intellettuale",
      content: `
        **7.1 Contenuti originali:**
        - HipeG mantiene i diritti sui propri lavori creativi originali
        - Il Cliente ottiene licenza d'uso per i fini concordati
        - Utilizzi diversi richiedono autorizzazione scritta
        
        **7.2 Materiali del Cliente:**
        - Il Cliente garantisce la proprietà o autorizzazione d'uso
        - Esonero di responsabilità per violazioni di diritti di terzi
        - Licenza d'uso a HipeG per l'esecuzione dei servizi
        
        **7.3 Modifiche e derivati:**
        - Modifiche ai lavori di HipeG solo con autorizzazione
        - Portfolio e case study: HipeG può utilizzare i lavori realizzati
        - Rimozione dal portfolio su richiesta motivata del Cliente
        
        **7.4 Violazioni:**
        - Notifica immediata di eventuali violazioni
        - Collaborazione per la tutela dei diritti
        - Risarcimento danni per violazioni accertate
      `
    },
    {
      id: "responsabilita",
      title: "8. Responsabilità e Garanzie",
      content: `
        **8.1 Garanzie di HipeG:**
        - Esecuzione diligente dei servizi concordati
        - Rispetto dei tempi di consegna indicati
        - Conformità alle specifiche tecniche
        - Supporto tecnico nei termini dell'accordo
        
        **8.2 Limitazioni di responsabilità:**
        - Responsabilità limitata al valore del contratto
        - Esclusione danni indiretti o consequenziali
        - Non responsabilità per interruzioni dovute a terzi
        - Forza maggiore ed eventi eccezionali
        
        **8.3 Obblighi del Cliente:**
        - Fornire informazioni accurate e complete
        - Collaborare attivamente nel progetto
        - Rispettare i termini di pagamento
        - Non interferire con l'esecuzione dei servizi
        
        **8.4 Garanzia sui servizi:**
        - Garanzia 12 mesi su sviluppo siti web
        - Correzione gratuita di difetti di conformità
        - Supporto tecnico base incluso
        - Aggiornamenti di sicurezza critici
      `
    },
    {
      id: "privacy-riservatezza",
      title: "9. Privacy e Riservatezza",
      content: `
        **9.1 Trattamento dati personali:**
        - Conformità al GDPR (Regolamento UE 2016/679)
        - Informativa privacy disponibile sul sito
        - Consenso specifico per finalità di marketing
        - Diritti dell'interessato garantiti
        
        **9.2 Riservatezza commerciale:**
        - Obbligo di riservatezza su informazioni sensibili
        - Non divulgazione di strategie e dati aziendali
        - Protezione di segreti commerciali e know-how
        - Accordi di riservatezza specifici se necessari
        
        **9.3 Sicurezza dati:**
        - Misure tecniche e organizzative appropriate
        - Backup regolari e sistemi di sicurezza
        - Accesso limitato su base need-to-know
        - Notifica tempestiva di eventuali violazioni
        
        **9.4 Conservazione dati:**
        - Conservazione limitata al necessario
        - Cancellazione al termine del rapporto
        - Archviazione per obblighi legali/fiscali
        - Portabilità dei dati del Cliente
      `
    },
    {
      id: "risoluzione-controversie",
      title: "10. Risoluzione Controversie e Recesso",
      content: `
        **10.1 Risoluzione del contratto:**
        - Inadempimento grave della controparte
        - Mancato pagamento protratto oltre 30 giorni
        - Violazione sostanziale dei termini contrattuali
        - Procedure concorsuali o cessazione attività
        
        **10.2 Recesso del Cliente:**
        - Preavviso scritto di 30 giorni
        - Pagamento dei servizi già erogati
        - Consegna materiali e accessi
        - Nessun rimborso per periodi già pagati
        
        **10.3 Sospensione servizi:**
        - Mancato pagamento delle fatture
        - Violazione delle policy delle piattaforme
        - Uso improprio dei servizi forniti
        - Comportamenti lesivi della reputazione di HipeG
        
        **10.4 Mediazione e arbitrato:**
        - Tentativo di mediazione prima del ricorso legale
        - Camera di Commercio di Palermo per mediazione
        - Foro esclusivo: Tribunale di Palermo
        - Legge italiana applicabile
      `
    },
    {
      id: "forza-maggiore",
      title: "11. Forza Maggiore e Causa di Forza Maggiore",
      content: `
        **11.1 Eventi di forza maggiore:**
        - Calamità naturali e eventi atmosferici eccezionali
        - Guerre, terrorismo, sommosse
        - Pandemie e emergenze sanitarie
        - Interruzioni infrastrutture critiche (internet, energia)
        - Normative governative restrittive
        
        **11.2 Effetti:**
        - Sospensione temporanea degli obblighi contrattuali
        - Proroga dei termini di consegna
        - Non responsabilità per ritardi o inadempimenti
        - Comunicazione tempestiva al Cliente
        
        **11.3 Durata prolungata:**
        - Oltre 60 giorni: possibilità di risoluzione contratto
        - Rimborso proporzionale dei pagamenti anticipati
        - Conservazione dei lavori già eseguiti
        - Ripresa automatica al cessare dell'impedimento
      `
    },
    {
      id: "varie-finali",
      title: "12. Disposizioni Varie e Finali",
      content: `
        **12.1 Comunicazioni:**
        - Tutte le comunicazioni devono essere scritte
        - Email valide agli indirizzi indicati nel contratto
        - PEC per comunicazioni legalmente rilevanti
        - Variazioni di contatto da comunicare tempestivamente
        
        **12.2 Cessione del contratto:**
        - Divieto di cessione senza consenso scritto
        - HipeG può cedere a società del gruppo
        - Subappalto parziale consentito previa comunicazione
        - Responsabilità solidale per subappaltatori
        
        **12.3 Nullità parziale:**
        - Invalidità di singole clausole non inficia il contratto
        - Sostituzione con disposizioni legalmente valide
        - Interpretazione secondo buona fede
        - Prevalenza della sostanza sulla forma
        
        **12.4 Legge applicabile e foro:**
        - Diritto italiano ed europeo applicabile
        - Foro esclusivo di Palermo per controversie
        - Tentativo obbligatorio di mediazione
        - Rinuncia ad altri fori competenti
        
        **Data ultima modifica:** 6 settembre 2025
        
        **Contatti per chiarimenti:**
        Email: commerciale@pubbliworks.it
        Telefono: +39 349 385 0703
      `
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Header />
      <Breadcrumb />
      
      <main className="py-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              Termini di Servizio
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-3xl mx-auto">
              Condizioni generali di vendita e termini per l'utilizzo dei servizi di comunicazione digitale 
              offerti da HipeG Creative Company.
            </p>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            className="bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-xl p-8 mb-12 border border-purple-600/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  Informazioni Importanti
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Questi termini di servizio costituiscono un contratto legalmente vincolante tra te e HipeG. 
                  Ti consigliamo di leggerli attentamente prima di utilizzare i nostri servizi. 
                  L'utilizzo dei nostri servizi implica l'accettazione di tutti i termini qui descritti.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Table of Contents */}
          <motion.div
            className="bg-[var(--card-bg)] rounded-xl shadow-lg p-8 mb-12 border border-[var(--card-border)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Indice</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections.map((section, index) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors duration-300 flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="w-2 h-2 bg-[var(--accent-primary)] rounded-full"></span>
                  <span>{section.title}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.section
                key={section.id}
                id={section.id}
                className="bg-[var(--card-bg)] rounded-xl shadow-lg p-8 border border-[var(--card-border)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (index % 3) }}
              >
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  {section.title}
                </h2>
                <div className="prose prose-lg max-w-none text-[var(--text-secondary)]">
                  {section.content.split('\n').map((paragraph, pIndex) => {
                    if (paragraph.trim() === '') return null;
                    
                    // Handle bold text
                    if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                      return (
                        <h3 key={pIndex} className="text-lg font-semibold text-[var(--text-primary)] mt-6 mb-3">
                          {paragraph.trim().slice(2, -2)}
                        </h3>
                      );
                    }
                    
                    return (
                      <p key={pIndex} className="mb-4 leading-relaxed">
                        {paragraph.split('**').map((part, partIndex) => 
                          partIndex % 2 === 1 ? 
                            <strong key={partIndex} className="font-semibold text-[var(--text-primary)]">{part}</strong> : 
                            part
                        )}
                      </p>
                    );
                  })}
                </div>
              </motion.section>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            className="mt-16 text-center bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-xl p-12 border border-purple-600/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              Domande sui Termini di Servizio?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              Se hai domande o dubbi sui nostri termini di servizio, non esitare a contattarci. 
              Il nostro team è a disposizione per qualsiasi chiarimento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/#contatti"
                className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contattaci
              </motion.a>
              <motion.a
                href="mailto:commerciale@pubbliworks.it"
                className="inline-block border-2 border-[var(--accent-primary)] text-[var(--accent-primary)] font-semibold py-3 px-8 rounded-full hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Scrivi una Email
              </motion.a>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}