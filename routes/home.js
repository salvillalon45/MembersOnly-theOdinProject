const express = require('express');
const router = express.Router();

// Require controller modules
// const item_controller = require('../controllers/itemController');
const auth_controller = require('../controllers/authController');
const landing_controller = require('../controllers/landingController');

// LANDING ROUTES
// -------------------------------------------
// GET home page
router.get('/', landing_controller.index);

// AUTH ROUTES
// -------------------------------------------
// GET request for creating an item.
// NOTE This must come before routes that display Item(uses id).
router.get('/sign-up', auth_controller.sign_up_get);

router.post('/sign-up', auth_controller.sign_up_post);

router.get('/log-in', auth_controller.log_in_get);
router.post('/log-in', auth_controller.log_in_post);

router.get('/log-out', auth_controller.log_out_get);

// POST request for creating Item.
// router.post('/item/create', item_controller.item_create_post);

// // GET request to delete Item.
// router.get('/item/:id/delete', item_controller.item_delete_get);

// // POST request to delete Item.
// router.post('/item/:id/delete', item_controller.item_delete_post);

// // GET request to update Item.
// router.get('/item/:id/update', item_controller.item_update_get);

// // POST request to update Item.
// router.post('/item/:id/update', item_controller.item_update_post);

// // GET request for one Item.
// router.get('/item/:id', item_controller.item_detail);

// // GET request for list of all Book items.
// // router.get('/books', book_controller.book_list);

// // CATEGORY ROUTES
// // -------------------------------------------
// // GET request for creating Category. NOTE This must come before route for id (i.e. display category).
// router.get('/category/create', category_controller.category_create_get);

// // POST request for creating Category.
// router.post('/category/create', category_controller.category_create_post);

// // GET request to delete Category.
// router.get('/category/:id/delete', category_controller.category_delete_get);

// // POST request to delete Category.
// router.post('/category/:id/delete', category_controller.category_delete_post);

// // GET request to update Category.
// router.get('/category/:id/update', category_controller.category_update_get);

// // POST request to update Category.
// router.post('/category/:id/update', category_controller.category_update_post);

// // GET request for one Category.
// router.get('/category/:id', category_controller.category_detail);

// // GET request for list of all Category.
// router.get('/category', category_controller.category_list);

module.exports = router;
