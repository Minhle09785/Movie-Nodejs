module.exports = { 
      sendSuccess : (res, message, data = null) => {
        let responseJson = {
            success: true,
            message: message
        }
        if (data) responseJson.data = data
        return res.status(200).json(responseJson)
    } ,

    sendError : (res, message, code = 400) => {
        return res.status(code).json({
            success: false,
            message: message
        })
    },
    sendServerError : res =>
    res.status(500).json({
        success: false,
        message: 'Server Interval Error.'
    })
}
