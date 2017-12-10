# bb-service-message

Service messaging

# Installation

```
npm install @kapitchi/bb-service-message
```

# Usage

TODO

# API

## Classes

<dl>
<dt><a href="#MessageEmitterAmqp">MessageEmitterAmqp</a></dt>
<dd><p>AMQP message emitter</p>
<p>Implements <a href="#MessageEmitter">MessageEmitter</a> interface.</p>
</dd>
<dt><a href="#MessagePublisher">MessagePublisher</a></dt>
<dd><p>Message publisher</p>
</dd>
<dt><a href="#MessageSubscriberAmqp">MessageSubscriberAmqp</a></dt>
<dd><p>Message subscriber implementing AMQP (e.g. rabbitmq)</p>
</dd>
<dt><a href="#MessageSubscriber">MessageSubscriber</a></dt>
<dd><p>Message subscriber</p>
<p>Implements the <a href="#MessageEmitter">MessageEmitter</a> interface</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#MessageEmitter">MessageEmitter</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Message">Message</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="MessageEmitterAmqp"></a>

## MessageEmitterAmqp
AMQP message emitter

Implements [MessageEmitter](#MessageEmitter) interface.

**Kind**: global class  

* [MessageEmitterAmqp](#MessageEmitterAmqp)
    * [new MessageEmitterAmqp(messageEmitterAmqpOpts, amqpConnection)](#new_MessageEmitterAmqp_new)
    * [.asyncInit()](#MessageEmitterAmqp+asyncInit)
    * [.connect()](#MessageEmitterAmqp+connect)
    * [.next(msg)](#MessageEmitterAmqp+next)

<a name="new_MessageEmitterAmqp_new"></a>

### new MessageEmitterAmqp(messageEmitterAmqpOpts, amqpConnection)

| Param | Type |
| --- | --- |
| messageEmitterAmqpOpts | <code>Object</code> | 
| messageEmitterAmqpOpts.exchange | <code>String</code> | 
| amqpConnection | <code>Object</code> | 

<a name="MessageEmitterAmqp+asyncInit"></a>

### messageEmitterAmqp.asyncInit()
Calls [connect](#MessageEmitterAmqp+connect)

**Kind**: instance method of [<code>MessageEmitterAmqp</code>](#MessageEmitterAmqp)  
<a name="MessageEmitterAmqp+connect"></a>

### messageEmitterAmqp.connect()
Creates a channel and an exchange

**Kind**: instance method of [<code>MessageEmitterAmqp</code>](#MessageEmitterAmqp)  
<a name="MessageEmitterAmqp+next"></a>

### messageEmitterAmqp.next(msg)
Impl of interface [MessageEmitter](#MessageEmitter)

**Kind**: instance method of [<code>MessageEmitterAmqp</code>](#MessageEmitterAmqp)  

| Param | Type |
| --- | --- |
| msg | [<code>Message</code>](#Message) | 

<a name="MessagePublisher"></a>

## MessagePublisher
Message publisher

**Kind**: global class  

* [MessagePublisher](#MessagePublisher)
    * [new MessagePublisher(messagePublisherOpts, messageEmitter)](#new_MessagePublisher_new)
    * [.emit(msg)](#MessagePublisher+emit)

<a name="new_MessagePublisher_new"></a>

### new MessagePublisher(messagePublisherOpts, messageEmitter)

| Param | Type |
| --- | --- |
| messagePublisherOpts | <code>Object</code> | 
| messagePublisherOpts.service | <code>string</code> | 
| messageEmitter | [<code>MessageEmitter</code>](#MessageEmitter) | 

<a name="MessagePublisher+emit"></a>

### messagePublisher.emit(msg)
Emits the message

**Kind**: instance method of [<code>MessagePublisher</code>](#MessagePublisher)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| msg | <code>Object</code> |  |  |
| msg.type | <code>String</code> |  | Message type |
| msg.data | <code>Object</code> |  | The payload |
| [msg.ts] | <code>String</code> | <code>now</code> | ISO 8601 string |

<a name="MessageSubscriberAmqp"></a>

## MessageSubscriberAmqp
Message subscriber implementing AMQP (e.g. rabbitmq)

**Kind**: global class  

* [MessageSubscriberAmqp](#MessageSubscriberAmqp)
    * [new MessageSubscriberAmqp(messageSubscriberAmqpOpts, amqpConnection)](#new_MessageSubscriberAmqp_new)
    * [.asyncInit()](#MessageSubscriberAmqp+asyncInit)
    * [.connect()](#MessageSubscriberAmqp+connect)
    * [.consume()](#MessageSubscriberAmqp+consume)
    * [.purgeQueue()](#MessageSubscriberAmqp+purgeQueue)
    * [.deleteQueue()](#MessageSubscriberAmqp+deleteQueue)

<a name="new_MessageSubscriberAmqp_new"></a>

### new MessageSubscriberAmqp(messageSubscriberAmqpOpts, amqpConnection)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| messageSubscriberAmqpOpts | <code>Object</code> |  |  |
| messageSubscriberAmqpOpts.exchange | <code>String</code> |  |  |
| messageSubscriberAmqpOpts.queue | <code>String</code> |  |  |
| messageSubscriberAmqpOpts.topics | <code>Array</code> |  | Message types to subscribe in format `SERVICE.MSG_TYPE` e.g. `MyService.*` subscribes to all MyService messages |
| [messageSubscriberAmqpOpts.prefetch] | <code>Number</code> | <code>1</code> |  |
| amqpConnection | <code>Object</code> |  | [http://www.squaremobius.net/amqp.node/channel_api.html#connect](http://www.squaremobius.net/amqp.node/channel_api.html#connect) |

<a name="MessageSubscriberAmqp+asyncInit"></a>

### messageSubscriberAmqp.asyncInit()
Calls [connect](#MessageSubscriberAmqp+connect) and start consuming messages [consume](#MessageSubscriberAmqp+consume)

**Kind**: instance method of [<code>MessageSubscriberAmqp</code>](#MessageSubscriberAmqp)  
<a name="MessageSubscriberAmqp+connect"></a>

### messageSubscriberAmqp.connect()
Creates a channel, asserts an exchange, queue, and bind a queue to topics

**Kind**: instance method of [<code>MessageSubscriberAmqp</code>](#MessageSubscriberAmqp)  
<a name="MessageSubscriberAmqp+consume"></a>

### messageSubscriberAmqp.consume()
Start consuming a messages from the queue

**Kind**: instance method of [<code>MessageSubscriberAmqp</code>](#MessageSubscriberAmqp)  
<a name="MessageSubscriberAmqp+purgeQueue"></a>

### messageSubscriberAmqp.purgeQueue()
Purge queue

**Kind**: instance method of [<code>MessageSubscriberAmqp</code>](#MessageSubscriberAmqp)  
<a name="MessageSubscriberAmqp+deleteQueue"></a>

### messageSubscriberAmqp.deleteQueue()
Delete queue

**Kind**: instance method of [<code>MessageSubscriberAmqp</code>](#MessageSubscriberAmqp)  
<a name="MessageSubscriber"></a>

## MessageSubscriber
Message subscriber

Implements the [MessageEmitter](#MessageEmitter) interface

**Kind**: global class  

* [MessageSubscriber](#MessageSubscriber)
    * [new MessageSubscriber(messageSubscriberOpts)](#new_MessageSubscriber_new)
    * [.drop(msg)](#MessageSubscriber+drop)
    * [.ack(msg)](#MessageSubscriber+ack)
    * [.nack(msg)](#MessageSubscriber+nack)
    * [.next(msg)](#MessageSubscriber+next)
    * [.subscribe(subscriber)](#MessageSubscriber+subscribe) ⇒ <code>Rx.Subscription</code>

<a name="new_MessageSubscriber_new"></a>

### new MessageSubscriber(messageSubscriberOpts)

| Param | Type | Default |
| --- | --- | --- |
| messageSubscriberOpts | <code>Object</code> |  | 
| [messageSubscriberOpts.requireAck] | <code>boolean</code> | <code>true</code> | 
| [messageSubscriberOpts.bufferSize] | <code>Number</code> | <code>10</code> | 

<a name="MessageSubscriber+drop"></a>

### messageSubscriber.drop(msg)
Drops the message

**Kind**: instance method of [<code>MessageSubscriber</code>](#MessageSubscriber)  

| Param | Type |
| --- | --- |
| msg | [<code>Message</code>](#Message) | 

<a name="MessageSubscriber+ack"></a>

### messageSubscriber.ack(msg)
Ack the message

**Kind**: instance method of [<code>MessageSubscriber</code>](#MessageSubscriber)  

| Param | Type |
| --- | --- |
| msg | [<code>Message</code>](#Message) | 

<a name="MessageSubscriber+nack"></a>

### messageSubscriber.nack(msg)
Nack the message

**Kind**: instance method of [<code>MessageSubscriber</code>](#MessageSubscriber)  

| Param | Type |
| --- | --- |
| msg | [<code>Message</code>](#Message) | 

<a name="MessageSubscriber+next"></a>

### messageSubscriber.next(msg)
Receives the message

**Kind**: instance method of [<code>MessageSubscriber</code>](#MessageSubscriber)  

| Param | Type |
| --- | --- |
| msg | [<code>Message</code>](#Message) | 

<a name="MessageSubscriber+subscribe"></a>

### messageSubscriber.subscribe(subscriber) ⇒ <code>Rx.Subscription</code>
Subscribe to [http://reactivex.io/rxjs/](http://reactivex.io/rxjs/) message stream

**Kind**: instance method of [<code>MessageSubscriber</code>](#MessageSubscriber)  
**Returns**: <code>Rx.Subscription</code> - msg [http://reactivex.io/rxjs/class/es6/Subscription.js~Subscription.html](http://reactivex.io/rxjs/class/es6/Subscription.js~Subscription.html)  

| Param | Type | Description |
| --- | --- | --- |
| subscriber | <code>Rx.Subscriber</code> | [http://reactivex.io/rxjs/class/es6/Subscriber.js~Subscriber.html](http://reactivex.io/rxjs/class/es6/Subscriber.js~Subscriber.html) |

<a name="MessageEmitter"></a>

## MessageEmitter : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| next | <code>function</code> | Function which emits the message `function(message) {}` |

<a name="Message"></a>

## Message : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> |  |
| service | <code>string</code> |  |
| ts | <code>string</code> | ISO 8601 string |
| data | <code>Object</code> |  |


# Development

## Tests

```
npm test
```

Tests / examples currently require rabbitmq to be running on amqp://localhost
