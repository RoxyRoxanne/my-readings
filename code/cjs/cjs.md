_ id=r_lastid cjs_003

# Study JS

    js stl standard library
      JSON
        JSON.parse(string): object
          var json = '{"result":true, "count":42}';
          obj = JSON.parse(json);
          console.log(obj.count);
          // expected output: 42
    js idioms
      Object.keys
        <url:file:///~/projects/study/js/ex/study_js/idioms/001.js>
        // simple array
        var arr = ['a', 'b', 'c'];
        console.log(Object.keys(arr)); // console: ['0', '1', '2']
        // array like object
        var obj = { 0: 'a', 1: 'b', 2: 'c' };
        console.log(Object.keys(obj)); // console: ['0', '1', '2']
      export import 
        es6
          ex:
            <url:file:///~/codes/js/meeting-price-calculator/src/components/ticker/index.ts>
            ticker/index.js
              export default function Ticker(sources: Sources): Sinks {
              export const lens = {
            app/index.js
              import Ticker, { lens as tickerLens } from '../ticker';
            # summary
              export ettiysen {} ile import et
              export default ise Ticker from ... ile import et
      Method calling by condition
        // Boring
        if (success) {
         obj.start();
        } else {
         obj.stop();
        }
        // Hipster-fun
        var method = (success ? ‘start’ : ‘stop’);
        obj[method]();
      join string array to string
        [‘first’, ‘name’].join(‘ ‘); // = ‘first name’;
        [‘milk’, ‘coffee’, ‘suger’].join(‘, ‘); // = ‘milk, coffee, suger’
      default operator ||
        // default to ‘No name’ when myName is empty (or null, or undefined)
        var name = myName || ‘No name’;
        // make sure we have an options object
        var doStuff = function(options) {
         options = options || {};
         // …
        };
      guard operator &&
        // Boring
        if (isThisAwesome) {
         alert(‘yes’); // it’s not
        }
        // Awesome
        isThisAwesome && alert(‘yes’);
        // Also cool for guarding your code
        var aCoolFunction = undefined;
        aCoolFunction && aCoolFunction(); // won’t run nor crash
      xxx as todo placeholder
        var z = 15;
        doSomeMath(z, 10);
        xxx // Great placeholder. I’m the only one using xxx and it’s so easy to find in code instead of TODOs
        doSomeMoreMath(z, 15);
      timing
        var a = [1,2,3,4,5,6,7,8,9,10];
        console.time(‘testing_forward’);
        for (var i = 0; i < a.length; i++);
        console.timeEnd(‘testing_forward’);
        // output: testing_forward: 0.041ms
        console.time(‘testing_backwards’);
      debugger statement
        var x = 1;
        debugger; // Code execution stops here, happy debugging
        x++;
        var x = Math.random(2);
        if (x > 0.5) {
         debugger; // Conditional breakpoint
        }
      templating
        var firstName = ‘Tal’;
        var screenName = ‘ketacode’
        // Ugly
        ‘Hi, my name is ‘ + firstName + ‘ and my twitter screen name is @’ + screenName;
        // Super
        var template = ‘Hi, my name is {first-name} and my twitter screen name is @{screen-name}’;
        var txt = template.replace(‘{first-name}’, firstName)
         .replace(‘{screen-name}’, screenName);
      Swap variables using array destructuring
        let a = 'world', b = 'hello'
        [a, b] = [b, a]
        console.log(a) // -> hello
        console.log(b) // -> world
        // Yes, it's magic
      Async/Await with destructuring
        const [user, account] = await Promise.all([
          fetch('/user'),
          fetch('/account')
        ])
      console.log several variables with their names
        const a = 5, b = 6, c = 7
        console.log({ a, b, c })
        // outputs this nice object:
        // {
        //    a: 5,
        //    b: 6,
        //    c: 7
        // }
      One liners with array operations
        // Find max value
        const max = (arr) => Math.max(...arr);
        max([123, 321, 32]) // outputs: 321
        // Sum array
        const sum = (arr) => arr.reduce((a, b) => (a + b), 0)
        sum([1, 2, 3, 4]) // output: 10
      concat arrays with `spread` operator
        const one = ['a', 'b', 'c']
        const two = ['d', 'e', 'f']
        const three = ['g', 'h', 'i']
        // Old way #1
        const result = one.concat(two, three)
        // Old way #2
        const result = [].concat(one, two, three)
        // New
        const result = [...one, ...two, ...three]
      Clone objects with `spread`
        const obj = { ...oldObj }
        const arr = [ ...oldArr ]
      Named parameters
        const getStuffNotBad = (id, force, verbose) => {
          ...do stuff
        }
        const getStuffAwesome = ({ id, name, force, verbose }) => {
          ...do stuff
        }
        // Somewhere else in the codebase... WTF is true, true?
        getStuffNotBad(150, true, true)
        // Somewhere else in the codebase... I ❤ JS!!!
        getStuffAwesome({ id: 150, force: true, verbose: true })
      Double exclamation converts anything to boolean
        var foo = 0
        console.log(!!foo)
        //> false
        // equivalent to
        Boolean(foo)
      Converting arguments to array using slice
        (function() {
          console.log(arguments instanceof Array)
          //> false
          var args = Array.prototype.slice.call(arguments)
          console.log(args instanceof Array)
          //> true
        })()
      Converting to array if not already
        var totallyArray = [].concat(value)
        //instead of
        var totallyArray = value instanceof Array ? value : [value]
      Converting strings to number
        var foo = +'12.2'
        var bar = +'12'
        // instead of
        var foo = parseFloat('12.2')
        var bar = parseInt('12')
      Checking if an array includes an element using tilde operator 
        if (~[1, 2, 3].indexOf(2)) { console.log('includes') }
        // instead of
        if ([1, 2, 3].indexOf(2) > -1) { console.log('includes') }
      Writing multi-line strings
        var multiStr = [
          "This is the first line",
          "This is the second line",
          "This is more..."
        ].join("\n");
      Looping through an array
        for (var i = arr.length; i--;) {
          // ...
        }
        // instead of
        for (var i = 0; i < arr.length; i++) {
          // ...
        }
      setTimeout(func, 0): schedule a function to run after current event loop tick
        setTimeout(function() {
          console.log('log message from next tick')
        }, 0)
        console.log('Hello world!')
        //> Hello world!
        //> log message from next tick
      void 0 instead of `undefined`
        void 0 == undefined
      chaining
        function makeApple() {
            function setColor (color) {
                apple.color = color;
                return apple;
            }
            function setSize (size) {
                apple.size = size;
                return apple;
            }
            // hoisting will ensure this is declared in time.
            var apple = {
                setColor: setColor,
                setSize: setSize,
            };
            return apple;
        }
        var apple = makeApple();
        apple.setColor('red').setSize('large').setWeight('8 oz');
        console.log(apple);
        // {color: 'red', size: 'large', weight: '8 oz' ...}
      type checks
        // String:
        typeof variable === "string"
        // Number:
        typeof variable === "number"
        // Boolean:
        typeof variable === "boolean"
        // Object:
        typeof variable === "object"
        // Array:
        Array.isArray( arrayLikeObject )
        // (wherever possible)
        // Node:
        elem.nodeType === 1
        // null:
        variable === null
        // null or undefined:
        variable == null
        // undefined:
        // Global Variables:
        typeof variable === "undefined"
        // Local Variables:
        variable === undefined
        // Properties:
        object.prop === undefined
        object.hasOwnProperty( prop )
        "prop" in object
      string is empty
        // instead of this:
        if ( string !== "" ) ...
        // ...evaluate truthiness, like this:
        if ( string ) ...
        // When only evaluating that a string _is_ empty,
        // instead of this:
        if ( string === "" ) ...
        // ...evaluate falsy-ness, like this:
        if ( !string ) ...
      == vs ===
        // === does not coerce type, which means that:
        "1" === 1;
        // false
        // == does coerce type, which means that:
        "1" == 1;
        // true
      truthy falsy
        // Truthy:
        "foo", 1
        // Falsy:
        "", 0, null, undefined, NaN, void 0
      naming
        camelCase; function and var declarations
        // 6.A.3.4
        // Naming constructors, prototypes, etc.
        PascalCase; constructor function
        // 6.A.3.5
        // Naming regular expressions
        rDesc = //;
        // 6.A.3.6
        // From the Google Closure Library Style Guide
        functionNamesLikeThis;
        variableNamesLikeThis;
        ConstructorNamesLikeThis;
        EnumNamesLikeThis;
        methodNamesLikeThis;
        SYMBOLIC_CONSTANTS_LIKE_THIS;
      if then else with && and ||
        ex
          if (userName) {
            logIn (userName);
          }
           else {
             signUp ();
          }
          // ->
          userName && logIn (userName) || signUp ();
        ex
          var userID;
          if (userName && userName.loggedIn) {
            userID = userName.id;
          }
          else {
            userID = null;
          }
          // ->
          var userID = userName && userName.loggedIn && userName.id
    babel
      double colon (bind operator)
        https://stackoverflow.com/questions/31220078/javascript-double-colon-bind-operator
          ::this.handle
          =>
          this.handle.bind(this)
          method extraction
            ::obj.method = obj.method.bind(obj)
          virtual method calls
            obj::function = function.bind(obj)
            obj::function(...) = function.call(obj, ...)
      example: spread operator for objects es2017 stage-3
        <url:file:///~/codes/js/todomvc-cycle-onion/.babelrc>
        .babelrc
          {
            "presets": ["es2015"],
            "plugins": ["transform-object-rest-spread"]
          }
        package.json
          "devDependencies": {
            "babel-preset-env": "^1.7.0",
            "babel-plugin-transform-object-rest-spread": "^6.6.5",
            "babel-preset-es2015": "^6.3.13",
            "babel-register": "^6.4.3",
            "babelify": "^7.2.0",
    chrome devtools debug tools
      ref
        <url:file:///~/projects/study/js/study_chrome_devtools.Rmd>
      chrome'da yaptığın değişikliklerin dosya sistemine kaydedilmesi 
        https://developers.google.com/web/tools/setup/setup-workflow
        debug > source > right > Add Folder to Workspace
        .select a file > Map to File System Resource
      current element in inspector:
        $0
      previous element:
        $1 $2 ...
      find an element like jquery:
        $('span') // finds one element
        $$('span') // finds all elements
        $x('html/body/div') // find by path
        inspect($('span')) // select in inspector
      monitor events on web page
        monitorEvent($('h1'), 'click')
      dom breakpoint
        inspector > .select element > Break on ... > Subtree Modifications
    cyclejs
      ref
        <url:file:///~/projects/study/js/study_learn_rxjs.Rmd>
        <url:file:///~/projects/study/js/study_rxjs.Rmd>
        <url:file:///~/projects/study/js/study_rxjs_manual.Rmd>
        <url:file:///~/projects/study/js/study_notes_cyclejs.Rmd>
        <url:file:///~/projects/study/js/study_cyclejs_onion_architecture.Rmd>
        <url:file:///~/projects/study/js/study_cyclejs_router.Rmd>
        <url:file:///~/projects/study/problem/datatables_in_cyclejs/datatables_in_cyclejs.Rmd>
        <url:file:///~/projects/study/js/vrp/cyclejs_vrp.Rmd>
      current
        debug
          debugger statement
            function createNewItem(props) {
              const id = mutableLastId++;
              const sinks = itemFn(props, id);
              debugger
              return {id, DOM: sinks.DOM.remember(), Remove: sinks.Remove};
            }
          write data shape
            var toHTML = require('snabbdom-to-html')
            global.toHTML = toHTML
            ...
            .debug(x => {
              console.log("todo$")
              console.log(x)
            })
            .debug( x => {
              global.x = x
              console.log(toHTML(x))
            } )
            .debug( x => console.log(x))
            .debug(console.log)
          bir node modülünün kodunu değiştirmek
            parcel-bundler
              ref
                /Users/mertnuhoglu/projects/study/js/vrp/ex/cyclejs_vrp/ex15/src06e04/components/app/index.js
              import isolate from '@cycle/isolate';
              ->
              import isolate from './isolate';
              put isolate.ts from node_modules
              remove package.json dependency
              npm parcel
        npm
          npm install
            pnpm i --save-dev parcel-bundler 
            npm i 
            xstream @cycle/run @cycle/dom @cycle/http 
            cycle-onionify cycle-storageify @cycle/storage
            typestyle bootstrap jquery jquery-ui-dist popper.js
            handsontable
            datatables.net datatables.net-dt
          package.json
            "start": "parcel src/index.html",
            "build": "parcel build src/index.html --public-url ./",
        import es6
          import xs from 'xstream';
          import {run} from '@cycle/run'
          import {div, input, p, makeDOMDriver} from '@cycle/dom';
            paqmind: html to hyperscript converter
            vim :ConvertHyperscriptToCyclejs
          import {makeHTTPDriver} from '@cycle/http';
          import delay from 'xstream/extra/delay'
          rxjs
            import {range} from 'rxjs/observable/range'
            import {map, filter, scan} from 'rxjs/operators'
            import {_throw} from 'rxjs/observable/throw'
            require rxjs
              const { Observable, Subject, ReplaySubject, from, of, range } = require('rxjs');
              const { map, filter, switchMap } = require('rxjs/operators');
          require 
            const {div} = require('@cycle/dom');
            const xs = require('xstream').default
            const delay = require('xstream/extra/delay').default
        run
          run(main, drivers)
          run(main, {
            DOM: makeDOMDriver('#app'),
            });
          opt
            npm install @cycle/rxjs-run rxjs
            import {run} from '@cycle/rxjs-run'
        xs
          DOMSource
            const clickEvent$ = sources.DOM
              .select('.get-first').events('click')
              .startWith(null);
          http request
            let request$ = xs.of({
              url: 'http://localhost:8080/hello', // GET method by default
              category: 'hello',
              });
            ex: oauth
              const request$ = clickEvent$.map(() => {
                return {
                  url: 'http://localhost:8080/rest/plan?select=plan_id,usr,depot_id',
                  method: 'GET',
                  headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoid2VidXNlciJ9.uSsS2cukBlM6QXe4Y0H90fsdkJSGcle9b7p_kMV1Ymk"
          http response
            let response$ = sources.HTTP
              .select('hello')
              .flatten();
            const response$$ = sources.HTTP.select();
              const response$ = response$$.flatten();
              const json$ = response$.map(response => response.body);
          vdom
            let vdom$ = response$
              .map(res => res.text) // We expect this to be "Hello World"
              .startWith('Loading...')
              .map(text =>
                div('.container', [
                  h1(text)
                ])
              );
            ex: table with data
              DOM: json$.
                map(json =>
                  table([
                    thead(
                      tr([
                        th('Plan Id'),
                        th('Kullanıcı'),
                        th('Depot Id')
                      ])
                    ),
                    tbody(
                      json.map(e => 
                        tr([
                          td(e.plan_id),
                          td(e.usr),
                          td(e.depot_id)
            DOM: sources.DOM.select('input').events('change')
              .map(ev => ev.target.checked)
              .startWith(false)
              .map(toggled =>
                div([
          drivers
            const drivers = {
              DOM: makeDOMDriver('#app'),
              HTTP: makeHTTPDriver(),
          return
            return {
              DOM: vdom$,
              HTTP: request$
              };
          operators
            const count$ = action$.fold((x, y) => x + y, 0);
        design
          import
            import model from './model';
            import view from './view';
            import intent, { Actions } from './intent';
          jquery bootstrap handsontable
            import jquery from "jquery";
            export default (window.$ = window.jQuery = jquery);
            import 'bootstrap';
            import 'bootstrap/dist/css/bootstrap.min.css';
            import 'handsontable/dist/handsontable.full.min.css'
            const Handsontable = require('handsontable/dist/handsontable.full.min.js')
          handsontable
            ref
              <url:file:///~/projects/study/problem/datatables_in_cyclejs/ex/ex10/index_06.js>
            use
              const sinks = {
                Hot: xs.periodic(2000)
                  .map(i => {...
              }
              const drivers = {
                Hot: HotDriver,
            driver for handsontable
              function HotDriver(data$) {
                data$.addListener({
                  next: data => {
                    hot.loadData(data)
                  }}
                )
                var producer = {
                  start: function(observer) {
                    hot.addHook('afterChange', function () {
                      observer.next(hot.getSourceData())
                    })
                  },
                  stop: function () {
                    console.log("stopped")
                  }
                }
                const HotSource = xs.create(producer)
                return HotSource
              }
          datatables
            ref
              <url:file:///~/projects/study/problem/datatables_in_cyclejs/datatables_in_cyclejs.Rmd>
              <url:file:///~/projects/study/problem/datatables_in_cyclejs/ex/ex05/src/index.js>
            import
              const dt = require( 'datatables.net' )();
              import 'datatables.net-dt/css/jquery.dataTables.css'
            read: datatables -> cyclejs
            write: cyclejs -> datatables
              vdom$.subscribe({
                next: (value) => {
                  jQuery('#table_id').DataTable( {        
                    data: data,
                    columns: [
                      { data: 'name' },
          intent model view
            ex01
              const json$ = model(sources.HTTP);
              return {
                DOM: view(json$),
                HTTP: intent(sources.DOM),
          components
            vdom
              const vdom$ = xs.combine(
                Header(),
                PlanPanel(state$),
              ).map( ([header, plan_panel]) =>
                div(
                  [
                    header,
                    plan_panel,
          bootstrap
            ul("#planlama.nav.nav-tabs", {
              "attrs": {
                "role": "tablist",
      v6 rxjs based cyclejs id=cjs_003
        v6 rxjs based cyclejs <url:#r=cjs_003>
        importing
          ref
            <url:file:///~/projects/study/js/study_notes_cyclejs.Rmd>
          <script> importing in html
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.5.6/Rx.min.js"></script>
            <script src="https://rawgit.com/cyclejs/cycle-core/v6.0.0/dist/cycle.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/4.0.6/rx.all.js"></script>
        run
        driver
          using
            <url:file:///~/projects/study/js/study_notes_cyclejs.Rmd>
            function main() {
              return {
                DOM: Rx.Observable.timer(0, 1000)
                  .map(i => `Seconds ${i}`),
                Log: Rx.Observable.timer(0, 2000)
                  .map(i => 2*i),
        subscribe
          Rx.Observable.fromEvent(button, 'click')
            .subscribe(() => console.log('Clicked!'));
          var observable = Rx.Observable.create(function (observer) {
            ...}
            observable.subscribe({
              next: x => console.log(`${x}`),
              error: err => console.error(`error ${err}`),
              complete: () => console.log('done')
            })
          var foo = Rx.Observable.create(function (observer) {
            console.log('Hello');
            observer.next(42);
            });
            foo.subscribe(function (x) {
              console.log(x);
            });
          var subject = new Rx.Subject();
            subject.subscribe({
              next: (v) => console.log('observerA: ' + v)
          var subject = new Rx.Subject();
            subject.subscribe({
              next: (v) => console.log('observerB: ' + v)
            });
            var observable = Rx.Observable.from([1, 2]);
            observable.subscribe(subject); 
        rx
          ref
            <url:file:///~/projects/study/js/study_notes_cyclejs.Rmd>
          factory
            Rx.Observable.create
              var observable = Rx.Observable.create(function (observer) {
                observer.next(1)
                observer.next(2)
                setTimeout(() => {
                  observer.next(3)
                  observer.complete()
                }, 1000)
                })
              var observable = Rx.Observable.create(function subscribe(observer) {
                try {
                  observer.next(1);
                  observer.next(2);
            var observable = Rx.Observable.from([10, 20, 30]);
            Rx.Observable.timer(0, 1000)
              .map(i => `Seconds ${i}`)
              .subscribe(text => {
                const container = document.querySelector('#app');
                container.textContent = text;
              })
            const DOMSource = Rx.Observable.fromEvent(document, 'click');
            var clock = Rx.Observable.interval(1000).take(3).map(x => x+1);
            const source = Rx.Observable.of(1, 2, 3, 4, 5);
            var req$ = Rx.Observable.just('https://api.github.com/users') // deprecated
          operators
            .flatMapLatest(() =>
              Rx.Observable.timer(0, 1000)
                .map(i => `Seconds ${i}`)
            return Rx.Observable.fromEvent(document, eventType)
              .filter(ev => ev.target.tagName === tagName.toUpperCase());
            Rx.Observable.fromEvent(button, 'click')
              .scan(count => count + 1, 0)
            Rx.Observable.fromEvent(button, 'click')
              .throttleTime(1000)
              .scan(count => count + 1, 0)
              .subscribe(count => console.log(`Clicked ${count} times`));
            var foo = Rx.Observable.interval(100).take(3)
              var more = Rx.Observable.of(3,4,5)
              var bar = foo.concat(more)
            foo.combineLatest(bar, (x,y) => x + y)
            foo.withLatestFrom(bar, (x,y) => y === 1 ? x.toUpperCase() : x.toLowerCase())
            zip((x,y) => x + y)
            bufferCount(2)
          combinations
            var observable1 = Rx.Observable.interval(1000);
              var observable2 = Rx.Observable.interval(400);
              var merged = Rx.Observable.merge(observable1, observable2);
            const number$ = Rx.Observable.of(10)
              .merge(decrementAction$)
              .merge(incrementAction$)
              .scan( (prev, curr) => prev + curr)
            const state$ = Rx.Observable.combineLatest(
              changeWeight$.startWith(70),
              changeHeight$.startWith(170),
              (weight, height) => {
                const heightMeters = height * 0.01;
                const bmi = Math.round(weight / heightMeters * heightMeters));
                return {bmi, weight, height};
          custom  id=cjs_002
            custom  <url:#r=cjs_002>
            ex01: multiplyByTen
              function multiplyByTen() {
                var source = this;
                var result = Rx.Observable.create(function subscribe(observer) {
                  source.subscribe(
                    function (x) { observer.next(x*10)},
                    function (err) { observer.error(err) },
                    function () { observer.complete() }
                  )
                })
                return result
              }
              Rx.Observable.prototype.multiplyByTen = multiplyByTen
              var bar = foo.multiplyByTen()
            ex02: map
              function map(project) {
                var source = this;
                var result = Rx.Observable.create(function subscribe(observer) {
                  source.subscribe(
                    function (x) { observer.next(project(x))},
                    function (err) { observer.error(err) },
                    function () { observer.complete() }
                  )
                })
                return result
              }
              Rx.Observable.prototype.map = map
              var bar = foo.map(x => x * 10)
            ex03: takeEveryNth
              const takeEveryNth = (n: number) => filter((value, index) => index % n === 0)
              interval(1000).pipe(
                takeEveryNth(2),
          let pipe
            source$.let(op) -> source$.pipe(op)
            interval(1000).pipe(
              takeEveryNth(2),
              map(x => x + x),
              take(3),
              toArray()
              )
          v5
            | old name | new name   |
            | op       | tap        |
            | catch    | catchError |
            | switch   | switchAll  |
            | finally  | finalize   |
            | let      | pipe       |
        js
          setTimeout(function () {
            clock.subscribe(i => console.log('   b: ' + i));
            }, 1500);
        dom
          var refreshButton = document.querySelector('.refresh')
          setup
            npm install @cycle/dom
      xstream based cyclejs
      router
        ref
          https://github.com/SteveALee/cycle-spa-template
      cyclejs design  id=g_10207
        cyclejs design  <url:file:///~/Dropbox/mynotes/content/code/cjs/cjs.md#r=g_10207>
        makeDOMDriver
      onion architecture id=g_10196
        onion architecture <url:file:///~/projects/study/study_js.md#r=g_10196>
        ref
          https://github.com/olpeh/meeting-price-calculator/
        index.js intent.js model.js view.js styles.js 
          ex: ticker
            export function Ticker(sources): Sinks
            export function model(timeSource: TimeSource): xs<Reducer> {
            export function view(state$: xs<State>): xs<VNode> {
            export const styles = stylesheet({
          ex: sliderInput
            export function SliderInput(sources: Sources): Sinks {
            export function intent(domSource): SliderInputActions {
            export function model(actions: SliderInputActions): xs<Reducer> {
            export function view(state$: xs<State>): xs<VNode> {
            export const styles = stylesheet({
          ex: controls  
            export function Controls(sources): Sinks
            export default function intent(domSource): Actions {
            export default function model(actions: Actions): xs<Reducer> {
            export default function view( state$: xs<State>, personAmountSliderVDom$: xs<VNode>, avgPriceSliderVDom$: xs<VNode>): xs<VNode> {
        index.js
          ex: controls/index.js
            export interface State {
            export const lens = {
            export default function Controls(sources: Sources): Sinks {
              # intent model view
        export interface State
          export interface State {
            description: string;
            unit: string;
            min: number;
        lenses
          ex: controls/index.js
            export const lens = {
              get: (state: AppState): State => ({
                currency: state.currency,
                personAmount: state.personAmount,
                avgPrice: state.avgPrice
              }),
              set: (state: AppState, childState: State) => ({
                ...state,
                currency: childState.currency,
                personAmount: childState.personAmount,
                avgPrice: childState.avgPrice
              })
            };
          ex: sliderInput/index.js
            export const personAmountLens = {
              get: (state: AppState): State => ({
                description: 'Person amount',
                unit: state.personAmount > 1 ? 'persons' : 'person',
                min: 1,
                max: 100,
                step: 1,
                value: state.personAmount
              }),
              set: (state: AppState, childState: State) => ({
                ...state,
                personAmount: childState.value
              })
            };
            export const avgPriceLens = {
              get: (state: AppState): State => ({
                description: 'Average price',
        main: intent model view
          ex: app/index.js
            sources -> subcomponent sinks
              const tickerSinks = isolate(Ticker, { onion: tickerLens })(sources);
            [model] + subcomponent.onion -> reducer$ 
              const parentReducer$ = model();
              const reducer$ = xs.merge( parentReducer$, tickerSinks.onion,..
            sources.onion.state$ -> state$ + subcomponent.DOM -> [view] -> vdom$
            const headerVDom$: xs<VNode> = Header();
            const vdom$ = xs.combine( headerVDom$, tickerSinks.DOM, ..
          ex: controls/index.ts function Controls:
            sources -> subcomponent sinks
              const personAmountSlider: Sinks = isolate(SliderInput, { onion: personAmountLens })(sources);
            sources.DOM -> [intent] -> actions -> [model] + subcomponent.onion -> reducer$ 
              const actions: Actions = intent(sources.DOM);
              const parentReducer$: xs<Reducer> = model(actions);
              const personAmountReducer$: xs<Reducer> = personAmountSlider.onion;
              const reducer$: xs<Reducer> = xs.merge( parentReducer$, personAmountReducer$, ..
            sources.onion.state$ -> state$ + subcomponent.DOM -> [view] -> vdom$
              const state$: xs<State> = sources.onion.state$;
              const vdom$ = view(state$, personAmountSlider.DOM, avgPriceSlider.DOM);
          ex: sliderInput/index.ts function SliderInput
            sources.DOM -> [intent] -> actions -> [model] + subcomponent.onion -> reducer$ 
              const actions: SliderInputActions = intent(sources.DOM);
              const reducer$: xs<Reducer> = model(actions);
            sources.onion.state$ -> state$ + subcomponent.DOM -> [view] -> vdom$
              const state$: xs<State> = (sources.onion.state$ as any) as xs<State>;
              const vdom$: xs<VNode> = view(state$);
          ex: ticker/index.ts function Ticker
            sources.Time -> [model] + subcomponent.onion -> reducer$ 
              const reducer$: xs<Reducer> = model(sources.Time);
            sources.onion.state$ -> state$ + subcomponent.DOM -> [view] -> vdom$
              const state$: xs<State> = (sources.onion.state$ as any) as xs<State>;
              const vdom$ = view(state$);
          ex: header/index.ts function Header
            sources.Time -> [model] + subcomponent.onion -> reducer$ 
              const reducer$: xs<Reducer> = model(sources.Time);
            const state$: xs<State> = (sources.onion.state$ as any) as xs<State>;
              const state$: xs<State> = (sources.onion.state$ as any) as xs<State>;
              const vdom$ = view(state$);
        data flow
          complete cycle
            {DOMSource} -> [App.intent] -> {action$} -> [App.model] -> {reducer$} -> [onion] -> {state$} -> [App.view] -> {vdom$} -> [DomDriver] -> {DOMSource}
          DOM -> state
            sources.DOM -> action$ -> reducer_i$ -> reducer$ -> sinks.onion
              act1$ = sources.DOM.select(..)
              red1$ = act1$.map(num => state => {count: state.count + num})
              red$ = xs.merge(red1$, red2$, ...)
              return {onion: red$, DOM: vdom$}
          state -> DOM
            sources.onion.state -> state$ -> vdom$ -> sinks.DOM
              state$ = onion.sources.state
              vdom$ = state$.map(..)
              return {onion: red$, DOM: vdom$}
        use subcomponents:
          ex: app/index.js
            const tickerSinks = isolate(Ticker, { onion: tickerLens })(sources);
            const controlsSinks = isolate(Controls, { onion: controlsLens })(sources);
          ex: controls/index.js
            const personAmountSlider: Sinks = isolate(SliderInput, { onion: personAmountLens })(sources);
            const avgPriceSlider: Sinks = isolate(SliderInput, { onion: avgPriceLens })(sources);
        intent()
          ex: controls/intent.js
            export default function intent(domSource): Actions {
              const currencyChangeAction$: xs<string> = domSource
                .select(`.${styles.currencySelect}`)
                .events('change')
                .map(inputEv => (inputEv.target as HTMLInputElement).value);
          ex: sliderInput/intent.js
            export default function intent(domSource): SliderInputActions {
              const ValueChangeAction$ = domSource
                .select('.SliderInput-input')
                .events('input')
                .map(inputEv => parseInt((inputEv.target as HTMLInputElement).value));
        model()
          ex: app/model.js
            export default function model(): xs<Reducer> {
              const initReducer$: xs<Reducer> = xs.of(
                (prev?: State): State =>
                  prev !== undefined
                    ? prev
                    : {
                        startTime: moment(),
                        duration: 0,
          ex: ticker/model.js
            export default function model(timeSource: TimeSource): xs<Reducer> {
              const initReducer$: xs<Reducer> = xs.of(
                (prev?: State): State =>
                  prev !== undefined
                    ? prev
                    : {
                        startTime: moment(),
                        duration: 0,
              const tickReducer$: xs<Reducer> = timeSource
                .periodic(1000)
                .map(i => (prevState: State): State => ({
                  ...prevState,
                  duration: moment().diff(prevState.startTime, 'seconds')
              return xs.merge(initReducer$, tickReducer$);
          ex: sliderInput/model.js
            export default function model(actions: SliderInputActions): xs<Reducer> {
              const defaultReducer$: xs<Reducer> = xs.of(
                (prev?: State): State =>
                  prev !== undefined
                    ? prev
                    : {
                        description: 'description',
                        unit: 'unit',
              const valueChangeReducer$: xs<Reducer> = actions.ValueChangeAction$.map(
                value => (prevState: State): State => ({
                  ...prevState,
                  value
              return xs.merge(defaultReducer$, valueChangeReducer$);
        setter lens: [model] -> reducer$ -> [onion]
          ex: sliderInput/
            model.js
              const valueChangeReducer$ = actions.ValueChangeAction$.map(
                value => (prevState) => ({
                  ...prevState,
                  value
            index.js
              const personAmountLens = {
                get: (state) => ({ ...
                set: (state: AppState, childState: State) => ({
                  ...state,
                  personAmount: childState.value
              export const avgPriceLens = {
                get: (state) => ({ ...
                set: (state: AppState, childState: State) => ({
                  ...state,
                  avgPrice: childState.value
          ex: ticker/
            model.js
              const tickReducer$ = timeSource
                .periodic(1000)
                .map(i => (prevState) => ({
                  ...prevState,
                  duration: moment().diff(prevState.startTime, 'seconds')
            index.js
              export const lens = {
                get: (state) => ...
                set: (state: AppState, childState: State) => ({
                  ...state,
                  duration: childState.duration
        initReducer
          const initReducer$: xs<Reducer> = xs.of(
            (prev?: State): State =>
              prev !== undefined
                ? prev
                : {
                    startTime: moment(),
                    duration: 0,
        view()
          ex: sliderInput/view.js
            export default function view(state$: xs<State>): xs<VNode> {
              return state$.map(({ description, unit, min, max, step, value }) =>
                div(`.${styles.sliderInput}`, [
          ex: ticker/view.js
            export default function view(state$: xs<State>): xs<VNode> {
              return state$.map(({ currency, totalPrice }) =>
                div(`.${styles.actualPrice}`, [
        styles
          ex: app/styles.js
            export const styles = stylesheet({
              flexContainer: {
                height: '100%',
          ex: ticker/styles.js
            export const styles = stylesheet({
              actualPrice: {
                justifyContent: 'center'
          ex: sliderInput/styles.js
            export const styles = stylesheet({
              sliderInput: {
                display: 'flex',
                flexDirection: 'column',
        App State and App Sources & Sinks
          import { Sources, Sinks } from '../../interfaces';
          import { State as AppState } from '../app';
        interfaces.js
          export type Sources = {
            DOM: DOMSource;
            onion: StateSource<State>;
          export type Sinks = {
            DOM: xs<VNode>;
        header.js footer.js
          export default function Header(): xs<VNode> {
            return xs.of(
              header(`.${headerStyles}`, [h1('Header-title', 'Meeting price calculator')])
        App
          index.js
            vdom$
              const headerVDom$: xs<VNode> = Header();
              const vdom$ = xs
                .combine(
                  headerVDom$,
                  tickerSinks.DOM,
              .map(([header, ticker, controls, duration, footer]) =>
                div(`.${styles.flexContainer}`, [
                  header,
        setup onion
          app.js
            <url:file:///~/codes/js/todomvc-cycle-onion/src/app.js>
            import onionify from 'cycle-onionify';
            import TaskList from './components/TaskList/index';
            const main = onionify(storageify(TaskList, {key: 'todos-cycle'}));
          TaskList/index.js
            <url:file:///~/codes/js/todomvc-cycle-onion/src/components/TaskList/index.js>
            export default function TaskList(sources) {
              const state$ = sources.onion.state$;
              const listSinks = isolate(List, {onion: listLens})(sources);
              const listReducer$ = listSinks.onion;
              const reducer$ = xs.merge(parentReducer$, listReducer$);
              return {
                DOM: vdom$,
                onion: reducer$,
      running cyclejs examples
        git clone https://github.com/cyclejs/cycle-examples
        cd cycle-examples
        cd hello-world
        npm start
        open index.html
      errors
        error: ParseError: 'import' and 'export' may appear only with 'sourceType: module'
          browserify ile build edince oldu, parcel ile olmadı
          çözüm (geçici)
            jsutils_mn dosyasını çıkart
            npm link'le ilgili olabilir
        handsontable component is first shown then becomes invisible
          cause:
            <div> element should have an ending match:
            error:
              <div id="app" />
              <table id="example" class="display">
              </table>
            solution:
              <div id="app"></div>
              <table id="example" class="display">
              </table>
      idioms - cyclejs id=g_10200
        idioms - cyclejs <url:file:///~/Dropbox/mynotes/content/code/cjs/cjs.md#r=g_10200>
        sources.DOM
          const firstName$ = sources.DOM
            .select('.first')
            .events('input')
            .map(ev => (ev.target as HTMLInputElement).value)
            .startWith('');
          const rawFullName$ = xs.combine(firstName$, lastName$)
            .remember();
          events:
            event types
              blur
              click
              focus
              input
              keydown
              mousedown
              mouseenter
              mouseup
              dblclick
              focusout
            kullanım örnekleri
              const click$ = sources.DOM.select('.link').events('click');
              click$: domSource.events('click').mapTo(1),
              return domSource.select('.slider').events('input').map(ev => ev.target.value);
              const input$ = domSource.select('.autocompleteable').events('input')
              const keydown$ = domSource.select('.autocompleteable').events('keydown')
              const itemHover$ = domSource.select('.autocomplete-item').events('mouseenter')
              const itemMouseDown$ = domSource.select('.autocomplete-item').events('mousedown')
              const itemMouseUp$ = domSource.select('.autocomplete-item').events('mouseup')
              const inputFocus$ = domSource.select('.autocompleteable').events('focus')
              const inputBlur$ = domSource.select('.autocompleteable').events('blur')
          submit yerine button mousedown
            <url:file:///~/codes/js/front-end-reactive-architectures/9781484231791/examples/weather-onionify/src/CityForm.js>
            const input$ = DOM.select("#location-input").events("focusout")
                              .map(evt => evt.target.value);
            const btn$ = DOM.select("#location-btn").events("mousedown");  
            return xs.combine(input$, btn$)
                     .map(([city, mouseEvt]) => getRequest(city))
                     .startWith(getRequest(INIT_CITY))
          filter by keycode
            eaterCancelEdit$: dom.get('.edit-eater', 'keypress') // deprecated
                .filter(ev => ev.keyCode === 27)
                .map(ev => ev.target.getAttribute('data-index'))
          filter if match regex
            eaterAdd$: dom.get('.new-eater', 'keypress') // deprecated
                .filter(ev => ev.keyCode === 13)
                .map(ev => ev.target.value.match(/^([^:]*)[:\s]+(\d+(\.\d*)?)$/))
                .filter(match => match)
                .map(match => ({name: match[1], servings: parseInt(match[2], 10)}))
        HTTP
          request
            <url:file:///~/codes/js/front-end-reactive-architectures/9781484231791/examples/weather-onionify/src/CityForm.js>
            const getRequest = city => ({
                    type: CITY_SEARCH,
                    city: city,
                    url: `http://api.apixu.com/v1/forecast.json?key=04ca1fa2705645e4830214415172307&q=${city}&days=7`,
                    category: CATEGORY
            })
            const intent = DOM => {
              return xs.combine(input$, btn$)
                       .map(([city, mouseEvt]) => getRequest(city))
                       .startWith(getRequest(INIT_CITY))
            const actions$ = intent(sources.DOM);
            return { HTTP: actions$ }
            const reducer$ = model(actions$, sources.HTTP);
            const model = (actions$, HTTP) => {
                const reducer$ = HTTP.select(CATEGORY)
                           .flatten()
                           .map(parseResponse)
                           .map(simplifyData)
                return reducer$
            const parseResponse = response => JSON.parse(response.text);
            const simplifyData = data => function changeState(prevState) {
                                            return {
                                                city: data.location.name,
                                                current: data.current,
                                                forecasts: data.forecast.forecastday
                                            }
                                        }
            return { onion: reducer$, }
        action types
          intent: {insertTodo$:..., }
            <url:/Users/mertnuhoglu/codes/js/todomvc-cycle-onion/src/components/TaskList/intent.js#tn=export default function intent(domSource, historySource) {>
            ex: todomvc-onion
              intent()
                export default function intent(domSource, historySource) {
                  return {
                    changeRoute$: historySource...
                    updateInputValue$: domSource...
              model()
                export default function model(actions) {
                  const changeRouteReducer$ = actions.changeRoute$...
                  const updateInputValueReducer$ = actions.updateInputValue$...
          intent: mapTo({type: "addChild"})
            ex: nested-folders
              intent
                <url:/Users/mertnuhoglu/codes/js/cyclejs/examples/advanced/nested-folders/src/Folder.js#tn=function intent(domSource) {>
                function intent(domSource) {
                  const addChild$ = domSource.select('.add').events('click')
                    .mapTo({type: 'addChild'})
                  const removeSelf$ = domSource.select('.remove').events('click')
                    .mapTo({type: 'removeSelf'})
                  return xs.merge(addChild$, removeSelf$)
              using in model
                const addChildReducer$ = action$
                  .filter(({type}) => type === 'addChild')
            ex: many/List
              <url:/Users/mertnuhoglu/codes/js/cyclejs/examples/advanced/many/src/List.js>
              intent
                <url:/Users/mertnuhoglu/codes/js/cyclejs/examples/advanced/many/src/List.js#tn=function intent(domSource, itemRemove$) {>
                domSource.select('.add-one-btn').events('click')
                  .mapTo({type: 'ADD_ITEM', payload: 1}),
                domSource.select('.add-many-btn').events('click')
                  .mapTo({type: 'ADD_ITEM', payload: 1000}),
                itemRemove$.map(id => ({type: 'REMOVE_ITEM', payload: id}))
              using in model
                const addItemReducer$ = action$
                  .filter(a => a.type === 'ADD_ITEM')
                const removeItemReducer$ = action$
                  .filter(a => a.type === 'REMOVE_ITEM')
                return xs.merge(addItemReducer$, removeItemReducer$)
                  .fold((listItems, reducer) => reducer(listItems), initialState);
          ne zaman merge, ne zaman action$ objesi dönülüyor?
            {type: 'ADD', payload: 10} şeklinde veriye dönüştürürsen, merge
            eğer doğrudan action$ dönülecekse, obje olarak dönülüyor
              actions.xEvent$
        Collection subcomponents:
          ex:
            <url:/Users/mertnuhoglu/codes/js/cyclejs/examples/advanced/nested-folders/src/Folder.js#tn=export default function Folder(sources) {>
            import {makeCollection} from 'cycle-onionify'
            const Children = makeCollection({
              item: Folder,
              itemKey: state => state.id,
              itemScope: key => key,
              collectSinks: instances => ({
                onion: instances.pickMerge('onion'),
                DOM: instances.pickCombine('DOM')
              })
            })
            const childrenSinks = isolate(Children, 'children')(sources)
        typeof prevState === 'undefined'
          ex:
            <url:/Users/mertnuhoglu/codes/js/cyclejs/examples/advanced/nested-folders/src/Folder.js#tn=    if (typeof prevState === 'undefined') {>
            if (typeof prevState === 'undefined') {
              return {id: 0, removable: false, children: []}
        model: reducer ...prevState
          ex:
            <url:/Users/mertnuhoglu/codes/js/cyclejs/examples/advanced/nested-folders/src/Folder.js#tn=  const addChildReducer$ = action$>
            .mapTo(function addFolderReducer(state) {
              ...
              return {
                ...state,
                children: newChildren,
              }
        model: reducer action$.mapTo
          ex:
            <url:/Users/mertnuhoglu/codes/js/cyclejs/examples/advanced/nested-folders/src/Folder.js#tn=  const addChildReducer$ = action$>
          const addChildReducer$ = action$
            .mapTo(function addFolderReducer(state) {
              ...
        merge vs combine
          ex:
            <url:file:///~/codes/js/cyclejs/examples/advanced/nested-folders/src/Folder.js>
            function intent(domSource) {
              ...
              return xs.merge(addChild$, removeSelf$)
            function view(state$, childrenVDOM$) {
              return xs.combine(state$, childrenVDOM$)
                .map(([state, childrenVDOM]) => {
            function model(action$) {
              ...
              return xs.merge(initReducer$, addChildReducer$, removeSelfReducer$)
            const reducer$ = xs.merge(parentReducer$, childrenSinks.onion)
        state.removable && button(...)
          ex:
            <url:/Users/mertnuhoglu/codes/js/cyclejs/examples/advanced/nested-folders/src/Folder.js#tn=function view(state$, childrenVDOM$) {>
            state.removable && button('.remove', ['Remove me']),
            state.children && div({}, childrenVDOM),
        imitate: action for removing items
          ex:
            <url:/Users/mertnuhoglu/codes/js/cyclejs/examples/advanced/many/src/List.js#tn=function List(sources) {>
            const proxyItemRemove$ = xs.create();
            const action$ = intent(sources.DOM, proxyItemRemove$);
            const itemWrapper = makeItemWrapper(sources.DOM);
            const items$ = model(action$, itemWrapper);
            const itemRemove$ = items$
              .map(items => xs.merge(...items.map(item => item.Remove)))
              .flatten()
            proxyItemRemove$.imitate(itemRemove$);
            const vtree$ = view(items$);
            # neden dataset yerine imitate kullanmış?
        allCompleted
          <url:/Users/mertnuhoglu/codes/js/todomvc-cycle-onion/src/components/TaskList/view.js#tn=  const allCompleted = state.list.reduce((x, y) => x && y.completed, true);>
          const allCompleted = state.list.reduce((x, y) => x && y.completed, true);
        loop over keys
          <url:file:///~/projects/study/js/ex/study_cyclejs_examples/ex01/ref02/isolate/index.ts>
          for (const channel in innerSinks) {
            const source = sources[channel] as Partial<IsolateableSource>;
        pathname: links navbar
          <url:/Users/mertnuhoglu/codes/js/cyclejs/examples/advanced/routing-view/src/main.js#tn=function navigation(pathname) {>}
          function view(history$) {
            return history$.map(history => {
              const {pathname} = history;
              let page = h1('404 not found');
              if (pathname === '/home') {
                page = homePageView();
              } else if (pathname === '/about') {
                ...
              return div([
                navigation(pathname),
          function navigation(pathname) {
            return nav([
              span({
                dataset: {page: 'home'},
                class: {'active': pathname === '/home'}
              }, 'Home'),
              span({
                dataset: {page: 'about'},
                class: {'active': pathname === '/about'}
              }, 'About'),
              span({
                dataset: {page: 'contacts'},
                class: {'active': pathname === '/contacts'}
              }, 'Contacts')
            ])
          }
        drivers
          DOMDriver rxjs
            <url:/Users/mertnuhoglu/projects/study/js/study_notes_cyclejs.Rmd#tn=function DOMDriver(text$) {>
            function DOMDriver(text$) {
              text$.subscribe(text => {
                const container = document.querySelector('#app');
                container.textContent = text;
              });
              const DOMSource = Rx.Observable.fromEvent(document, 'click');
              return DOMSource;
            }
          preventDefaultSinkDriver from autocomplete-search
            <url:/Users/mertnuhoglu/codes/js/cyclejs/examples/advanced/autocomplete-search/src/main.js#tn=function preventDefaultSinkDriver(prevented$) {>
            function preventDefaultSinkDriver(prevented$) {
              prevented$.addListener({
                next: ev => {
                  ev.preventDefault()
                  if (ev.type === 'blur') {
                    ev.target.focus()
                  }
                },
                error: () => {},
                complete: () => {},
              })
              return xs.empty()
            }
          HotDriver
            <url:/Users/mertnuhoglu/projects/study/js/vrp/cyclejs_vrp.Rmd#tn=function HotDriver(data$) {>
            function HotDriver(data$) {
              data$.addListener({
                next: data => {
                  hot.loadData(data)
                }}
              )
              var producer = {
                start: function(observer) {
                  hot.addHook('afterChange', function () {
                    console.log("changed")
                    observer.next(hot.getSourceData())
                  })
                },
                stop: function () {
                  console.log("stopped")
                }
              }
              const HotSource = xs.create(producer)
              return HotSource
            }
        addListener
          ex: add to one stream
            actions.newItem$.addListener({
              next: data => {
                console.log("newItem$")
                console.log(data)
              }})
          ex: add to an object/array of streams
            // {$ *} -> void
            function addListener(streams) {
              Object.keys(streams).map( (key) =>
                streams[key].addListener({
                  next: data => {
                    console.log(key)
                    console.log(data)
                  }})
              )
            }
            addListener(actions)
            addListener({removeItem$: actions.removeItem$})
          ex: jsutils_mn.addListener
            <url:file:///~/projects/jsutils_mn/src/index.js>
            import addListener, {addListenerStream} from 'jsutils_mn'
            addListener(actions)
            addListener({removeItem$: actions.removeItem$})
            addListenerStream(actions.newItem$, "newItem$")
      examples real - cyclejs id=g_10201
        examples real - cyclejs <url:file:///~/Dropbox/mynotes/content/code/cjs/cjs.md#r=g_10201>
        autocomplete-search
          ref
            <url:file:///~/codes/js/cyclejs/examples/advanced/autocomplete-search/src/app.js>
        many
          ref
            <url:file:///~/codes/js/cyclejs/examples/advanced/many/src/List.js>
            <url:/Users/mertnuhoglu/projects/study/js/study_cyclejs_examples.Rmd#tn=### Data Flow of Remove Action>
          List
            neden proxyItemRemove$ bir arg olarak verilmiş, sources.DOM yerine?
              code
                const proxyItemRemove$ = xs.create();
                const action$ = intent(sources.DOM, proxyItemRemove$);
                const itemWrapper = makeItemWrapper(sources.DOM);
                const items$ = model(action$, itemWrapper);
                const itemRemove$ = items$
                  .map(items => xs.merge(...items.map(item => item.Remove)))
                  .flatten();
                proxyItemRemove$.imitate(itemRemove$);
              cause
                item'ları Remove etmek için item'ların id'lerine ihtiyaç var. 
                dolayısıyla ancak item'ları oluşturduktan sonra Remove$ actionları konfigüre edilebilir
            item.Remove içindeki bilgi nedir?
              ref
                <url:/Users/mertnuhoglu/projects/study/js/study_cyclejs_examples.Rmd#tn=## Data Flow of List-Item>
        isomorphic
          ref
            <url:file:///~/codes/js/cyclejs/examples/advanced/isomorphic/app.js>
        nested-folders
          ref
            <url:file:///~/codes/js/cyclejs/examples/advanced/nested-folders/src/Folder.js>
          const Children = makeCollection({
            makeCollection: from cycle-onionify/Collection.ts
              doc:
                a cyclejs component (a function from sources to sinks)
                represents a collection of many item components 
                arg: options = {item, collectSinks}
                arg (optional): itemKey, itemScope, channel
                returns: Collection
                  uses state source (sources.state)
                    emits arrays
                      each entry: state for that item
                    when state grows, collection makes a new item automatically
              arguments:
                item: Folder
                itemKey: state => state.id
                itemScope: key => key
                collectSinks: instances => ({
                  onion: instances.pickMerge('onion'),
                  DOM: instances.pickCombine('DOM'),
                })
              pickMerge:
                doc:
                  ~ xstream.merge
                  blends multiple streams together
                  but gets those streams from a collection of component instances
                    yani her bir instance içindeki "onion" streamini alıp merge ediyor
                  arg: selector: stream's name
                  returns: a Function:
                    an operator to be used with xstream.compose
                sub functions
                  xstream.compose:
                    doc:
                      to write in chained style
                      ex: 
                        out$ = f(in$)
                        ->
                        out$ = in$.compose(f)
                    neden in$.compose(delay(100)) yazıyoruz, fakat in$.delay(100) hata veriyor?
                      çünkü Stream class içinde tanımlanmamış delay methodu, fakat compose tanımlı. delay dışarıda tanımlandığından ancak bu şekilde kullanılabilir
                      <url:/Users/mertnuhoglu/codes/js/xstream/src/index.ts#tn=export class Stream<T> implements InternalListener<T> {>
        animated-letters
          ref
            <url:file:///~/codes/js/cyclejs/examples/advanced/animated-letters/src/main.js>
          main
            intent(keydown)
            model(action$)
            view(state$, sources.Time)
          animatedState$
            const animatedState$ = animate(state$, Time)
            function animate(state$, Time) {
              return state$
                .compose(determineDeltaPoints)
                .compose(expandAsRenderingFrames(Time))
                .compose(calculateAnimationSteps)
            }
        routing-view
          ref
            <url:file:///~/codes/js/cyclejs/examples/advanced/routing-view/src/main.js>
          main
            view():
              span({
                dataset: {page: 'home'},
            main():
              history$ = sources.DOM.select('nav').events('click')
                .map(e => e.target.dataset.page)
                .compose(dropRepeats())
          view
            const vdom$ = view(sources.history);
            function view(history$) {
              return history$.map(history => {
                const {pathname} = history;
                let page = h1('404 not found');
                if (pathname === '/home') {
                  page = homePageView();
                } else if (pathname === '/about') {
                  page = aboutPageView();
                } else if (pathname === '/contacts') {
                  page = contactsPageView();
                }
                return div([
                  navigation(pathname),
                  page,
                  br(),
                  h3('History object'),
                  p(JSON.stringify(history))
                ]);
              });
            }
            function navigation(pathname) {
              return nav([
                span({
                  dataset: {page: 'home'},
                  class: {'active': pathname === '/home'}
                }, 'Home'),
                ...
        bmi-nested
          ref
            <url:file:///~/codes/js/cyclejs/examples/advanced/bmi-nested/src/main.js>
          BmiCalculator
            weightProps$ = {label, unit}$ 
            weightSlider = LabeledSlider({DOM, props$})
              LabeledSlider
                intent(sources.DOM)
                  domSource.select('.slider').events('input').map(ev => ev.target.value)
                model(change$, sources.props$)
                  value$ = props$.map((props) => props.initial).take(1)
        custom-driver
          ref
            <url:file:///~/codes/js/cyclejs/examples/advanced/custom-driver/src/main.js>
          main()
            intent(sources.DOM)
              {click$: domSource.events('click').mapTo(1)}
            model(actions$)
              merge(click$, timer$)
        todomvc 
          ref 
            <url:file:///~/codes/js/todomvc-cycle/src/app.js>
        storage
          ref
            /Users/mertnuhoglu/codes/js/storage/example
          main()
            storageRequest$ = sources.DOM.select('input')
              .events('input')
              .map(ev => ({
                key: 'inputText',
                value: ev.target.value
              }))
            const vdom$ = sources.storage.local
              .getItem('inputText')
            return {
              storage: storageRequest$
            }
        todomvc-onion id=g_10198
          ref
            todomvc-onion <url:file:///~/Dropbox/mynotes/content/code/cjs/cjs.md#r=g_10198>
            <url:file:///~/codes/js/todomvc-cycle-onion/src/app.js>
          onion inner logic
            const listSinks = isolate(List, {onion: listLens})(sources);
              debug:
                listLens = {get:..., set: ...}
              isolate/index.ts::function isolate<InnerSo, InnerSi>(
              isolate(List, {onion: listLens}) =   return function wrappedComponent(
              isolate(List, {onion: listLens})(sources);
                isolate/index.ts::function wrappedComponent(outerSources: OuterSo,..)
                  debug:
                    outerSources = sources
                    outerSources.onion: StateSource
                  const scopesPerChannel = normalizeScopes(outerSources, scopes, randomScope);
                    debug
                      outerSources.onion: StateSource
                      scopesPerChannel.onion: {get: function, set: function}
                      innerSources.onion: StateSource
                      innerSinks.onion: Stream
                        _prod: PickMerge
                      outerSinks.onion: Stream
                        _prod: MapOp
                  const outerSinks = isolateAllSinks( outerSources, innerSinks, scopesPerChannel,);
                    isolateSink
                      get = makeGetter(scope)
                      innerReducer$.map(innerReducer => function outerReducer(outer) {...})
            patterns:
              sources: genellikle function
              sinks: genellikle data
              onion objeleri:
                listLens
                StateSource
                Stream: prod: PickMerge
                Stream: prod: MapOp
            StateSource nedir?
              a piece of application state stream
              select(Scope): StateSource
                selects a part (or scope) of state object
                returns a new StateSource
                @param scope: {string|number|lens}
              Instances:
                represents all instances in a collection of components
                pickMerge(): gets merged sinks of all instances
            listLens tam nerede kullanılıyor 
              StateSource.ts::
                export function isolateSource<T, R>( source: StateSource<T>, scope: Scope<T, R>): StateSource<R> {
                  return source.select(scope);
              scope = listLens burada
              çağrı zinciri:
                const listSinks = isolate(List, {onion: listLens})(sources);
                  return function wrappedComponent(
                    const innerSources = isolateAllSources(outerSources, scopesPerChannel);
                      function isolateAllSources<So extends Sources>(
                        innerSources[channel] = outerSource.isolateSource( outerSource, scopes[channel],
                          export function isolateSource<T, R>( source: StateSource<T>, scope: Scope<T, R>): StateSource<R> {
                            return source.select(scope);
                const listSinks = isolate(List, {onion: listLens})(sources);
                  return function wrappedComponent(
                    const outerSinks = isolateAllSinks( outerSources, innerSinks, scopesPerChannel,);
                      function isolateAllSinks<So extends Sources, Si>( sources: So, innerSinks: Si, scopes: ScopesPerChannel<So>,): Si {
                        outerSinks[channel] = source.isolateSink(innerSink, scopes[channel]);
                          export function isolateSink<T, R>( innerReducer$: Stream<Reducer<R>>, scope: Scope<T, R>): Stream<Reducer<T>> {
                            return innerReducer$
                              .map(innerReducer => function outerReducer(outer: T | undefined) {
                                const prevInner = get(outer);
                                const nextInner = innerReducer(prevInner);
                                if (prevInner === nextInner) {
                                  return outer;
                                } else {
                                  return set(outer, nextInner);
                                }
                              });
                  # neden isolateSources lens.get, isolateSinks lens.set?
                    get(state) -> [Component] -> set(state)
            açıklama: isolateSink
              code
                export function isolateSink<T, R>( innerReducer$: Stream<Reducer<R>>, scope: Scope<T, R>): Stream<Reducer<T>> {
                  return innerReducer$
                    .map(innerReducer => function outerReducer(outer: T | undefined) {
                      const prevInner = get(outer);
                      const nextInner = innerReducer(prevInner);
                      if (prevInner === nextInner) {
                        return outer;
                      } else {
                        return set(outer, nextInner);
                      }
                    });
              değişkenler
                get: listLens.get()
                outer: outer state (parent state)
                prevInner: prevState
                innerReducer: reducer function coming from model()
                nextInner: new state
                set: listLens.set()
              peki outer state bilgisi nereden geliyor?
                TaskList.sinks {onion: reducer$} içeriyor
                bunu bir yerde state$'e bağlamalı
                sources.onion.state$ ile bunun arasında bağlantı olmalı
                bu da onionify() içinde kuruluyor olmalı
                  keyof ne anlama geliyor?
              onionify() kodu
                export type OSo<T> = {onion: StateSource<T>};
                export type OSi<T> = {onion: Stream<Reducer<T>>};
                # explain:
                  OnionSource app açısından source
                  sources.onion.state gibi düşün
                veri akışı
                  sources['onion'] = new StateSource(state$, 'onion')
                  sinks = main(sources) = TaskList()>reducer$
                  new StateSource -> [main] -> TaskList()>reducer$ -> [imitate] -> reducerMimic$ -> [fold] -> state$ -> [new StateSource] -> sources.onion
              outer nasıl reducer$'a girdi oluyor?
                başlangıç state'ini de reducer içinde veriyoruz
                buradan kendisinin ilk state'ini oluşturuyor:
                  const reducerMimic$ = xs.create<Reducer<T>>();
                  const state$ = reducerMimic$
                    .fold((state, reducer) => reducer(state), void 0 as (T | undefined))
                    .drop(1);
          lens alt komponentlere veriliyor, peki TaskList içindeki state$ hesaplanırken lens kullanılmıyor mu bu durumda?
            evet onionify() içinde bu görünüyor
            state$ global oluşturuluyor, lens kullanılmıyor
            lens isolate() içinde alt komponentlere devrediliyor
          insertTodo$:
            <url:/Users/mertnuhoglu/codes/js/todomvc-cycle-onion/src/components/TaskList/intent.js#tn=    insertTodo$: domSource>
            TaskList/intent.js
              insertTodo$: domSource
                .select('.new-todo').events('keydown')
                .filter(ev => {
                  const trimmedVal = String(ev.target.value).trim();
                  return ev.keyCode === ENTER_KEY && trimmedVal;
                })
                .map(ev => String(ev.target.value).trim()),
            TaskList/model.js
              const insertTodoReducer$ = actions.insertTodo$
                .map(content => function insertTodoReducer(prevState) {
                  const newTodo = {
                    key: uuid++,
                    title: content,
                    completed: false,
                    editing: false,
                  };
                  return {
                    ...prevState,
                    list: prevState.list.concat(newTodo),
                  }
                });
        weather-onionify
          <url:file:///~/codes/js/front-end-reactive-architectures/9781484231791/examples/weather-onionify/src/App.js>
          cityLens
            const cityLens = {
                get: state => state,
                set: (state, childState) => childState
            }
          view()
            const view = state$ => state$.map(state => getForm(state))
            const getForm = location => div(".form", [
                h1(`Your forecasts in ${location.city}`),
                input("#location-input", {props: {value: `${location.city}`}}),
                button("#location-btn", "get forecasts")
            ])
          main()
            const locationSink = isolate(CityForm, {onion: cityLens})(sources);
            const todayForecastSink = isolate(TodayForecast, {onion: cityLens})(sources);
            const futureForecastSink = isolate(FutureForecast, {onion: cityLens})(sources);
        ivan-kleshnin examples id=g_10206
          ivan-kleshnin examples <url:file:///~/Dropbox/mynotes/content/code/cjs/cjs.md#r=g_10206>
          form-1.0
            <url:file:///~/codes/js/cyclejs-examples/1.0-form/src/app.js>
            intent+model
              let username = src.DOM.select("#username")
                .events("input")
                .map((event) => event.target.value)
                .startWith("")
              let email = src.DOM.select("#email")
                .events("input")
                .map((event) => event.target.value)
                .startWith("")
            view
              DOM: $.combineLatest(
                username, email,
                (username, email) => {
                  return div([
          form-1-1
            <url:file:///~/codes/js/cyclejs-examples/1.1-form/src/app.js>
            intent as actions object
              let intents = {
                changeUsername: src.DOM.select("#username")
                  .events("input")
                  .map((event) => event.target.value)
                  .share(),
                changeEmail: src.DOM.select("#email")
                  .events("input")
                  .map((event) => event.target.value)
                  .share(),
              }
            model as state object
              let scanFn = curry((state, updateFn) => {
                return updateFn(state)
              })
              let state = $.merge(
                  // Track fields
                  intents.changeUsername.map((v) => assoc("username", v)),
                  intents.changeEmail.map((v) => assoc("email", v))
                )
                .startWith(seeds)
                .scan(scanFn)
                .distinctUntilChanged()
                .shareReplay(1)
              # scan nasıl çalışır?
                scan bir reducer fonksiyon bekler
                reducer fonksiyon iki arg alır: accumulator, current
                reducer accumulator ile aynı tipten bir değer döner
                ilk accumulator değeri startWith(seeds) tarafından sağlanır
                dolayısıyla, her stream eventteki event, aslında current'a atanır. 
                her stream event de $.merge()'den gelen reducer fonksiyonudur.
                bu da accumulator = prevState'i arg olarak alır
                sonra yine aynı tipte bir değer döner
            view
              return {
                DOM: state.map((state) => {
                  return div([
          form-1.2: actions + update loop
            <url:file:///~/codes/js/cyclejs-examples/1.2-form/src/app.js>
            state driver
              Cycle.run(main, {
                state: identity,
            collect multiple intents streams into one actions stream
              # sample: http://reactivex.io/documentation/operators/sample.html
                similar to combineLatest
              let actions = {
                createUser: src.state.map(prop("form"))
                  .sample(intents.createUser)
                  .map((input) => User(input))
                  .share(),
              let intents = {
                changeUsername: src.DOM.select("#username")...
                changeEmail: src.DOM.select("#email")...
                createUser: src.DOM.select("#submit")
                  .events("click")
                  .map((event) => true)
            model as state
              let state = $.merge(
                  // Track fields
                  intents.changeUsername.map((v) => assocPath(["form", "username"], v)),
                  intents.changeEmail.map((v) => assocPath(["form", "email"], v)),
                  // Create user
                  actions.createUser.map((u) => (s) => assocPath(["users", u.id], u, s)),
                  // Reset form after valid submit
                  actions.createUser.delay(1).map((_) => assoc("form", seeds.form))
                )
                .startWith(seeds)
                .scan(scanFn)
                .distinctUntilChanged()
                .shareReplay(1)
            # bu yaklaşımla onion arasındaki fark nedir?
              burada durumun (state) her bir alanı (field) için özel bir actions.map(reducer) tanımlı
              onion'da ise bir lens.set içinde bunlar yapılıyor
              lens.get ise buradaki actions içindeki streamlerin ilk adımına karşılık geliyor: src.state.map(prop("form"))
              bunlara sample(intents.createUser) gibi kullanıcı eylemleri eklenmiş
              dolayısıyla createUser actionı aslında mevcut durum üzerindeki bir kullanıcı eylemini içeriyor
              daha sonra actions.createUser.map() ile state içinde kullanılıyor
              böylece kullanıcı eylemi + geçmiş durum bilgisi birleştirilmiş bir şekilde bir sonraki state'i oluşturuyor
              peki actions.createUser.map() neden iki içiçe birer argümanlı fonksiyon?
                ilk argüman: mevcut createUser'dan gelen veri: User(input)
                ikinci argüman: prevState, bu scan(scanFn) tarafından bir önceki state neyse oradan sağlanacak
                dikkat edersen, ilk argüman: u, sadece user objsini içeriyor
                prevState = s argümanıysa, tüm durum bilgisini içeriyor, bunun içinde user dışında veriler de olabilir
            initial state as seeds
              let seeds = {
                form: {
                  username: null,
                  email: null,
                },
                users: {},
              }
            User object
              let User = curry((data) => {
                return merge({
                  id: UUID.v4(),
                }, data)
              })
            actions.createUser.map((u) => (s) => assocPath(["users", u.id], u, s)),
              u: is the user object coming from actions.createUser
              s: s.users[id == u.id] = u
            // Reset form after valid submit
              actions.createUser.delay(1).map((_) => assoc("form", seeds.form))
            view
              DOM: state.map((state) => {
                let {form} = state
          form-1.3: lenses + toState no folding of reducers
            <url:file:///~/codes/js/cyclejs-examples/1.3-form/src/app.js>
            <url:file:///~/codes/js/cyclejs-examples/node_modules/rx-utils/src/index.js>
            textFrom() clickFrom()
              let textFrom = (s) => src.DOM.select(s).events("input")::pluck("target.value").share()
              let clickFrom = (s) => src.DOM.select(s).events("click").map((e) => true).share()
              let intents = {
                changeUsername: textFrom("#username"),
                changeEmail: textFrom("#email"),
                createUser: clickFrom("#submit").debounce(100)
            action createUser with Ramda.view
              let actions = {
                createUser: src.state.map(prop("form"))
              ->
              let actions = {
                createUser: src.state::view("form")
            state with reducer
              let state = store(seeds, $.merge(
                // Track fields
                intents.changeUsername::toState("form.username"),
                intents.changeEmail::toState("form.email"),
                // Create user
                actions.createUser::toOverState("users", (u) => assoc(u.id, u)),
                // Reset form after valid submit
                actions.createUser.delay(1)::setState("form", seeds.form)
              ))
              rx-utils functions
                toState
                  bu fonksiyon doğrudan doğruya reducer'ları fold edip sonucu yazıyor
                  1.2'den farklı olarak şuna gerek yok:
                    .scan(scanFn)
          form-1.4: action: derive returns $ User in response to $ form
            action createUser with model.filter
              code
                let actions = {
                  createUser: src.state::view("form")
                ->
                let actions = {
                  createUser: model.filter(identity)
                removes the need for
                  .map((input) => User(input))
              what is model?
                let model = derive((form) => {
                  try {
                    return makeUser(form)
                  } catch (err) {
                    if (err instanceof TypeError) { return null }
                    else                          { throw err }
                  }
                }, src.state::view("form"))
                let makeUser = (data) => {
                  return User(merge({
                    id: UUID.v4(),
                  }, data))
                }
              what is derive?
                // Derive a state observable from a state observable
                // (a -> b) -> $ a -> $ b
                let derive = curry((deriveFn, os) => {
                  return deriveN(deriveFn, [os])
                })
                // Derive a state observable from state observables.
                // (* -> b) -> [$ *] -> $ b
                let deriveN = curry((deriveFn, os) => {
                  return $.combineLatest(...os, deriveFn).distinctUntilChanged().shareReplay(1)
                })
              in summary: derive
                derive takes two args:
                  (a -> b) = (form -> User)
                  $ a = $ form
                returns one stream:
                  $ b =  $ User
          form-1.5: validation with id=g_10208
            form-1.5: validation with <url:file:///~/Dropbox/mynotes/content/code/cjs/cjs.md#r=g_10208>
            <url:file:///~/codes/js/cyclejs-examples/1.5-form/src/app.js>
            validation 
              let errors = store(seeds.form, $.merge(
                src.state::view("form.username").skip(1)::validate(Username)::toState("username"),
                src.state::view("form.email").skip(1)::validate(Email)::toState("email")
              ))
              Username type is defined:
                let Username = User.meta.props.username
              User type is tcomb:
                let Username = Tc.subtype(Tc.String, (x) => {
                  return /^\w{2,10}$/.test(x)
                }, "Username")
                let User = Tc.struct({
                  id: Uid,
                  username: Username,
                  email: Email,
                }, "User")
              validate function:
                let validate = function (type) {
                  return this
                    .debounce(500)
                    .map((val) => V.validate(val, type).firstError())
                    .map((e) => e && e.message || null)
                    .distinctUntilChanged()
                    .shareReplay(1)
                }
              errors is used in view()
                DOM: $.combineLatest(state, model, errors)
                  .debounce(1)
                  .map(([state, model, errors]) => {
          2.0-routing
            <url:file:///~/codes/js/cyclejs-examples/2.0-routing/src/app.js>
            sinks.navi
              // SINKS
              return {
                navi: navi,
              let navi = updateNavi...
              let updateNavi = $.merge(
                intents.redirect
              let intents = {
                redirect: src.DOM.select("a:not([rel=external])")
                  .events("click")
                  .filter((event) => !(/:\/\//.test(event.target.getAttribute("href")))) // drop links with protocols (as external)
                  .do((event) => event.preventDefault())
                  ::pluck("target.href")             // pick normalized property
                  .map((url) => Url.parse(url).path) // keep pathname + querystring only
              # preventDefault() ne yapıyordu?
                https://api.jquery.com/event.preventDefault/
                the default action of event will not be triggered
                ex:
                  clicked anchors will not take the browser to new URL
                otomatik olarak browser'ın yönlendirmesine izin verme, kendin yönlendirmeyi yap
              # .map((url) => Url.parse(url).path) // keep pathname + querystring only
                Url.parse(url) nedir?
                https://github.com/defunctzombie/node-url
                Url.parse(url_text)
                properties of returned object: path, href, ...
              let navi = updateNavi
                .startWith(window.location.pathname)
                .distinctUntilChanged()
                .map((url) => {
                  let [route, page] = window.doroute(url)
                  return {
                    url,   // :: String
                    route, // :: String
                    page,  // :: {Observable *} -> {Observable *}
                  }
                })
                .distinctUntilChanged().shareReplay(1)
                .delay(1) // shift to the next tick (navi <- routing: immediate)
              doroute:
                // Simplest solution of cyclic dependency: routes <-> pages
                window.doroute = doroute(routes) // prefixed with "do" to avoid noun-vs-verb confusion
                let routes = [
                  ["/", require("./pages/home")],
                  ["/about", require("./pages/about")],
                  ["*", require("./pages/not-found")],
                ]
                // doroute :: [[String, Component]] -> String -> [String, Component]
                let doroute = curry((routes, url) => {
                  let match = find(([r, _]) => r == url, routes)
                  if (!match) {
                    match = takeLast(1, routes)[0]
                  }
                  return [match[0], match[1]]
                })
                # summary
                  gelen url'nin hangi require('./pages/home') sayfaya gideceğini dönüyor
                # örneğin page/home.js
                  module.exports = function (src) {
                    return {
                      DOM: src.navi.map((navi) => {
                        console.log("render home")
                        return div([
                          h1("Home"),
                          menu({navi}),
                          p(["[home content]"])
            sources.navi'nin kullanımı
              # navi aslında bir {url,route,page} objesi dönüyor:
                return {
                  url,   // :: String
                  route, // :: String
                  page,  // :: {Observable *} -> {Observable *}
                }
              # URL'yi sinks.URL dönüyor:
                URL: navi::view("url"),
              # gelen navi'den yapılanlar:
                summary
                  önce view("route") ile ilgili page'in sources {Observable *} objesi alınıyor
                  prevPage'in subscription'ları iptal ediliyor:
                  yeni sinks oluşturuluyor
                    new ReplaySubject()
                    => xstream'de
                    const proxyItemRemove$ = xs.create();
                  navi.page(src) ile sources çalıştırılıyor 
                code
                  let page = src.navi
                    .sample(src.navi::view("route")) // remount only when page *type* changes...
                    .scan((prevPage, navi) => {
                      // Unsubscribe previous page (if there was)
                      if (prevPage.subscriptions) {
                        prevPage.subscriptions.forEach((s) => s.dispose())
                      }
                      // Make disposable sinks
                      let sinkProxies = {
                        DOM: new ReplaySubject(1),
                        log: new ReplaySubject(1),
                      }
                      // Run page
                      let sinks = merge({
                        log: $.empty(),      // affects log
                        DOM: $.empty(),      // affects DOM
                      }, navi.page(src))
                      // Subscribe current page
                      let subscriptions = [
                        sinks.DOM.subscribe(sinkProxies.DOM.asObserver()),
                        sinks.log.subscribe(sinkProxies.log.asObserver()),
                      ]
                      return {navi, sinks: sinkProxies, subscriptions}
                    }, {})
                    .pluck("sinks")
                    .shareReplay(1)
              # en son aşamada page içinden DOM sinkini alıp app'e veriyor
                DOM: page.flatMapLatest(prop("DOM")),
          2.1-routing: highlight "current" menu item
            <url:file:///~/codes/js/cyclejs-examples/2.1-routing/src/app.js>
            navi oluştururken
              let aa = (...args) => {
                let vnode = a(...args)
                let {href, className} = vnode.properties
                vnode.properties.className = Class(className, {active: isActiveUrl(url, href)}) // TODO or rather `isActiveRoute`?
                return vnode
              }
              // isActiveUrl :: String -> String -> Boolean
              let isActiveUrl = curry((baseUrl, currentUrl, url) => {
                baseUrl = withSuffix("/", Url.parse(baseUrl).pathname)
                currentUrl = withSuffix("/", Url.parse(currentUrl).pathname)
                url = withSuffix("/", Url.parse(url).pathname)
                if (url == baseUrl) {
                  return url == currentUrl // link to "home" is active only on "home"
                } else {
                  return currentUrl.startsWith(url) // link to "page" is active on "page" and "page" subpages TODO handle trailing slashes, etc.
                }
              })
              # url ve href ne?
                url: currentUrl
                  let [route, page] = window.doroute(url)
                href: linkin url'si
                  let {href, className} = vnode.properties
              # aa nasıl kullanıyıor?
                chunks/menu.js
                  module.exports = function ({navi}) {
                    let {aa} = navi
                    return div([
                      div(aa({href: "/"}, "Home")),
                      div(aa({href: "/about"}, "About")),
                      div(aa({href: "/users"}, "Users")),
                      div(aa({href: "/broken"}, "Broken")),
                    ])
                  }
                pages/about.js
                  module.exports = function (src) {
                    return {
                      DOM: src.navi.map((navi) => {
                        console.log("render about")
                        return div([
                          h1("About"),
                          menu({navi}),
            2.2-routing: use route-parser + models and URL params
              <url:file:///~/codes/js/cyclejs-examples/2.2-routing/src/app.js>
              use route-parser
                routes.js
                  let Route = require("route-parser")
                  let routes = [
                    [new Route("/"), require("./pages/home")],
              users page
                chunks/user.card.js
                  module.exports = function ({navi, user}) {
                    return (
                      div([
                        h2("User"),
                        p(["Id: ", user.id]),
                        p(["Name: ", user.username]),
                pages/user.detail.js
                  let userCard = require("../chunks/user.card")
                  return {
                    DOM: user.withLatestFrom(
                      src.navi, src.state::view("users"),
                      (user, navi, users) => {
                        console.log("render user.detail")
                        let ids = keys(users)
                        return div([
                          h1("User Detail"),
                          menu({navi}),
                          userCard({navi, user}),
                  # state.users objeleri nereden geliyor?
                    app.js
                      let state = store(seeds, $.empty())
                    seeds.js
                      let seeds = {
                        users: {
                          "1": makeUser({id: "1", username: "gizmo", email: "gizmo@paqmind.com", points: 30, bonus: 10}),
                          "2": makeUser({id: "2", username: "fancy", email: "fancy@paqmind.com", points: 20}),
            2.3-routing
              <url:file:///~/codes/js/cyclejs-examples/2.3-routing/src/app.js>
            3.0-crud-alt
              <url:file:///~/codes/js/cyclejs-examples/3.0-crud.alt/src/app.js>
          next
            tcomb
      taslak dizaynlar - cyclejs id=g_10202
        taslak dizaynlar - cyclejs <url:file:///~/Dropbox/mynotes/content/code/cjs/cjs.md#r=g_10202>
        focus/blur example id=g_10199
          focus/blur example <url:file:///~/Dropbox/mynotes/content/code/cjs/cjs.md#r=g_10199>
          https://javascript.info/focus-blur
          features:
            blur edince inputu submit et
            validasyon yap
            girdi veri hatalarını göster
          intent(sources.DOM)
            inputText$ = sources.DOM.select('#input').events('input')
            blur$ = sources.DOM.select('#input').events('blur')
            return {blur$, inputText$}
          model(actions)
            validationErrors$ = actions.inputText$.map(e => e.target.value)
              .filter(text => validate(text) === false)
            text$ = actions.inputText$.map(e => e.target.value)
              .filter(text => validate(text) === true)
            textSubmitted$ = xs.combine(text$, actions.blur$)
              .map([text, blur] => text)
            return {validationErrors$, textSubmitted$}
          view(state)
            errors$ = state.validationErrors$
              .map((error) => div("#error", {class: 'invalid'}, "Name is invalid"))
            text$ = state.textSubmitted$
              .map(name => div("#name", name))
            return xs.merge(errors$, text$)
    expressjs
      error: csrf token missing
        # req.path içine POST form'un adresini ekle
          app.use((req, res, next) => {
          if (req.path === '/api/upload' || req.path === '/uploadData') {
            next();
          } else {
            lusca.csrf()(req, res, next);
          }
          });
      using html inside pug
        opt1: just put | pipe symbol in front as if it is raw text
          .content
            | <div>Hello, yes this is dog</div>
        opt2: just put html tags
          <div>Hello, yes this is dog</div>
      using html file
        res.sendFile
          exports.getTest2 = (req, res) => {
            const path = __dirname;
            res.sendFile(path + "/test2.html");
        dynamic routing for static files
          opt1:
            app.get('/test/:uid', function(req, res){
              var uid = req.params.uid;
              var path = "test/" + uid + ".html";
              res.sendfile(path, {root: './public'});
            });
            # put html files into: public/test/ folder
            # use http://x.com/test/file
          opt2: 
            app.use('/static', express.static('public'))
            # put html files into: public/ folder
            # use http://x.com/static/file.html
      change start port
        opt1
          PORT=3001 npm start
          PORT=3001 nodemon app.js
        opt2: gulp
          gulpfile.js
            nodemon({
              script: 'bin/www',
          bin/www
            app.set('port', process.env.PORT || 3003);
        opt3: environment variable
          PORT=3001
        opt4: intellij
          environment variable
            PORT=3001
      run nodemon from intellij
        configuration
          node parameters: /Users/mertnuhoglu/.nvm/versions/node/v7.7.4/bin/nodemon
          javascript file: app.js
    graphql
      alternatives to graphql
        postgraphql
          n+1 problem
            https://github.com/postgraphql/postgraphql/issues/219
        join-monster
          http://join-monster.readthedocs.io/en/latest/
            on top of graphql
            converts graphql to sql
            solves roundtrip problem with joins
            alternative to: Facebook DataLoader
      HN: REST in Peace. Long Live GraphQL
        https://news.ycombinator.com/item?id=14839576
        critic: the article doesn't discuss costs and limitations
        what is the benefit compared to REST?
          multiple round trips to fetch data required by a view -> single request
        critic: baron816: impractical bc it requires Relay or Apollo on frontend
          answer: you can negate need for Relay/Apollo
            https://stackoverflow.com/questions/42520663/how-send-graphql-query-by-postman
        alternative: postgrest
      HN: Apollo Server 1.0  – GraphQL Server for Node.js Frameworks
        https://news.ycombinator.com/item?id=14814007
        q: does apollo solve round trip issue with graphql (joins/n+1 problem)
          ans: it does not. 
            alternative: join-monster handles it
            q: join-monster works only for at most 2 levels
              subzero solves this problem
        q: n+1 problem repeats and spoils
          beware subsystems that propose to wrap and abstract your database for a new paradigm "automatically". They're leaky and difficult and take a decade to get right
        q: graphql has functions called resolvers where you write your logic to get data from wherever you want. SQL, NoSQL, API, filesystem, etc.
    handsontable
      ref
        /Users/mertnuhoglu/projects/itr/vrp/frontend/views/test_pug/handsontable01.pug
      documentation pro 
        https://docs.handsontable.com/pro/1.11.0/tutorial-introduction.html
        @note
          kopyala yapıştır kendinden destekliyor
          yeni satırları otomatik oluşturuyor
          json da olabilir data, array de
      ex: basic
        html
          div(id="spreadsheet")
        js
          var data = [
              ["", "Ford", "Volvo", "Toyota", "Honda"],
              ["2016", 10, 11, 12, 13],
              ["2017", 20, 11, 14, 13],
              ["2018", 30, 15, 12, 13]
          ];
          /* our DIV container */
          var container = document.getElementById('spreadsheet');
          /* spreadsheet initialization */
          var hot = new Handsontable(container, {
              data: data,
              rowHeaders: true,
              colHeaders: true,
              dropdownMenu: true
          });
      ex: createSpreadsheetData()
        var data = function () {
            return Handsontable.helper.createSpreadsheetData(100, 10);
        };
        var hot = new Handsontable(container, {
            data: data(),
            ...
      ex: data as array of objects
        var dataObject = [
            {
                id: 1, flag: 'EUR', currencyCode: 'EUR', },
      ex: columns settings
        columns: [
            {
                data: 'id',
                type: 'numeric',
                width: 40
            },
      ex: hot.getData()
        hot.getData();
        // hot.getData().slice(0,2)
        // (2) [Array(7), Array(7)]0: Array(7)0: ""1: "Ford"2: "Nissan"3: "Toyota"4: "Honda"5: "Mazda"6: "Ford"length: 7__proto__: Array(0)1: Array(7)length: 2__proto__: Array(0)
      ex: ocpu custom function
        ocpu.seturl("//localhost/ocpu/user/opencpu/library/pmf/R")
      ex: ocpu upload_data
        var arg1 = hot.getData();
        // (2) [Array(7), Array(7)]0: Array(7)0: ""1: "Ford"2: "Nissan"3: "Toyota"4: "Honda"5: "Mazda"6: "Ford"length: 7__proto__: Array(0)1: Array(7)length: 2__proto__: Array(0)
        var req1 = ocpu.call("upload_data", {mat: arg1}, function (session) {
            mysession = session;
            mysession.getConsole(function (outtxt) {
                $("#output1").text(outtxt);
            });
        }).fail(function () {
            alert("Error: " + req.responseText);
        });
        // > upload_data(mat = mat)
        //     V1  V2     V3     V4    V5    V6   V7
        // 1 Year Kia Nissan Toyota Honda Mazda Ford
        // 2 2012  10     11     12    13    15   16
        // 3 2013  10     11     12    13    15   16
      ex: ocpu load_data from R to hot
        var req1 = ocpu.call("get_data", {}, function (session) {
            mysession = session;
            mysession.getObject(function (data) {
                var
                    container1 = document.getElementById('example2'),
                    settings1 = { data: data };
                var hot2 = new Handsontable(container1, settings1);
                hot2.render();
      ex: date
        function getCarData() {
            return [
                ["Ford", "A 160", new Date(), 6999.9999],
                ["Ford2", "A 160", new Date().toISOString(), 6999.9999],
                ["Ford3", "A 160", new Date().toDateString(), 6999.9999],
                ["Ford4", "A 160", new Date().toLocaleDateString(), 6999.9999],
                ["Mercedes", "A 160", "01/14/2012", 6999.9999],
        columns: [
          {
              type: 'date',
              dateFormat: 'MM/DD/YYYY',
              correctFormat: true,
              defaultDate: '01/01/1900'
          },
    html id=g_10204
      html <url:file:///~/Dropbox/mynotes/content/code/cjs/cjs.md#r=g_10204>
      document
        attributes and properties id=g_10205
          attributes and properties <url:file:///~/Dropbox/mynotes/content/code/cjs/cjs.md#r=g_10205>
          https://javascript.info/dom-attributes-and-properties
          intro 
            HTML attributes are mapped to DOM Object properties
            ex:
              <body id="page">
              # DOM object mapped to:
              body.id="page"
            but attribet-property mapping is not one-to-one
          DOM properties
            DOM nodes are js objects
              we can modify them
              ex:
                document.body.myData = {name: 'ali'}
                alert(document.body.myData.name)
            we can add methods:
              ex:
              document.body.sayTag = function() {
                alert(this.tagName)
              }
              document.body.sayTag()
            we can modify built-in prototypes:
              Element.prototype.sayHi = () => alert(`Hello ${this.tagName}`)
              document.documentElement.sayHi() // Hello HTML
              document.body.sayHi(); // Hello BODY
          HTML attributes
            browser reads HTML standard attributes and creates DOM properties from them
            but this doesn't happen for non-standard attributes
              ex:
                <body id="test" something="non-standard">
                  <script>
                    alert(document.body.id); // test
                    // non-standard attribute does not yield a property
                    alert(document.body.something); // undefined
                  </script>
                </body>
            each element type has different standard attributes
              ref
                http://htmlcheatsheet.com > HTML > Attributes
              ex:
                <body id="body" type="...">
                  <input id="input" type="text">
                input.type // text
                body.type // undefined
              how to access non-standard attributes?
                elem.hasAttribute(name)
                elem.getAttribute(name)
                elem.setAttribute(name, value)
                elem.removeAttribute(name)
                elem.attributes
                  :Array({name,value})
                ex:
                  <body something="non-standard">
                  document.body.getAttribute('something') // non-standard
              HTML attributes have following features:
                case-insensitive
                values are always string
          Property-attribute synchronization
            when a standard attribute changes, its corresponding property is auto-updated, and vice versa
              ex
                let input = document.querySelector('input');
                // attribute => property
                input.setAttribute('id', 'id');
                alert(input.id); // id (updated)
                // property => attribute
                input.id = 'newId';
                alert(input.getAttribute('id')); // newId (updated)
          DOM properties are typed
            DOM properties are not always strings
              ex: input.checked is boolean
              ex: any.style is an object
            DOM properties might differ from HTML attributes
              ex: a.href is full URL, but 'href' attribute might be relative URL or #hash
                <a id="a" href="#hello">link</a>
                a.getAttribute('href'); // #hello
                a.href ; // full URL in the form http://site.com/page#hello
          Non-standard attributes, dataset
            to pass custom data from HTML to JS
              ex:
                <div show-info="name">
                <div show-info="age">
                let user = {name: "Pete", age=25}
                for (let div of document.querySelectorAll('[show-info]'))
                  let field = div.getAttribute('show-info')
                  div.innerHTML = user[field]
            css
              ex:
                <style>
                  .order[order-state="new"] { color: green }
                <div class="order" order-state="new">
              why to use attribute instead of classes?
                the state can be changed easily:
                ex:
                  div.setAttribute('order-state', 'canceled')
            problem with custom attributes:
              what if later standard attributes introduce our non-standard attribute
              to aviod conflicts: use data-* attributes
              they are available in `dataset` property
                ex:
                  <elem data-about="..">
                  elem.dataset.about
                ex: multiword become camel-cased
                  <div data-order-state="new">
                  order.dataset.orderState // new
        Introduction to browser events
          https://javascript.info/introduction-browser-events
          intro 
            event: signal that something happend
            mouse events:
              click
              contextmenu: mouse right-click on an element
              mouseover/mouseout: cursor comes over / leaves
              mousedown/mouseup
              mousemove
            form element events
              submit: submitting a <form>
              focus: focusing an element ex an <input>
            keyboard events:
              keydown / keyup
            document events 
              DOMContentLoaded: HTML is loaded, DOM fully built
            css events:
              transitioned: css animation finish
          Event handlers
            handler: a function that runs in case of an event
            several ways to assign a handler:
              HTML-attribute
                simplest way
                ex:
                  <input value="Click" onclick="alert('click!')" type="button">
              DOM property
                ex:
                  <input id="elem" type="button" value="...">
                  elem.onclick = function() { alert('thanks') }
              Accessing the element: this
                `this` is the element
                ex:
                  onclick="alert(this.innerHTLM)"
              Possible mistakes
                ex:
                  // wrong
                  button.onclick = sayThanks()
                  // correct
                  button.onclick = sayThanks
                  // but in markup we have brackets
                  <input type="button" onclick="sayThanks()">
              addEventListener
                above ways have limit: no multiple handlers
                ex:
                  element.addEventListener(event, handler[, phase])
                event: event type name
                handler: handler function
                phase: usually we don't use it
              Event object
                the browser creates an event object and passes it as an argument to the handler
                ex:
                  elem.onclick = function(event) { event.type }
                properties of event object:
                  type
                  currentTarget
                  clientX/clientY
              Object handlers: handleEvent
                ex:
                  element.addEventListener('click', {
                    handleEvent(event) { ... }
                  })
      events
        focus/blur
          https://javascript.info/focus-blur
            an element receives focus by click/Tab
            `autofocus` HTML attribute
            blur: losing focus
              mostly more important
              means: data has been entered
      error: Access-Control-Allow-Origin
        https://stackoverflow.com/questions/35553500/xmlhttprequest-cannot-load-https-www-website-com
          Same Origin Policy 
            a security feature of browsers
            how it happens?
              alice is a person
              bob runs website: website.com
              mallory runs website: localhost:4300
              alice is logged into bob's site
              alice visits mallory
                this has js that makes alice's browser make an http request to bob
          solution: CORS
            explicitly grant permission to mallory's site to access data via alice's browser
        https://stackoverflow.com/questions/38043194/the-access-control-allow-origin-header-has-a-value-that-is-not-equal-to-the-su
    http requests
      alternative libraries
        nodejs http
          lots of boilerplate
        request/request
          very popular
        unirest
          supports 8 languages
        got
          popular and easy
      request/request
        https://github.com/request/request
    hyperscript
      ref
        <url:file:///~/projects/study/js/study_hyperscript.Rmd>
      snabbdom - cyclejs id=g_10203
        snabbdom - cyclejs <url:file:///~/Dropbox/mynotes/content/code/cjs/cjs.md#r=g_10203>
        documentation
          ref
            https://github.com/snabbdom/snabbdom
          props attrs 
            both allow to set properties
            h('a', {props: {href: '/foo'}}, 'Go to Foo');
            h('a', {attrs: {href: '/foo'}}, 'Go to Foo');
            boolean attributes:
              ex: disabled hidden selected
              depend on presence/absence of the attribute itself
          dataset
            set data attributes data-*
            h('button', {dataset: {action: 'reset'}}, 'Reset');
            datasets: [{
              label: `Clicks per ${timeframeSec} second`,
              data: history,
              backgroundColor: '#3498db',
            }],
          style
            h('span', {
              style: {border: '1px solid #bada55', color: '#c0ffee', fontWeight: 'bold'}
                }, 'Say my name, and every colour illuminates');
          class
            map class names to booleans
            h('a', {class: {active: true, selected: false}}, 'Toggle');
          hook
            a way to hook into lifecycle of DOM nodes
            to execute any code at desired points in the life of a vnode
            hooks
              pre: patch process begins
              init: a vnode has been added
              ...
              post: patch process is done
            usage:
              h('iv.row', {
                key: movie.rank,
                hook: {
                  insert: (vnode) => {movie.elmHeight = vnode.elm.offsetHeight; }
                }
              })
          virtual node
            properties:
              sel, data, children, text, elm, key
              sel: String
                .sel property
                css selector for h() during creation
                ex:
                  h('div#container', ..)
                  .sel = "div#container"
              data: Object
                information for modules such as styles, css classes, attributes etc. 
                h('div', {props: {className: 'container'}}, [...])
              children: Array
              text: String
                h('h1', {}, 'Hello')
              elm: Element
                pointer to real DOM created
              key: string|number
                ex:
                  h('div', {key:1}, [])
        html ref library
          a
            a({
              attrs: {href: path},
              class: {selected: state.filter === filterTag}
            }, label)
            a({
              "attrs": {
                "href": "https://htmlg.com/",
                "target": "_blank",
                "rel": "nofollow"
              }
            }, [`Click here`])
            a({
              "attrs": {
                "href": "mailto:me@ruwix.com?Subject=Hi%20mate",
                "target": "_top"
              }
            }, [`Send Mail`])
            a({
              "attrs": {
                "href": "#footer"
              }
            }, [`Jump to footnote`]),
            a({
              "attrs": {
                "name": "footer"
              }
            }),
          button
            button('.destroy')
            button('.clear-completed', 'Clear completed (' + amountCompleted + ')')
          div
            div([`Block element`])
          em(["Italic text"])
          footer('.footer', {style: footerStyle}, [..])
          form({
            "attrs": {
              "action": "/action.php",
              "method": "post"
            }
            }, [
              "Name: ",
              input({
                "attrs": {
                  "name": "name",
                  "type": "text"
                }
              }),
              br(),
            ])
          h
            h1([`Page title`]),
            h2([`Subheading`]),
            h3([`Tertiary heading`]),
            h4([`Quaternary heading`])
          hr()
          iframe
            iframe({
              "attrs": {
                "src": "link.html",
                "width": "200",
                "height": "200"
              }
            }, [])
          img
            img({
              "attrs": {
                "src": "/demo.jpg",
                "alt": "description",
                "width": "100",
                "height": "48"
              }
            })
          input
            input({
              "attrs": {
                "max": "99",
                "min": "1",
                "name": "age",
                "step": "1",
                "type": "number",
                "value": "18"
              }
              }),
            input('.edit', {
              props: {type: 'text'},
              hook: {
                update: (oldVNode, {elm}) => {
                  elm.value = title;
                  if (editing) {
                    elm.focus();
                    elm.selectionStart = elm.value.length;
                  }
                }
              }
            })
            input('.toggle', {
              props: {type: 'checkbox', checked: completed},
            }),
            input('.new-todo', {
              props: {
                type: 'text',
                placeholder: 'What needs to be done?',
                autofocus: true,
                name: 'newTodo',
                value: state.inputValue
              }
              })
            input('.toggle-all', {
              props: {type: 'checkbox', checked: allCompleted},
              }),
            type: radio
              input({
                "attrs": {
                  "checked": "checked",
                  "name": "newsletter",
                  "type": "radio",
                  "value": "daily"
                }
              }),
              " Daily ",
              input({
                "attrs": {
                  "name": "newsletter",
                  "type": "radio",
                  "value": "weekly"
                }
              }),
              " Weekly",
            input({
              "attrs": {
                "type": "submit",
                "value": "Submit"
              }
              })
            input('.slider', {
              attrs: {type: 'range', min: props.min, max: props.max, value}
            })
          label(title),
          li([
            a({
              attrs: {href: path},
              class: {selected: state.filter === filterTag}
            }, label)
            ]);
          nav
            nav([
              span({
                dataset: {page: 'home'},
                class: {'active': pathname === '/home'}
              }, 'Home'),
              span({
                dataset: {page: 'about'},
                class: {'active': pathname === '/about'}
              }, 'About'),
          p
            p({
              "style": {
                "name": "style",
                "value": "text-align: center;"
              }
            }, [`text`]),
          section('.main', {style: sectionStyle}, [ listVDom ]);
          select({
            "attrs": {
              "name": "gender"
            }
            }, [
              option({
                "attrs": {
                  "selected": "selected",
                  "value": "male"
                }
              }, ["Male"]),
              option({
                "attrs": {
                  "value": "female"
                }
              }, ["Female"])
            ]),
          span
            span({
              dataset: {page: 'home'},
              class: {'active': pathname === '/home'}
            }, 'Home'),
            span('.todo-count', [
              strong(String(amountActive)),
              ' item' + (amountActive !== 1 ? 's' : '') + ' left'
            ]),
            span({
              "style": {
                "name": "style",
                "value": "text-decoration: underline;"
              }
            }, ["Underlined text"])
          strong(String(amountActive)),
          table
            table([
              caption(["Phone numbers"]),
              thead([
                tr([
                  th(["Name"]),
                  th({
                    "attrs": {
                      "colspan": "2"
                    }
                  }, ["Phone"])
                ])
              ]),
              tbody([
                tr([
                  td(["John"]),
                  td(["577854"]),
                  td(["577855"])
                ]),
                tr([
                  td(["Jack"]),
                  td(["577856"]),
                  td(["577857"])
                ])
              ]),
              tfoot([
                tr([
                  td([]),
                  td(["Personal"]),
                  td(["Office"])
                ])
              ])
            ])
          textarea({
            "attrs": {
              "cols": "20",
              "name": "comments",
              "rows": "5"
            }
            }, ["Comment"]),
          ul('.filters', [
            renderFilterButton(state, '', '/', 'All'),
            renderFilterButton(state, 'active', '/active', 'Active'),
            renderFilterButton(state, 'completed', '/completed', 'Completed'),
            ]),
        idioms
          toHTML convert to concrete HTML
            var out = toHTML(vdom)
          h function
            var vdom = h("ul#bestest-menu", items.map( e =>
              h(`li#item-${e.id}`, e.title))
            );
          bootstrap attributes
            h("ul#myTab.nav.nav-tabs", {
              "attrs": {
                "role": "tablist",
              },
          attributes like href
            a({
              attrs: {href: path},
              class: {selected: state.filter === filterTag}
              }, label)
          css styles
            display
              const footerStyle = {'display': state.list.length ? '' : 'none'};
              footer('.footer', {style: footerStyle}, [..])
          dynamic class based on state
            a({
              attrs: {href: path},
              class: {selected: state.filter === filterTag}
              }, label)
          state and vdom
            return xs.combine(state$, childrenVDOM$)
              .map(([state, childrenVDOM]) => {
                const color = idToColor(state.id)
                return div({style: style(color)}, [
                  button('.add', ['Add Folder']),
                  state.removable && button('.remove', ['Remove me']),
                  state.children && div({}, childrenVDOM),
                ])
              })
            xs.combine(state$, listVDom$).map(([state, listVDom]) =>
              div([
                renderHeader(state),
                renderMainSection(state, listVDom),
                renderFooter(state)
              ])
          hooks for input
            input('.edit', {
              props: {type: 'text'},
              hook: {
                update: (oldVNode, {elm}) => {
                  elm.value = title;
                  if (editing) {
                    elm.focus();
                    elm.selectionStart = elm.value.length;
                  }
                }
              }
            })
          many elements
            <url:/Users/mertnuhoglu/codes/js/cyclejs/examples/advanced/many/src/List.js#tn=function view(items$) {>}
            return items$.map(items => {
              const itemVNodeStreamsByKey = items.map(item =>
                item.DOM.map(vnode => {
                  vnode.key = item.id; return vnode;
                })
              );
              return xs.combine(...itemVNodeStreamsByKey)
                .map(vnodes => div('.list', [addButtons].concat(vnodes)));
            }).flatten();
          display if
            state.removable && button('.remove', ['Remove me']),
            state.children && div({}, childrenVDOM),
            ex: logic: display button if x > 0
              (amountCompleted > 0 ?
                button('.clear-completed', 'Clear completed (' + amountCompleted + ')')
                : null
              )
        ref ex:
          <url:file:///~/codes/js/todomvc-cycle-onion/src/components/TaskList/view.js>
      hyperaxe
        https://github.com/ungoldman/hyperaxe
        ex
          var { a, img, video } = require('hyperaxe')
          a({ href: '#' }, 'click')
          // <a href="#">click</a>
          img({ src: 'cats.gif', alt: 'lolcats' })
          // <img src="cats.gif" alt="lolcats">
          video({ src: 'dogs.mp4', autoplay: true })
          // <video src="dogs.mp4" autoplay="true"></video>
        custom tags
          var x = require('hyperaxe')
          var p = x('p')
          p('over 9000')
          // <p>over 9000</p>
        css shorthand
          var horse = x('.horse.with-hands')
          horse('neigh')
          // <div class="horse with-hands">neigh</div>
        custom components
          var siteNav = (...links) => x('nav.site')(
            links.map(link =>
              x('a.link')({ href: link.href }, link.text)
            )
          )
          x.body(
            siteNav(
              { href: '#apps', text: 'apps' },
              { href: '#games', text: 'games' }
            )
          )
          // <body>
          //   <nav class="site">
          //     <a class="link" href="#apps">apps</a>
          //     <a class="link" href="#games">games</a>
          //   </nav>
          // </body>
        API
          hyperaxe
            args
              tag: String
              props: object
              children: node, string, number, array
            returns: a function that creates HTML elements
            factory is variadic
              x('.variadic')(
                x('h1')('hi'),
                x('h2')('hello')
              )
            array works too
              x('.arrays')([
                x('p')('hello'),
                x('p')('mert')
              ])
          HTMLElement.outerHTML
            returns stringified HTML
          hyperaxe[tag]
            all HTML tags are attached to `hyperaxe` as keys
            partial application
      hyperscript
        ex
          var h = require('hyperscript')
          h('div#page',
            h('div#header',
              h('h1.classy', 'h', { style: {'background-color': '#22f'} })),
            h('div#menu', { style: {'background-color': '#2f2'} },
              h('ul',
                h('li', 'one'),
                h('li', 'two'),
                h('li', 'three'))),
              h('h2', 'content title',  { style: {'background-color': '#f22'} }),
              h('p',
                "so it's just like a templating engine,\n",
                "but easy to use inline with javascript\n"),
              h('p',
                "the intention is for this to be used to create\n",
                "reusable, interactive html widgets. "))
        API
          h(tag, attrs, [text?, Elements?, ...])
            classes&id
              ex: name.class1.class2#id
              shortcut 
            default tag name
              if tag name is omitted, it defaults to <div>
            attributes
              {href: 'https://npm.im/hyperscript'}
              gotchas:
                colspan -> colSpan
                for -> htmlFor
              events
                if an attribute is a function, it is registered as an event listener
                ex
                  var h = require('hyperscript')
                  h('a', {href: '#',
                    onclick: function (e) {
                      alert('you are 1,000,000th visitor!')
                      e.preventDefault()
                    }
                  }, 'click here to win a prize')
              styles
                if attr has style property it is handled specially
                ex
                  h('h1.fun', {style: {'font-family': 'Comic Sans MS'}}, 'Happy Birthday!')
                ex: or as a string
                  h('h1.fun', {style: 'font-family: Comic Sans MS'}, 'Happy Birthday!')
            children
              string: TextNode is created
              HTMLElement: 
              null: ignored
              Array
                ex
                  var obj = {
                    a: 'Apple',
                    b: 'Banana',
                    c: 'Cherry',
                    d: 'Durian',
                    e: 'Elder Berry'
                  }
                  h('table',
                    h('tr', h('th', 'letter'), h('th', 'fruit')),
                    Object.keys(obj).map(function (k) {
                      return h('tr',
                        h('th', k),
                        h('td', obj[k])
                      )
                    })
                  )
      html2hyperscript cli
        http://html-to-hyperscript.paqmind.com/
          https://github.com/ivan-kleshnin/html-to-hyperscript
      html tags important
        html-css-js.com/html/tags
          a
          body
          br
          div
          form
          h1-h2-h3-h4
          head
          html
          iframe
          img
          input
          li
          link
          meta
          ol
          option
          p
          script
          select
          span
          style
          table
          td
          textarea
          title
          tr
          ul
    introspection - metaprogramming - reflection
      ownKeys
        const delay = require('xstream/extra/delay').default
        console.log(typeof delay)
        //> function
        const keys = Reflect.ownKeys(delay)
        console.log(keys)
        //> [ 'length', 'name', 'prototype' ]
      getOwnPropertyNames
        console.log(Object.getOwnPropertyNames(sources.DOM))
    modules
      webpack
        Error: Cannot find module '../lib/polyfills'
          cause: I copied the project from somewhere else
            some of the references broken
          solution:
            npm install --save-dev webpack-dev-server
        Error: devServer.proxy is not a function
          solution:
            webpack.config.js
              //devServer.proxy({
                //'/api': { target: 'http://localhost:3000' }
              //}),
            npm run build
            open build/index.html
    nodejs
      update npm
        sudo npm install -g npm
      update node
        https://davidwalsh.name/nvm
        sudo npm cache clean -f
        sudo npm install -g n
        nvm ls
        # check local node versions
        nvm ls-remote
        # check available node versions
        nvm install 9.8.0
        nvm install 10.0.0
        # install node version
        nvm use 10.0.0
        # use v 10
      repl
        error: invalid repl keyword
          ex:
            request('http://jsonplaceholder.typicode.com/users/1')
              .then( html => console.log('body:', html) )
          cause:
            node's repl has commands that begin with `.` such as `.clear`
          solution:
            request('http://jsonplaceholder.typicode.com/users/1').
              then( html => console.log('body:', html) )
      install tools: npm npx
      string templates
        backtick ` not "
        `//${ocpu_domain}/ocpu/library/stats/R`
      import source require
        local library
          var $ = require("jquery")
        global library
          npm link <library>
          var $ = require("jquery")
      passing server side parameters to client side js
        https://stackoverflow.com/questions/5927824/best-practice-for-passing-server-side-variables-to-javascript
          2 correct ways
            data as a service: REST service for parameter
            inject data into HTML: js will extract it from HTML
        expressjs
          https://stackoverflow.com/questions/10919650/accessing-express-js-local-variables-in-client-side-javascript
            sending data to pug template
              nodejs
                var myMongo = {name: 'stephen'}
                res.render('home', {locals: {data: myMongo}})
              home.pug
                p Hello #{data.name}
              output in html
                Hello stephen
            sending data to client side js
              opt1: data in HTML
                home.pug
                  - local_data = JSON.stringfiy(data)
                  input(type='hidden', value=local_data)#myLocalDataObj
                client side js
                  var localObj = JSON.parse($("#myLocalDataObj").val())
                  console.log(localObj.name)
              opt2: data as rendered js
                script.
                  var local_data = !{JSON.stringify(data)}
              opt2b: 
                nodejs
                  res.render('search-directory', {
                    title: 'My Title',
                    place_urls: JSON.stringify(placeUrls),
                  });
                client js
                  var placeUrls = !{place_urls};
          https://stackoverflow.com/questions/16098397/pass-variables-to-javascript-in-expressjs
            nodejs
              res.render(.., { arg: "arg data" } )
            html
              <script> var arg = .. </script>
            normal data aktarımı 
              h1= title
              p Welcome to #{title}
      dotenv: environment variables configuration
        https://github.com/motdotla/dotenv
          const dotenv = require('dotenv');
          dotenv.load({ path: '.env.example' });
        define in .env
          MONGODB_URI=mongodb://myUserAdmin:12345@localhost:27017/test
        use
          mongoose.connect(process.env.MONGODB_URI);
        define in docker-compose.yml
          environment:
           - MONGODB_URI=mongodb://myUserAdmin:12345@mongo:27017/beyp_poc
      msg: Error: spawn psql ENOENT
        at exports._errnoException (util.js:1036:11)
        at Process.ChildProcess._handle.onexit (internal/child_process.js:193:32)
        at onErrorNT (internal/child_process.js:359:16)
        at _combinedTickCallback (internal/process/next_tick.js:74:11)
        at process._tickCallback (internal/process/next_tick.js:98:9)
        cause
          psql is missing to execute/spawn
          cannot find the program that it tries to spawn
        general debug
          https://stackoverflow.com/questions/27688804/how-do-i-debug-error-spawn-enoent-on-node-js#27883443
      api doc
        https://nodejs.org/api/
      file system io
        ls list files
          ex
            var dir = './'; // your directory
            var files = fs.readdirSync(dir);
          sort files
            files.sort(function(a, b) {
              return fs.statSync(dir + a).mtime.getTime() - 
              fs.statSync(dir + b).mtime.getTime();
            });
      process
        get working directory getwd pwd
          process.cwd()
    npm
      npm i 
        npm i <lib> -D
        npm i <lib> --save-dev
      pnpm: faster npm
        uses symlinks instead of hard files everytime
        install
          npm install -g pnpm
        update
          pnpm install -g pnpm
        usage
          npm init -y
          pnpm install lodash
        commands
          store prune
            remove unreferenced packages
      errors
        node-gyp: gyp ERR! stack You can pass the --python switch to point to Python >= v2.5.0 & < 3.0.0.
          where python
          npm install --python=/usr/bin/python -g underscore-cli
      local npm repository: verdaccio
        https://github.com/verdaccio/verdaccio
        npm install --global verdaccio
        verdaccio
        open http://localhost:4873
        npm adduser --registry  http://localhost:4873
        npm publish --registry http://localhost:4873
        # updating
          npm version <update_type>
            patch, minor, major
        # new package
          npm init -y
      use new local npm module without publishing it every 5 minutes
        ref
          <url:/Users/mertnuhoglu/projects/study/js/study_js.Rmd#tn=### Node.js — How to test your new NPM module without publishing it every 5 minutes - Alex Mills>
        cd <viking-root>
        npm link
        cd <tudor-root>
        npm link viking # create a symlink locally to global viking symlink
        # issues
          bunu yapınca npm i komutunda sorun çıkar
          npm install <lib> yaptıktan sonra yeniden link etmen lazım
    npm cli tools
      http-server
        http-server .
    ramdajs
      const newObject = R.omit([propertyToRemove], origObject)
      curry
        returns a curried equivalent of given function
        ex: equivalent calls:
          var g = R.curry(f)
          g(1)(2)
          g(1,2)
        ex: placeholder 
          var _ = R.__
          g(_,2)(1)
        ex
          var addFourNumbers = (a, b, c, d) => a + b + c + d;
          var curriedAddFourNumbers = R.curry(addFourNumbers);
          var f = curriedAddFourNumbers(1, 2);
          var g = f(3);
          g(4); //=> 10
      pluck
      assoc
      assocPath
      identity
      lens
        returns a lens for given getter and setter functions
        ex
          var xLens = R.lens(R.prop('x'), R.assoc('x'));
          R.view(xLens, {x: 1, y: 2});            //=> 1
          R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
          R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
      lensProp
        ex
          var xLens = R.lensProp('x');
          R.view(xLens, {x: 1, y: 2});            //=> 1
          R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
          R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
      lensPath
        deprecated
        ex
          const twitterLens = lensPath(['socialMedia', 'twitter'])
      set 
        sets the object to the given lens and returns the result
        ex
          var xLens = R.lensProp('x');
          R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
          R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
    rxjs
      ref
        <url:file:///~/projects/study/js/study_learn_rxjs.Rmd>
        v6 rxjs based cyclejs <url:#r=cjs_003>
      install
        npm install rxjs
      setup example
        es6
          import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
          import { map, filter, switchMap } from 'rxjs/operators';
          range(1, 200)
            .pipe(filter(x => x % 2 === 1), map(x => x + x))
            .subscribe(x => console.log(x));
        nodejs
          const { Observable, Subject, ReplaySubject, from, of, range } = require('rxjs');
          const { map, filter, switchMap } = require('rxjs/operators');
          range(1, 200)
            .pipe(filter(x => x % 2 === 1), map(x => x + x))
            .subscribe(x => console.log(x));
      ex01: setHtml
        const setHtml = id => val => (document.getElementById(id).innerHTML = val);
        const addOneClick$ = id =>
          fromEvent(document.getElementById(id), 'click').pipe(
            // map every click to 1
            mapTo(1),
            startWith(0),
            // keep a running total
            scan((acc, curr) => acc + curr),
            // set HTML for appropriate element
            tap(setHtml(`${id}Total`))
          );
        const combineTotal$ = combineLatest(addOneClick$('red'), addOneClick$('black'))
          .pipe(map(([val1, val2]) => val1 + val2))
          .subscribe(setHtml('total'));
      pluck
        https://www.learnrxjs.io/operators/transformation/pluck.html
      reactivex / rxjs v4
        pluck
          ex
            var source = Rx.Observable
                .from([
                    { value: 0 },
                    { value: 1 },
                    { value: 2 }
                ])
                .pluck('value');
            // => Next: 0
            // => Next: 1
            // => Next: 2
      creation
        create
          ex01
            const hello = Observable.create(function(observer) {
              observer.next('Hello');
              observer.next('World');
            });
            const subscribe = hello.subscribe(val => console.log(val));
    date
      utc gmt 
        utc: coordinated universal time
          this is a standard not a time zone
          but people use it as time zone of GMT as well
        gmt: greenwich mean time
          this is the time zone
      Date.toISOString()
        https://www.ecma-international.org/ecma-262/6.0/#sec-date.prototype.toisostring
        time zone is always UTC, denoted by suffix Z
        ex: 2013-02-04T22:44:30.652Z
      Date Time String Format: Simplification of ISO 8601 Extended Format
        https://www.ecma-international.org/ecma-262/6.0/#sec-date-time-string-format
        YYYY-MM-DDTHH:mm:ss.sssZ
          T: separator
          HH: 00-24
          sss: milliseconds
          Z: time zone
            Z: UTC
            + or -
      Date.toLocaleDateString
      string to date
        opt1: Date.parse()
          Date.parse(dateString)
          dateString in ISO8601 format
          Date.parse("12.04.2017")
          Date.parse("13.04.2017")
            NaN
          Date.parse("12.30.2017")
          new Date("12.30.2017")
          new Date("13.04.2017")
            Invalid
        opt2: moment.js
      new Date
        var today = new Date();
        var birthday = new Date('December 17, 1995 03:24:00');
        var birthday = new Date('1995-12-17T03:24:00');
        var birthday = new Date(1995, 11, 17);
        var birthday = new Date(1995, 11, 17, 3, 24, 0);
      moment
        install
          npm install -g moment
          var moment = require()
        basic
          var now = moment();
        string to date
          moment: string to date
            moment(String, String);
            var dt = moment("1995-12-25", "YYYY-MM-DD");
            # ignores separators:
            moment("12-25-1995", "MM-DD-YYYY");
            moment("12/25/1995", "MM-DD-YYYY");
          moment: multiple options
            moment("12-25-1995", ["MM-DD-YYYY", "YYYY-MM-DD"]);
          unix timestamp 
            (milliseconds)
              var day = moment(1318781876406);
            seconds
              var day = moment.unix(1318781876);
        date to string: format()
          opt1: moment(date).format(str)
            StartDate = moment(StartDate).format('YYYY-MM-DD');
          opt2: moment(new Date(str))
            var dateString = 'Thu Jul 15 2016 19:31:44 GMT+0200 (CEST)';
            var dateObj = new Date(dateString);
            var momentObj = moment(dateObj);
            var momentString = momentObj.format('YYYY-MM-DD'); // 2016-07-15
            moment("25/01/1995", "DD/MM/YYYY").toISOString() // 2013-02-04T22:44:30.652Z
            moment("2017/07/14 18:19", "YYYY/MM/DD HH:mm").toISOString()
            # "2017-07-14T15:19:00.000Z"
            moment("2017/07/14 18:19", "YYYY/MM/DD HH:mm").format() // 2017-07-14T18:19:00+03:00
            moment("2017/07/14 18:19", "YYYY/MM/DD HH:mm").format("YYYY-MM-DDTHH:mm:ss") // 2017-07-14T18:19:00
      iso8601 date formats
        Date: 2017-07-04
        Combined date and time in UTC:  
          2017-07-04T11:24:41+00:00
          2017-07-04T11:24:41Z
          20170704T112441Z
        Week: 2017-W27
        Date with week number:  2017-W27-2
        Date without year:  --07-04
        Ordinal date: 2017-185
      iso8601
        new Date("2017-07-04")
        new Date(Date.parse("2017-07-04"))
        moment("2017-07-04")
    twitter bootstrap id=g_10145
      twitter bootstrap <url:file:///~/projects/study/study/study_js.md#r=g_10145>
      ref
        bootstrap twitter bootstrap <url:file:///~/Dropbox/mynotes/content/articles/articles_js.md#r=g_10186>
      cheatsheets
        https://hackerthemes.com/bootstrap-cheatsheet/
      themes
        dashgum: saf html
        blur: çok güzel, fakat angular
        AdminLTE
        coreui: güzel
        gentetella: çok kapsamlı
      template builders
        free
          http://www.layoutit.com/build
          http://angrytools.com/bootstrap/editor/
          https://pingendo.com/new
        http://bootstrapstarterkit.com
        https://mobirise.com
        brix.io
        http://www.cssauthor.com/bootstrap-editors/
        http://mashable.com/2013/10/20/bootstrap-editors/#2EoYSV03PaqW
      intellij support
        bootstrap templates
          bs3-...
          shortcut: #j
      bootstrap setup
        opt1: bower
          http://stackoverflow.com/questions/36160883/getting-start-with-node-express-and-bootstrap
            sudo npm install bower -g
            nano .bowerrc
            {
            "directory":"./public"
            }
            bower install bootstrap --save
        opt2: manual
      tabs in bootstrap
        http://getbootstrap.com/javascript/#tabs
          opt1: only markup
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="home">tab1</div>
    typescript
      keyof
        Index Types
          http://www.typescriptlang.org/docs/handbook/advanced-types.html
          to check code that uses dynamic property names
          ex: 
            pluck function
              function pluck(o, names) {
                return names.map(n => o[n])
              }
            in typescript
              function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
                return names.map(n => o[n])
              }
              interface Person {
                name: string
                age: number
              }
              let person: Person = {
                name: 'Jarid',
                age: 35
              }
              let strings: string[] = pluck(person, ['name'])
          ex:
            let personProps: keyof Person; // 'name' | 'age'
      interfaces
        https://www.typescriptlang.org/docs/handbook/interfaces.html
        Function Types 
          ex:
            interface definition:
              interface SearchFunc {
                  (source: string, subString: string): boolean;
              }
            this is nearly equivalent to:
              function SearchFunc(source: string, subString: string): boolean
            using
              let mySearch: SearchFunc;
              mySearch = function(source: string, subString: string) {
                  let result = source.search(subString);
                  return result > -1;
              }
    widgets
      jquery widgets
        datettimepicker
          http://xdsoft.net/jqplugins/datetimepicker/
          how to use
            page scripts
              <link rel="stylesheet" type="text/css" href="/jquery.datetimepicker.css"/ >
              <script src="/jquery.js"></script>
              <script src="/build/jquery.datetimepicker.full.min.js"></script>
            use
              HTML
                <input id="datetimepicker" type="text" >
              javaScript
                jQuery('#datetimepicker').datetimepicker();
    xstream
      import xstream
        const xs = require('xstream').default
        import xs from 'xstream';
      documentation
        http://staltz.github.io/xstream
        overview  
          4 fundamental types:
            Stream, Listener, Producer, MemoryStream
          Stream  
            an event emitter
            methods: called operators such as map, filter, fold
            operator: returns a new Stream
          Listener
            an object with 3 functions: next, error, complete
          Producer
            events of a Stream come from Producer
            an object with 2 functions: start(listener), stop()
            Streams are also Listeners
            ex: xs.create(producer)
              this returns a Stream (Listener)
            ex:
              var producer = {
                start: function (listener) {
                  this.id = setInterval(() => listener.next('yo'), 1000)
                },
                stop: function () {
                  clearInterval(this.id)
                },
                id: 0,
              }
              // This fellow delivers a 'yo' next event every 1 second
              var stream = xs.create(producer)
            a Producer has only one listener
            a Stream may have many listeners
            when is start and stop called?
              see: MemoryStream
          MemoryStream
            like a Stream
              it has operators, 
              it can have multiple listeners 
            difference: it has memory
              it can remember the last next event that it sent to its listeners
            when a new listener is added, MemoryStream sends the last event to it
          How a Stream starts and Stops
            create a Stream:
              xs.create(producer)
              // producer.start() is not yet called
              // stream is idle
            once the first Listener is added
              Stream calls producer.start() 
        Factories
          create(producer)
          createWithMemory(producer)
          never()
          empty()
          throw(error)
          from(input)
            Array, Promise or Observable
          of(a, b)
            of(1,2,3)
          fromArray(array)
          fromPromise(promise)
          fromObservable(observable)
          periodic(period)
            periodic(1000)
          merge(stream1, stream2)
          combine(stream1, stream2)
        Methods and Operators
          operators return a new Stream
          addListener(listener)
          removeListener(listener)
          subscribe(listener)
          map(project)
          mapTo(value)
          filter(condition)
          take(amount)
          drop(amount)
          last()
          startWith(initial)
          endWhen(stream)
          fold(afun(acc, x), initial)
          replaceError(replace)
          flatten()
          compose(operator)
          remember()
            returns: MemoryStream
            a new stream like input stream
            but remembers the last event
          debug(spyFun)
          imitate(target)
            allows circular dependency of streams
    other topics
      book
        https://github.com/magicbookproject/magicbook
        http://ramdajs.com/0.21.0/index.html
        https://github.com/MostlyAdequate/mostly-adequate-guide
      graph libraries
        graph library: d3
          http://maurizzzio.github.io/greuler/#/
        react links from ericelliott
          https://github.com/ericelliott/react-things
          https://github.com/ericelliott/essential-javascript-links#react
        https://medium.com/javascript-scene/common-misconceptions-about-inheritance-in-javascript-d5d9bab29b0a#.68evlsqlw
        https://medium.com/javascript-scene/the-dao-of-immutability-9f91a70c88cd#.pdjmp6r3z
      elm
        http://www.elmbark.com/2016/03/16/mainstream-elm-user-focused-design
        https://github.com/Nazanin1369/elm-memoryGame
          memory game in elm
      hackathon-starter
        mongodb credentials
          .env.example
            #MONGODB_URI=mongodb://localhost:27017/test
            MONGODB_URI=mongodb://myUserAdmin:12345@localhost:27017/test
      pug jade id=g_10139
        pug jade <url:file:///~/Dropbox/mynotes/content/articles/articles_js.md#r=g_10139>
        https://webapplog.com/jade/
          tags: first word
            body
              div content
              div
              | this is content too
          variables
            pug
              h1= title
              p= body
            locals
              {
                title: "guide"
                body: ..
          attributes
            div(id="content")
            div(id=variable)
            a#main-link
              <a id="main-link"></a>
          use | for text as well
          literals: classes and IDs right after tag names
            div#content
            p.center
            #notag
          if no tag used, then it is div
          script/style blocks
            script.
              console.log(..)
            style.
              css code
          execute js code
            - var arr = [3,2]
            span= arr[1]
            span!= "unescaped"
          comments
            // comment
            //- comment hidden from html
          conditions if
            if user.admin
              ..
            else
              ..
          iterations each loops
            div
              - var languages = {'php': 2}
              each key, value in languages
                p= key + ". " + value
              - var items = {'php', 'java'}
              each item, index in items
                td= item
          filters: for markdown
            p
              :markdown
                # practical
          interpolation via #{name}
            p read #{title}
          case
            case coins
              when 0
                p ..
              when 1
                p ..
          mixins: functions that produce html. usage is +fun(params)
            mixin row(items)
              tr 
                each item, index in items
                  td= item
            mixin table(tableData)
              table
                each row, index in tableData
                  +row(row)
            - var node = [{name: "express"}]
            +table(node)
          include
            include ./inc/header
            include ../inc/footer
          extend: replace parent files
            parent
              block header
                p ...
            child
              extend parent
              block header
                p overwrite it
          standalone usage
            tldr
    stuff
      memoizee
        https://github.com/medikoo/memoizee
        ex
          var memoize = require("memoizee");
          var fn = function(one, two, three) {
            /* ... */
          };
          memoized = memoize(fn);
          memoized("foo", 3, "bar");
          memoized("foo", 3, "bar"); // Cache hit
      mdn: mozilla developer network
        https://developer.mozilla.org/
      Learn CSS Grid for free
        https://scrimba.com/g/gR8PTE
        https://laracasts.com/series/css-grids-for-everyone
      Es2015+ Cheatsheet
        https://devhints.io/es6
      CSS Cheatsheet
        https://adam-marsden.co.uk/css-cheat-sheet

## unclassified

    generator functions
      function* mdn
        https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function*
        Generators are functions which can be exited and later re-entered. Their context (variable bindings) will be saved across re-entrances.
        ex
          function* idMaker() {
            var index = 0;
            while (index < 3)
              yield index++;
          }
          var gen = idMaker();
          console.log(gen.next().value); // 0
          console.log(gen.next().value); // 1
        ex
          function* anotherGenerator(i) { yield i + 1; }
          function* generator(i) {
            yield i;
            yield* anotherGenerator(i);
            yield i + 10;
          }
          var gen = generator(10);
          console.log(gen.next().value); // 10
          console.log(gen.next().value); // 11
      Iterators and generators
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
        iterators
          object is an iterator
            when it knows
              how to access items 
              while keeping track of current position
            in js
              next() method
                returns: object with done and value
          code
            function makeIterator(array) {
              var nextIndex = 0
              return {
                next: function() {
                  return nextIndex < array.length ?
                    {value: array[nextIndex++], done: false} :
                    {done: true};
                  }
                }
              }
          code - use
            var it = makeIterator(['yo', 'ya'])
            console.log(it.next().value) // yo
            console.log(it.next().value) // ya
        generators
          syntactic sugar to simplify iterator functions
          code 
            function* idMaker() {
              var index = 0;
              while(true)
                yield index++;
            }
            var gen = idMaker();
            console.log(gen.next().value); // 0
            console.log(gen.next().value); // 1
        iterable
          iterable if can be loop in a for loop
          must implement @@iterator method
            object has a property with Symbol.iterator key
          code
            var myIterable = {};
            myIterable[Symbol.iterator] = function* () {
                yield 1;
                yield 2;
                yield 3;
            };
            for (let value of myIterable) { 
                console.log(value); 
            }
            // 1
            // 2
            // 3
            or
            [...myIterable]; // [1, 2, 3]
        built-in iterables  
          String, Array, TypedArray, Map, Set
          their prototype objects have a Symbol.iterator method
        syntaxes expecting iterables
          for-of, spread operator, yield*, destructuring assignment
          code
            for (let value of ['a', 'b']) {..}
            [...'abc']
            function* gen() {
              yield* ['a','b']
            }
            gen().next()
            [a,b,c] = new Set(['a','b','c'])
            a
    bir satırın nerelerden çağrıldığını nasıl buluruz?  
      console.trace()
    CORS
      same-origin policy
        js cannot access resources from other websites. 
        it can access resources from that same site
      problem with file://
        origin becomes "null"
        thus you cannot import other js modules
      solution
        make the resources 
    json-server: mockup rest services
      
    Craig Spence - Fantastic ASTs and where to find them
      https://www.youtube.com/watch?v=UKCoRKzRqN4
    Alexander Pope - OUTBREAK: index-sw-9a4c43b4b4778e7d1ca619eaaf5ac1db.js
      https://www.youtube.com/watch?v=t7WraVE8rY8
    Brittany Storoz - A year of other’s bugs: the sad state of error handling
      https://www.youtube.com/watch?v=fQHH6aSpYV0
    Eirik Vullum: JavaScript Metaprogramming - ES6 Proxy Use and Abuse | JSConf Budapest 2017
      https://www.youtube.com/watch?v=_5X2aB_mNp4
      prevent XSS
    Dan Callahan: Practical WebAssembly | JSConf Budapest 2017
      https://www.youtube.com/watch?v=bac0dGQbUto
      chrome devtools > console > select an object > right > make global
    David Khourshid: Simplifying Complex UIs with Finite Automata & Statecharts | JSConf Iceland 2018
      https://www.youtube.com/watch?v=RqTxtOXcv8Y
    Will Klein: End to End Testing: The Game Has Changed | JSConf Iceland 2018
      https://www.youtube.com/watch?v=C1D94jWy8uE
    Kate Compton: Creating generative art with Javascript | JSConf Iceland 2018
    Dominik Kundel: XSS, CSRF, CSP, JWT, WTF? IDK ¯\_(ツ)_/¯ | JSConf Iceland 2018
    Opher Vishnia: Wait, you can do that with JavaScript…!? | JSConf Iceland 2018
    Deploying serverless Node.js microservices (Google I/O '18)
    Jake Archibald: In The Loop - JSConf.Asia 2018
    The ServiceWorker: The network layer is yours to own






