const { Router } = require("express");
const { save } = require("../save_json");
let { favouriteNumber, text } = require("../data.json");
const add = require("../add");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const router = new Router();

router.get("/text", async (req, res) => {
	let my_file = await s3
		.getObject({
			Bucket: "cyclic-repulsive-puce-shawl-us-west-1",
			Key: "data.json",
		})
		.promise();

	const userText = JSON.parse(my_file.Body)?.text;

	res.json({
		Content: userText,
	});
});

router.post("/text", async (req, res) => {
	const { text } = req.body;
	if (text == null) {
		res.status(400).send("Not provided text");
		return;
	}

	await save({
		text: text,
	});

	res.json({
		status: "success",
		newContent: text,
	});
});

router.get("/sum/:number1/:number2", async (req, res) => {
	let my_file = await s3
		.getObject({
			Bucket: "cyclic-repulsive-puce-shawl-us-west-1",
			Key: "data.json",
		})
		.promise();
	const favNumber = JSON.parse(my_file.Body)?.favouriteNumber;

	const { number1, number2 } = req.params;
	if (number1 == null || number2 == null) {
		res.status(400).send("Not provided numbers");
		return;
	}
	if (isNaN(parseInt(number1)) || isNaN(parseInt(number2))) {
		res.status(400).send("Numbers needs to be integer");
		return;
	}

	let result = add(parseInt(number1), parseInt(number2));

	if (favNumber != null) {
		result = add(result, favNumber);
	}

	res.json({
		status: "success",
		result: result,
	});
});

router.post("/favNumber", async (req, res) => {
	const { number } = req.body;
	if (number == null) {
		res.status(400).send("Not provided number");
		return;
	}
	if (isNaN(parseInt(number))) {
		res.status(400).send("The number needs to be integer");
		return;
	}

	await save({
		favouriteNumber: number,
	});

	res.json({
		status: "success",
		newFavouriteNumber: number,
	});
});

router.delete("/favNumber", (req, res) => {
	favouriteNumber.favouriteNumber = 0;
	save(favouriteNumber);
	res.json({
		status: "success",
	});
});

module.exports = router;
