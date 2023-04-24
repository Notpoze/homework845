const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const save = async (saveVar) => {
	console.log("saving");
	await s3
		.putObject({
			Body: JSON.stringify(saveVar, null, 2),
			Bucket: "cyclic-repulsive-puce-shawl-us-west-1",
			Key: "data.json",
		})
		.promise();
};

module.exports = { save };
