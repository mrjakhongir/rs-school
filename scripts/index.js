const HAMBURGER = document.querySelector('.hamburger')
const NAV = document.querySelector('.nav')
const NAV_ITEMS = document.querySelectorAll('.nav__links a')
const HEADER = document.querySelector('.header')

let isNavOpen = false

HAMBURGER.addEventListener('click', () => {
	if (isNavOpen) {
		NAV.classList.remove('nav-open')
		HAMBURGER.classList.remove('hamburger-open')
		enableScroll()
	} else {
		NAV.classList.add('nav-open')
		HAMBURGER.classList.add('hamburger-open')
		disableScroll()
	}

	isNavOpen = !isNavOpen
})

NAV_ITEMS.forEach(item => {
	item.addEventListener('click', () => {
		NAV.classList.remove('nav-open')
		HAMBURGER.classList.remove('hamburger-open')
		enableScroll()
	})
})

// disable scroll
function disableScroll() {
	const widthScroll = window.innerWidth - document.body.offsetWidth
	document.body.style.overflow = 'hidden'
	document.body.style.paddingRight = `${widthScroll}px`
}

// enable scroll
function enableScroll() {
	document.body.style.overflow = 'auto'
	document.body.style.paddingRight = '0'
}
