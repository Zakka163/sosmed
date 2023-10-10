const not_found = (req, res, next) => {
	res.status(404).json({ status: '404', message: "failed, no endpoint" });
}

const error = (err,req,res,next) => {
	console.log(err)


	// const message_error = { }
	res.status(500).json({ status: '404' });
}

module.exports = { not_found,error }
