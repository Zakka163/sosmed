const not_found = (req, res, next) => {
	res.status(404).json({ status: '404', message: "failed, no endpoint" });
}

const error = (err,req,res,next) => {
	console.log(err.stack)
	console.log(err.message)
	console.log(err.status)


	// const message_error = { }
	res.status(500).json({ status: '500',message:err.message });
}

module.exports = { not_found,error}
