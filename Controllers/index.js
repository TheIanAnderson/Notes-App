const router = require("express").Router();
const homeRoutes = require("./homeRoutes.js");
const notesRouter = require("./homeRoutes.js")

router.use("/", homeRoutes);
router.use("/api/notes", notesRouter)

module.exports = router;
