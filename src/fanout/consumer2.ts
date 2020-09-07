import amqp from 'amqp-connection-manager';
import { ConfirmChannel} from 'amqplib';
import { json } from 'express';


const host = 'amqp://localhost';
const Exchange = "HuFanout";
const queueName = "queueMessage_3";
const typeofExchange = "fanout";

function checkQueue(channel: ConfirmChannel){
    return channel.assertQueue(queueName);
}

async function consumer2(){
    const connection = amqp.connect([host]);
    await connection.createChannel({
        json: true,
        setup: async (channel: ConfirmChannel) =>{
            checkQueue(channel);
            await channel.consume(queueName, msg =>{
                console.log(msg.content.toString());
                channel.ack(msg);
            })
        }
    });
}

consumer2();