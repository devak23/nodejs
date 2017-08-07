<h3>Installation and configuration</h3>
- First install the library to connect to redis
<pre>
  npm install redis
</pre>
- Installing redis on ubuntu/mint is as easy as
<pre>
  sudo apt-get update
  sudo apt-get install redis
</pre>
- Run redis by executing the command
<pre>
  redis-server
</pre>
- Run the redis client using the command
<pre>
  redis-cli
</pre>
- Test if the client can connect to server using
<pre>
  redis 127.0.0.1:6379> ping
</pre>
and you should get a "PONG" as response.

