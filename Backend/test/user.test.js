const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../script'); // Replace with the path to your app/server file
const { expect } = chai;

chai.use(chaiHttp);

describe('Internet Banking System API Tests', () => {
    // Test: Create User
    it('should create a new user', (done) => {
        chai.request(app)
            .post('/users') // Adjust the route as per your API
            .send({
                username: 'Raj',
                email: 'rajendran@gmail.com',
                balance: 3000,
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('status', 'success');
                expect(res.body.data).to.include({
                    username: 'Raj',
                    email: 'rajendran@gmail.com',
                });
                expect(res.body.data).to.have.property('balance', 3000);
                done();
            });
    });

    // Test: Get User by ID
    it('should retrieve a user by ID', (done) => {
        const userId = 1; // Replace with an actual user ID from your database or mock data
        chai.request(app)
            .get(`/users/${userId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status', 'success');
                expect(res.body.data).to.have.property('userid', userId);
                expect(res.body.data).to.have.property('username');
                expect(res.body.data).to.have.property('email');
                expect(res.body.data).to.have.property('balance');
                done();
            });
    });

    // Test: Update User Balance
    it('should update the user balance', (done) => {
        const userId = 1; // Replace with an actual user ID
        const newBalance = 5000;

        chai.request(app)
            .put(`/users/${userId}/balance`) // Adjust the route as per your API
            .send({ balance: newBalance })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status', 'success');
                expect(res.body.data).to.have.property('userid', userId);
                expect(res.body.data).to.have.property('balance', newBalance);
                done();
            });
    });

    // Test: Handle User Not Found
    it('should return 404 if user is not found', (done) => {
        const nonExistentUserId = 9999;

        chai.request(app)
            .get(`/users/${nonExistentUserId}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('status', 'error');
                expect(res.body).to.have.property('error', 'User not found');
                done();
            });
    });
});
