const express = require("express");
const router = express.Router();

const authController = require("../Controllers/auth.controller.js");

router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
// export default router; -> we are not using this because :The error SyntaxError: Unexpected token 'export' occurs because you are using ES6 module syntax (export default) in a Node.js environment that does not support ES6 modules by default. Node.js uses CommonJS module syntax (module.exports) unless explicitly configured to use ES6 modules.
