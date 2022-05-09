import request  from "supertest";
import app from "../../app";

it('returns 201 on successful signup', () => {
    return request(app)
            .post('/api/users/register')
            .send({
                email: 'test@test.com',
                username: "melzohery",
                password: 'passw@rd'
            })
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .expect(201)
            .end((err, res) => {console.log(res.body)});
})