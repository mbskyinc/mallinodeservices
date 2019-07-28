'use strict';
module.exports = function(app) {
  var practice = require('../controllers/practiceController');

  // practice Routes
  app.route('/sections/:sectionId/practices')
    .get(practice.list_all_practices)
    .post(practice.create_a_practice);
 

  app.route('/sections/:sectionId/practices/:practiceId')
    .get(practice.read_a_practice)
    .put(practice.update_a_practice)
    .delete(practice.delete_a_practice);
};
