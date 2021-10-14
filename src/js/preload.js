document.addEventListener("DOMContentLoaded", (e) => {
	var app_container = document.querySelector('#app')
	var pre_container = document.querySelector('#preloader')
	setTimeout(removePreload, 1000, app_container, pre_container)
});
function removePreload(app, preloader_container) {
	preloader_container.style.display = 'none '
	app.style.display = 'block'
}