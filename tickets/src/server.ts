import app from './app';
import {connect} from 'mongoose';


(async () => {
    if(process.env.JWT_SECRET && process.env.MONGO_URI){
        try{
            await connect(process.env.MONGO_URI);
            app.listen(5001, () => console.log('Tickets service is running on port 5001...'));
        }catch(err: any){
            throw new Error(`Error connection to database ${err.message}`);
        }
    }else{
        throw new Error('process.env does not have JWT_SECRET or MONGO_URI');
    }
})()