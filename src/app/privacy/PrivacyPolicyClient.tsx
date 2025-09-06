'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

export default function PrivacyPolicyClient() {
  const sections = [
    {
      id: "introduzione",
      title: "1. Introduzione",
      content: `
        HipeG (di seguito "noi", "nostro" o "la Società") rispetta la tua privacy e si impegna a proteggere i tuoi dati personali. 
        Questa informativa sulla privacy descrive come raccogliamo, utilizziamo, conserviamo e proteggiamo le tue informazioni 
        personali in conformità al Regolamento Generale sulla Protezione dei Dati (GDPR - UE 2016/679) e alla normativa italiana 
        applicabile.
        
        Questa informativa si applica a tutti i servizi di comunicazione digitale offerti da HipeG, inclusi:
        - Servizi di social media management
        - Creazione e gestione siti web
        - Servizi di grafica e branding
        - Video e foto making
        - Formazione e consulenza digitale
      `
    },
    {
      id: "titolare",
      title: "2. Titolare del Trattamento",
      content: `
        Il Titolare del trattamento dei dati personali è:
        
        **HipeG Creative Company**
        Via Antonio Daneu 30, 90142 Palermo (PA), Italia
        Email: commerciale@pubbliworks.it
        Telefono: +39 349 385 0703
        P.IVA: [Da inserire]
        
        Per qualsiasi questione relativa alla privacy, puoi contattarci utilizzando i dati sopra indicati.
      `
    },
    {
      id: "dati-raccolti",
      title: "3. Dati Personali Raccolti",
      content: `
        Raccogliamo i seguenti tipi di dati personali:
        
        **3.1 Dati forniti direttamente dall'utente:**
        - Nome e cognome
        - Indirizzo email
        - Numero di telefono
        - Ragione sociale e dati aziendali
        - Contenuti delle comunicazioni (messaggi, richieste)
        
        **3.2 Dati raccolti automaticamente:**
        - Indirizzo IP
        - Informazioni sul browser e dispositivo
        - Cookie e tecnologie simili
        - Dati di navigazione e utilizzo del sito
        
        **3.3 Dati dei pagamenti:**
        - Informazioni di fatturazione
        - Storico transazioni (tramite PayPal)
        - Stato pagamenti e abbonamenti
        
        **3.4 Dati per servizi social media:**
        - Informazioni sui profili social gestiti
        - Metriche e analytics dei social media
        - Contenuti creati per i clienti
      `
    },
    {
      id: "finalita",
      title: "4. Finalità e Base Giuridica del Trattamento",
      content: `
        Trattiamo i tuoi dati personali per le seguenti finalità:
        
        **4.1 Erogazione dei servizi (Base giuridica: Contratto)**
        - Fornire i servizi di comunicazione digitale richiesti
        - Gestire il rapporto commerciale
        - Elaborare pagamenti e fatturazione
        
        **4.2 Marketing diretto (Base giuridica: Legittimo interesse)**
        - Invio di comunicazioni commerciali sui nostri servizi
        - Newsletter e aggiornamenti
        - Personalizzazione delle offerte
        
        **4.3 Adempimenti legali (Base giuridica: Obbligo legale)**
        - Obblighi fiscali e contabili
        - Adempimenti normativi
        - Richieste delle autorità competenti
        
        **4.4 Miglioramento servizi (Base giuridica: Legittimo interesse)**
        - Analisi e statistiche sull'utilizzo del sito
        - Miglioramento dell'esperienza utente
        - Sviluppo di nuovi servizi
        
        **4.5 Sicurezza (Base giuridica: Legittimo interesse)**
        - Prevenzione frodi e attività illecite
        - Sicurezza informatica
        - Protezione dei nostri sistemi
      `
    },
    {
      id: "conservazione",
      title: "5. Conservazione dei Dati",
      content: `
        Conserviamo i tuoi dati personali per il tempo necessario a raggiungere le finalità per cui sono stati raccolti:
        
        **5.1 Dati contrattuali:** Per tutta la durata del contratto e per 10 anni dopo la cessazione per finalità fiscali
        
        **5.2 Dati di marketing:** Fino alla revoca del consenso o per 2 anni dall'ultimo contatto
        
        **5.3 Dati di navigazione:** 24 mesi dalla raccolta
        
        **5.4 Dati di fatturazione:** 10 anni per obblighi fiscali
        
        Trascorsi i termini di conservazione, i dati saranno cancellati o resi anonimi in modo sicuro e irreversibile.
      `
    },
    {
      id: "cookie",
      title: "6. Cookie e Tecnologie Simili",
      content: `
        Il nostro sito utilizza cookie e tecnologie simili per:
        
        **6.1 Cookie tecnici (sempre attivi):**
        - Funzionamento del sito
        - Sicurezza e autenticazione
        - Preferenze dell'utente
        
        **6.2 Cookie analitici (consenso richiesto):**
        - Google Analytics per statistiche di utilizzo
        - Analisi del traffico e comportamento degli utenti
        
        **6.3 Cookie di marketing (consenso richiesto):**
        - Facebook Pixel per remarketing
        - Cookie pubblicitari di terze parti
        
        Puoi gestire le tue preferenze sui cookie tramite il banner di consenso o le impostazioni del tuo browser.
        Per maggiori informazioni, consulta la nostra Cookie Policy.
      `
    },
    {
      id: "terze-parti",
      title: "7. Condivisione con Terze Parti",
      content: `
        I tuoi dati personali possono essere condivisi con:
        
        **7.1 Fornitori di servizi:**
        - PayPal (elaborazione pagamenti)
        - Google Analytics (analisi web)
        - Firebase/Google Cloud (hosting e database)
        - Provider email (invio comunicazioni)
        - Meta/Facebook (servizi social media)
        
        **7.2 Autorità competenti:**
        - Su richiesta delle autorità giudiziarie o di polizia
        - Per adempimenti fiscali e legali
        
        **7.3 Professionisti:**
        - Consulenti legali, fiscali e contabili
        - Solo per finalità connesse ai nostri servizi
        
        Tutti i fornitori di servizi sono vincolati da accordi che garantiscono la protezione dei tuoi dati.
      `
    },
    {
      id: "diritti",
      title: "8. I Tuoi Diritti",
      content: `
        In base al GDPR, hai i seguenti diritti:
        
        **8.1 Diritto di accesso:** Ottenere informazioni sui tuoi dati trattati
        
        **8.2 Diritto di rettifica:** Correggere dati inesatti o incompleti
        
        **8.3 Diritto di cancellazione:** Richiedere l'eliminazione dei dati ("diritto all'oblio")
        
        **8.4 Diritto di limitazione:** Limitare il trattamento in determinate circostanze
        
        **8.5 Diritto di portabilità:** Ricevere i dati in formato strutturato
        
        **8.6 Diritto di opposizione:** Opporti al trattamento per marketing diretto
        
        **8.7 Diritto di revoca:** Revocare il consenso in qualsiasi momento
        
        **8.8 Diritto di reclamo:** Presentare reclamo al Garante per la Protezione dei Dati Personali
        
        Per esercitare questi diritti, contattaci all'indirizzo: commerciale@pubbliworks.it
        Risponderemo entro 30 giorni dalla richiesta.
      `
    },
    {
      id: "sicurezza",
      title: "9. Sicurezza dei Dati",
      content: `
        Implementiamo misure di sicurezza tecniche e organizzative appropriate per proteggere i tuoi dati:
        
        **9.1 Misure tecniche:**
        - Crittografia dei dati in transito e a riposo
        - Sistemi di backup sicuri e regolari
        - Firewall e sistemi di monitoraggio
        - Controlli di accesso rigorosi
        
        **9.2 Misure organizzative:**
        - Formazione del personale sulla privacy
        - Procedure di gestione degli incidenti
        - Valutazioni d'impatto sulla privacy
        - Audit e controlli periodici
        
        In caso di violazione dei dati, notificheremo l'autorità competente entro 72 ore e, se necessario, 
        anche gli interessati nel rispetto della normativa GDPR.
      `
    },
    {
      id: "trasferimenti",
      title: "10. Trasferimenti Internazionali",
      content: `
        Alcuni dei nostri fornitori di servizi possono operare al di fuori dell'Area Economica Europea (AEE).
        
        In questi casi, garantiamo che:
        - Il trasferimento avvenga verso paesi con decisione di adeguatezza UE
        - Siano in atto garanzie appropriate (es. Standard Contractual Clauses)
        - Siano implementate misure di sicurezza supplementari ove necessario
        
        I principali trasferimenti extra-UE riguardano:
        - Google/Firebase (USA) - con garanzie appropriate
        - Meta/Facebook (USA) - per servizi social media
        
        Tutti i trasferimenti rispettano i requisiti del GDPR per la protezione dei dati.
      `
    },
    {
      id: "modifiche",
      title: "11. Modifiche alla Privacy Policy",
      content: `
        Ci riserviamo il diritto di modificare questa informativa sulla privacy in qualsiasi momento.
        
        Le modifiche saranno:
        - Pubblicate su questa pagina
        - Notificate via email per cambiamenti sostanziali
        - Indicate con la data di ultima modifica
        
        Ti invitiamo a consultare periodicamente questa pagina per rimanere aggiornato sulle nostre pratiche di privacy.
        
        **Data ultima modifica:** 6 settembre 2025
      `
    },
    {
      id: "contatti",
      title: "12. Contatti",
      content: `
        Per qualsiasi domanda o richiesta relativa a questa informativa sulla privacy, puoi contattarci:
        
        **Email:** commerciale@pubbliworks.it
        **Telefono:** +39 349 385 0703
        **Indirizzo:** Via Antonio Daneu 30, 90142 Palermo (PA), Italia
        
        **Per esercitare i tuoi diritti GDPR, utilizza il nostro portale dedicato:**
        [Link al portale diritti - da implementare]
        
        **Autorità di controllo:**
        Garante per la Protezione dei Dati Personali
        Piazza di Monte Citorio, 121 - 00186 Roma
        Tel: 06 696771
        Email: garante@gpdp.it
        Sito web: www.garanteprivacy.it
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
              Informativa sulla Privacy
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-3xl mx-auto">
              Questa informativa descrive come HipeG raccoglie, utilizza e protegge i tuoi dati personali 
              in conformità al GDPR e alla normativa italiana sulla privacy.
            </p>
          </motion.div>

          {/* Table of Contents */}
          <motion.div
            className="bg-[var(--card-bg)] rounded-xl shadow-lg p-8 mb-12 border border-[var(--card-border)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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

          {/* Data Rights CTA */}
          <motion.div
            className="mt-16 text-center bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-xl p-12 border border-purple-600/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              Esercita i Tuoi Diritti
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              Hai domande sulla privacy o vuoi esercitare i tuoi diritti GDPR? 
              Contattaci o utilizza il nostro portale dedicato per gestire i tuoi dati.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contatti"
                className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contattaci
              </motion.a>
              <motion.button
                className="inline-block border-2 border-[var(--accent-primary)] text-[var(--accent-primary)] font-semibold py-3 px-8 rounded-full hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert('Portale diritti in sviluppo - Contattaci per assistenza immediata')}
              >
                Portale Diritti
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}