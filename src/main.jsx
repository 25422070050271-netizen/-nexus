import React,{useEffect,useMemo,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Activity,ArrowUpRight,Battery,Command,Gamepad2,Home,Lightbulb,Monitor,Network,Play,Radio,Search,Settings,Shield,SlidersHorizontal,Sparkles,Terminal,Wifi,Zap,HeartPulse,Star,Power,Volume2,Clock3,CheckCircle2,Plus,Trash2} from 'lucide-react';
import './styles.css';

const initialDevices=[
 {name:'Philips Hue',type:'Smart Home',status:'Online',icon:Lightbulb,meta:'6 lights',level:'94%'},
 {name:'PlayStation 5',type:'Gaming',status:'Online',icon:Gamepad2,meta:'Ready to play',level:'82%'},
 {name:'LG OLED',type:'Media',status:'Online',icon:Monitor,meta:'webOS',level:'100%'},
 {name:'Echo Studio',type:'Audio',status:'Online',icon:Radio,meta:'Listening',level:'76%'},
 {name:'Chromecast',type:'Media',status:'Offline',icon:Play,meta:'Last seen 8m ago',level:'—'},
 {name:'Network Core',type:'Infrastructure',status:'Online',icon:Network,meta:'12 clients',level:'98%'}
];
const nav=[['Overview',Home],['Devices',SlidersHorizontal],['Automations',Zap],['Gaming',Gamepad2],['Media',Play],['Analytics',Activity],['Security',Shield]];
const defaultAutomations=[{id:1,name:'Gaming mode',trigger:'PlayStation 5 online',action:'Dim LG OLED + enable focus',active:true},{id:2,name:'Night mode',trigger:'23:00 local time',action:'Turn off media devices',active:true},{id:3,name:'Welcome home',trigger:'Network detects phone',action:'Turn on Hue lights',active:false}];

