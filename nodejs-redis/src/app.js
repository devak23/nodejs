"use strict";

var redis = require('redis');
//var events = require('event');

/*
// create an event which tells when the redis is ready
var RedisReadyEvent = new events.EventEmitter;

RedisReadyEvent.ready = function() {
  var self = this;

}
*/


// This creates a default redis_client that will assume that redis server is running on
// port 6379 and hosted at localhost
var redis_client = redis.createClient();

// put out a status on the console once you connect to redis
redis_client.on("connect", () => {
  console.info("Connected to redis server...");

  // ------------------- storing key value pairs ---------------------
  redis_client.set("client-framework", "ReactJS");
  redis_client.set("server-framework", "NodeJS");

  // put the values on the console.
  redis_client.get("server-framework", (err, reply) => {
    console.log("server-framework = ", reply);
  });

  redis_client.get("redis_client-framework", (err, reply) => {
    console.log("client-framework = ", reply);
  });

  // ---------------- how about storing some hashes (objects)  ---------------------------
  redis_client.hmset('frameworks', 'javascript', 'AngularJs', 'css', 'Bootstrap', 'node', 'express');
  redis_client.hgetall('frameworks', (err, reply) => {
    console.log("frameworks = ", reply);
  });

  // alternate way of storing the same thing would be as follows
  redis_client.hmset('languages', {
    'server-side': 'java, php, python',
    'client-side': 'javascript'
  });

  redis_client.hgetall('languages', (err, reply) => {
    console.log('languages = ', reply);
    // so this is an object and we can print the values
    console.log('server-side languages = ', reply['server-side']);
    console.log('client-side languages = ', reply['client-side']);
  });

  // ---------- storing list of values ----------------------
  redis_client.rpush(['frameworks2', 'ReactJS', 'AngularJS', 'Ember', 'Backbone','MythrilJs', 'Vue.Js'], (err, reply) => {
    // why is the key 'frameworks2' ?
    // because we defined frameworks earlier... (line #39)
    // so if we try to re-define the entry, redis gives us the error 'WRONGTYPE'
    // error storing the lists:  { [ReplyError: WRONGTYPE Operation against a key holding the wrong kind of value]
    if (err) {
      console.log("error storing the lists: ", err);
    } else {
      console.log('items stored = ', reply);
    }
  });

  // to retrieve elements use the lrange() function
  // pass the index 0,2 (from, to) to get the elements
  redis_client.lrange('frameworks2', 0, 2, (err, reply) => {
    console.log(reply);
  });
  // passing a -1 as the to-index will cause printing the entire list
  redis_client.lrange('frameworks2', 0, -1, (err, reply) => {
    console.log(reply);
  });

  // remove the frameworks2
  redis_client.del('frameworks2', (err, reply) => {
    console.log('deleted ', reply, ' items');
  });

  // the deletion is necessary for this example as the list grows as many times this program is run
  // the list will always allow duplicates.
  //
  // ------------- storing sets -------------------------------
  redis_client.sadd(['Tags', 'angluarjs', 'reactjs', 'backbonejs', 'emberjs', 'vuejs', 'mythriljs', 'vuejs', 'reactjs'], (err, reply) => {
    console.log('stored', reply, 'items as set');
  });

  redis_client.smembers('Tags', (err, reply) => {
    console.log('tags ==> ', reply);
  });

  // ---------------- integer manipluation ------------------------
  redis_client.set('visitor_count', 1, () => {
    redis_client.incr('visitor_count', (err, reply) => {
      console.log('incrementing visitor_count by 1 = ', reply);
    });

    redis_client.incrby('visitor_count', 10, (err, reply) => {
      console.log('incrementing visitor_count by 10 = ',reply)
    });
    
    redis_client.decr('visitor_count', (err, reply) => {
      console.log('decrementing visitor_count by 1 = ', reply);
    });


    redis_client.decrby('visitor_count', 5, (err, reply) => {
      console.log('decrementing visitor_count by 5 = ',reply)
    });
  });

  // ------------- checking for a value ----------------------
  redis_client.exists('key1', (err, reply) => {
    reply === 1? console.log("exists") : console.log("doesn't exist");
  });
});

// With many thanks to: https://www.sitepoint.com/using-redis-node-js/
