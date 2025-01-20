'use strict'

exports.validateURL = (url) => {
    return /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i.test(url)
}