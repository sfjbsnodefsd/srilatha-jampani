console.log("consumer...");
import Kafka from "node-rdkafka";

const consumer = Kafka.KafkaConsumer({
    'group.id':"Kafka",
    "metadata.broker.list": "localhost:9092"
},{});


consumer.connect();

consumer.on("ready", () => {
    console.log('consumer ready...');
    consumer.subscribe(['test']);
    consumer.consume();
}).on('data', (data) => {
    console.log(`recived message : ${data.value}`);
}
)
