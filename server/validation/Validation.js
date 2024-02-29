class Validation{
    /**
     * 
     * @param {emailString} string 
     * @returns 
     */
    isEmail(emailString){
        return emailString.containt('@') && emailString.length > 5
    }
}

module.exports = Validation