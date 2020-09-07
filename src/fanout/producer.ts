import amqp from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';


const host = 'amqp://localhost';
const Exchange = "HuFanout";
const queueName_1 = "queueMessage_1";
const queueName_2 = "queueMessage_2";
const queueName_3 = "queueMessage_3";
const typeofExchange = "fanout";

function checkExchange(channel : ConfirmChannel){
    return channel.assertExchange(Exchange,typeofExchange);
}

// function checkQueue(channel : ConfirmChannel){
//     return channel.assertQueue(queueName);
// }

// function bind(channel: ConfirmChannel){
//     //return channel.bindQueue(queueName,Exchange,'');
// }

async function producer(){
    const connection = amqp.connect([host]);
    const msg_1 = {username:"Medo Ali"};
    const msg_2 = {username:"Saber Engle"};
    const msg_3 = {username:"Keto kareem"};

     const connectqueue = connection.createChannel({
        json: true,
        setup: async (channel: ConfirmChannel) =>{
            channel.assertQueue(queueName_1);
            channel.assertQueue(queueName_2);
            channel.assertQueue(queueName_3);

            checkExchange(channel);
            //checkQueue(channel);
            //bind(channel);

            channel.bindQueue(queueName_1,Exchange,'');
            channel.bindQueue(queueName_2,Exchange,'');
            channel.bindQueue(queueName_3,Exchange,'');
            

        }
        
    });

    await connectqueue.sendToQueue(queueName_1,msg_1);
    await connectqueue.sendToQueue(queueName_2,msg_2);
    await connectqueue.sendToQueue(queueName_3,msg_3);
    
}

producer();
