import { Connection, } from 'rabbitmq-client'
import { config } from '../config/env';



const rabbit = new Connection(config.rabbitmqUri || 'amqp://guest:guest@localhost:5672')


export default rabbit;
