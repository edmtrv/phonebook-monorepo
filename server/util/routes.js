const Router = require('express');
const contacts = require('@controllers/contactsController');

const router = Router();

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  const testing = require('@controllers/testingController');
  router.post('/testing/reset', testing.reset);
}

router.get('/contacts', contacts.getAll);
router.post('/contacts', contacts.create);
router.get('/contacts/:id', contacts.getOne);
router.delete('/contacts/:id', contacts.deleteOne);
router.put('/contacts/:id', contacts.update);
router.get('/contacts/info', contacts.info);

module.exports = router;
