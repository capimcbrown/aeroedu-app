// Botón flotante de WhatsApp (abajo a la izquierda; el Instructor IA queda a la derecha)
const WHATSAPP_URL =
  "https://wa.me/573167446685?text=Hola%20Capi%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20cursos.";

export default function WhatsAppFlotante() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="group fixed bottom-5 left-5 z-40 flex items-center gap-3 rounded-full border border-[#25D366]/50 bg-[#0b1220]/90 py-2 pl-2 pr-2 shadow-[0_10px_30px_-10px_rgba(37,211,102,0.6)] backdrop-blur transition-transform hover:-translate-y-0.5 sm:pr-5"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]">
        <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
          <path
            fill="#fff"
            d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.9-1.7l-.4-.2-3.8 1.2 1.2-3.7-.3-.4c-1.2-1.8-1.8-3.8-1.8-5.9C5 10 10 5.2 16 5.2S27 10 27 15.9 22 26.4 16 26.4zm6-7.8c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.3-.7.1-.3-.2-1.4-.5-2.7-1.6-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-1-2.5c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 2-.8 2.2-1.6.3-.8.3-1.4.2-1.6-.1-.1-.3-.2-.6-.4z"
          />
        </svg>
      </span>
      <span className="hidden text-sm font-semibold text-foreground sm:inline">Escríbeme por WhatsApp</span>
    </a>
  );
}
