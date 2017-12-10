  <url:file:///~/Dropbox (Personal)/mynotes/content/books/js/js/books_js.md>

# Books Js

  egghead_nodejs
    01-egghead-node-js-using-the-node-js-repl-shell.mp4
      node
      > prompt
      _: last value
      .save sample.js
      .exit ^d
      .load sample.js
      .help
    02-egghead-node-js-understanding-callbacks-in-node-js.mp4
    03-egghead-node-js-the-node-js-process-object.mp4
      repl
        global.process
        global.process.version
        global.process.versions
          deps in node
        process.cwd()
        process.stdout.write("..")
        console.log(..)
      arguments.js
        process.argv.forEach(function(val, index){
          console.log(index + ': ' +val)
      run
        node arguments.js 1 4
      tick.js
        console.log(..)
        process.nextTick(function() {
          console.log('next')
      run
        node tick.js
      same as
        setTimeout(function(){}, 0)
          but it is in event loop
    04-egghead-node-js-node-js-global-namespace.mp4
      glov.js
        var glob 
        exports.setFoo = val => glob = val
      repl
        var modFoo = require('./glov')
        modFoo.setFoo(3)
    05-egghead-node-js-node-js-buffers.mp4
      repl
        fs.readFile('zork.txt', function(err, data) { console.log(data) })
        > <buffer 13 23 ...>
      convert to string
        console.log(data)
        -->
        console.log(data.toString())
      or read with utf8
        fs.readFile('zork.txt', 'utf8' function(err, data) { console.log(data) })
        # no toString() needed
    06-egghead-node-js-introduction-to-modules.mp4
      repl
        var circle = require('./circle.js')
          local file
        var http = require('http')
          global module
        var exp = require('express')
          local module in node_modules/
    07-egghead-node-js-exporting-modules-in-node.mp4
      circle.js
        area.exports = function(r)..
        ===
        module.exports = function(r) {
          return {
            area: function(..)
          }
      usage different
        var circle = require('./circle.js')
        opt1:
          circle.area(4)
        opt2
          m = circle(4)
          m.area()
    08-egghead-node-js-finding-and-installing-packages-in-your-node-application-using-npm.mp4
      npm install x
      --save
      --save-dev
      specify repo in package.json
        winston: github.com/winston
    09-egghead-node-js-using-the-node-js-net-module-to-create-a-tcp-server.mp4
      net = require('net')
      server = net.createServer(function(cb) {
        console.log('client connected')
        c.on('data', function(d){
          console.log('data recieved:' + d.toString())
        }
        c.on('end', ..)
      server.listen(3000, cb2)
      /Users/mertnuhoglu/Dropbox/public/img/ss-163.png
    10-egghead-node-js-creating-a-node-js-module.mp4
      mkdir sayhello
      cd sayhello
      npm init
      vim index.js
        module.exports = {
          sayIt: ..
      mkdir ../testx
      cd testx
      npm install ../sayhello
      node
        sayh = require('sayhello')
        sayh.sayIt()
    11-egghead-node-js-using-the-node-js-http-server.mp4
      http = require('http')
      server = http.createServer(function(req, rep) {
        rep.end("hello")
      })
      server.listen(3000)
      if (request.url === '/') {
        response.writeHead(meta)
        response.end(content)
      request.method === 'GET'
    12-egghead-node-js-publishing-a-module-to-the-npm-registry.mp4
      npm adduser
      npm publish
      npm install packagename
      # update code
      npm version patch
        major, minor
      npm publish
      npm unpublish packagename
    13-egghead-node-js-using-eventemitters-in-node-js.mp4
  Pragmatic.Node.js.the.Right.Way.1937785734.pdf id=g_10121
    Pragmatic.Node.js.the.Right.Way.1937785734.pdf <url:file:///~/Dropbox/mynotes/content/articles/articles_js.md#r=g_10121>
    ref
      http://media.pragprog.com/titles/jwnode/content/code/jwnode-code.zip
      /Users/mertnuhoglu/codes/js/pragmatic_nodejs
    Preface
      why nodejs
        asynchronous
        js: biggest vm
      ch01: getting started
        event loop
          parallel and single-threaded
      ch02: wrangling the file system
      ch03: networking with sockets
      ch04: robust messaging services
      ch05: accessing databases
      ch06: scalable web services
      ch07: web apps
        redis, rest apis, bower
    ch01: getting started
      pre
        i/o bound programs
          adding ram,cpu doesn't differ much
          ex
            client side web apps
            web servers
            databases
          they wait for things
            user input
            database result
            web service
            connection requests
      how node apps work
        node: js + event loop
          evnet loop: for quickly dispatching ops when events occur
          gives low level access
    ch02: wrangling the file system
      watching files for changes
        code
          <url:file:///~/codes/js/pragmatic_nodejs/file-system/watcher.js>
          const fs = require('fs');
          fs.watch('target.txt', function() {
            console.log("File 'target.txt' just changed!");
          });
          console.log("Now watching target.txt for changes...");
        const fs = require('fs');
          module implementation: based on CommonJS
        fs.watch('target.txt', function() {
          polls target file
      visualizing the event loop
      reading command line arguments
        <url:file:///~/codes/js/pragmatic_nodejs/file-system/watcher-argv.js>
        filename = process.argv[2];
        if (!filename) {
          throw Error(..)
      spawning a child process
        code
          <url:file:///~/codes/js/pragmatic_nodejs/file-system/watcher-spawn.js>
          spawn = require('child_process').spawn,
          let ls = spawn('ls', ['-lh', filename]);
          ls.stdout.pipe(process.stdout);
        spawn returns ChildProcess
        stdout is a Stream
      capturing data from EventEmitter
        code
          <url:file:///~/codes/js/pragmatic_nodejs/file-system/watcher-spawn-parse.js>
            output = '';
          ls.stdout.on('data', function(chunk){
            output += chunk.toString();
          });
          ls.on('close', function(){
            let parts = output.split(/\s+/);
            console.dir([parts[0], parts[4], parts[8]]);
          });
        chunk?
          parameter to callback
          data events pass a buffer object
          buffer: a blob of memory
            outside js engine
            can't be resized
            toString() converts to js string with utf-8
        ls.on('close', function(){
          after a child process exits
          it emits a close event
      Reading and writing files asynchronously
        <url:file:///~/codes/js/pragmatic_nodejs/file-system/read-simple.js>
        fs.writeFile('target.txt', 'a witty message', function (err) {
        fs.readFile('target.txt', function (err, data) {
      Creating Read and Write Streams
        ex: cat.js
          <url:file:///~/codes/js/pragmatic_nodejs/file-system/cat.js>
          #!/usr/bin/env node --harmony
          require('fs').createReadStream(process.argv[2]).pipe(process.stdout);
      Blocking event loop with synchronous file access
      Performing other file system operations
        posix conventions
          copy()
          unlink()
          mkdir()
      Two phases of a Node program
      Wrapping up
      Fortifying code
    ch03: networking with sockets
      pre
        low-level sockets
          tcp: backbone of apps
      listening for socket connections
      binding a server to a tcp port
        tcp: two endpoints
          one endpoint: binds to numbered port
          one endpoint: connects to a port
        code
          net = require('net'),
          server = net.createServer(function(connection) { ..})
          server.listen(5432)
        net.createServer
          returns: Server
          takes: callback
            called when another endpoint connects
      writing data to a socket
        code
          <url:file:///~/codes/js/pragmatic_nodejs/networking/net-watcher.js>
      connecting to tcp with telnet
        telnet localhost 5432
      unix sockets
        code
          server.listen(5432, function() {
          -->
          server.listen('/tmp/watcher.sock', function() {
        client
          nc -U /tmp/watcher.sock
      implementing a messaging protocol
        protocol
          set of rules
            defines how endpoints communicate
        serializing messages with json
          each message is a json
          code
            <url:file:///~/codes/js/pragmatic_nodejs/networking/net-watcher-json-service.js>
            connection.write("Now watching '" + filename + "' for changes...\n");
            -->
            connection.write(JSON.stringify({
              type: 'watching',
              file: filename
            }) + '\n');
        creating socket client connections
          code
            <url:file:///~/codes/js/pragmatic_nodejs/networking/net-watcher-json-client.js>
            client = net.connect({port: 5432});
            client.on('data', function(data) {
              let message = JSON.parse(data);
              if (message.type === 'watching') {
                console.log("Now watching: " + message.file);
              } else if (message.type === 'changed') {
          compare server and client
            server
              server = net.createServer(function(connection) {
                let watcher = fs.watch(filename, function() {
                  connection.write(JSON.stringify({
              server.listen(5432, function() {
              $ telnet localhost 5432
            client
              client = net.connect({port: 5432});
              client.on('data', function(data) {
                let message = JSON.parse(data);
                if (message.type === 'watching') {
              $ node net-watcher-json-client.js
            event
              touch target.txt
              --> fs.watch event -> server connection.write on 5432 -> net event 'data' -> client.on 'data'
            why server.listen(5432)
              telnet localhost 5432 -> server callback -> setups fs.watch()
      testing network app functionality
        understanding message-boundary problem
          messages arrive in pieces
            split into distinct data events
          boundary between two messages
          what if message is split down the middle
        extending core classes in custom modules
          two jobs for client:
            buffer incoming data into messages
            handle each message
          extending EventEmitter
    ch04: robust messaging services
      benefits of 0mq
        do one thing well
          automatically reconnect
          delivers only whole messages
          low overhead
      install
        node -p -e 'require("zmq")'
          -e  evaluate
          -p  print
      message publishing and subscribing
        publishing messages over tcp
          code
            <url:file:///~/codes/js/pragmatic_nodejs/messaging/zmq-watcher-pub.js>
            fs = require('fs'),
            zmq = require('zmq'),
            publisher = zmq.socket('pub'),
            filename = process.argv[2];
            fs.watch(filename, function(){
              publisher.send(JSON.stringify({
                type: 'changed',
                file: filename,
                timestamp: Date.now()
              }));
            });
            publisher.bind('tcp://*:5432', function(err) {
              console.log('Listening for zmq subscribers...');
            });
          changes
            net --> zmq
              zmq.socket('pub')
            server.listen(5432) -->
              publisher.bind('tcp://*:5432', function(err) {
        subscribing
          code
            <url:file:///~/codes/js/pragmatic_nodejs/messaging/zmq-watcher-sub.js>
            subscriber = zmq.socket('sub');
            subscriber.subscribe("");
            subscriber.on("message", function(data) {
              let
                message = JSON.parse(data),
                date = new Date(message.timestamp);
              console.log("File '" + message.file + "' changed at " + date);
            });
            subscriber.connect("tcp://localhost:5432");
          subscriber 
            inherits from EventEmitter
            emits a message when it receives one from a publisher
            recieves: subscribe.connect(..)
          event flow
            touch target.txt ->
            fs.watch -> publisher.send 5432 -> subscriber.on message
      responding to requests
        automatically reconnecting endpoints
          kill server and restart it
            client doesn't give error
            it continues as normal
          zmq.socket()
            client
              subscriber = zmq.socket('sub');
              subscriber.connect("tcp://localhost:5432");
            server
              publisher = zmq.socket('pub'),
              publisher.bind('tcp://*:5432', function(err) {
        implementing a responder
          code
            <url:file:///~/codes/js/pragmatic_nodejs/messaging/zmq-filer-rep.js>
        issuing requests
          code
            <url:file:///~/codes/js/pragmatic_nodejs/messaging/zmq-filer-req.js>
          together
            res
              responder = zmq.socket('rep');
              responder.on('message', function(data) {
                let request = JSON.parse(data);
                fs.readFile(request.path, function(err, content) {
                  responder.send(JSON.stringify({
                    content: content.toString(),
                  }));
                });
              });
              responder.bind('tcp://127.0.0.1:5433', function(err) {
            req
              requester = zmq.socket('req');
              requester.on("message", function(data) {
                let response = JSON.parse(data);
                console.log("Received response:", response);
              });
              requester.connect("tcp://localhost:5433");
            making a request
              requester.send(JSON.stringify({ path: filename }));
        comparison to pub/sub
          pub/sub
            pub
              publisher = zmq.socket('pub'),
              fs.watch(filename, function(){
                publisher.send(JSON.stringify({
            sub
              subscriber = zmq.socket('sub');
              subscriber.subscribe("");
              subscriber.on("message", function(data) {
          rep/req
            rep
              responder = zmq.socket('rep');
              responder.on('message', function(data) {
                fs.readFile(request.path, function(err, content) {
                  responder.send(JSON.stringify({
            req
              requester = zmq.socket('req');
              requester.on("message", function(data) {
      routing and dealing messages
        for more parallel message processing:
          router and dealer
          routing messages
            router socket = parallel rep socket
              handles many requests simultaneously
        clustering node processes
          multitple node processes
            cluster module
        forking worker processes
          spawn: executing non-node processes
          fork: execute node process
            cluster = require('cluster'),
            if (cluster.isMaster) {
              for (let i = 0; i < 3; i++) {
                cluster.fork();
          worker process vs master process
          events: 
            new worker
              cluster.on('online', function(worker) {..}
            process exiting
              cluster.on('exit', function(worker) {..}
        building a cluster
          /Users/mertnuhoglu/Dropbox/public/img/ss-161.png
          code - rep cluster
            <url:file:///~/codes/js/pragmatic_nodejs/messaging/zmq-filer-rep-cluster.js>
            dealer = zmq.socket('dealer').bind('ipc://filer-dealer.ipc'); 
            // worker process - create REP socket, connect to DEALER
            let responder = zmq.socket('rep').connect('ipc://filer-dealer.ipc');
            responder.on('message', function(data) {
          ipc: interprocess connection endpoint
            like unix socket
          code - req loop
            <url:file:///~/codes/js/pragmatic_nodejs/messaging/zmq-filer-req-loop.js>
            requester = zmq.socket('req');
            requester.on("message", function(data) {
              let response = JSON.parse(data);
              console.log("Received response:", response);
            });
            requester.connect("tcp://localhost:5433");
            for (let i=1; i<=3; i++) {
              requester.send(JSON.stringify({
                path: filename
              }));
            }
      Pushing and Pulling Messages
        upto now: message passing patterns
          publish/subscribe
          request/reply
        next pattern:
          push/pull
        Pushing jobs to workers
          pub/sub: each subscriber receives all messages
          push/pull: only one puller receives each message
          dealer/router: 
            similar to push/pull  
            but there is backchannel
              message from push to pull socket: one way
              puller can't send message back
          code
            <url:file:///~/codes/js/pragmatic_nodejs/messaging/zmq-push-cluster.js>
            pusher = zmq.socket('push').bind('ipc://filer-pusher.ipc'),
            puller = zmq.socket('pull').bind('ipc://filer-puller.ipc'),
            puller.on('message', function(data) {..}
        first joiner problem
          zmq is so fast than node cannot catch up
          to fix
            pusher needs to wait until all pullers are ready
          /Users/mertnuhoglu/Dropbox/public/img/ss-162.png
        limited resource problem
          os: number of resources node can access at the same time
            in unix: file descriptors
            each new file/tcp opening
              uses one file descriptor
          extremely common
        wrapping up
    ch05: accessing databases
      advantages of couchdb
        rest api
        speaks js
      creating a package
        new directory: databases/
        databases/package.json
          describes project and its dependencies
          create by: npm init
          install new module and update package json:
            npm install --save request
          install all deps in package.json:
            npm install
      making restful requests
        rest
          each url = a resource
          urls are things
            in contrast: urls are actions
              url -> invokes a script
        code
          <url:file:///~/codes/js/pragmatic_nodejs/databases/dbcli.js>
          const
            request = require('request'),
            options = {
              method: process.argv[2] || 'GET',
              url: 'http://localhost:5984/' + (process.argv[3] || '')
            };
          request(options, function(err, res, body) {
            if (err) {
              throw Error(err);
            } else {
              console.log(res.statusCode, JSON.parse(body));
            }
          });
      using cli for couchdb rest
        ./dbcli.js GET books
        ./dbcli.js PUT books
          creates a database
      importing real data
        code - rdf-parser.js
          <url:file:///~/codes/js/pragmatic_nodejs/databases/lib/rdf-parser.js>
          module.exports = function(filename, callback) {
        module.exports
          thus it is exported as function
        how to use it?
          rdfParser = require('./lib/rdf-parser.js'),
          rdfParser(..)
        load data into cheerio and query
          $ = cheerio.load(data.toString()),
          title: $('dcterms\\:title').text(), 
      unit testing with nodeunit
        install
          npm install -g nodeunit
          which nodeunit
        code
          <url:file:///~/codes/js/pragmatic_nodejs/databases/test/test-rdf-parser.js>
          rdfParser(__dirname + '/pg132.rdf', function(err, book) {
            test.expect(2);
            test.ifError(err);
            test.deepEqual(book, expectedValue, "book should match expected");
        expectedValue = require('./pg132.json');
          reads a json file
        __dirname
          points to directory containing the module file being executed
        run
          node $(which nodeunit) test/
      throttling node.js
        npm install --save file
          contains: walk()
        naive file parsing
          code
            <url:file:///~/codes/js/pragmatic_nodejs/databases/list-books.js>
            file = require('file'),
            rdfParser = require('./lib/rdf-parser.js');
            console.log('beginning directory walk');
            file.walk(__dirname + '/cache', function(err, dirPath, dirs, files){
              files.forEach(function(path){
                rdfParser(path, function(err, doc) {
          run
            node list-books.js
          error: EMFILE
            exhausted available file descriptors
            solution: work queuing
        queuing to limit work in progress
          npm install --save async
          code
            <url:file:///~/codes/js/pragmatic_nodejs/databases/list-books-queued.js>
            async = require('async'),
            work = async.queue(function(path, done) {
              rdfParser(path, function(err, doc) {
                done();
              });
            }, 1000);
            file.walk(__dirname + '/cache', function(err, dirPath, dirs, files){
              files.forEach(function(path){
                work.push(path);
          done callback
            called when finished
            to signal to work queue to pass next path
        putting it all together
          code
            <url:file:///~/codes/js/pragmatic_nodejs/databases/import-books.js>
            work = async.queue(function(path, done) {
              rdfParser(path, function(err, doc) {
                request({
                  method: 'PUT',
                  url: 'http://localhost:5984/books/' + doc._id,
                  json: doc
                }, function(err, res, body) {
          error: ECONNRESET
            tcp connection to database died 
            since we open 1000 connections
        dealing with update conflicts
          ./dbcli.js DELETE books/0?rev=1-453265faaa77a714d46bd72f62326186
          delete with only id doesn't work
          couchdb requires rev arg
      querying data with mapreduce
        indexing
          for quick retrieval
          couchdb uses mapreduce
            which produce views
          view: a kind of index
        cross environment scripting
          writing js to execute in other environments
            to run in couchdb
          code
            <url:file:///~/codes/js/pragmatic_nodejs/databases/lib/views.js>
            module.exports = {
              by_author: {
                map: function(doc) {
                  if ('authors' in doc) {
                    doc.authors.forEach(emit);
                  }
                }.toString(),
                reduce: '_count'
              },
        callback chaining
          views stored in design documents
          async.waterfall example 
            https://github.com/caolan/async/blob/master/dist/async.js
              code
                * // passing a regular synchronous function
                * async.waterfall([
                *     async.apply(fs.readFile, filename, "utf8"),
                *     async.asyncify(JSON.parse),
                *     function (data, next) {
                *         // data is the result of parsing the text.
                *         // If there was a parsing error, it would have been caught.
                *     }
                * ], callback);
            http://stackoverflow.com/questions/25705067/using-async-waterfall-in-node-js
              code
                async.waterfall([
                    readFile,
                    processFile
                ], function (error) {
                    if (error) {
                        //handle readFile error or processFile error here
                    }
                });
                function readFile(readFileCallback) {
                    fs.readFile('stocktest.json', function (error, file) {
                        if (error) {
                            readFileCallback(error);
                        } else {
                            readFileCallback(null, file);
                        }
                    });
                }
                function processFile(file, processFileCallback) {
                    var stocksJson = JSON.parse(file);
                    if (stocksJson[ticker] != null) {
                        stocksJson[ticker].price = value;
                        fs.writeFile('stocktest.json', JSON.stringify(stocksJson, null, 4), function (error) {
                            if (err) {
                                processFileCallback(error);
                            } else {
                                console.log("File successfully written");
                                processFileCallback(null);
                            }
                        });
                    }
                    else {
                        console.log(ticker + " doesn't exist on the json");
                        processFileCallback(null); //callback should always be called once (and only one time)
                    }
                }
    ch06: Scalable web services
      advantages of express
        similar to ruby sinatra
          provides plumbing code
        ex
          <url:file:///~/codes/js/pragmatic_nodejs/web-services/server.js>
          const
            http = require('http'),
            server = http.createServer(function(req, res) {
              res.writeHead(200, {'Content-Type': 'text/plain'});
              res.end('Hello World\n');
            });
          server.listen(3000, function(){
            console.log('ready captain!');
          });
      serving apis with express
        npm install --save express
        code
          <url:file:///~/codes/js/pragmatic_nodejs/web-services/hello/server.js>
          const
            express = require('express'),
            app = express();
          app.use(express.logger('dev'));
          app.get('/api/:name', function(req, res) {
            res.json(200, { "hello": req.params.name });
          });
          app.listen(3000, function(){
            console.log("ready captain.");
          });
        app.use(express.logger('dev'));
          middleware: express functionality
      running a server with npm
        instead of node, we use npm
          npm start
            -->
            package.json 
              scripts {
                start: "node ./server.js"
      testing rest endpoints with curl
        curl -i http://localhost:3000/api/jimbo
        out
          HTTP/1.1 200 OK X-Powered-By: Express ..
          {"hello":"jimbo"}
        log
          ::1 - - [Fri, 24 Mar 2017 12:18:16 GMT] "GET /api/jimbo HTTP/1.1" 200 17 "-" "curl/7.43.0"
      writing modular express services
        nodemon: node monitor
          when code changes, restarts node
        npm install -g nodemon
      post with a promise
        code
          let deferred = Q.defer()
          deferred.promise.then(function(args) {..}
    ch07: web apps
      storing express sessions in redis
      enabling sessions 
        app.use(express.cookieParser())
        app.use(express.session({secret: '..'})
      usin redis
      creating a single page web application
        serving static files
          check these directories
            app.use(express.static(__dirname + '/static'));
            app.use(express.static(__dirname + '/bower_components'));
        installing bower components
          npm install -g bower
          bower.json
          bower install
            makes bower_components/ directory
        structuring
          main entry point: index.html
        authenticating with passport
          3rd party logins
          GoogleStrategy = require('passport-google').Strategy;
          code
            <url:file:///~/codes/js/pragmatic_nodejs/web-app/b4/server.js>
            passport.serializeUser(function(user, done) {
              done(null, user.identifier);
            });
            passport.deserializeUser(function(id, done) {
              done(null, { identifier: id });
            });
            passport.use(new GoogleStrategy({
                returnURL: 'http://localhost:3000/auth/google/return',
                realm: 'http://localhost:3000/'
              },
              function(identifier, profile, done) {
                profile.identifier = identifier;
                return done(null, profile);
              }
            ));
        routing authentication requests
          code
            app.get('/auth/google/:return?',
              passport.authenticate('google', { successRedirect: '/' })
  OReilly.Learning.Node.Moving.to.the.Server-Side.2nd.Edition.1491943122.pdf
    Preface
      ch01: intro
      ch02
        events
          async nature
        buffer
      ch03
        module system
          look at npm
        sandboxing
        Async, Commander, Underscore
      ch04
        repl
      ch05
        web apps
      ch06
        differences between os
        streams and pipes
          I/O
      ch07
        networking
        security
      ch08
        child processes
      ch09
        es6
      ch10
        full stack node development
        express
      ch11
        production
        testing
        debugging
      ch12
        microcontrollers, iot
    code
      https://github.com/shelleyp/LearningNode2
      /Users/mertnuhoglu/codes/js/LearningNode2/
    ch01: the node environment
      pre
        not only server side tool
          runs everywhere
      installing node
      helloworld
        code
          hello.js
            var http = require('http');
            http.createServer(function (request, response) {
              response.writeHead(200, {'Content-Type': 'text/plain'});
              response.end('Hello World\n');
            }).listen(8124);
          node hello.js
      require 
        require('http')
          imports http module
      http.createServer( callback )
        event loop
          js is single-threaded
          node emulates async environment
            via an event loop
              with callback functions
              triggered on specific events
      ex: 
        var img = fs.readFileSync(file);
          reading file synchronously
        var img = fs.readFile(file, function(err, data) {..});
          async normal way
      command-line options
      node lts and upgrading node
        fork of node.js: io.js
        node -v
          version
        updating
          apt-get update
          sudo npm install npm -g n
      node, v8, es6
        js engine
          v8
            created by google for chrome
            compiles to machine code
      c++ add-ons
    ch02: node building blocks
      pre
        differences bw browser and node
          global objects
            buffer for binary data
            global
            process
            require, exports, module, console
      global and process
        global
          js: variable declared at top level
            it is global by default
            not in node
          ex: exports
            normal way
              add2.js
                function addtwo(input) {
              html
                <script src="add2.js"></script>
                console.log(addtwo(10));
              note:
                var base = 10; // in html
                overrides base in addtwo()
            node way
              addtwo.js
                exports.addtwo = function(input) {
              client:
                var addtwo = require('./addtwo').addtwo;
        process
          node -p "process.versions"
          node -p "process.env"
            environment variables
          node -p "process.release"
          node -p "process.stdin"
          standard streams
            common communication channels between application and environment
            consist of
              stdin
              stdout
              stderr
          using stdin
            first: set encoding for the stream
              process.stdin.setEncoding('utf8');
            next listen for `readable` event
              then read()
              code
                process.stdin.on('readable', function() {
                  var input = process.stdin.read();
                  if (input!==null) {
                    process.stdout.write(input);
                  }
                });
            process.exit
              var command = input.trim();
              if (command == 'exit')
                 process.exit(0);
      buffers, typed arrays, and strings
        handling binary data (octet streams)
          ArrayBuffer in browser
          Buffer in node
      Asynchronous Event Handling
        Event Queue (Loop)
          ex: example2-4.js
            <url:file:///~/codes/js/LearningNode2/chap2/example2-4.js>
            var http = require('http');
            var server = http.createServer();
            server.on('request', function (request, response) {
               console.log('request event');
               response.writeHead(200, {'Content-Type': 'text/plain'});
               response.end('Hello World\n');
            });
            server.on('connection', function() {
               console.log('connection event');
            });
            server.listen(8124, function() {
               console.log('listening event');
            });
            console.log('Server running on port 8124');
          on() is called after each event
            http inherits from EventEmitter
        Creating an Async Callback Function
