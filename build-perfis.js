const fs=require('fs');
const root='C:/Users/Paul/Desktop/files/DESENVOLVIMENTO SITES/abrigoterapia/';
const html=fs.readFileSync(root+'index.html','utf-8');
const src=html.match(/const team = (\[[\s\S]*?\n\]);/)[1];
const team=eval(src);
team.sort((a,b)=>a.n.localeCompare(b.n,'pt-BR'));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const crpOf=p=>p.crp.startsWith('CRP')?p.crp:'CRP '+p.crp;
const wa=n=>'https://wa.me/55'+n.replace(/\D/g,'')+'?text='+encodeURIComponent('Olá! Vim pelo site da Abrigoterapia e gostaria de agendar um atendimento.');
const head=fs.readFileSync(root+'index.html','utf-8').match(/<link rel="preconnect"[\s\S]*?<link rel="stylesheet" href="https:\/\/unpkg[^>]*light\/style\.css">/)[0];
team.forEach((p,i)=>{
  const extra=(p.extra||[]).map(([h,c])=>`<h2>${h}</h2>`+(Array.isArray(c)?`<ul class="f">${c.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:`<p class="t">${esc(c)}</p>`)).join('\n      ');
  const others=team.filter((_,k)=>k!==i).map(o=>`<li><a href="${o.slug}.html"><img src="../${o.img}" alt="" loading="lazy" width="68" height="84"><span>${esc(o.n)}</span></a></li>`).join('\n      ');
  const desc=esc(p.bio[0].slice(0,150).replace(/\s+\S*$/,'')+'...');
  const page=`<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.n)} | Abrigoterapia</title>
<meta name="description" content="${desc}">
<meta name="color-scheme" content="light">
${head}
<link rel="stylesheet" href="../style.css">
</head>
<body>
<header id="top">
  <nav class="wrap nav" aria-label="Principal">
    <a href="../index.html" class="brand" aria-label="Abrigoterapia, início">
      <span>Abrigo<i>terapia</i></span>
    </a>
    <button class="burger" id="burger" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu"><span></span><span></span></button>
    <ul class="menu" id="menu">
      <li><a href="../index.html#psicologos">Psicólogos</a></li>
      <li><a href="../index.html#como-funciona">Como funciona</a></li>
      <li><a href="../index.html#local">Localização</a></li>
    </ul>
  </nav>
</header>

<main class="profile">
  <div class="wrap">
    <a class="back" href="../index.html#psicologos"><i class="ph ph-arrow-left" aria-hidden="true"></i>Todos os psicólogos</a>
    <div class="p-grid">
      <div class="p-photo"><div class="photo"><img src="../${p.img}" alt="Retrato de ${esc(p.n)}" width="600" height="780"></div></div>
      <article class="p-body">
        <p class="label">Perfil profissional</p>
        <h1 class="display">${esc(p.n)}</h1>
        <p class="crp">${crpOf(p)}</p>
        <ul class="chips">${p.tags.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>
        ${p.quote?`<p class="quote">“${esc(p.quote)}”</p>`:''}
        ${p.bio.map(t=>`<p class="t">${esc(t)}</p>`).join('\n        ')}
        ${extra}
        <div class="p-cta">
          <p>Converse e agende seu primeiro atendimento.</p>
          <a class="pill" href="${wa(p.tel)}" target="_blank" rel="noopener"><svg class="wa-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>${esc(p.tel)}</a>
        </div>
      </article>
    </div>
  </div>
</main>

<section class="others" aria-labelledby="oth">
  <div class="wrap">
    <h2 id="oth" class="display">Conheça também</h2>
    <ul>
      ${others}
    </ul>
  </div>
</section>

<footer>
  <div class="word" aria-hidden="true">Abrigo<i>terapia</i></div>
  <div class="wrap foot">
    <span>Rua Serra de Botucatu, 113, Tatuapé, São Paulo</span>
    <span>© <span id="yr">2026</span> Abrigoterapia</span>
  </div>
</footer>

<script>
const header=document.getElementById('top'),burger=document.getElementById('burger'),menu=document.getElementById('menu');
function setMenu(o){menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);header.classList.toggle('menu-open',o);document.body.classList.toggle('lock',o);}
burger.addEventListener('click',()=>setMenu(!menu.classList.contains('open')));
menu.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false);});
document.getElementById('yr').textContent=new Date().getFullYear();
</script>
</body>
</html>
`;
  fs.writeFileSync(root+'psicologos/'+p.slug+'.html',page);
});
console.log(team.map(p=>p.slug).join('\n'));