function App(){
 const [page,setPage]=useState('Overview');
 const [query,setQuery]=useState('');
 const [dark,setDark]=useState(()=>localStorage.getItem('nexus-theme')!=='light');
 const [toast,setToast]=useState('');
 const [terminal,setTerminal]=useState(false);
 const [ai,setAi]=useState('');
 const [devices,setDevices]=useState(initialDevices);
 const [automations,setAutomations]=useState(()=>JSON.parse(localStorage.getItem('nexus-automations')||'null')||defaultAutomations);
 const [favorites,setFavorites]=useState(()=>JSON.parse(localStorage.getItem('nexus-favorites')||'[]'));
 const [onlineOnly,setOnlineOnly]=useState(false);

 useEffect(()=>{localStorage.setItem('nexus-theme',dark?'dark':'light')},[dark]);
 useEffect(()=>{localStorage.setItem('nexus-automations',JSON.stringify(automations))},[automations]);
 useEffect(()=>{localStorage.setItem('nexus-favorites',JSON.stringify(favorites))},[favorites]);
 useEffect(()=>{const fn=e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();document.querySelector('.search input')?.focus()}if(e.key==='Escape')setTerminal(false)};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn)},[]);
 const notify=x=>{setToast(x);setTimeout(()=>setToast(''),2200)};
 const filtered=useMemo(()=>devices.filter(d=>(!query||d.name.toLowerCase().includes(query.toLowerCase())||d.type.toLowerCase().includes(query.toLowerCase()))&&(!onlineOnly||d.status==='Online')),[devices,query,onlineOnly]);
 const toggleDevice=name=>{setDevices(ds=>ds.map(d=>d.name===name?{...d,status:d.status==='Online'?'Offline':'Online'}:d));notify(`${name} actualizado`) };
 const ask=x=>{if(!x?.trim())return;setAi(x);notify('NEXUS AI procesó tu comando')};
 const toggleFavorite=name=>setFavorites(f=>f.includes(name)?f.filter(x=>x!==name):[...f,name]);
 const scan=()=>{setDevices(ds=>ds.map(d=>d.name==='Chromecast'?{...d,status:'Online',meta:'Found just now',level:'68%'}:d));notify('Escaneo completado · 24 dispositivos detectados')};
 return <div className={dark?'app':'app light'}><div className="aurora a1"/><div className="aurora a2"/>
 <aside className="sidebar"><div className="brand"><div className="brandMark">N</div><div><b>NEXUS</b><span>CONTROL CENTER</span></div></div><nav>{nav.map(([label,Icon])=><button className={page===label?'active':''} onClick={()=>setPage(label)} key={label}><Icon size={18}/><span>{label}</span></button>)}</nav><div className="sideBottom"><button onClick={()=>setTerminal(true)}><Terminal size={18}/><span>Terminal</span></button><button onClick={()=>setPage('Settings')}><Settings size={18}/><span>Settings</span></button></div></aside>
 <main><header><div className="mobileBrand"><div className="brandMark">N</div><b>NEXUS</b></div><div className="search"><Search size={17}/><input placeholder="Search devices, commands..." value={query} onChange={e=>setQuery(e.target.value)}/><kbd>⌘ K</kbd></div><div className="headActions"><button className="iconBtn" title="Terminal" onClick={()=>setTerminal(true)}><Command size={18}/></button><button className="avatar" title="Cambiar tema" onClick={()=>setDark(!dark)}>N</button></div></header>
 <section className="content"><div className="eyebrow"><span className="pulse"/> SYSTEM ONLINE <span>•</span> {devices.filter(d=>d.status==='Online').length}/{devices.length} DEVICES ONLINE</div>
 <div className="hero"><div><h1>{page==='Overview'?'Everything connected.':page}</h1><p>Tu centro de control personal para dispositivos, automatización, gaming, media y seguridad.</p><div className="heroBtns"><button className="primary" onClick={scan}><Wifi size={17}/> Scan devices</button><button className="secondary" onClick={()=>setTerminal(true)}><Terminal size={17}/> Open terminal</button></div></div><div className="orb"><div className="orbCore"><Sparkles size={28}/></div></div></div>
 {page==='Overview'&&<Overview devices={devices} favorites={favorites} toggleFavorite={toggleFavorite} toggleDevice={toggleDevice} setPage={setPage} ask={ask} ai={ai} setAi={setAi} filtered={filtered} onlineOnly={onlineOnly} setOnlineOnly={setOnlineOnly}/>} 
 {page==='Devices'&&<Devices devices={filtered} favorites={favorites} toggleFavorite={toggleFavorite} toggleDevice={toggleDevice} onlineOnly={onlineOnly} setOnlineOnly={setOnlineOnly} query={query}/>} 
 {page==='Automations'&&<Automations automations={automations} setAutomations={setAutomations} notify={notify}/>} 
 {page==='Gaming'&&<ModePage icon={Gamepad2} title="Gaming" desc="Optimiza tu setup para jugar." actions={['Gaming mode','Performance boost','Focus mode']} notify={notify}/>} 
 {page==='Media'&&<ModePage icon={Play} title="Media" desc="Control rápido de tu entretenimiento." actions={['Movie night','Music mode','Turn off media']} notify={notify}/>} 
 {page==='Analytics'&&<Analytics devices={devices} automations={automations}/>} 
 {page==='Security'&&<Security devices={devices}/>} 
 {page==='Settings'&&<SettingsPage dark={dark} setDark={setDark} favorites={favorites} setFavorites={setFavorites} notify={notify}/>} 
 <footer><span>NEXUS v2.1 • Local-first workspace</span><span><Shield size={13}/> {favorites.length} favoritos guardados</span></footer></section></main>
 {toast&&<div className="toast"><span>✓</span>{toast}</div>}
 {terminal&&<div className="modal" onClick={()=>setTerminal(false)}><div className="terminal" onClick={e=>e.stopPropagation()}><div className="termTop"><span>● ● ●</span><b>NEXUS TERMINAL</b><button onClick={()=>setTerminal(false)}>×</button></div><div className="termBody"><div>&gt; nexus status</div><div className="green">SYSTEM ONLINE</div><div>&gt; devices --scan</div><div>Found {devices.length} devices • {devices.filter(d=>d.status==='Online').length} online</div><div>&gt; local-storage</div><div className="green">PERSISTENCE ENABLED</div><div>&gt; ready</div><div className="cursor">█</div></div></div></div>}
 </div>
}

