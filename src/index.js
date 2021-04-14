import Template from '@templates/Template.js';
import '@styles/main.css'; // MAS DIRECTO CON LIBRERIAS //
import '@styles/vars.styl';

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
