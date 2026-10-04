// Script de <head> : pose <html data-motion> avant l'affichage (cahier §4).
// Garde-fou : si le moteur d'animation ne démarre pas en 4 s, l'attribut est
// retiré et tout redevient visible.
export const MOTION_HEAD_SCRIPT = `(function(){try{var d=document.documentElement,m='full';
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)m='reduced';
else{var n=navigator,c=n.connection||{};if(c.saveData||/2g|3g/.test(c.effectiveType||'')||(n.deviceMemory&&n.deviceMemory<4)||(n.hardwareConcurrency&&n.hardwareConcurrency<4))m='lite';}
d.setAttribute('data-motion',m);
setTimeout(function(){if(!window.__sunMotionReady)d.removeAttribute('data-motion');},4000);}catch(e){}})();`;
