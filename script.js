const foods = [
	{
		id: 'ravitoto',
		price: 5000,
		title: 'Ravitoto',
		spicy: true,
		vegetarian: false,
	},
	{
		id: 'pasta',
		price: 4000,
		title: 'Pasta',
		spicy: true,
		vegetarian: true,
	},
	{
		id: 'burger',
		price: 5000,
		title: 'Burger',
		spicy: false,
		vegetarian: false,
	},
	{
		id: 'rice',
		price: 2000,
		title: 'Rice and Leaves',
		spicy: false,
		vegetarian: true,
	},
	{
		id: 'mofogasy',
		price: 500,
		title: 'Mofogasy',
		spicy: false,
		vegetarian: false,
	},
];

const orders = [];

const foodList = document.querySelector('.food-list');
const orderList = document.querySelector('.order-list');
const totalElem = document.querySelector('.total');
const spicy = document.querySelector('#spicy');
const vegetarian = document.querySelector('#vegetarian');

const loadFoodList = e => {};

const addFoodToOrder = id => {};

const handleListClick = e => {};

const showOrderList = () => {};

// ***** MODAL CODE *****

const outerModal = document.querySelector('.modal-outer');
const innerModal = document.querySelector('.modal-inner');
const orderButton = document.querySelector('.confirm');

const openModal = e => {
	const html = `
		<h2>Thank you!</h2>
		<p>Your order is confirmed.<br/>
		We will prepare your food, and deliver to you when it's ready.</p>
		<p>The total amount is <b>${totalElem.textContent}</b>.</p>
		<button>Close</button>
	`;
	innerModal.innerHTML = html;
	outerModal.classList.add('open');
};

const handleClick = e => {
	const isOutside = !e.target.closest('.modal-inner');
	if (isOutside) {
		outerModal.classList.remove('open');
	}
	if (e.target.matches('button')) {
		outerModal.classList.remove('open');
	}
};

const handleEscape = e => {
	if (e.key === 'Escape') {
		outerModal.classList.remove('open');
	}
};

// ******* LISTENERS *******

orderButton.addEventListener('click', openModal);
window.addEventListener('keydown', handleEscape);
outerModal.addEventListener('click', handleClick);
foodList.addEventListener('click', handleListClick);
orderList.addEventListener('orderUpdated', showOrderList);
spicy.addEventListener('change', loadFoodList);
vegetarian.addEventListener('change', loadFoodList);
window.addEventListener('DOMContentLoaded', loadFoodList);
