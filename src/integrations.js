export const INTEGRATIONS = [
  { id:'matter', name:'Matter', kind:'Smart Home', icon:'◇', description:'Estándar interoperable para dispositivos compatibles.', status:'Disponible', requiresBridge:false, categories:['Light','TV','Audio','Plug','Sensor','Other'] },
  { id:'lg-thinq', name:'LG ThinQ', kind:'Fabricante', icon:'LG', description:'Preparado para dispositivos LG compatibles mediante API.', status:'Preparado', requiresBridge:true, categories:['TV','Audio','Other'] },
  { id:'local-api', name:'API local', kind:'Local', icon:'⌁', description:'Conecta dispositivos que ofrecen una API en tu red.', status:'Disponible', requiresBridge:true, categories:['TV','Audio','Plug','Other'] },
  { id:'webhook', name:'Webhook', kind:'Automatización', icon:'↗', description:'Envía acciones HTTP a servicios compatibles.', status:'Disponible', requiresBridge:true, categories:['Other'] },
  { id:'bridge', name:'NEXUS Bridge', kind:'Puente', icon:'N', description:'Puente opcional para dispositivos que no pueden controlarse directamente desde la web.', status:'Próximamente', requiresBridge:true, categories:['Light','TV','Audio','Console','Plug','Sensor','Other'] },
  { id:'manual', name:'Sin integración', kind:'Manual', icon:'+', description:'Guarda el dispositivo para conectarlo más adelante.', status:'Configuración', requiresBridge:false, categories:['Light','TV','Audio','Console','Plug','Sensor','Other'] }
];

export const DEVICE_TYPES = ['Light','TV','Audio','Console','Plug','Sensor','Camera','Thermostat','Watch','Headphones','Other'];

export function getIntegration(id){ return INTEGRATIONS.find(x=>x.id===id) || INTEGRATIONS.find(x=>x.id==='manual'); }
