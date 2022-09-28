const {createUser, deleteUser, getUserById, getUsers, updateUser} = require("./user.controller");
const router = require("express").Router();


router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/", updateUser);
router.delete("/", deleteUser);


module.exports = router;