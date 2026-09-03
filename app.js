/* RankeaPro — utilidades compartidas (requiere supabase-js UMD + config.js) */
const configurado = !/TU-PROYECTO|TU-CLAVE/.test(SUPABASE_URL + SUPABASE_ANON_KEY);
const sb = configurado ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const fmt = n => Number(n ?? 0).toLocaleString('es-DO');
const fdate = d => d ? new Date(d + (d.length === 10 ? 'T00:00:00' : '')).toLocaleDateString('es-DO', {day:'2-digit', month:'short', year:'numeric'}) : '—';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ESTADOS = { completada:'Completada', en_proceso:'En proceso', pausada:'Pausada' };

function showMsg(el, text, type='err'){ el.textContent = text; el.className = 'msg show ' + type; }
function hideMsg(el){ el.className = 'msg'; }

function noConfig(){
  document.body.innerHTML = `<div class="wrap" style="max-width:640px;margin:80px auto;padding:0 20px">
    <div class="term"><div class="term-bar"><i></i><i></i><i></i><span>config.js</span></div>
    <div class="term-body"><span class="p">root@rankeapro:~$ </span><span class="k">cat config.js</span><br>
    <span style="color:var(--danger)">[ERROR] Supabase no está configurado.</span><br><br>
    <span class="m">Abre el archivo <b style="color:var(--accent)">config.js</b> y pega la URL y la clave anon de tu proyecto Supabase.
    Luego ejecuta <b style="color:var(--accent)">supabase/schema.sql</b> en el SQL Editor. Instrucciones completas en README.md.</span></div></div></div>`;
}

async function requireUser(){
  if(!configurado){ noConfig(); return null; }
  const { data:{ session } } = await sb.auth.getSession();
  if(!session){ location.href = 'cuenta.html?next=' + encodeURIComponent(location.pathname + location.search); return null; }
  return session.user;
}

async function getProfile(userId){
  const { data } = await sb.from('profiles').select('*').eq('id', userId).single();
  return data;
}

async function logout(){ await sb.auth.signOut(); location.href = 'index.html'; }

/* Gráficas de una orden (Chart.js) */
const chartDefaults = () => {
  Chart.defaults.color = '#5f9a76';
  Chart.defaults.borderColor = 'rgba(0,255,127,.08)';
  Chart.defaults.font.family = "'JetBrains Mono', monospace";
  Chart.defaults.font.size = 11;
};
function renderOrderCharts(o, histId, srcId){
  chartDefaults();
  const charts = [];
  const hist = Array.isArray(o.historial) ? o.historial : [];
  const g = document.getElementById(histId).getContext('2d');
  const grad = g.createLinearGradient(0,0,0,200); grad.addColorStop(0,'rgba(0,255,127,.4)'); grad.addColorStop(1,'rgba(0,255,127,0)');
  charts.push(new Chart(g,{type:'line',data:{labels:hist.map(h=>fdate(h[0])),datasets:[{data:hist.map(h=>Number(h[1])),borderColor:'#00ff7f',backgroundColor:grad,fill:!o.invertido,tension:.3,pointRadius:4,pointBackgroundColor:'#00ff7f',borderWidth:2}]},
    options:{plugins:{legend:{display:false}},scales:{y:{reverse:!!o.invertido,beginAtZero:!o.invertido,ticks:{callback:v=>o.invertido?'#'+v:fmt(v)}},x:{grid:{display:false}}},maintainAspectRatio:false}}));
  const fuentes = o.fuentes && typeof o.fuentes === 'object' ? o.fuentes : {};
  charts.push(new Chart(document.getElementById(srcId),{type:'doughnut',data:{labels:Object.keys(fuentes),datasets:[{data:Object.values(fuentes).map(Number),backgroundColor:['#00ff7f','#39c3ff','#ffb020','#b66dff','#ff4d5e','#7dffb8'],borderWidth:1,borderColor:'#000'}]},
    options:{cutout:'62%',plugins:{legend:{position:'bottom',labels:{boxWidth:10,padding:10,font:{size:10}}}},maintainAspectRatio:false}}));
  return charts;
}

/* Tarjeta completa de una orden (HTML) */
function orderDetailHTML(o){
  const metaLabel = o.invertido ? `Top ${o.meta}` : fmt(o.meta)+' '+(o.unidad||'');
  const actualLabel = o.invertido ? `Posición #${o.actual}` : fmt(o.actual)+' '+(o.unidad||'');
  const last = Array.isArray(o.historial) && o.historial.length ? o.historial[o.historial.length-1][0] : o.updated_at;
  return `
    <div class="order">
      <div class="order-log">
        <div>orden=${esc(o.codigo)}</div>
        <div>plataforma=${esc(o.plataforma||'—')} · estado=${esc(o.estado)}</div>
      </div>
      <div class="order-in">
      <div class="order-head">
        <div><h3>${esc(o.servicio)}</h3><p>${esc(o.cliente||'')} · código <b style="color:var(--accent)">${esc(o.codigo)}</b></p></div>
        <span class="badge b-${esc(o.estado)}">${ESTADOS[o.estado]||o.estado}</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:.8rem;color:var(--muted)"><span>progreso</span><b style="color:var(--accent)">${o.progreso}%</b></div>
      <div class="progress"><i class="bar"></i></div>
      <div class="meta">
        <div><small>meta</small><b>${metaLabel}</b></div>
        <div><small>actual</small><b style="color:var(--accent)">${actualLabel}</b></div>
        <div><small>inicio</small><b>${fdate(o.inicio)}</b></div>
        <div><small>entrega est.</small><b>${fdate(o.entrega)}</b></div>
      </div>
      <div class="charts">
        <div class="chart-wrap"><h4>evolución de la campaña</h4><div class="cv"><canvas id="c-hist"></canvas></div></div>
        <div class="chart-wrap"><h4>fuentes (%)</h4><div class="cv"><canvas id="c-src"></canvas></div></div>
      </div>
      ${o.notas ? `<div class="notes">${esc(o.notas)}</div>` : ''}
      <div class="cert">Actualizado por el equipo de RankeaPro · última actualización ${fdate(last)}</div>
      </div>
    </div>`;
}

function reportsHTML(reports){
  if(!reports.length) return `<div class="empty">Aún no hay reportes publicados para esta orden.</div>`;
  return reports.map(r => `
    <div class="report">
      <h4>${esc(r.titulo)} <span>${fdate(r.fecha)}</span></h4>
      ${r.contenido ? `<p>${esc(r.contenido)}</p>` : ''}
      ${Array.isArray(r.evidencias) && r.evidencias.length ? `<div class="evid">${r.evidencias.map(e => {
        const img = /\.(png|jpe?g|gif|webp)(\?|$)/i.test(e.url);
        return `<a href="${esc(e.url)}" target="_blank" rel="noopener">${img ? `<img src="${esc(e.url)}" alt="${esc(e.nombre||'evidencia')}">` : `<span class="file">${esc(e.nombre||'archivo')}</span>`}</a>`;
      }).join('')}</div>` : ''}
    </div>`).join('');
}
