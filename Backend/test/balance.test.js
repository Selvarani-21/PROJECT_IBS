describe('Balance API Tests', () => {
    // Test: Get User Balance
    it('should retrieve the user balance', (done) => {
        const userId = 12; // Replace with an actual user ID
        chai.request(app)
            .get(`/users/${userId}/balance`) // Adjust the route as per your API
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status', 'success');
                expect(res.body.data).to.have.property('balance');
                done();
            });
    });
});
