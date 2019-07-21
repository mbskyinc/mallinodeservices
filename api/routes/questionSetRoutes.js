'use strict';
module.exports = function(app) {
  var qSet = require('../controllers/questionSetController');

  // questionSet Routes
  app.route('/sections/:sectionId/questionSets')
    .get(qSet.list_all_questionSets)
    .post(qSet.create_a_questionSets);
 

  app.route('/sections/:sectionId/questionSets/:questionSetId')
    .get(qSet.read_a_questionSet)
    .put(qSet.update_a_questionSet)
    .delete(qSet.delete_a_questionSet);
};
