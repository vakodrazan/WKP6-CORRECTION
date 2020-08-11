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
		vegetarian: true,
	},
];

const orders = [];

const foodList = document.querySelector('.food-list');
const orderList = document.querySelector('.order-list');
const totalElem = document.querySelector('.total');
const spicy = document.querySelector('#spicy');
const vegetarian = document.querySelector('#vegetarian');

// show the food element from the list
const loadFoodList = e => {
	let filteredFoods = [...foods];
	if (spicy.checked) {
		filteredFoods = filteredFoods.filter(food => food.spicy);
	}
	if (vegetarian.checked) {
		filteredFoods = filteredFoods.filter(food => food.vegetarian);
	}

	const html = filteredFoods.map(food => {
		return `
			<li>
				<span>
					${food.title}
					<img class="icon" ${food.spicy ? "" : 'hidden'} src="./assets/flame.svg" alt="Spicy ${food.title}">
					<img class="icon" ${food.vegetarian ? "" : 'hidden'} src="./assets/leaf.svg" alt="Vegetarian ${food.title}">
				</span>
				<span>${food.price} Ar</span>
				<button value="${food.id}" class="add">Add</button>
			
				</li>
		`;
	})
	.join('');
	foodList.innerHTML = html;
};

// add a food element to the order
const addFoodToOrder = id => {
	// find the element that has the same id
	const newOrder = foods.find(food => food.id === id);
	orders.push(newOrder);
	orderList.dispatchEvent(new CustomEvent('orderUpdated'))
};

// event delegation to handle a click on food list button 
const handleListClick = e => {
	if (e.target.matches("button.add")) {
		addFoodToOrder(e.target.value);
	}
};

// show the order as we want it
const showOrderList = () => {
	const instances = orders.reduce((acc, order) => {
		if (acc[order.id]) {
			acc[order.id]++;
		} else {
			acc[order.id] = 1;
		}
		return acc;
	}, {});
	
	// change this object into an array
	const html = Object.entries(instances)
	// loop through each properties of this array
		.map(([foodId, numberOfFood]) => {
			// get the full object back, with its id
			const fullFoodObject = foods.find(food => food.id === foodId);
			return `<li><span>${fullFoodObject.title}</span> 
						<span>+${numberOfFood}</span> 
						<span>$ ${fullFoodObject.price * numberOfFood} Ar</span>
					</li>`;
		})
	.join('');
	orderList.innerHTML = html;

};

const updateTotal = () => {
	// calculate the full bill
	const total = orders.reduce((totalAcc, order) => {
		
		return totalAcc + order.price;
	}, 0);
	totalElem.textContent = `${total} Ar`;
}

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

// modal listener
orderButton.addEventListener('click', openModal);
window.addEventListener('keydown', handleEscape);
outerModal.addEventListener('click', handleClick);

// event delegation on the food list
foodList.addEventListener('click', handleListClick);
// custom event for updatiing the order list
orderList.addEventListener('orderUpdated', showOrderList);
orderList.addEventListener('orderUpdated', updateTotal);

// listener for our filter to reload the list
spicy.addEventListener('change', loadFoodList);
vegetarian.addEventListener('change', loadFoodList);

// show the list for the first time
window.addEventListener('DOMContentLoaded', loadFoodList);
// loadFoodList();