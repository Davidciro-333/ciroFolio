/**
 * Configuración del formulario de contacto.
 *
 * El sitio es estático, así que el envío va a un servicio externo. El endpoint
 * se define aquí para que cambiar de proveedor sea una línea, no un refactor.
 *
 * Mientras `endpoint` esté vacío el formulario NO se rompe: se muestra
 * igualmente y al enviar abre el cliente de correo con los datos ya escritos.
 * Así el sitio nunca pierde un contacto por falta de configuración.
 *
 * Para activarlo con Web3Forms:
 *   1. Pedir una access key en https://web3forms.com (gratis, solo el email)
 *   2. endpoint: 'https://api.web3forms.com/submit'
 *   3. accessKey: '<la key>'
 *
 * La access key no es un secreto: identifica el destino, no autoriza nada.
 * Por eso puede vivir en el repo sin problema.
 */
interface ContactFormConfig {
  endpoint: string;
  accessKey: string;
  /** Asunto del correo que le llega a David. */
  subject: string;
}

export const contactForm: ContactFormConfig = {
  endpoint: 'https://api.web3forms.com/submit',
  // ↓ Pegar aquí la access key de web3forms.com. Hasta entonces el formulario
  //   sigue funcionando en modo mailto: no se pierde ningún contacto.
  accessKey: '',
  subject: 'New project inquiry — itsciro.com',
};

export const isFormEnabled = contactForm.endpoint !== '' && contactForm.accessKey !== '';
