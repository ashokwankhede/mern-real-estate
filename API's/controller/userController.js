import {errorHandler} from '../utils/error.js';
import bcrypt from 'bcryptjs';
import User from '../models/userModels.js';

export const test = (req,res)=>{
    res.json({
        message:"Hello Brothers!"
    });
};

export const updateUser = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = errorHandler(401, false, "You can only update your own account.");
            return next(error);
        }

        let password = req.body.password ? bcrypt.hashSync(req.body.password, 10) : undefined;

        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: password,
                avatar: req.body.avatar
            }
        }, { new: true });

        if (!updateUser) {
            const error = errorHandler(404, false, "User not found.");
            throw error;
        }

        const { password: removedPassword, ...rest } = updateUser._doc;
        res.status(200).json({ status: true, message: "User updated successfully.", user: rest });
    } catch (error) {
        next(error);
    }
};
