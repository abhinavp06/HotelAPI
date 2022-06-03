// Simple test to see what type of user is logged in
exports.whoIsLoggedIn = async (req,res) => {
    if(req.user == null){
        return res.json({message: `No one is logged in.`})
    }
    else if(req.user.role == 0){
        return res.json({message: `Customer with ID: ${req.user.customerID}`})
    }
    return res.json({message: `Hotel with ID: ${req.user.hotelID}`})
}