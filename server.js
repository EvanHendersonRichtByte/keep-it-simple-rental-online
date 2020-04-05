const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
// ────────────────────────────────────────────────────────────────────────────────
mongoose.connect('mongodb://localhost/keep-it-simple-rental-online', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const app = express();
app.use(cors());
app.use(express.json({ extended: true }));

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	description: String,
	email: String,
	age: Number,
	address: String,
	country: String,
	phoneNumber: Number,
	role: String,
	zip: Number,
	image: {
		type: String,
		default: 'Public.png'
	}
});

const User = mongoose.model('User', UserSchema);

const LotSchema = new mongoose.Schema({
	title: String,
	location: String,
	description: String,
	contact: Number,
	price: String,
	status: String,
	image: String
});

const Lot = mongoose.model('Lot', LotSchema);

const TransactionSchema = new mongoose.Schema({
	userId: String,
	rents: { LotSchema },
	total: Number,
	status: String,
	image: String
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

//
// ─── MULTER CONFIG ──────────────────────────────────────────────────────────────
//

const userStorage = multer.diskStorage({
	destination: './client/public/uploads/users/',
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

var uploadUserStorage = multer({ storage: userStorage }).single('image');

// ─── USER SIDE ──────────────────────────────────────────────────────────────────

app.post('/register', (req, res) => {
	User.create(
		{
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			role: req.body.role
		},
		(err, user) => {
			try {
				console.log(user);
			} catch (error) {
				console.log(error);
			}
		}
	);
});

app.post('/login', (req, res) => {
	User.findOne({ username: req.body.username, password: req.body.password }, (err, user) => {
		try {
			if (user.username === req.body.username && user.password === req.body.password) {
				res.send(user);
			}
		} catch (error) {
			res.send('User not found');
			console.log(error);
		}
	});
});

app.get('/user/:id', (req, res) => {
	User.findById(req.params.id, (err, user) => {
		try {
			res.send(user);
		} catch (error) {
			console.log(error);
		}
	});
});

app.put('/user/:id', (req, res) => {
	uploadUserStorage(req, res, (err) => {
		if (err) {
			console.log(err);
		} else {
			User.findByIdAndUpdate(
				req.params.id,
				{
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					description: req.body.description,
					email: req.body.email,
					age: req.body.age,
					address: req.body.address,
					country: req.body.country,
					phoneNumber: req.body.phoneNumber,
					zip: req.body.zip,
					image: req.file.filename
				},
				(err, data) => {
					try {
						res.send(data);
					} catch (error) {
						console.log(error);
					}
				}
			);
		}
	});
});

//
// ─── ADMIN SIDE ─────────────────────────────────────────────────────────────────
//

//
// ───────────────────────────────────────────────────────── LOT MANIPULATION ─────
//
app.post('/lot', (req, res) => {
	Lot.create({
		title: req.body.title,
		location: req.body.location,
		description: req.body.description,
		contact: req.body.contact,
		price: req.body.price,
		status: req.body.status
	});
});

app.get('/lot', (req, res) => {
	Lot.find({}, (err, lot) => {
		try {
			res.send(lot);
		} catch (error) {
			console.log(error);
		}
	});
});

app.put('/lot/:id', (req, res) => {
	Lot.findByIdAndUpdate(
		req.params.id,
		{
			title: req.body.title,
			location: req.body.location,
			description: req.body.description,
			contact: req.body.contact,
			price: req.body.price,
			status: req.body.status
		},
		(err, updatedLot) => {
			try {
				res.send(updatedLot);
			} catch (error) {
				console.log(error);
			}
		}
	);
});

app.delete('/lot/:id', (req, res) => {
	Lot.findByIdAndRemove(req.params.id, (err, deletedLot) => {
		try {
			console.log('Deleted' + deletedLot);
		} catch (error) {
			console.log(error);
		}
	});
});
//
// ─────────────────────────────────────────── EMPLOYEE AND USER MANIPULATION ─────
//

app.post('/admin/user', (req, res) => {
	uploadUserStorage(req, res, (err) => {
		if (err) {
			console.log(err);
		} else {
			User.create(
				{
					username: req.body.username,
					password: req.body.password,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					description: req.body.description,
					email: req.body.email,
					age: req.body.age,
					address: req.body.address,
					country: req.body.country,
					phoneNumber: req.body.phoneNumber,
					role: req.body.role,
					status: req.body.status,
					image: req.file.filename
				},
				(err, user) => {
					try {
						res.send(user);
					} catch (error) {
						console.log(error);
					}
				}
			);
		}
	});
});

app.get('/admin/user', (req, res) => {
	User.find({}, (err, users) => {
		try {
			res.send(users);
		} catch (error) {
			console.log(error);
		}
	});
});

app.put('/admin/user/:id', (req, res) => {
	uploadUserStorage(req, res, (err) => {
		if (err) {
			console.log(err);
		} else {
			User.findByIdAndUpdate(
				req.params.id,
				{
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					description: req.body.description,
					email: req.body.email,
					age: req.body.age,
					address: req.body.address,
					country: req.body.country,
					phoneNumber: req.body.phoneNumber,
					zip: req.body.zip,
					image: req.file.filename
				},
				(err, data) => {
					try {
						res.send(data);
					} catch (error) {
						console.log(error);
					}
				}
			);
		}
	});
});

app.delete('/admin/user/:id', (req, res) => {
	User.findByIdAndDelete(req.params.id, (err, user) => {
		try {
			res.send(user);
		} catch (error) {
			console.log(error);
		}
	});
});

// ────────────────────────────────────────────────────────────────────────────────
app.listen('2020', () => {
	console.log('Server is walking');
});
