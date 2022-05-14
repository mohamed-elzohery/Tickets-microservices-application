import app from './app';
import {connect} from 'mongoose';


(async () => {
    if(process.env.JWT_SECRET && process.env.MONGO_URI){
        try{
            await connect(process.env.MONGO_URI);
            app.listen(5000, () => console.log('Auth service is running on port 5000...'));
        }catch(err: any){
            throw new Error(`Error connection to database ${err.message}`);
        }
    }else{
        throw new Error('process.env does not have JWT_SECRET or MONGO_URI');
    }
})()