import amqp from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';

const queuename = "Ledo";
const ExchangeName = "MonExtange";

function checkExchange(channel: ConfirmChannel){
    return channel.assertExchange( ExchangeName ,'direct');
}

function checkQueue(channel: ConfirmChannel){
    return channel.assertQueue(queuename);
}

function bind(channel: ConfirmChannel){
     return channel.bindQueue(queuename, ExchangeName,'');
}

async function direct(){
        const connection = amqp.connect(['amqp://localhost']);
      
        const message = {contentmessage: "Mktoon"};
         const channelWrapper  = await connection.createChannel( {
             json:true,
            setup:async (channel: ConfirmChannel) =>{
                await checkExchange(channel);
                await checkQueue(channel);
                await bind(channel)
            }
        });

        console.log("Before sending");
        await channelWrapper.sendToQueue(queuename, message);
        console.log("After sending");


}
console.log("start");
direct();