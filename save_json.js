const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const save = async (favNumber) => {
	console.log("saving");
	let key = "";
	if (isNaN(favNumber)) {
		key = "text.json";
	} else {
		key = "number.json";
	}
	await s3
		.putObject({
			Body: JSON.stringify(favNumber, null, 2),
			Bucket: "cyclic-repulsive-puce-shawl-us-west-1",
			Key: key,
		})
		.promise();
};

module.exports = { save };
