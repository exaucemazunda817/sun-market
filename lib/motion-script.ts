// Script de <head> : pose <html data-motion> avant l'affichage (cahier §4).
// Intro du logo : décidée ici (accueil FR/EN, mode complet, une fois par session),
// et terminée ici aussi (2,65 s), sans attendre React : sur connexion lente le
// JavaScript de la page arrive tard, et l'intro ne doit jamais rester affichée.
// Mode « allégé » seulement si économie de données, connexion 2G ou appareil
// très limité. Le cahier prévoyait aussi la 3G, mais à Kinshasa presque toutes
// les connexions s'annoncent « 3g » : le site paraissait figé (constat de
// Mazunda, 04/10/2026). Toutes les animations restent légères (transform/opacity).
// Garde-fou : si le moteur d'animation ne démarre pas en 4 s, l'attribut est
// retiré et tout redevient visible.
export const MOTION_HEAD_SCRIPT = `(function(){try{var d=document.documentElement,m='full';
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)m='reduced';
else{var n=navigator,c=n.connection||{};if(c.saveData||/(^|-)2g/.test(c.effectiveType||'')||(n.deviceMemory&&n.deviceMemory<2)||(n.hardwareConcurrency&&n.hardwareConcurrency<2))m='lite';}
d.setAttribute('data-motion',m);
if(m==='full'&&(location.pathname==='/'||location.pathname==='/en')){try{if(sessionStorage.getItem('sunIntroSeen')!=='1'){sessionStorage.setItem('sunIntroSeen','1');d.setAttribute('data-intro','');
setTimeout(function(){if(d.hasAttribute('data-intro')){d.removeAttribute('data-intro');window.dispatchEvent(new Event('sun:intro-end'));}},2650);}}catch(e){}}
setTimeout(function(){if(!window.__sunMotionReady)d.removeAttribute('data-motion');},4000);}catch(e){}})();`;
