'use strict';
module.exports = function(app) {
  var section = require('../controllers/sectionController');

  // questionSet Routes
  app.route('/sections')
    .get(section.list_all_sections)
    .post(section.create_a_section);

   app.route('/sections/:sectionId')
    .get(section.read_a_section)
    .delete(section.delete_a_section);
};
