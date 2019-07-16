var assert = require('assert');

//let user = require('../api/models');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
module.exports = server
const url = "http://localhost:3001";
const expect = chai.expect;
 var user = {username: 'm1'};
chai.use(chaiHttp);

  describe('/GET user', () => {
      it('it should GET all the users', (done) => {
        chai.request(url)
            .get('/users/5d2a89e4a41d274990dd6f22')
            .end((err, res) => {
                  res.should.have.status(200);
                  assert.equal(res.body.username, 'm1', 'username should be m1');
             done();
            });
      });
  });

  describe('/POST authenticate user', () => {
    it('it should authenticate the users', (done) => {
      chai.request(url)
          .post('/users/authenticate')
          .send({username: 'm1', password: 'pwd1'})
          .end((err, res) => {
                res.should.have.status(200);
                //assert.equal(res.body.username, 'm1', 'username should be m1');
           done();
          });
    });
});


