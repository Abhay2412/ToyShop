import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @description: Authorize the user and also be able to get the token generated by JWT
// @route: POST Request to the users token
//@acesss: Public-> meaning anyone can hit this route
const authorizeUser = asyncHandler(async (request, response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
        response.json({
            _id: user._id,
            name: user.name, 
            email: user.email, 
            isAdmin: user.isAdmin,
            token: null
        })
    }
    else {
        response.status(401); //Not authroized
        throw new Error('Invalid email or password');
    }

})

export { authorizeUser };