function Overview({devices,favorites,toggleFavorite,toggleDevice,setPage,ask,ai,setAi,filtered,onlineOnly,setOnlineOnly}){return <><div className="stats">{[['Devices online',devices.filter(d=>d.status==='Online').length,'Live','up'],['Network health','98%','Excellent','ok'],['Battery average','84%','Stable','up'],['Automations','3','2 active','ok']].map(s=><div className="card stat" key={s[0]}><span>{s[0]}</span><strong>{s[1]}</strong><small className={s[3]}>{s[2]}</small></div>)}</div><div className="grid"><section className="panel devices"><div className="panelHead"><div><span className="eyebrow">LIVE MATRIX</span><h2>Connected devices</h2></div><button className="ghost" onClick={()=>setPage('Devices')}>View all <ArrowUpRight size={15}/></button></div><div className="deviceTools"><label><input type="checkbox" checked={onlineOnly} onChange={e=>setOnlineOnly(e.target.checked)}/> Solo online</label><span>{filtered.length} visibles</span></div><div className="deviceGrid">{filtered.slice(0,6).map(d=><DeviceCard d={d} favorite={favorites.includes(d.name)} onFavorite={toggleFavorite} onToggle={toggleDevice} key={d.name}/>)}</div></section><section className="panel ai"><div className="panelHead"><div><span className="eyebrow">INTELLIGENCE</span><h2>NEXUS AI</h2></div><Sparkles size={19}/></div><p>Escribe una acción para simular la capa inteligente de control.</p><div className="suggestions"><button onClick={()=>ask('Activate gaming mode')}>Activate gaming mode</button><button onClick={()=>ask('Show offline devices')}>Show offline devices</button><button onClick={()=>ask('Turn off media')}>Turn off media</button></div><div className="aiInput"><Sparkles size={16}/><input value={ai} placeholder="Ask NEXUS..." onChange={e=>setAi(e.target.value)} onKeyDown={e=>e.key==='Enter'&&ask(e.currentTarget.value)}/></div>{ai&&<div className="aiResult"><b>✓ Command received</b><span>{ai}</span></div>}</section></div></>}

function Devices({devices,favorites,toggleFavorite,toggleDevice,onlineOnly,setOnlineOnly}){return <section className="panel full"><div className="panelHead"><div><span className="eyebrow">DEVICE MATRIX</span><h2>Todos tus dispositivos</h2></div><label className="filter"><input type="checkbox" checked={onlineOnly} onChange={e=>setOnlineOnly(e.target.checked)}/> Online only</label></div><div className="deviceGrid wide">{devices.map(d=><DeviceCard d={d} favorite={favorites.includes(d.name)} onFavorite={toggleFavorite} onToggle={toggleDevice} key={d.name}/>)}</div></section>}

function DeviceCard({d,favorite,onFavorite,onToggle}){const I=d.icon;return <div className="device card"><div className="deviceTop"><div className="deviceIcon"><I size={19}/></div><button className="star" onClick={()=>onFavorite(d.name)} aria-label="Favorito"><Star size={15} fill={favorite?'currentColor':'none'}/></button><span className={d.status==='Online'?'online':'offline'}><i/> {d.status}</span></div><h3>{d.name}</h3><p>{d.type} • {d.meta}</p><div className="meter"><span style={{width:d.level==='—'?'0':d.level}}/></div><div className="deviceBottom"><small><Battery size={13}/> {d.level}</small><button onClick={()=>onToggle(d.name)}><Power size={12}/> {d.status==='Online'?'Disconnect':'Connect'}</button></div></div>}

