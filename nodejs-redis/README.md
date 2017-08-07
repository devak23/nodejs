<h3>Installation and configuration</h3>
<hr/>
- First install the library to connect to redis
<pre>
  npm install redis
</pre>
- Installing redis on ubuntu/mint is as easy as
<pre>
  sudo apt-get update
  sudo apt-get install redis
</pre>
- Run redis server and redis client by executing the commands
<pre>
  redis-server
  redis-cli
</pre>
- Test if the client can connect to server using
<pre>
  redis 127.0.0.1:6379> ping
</pre>
and you should get a "PONG" as response.

<h4>Redis commands for different data types</h4>
<hr>
1. String/Integer:
<pre>
client.set("key", value, (err,data) => {})
client.get("key", (err, data) => {})
</pre>
2. Hashes:
<pre>
client.hmset("key", json, (err, data) => {})
client.hgetall("key", (err, data) => {})
</pre>
3. Lists:
<pre>
client.lpush(["val1", "val2",...], (err, data) => {})
client.rpush(["val1", "val2",...], (err, data) => {})
client.lrange("key", fromInt, toInt, (err, data) => {})
</pre>
4. Sets:
<pre>
client.sadd(["val1","val2","val1","val2","val3",...], (err, data) => {})
client.smembers("key", (err, data) => {})
</pre>
5. Integer operations:
<pre>
client.set("key", 1, () => {
	client.incr("key", (err, data) => {})
    client.incrby("key", 10, (err, data) => {})
    client.decr("key", (err, data) => {})
    client.decrby("key",10, (err, data) => {})
})
</pre>