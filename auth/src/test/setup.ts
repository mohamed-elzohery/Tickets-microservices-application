import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app';

let mongo: any;

beforeAll(async () => {
    jest.resetModules();
    process.env.JWT_SECRET = 'm.zohery1998@gmail.com';
    process.env.JWT_EXPIRE = '2d';
    try{
        const mongo = await MongoMemoryServer.create();
        const mongoURI = mongo.getUri();
        await mongoose.connect(mongoURI);
    }catch(err: any){
        console.log(err)
    }
});

beforeEach(async () => {
    try{
        const collections =  await mongoose.connection.db.collections();
        for(let collection of collections){
            await collection.deleteMany({});
        }

    }catch(err: any){
        console.log(err)
    }
})

afterAll(async () => {
    try{
        await mongoose.connection.close();
    }catch(err: any){
        console.log(err)
    }
})