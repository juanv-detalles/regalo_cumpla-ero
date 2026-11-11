
/* CORAZONES Y ELEMENTOS FLOTANTES */

const sky = document.getElementById('sky');

const symbols = ['♡','♥','✦','✧','🌸'];

for(let i=0; i<24; i++){
  let e = document.createElement('span');

  e.className = 'float';
  e.textContent = symbols[i % symbols.length];
  e.style.left = Math.random()*100+'%';
  e.style.fontSize = (12+Math.random()*19)+'px';
  e.style.animationDuration = (9+Math.random()*12)+'s';
  e.style.animationDelay = (-Math.random()*18)+'s';

  e.style.color = [
    '#d982a7','#d8ad62','#c8a7d8','#efb8ce'
  ][i%4];

  sky.appendChild(e);
}

/* CONFETI */

function confetti(n=95){
  const colors = [
    '#e88db5','#d8ad62','#c6a7dc','#fff','#f3b7c9'
  ];

  for(let i=0; i<n; i++){
    let c = document.createElement('i');

    c.className = 'confetti';
    c.style.left = Math.random()*100+'vw';
    c.style.background = colors[i%colors.length];
    c.style.animationDelay = (Math.random()*.8)+'s';
    c.style.animationDuration = (2.5+Math.random()*2)+'s';

    document.body.appendChild(c);

    setTimeout(()=>c.remove(),5200);
  }
}

/* CAMBIAR DE PANTALLA */

function go(n){
  document.querySelectorAll('.screen').forEach(s=>{
    s.classList.remove('active');
  });

  document.getElementById('s'+n).classList.add('active');

  if(n===2) confetti(45);
  if(n===3) confetti(75);
}

/* PEDIR UN DESEO */

function makeWish(){

  document.getElementById('cakeWrap')
    .classList.add('cake-blown');

  document.getElementById('wishText').textContent =
    '¡Que todos tus deseos se hagan realidad, Gianella! 💫';

  document.getElementById('wishBtn').style.display='none';

  document.getElementById('toEnvelope').style.display='inline-block';

  confetti(130);
}

/* DEDICATORIA */

const dedication = `Te comparto este pequeño detalle interactivo para desearte un excelente día. Que Dios te derrame muchas bendiciones, salud y éxitos en la vida hoy y siempre.

Espero que este nuevo año que empiezas llegue cargado de grandes oportunidades y aprendizajes en cada paso que des. No quería dejar pasar esta fecha especial sin enviarte un cordial saludo.

Que la pases genial, que disfrutes al máximo cada momento de este día y que cada uno de tus proyectos, planes y metas se sigan cumpliendo con éxito. ¡Que vengan cosas grandiosas para ti! 🎉✨`;

let letterShown = false;

function openEnvelope(){

  if(letterShown) return;

  letterShown = true;

  document.getElementById('envelope')
    .classList.add('open');

  document.getElementById('finalNote').style.display='block';

  document.getElementById('envelope').style.display='none';

  const target = document.getElementById('finalDedication');

  target.textContent = '';

  document.getElementById('signature').style.display='none';
  document.getElementById('endLine').style.display='none';

  confetti(110);

  const paragraphs = dedication.split('\n\n');

  let paragraphIndex = 0;
  let characterIndex = 0;

  function typeNext(){

    if(paragraphIndex >= paragraphs.length){

      document.getElementById('signature').style.display='block';
      document.getElementById('endLine').style.display='block';

      confetti(45);

      return;
    }

    if(characterIndex === 0){

      const p = document.createElement('p');
      p.className = 'script';
      target.appendChild(p);
    }

    const current = target.lastElementChild;

    current.textContent += paragraphs[paragraphIndex].charAt(characterIndex);

    characterIndex++;

    if(characterIndex >= paragraphs[paragraphIndex].length){

      paragraphIndex++;
      characterIndex = 0;

      setTimeout(typeNext,420);

    }else{

      setTimeout(typeNext,24);
    }
  }

  typeNext();
}

/* MÚSICA LOCAL MP3 */

const backgroundMusic = document.getElementById('backgroundMusic');
const soundBtn = document.getElementById('soundBtn');

/* ACTUALIZAR BOTÓN SEGÚN EL ESTADO */

function updateMusicButton(){

  if(backgroundMusic.paused){
    soundBtn.textContent = '♫ Activar música';
  }else{
    soundBtn.textContent = '♫ Silenciar música';
  }
}

/* ACTIVAR Y SILENCIAR MÚSICA */

soundBtn.addEventListener('click', async function(){

  if(backgroundMusic.paused){

    try{

      await backgroundMusic.play();

      updateMusicButton();

    }catch(error){

      console.error('No se pudo reproducir la música:', error);

      soundBtn.textContent = '♫ Activar música';

      alert('No se pudo reproducir la canción. Verifica que musica.mp3 esté en la misma carpeta que index.html.');

    }

  }else{

    backgroundMusic.pause();

    updateMusicButton();

  }

});

/* SINCRONIZAR EL BOTÓN */

backgroundMusic.addEventListener('play', updateMusicButton);
backgroundMusic.addEventListener('pause', updateMusicButton);
backgroundMusic.addEventListener('ended', updateMusicButton);

/* DETECTAR ERRORES DE AUDIO */

backgroundMusic.addEventListener('error', function(){

  console.error('Error al cargar musica.mp3');

  soundBtn.textContent = '♫ Activar música';

});

/* CONFETI INICIAL */

setTimeout(()=>confetti(45),500);
