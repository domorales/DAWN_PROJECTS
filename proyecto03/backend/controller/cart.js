const Cart = require('../model/cart');

module.exports.getAllCarts = (req, res) => {
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;
	const startDate = req.query.startdate || new Date('1970-1-1');
	const endDate = req.query.enddate || new Date();

	console.log(startDate, endDate);

	Cart.find({
		date: { $gte: new Date(startDate), $lt: new Date(endDate) },
	})
		.limit(limit)
		.sort({ id: sort })
		.then((carts) => {
			res.json(carts);
		})
		.catch((err) => console.log(err));
};

module.exports.getCartsbyUserid = (req, res) => {
	const userId = req.params.userid;
	const startDate = req.query.startdate || new Date('1970-1-1');
	const endDate = req.query.enddate || new Date();

	console.log(startDate, endDate);
	Cart.find({
		userId,
		date: { $gte: new Date(startDate), $lt: new Date(endDate) },
	})
		.populate('products.productId')
		.exec((err, carts) => {
			if (err) {
				console.log(err);
				return;
			}
			console.log(carts);
			res.json(carts);
		});
};

module.exports.getSingleCart = (req, res) => {
	const id = req.params.id;
	Cart.findOne({
		id,
	})
		.then((cart) => res.json(cart))
		.catch((err) => console.log(err));
};

module.exports.addCart = (req, res) => {
	if (typeof req.body == undefined) {
		res.json({
			status: 'error',
			message: 'data is undefined',
		});
	} else {
		Cart.find().then(() => {
			const cart = new Cart({
				userId: req.body.userId,
				date: req.body.date,
				products: req.body.products,
			});
			cart
				.save()
				.then((cart) => res.json(cart.populate('products.productId')))
				.catch((err) => console.log(err));
		});
	}
};

module.exports.editCart = (req, res) => {
	if (typeof req.body == undefined || req.params.id == null) {
		res.json({
			status: 'error',
			message: 'something went wrong! check your sent data',
		});
	} else {
		console.log(req.params.id);
		Cart.findOneAndUpdate(
			{ _id: req.params.id },
			{ date: req.body.date, products: req.body.products },
			{ new: true }
		)
			.populate('products.productId')
			.then((cart) => {
				console.log(cart.products);
				res.json(cart);
			})
			.catch((err) => console.log(err));
	}
};

module.exports.deleteCart = (req, res) => {
	if (req.params.id == null) {
		res.json({
			status: 'error',
			message: 'cart id should be provided',
		});
	} else {
		Cart.findOne({ id: req.params.id })
			.then((cart) => {
				res.json(cart);
			})
			.catch((err) => console.log(err));
	}
};
