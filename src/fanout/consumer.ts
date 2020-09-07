import amqp from 'amqp-connection-manager';
import { ConfirmChannel, ConsumeMessage } from 'amqplib';
import { json } from 'express';


const host = 'amqp://localhost';
const Exchange = "HuFanout";
const queueName = "queueMessage_2";
const typeofExchange = "fanout";

function checkQuee(channel : ConfirmChannel){
    return  channel.assertQueue(queueName);
}

async function consumer(){
    const connection = amqp.connect([host]);
    await connection.createChannel({
        json: true,
        setup:async (channel: ConfirmChannel) =>{
            await checkQuee(channel);
            channel.consume(queueName,msg =>{
                console.log( msg.content.toString());
                channel.ack(msg);
            });
        }
    });
}

consumer();