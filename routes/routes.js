const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/authController');
const index_controller = require('../controllers/indexController');

// HOMEPAGE
// ------------------------------------------------------------
router.get('/', index_controller.index);
router.get('/home', index_controller.home);

// SIGNUP
// ------------------------------------------------------------
router.get('/sign-up', auth_controller.sign_up_get);
router.post('/sign-up', auth_controller.sign_up_post);

// LOGIN/LOGOUT
// ------------------------------------------------------------
router.get('/log-in', auth_controller.log_in_get);
router.post('/log-in', auth_controller.log_in_post);
router.get('/log-out', auth_controller.log_out_get);

module.exports = router;
