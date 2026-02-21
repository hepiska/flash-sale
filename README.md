## Flash Sale

Full-stack flash sale app with a Node/Express + MongoDB backend and a React + Vite frontend.

### System Design

### Summary
Create a system to handle limited product sales where thousands of users attempt to buy the product at the same time, without overselling and while providing a good user experience.

To prevent overselling, I use atomic updates in the database. However, when the same document is hit by thousands of requests simultaneously, it increases database latency and the possibility of errors if the database does not have sufficient resources.

To address this, I use a queue. The queue uses the product ID as the key, so orders for the same product are processed on the same node.

To provide a good user experience, we perform all validations before submitting the order to the queue. This reduces the potential for messages to end up in the Dead Letter Queue (DLQ).

To manage user expectations, we first create the order with a pending status, then redirect the user to the order detail screen. From there, we poll the system to provide updates on the order status. In a real-world implementation, this could use MQTT or WebSocket for real-time updates.

### Technical decision
  1. Using **MongoDB** as the Database MongoDB has a dynamic schema and strong support for embedding, allowing us to store the ordered product snapshot directly in the order collection. This eliminates the need for table joins. It also supports atomic updates at the document level, ensuring data integrity.The drawback is that MongoDB does not strongly recommend heavy use of transactions. As a result, there is a possibility that the product quantity is reduced but the order fails to update its status. 
  2. Using **RabitMq** as queue system  for this case rabit MQ already quit suficience it can process order with same key and for this case i suing product id as the key. the cons of using rabitmq is when we have thausands product since each key comsume memories at this level we can consider using kafka
  3. **Validate** user request at front we validate is is user already create order for same product before, is the product still have stock, i validate this upfront to manage customer expetation and to reduce dlq. there is must be lag in quota number because of the que to handle this i create order with status pending before submiting to queue and updating the status to complete after product stock reduces on queue consumer.
  4. **Embeding** product info on order collection so dont need to fo aggreagate when quering order either list ot detail because this info must be visible to user when they see order, this also make sense since the the product info should be snapsoted per order when the order made. but need to add some process of we added payment layer when order made beacuse still posibility the product info change between order made and payment.


### Sequence deagram 
![Sequence Diagram](./readme_data/sequece_diagram.svg)




### Structure
- server: API, MongoDB models, migrations, tests
- client: React UI


### Prerequisites
- Node.js 18+
- MongoDB (for local dev)
- RabbitMQ (for order processing)

### Setup

### Suporting service 
ensure you have docker runing on your local than run 
``` docker compose up -d ```

#### Server
navigate to server folder  ```cd server``` than
1. Install dependencies:
	- npm install
2. Configure env (example):
	- PORT=4000
	- MONGO_URI=mongodb://localhost:27017/flash_sale
	- RABBITMQ_HOST=amqp://guest:guest@localhost:5672
  or you can just copy .env.example it already contain env needed base on the docker configuration
3. Run migrations/seeds:
	- npm run seed
4. Start server:
	- npm run dev

#### Client
1. Install dependencies:
	- npm install
2. Configure env (example):
	- VITE_API_URL=http://localhost:4000
3. Start client:
	- npm run dev


### Tests
From server folder:
- npm test
- npm test -- --coverage

### run stress test
1. make sure the server is running on port 4000
2. open the script on the ./perf-test/k6/test.js
3. adjust the var TEST_PRODUCT_SLUG the the product slug you want to test
4. on the root folder run ```docker compose run k6```

### Performance test analisys 
1. this performance test only focus on the submit order flow to make sure there is over sale product 
2. the number of request is 5000 in 5s time the expetation is 1000 request happen on same second
3. the product that i test for this is aurora-noise-cancelling-buds that has 60 stock.
4. after run the test the result show that 69 request show 201 response and after validate on the db 60 order with status complete and 9 with status canceled
5. around 15% get error 500  base on the mongo log see,ms the mongo cant handle due to minimun resource on local

![prev test result](./readme_data/perv_test.png)
![order mongo query](./readme_data/mongo_res_q.png)






### API Spec
OpenAPI spec: server/openapi.yaml
