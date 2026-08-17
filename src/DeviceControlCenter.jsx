import React,{useMemo,useState} from 'react';
import {Battery, Bluetooth, CheckCircle2, ChevronLeft, Gamepad2, Headphones, Lightbulb, Monitor, Music2, Power, Radio, Settings2, Sparkles, Thermometer, Watch, Wifi, X} from 'lucide-react';

const ICONS={TV:Monitor,Console:Gamepad2,Headphones,Watch,Light:Lightbulb,Sensor:Thermometer,Audio:Music2};

export default function DeviceControlCenter({device,onClose,onCommand}){
 const [tab,setTab]=useState('control');
 const I=ICONS[device?.type]||Radio;
 const capabilities=useMemo(()=>{
  const id=(device?.integrationId||'').toLowerCase();
  if(id.includes('lg')||device?.brand?.toLowerCase()==='lg') return ['power','volume','input','apps'];
  if(id.includes('ps5')||device?.type==='Console') return ['power','remote'];
  if(device?.model?.toLowerCase().includes('tws984')||device?.brand?.toLowerCase().includes('havit')) return ['battery','anc','eq','media'];
  if(device?.model?.toLowerCase().includes('h4')||device?.brand?.toLowerCase().includes('infinix')) return ['battery','health','notifications','media'];
  return ['power'];
 },[device]);
 if(!device) return null;
 const command=(name,value)=>onCommand?.({deviceId:device.id,name,value});
 return <div className="controlOverlay" role="dialog" aria-modal="true">
  <div className="controlCenter">
   <header className="controlHeader"><button className="iconBtn" onClick={onClose}><ChevronLeft size={19}/></button><div className="controlTitle"><div className="deviceIcon"><I size={20}/></div><div><b>{device.name}</b><small>{device.brand} {device.model}</small></div></div><button className="iconBtn" onClick={onClose}><X size={18}/></button></header>
   <div className="controlStatus"><span className={device.connected?'online':'offline'}><i/> {device.connected?'Conectado':'No conectado'}</span><span><Wifi size={13}/> {device.room||'Sin habitación'}</span></div>
   <div className="controlTabs"><button className={tab==='control'?'active':''} onClick={()=>setTab('control')}>Control</button><button className={tab==='activity'?'active':''} onClick={()=>setTab('activity')}>Actividad</button><button className={tab==='diagnostics'?'active':''} onClick={()=>setTab('diagnostics')}>Diagnóstico</button></div>
   {tab==='control'&&<div className="controlBody">
    {capabilities.includes('power')&&<section className="controlCard"><div><span className="eyebrow">POWER</span><h3>Alimentación</h3></div><button className="bigControl" onClick={()=>command('power',!device.connected)}><Power size={22}/></button></section>}
    {capabilities.includes('battery')&&<section className="controlCard"><div><span className="eyebrow">BATTERY</span><h3>Estado de batería</h3></div><div className="batteryBlock"><Battery size={20}/><strong>{device.battery??'—'}%</strong></div></section>}
    {capabilities.includes('anc')&&<section className="controlCard"><div><span className="eyebrow">AUDIO</span><h3>Modo de cancelación</h3></div><div className="segmented"><button onClick={()=>command('anc','off')}>Off</button><button onClick={()=>command('anc','anc')}>ANC</button><button onClick={()=>command('anc','transparency')}>Transparencia</button></div></section>}
    {capabilities.includes('eq')&&<section className="controlCard"><div><span className="eyebrow">SOUND</span><h3>Ecualizador</h3></div><div className="presetGrid"><button onClick={()=>command('eq','balanced')}>Balanced</button><button onClick={()=>command('eq','bass')}>Bass</button><button onClick={()=>command('eq','vocal')}>Vocal</button><button onClick={()=>command('eq','gaming')}>Gaming</button></div></section>}
    {capabilities.includes('media')&&<section className="controlCard"><div><span className="eyebrow">MEDIA</span><h3>Controles</h3></div><div className="mediaControls"><button onClick={()=>command('previous')}>◀◀</button><button className="play" onClick={()=>command('playPause')}>▶</button><button onClick={()=>command('next')}>▶▶</button></div></section>}
    {capabilities.includes('input')&&<section className="controlCard"><div><span className="eyebrow">TV</span><h3>Entrada</h3></div><div className="presetGrid"><button onClick={()=>command('input','HDMI 1')}>HDMI 1</button><button onClick={()=>command('input','HDMI 2')}>HDMI 2</button><button onClick={()=>command('input','TV')}>TV</button></div></section>}
    {capabilities.includes('health')&&<section className="controlCard"><div><span className="eyebrow">WATCH</span><h3>Salud y actividad</h3></div><div className="healthGrid"><span>❤️ Frecuencia —</span><span>🫁 SpO₂ —</span><span>👟 Pasos —</span><span>😴 Sueño —</span></div></section>}
    {capabilities.includes('notifications')&&<section className="controlCard"><div><span className="eyebrow">NOTIFICATIONS</span><h3>Notificaciones</h3></div><button className="secondary" onClick={()=>command('syncNotifications')}>Sincronizar</button></section>}
    {!capabilities.length&&<div className="emptyControl"><Sparkles size={25}/><h3>Sin controles publicados</h3><p>La integración todavía no declara capacidades físicas para este dispositivo.</p></div>}
   </div>}
   {tab==='activity'&&<div className="controlBody"><section className="controlCard"><span className="eyebrow">ACTIVITY</span><h3>Historial de NEXUS</h3><p>Los comandos reales aparecerán aquí cuando exista una integración conectada. NEXUS no inventa actividad.</p></section></div>}
   {tab==='diagnostics'&&<div className="controlBody"><section className="controlCard"><span className="eyebrow">DIAGNOSTICS</span><h3>Estado de conexión</h3><div className="diagRow"><CheckCircle2 size={17}/><span>Registro local</span><b>OK</b></div><div className="diagRow"><Bluetooth size={17}/><span>Bluetooth</span><b>{device.type==='Headphones'||device.type==='Watch'?'Requiere NEXUS iOS':'No necesario'}</b></div><div className="diagRow"><Settings2 size={17}/><span>Integración</span><b>{device.integrationId||'manual'}</b></div></section></div>}
  </div>
 </div>;
}
