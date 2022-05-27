import nats, {Stan} from 'node-nats-streaming';

class NatsClient {
    private _client?: Stan;

    get client(){
        if(this._client){
            return this._client;
        }
        throw new Error('cannot get client before connection');
    }

    connect(clusterId: string, clientId: string, url: string): Promise<void>{
        this._client = nats.connect(clusterId, clientId, {url});

        return new Promise((resolve, reject) => {
            this.client.on('connect',() => {
                console.log('client connected to nats server');
                resolve();
            });

            this.client.on('error',() => {
                console.log('client failed to connect to nats server');
                reject();
            });
        })
    }
}

const natsClient = new NatsClient();
export default natsClient;