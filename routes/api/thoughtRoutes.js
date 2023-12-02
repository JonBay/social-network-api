const router = require("express").Router();

const {
    allThoughts,
    singleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require("../../controllers/thoughtController.js");

// /api/thoughts
router.route("/").get(allThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
    .route("/:thoughtId")
    .get(singleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
    .route("/:thoughtId/reactions")
    .post(createReaction);

router.route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);


module.exports = router;