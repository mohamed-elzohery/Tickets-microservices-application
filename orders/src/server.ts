import app from './app';
import {connect} from 'mongoose';
import natsClient from './nats-client';
import {randomBytes} from 'crypto';


(async () => {
    if(process.env.JWT_SECRET && process.env.MONGO_URI){
        try{
            await connect(process.env.MONGO_URI);
            await natsClient.connect('ticketing', randomBytes(4).toString('hex'), process.env.NATS_URL!);
            natsClient.client.on('close', () => {
                console.log('nats server is closed');
                process.exit()
            });

            process.on('SIGTERM', () => natsClient.client.close());
            // process.on('SIGKILL', () => natsClient.client.close());

            app.listen(5002, () => console.log('Orders service is running on port 5001...'));
        }catch(err: any){
            throw new Error(`Error connection to database ${err.message}`);
        }
    }else{
        throw new Error('process.env does not have JWT_SECRET or MONGO_URI');
    }
})()