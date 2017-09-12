'use strict';
document.addEventListener('DOMContentLoaded',messen);
document.addEventListener('resize',messen);

function messen() {
	document.getElementById('clientW').textContent = document.querySelector('html').clientWidth;
	document.getElementById('clientH').textContent = document.querySelector('html').clientHeight;
}