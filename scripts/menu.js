const MENU_ITEMS = document.querySelector('.menu__items')
const REFRESH_BTN = document.querySelector('.refresh-button')
const MENU_TABS = document.querySelectorAll('.menu__tab')

let count = 4
let currentCategory = 'coffee'
let menuItems = null
let currentWidth

function filterItemsByCategory(category, startIndex = 0) {
	const currentData = menuItems.filter(item => item.category === category)
	if (currentWidth >= 1024) {
		count = 8
		REFRESH_BTN.classList.add('refresh-button--hide')
	} else {
		if (currentData.length <= count) {
			REFRESH_BTN.classList.add('refresh-button--hide')
		} else {
			REFRESH_BTN.classList.remove('refresh-button--hide')
		}
	}
	const data = currentData.slice(startIndex, count)
	populateItems(data)
}

function populateItems(data) {
	data.map((item, index) => {
		const menuItem = document.createElement('div')
		menuItem.className = 'menu__item populate-item'
		menuItem.setAttribute('key', index)
		menuItem.setAttribute('onclick', `openModal('${item.name}')`)
		menuItem.innerHTML = `
			<div class="image-wrapper">
				<img src=${item.img} alt=${item.name} />
			</div>
			<div class="menu__item-info">
				<h2 class="menu__item_title">${item.name}</h2>
				<p class="menu__item_description">
					${item.description}
				</p>
				<span class="menu__item_price">$${item.price}</span>
			</div>
		`

		setTimeout(() => {
			MENU_ITEMS.appendChild(menuItem)
			menuItem.addEventListener('animationend', () => {
				menuItem.classList.remove('populate-item')
			})
		}, 100 * index)
	})
}

MENU_ITEMS.addEventListener('animationend', () => {
	MENU_ITEMS.classList.remove('populate-menu')
})

async function getData() {
	const response = await fetch('../data/data.json')
	const data = await response.json()
	return data
}

async function renderMenu() {
	menuItems = await getData()
	filterItemsByCategory('coffee')
}

function loadMore() {
	count += 4
	filterItemsByCategory(currentCategory, 4)
	REFRESH_BTN.classList.add('refresh-button--hide')
}

document.addEventListener('DOMContentLoaded', () => {
	currentWidth = window.innerWidth
	if (currentWidth >= 1024) {
		count = 8
		REFRESH_BTN.classList.add('refresh-button--hide')
	}
	renderMenu()
})

REFRESH_BTN.addEventListener('click', loadMore)

MENU_TABS.forEach(tab => {
	tab.addEventListener('click', () => {
		MENU_TABS.forEach(tab => tab.classList.remove('menu__tab--active'))
		tab.classList.add('menu__tab--active')

		MENU_ITEMS.innerHTML = ''
		count = 4
		currentCategory = tab.dataset.category

		filterItemsByCategory(currentCategory, 0)
	})
})

// MODAL
const MODAL = document.querySelector('.modal')

function openModal(name) {
	disableScroll()
	const selectedItem = menuItems.find(item => item.name === name)
	MODAL.classList.add('modal-open')
	MODAL.innerHTML = `
		<div class="modal-content">
			<div class="modal__img">
				<img src=${selectedItem.img} alt=${selectedItem.name} />
			</div>
			<div class="modal__info">
				<div>
					<h3 class="modal__title">${selectedItem.name}</h3>
					<p class="modal__description">
					${selectedItem.description}
					</p>
				</div>
				<div class="filters">
					<span class="filter-title">Size</span>
					<div class="filter-btns">
					${Object.entries(selectedItem.sizes)
						.map(([label, { size, 'add-price': price }]) => {
							return `
								<label class="filter-btn" for="size-${label}">
									<span>${label.toUpperCase()}</span>
									<span>${size}</span>
									<input
										type="radio"
										id="size-${label}"
										name="size"
										data-price="${price}"
										onchange="changeSize(this, ${selectedItem.price})"
										${label === 's' ? 'checked' : ''}/>
								</label>
						`
						})
						.join('')}
					</div>
				</div>
				<div class="filters">
					<span class="filter-title">Additives</span>
					<div class="filter-btns">
						${selectedItem.additives
							.map(({ name, 'add-price': price }, index) => {
								return `
									<label class="filter-btn" for="additive-${index}">
										<span>${index + 1}</span>
										<span>${name}</span>
										<input type="checkbox" id="additive-${index}" data-price="${price}" onchange="addAdditive(this,${selectedItem.price})"/>
									</label>
								`
							})
							.join('')}
					</div>
				</div>
				<div class="modal__price">
					<span>Total:</span>
					<span id="total-price">$${selectedItem.price}</span>
				</div>
				<div class="modal__disclaimer">
					<img
						src="../assets/images/icons/info-empty.svg"
						alt="info"
						width="16"
						height="16"
					/>
					<p>
						The cost is not final. Download our mobile app to see the final
						price and place your order. Earn loyalty points and enjoy your
						favorite coffee with up to 20% discount.
					</p>
				</div>
				<button class="modal__close_btn" onclick="closeModal()">Close</button>
			</div>
		</div>
	`
}

let sizePrice = 0
let additivesPrice = 0

function changeSize(radio, basePrice) {
	const totalPrice = document.getElementById('total-price')
	sizePrice = parseFloat(radio.dataset.price)
	totalPrice.textContent = `$${(basePrice + sizePrice + additivesPrice).toFixed(2)}`
}

function addAdditive(checkbox, basePrice) {
	const totalPrice = document.getElementById('total-price')
	const price = parseFloat(checkbox.dataset.price)
	if (checkbox.checked) {
		additivesPrice += price
	} else {
		additivesPrice -= price
	}

	totalPrice.textContent = `$${(basePrice + sizePrice + additivesPrice).toFixed(2)}`
}

function closeModal() {
	MODAL.classList.remove('modal-open')
	const INPUTS = document.querySelectorAll('.filter-btn input')
	INPUTS.forEach(input => (input.checked = false))
	sizePrice = 0
	additivesPrice = 0
	enableScroll()
}

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
