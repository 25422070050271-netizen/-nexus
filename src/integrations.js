export const INTEGRATIONS = [
  { id:'matter', name:'Matter', kind:'Smart Home', icon:'◇', description:'Estándar interoperable para luces, enchufes, sensores, TVs y otros accesorios compatibles.', status:'Disponible', requiresBridge:false, categories:['Light','TV','Audio','Plug','Sensor','Camera','Thermostat','Other'], capabilities:['power','brightness','temperature','scenes','automation'] },
  { id:'lg-thinq', name:'LG ThinQ', kind:'Fabricante', icon:'LG', description:'Ruta para dispositivos LG compatibles mediante la API oficial. Preparada para TV, audio y hogar inteligente.', status:'Preparado', requiresBridge:true, categories:['TV','Audio','Other'], capabilities:['power','volume','input','status','automation'] },
  { id:'bluetooth', name:'Bluetooth LE', kind:'Local', icon:'ᛒ', description:'Descubrimiento y comunicación BLE cuando NEXUS iOS o un navegador compatible pueda acceder al periférico.', status:'NEXUS iOS', requiresBridge:false, categories:['Headphones','Watch','Sensor','Other'], capabilities:['battery','connection','telemetry','controls'] },
  { id:'local-api', name:'API local', kind:'Local', icon:'⌁', description:'Conecta equipos que exponen una API dentro de tu red. Prioriza control local y baja latencia.', status:'Disponible', requiresBridge:true, categories:['TV','Audio','Plug','Camera','Thermostat','Other'], capabilities:['power','status','controls','automation','diagnostics'] },
  { id:'webhook', name:'Webhook', kind:'Automatización', icon:'↗', description:'Permite disparar acciones HTTP hacia servicios que tú autorices, ideal para automatizaciones.', status:'Disponible', requiresBridge:true, categories:['Other'], capabilities:['actions','automation'] },
  { id:'bridge', name:'NEXUS Bridge', kind:'Puente local', icon:'N', description:'Puente opcional para dispositivos que necesitan un proceso local para descubrirlos o controlarlos.', status:'Próximamente', requiresBridge:true, categories:['Light','TV','Audio','Console','Plug','Sensor','Camera','Thermostat','Watch','Headphones','Other'], capabilities:['discovery','control','diagnostics','automation','local'] },
  { id:'playstation', name:'PlayStation', kind:'Consola', icon:'PS', description:'Integración específica para PS5. NEXUS solo habilitará acciones que puedan verificarse mediante APIs o servicios compatibles.', status:'Preparado', requiresBridge:false, categories:['Console'], capabilities:['status','remote-play','activity'] },
  { id:'havit', name:'HAVIT', kind:'Audio', icon:'H', description:'Perfil para audífonos HAVIT, incluyendo TWS984. Las funciones avanzadas dependen de los servicios BLE propietarios expuestos por el modelo.', status:'NEXUS iOS', requiresBridge:false, categories:['Headphones'], capabilities:['battery','connection','media','anc','eq','gestures'] },
  { id:'infinix', name:'Infinix Watch', kind:'Wearable', icon:'⌚', description:'Perfil para XWatch H4 y otros relojes compatibles. Las funciones dependen del protocolo BLE y del firmware.', status:'NEXUS iOS', requiresBridge:false, categories:['Watch'], capabilities:['battery','health','sleep','activity','calls','notifications','media'] },
  { id:'manual', name:'Sin integración', kind:'Manual', icon:'+', description:'Guarda el dispositivo para configurarlo más adelante sin afirmar que existe control físico.', status:'Configuración', requiresBridge:false, categories:['Light','TV','Audio','Console','Plug','Sensor','Camera','Thermostat','Watch','Headphones','Other'], capabilities:['profile'] }
];

export const DEVICE_TYPES = ['Light','TV','Audio','Console','Plug','Sensor','Camera','Thermostat','Watch','Headphones','Other'];

export const SCENES = [
  {id:'cinema',name:'Cine',icon:'🎬',description:'Prepara TV y audio para una sesión de cine.',triggers:['manual']},
  {id:'gaming',name:'Gaming',icon:'🎮',description:'Prepara tus dispositivos de juego.',triggers:['manual','ps5']},
  {id:'sleep',name:'Dormir',icon:'🌙',description:'Reduce actividad y prepara dispositivos para descanso.',triggers:['manual','time']},
  {id:'away',name:'Salir',icon:'🚪',description:'Apaga o desconecta dispositivos compatibles.',triggers:['manual','presence']}
];

export const AUTOMATION_TEMPLATES = [
  {id:'low-battery',name:'Batería baja',description:'Avisar cuando un dispositivo compatible baje de un porcentaje.',condition:'battery < 20%',action:'notify'},
  {id:'arrival',name:'Llegada',description:'Ejecutar una escena cuando tu presencia sea detectada.',condition:'presence = home',action:'scene'},
  {id:'night',name:'Horario nocturno',description:'Ejecutar una escena a una hora determinada.',condition:'time',action:'scene'},
  {id:'disconnect',name:'Desconexión',description:'Intentar reconexión y mostrar diagnóstico si un dispositivo se desconecta.',condition:'device = offline',action:'diagnose'}
];

export function getIntegration(id){ return INTEGRATIONS.find(x=>x.id===id) || INTEGRATIONS.find(x=>x.id==='manual'); }

export function getCapabilities(id){ return getIntegration(id).capabilities || []; }
