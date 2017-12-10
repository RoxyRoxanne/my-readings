  <url:file:///~/Dropbox (Personal)/mynotes/content/articles/articles_js.md>

# JS Patterns and Idioms: Douglas Crockford, Design Patterns id=g_10138

  JS Patterns and Idioms: Douglas Crockford, Design Patterns <url:file:///~/Dropbox/mynotes/content/articles/articles_js.md#r=g_10138>
  Js Design Patterns
    <url:file:///~/Dropbox (Personal)/mynotes/content/books/js/js_design_patterns_addy_osmani.md>
  const vs object freeze
    http://stackoverflow.com/questions/33124058/object-freeze-vs-const
      const applies to bindings ("variables"). It creates an immutable binding, i.e. you cannot assign a new value to the binding.
      Object.freeze works on values, and more specifically, object values. It makes an object immutable, i.e. you cannot change its properties.
      code
        var ob1 = {
           foo : 1,
            bar : {
                value : 2   
            }
        };
        Object.freeze( ob1 );
        const ob2 = {
           foo : 1,
            bar : {
                value : 2   
            }
        }
        ob1.foo = 4;  // (frozen) ob1.foo not modified
        ob2.foo = 4;  // (const) ob2.foo modified
        ob1.bar.value = 4;  // (frozen) modified, because ob1.bar is nested
        ob2.bar.value = 4;  // (const) modified
        ob1.bar = 4;  // (frozen) not modified, bar is a key of obj1
        ob2.bar = 4;  // (const) modified
        ob1 = {};  // (frozen) ob1 redeclared
        ob2 = {}; // (const) ob2 not redeclared
  The Post JavaScript Apocalypse at Silicon Valley Code Camp 2016-6Fg3Aj9GzNw.mp4
    http controversy: post put patch
      it creates clutter
      KonMari: Marie Kondo 
        how to remove clutter from your home
        how to get rid of stuff
      cost of keeping stuff
        cost of storage
        cost of access
      take something
        does it spark joy?
        programmers love clutter intuitively
      getting rid of clutter in programming is hard
        we enjoy clutter
      ex: ascii
        invented for teletype machines
        tab vs. space
          source of arguments
          tab key: was put into ascii although not usable for teletype
          if i were ascii inventor, i wouldn't put tab
          tab is not worth of arguing
        upper vs lower case 
          argument: case sensitivity
        quoting chars: ' "
    es6: clutters
      let vs. var: get rid of var
      let vs. const: use const
        difference bw const and freeze
      null vs undefined: use undefined
        invented by Hoare
        problem with null
          if you have ref to sth
          and it can be null
          you have to ask is_null() before accessing
        correct implementation:
          an immutable empty object
          const null = Object.freeze(Object.create())
    js: remove impurities
      Date
      Math.random
      delete
      Object.assign
      Array.splice
      Array.sort
        inplace editing
      RegExp.exec
        modifies regex object
      assignment
      var
      let
        const is ok
      for and loops 
        recursion functions better
      user interaction
      network
    es6 features
      generators
        it is a mistake
          confusing behavior
          makes control flow more complicated
        but the idea is worthwile
          generator will yield a function
          it will return a new value every time you call it
        code
          function factory(..) {
            // state variables
            return function generator() {
              // new value
              return value;
            }
        ex   
          function element(array) {
            let i = 0
            return function generator() {
              if (i < array.length) {
                let value = array[i]
                i += 1
                return value
              }
            }
      callbacks
        does the continuation argument go first or last?
          function first(callback, a) { return callback(a)}
          function last(a, callback) { return callback(a)}
        better: continuation first
          because of ellipsis operator
          first(callback, ...a)
      promises
        better: RQ
          requestor function
          composable
      try
        implied function
          code
            try {..}
            finally { // implied function }
          strong and subtle thus bad
        assigned goto
          code
            catch(M m) {..}
            catch(N m) {..}
      syntax
        too much clutter in syntax
          most syntax work against us
          lisp has no syntax at all
        if through ages
          fortran
            if (a.eq.0) a = b
          bcpl
            if a = 0 {a := b;}
          js  
            if (a === 0) a = b
            better
            if (a === 0) {a = b}
          algol68
            if a = 0 then
              a := b
            fi
          next?
            if a = 0
              a : b
            fi
        indexOf
          java
            "abc".indexOf("z") // -1
            how to indicate "not found"
        types
          int
            int32 + int32
            what is the type of result?
              java: int32
              correct: int33 
            idea of type system: 
              protect us from errors
              but here type system is source of error
            0.1 + 0.2 === 0.3
              false
              fault of ieee standart for floating point standard
              every language fails
              dec64
                number = coefficient * 10^exponent
                correct
                when we moved floating point into hardware, this was lost
            0 / 0
              math: undefined
  Douglas Crockford – “The Better Parts” _ .concat() 2015-_EF-FO63MXs.mp4
    ref
      Douglas Crockford - The Better Parts - Forward 2 Web Summit-rhV6hlL_wMc.mp4
    Saint Exupery:
      perfection is attained not when there is nothing more to add, but when there is nothing more to subtract
      this is principle of good parts
      learn as many languages
        js taught me the most
        i made every mistake i can
          first: i didn't bother learning the language before writing
        jslint: find errors in a program
        book: js the good parts
          it is still valid
          because good parts are still good
      js is implemented in 10 days
        mistake: ==
          first type coercion
          ecma said: lets keep it, and make ===
      brendon eich: features are foot guns
        guns to hit your foot
      js: js requires more discipline in order to write good stuff because of flimsiness
        fantasy of infallibility: foot gun
        futility of thoughtfulness: this never works, why bother
        both lead to danger driven development
      difficulty of scheduling
        two times:
          time a: time to write code
          time b: time to make code right
        there is no science to estimate time a
        time b can become infinite
        always take time to code well
      ecmascript 2015:
        proper tail call
          if the last thing:
            calling a function
            compiler instead of returning call return stack
            it can jump
            it can reduce memory consumption
            allows:
              continuation passing style
        ellipsis operator
          much better than argument arrays
        modules
          import and export values
          no need for require(..) stuff
        two new ways to defining variable: let and const
          solves block scope
            js doesn't have block scope
        destructuring
          let {that, other} = something
        WeakMap
          works the way objects should work
          js: keys have to be string
          weak maps allow any value to be key
        Megastring literals
          template strings
            before: quasi literals
          allow white space in regex
            regex expressions:
          use: regulex tool for regex
          ex:
            /Users/mertnuhoglu/Dropbox/public/img/ss-160.png
        fat arrow
        bad parts
          class
            they won't understand how js works
      my lessons: stopped using
        Object.create
          don't use new neither
          problem: this
            if you have this in a method, bound to object
            if you have this in a function, bound to global object
              violates security
          my solution
            let's make this illegal
        null
          stopped using null
          typeof(null) returns object
            wrong
        falsiness
          using null, 0 instead of false
        for
          forEach, map from es5
        forEach
          Object.keys (es5) gives a nice array of keys
        loops
          use only recursive functions
          ex
            function repeat(func) {
              while (func() !== undefined) {
              }
            }
            -->
            function repeat(func) {
              if (func() !== undefined) {
                return repeat(func);
              }
            }
      next language
        one generation to leave goto
          so much arguments
            then everything gone
        one generation to accept objects
          1967 simula
          alan kay: smalltalk 1980
            best designed language
        two generations to accept lambdas
          scheme 1970s
          js: first mainstream lang that supports it
        divide languages
          system languages
            low level stuff
            memory, device
          application languages
            everything else should be written here
            classical school
              you do classification first
                what are they composed of
              this is really hard
                at the beginning you don't know how the system works
                object graphs that don't fit
                  don't compose right
              extends: is come from statement
                dual of goto
                if you make mistake in lower levels
                  you are stuck with it
            prototypical school
              i was a strong advocate
                not anymore
              you don't do taxonomy and then refactoring
              only benefit:
                memory conservation, not worth
              costs
                own properties vs inherited properties
                retroactive heredity
                  you can change heredity
                  no good use for that
                performance inhibiting
            class free
              i am now advocate of class free
              block scope
                code: inner block can see outer
                  { 
                    let a
                    {
                      let b
                      .. a
                      .. b
                    }
                    .. a
                  }
              function scope (closure)
                we can do the same thing with nested functions
                code
                  function green() {
                    let a
                    function yellow() {
                      let b
                      .. a
                      ..b
                    }
                    ..a
                  }
                set diagram
                  /Users/mertnuhoglu/Dropbox/public/img/ss-159.png
                  inner function is an enclosure to the outer
                took long time for mainstream
                  because: inner may survive the outer
                    solution: stop using stack
              now i use objects like that:
                no new Object(), Object.create()
                code
                  function constructor(spec) {
                    let {member} = spec,
                        {other} = other_constructor(spec),
                        method = function() {
                          // member, other, method, spec
                        };
                    return Object.freeze({
                      method,
                      other
                    });
                  }
                spec is an initalization object
                  i don't take multiple params
                    i forget order
                  alternative to: Object.freeze
                    let that = other_constructor(..)
                    that.method = method
                    return that
                i can call x.method without this, bind
                  like a closure
                many constructors can be called inside
                  so we can copy some methods/data
                  multi inheritance
                Object.freeze
                  contains all public members
                  new syntax for object members
                    instead of:
                      Object.freez({
                        method: method,
                        other: other
                      })
                    now:
                      Object.freeze({
                        method, other
                      })
                  freezing solves security problem
                  object containing
                    only methods and frozen
                    only data and behind those objects
                  this is most effective
        Milner's promise:
          will static typing ever be worth the freight?
        functional programming
          async, distributed, concurrent
  'The Better Parts' - Douglas Crockford Tech Talk-vJKDh4UEXhw.mp4
  Which way is forward - Douglas Crockford-6eOhyEKUJko.mp4
    50 years
      1958 Lisp
      1973 ML
      1975 Scheme
      1990 Haskell
      1999 Javascript
    paradigm shift vs. bad idea
      we cannot decide the difference
      we adopt bad ideas
      we reject good ideas
  JavaScript Patterns for 2017  - Scott Allen-hO7mzO83N1Q.mp4
    ES Modules
      v1: IIFE
        (function() {
          "use strict";
        }());
        # two patterns
          IIFE: everything inside
          strict
      es6: iife is gone
        every js file is a module
        no "use strict", this is default
      es6
        export
          function work(..) {..}
          class Person {
            constructor(name) {..}
          export {work, Person}
          export default Person
            # import by default then
        import
          import {Person, Animal} from "./lib"
            from lib.js or lib.ts
          import HumanPerson from "./lib/humans"
            exported by default
          import * as lib from "./lib"
            import everything 
            lib.Person
            namespace
      import creates immutable bindings
        import Person
          this is not variable
          it is binding
        ex
          import {counter} ..
          counter += 1
            syntax error, it is immutable
        ex
          import {counter, increment} ..
          increment()
            this is ok, even counter is updated
      public apis with index.js
        in a directory
          put index.js
          export public functions from here
          like index.py
        this will separate public and package scope
        ex: index.js
          export * from "./humans"
      building modules
        bundle all imported modules into a single file
        webpack, browserify, rollup, closure
        analyzing dependencies and bundling together
      using webpack
        /Users/mertnuhoglu/Dropbox/public/img/ss-156.png
        extensions: what files to look up
        entry: what files to enter
        output
        loaders
        modulesDirectories: where to search for module directories: ex: ../../foo
          what is root?
      webpack config per purpose
        purposes: 
    Arrow syntax
      return an object literal
        # use ({..}) when returning objects
        const result = [1,2,3].map(n => {value: n})
        // doesn't return objects, just undefined
        const result = [1,2,3].map(n => ({value: n}))
        // value:1, value:2 ..
      lexical this reference
        arrow doesn't bind this
        /Users/mertnuhoglu/Dropbox/public/img/ss-157.png
        v1
          const adder = {
            add(x) { this.x }
          }
          this refers to adder object
        v2
          const adder = {
            add: () => { this.x }
          }
          this refers to enclosing scope of adder
      cannot rebind with bind, apply
        /Users/mertnuhoglu/Dropbox/public/img/ss-158.png
    const
      immutable data structure:
        const nums = [1,2,3]
        Object.freeze(nums)
    classes are mostly sugar
      class code
        class Employee {
          constructor(name) {
            this._name = name
          get name() {
            return this._name
          doWork() {
            ...
      prototype code
        let Employee = function(name) {
          this._name = name
        Employee.prototype = {
          doWork: function() {..}
          get name() { .. }
      instance
        new Employee(n)
      some prototype specific code is not usable with classes
        hoisting
          proto:
            const e = new Employee()
            function Employee() {
              this.name = "scott"
        reflective introspection
          proto
            const Human = function() {}
            Human.prototype.doWork = function() {}
            let names = []
            for (const p in new Human()) {
              names.push(p)
            // ["doWork"]
        no need to enforce new
          class Horse { doWork() {} }
          Horse()
          // TypeError
    object spread operator
      with arrays
        const nums = [1,2,3]
        const res = [...nums, 4,5]
      with objects
        const data = {x:1}
        const res = {
          name: ".."
          ...data
        }
    bang bang operator
      const value = 1
      const res = !!value
      // true
      # converts value into bool

# build and automation tools: bower, yarn, gulp, grunt, yo, package.json, npx, npm

  npx
    Introducing npx: an npm package runner
      https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b
        npm: to manage dependencies hosted on registry
        npx: to manage CLI tools and executables hosted on registry
        it simplifies:
          using locally-installed tools without npm run-script
            before: mocha, grunt were installed globally
            now: they are installed as project-local "devDependencies" in package.json
            downside: how to invoke them globally?
            npx solution:
              npx mocha --> local mocha
              mocha --> global mocha
          executing one-off commands
            npx cowsay-hello
              runs once doesn't pollute global libraries
          run commands with different nodejs versions
            npx node@6 -v
            npx -p node@7 -v
          share gist scripts
            npx https://gist.../...
      https://www.futurehosting.com/blog/npx-makes-life-easier-for-node-developers-plus-node-vulnerability-news/
        problem with old way:
          npm installs either to local or global
          when global?  
            to use it everywhere
          but:
            pollutes global namespace
            how to use local one still?
        npx allows
          using local package, even if global exists
            npx mocha # uses local
            mocha # uses global
  npm package.json
    using npm installed cli programs globally
      add npm/bin path to $PATH
      ex:
        where npm
        export PATH =$PATH:/Users/mertnuhoglu/.nvm/versions/node/v7.7.4/bin/
    npm package.json doc
      https://docs.npmjs.com/files/package.json
      name
      version
        name+version = unique identifier 
      description
        used in `npm search`
      keywords
        for npm search
      homepage
        url
      bugs
        url to issue tracker or email
        used by `npm bugs`
      license
        use SPDX license identifier
      author contributors
        person
          name, email, url, email
      files
        aray of files
        .npmignore
        always included
          package.json 
          README
          CHANGES
          LICENSE
          NOTICE
          main field
      main
        module ID as primary entry point
      bin
        ex
          {"bin": { "myapp": "./cli.js" } }
          then cli.js is symlink to /usr/local/bin/myapp
        use shebang
          #!/usr/bin/env node
      man
        "man" : "./man/doc.1
      directories
      repository
        git repo
        npm docs uses
      scripts
        npm-scripts
      config
        configuration parameters
          { "name" : "foo"
          , "config" : { "port" : "8080" } }
          then start command:
            npm config set foo:port 8001
      dependencies
        semver: specifying verison ranges
        ex
          { "dependencies" :
            { "foo" : "1.0.0 - 2.9999.9999"
            , "bar" : ">=1.0.2 <2.1.2"
        urls as dependencies
        local paths
          "bar": "file:../foo/bar"
      devDependencies
        for transpiler, tests
      engines
        node versions supported
      os
        supported os
    npm-scripts
      https://docs.npmjs.com/misc/scripts
      for following scripts
        npm install
          prepublish publish .. 
          prepare
          preinstall, install...
          ...
        npm test
          pretest, test, ..
        npm stop
          prestop, stop, ...
        npm restart
          ..
      use cases
        prepublish
          compile coffeescript into js
          create minified
      default values
        "start": "node server.js"
        "install": "node-gyp rebuild"
    package script manager for npm
      https://corysimmons.com/writings/2016/node/introducing-package-script-manager
      use rollup instead of webpack
  bower
    52 - Egghead.io - Bower - intro_to_bower.mp4
      installing
        bower install angular
        bower install angular#1.2.0-rc.1
        bower init
        # builds bower.json
        bower install
      bower packages
        bower-angular
          has only min files
      register new bower package
        bower register something github_repo
      search
        bower search angular
      write into index.html script tags
        grunt bowerInstall
        # after bower install
  grunt
    documentation
      https://gruntjs.com
      task runner
        why
          minification, compilation, unit testing, linting
          configured through Gruntfile
    Getting started
      https://gruntjs.com/getting-started
      install
        npm install -g grunt-cli
      how cli works
        grunt looks for require()
      add grunt and plugins to package.json
        npm install <module> -save-dev
        npm install grunt -save-dev
      wrapper function
        module.exports = function(grunt) {
        };
      task configuration
        grunt.initConfig
        ex
          grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            uglify: {
              options: {
      loading grunt plugins
        grunt.loadNpmTasks('grunt-contrib-uglify');
      custom tasks
        ex
          grunt.registerTask('default', ['uglify']);
    Creating Tasks
      https://gruntjs.com/creating-tasks
      alias tasks
        grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
          runs jshint, qunit in place of default
      Gulp vs Grunt
        http://stackoverflow.com/questions/35062852/npm-vs-bower-vs-browserify-vs-gulp-vs-grunt-vs-webpack
          npm is sufficient
          npm and bower
            package managers
            bower: 
          webpack, browserify
            bundle modules for browser
          webpack-dev-server
            a server that hot deploys your code and refreshes browser
        https://www.keithcirkel.co.uk/why-we-should-stop-using-grunt/
        http://www.hongkiat.com/blog/gulp-vs-grunt/
          grunt: configuration
          gulp: code
            code over configuration
    npm as a build tool
      https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/
      ex
        package.json
          "scripts": {
            "lint": "jshint **.js",
            "test": "mocha test/"
          }
        npm run lint
          will spawn a shell
          run jshint **.js
        shell environment has node_modules/.bin added to PATH
      check env variables
        "env": "env"
        npm run env
      shortcut scripts 
        npm test, npm start npm stop
        npm run test, ...
      pre and post hooks
        pre- post-
      ex
        "scripts": {
          "lint": "jshint **.js",
          "build": "browserify index.js > myproject.min.js",
          "test": "mocha test/",
          "prepublish": "npm run build # also runs npm run prebuild",    
          "prebuild": "npm run test # also runs npm run pretest",
          "pretest": "npm run lint"
        }
      passing arguments
        ex
          "scripts": {
            "test": "mocha test/",
            "test:xunit": "npm run test -- --reporter xunit"
          }
          npm run test -- x.js
            = mocha test/ x.js
          npm run test:xunit
            = mocha test --reporter xunit
        note: -- prefix extends with custom parameters
      npm config variables
      use script instead of json
        https://github.com/corysimmons/package-script-manager
  Yeoman
    Getting started with Yeoman and generator-webapp-zBt2g9ekiug.mp4
      grunt server
    Yeoman 101 Intro Tutorial-yUFXKhMg5Es.mp4
      yo
        webapp
      yo webapp
      gulp serve
      yo doctor
    Documentation
      Getting Started
        http://yeoman.io/learning/
        generic scaffolding system
        language agnostic
        install
          npm install -g yo
          npm install -g generator-webapp
        basic scaffolding
          yo webapp
          yo webapp --help
          npm home generator-webapp
            go to home page of package
          sub-generators
            additional generators to scaffold smaller parts of a project
            accessed as
              generator:sub-generator
            ex: add a new controller to angular
              yo angular:controller XController
        other yo commands
          yo --help
          yo --generators
          yo doctor
      Writing Your Own Generator
        generator-generator
          to get started with their own generator
        generator: a nodejs module
        setting up
          folder: generator-name
          npm init
            package.json
          npm install --save yeoman-generator
        folder tree 
          yo name -> app generator inside app/
          subgenerators: yo name:subcommand inside subcommand/ 
          "files": ["app", "subcommand"]
        extending generator
          var Generator = require('yeoman-generator')
          module.exports = class extends Generator {}
        adding your own functions
          module.exports = class extends Generator {
            method1() {
              this.log('..')
            }
          }
        running
          create a global module and symlink to a local one
            npm link
          yo name
  Gulp
    Getting Started
      https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
      install gulp command
        npm install -g gulp-cli
      install gulp in devDependencies
        npm install --save-dev gulp
      create a gulpfile
        gulpfile.js
          var gulp = require('gulp')
          gulp.task('default', function() {
          });
      test it out
        gulp
    API documentation
      https://github.com/gulpjs/gulp/blob/master/docs/API.md
      gulp.src(globs)
        reads globs (files defined in glob syntax) and pipes
        gulp.src('client/templates/*.jade')
          .pipe(jade())
          .pipe(minify())
          .pipe(gulp.dest('build/minified_templates'));
        globs:
          type: String or Array
          Glob or array of globs
          uses glob syntax
            patterns the shell uses: stars
        gulp.src(['client/*.js', '!client/b*.js', 'client/bad.js'])
      gulp.dest(path)
        writes files and reemits all data
        gulp.src('./client/templates/*.jade')
          .pipe(jade())
          .pipe(gulp.dest('./build/templates'))
          .pipe(minify())
          .pipe(gulp.dest('./build/minified_templates'));
      gulp.task(name[,deps][,fn])
        define a task using Orchestrator
        gulp.task('somename', function() {
          // Do stuff
        });
        deps
          type: Array
          tasks to execute before
          gulp.task('mytask', ['array', 'of', 'task', 'names'], function() {
            // Do stuff
          });
        async task support
          can be made async if fn does:
            accept a callback
      gulp.watch(glob [, opts], tasks)
        watch files and do something when a file changes
    node-glob
      https://github.com/isaacs/node-glob
      uses shell pattern
        var glob = require("glob")
        glob("**/*.js", options, function (er, files) {
        })
    Orchestrator
      https://github.com/robrich/orchestrator
      1. Get a reference:
        var Orchestrator = require('orchestrator');
        var orchestrator = new Orchestrator();
      2. Load it up with stuff to do:
        orchestrator.add('thing1', function(){
          // do stuff
        });
        orchestrator.add('thing2', function(){
          // do stuff
        });
      3. Run the tasks:
        orchestrator.start('thing1', 'thing2', function (err) {
          // all done
        });
  yarn
    documentation
      https://github.com/yarnpkg/yarn
      features 
        fast: caches downloads
        reliable: works exactly same way on any system
        secure: checksum
        offline mode
        deterministic: dependencies work same exactly way
      installation
        npm install -g yarn
      usage
        yarn init
          start a new project
        yarn add package@[version]
          add dependency
        yarn upgrade package
        yarn remove package
        yarn install
          install all dependencies
  How JavaScript bundlers work
    https://medium.com/@gimenete/how-javascript-bundlers-work-1fc0d0caf2da
    what is js bundler?
      bundles your code and dependencies in one js file
    popular ones: browserify, webpack
    why?
      there was no require, or import before
      how to import then?
        through global variables
        put lots of script tags
          what about dependency order?
            <script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
            <script src="/js/foo.js"></script>
            <script src="/js/bar.js"></script>
    alternatives
      nodejs: own modules system
        require() function
      commonjs: exports() 
      how to do it in frontend?
        <script>
        var $ = require('jquery')
        var foo = require('./js/foo')
      but: require() is synchronous
        so we need to put everything in one file to have available in memory
        bad for performance
  chrome
    30 Chrome DevTools Tips-UURZFzk92bU.mp4
      chrome canary
        experimental dev version
      chrome://flags
        devtools
        > settings > experiments
      elements
        change tags live
        element > right > scroll into view
        element > h: show/hide
        where does the border style come from?
          elements > css > computed
          click border > click arrow
        which js action is triggered?
          page element > inspect > element > right > break on > attributes modifications
          /Users/mertnuhoglu/Dropbox/public/img/ss-150.png
        debug hover state
          element > styles > :hov > hover
          /Users/mertnuhoglu/Dropbox/public/img/ss-151.png
        color palette
          styles > color > click
          shift click: changes color encoding format
          option
            preloaded color palettes
      sources
        > pretty print 
        > dom breakpoints
      network
        disable cache: always keep selected
        capture screenshots 
          you see what comes in which order
          /Users/mertnuhoglu/Dropbox/public/img/ss-152.png
        device simulation
          2017-03-07_14-29-40.jpg
        network throttling
          farklı hızlarda nasıl yüklenyior
        right click column headings
          sort by domain/cookies ...
      sources
        js editor
        left pane: top level domains of sources
          changes live
        to make changes persistent
          drag drop finder folder 
          file > right > map to network source
          edit in any editor
        what is being repainted as you scroll, move?

# tools: module, test, css, chrome

  Modernizr
    https://en.wikipedia.org/wiki/Modernizr
      checks whether user's browser implements a css/html5 feature
      ex
        elem = document.getElementById('result');
        if ( Modernizr.websockets ) {
          elem.innerHTML = 'Your browser supports WebSockets.';
                            alert("Your browser supports WebSockets");
        } else {
          elem.innerHTML ='Your browser does not support WebSockets.' ;
        }
      ex: css
        .wsno,
        .wsyes { display: none; }
        /* Modernizr will add one of the following classes to the HTML element based on
                       whether or not WebSockets is supported by the user's browser. */
        .no-websockets .wsno,
        .websockets .wsyes { display: block; }
  RequireJS, AMD, CommonJS
    http://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs
      RequireJS implements AMD API
      CommonJS: uses exports object
        ex
          // someModule.js
          exports.doSomething = function() { return "foo"; };
          //otherModule.js
          var someModule = require('someModule'); // in the vein of node    
          exports.doSomethingElse = function() { return someModule.doSomething() + "bar"; };
        nodejs is an implementation of commonjs
        not designed for browsers
      AMD
        more suited for browser
        supports asynchronous loading
      Browserify
        let you use CommonJS in browser
  npm semver: semantic versioner for npm
    https://docs.npmjs.com/misc/semver
    usage
      npm install semver
    operators
      < <= > >= =
    ex
      >=1.2.7 <1.3.0
      1.2.7 || >=1.2.9 <2.0.0
    prerelease tags
  browsersync dev server
    documentation
      https://www.browsersync.io
      aynı eylemleri birden çok browserda yapmayı sağlar
      hot deploy değişen html, js kodları için
    next
  chokidar cli: file watch
    https://github.com/kimmobrunfeldt/chokidar-cli
  rollup.js
    documentation
      https://rollupjs.org
      similar to browserify, webpack
      creates a bundles
      files written in es6 module format
      faster and smaller bundling
        tree-shaking
          only the code we need is included in bundle
  browserify
    https://github.com/substack/browserify-handbook
      nedir?
        npm normalde backend, js ise frontend için.
        fakat aslında npm ile yapılan her şey frontendde çalışabilir
        ancak bunun için js kodlarını yükleme mekanizmasını değiştirmek gerekiyor
        browserify bunu sağlıyor
      require
      node packaged modules
        require
          require() for loading code
          let module1 = require("some_file.js")
          module1.f()
        exports
          form default:
            module.exports = function (a) {..}
            # use it in another place
            var foo = require("./foo.js")
            foo(5)
          form with name:
            exports.beep = function (a) {..}
            module.exports.beep = function (a) {..}
            # use
            foo.beep(5)
        bundling for browser
          in node running:
            node file.js
          in browserify:
            browserify file.js > bundle.js
          bundle.js contains all js that file.js needs to work
          put it into <script> tag just before </body>
              <script src="bundle.js">
            </body>
      watchify
        watchify instead of browserify
          to write bundle at each change
        npm run watch
        {
          "build": "browserify browser.js -o static/bundle.js",
          "watch": "watchify browser.js -o static/bundle.js --debug --verbose",
        }
          

# angular js

  angularjs fundamentals - egghead
    01-egghead-angularjs-building-an-angular-app-eggly-introduction.mp4
    02-egghead-angularjs-building-an-angular-app-bootstrapping.mp4
      01
        <html ng-app>
          <div ng-init="hello='world'">
            <h1>{{hello}}</h1>
      02
        <input type="text" ng-model="hello">
        --> {{hello}}
    03-egghead-angularjs-building-an-angular-app-controllers.mp4
      module
        to group functionality
      01
        <html ng-app="Eggly">
          # looks for module called Eggly
        <script src="app/eggly-app.start.js">
        # eggly-app.start.js
          angular.module('Eggly', [ # dependencies 
          ])
          .controller('MainCtrl', function($scope) {
            $scope.hello = 'world';
          })
          ;
        <body ng-controller="MainCtrl">
          <h1>{{hello}}</h1>
      02
        # create categories, bookmarks data in Eggly module MainCtrl controller
          .controller('MainCtrl', function($scope) {
            $scope.categories = [
              {"id": 0, "name": "Development"},
              {"id": 1, "name": "Design"},
            ];
            $scope.bookmarks = [ id, title, url, category... ]
          })
        # index.html
          <ul ..>
            <li ng-repeat="c in categories">
              <a href="#">{{c.name}}
            <div ng-repeat="b in bookmarks">
              <a href="{{b.url}}">{{b.title}}</a>
    04-egghead-angularjs-building-an-angular-app-filters.mp4
      01
        # eggly-app.start.js
          $scope.currentCategory = null;
          function setCurrentCategory(c) {
            $scope.currentCategory = c;
          }
          $scope.setCurrentCategory = setCurrentCategory;
        # index.html
          <li ng-repeat="c in categories">
            <a href="#" ng-click="setCurrentCategory(c)>{{c.name}}
          <div ng-repeat="b in bookmarks | filter:{category:currentCategory.name}">
            <a href="{{b.url}}">{{b.title}}</a>
      02
        # index.html
          <a ng-click="setCurrentCategory(null)"> # logo
      03
        # eggly-app
          function isCurrentCategory(c) {
            return $scoppe.currentCategory !== null && category.name === $scope.currentCategory.name
          }
          $scope.isCurrentCategory = isCurrentCategory
        # index.html
          <li ng-repeat="c in categories" ng-class="{'active':isCurrentCategory(c)}">
    05-egghead-angularjs-building-an-angular-app-simple-states.mp4
      01
        # eggly
          function startCreating, cancelCreating, startEditing, cancelEditing, shouldShowCreating, shouldShowEditing
          /Users/mertnuhoglu/Dropbox/public/img/ss-136.png
        # index.html
          <div ng-repeat="b in bookmarks | filter:{category:currentCategory.name}">
            <button ng-click="startEditing();">
            <a href="{{b.url}}">{{b.title}}</a>
          <div ng-if="shouldShowCreating()" ng-click="startCreating();>..
          <div ng-if="shouldShowEditing()">..
    06-egghead-angularjs-building-an-angular-app-add-a-bookmark-with-ng-submit-and-ng-model.mp4
      adding a form
      01
        # index.html
          <form ng-show="isCreating" ng-submit="createBookmark(newBookmark)"
          # newBookmark comes from form elements
          <input ng-model="newBookmark.title">
          <input ng-model="newBookmark.url">
          <button ng-click="cancelCreating()">
        # eggly.js
          function resetCreateForm() {
            $scope.newBookmark = { title: '', url: '', category: $scope.currentCategory };
          }
          function createBookmark(b) {
            b.id = $scope.bookmarks.length;
            $scope.bookmarks.push(bookmark);
            resetCreateForm();
          }
          $scope.createBookmark = createBookmark
  Creating AngularJS project in WebStorm-nebg6X1El2g.mp4
  Using WebStorm for Building Angular Apps-upgjCMHGpwo.mp4
    Webstorm configuration
      hide all buttons
        View > Toolbar ...
      find action command #+A
      stretch to left right #+ok
        first select a window
      Prefs > Editor > Editor Tabs > Limit = 1
      Recent Files  #e
      Recently edited files #+e
      Hide all windows #+F12
      Prefs > Fonts > Enable font ligatures
        => --> ⇒ 
      Terminal  !F12
      Plugin > AceJump
        hızlı bir şekilde bir yere zıplamak
        #; ^;
  angularjs architecture - egghead
    01-egghead-angularjs-angularjs-architecture-series-introduction.mp4
    02
  next
    https://medium.com/google-developer-experts/angular-introduction-to-reactive-extensions-rxjs-a86a7430a61f#.gy5er28ih
    https://docs.angularjs.org/tutorial
    https://docs.angularjs.org/tutorial/step_00
    https://www.w3schools.com/angular/
    https://thinkster.io/a-better-way-to-learn-angularjs
    https://www.quora.com/What-is-the-best-way-to-learn-AngularJS-2
    http://www.ng-newsletter.com/posts/how-to-learn-angular.html
        
  @mine-angularjs
    ng-app ng-init ng-model
      01
        <html ng-app>
          <div ng-init="hello='world'">
            <h1>{{hello}}</h1>
      02
        <input type="text" ng-model="hello">
        --> {{hello}}
    

# nodejs id=g_10126

  nodejs <url:file:///~/Dropbox/mynotes/content/articles/articles_js.md#r=g_10126>
  expressjs
    multiple template engines
      http://expressjs.com/en/api.html
      var engines = require('consolidate');
      app.engine('haml', engines.haml);
      app.engine('html', engines.hogan);
    expressjs examples
      Parsing Forms with Multiple Submit Buttons in Node.js with Express 4
        http://shiya.io/parsing-forms-with-multiple-submit-buttons-in-node-js-with-express-4/
        body-parser module
        index.ejs: two submit buttons
          <form action="/login" method="post">
              <div class="form-group">
                  <label>To Do:</label>
                  <input type="text" class="form-control" name="todo">
              </div>
              <button type="submit" class="btn btn-primary btn-lg" formaction="/top">Add to Top</button>
              <button type="submit" class="btn btn-primary btn-lg" formaction="/bottom">Add to Bottom</button>
          </form>
        index.js
          note: formaction="/top" attributes
            it links to app.post() methods
          code
            // parse html forms
            app.use(bodyParser.urlencoded({ extended : false }));
            // render the ejs page
            app.get('/', function (req, res) {
              res.render('index.ejs');
            });
            // when Add to Top button is clicked
            app.post('/top', function (req, res) {
              console.log(req.body.todo + " is added to top of the list.");
              res.redirect('/');
            });
      Build a javascript todo app with express, jade and mongodb
        ref
          https://coderwall.com/p/4gzjqw/build-a-javascript-todo-app-with-express-jade-and-mongodb
          https://github.com/jasonshark/express-todo
        server.js
          middleware
            var app = express();
            app.set('views', path.join(__dirname, 'views'));
            app.set('view engine', 'jade');
            //app.use(favicon(__dirname + '/public/favicon.ico'));
            app.use(logger('dev'));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded());
            app.use(cookieParser());
            app.use(express.static(path.join(__dirname, 'public')));
          routes
            // Routes
            var main = require('./routes/main');
            var todo = require('./routes/todo');
            var todoRouter = express.Router();
            app.use('/todos', todoRouter);
            app.get('/', main.index);
            todoRouter.get('/', todo.all);
            todoRouter.post('/create', todo.create);
            todoRouter.post('/destroy/:id', todo.destroy);
            todoRouter.post('/edit/:id', todo.edit);
        routes/todo.js
          module.exports = {
              all: function(req, res){
                  res.send('All todos')
              },
              viewOne: function(req, res){
                  console.log('Viewing ' + req.params.id);
              },
        pages
          app.get('/', main.index);
          routes/main.js
            module.exports = {
              index: function(req, res) {
                res.render('main', { title: 'Express Todo' });
          views/main.jade
            block content
              h1= title
              p Welcome to #{title}
              a(href='/todos').btn.btn-success.btn-lg View all todos
        @mine: şu kod nasıl rx ile yapılır?
          ex
            all: function(req, res){
                Todo.find({}, function(err, todos){
                    if(err) res.send(err);
                    res.json(todos);
          opt
            gleb'e bak
          opt1
            all: (req, res) => { all_.onNext( { req: req, res: res } ) }
            all_
              .subscribe(
                Todo.find(..)
        refactor
          server.js
            var env = process.env.NODE_ENV || 'development';
            var envConfig = require('./config/env')[env];
            require('./config/config')(app, envConfig);
            require('./config/database')(envConfig)
              config/database.js
                module.exports = function(envConfig){
                  mongoose.connect(envConfig.database, function(){
        form fields 
          todo.js
            create: function(req, res){
                var todoContent = req.body.content;
    Hackathon Starter
      https://github.com/sahat/hackathon-starter
    expressjs guide
      https://expressjs.com/en/guide/
      routing
        https://expressjs.com/en/guide/routing.html
        GET and POST methods
          app.get('/', function (req, res) {
            res.send('GET request to the homepage')
          }
        route parameters
          ex
            Route path: /users/:userId/books/:bookId
            Request URL: http://localhost:3000/users/34/books/8989
            req.params: { "userId": "34", "bookId": "8989" }
        app.route()
          reuse route path for multiple verbs
          ex
            app.route('/book')
              .get(function (req, res) {
                res.send('Get a random book')
              })
              .post(function (req, res) {
                res.send('Add a book')
              })
        express.Router
          has its own middleware
          moduler route handlers
          ex
            var router = express.Router()
            router.use(function timeLog (req, res, next) {
              console.log('Time: ', Date.now())
              next()
            })
            // define the home page route
            router.get('/', function (req, res) {
              res.send('Birds home page')
            })
        route handlers
          multiple callback functions per request
            ex: impose preconditions on a route
            call next() to pass to next callback
          ex
            app.get('/example/b', function (req, res, next) {
              console.log('the response will be sent by the next function ...')
              next()
            }, function (req, res) {
              res.send('Hello from B!')
            })
      Serving static files in Express
        app.use('/static', express.static(path.join(__dirname, 'public')))
        Now, you can load the files that are in the public directory from the /static path prefix.
        http://localhost:3000/static/images/kitten.jpg
        /static: mount path
      express application generator
        npm install express-generator -g
        express -h
        express --view=pug myapp
        run
          DEBUG=myapp:* npm start
      Writing middleware for use in Express apps
        mw: functions that access to req and res and next
          next: pass control to next step in cycle
        ex
          middleware = function(req, res, next) {
            next()
          }
          app.get('/', middleware)
        myLogger
          var myLogger = function (req, res, next) {
            console.log('LOGGED')
            next()
          }
          app.use(myLogger)
          app.get('/', (req,res) => {..})
        requestTime
          var requestTime = function (req, res, next) {
            req.requestTime = Date.now()
            next()
          }
        configurable middleware
          export a function
            that accepts an options object
          ex
            module.exports = function(options) {
              return function(req, res, next) {
                // Implement the middleware function based on the options object
                next()
              }
            }
            var mw = require('./my-middleware.js')
            app.use(mw({ option1: '1', option2: '2' }))
      Using middleware
        application level
          opt
            app.use()
              optional: mount path
            app.METHOD()
          ex
            app.use(function (req, res, next) {..}
          ex: with mount path
            app.use('/user/:id', function (req, res, next) {..}
          ex: route and its handler
            app.get('/user/:id', function (req, res, next) {
              res.send('USER')
            })
          ex: next('route') pass to next get() function
            app.get('/user/:id', function (req, res, next) {
              // if the user ID is 0, skip to the next route
              if (req.params.id === '0') next('route')
              // otherwise pass the control to the next middleware function in this stack
              else next()
            }, function (req, res, next) {
              // render a regular page
              res.render('regular')
            })
            // handler for the /user/:id path, which renders a special page
            app.get('/user/:id', function (req, res, next) {
              res.render('special')
            })
        Router level
          ex
            var router = express.Router()
            // a middleware function with no mount path. This code is executed for every request to the router
            router.use(function (req, res, next) {
              console.log('Time:', Date.now())
              next()
            })
            // mount the router on the app
            app.use('/', router)
          next('router') pass control out of router (to the app)
        built-in middleware
          static
            code
              express.static(root, [options])
              var options = {
                dotfiles: 'ignore',
                setHeaders: function (res, path, stat) {
                  res.set('x-timestamp', Date.now())
                }
              }
              app.use(express.static('public', options))
            multi
              app.use(express.static('public'))
              app.use(express.static('uploads'))
      3rd party middleware
        body parser
          parses request body
            makes available:
              req.body
          not for multipart bodies
          ex
            // create application/x-www-form-urlencoded parser
            var urlencodedParser = bodyParser.urlencoded({ extended: false })
            // POST /login gets urlencoded bodies
            app.post('/login', urlencodedParser, function (req, res) {
              if (!req.body) return res.sendStatus(400)
              res.send('welcome, ' + req.body.username)
            })
    file upload - nodejs id=g_10125
      file upload - nodejs <url:file:///~/Dropbox/mynotes/content/articles/articles_js.md#r=g_10125>
      Form Fields and Upload At the Same Time using Formidable
        http://stackoverflow.com/questions/26996333/can-i-use-body-parser-and-formidable-at-the-same-time
        code
          app.post('/upload', function(req, res){
              var form = new formidable.IncomingForm();
              form.uploadDir = __dirname + "/data";
              form.parse(req, function(err, fields, files) {
                  //fields is an object containing all your fields, do waht ever you want with them from here
                  //file is an object containing properties of your uploaded file
                res.send(util.inspect({fields: fields, files: files}));
                console.log('file uploaded : ' + files.upload.path + '/' + files.upload.name);
                console.log('Fields : ' + fields.adName);//you can access all your fields
              });
          });
        form
          app.get('/', function (req, res) {
              res.send(     
              '<form action="/upload" enctype="multipart/form-data" method="post">'+
              '<input type="text" name="adName" placeholder="adName"><br>'+
              '<input type="file" name="upload" multiple="multiple"><br>'+
              '<input type="submit" value="Upload">'+
              '</form>'
            );
          });
      Do stuff with multiple files when uploading them using node-formidable with Express
        http://stackoverflow.com/questions/10124099/do-stuff-with-multiple-files-when-uploading-them-using-node-formidable-with-expr
          code
            app.use(express.bodyParser({ uploadDir:__dirname + '/public/uploads' }));
            app.post('/upload', function(req, res){
                var form = new formidable.IncomingForm(),
                files = [],
                fields = [];
                form.on('field', function(field, value) {
                    fields.push([field, value]);
                })
                form.on('file', function(field, file) {
                    console.log(file.name);
                    files.push([field, file]);
                })
                form.on('end', function() {
                    console.log('done');
                    res.redirect('/forms');
                });
                form.parse(req);
            });
      Simple File Upload with Express.js and Formidable in Node.js
        ref
          http://shiya.io/simple-file-upload-with-express-js-and-formidable-in-node-js/
        app.js
          var express = require('express');
          var formidable = require('formidable');
          var app = express();
          app.get('/', function (req, res){
              res.sendFile(__dirname + '/index.html');
          });
          app.post('/', function (req, res){
              var form = new formidable.IncomingForm();
              form.parse(req);
              form.on('fileBegin', function (name, file){
                  file.path = __dirname + '/uploads/' + file.name;
              });
              form.on('file', function (name, file){
                  console.log('Uploaded ' + file.name);
              });
              res.sendFile(__dirname + '/index.html');
          });
          app.listen(3000);
        index.html
          <form action="/" enctype="multipart/form-data" method="post">
              <input type="file" name="upload" multiple>
              <input type="submit" value="Upload">
          </form>
      Building a File Uploader with NodeJs
        https://coligo.io/building-ajax-file-uploader-with-node/
        ref
          https://github.com/coligo-io/file-uploader
          /Users/mertnuhoglu/projects/itr/kentgida/nodeapp/file-uploader
          /Users/mertnuhoglu/projects/itr/kentgida/nodeapp/upload01
        views/index.html
          <input id="upload-input" type="file" name="uploads[]" multiple="multiple"></br>
            hide it
              #upload-input {
                display: none;
            replace with
              <div class="progress-bar" role="progressbar"></div>
            functionally too
              $('.upload-btn').on('click', function (){
                  $('#upload-input').click();
        file uploading logic
          listen to file input for a change input
            $('#upload-input').on('change', function(){
          get selected files
            var files = $(this).get(0).files;
            if (files.length > 0){
          populate a FormData object
            it is: a set of key/value pairs
              representing form fields and values
            then send it with ajax to server
            code
              var formData = new FormData();
              for (var i = 0; i < files.length; i++) {
                var file = files[i];
                formData.append('uploads[]', file, file.name);
          ajax request that posts data to server
            code
              $.ajax({
                url: '/upload',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(data){ console.log('upload successful!\n' + data); },
            processData: false,
              don't convert to string
            contentType: false,
              don't add Content-Type header
          update progress bar
            code
              xhr: function() {
                var xhr = new XMLHttpRequest();
                xhr.upload.addEventListener('progress', function(evt) {
                  if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    percentComplete = parseInt(percentComplete * 100);
                    $('.progress-bar').text(percentComplete + '%');
                    $('.progress-bar').width(percentComplete + '%');
                    if (percentComplete === 100) {
                      $('.progress-bar').html('Done');
                    }
                  }
                }, false);
                return xhr;
        backend: processing upload
          app.js
            formidable
              parse incoming form data
            fs
              rename files
          routing home page
            app.get('/', function(req, res){
              res.sendFile(path.join(__dirname, 'views/index.html'));
          routing upload/ service
            app.post('/upload', function(req, res){
      multer readme
        https://github.com/expressjs/multer
        middleware for multipart/form-data
          only multipart forms
        multer adds two properties to: request
          body
          file or files
        body: values of text fields of form
        file/files: files uploaded
        ex: basic usage
          x
          var express = require('express')
          var multer  = require('multer')
          var upload = multer({ dest: 'uploads/' })
          var app = express()
          app.post('/profile', upload.single('avatar'), function (req, res, next) {
            // req.file is the `avatar` file
            // req.body will hold the text fields, if there were any
          })
          app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
            // req.files is array of `photos` files
            // req.body will contain the text fields, if there were any
          })
          var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
          app.post('/cool-profile', cpUpload, function (req, res, next) {
            // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
            //
            // e.g.
            //  req.files['avatar'][0] -> File
            //  req.files['gallery'] -> Array
            //
            // req.body will contain the text fields, if there were any
          })
        if text-only form, then:
          var upload = multer()
          app.post('/profile', upload.array(), function (req, res, next) {
            // req.body contains the text fields
          })
      formidable readme
        https://github.com/felixge/node-formidable
        parse() to get data
        if cb is provided, fields, files are collected
          form.parse(req, function(err, fields, files) {
            // ...
          });
        field event
          form.on('field', function(name, value) {
          });
        file event
          form.on('file', function(name, file) {
          });
      other opt
        koa.js examples: file upload
          https://github.com/koajs/examples
          ref
            /Users/mertnuhoglu/codes/js/koa-examples/upload
            ~/codes/js/koa-examples/upload/app.js
        Koa.js - File Uploading
          https://www.tutorialspoint.com/koajs/koajs_file_uploading.htm
          ref
          code
            file_upload.pug
              form(action="/upload" method="POST" enctype="multipart/form-data")
                  div
                      input(type="text" name="name" placeholder="Name")
                  div
                      input(type="file" name="image")
                  div
                      input(type="submit")
            app.js
              _.get('/files', renderForm);
              _.post('/upload', handleForm);
              function * renderForm(){
                  this.render('file_upload');
              }
              function *handleForm(){
                  console.log("Files: ", this.request.body.files);
                  console.log("Fields: ", this.request.body.fields);
                  this.body = "Received your data!"; //This is where the parsed request is stored
              }
        File uploads using Node.js
          https://codeforgeek.com/2014/11/file-uploads-using-node-js/
          multer
            var upload = multer({ storage : storage},{limits : {fieldNameSize : 10}}).single('userPhoto');
        File uploads using Node.js: once again
      next
        FormData nerede tanımlanmış?
        doc:
          formData.append('uploads[]', file, file.name);
    alternatives to expressjs
      koa
        kaio
          ref
            https://github.com/enten/kaio
            /Users/mertnuhoglu/codes/js/kaio-app
          app.js
          run
            KO_PORT=1333 DEBUG=* node --harmony app.js
            $ curl http://localhost:1333/api/
            Hello world!
            $ curl http://localhost:1333/api/books
            [{"title":"The Fellowship of the Ring","author":"J. R. R. Tolkien","publication":"1954-07-29"},{"title":"The Two Towers","author":"J. R. R. Tolkien","publication":"1954-11-11"},{"title":"The Return of the King","author":"J. R. R. Tolkien","publication":"1955-10-20"}]
            $ curl http://localhost:1333/api/books/The%2520Two%2520Towers
            {"title":"The Two Towers","author":"J. R. R. Tolkien","publication":"1954-11-11"}
          api doc
            https://cdn.rawgit.com/enten/kaio/master/docs/kaio/0.5.4/Kaio.html#bind
        Getting started with Koa.js
          ref
            https://medium.com/@adrianmacneil/getting-started-with-koa-js-52d8852fa49d
          first there was express
            ex
              app.get('/', (req, res) => { res.send('hello') })
            this lead to callback hell
              app.get(.., (..) => {
                Session.findById(sid, (..) => {
                  User.findById(.., (..) => {..}
            solution: to use Promises
              app.get(.., (..) => {
                Session.findById(sid).then( (..) => { 
                  return User.findById(uid)
                }).then((user) => {
                  res.send(..)
            still mess: boilerplate code, catching errors, passing them to next
            koa cleans mess
              using new async/await
              app.get(.., async (ctx) => {
                session = await Session.findById(sid)
                user = await User.findById(uid)
                ctx.body = `${user.name}`
        koa resources
          https://github.com/koajs/koa/blob/master/docs/guide.md
          https://github.com/alexmingoia/koa-router
          http://koajs.com
          https://bramanti.me/working-with-koa-js/
          https://code.tutsplus.com/tutorials/introduction-to-generators-koajs-part-1--cms-21615
          https://cdn.rawgit.com/enten/kaio/master/docs/kaio/0.5.4/Kaio.html#bind
          https://github.com/enten/kaio
          https://github.com/koajs/koa/wiki
    Error: Can't set headers after they are sent.
      http://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
        ans1
          res object is subclass of Nodejs http.ServerResponse
          you can call 
            res.setHeader
            until: res.writeHead(status)
          after writeHead
            you can only call res.write(data) and res.end(data)
          error means
            you are in body or finished state
            some function set header or statusCode
          case1
            you called res.redirect()
            it caused response to become Finished
            then code threw an error
          case2
            problem
              res.send(util.inspect({fields: fields, files: files}));
              res.redirect("http://localhost:5050/progress/")
            solution
              // remove res.send
              res.redirect("http://localhost:5050/progress/")
  node and rx
    Node server with Rx and Cycle.js
      ref
        https://glebbahmutov.com/blog/node-server-with-rx-and-cycle/
        https://github.com/bahmutov/node-rx-cycle
        /Users/mertnuhoglu/codes/js/node-rx-cycle
      00 node hello world
        <url:file:///~/codes/js/node-rx-cycle/src/00-node-server.js>
        run
          $ node src/00-node-server.js 
          Server running at http://127.0.0.1:1337/
          $ curl 127.0.0.1:1337
          Hello World
        problems
          1. callbacks
            solution: Promises, reactive programming
          2. i/o mixed in code
            solution: separate io from pure functions
      reactive server
        replace callbacks with one reactive stream
        ref
          <url:file:///~/codes/js/node-rx-cycle/src/01-rx.js>
        code logic
          requests_.onNext({ req: req, res: res });
            { req: req, res: res } is event
              passed to onNext(evt) 
          requests_
            .subscribe(
              sendHello,
              console.error,
              () => console.log('stream is done')
            )
          onNext = sendHello
          function sendHello(e) {
            console.log('sending hello');
            e.res.writeHead(200, { 'Content-Type': 'text/plain' });
            e.res.end('Hello World\n');
          e.res accesses response
        run
          $ node src/01-rx.js 
          Server running at http://127.0.0.1:1337/
          $ curl 127.0.0.1:1337
          $ curl 127.0.0.1:1337/hi
    Bacon.js + Node.js + MongoDB: Functional Reactive Programming on the Server
      http://blog.carbonfive.com/2014/09/23/bacon-js-node-js-mongodb-functional-reactive-programming-on-the-server/
    Rx: onNext
      ref
        https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observer.md#rxobserverprototypeonnextvalue
      corresponds to Iterator.next()
        Iterator.next() pulls next value
        Subject.onNext(v) = Observer.onNext(v)
      code
        var observer = Rx.Observer.create(
            function (x) {
                console.log('Next: ' + x)
            },
            function (err) {
                console.log('Error: ' + err);
            },
            function () {
                console.log('Completed');
            }
        );
        observer.onNext(42);
        // => Next: 42
    Reactive Programming - RxJS vs EventEmitter in Node.js
      http://stackoverflow.com/questions/25338930/reactive-programming-rxjs-vs-eventemitter-in-node-js
      Rx streams and EventEmitter are similar
        both implement Observer pattern
      ex - EventEmitter
        eventEmitter.on('response', function(res) {
          setTimeout(function(){..}, 2000)
      ex - rx
        response_.delay(2000).subscribe(function(res) {
          ..
  Send HTTP Requests To a Server with Node.js
    http://shiya.io/send-http-requests-to-a-server-with-node-js/
    http.request(options, callback)
    ex: post request
      POST /authentication/v1/authenticate HTTP/1.1
      Host: developer.api.autodesk.com
      Content-Type: application/x-www-form-urlencoded
      client_id=my_client_id&client_secret=my_client_secret&grant_type=client_credentials
    ex: post
      var options = {
          host: "developer.api.autodesk.com",
          path: "/oss/v1/buckets",
          method: "POST",
          headers: {
              "Content-Type": "application/json"
              "Authorization": "Bearer token"
          }
      };
      var req = http.request(options, function (res) {
          var responseString = "";
          res.on("data", function (data) {
              responseString += data;
              // save all the data from response
          });
          res.on("end", function () {
              console.log(responseString); 
              // print to console when response ends
          });
      });
      req.write(); // sending the request
# unclassified

  Use EJS to Template Your Node Application
    https://scotch.io/tutorials/use-ejs-to-template-your-node-application
    ex
      <body class="container">
          <header>
              <% include ../partials/header %>
          </header>
  https://code.lengstorf.com/learn-rollup-js/
  good blogs
    https://webapplog.com/tag/node-js/
  next - articles_js id=g_10124
    next - articles_js <url:file:///~/Dropbox/mynotes/content/articles/articles_js.md#r=g_10124>
    ref
      next - js egzersiz <url:file:///~/Dropbox/mynotes/stuff.otl#r=g_10123>
    https://medium.freecodecamp.com/5-javascript-bad-parts-that-are-fixed-in-es6-c7c45d44fd81#.ht5ypbzbh
    https://medium.com/@rajaraodv/is-class-in-es6-the-new-bad-part-6c4e6fe1ee65#.8hcaar39k
  Wes Bos - Modern workflow and tooling for frontend developers-CiMGKZpnHQE.mp4
    build tools 
    browserify
    browsersync
    sourcemaps
  Wes Bos - Start Using ES6 Today-493p5FSFHz8.mp4
    string templating
      const markup = `${renderKeywords(beer.keywords)}`
      funcion renderKeywords(kw) {
        return `<ul>
          ${kw.map(key => `li>${key}`
    enhanced object literals
      const dog = {
        first: first,
        last: last
      -->
        first, last,
      method definition 
        var modal = {
          create: function(sel) {..
        -->
          create(sel) { ...
    Set
    destructuring
      create 3 variables in 1 shot
        const {first, second, last} = person
      rename while you destructure
        const { twitter: tweet, facebook:fb } = wes.links.social
      with arrays too
        const [name, id] = details
    onst details = ['wes', 123]
  What is Node.js Exactly - a beginners introduction to Nodejs-pU9Q6oiQNd0.mp4
    difference bw nodejs and browser console
      no window, no document object
      global process object
      var a = 1;
      global.a
        in node
      window.a
        in browser
    modules
      define
        module.exports.a = a;
      use
        var m2 = require('./folder1/module2')
        m2.a
      define
        module.exports = function() {..}
      use 
        var m2 = require('./folder1/module2')
        m2()
    npm
      npm init
      npm install
  Azat Mardan - You Don't Know Node.js - JSConf Iceland 2016-NLtL-EEclRc.mp4
    non-blocking
      event loop: non-blocking io
      single thread is better
      it is possible to write blocking code
        fs.readFileSync(..)
        doSth()
        -->
        fs.readFile(..) {
          doSth()
        }
    one language everywhere
      learn quicker
    deeply nested callbacks problem
      solution: events
      observer pattern
      ex
        var events = require("events")
        var emitter = new events.EventEmitter()
      listen
        emitter.on("knock", function() {..})
        emitter.on("knock", function() {..})
        emitter.emit("knock")
      we can have multiple observers
      ex: inheriting from EventEmitter
        job.js
          var util = require("util")
          var Job = function Job() {
            ..
            this.process = function() {
              ..
              job.emit("done", {completedOn: new Date()})
            }
          }
          util.inherits(Job, require("events").EventEmitter)
          module.exports = Job
        weekly.js
          var Job = require("./job.js")
          var job = new Job()
          job.on("done", funciton(details) {
            console.log("job completed", details.completedOn)
          }
          job.process()
    how to handle big data?
      streams
        inherit from Event Emitter
      ex
        http request
        stdin
        file reads
  What the... JavaScript-2pL28CcEijU.mp4
    author: YouDontKnowJS.com
    wtf: intentionally inconsistent, incoherent, unreasonable code
  Bootstrap
    Why Bootstrap Admin Templates suck?
      https://medium.com/@lukaszholeczek/jack-of-all-trades-master-of-none-5ea53ef8a1f
      why they aren't good enough?
        1. no direct contact between seller and user
          tons of unwanted features
        2. most bootstrap components are useless
  David Blurton - Full-stack JavaScript development with Docker - JSConf Iceland 2016-zcSbOl8DYXM.mp4

