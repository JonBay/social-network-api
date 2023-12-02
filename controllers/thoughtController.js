const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");


module.exports = {
    //Get all thoughts
    async allThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            // const thoughtObj = {
            //     thoughts
            // };
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //Get single though
    async singleThought(req, res) {
        try {
            const oneThought = await Thought.findOne({ _id: req.params.thoughtId })

            if (!oneThought) {
                return res.status(404).json({ message: "No thought found with that id" });
            }

            res.json(oneThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    //Create new thought(POST)
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            const pushThought = await User.findByIdAndUpdate(
                req.body.userId,
                { $addToSet: { thoughts: newThought._id } },
                { runValidators: true, new: true },
            );
            res.status(200).json({ newThought, pushThought });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Updates thought by Id (PUT)
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updatedThought) {
                res.status(404).json({ message: "No thought found with that id" })
            }

            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //Deletes thought by Id (DELETE)
    async deleteThought(req, res) {
        try {
            const destroyThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            )

            if (!destroyThought) {
                res.status(404).json({ message: "No though found with that id" })
            };

            res.json({ message: "Thought successfully deleted" });

        } catch (err) {
            res.status(500).json(err);
        }
    },


    //Create reaction (POST)
    async createReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!reaction) {
                return res.status(404).json({ message: "Reaction not found with that id" });
            }

            res.json(reaction);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Deletes a reaction by the reaction's reactionId value
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!reaction) {
                return res.status(404).json({ message: "Reaction not found with that id" });
            }

            res.json("Reaction deleted.");
        } catch (err) {
            res.status(500).json(err);
        }
    }

}
