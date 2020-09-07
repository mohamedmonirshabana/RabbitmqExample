import amqp from 'amqp-connection-manager';
import { ConfirmChannel, ConsumeMessage } from 'amqplib';

 function checkQueue(channel: ConfirmChannel){
    return channel.assertQueue('Ledo');
 }



async function consume(){
    try{
        const connection = amqp.connect(['amqp://localhost']);
    // const exchangeName = "MonExtange";
    const quequeName = "Ledo";
    await connection.createChannel({
        setup:async (channel:ConfirmChannel) =>{
            console.log("Start Consum");
              await checkQueue(channel) ;
              channel.consume(quequeName, (msg: ConsumeMessage) => {
                 console.log("New message received", Buffer.from(msg.content).toString());
                 channel.ack(msg);
              });
        }
    });
    } catch(err){console.error(err);}
    
}
console.log("Start");
consume();