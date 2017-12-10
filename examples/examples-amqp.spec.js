const {MessagePublisher, MessageEmitterAmqp, MessageSubscriberAmqp,
  AmqpConnectionAsyncFactory} = require('../src/index');

describe('Examples: amqp', () => {
  before(async function() {
    const logger = {
      log(msg) {
        console.log(msg);//XXX
      }
    };

    const opts = {
      exchange: 'test',
    };

    this.amqpConnection = await AmqpConnectionAsyncFactory({
      url: 'amqp://localhost'
    });

    this.emitter = new MessageEmitterAmqp({
      exchange: opts.exchange
    }, this.amqpConnection);
    //this.emitter.setLogger(logger);
    await this.emitter.asyncInit();

    this.publisher = new MessagePublisher({
      service: 'MyService'
    }, this.emitter);

    this.publisher2 = new MessagePublisher({
      service: 'OtherService'
    }, this.emitter);

    //this.publisher.setLogger(logger);

    this.subscriber = new MessageSubscriberAmqp({
      exchange: opts.exchange,
      queue: 'test-subscriber',
      topics: ['MyService.*', 'OtherService.*']
    }, this.amqpConnection);
    //this.subscriber1.setLogger(logger);
    await this.subscriber.asyncInit();

    this.subscriber2 = new MessageSubscriberAmqp({
      exchange: opts.exchange,
      queue: 'test-subscriber2',
      topics: ['MyService.*']
    }, this.amqpConnection);
    //this.subscriber2.setLogger(logger);
    await this.subscriber2.asyncInit();
  });

  after(async function() {
    await this.subscriber.deleteQueue();
    await this.subscriber2.deleteQueue();
  });

  before(function() {
    this.publisher.emit({
      type: 'test',
      data: {
        val: '111'
      }
    });

    this.publisher.emit({
      type: 'test',
      data: {
        val: '222'
      }
    });

    this.publisher2.emit({
      type: 'test',
      data: {
        val: '333'
      }
    });
  });

  describe('.subscribe', () => {

    function createSubscriber(subscriber, limit, done) {
      let count = 0;
      return (ret) => {
        console.log('Msg received: ', ret); //XXX
        subscriber.ack(ret);
        if (++count >= limit) {
          done();
        }
      };
    }

    it('subscriber receives all msg', function (done) {
      const sub = this.subscriber.subscribe(createSubscriber(this.subscriber, 3, () => {
        sub.unsubscribe();
        done();
      }));
    });

    it('subscriber2 receives all msg', function (done) {
      const sub = this.subscriber2.subscribe(createSubscriber(this.subscriber2, 2, () => {
        sub.unsubscribe();
        done();
      }));
    });
  });
});