function Automations({automations,setAutomations,notify}){const add=()=>setAutomations(a=>[...a,{id:Date.now(),name:'Nueva automatización',trigger:'Manual',action:'Ejecutar escena NEXUS',active:true}]);return <section className="panel full"><div className="panelHead"><div><span className="eyebrow">AUTOMATION ENGINE</span><h2>Automatizaciones</h2></div><button className="primary" onClick={add}><Plus size={16}/> Nueva</button></div><div className="automationList">{automations.map(a=><div className="automation card" key={a.id}><div><b>{a.name}</b><span>Cuando: {a.trigger}</span><span>Acción: {a.action}</span></div><div className="autoActions"><button className={a.active?'switch on':'switch'} onClick={()=>setAutomations(xs=>xs.map(x=>x.id===a.id?{...x,active:!x.active}:x))}><i/></button><button className="danger" onClick={()=>setAutomations(xs=>xs.filter(x=>x.id!==a.id))}><Trash2 size={15}/></button></div></div>)}</div></section>}

function ModePage({icon:Icon,title,desc,actions,notify}){return <section className="panel full"><div className="panelHead"><div><span className="eyebrow">NEXUS SCENE</span><h2>{title}</h2></div><Icon size={22}/></div><p className="moduleDesc">{desc}</p><div className="sceneGrid">{actions.map(a=><button className="scene card" key={a} onClick={()=>notify(`${a} activado`)}><Sparkles size={19}/><b>{a}</b><span>Ejecutar escena</span></button>)}</div></section>}

function Analytics({devices,automations}){const online=devices.filter(d=>d.status==='Online').length;return <section className="panel full"><div className="panelHead"><div><span className="eyebrow">SYSTEM ANALYTICS</span><h2>Rendimiento</h2></div><Activity size={21}/></div><div className="analyticsGrid"><Metric icon={HeartPulse} label="Health" value="98%"/><Metric icon={Wifi} label="Online" value={`${online}/${devices.length}`}/><Metric icon={Zap} label="Automations" value={`${automations.filter(a=>a.active).length} active`}/><Metric icon={Star} label="Reliability" value="99.2%"/></div><div className="chart"><div className="chartBars">{[62,78,54,88,72,93,84,96,90,98,92,97].map((h,i)=><i style={{height:`${h}%`}} key={i}/>)}</div><span>Actividad del sistema · últimas 12 lecturas</span></div></section>}
function Metric({icon:Icon,label,value}){return <div className="metric card"><Icon size={18}/><span>{label}</span><b>{value}</b></div>}
function Security({devices}){const offline=devices.filter(d=>d.status==='Offline').length;return <section className="panel full"><div className="panelHead"><div><span className="eyebrow">SECURITY CENTER</span><h2>Seguridad</h2></div><Shield size={21}/></div><div className="securityHero"><CheckCircle2 size={36}/><div><b>Protected</b><span>Local-first · sin conexiones externas activas</span></div></div><div className="securityList"><div><span>Dispositivos offline</span><b>{offline}</b></div><div><span>Conexiones externas</span><b>0</b></div><div><span>Estado de almacenamiento local</span><b>Seguro</b></div></div></section>}
function SettingsPage({dark,setDark,favorites,setFavorites,notify}){return <section className="panel full"><div className="panelHead"><div><span className="eyebrow">PREFERENCES</span><h2>Settings</h2></div><Settings size={21}/></div><div className="settingsList"><label><span>Modo oscuro</span><input type="checkbox" checked={dark} onChange={e=>setDark(e.target.checked)}/></label><label><span>Animaciones de interfaz</span><input type="checkbox" defaultChecked/></label><label><span>Favoritos guardados</span><b>{favorites.length}</b></label></div><button className="secondary" onClick={()=>{setFavorites([]);notify('Favoritos eliminados')}}>Limpiar favoritos</button></section>}
createRoot(document.getElementById('root')).render(<App/>);
