const User = require('../models/User');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteUser : async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) res.status(404).json(`User not found by id ${req.params.id}`);
            const resp = await user.delete();
            res.status(200).json(resp);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};


module.exports = userController;