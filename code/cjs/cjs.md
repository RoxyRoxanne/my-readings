
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

## cyclejs
running cyclejs examples
  git clone https://github.com/cyclejs/cycle-examples
  cd cycle-examples
  cd hello-world
  npm start
  open index.html

## nodejs

  api doc
    https://nodejs.org/api/

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

## Other

    bir satırın nerelerden çağrıldığını nasıl buluruz?  
      console.trace()
