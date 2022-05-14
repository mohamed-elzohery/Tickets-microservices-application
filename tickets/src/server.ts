import app from './app';
import {connect} from 'mongoose';


(async () => {
    if(process.env.JWT_SECRET){
        try{
            await connect('mongodb://auth-mongo-srv:27017/users');
            app.listen(5000, () => console.log('Auth service is running on port 5000...'));
        }catch(err: any){
            throw new Error(`Error connection to database ${err.message}`);
        }
    }else{
        throw new Error('process.env does not have JWT_SECRET');
    }
})()