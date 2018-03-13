
## 01: linear data flow with container 01

··  const nextChar = str =&gt; { <br>
····  const trimmed = str.trim() <br>
····  const number = parseInt(trimmed) <br>
····  const nextNumber = number + 1 <br>
····  return String.fromCharCode(nextNumber) <br>
··  } <br>
··  const result = nextChar('  64 ') <br>
··  #&gt; A <br>
··  ---&gt;&gt;&gt; <br>
··  const nextChar = str =&gt;  <br>
····  String.fromCharCode( parseInt( str.trim()) + 1) <br>
··  ---&gt;&gt;&gt; <br>
··  const nextChar = str =&gt;  <br>
····  {{c1::[str]}}  <br>
····  .{{c2::map}}(s =&gt; s.trim()) <br>
····  .map({{c3::s =&gt; parseInt(s)}}) <br>
····  .map(i =&gt; i + 1) <br>
····  .map(i =&gt; String.fromCharCode(i)) <br>
··  #&gt; {{c4::['A']}} <br>

%

%

clozeq

---

## 01: linear data flow with container 02

{{c1::map}} is {{c2::composition}} because

1. it takes {{c3::input to output}}

2. passes it along to the {{c4::next `map`}}

%

%

clozeq

---

## 01: linear data flow with container 03

Generalize array with Box:

····  const nextChar = str =&gt;  <br>
······  [str]  <br>
······  .map(s =&gt; s.trim()) <br>
····  ---&gt;&gt;&gt; <br>
····  const {{c1::Box}} = x =&gt; <br>
····  ({ <br>
······  {{c2::map}}: f =&gt; {{c3::Box}}(f(x)), <br>
······  {{c4::inspect}}: () =&gt; `Box(${x})` <br>
····  }) <br>
····  const nextChar = str =&gt;  <br>
······  {{c5::Box(str)}} <br>
······  .map(s =&gt; s.trim()) <br>
····  #&gt; Box(A) <br>

%

%

clozeq

---

## 01: linear data flow with container 04

How do we run `1—box.js` script?

··  {{c1::node}} 1—box.js <br>

%

%

clozeq

---

## 01: linear data flow with container 05

{{c1::fold}} removes {{c2::value}} from the container

How to move content out of Box?

··  const Box = x =&gt; <br>
··  ({ <br>
····  map: f =&gt; Box(f(x)), <br>
····  {{c1::fold}}: f =&gt; {{c2::f(x)}}, <br>
····  inspect: () =&gt; `Box(${x})` <br>
··  }) <br>
··  const nextChar = str =&gt;  <br>
····  Box(str) <br>
····  .map(s =&gt; s.trim()) <br>
····  .map(s =&gt; parseInt(s)) <br>
····  .fold(i =&gt; String.fromCharCode(i)) <br>
··  #&gt; A <br>

%

%

clozeq

---

## 01: linear data flow with container 06

`map` isn't it related to iteration?

map isn't about iteration.

it is related with {{c1::composition}} within a context.

Here the context is {{c2::`Box`}}

%

%

clozeq

---

## 02: refactoring imperative code 01

··  const moneyToFloat = str =&gt; <br>
····  parseFloat(str.replace(/\$/g, '')) <br>
··  ---&gt;&gt;&gt; <br>
··  const moneyToFloat = str =&gt; <br>
····  {{c1::Box}}(str) <br>
····  .map(s =&gt; {{c2::s.replace(/\$/g, '')}}) <br>
····  .{{c3::fold}}(r =&gt; {{c4::parseFloat(r)}}) <br>

%

%

clozeq

---

## 02: refactoring imperative code 02

··  const percentToFloat = str =&gt; { <br>
····  const replaced = str.replace(/\%/g, '') <br>
····  const number = parseFloat(replaced) <br>
····  return number * 0.01 <br>
··  } <br>
··  ---&gt;&gt;&gt; <br>
··  const percentToFloat = str =&gt; <br>
····  {{c1::Box}}(str.replace(/\%/g, '')) <br>
····  .{{c2::map}}(replaced =&gt; parseFloat(replaced)) <br>
····  .{{c3::fold}}(number =&gt; number * 0.01) <br>

%

%

clozeq

---

## 02: refactoring imperative code 03

··  const applyDiscount = (price, discount) =&gt; { <br>
····  const cost = moneyToFloat(price) <br>
····  const savings = percentToFloat(discount) <br>
····  return cost - cost * savings <br>
··  } <br>
··  ---&gt;&gt;&gt; <br>
··  const applyDiscount = (price, discount) =&gt; { <br>
····  moneyToFloat(price) <br>
····  .{{c1::fold}}(cost =&gt; <br>
······  percentToFloat(discount)  <br>
········  .{{c2::fold}}(savings =&gt; <br>
··········  cost - cost * savings <br>
········  ) <br>
····  ) <br>

%

%

clozeq

---

## 03: code branching with either 01

····  // const Either = {{c1::`Right ||`}}  Left <br>

Right, Left are {{c2::subtypes}} of Either

An object is {{c3::either}} Right or Left

%

%

clozeq

---

## 03: code branching with either 02

··  const result = Right(3).map(x =&gt; x + 1).map(x =&gt; x / 2) <br>
··  console.log(result) <br>
··  // {{c1::Right(2)}} <br>

%

%

clozeq

---

## 03: code branching with either 04

Right is like Box

··  const Right = x =&gt; <br>
··  ({  <br>
····  map: f =&gt; {{c1::Right(f(x))}}, <br>
····  inspect: () =&gt; `Right(${x})` <br>
··  }) <br>

%

%

clozeq

---

## 03: code branching with either 03

Left ignores input

··  const Left = x =&gt; <br>
··  ({ <br>
····  map: f =&gt; {{c1::Left(x)}}, <br>
····  inspect: () =&gt; `Left(${x})` <br>
··  }) <br>

%

%

clozeq

---

## 03: code branching with either 04

··  const result = Left(3).map(x =&gt; x + 1).map(x =&gt; x / 2) <br>
··  console.log(result) <br>
··  // {{c1::Left(3)}} <br>

%

%

clozeq

---

## 03: code branching with either 05

··  const Right = x =&gt; <br>
····  fold: {{c1::(f, g)}} =&gt; {{c2::g(x)}}, <br>
··  const Left = x =&gt; <br>
····  fold: (f, g) =&gt; {{c3::f(x)}}, <br>
··  const result = Right(3).map(x =&gt; x + 1).map(x =&gt; x / 2).{{c4::fold}}(x =&gt; 'error', x =&gt; x) <br>
··  // {{c5::2}} <br>
··  const result = Left(3).map(x =&gt; x + 1).map(x =&gt; x / 2) <br>
··  // {{c6::error}} <br>

%

%

clozeq

---

## 03: code branching with either 06

Either.fold: allows:

··  code {{c1::branching}} <br>
··  run {{c2::either}} left, or right side <br>
··  null checks <br>

%

%

clozeq

---

## 03: code branching with either 07

··  const findColor = name =&gt;  <br>
····  ({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'})[name] <br>
··  const result = findColor('red').slice(1).toUpperCase() <br>
··  console.log(result) <br>
··  // {{c1::#FF4444}} <br>
··  const result = findColor('green').slice(1).toUpperCase() <br>
··  console.log(result) <br>
··  // {{c2::throws error: undefined}} <br>

use {{c3::Either}} for null check

%

%

clozeq

---

## 03: code branching with either 08

··  const findColor = name =&gt; { <br>
····  const found = ({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'})[name] <br>
····  return {{c2::found}} ? {{c1::Right}}(found) : {{c1::Left}}(null) <br>
··  } <br>
··  const result = findColor('green') <br>
····  .{{c3::map}}(c =&gt; slice(1)) <br>
····  .{{c4::fold}}(e =&gt; 'no color',  <br>
··········  c =&gt; c.toUpperCase()) <br>
··  console.log(result) <br>
··  // {{c5::no color}} <br>

%

%

clozeq

---

## 03: code branching with either 09

findColor has now a branching. abstract this branching to fromNullable

··  const findColor = name =&gt; { <br>
····  const found = {red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'}[name] <br>
····  return found ? Right(found) : Left(null) <br>
··  } <br>
··  ---&gt;&gt;&gt; <br>
··  const {{c1::fromNullable}} = x =&gt; <br>
····  {{c2::x != null}} ? Right(x) : Left(null) <br>
··  const findColor = name =&gt;  <br>
····  {{c3::fromNullable}}({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'}[name]) <br>

%

%

clozeq

---

## 04: error handling with either 01

··  const getPort = () =&gt; { <br>
····  try { <br>
······  const str = fs.readFileSync('config.json') <br>
······  const config = JSON.parse(str) <br>
······  return config.port <br>
····  } catch(e) { <br>
······  return 3000 <br>
····  } <br>
··  } <br>
··  ---&gt;&gt;&gt; <br>
··  const tryCatch = f =&gt; { <br>
····  try { <br>
······  return {{c1::Right}}(f()) <br>
····  } catch(e) { <br>
······  return {{c2::Left}}(e) <br>
····  } <br>
··  } <br>
··  const getPort = () =&gt; { <br>
····  {{c3::tryCatch}}(() =&gt; fs.readFileSync('config.json')) <br>
····  .{{c4::map}}(c =&gt; JSON.parse(c)) <br>
····  .{{c5::fold}}(e =&gt; 3000, <br>
······  {{c6::c =&gt; c.port}}) <br>
··  } <br>

%

%

clozeq

---

## 04: error handling with either 02

··  const getPort = () =&gt;··  <br>
····  tryCatch(() =&gt; fs.readFileSync('confi.json')) <br>
····  .map(c =&gt; JSON.parse(c)) <br>
····  .fold(e =&gt; 3000, <br>
··········  c =&gt; c.port) <br>
··  const result = getPort() <br>

evaluation for Left

····  tryCatch(() =&gt; fs.readFileSync('confi.json')) <br>
······  #&gt; Left(e) <br>
····  .map(c =&gt; JSON.parse(c)) <br>
······  #&gt; Left(e) <br>
····  .fold(e =&gt; 3000, <br>
··········  c =&gt; c.port) <br>
······  #&gt; (e =&gt; 3000)(e) <br>
······  #&gt; 3000 <br>

%

%

clozeq

---

## 04: error handling with either 03

nested containers

··  .map(c =&gt; JSON.parse(c)) <br>
··  --&gt;&gt; <br>
··  .map( c =&gt; {{c1::tryCatch}}( () =&gt; JSON.parse(c)) ) <br>
··  --- <br>
··  const getPort = () =&gt;··  <br>
····  tryCatch(() =&gt; fs.readFileSync('config.json'))  <br>
····  .map(c =&gt; tryCatch(() =&gt; JSON.parse(c)))  <br>
····  .fold(e =&gt; 3000, <br>
··········  c =&gt; c.port) <br>
··  --- <br>
··  evaluation: <br>
····  const getPort = () =&gt;··  <br>
······  tryCatch(() =&gt; fs.readFileSync('config.json'))  <br>
······  #&gt; {{c2::Right}}(..) <br>
······  .map(c =&gt; tryCatch(() =&gt; JSON.parse(c)))  <br>
······  #&gt; {{c3::Right(Right(..))}} <br>
······  .fold(e =&gt; 3000, <br>
············  c =&gt; c.port) <br>

%

%

clozeq

---

## 04: error handling with either 04

how to solve nested containers?

··  const Right = x =&gt; ({ <br>
····  {{c1::chain}}: f =&gt; {{c2::f(x)}},  <br>
····  map: f =&gt; Right(f(x)), <br>
····  fold: (f,g) =&gt; g(x) <br>
··  }) <br>
··  const Left = x =&gt; ({ <br>
····  chain: f =&gt; {{c3::Left(x)}},  <br>
····  map: f =&gt; Left(x), <br>
····  fold: (f,g) =&gt; f(x) <br>
··  }) <br>
··  const getPort = () =&gt;··  <br>
····  tryCatch(() =&gt; fs.readFileSync('config.json')) // Right('') <br>
····  .{{c4::chain}}(c =&gt; tryCatch(() =&gt; JSON.parse(c)))  <br>
····  #&gt; {{c5::Right}}('') <br>
····  .fold(e =&gt; 3000, <br>
··········  c =&gt; c.port) <br>

%

%

clozeq

---

## 05: either examples 01

··  const openSite = () =&gt; { <br>
····  if (current—user) { <br>
······  return renderPage(current—user) <br>
····  } else { <br>
······  return showLogin() <br>
····  } <br>
··  } <br>
··  ---&gt;&gt;&gt; <br>
··  const openSite = () =&gt; <br>
····  {{c1::fromNullable}}(current—user) <br>
····  .{{c2::fold}}({{c3::showLogin}}, {{c4::renderPage}}) <br>

%

%

clozeq

---

## 05: either examples 02

··  const getPrefs = user =&gt; { <br>
····  if (user.premium) { <br>
······  return loadPrefs(user.preferences) <br>
····  } else { <br>
······  return defaultPrefs <br>
····  } <br>
··  } <br>
··  ---&gt;&gt;&gt; <br>
··  const getPrefs = user =&gt; <br>
····  ({{c1::user.premium}} ? Right(user) : Left('not premium')) <br>
····  .{{c2::map}}(u =&gt; u.preferences) <br>
····  .fold(() =&gt; defaultPrefs, {{c3::prefs =&gt; loadPrefs(prefs)}}) <br>

%

%

clozeq

---

## 05: either examples 03

··  const streetName = user =&gt; { <br>
····  const address = user.address <br>
····  if(address) { <br>
······  const street = address.street <br>
······  if(street) { <br>
········  return street.name <br>
······  } <br>
····  } <br>
····  return 'no street' <br>
··  } <br>
··  ---&gt;&gt;&gt; <br>
··  const streetName = user =&gt;  <br>
····  {{c1::fromNullable}}(user.address) <br>
····  .{{c2::chain}}(a =&gt; {{c3::fromNullable}}(a.street)) <br>
····  .{{c4::map}}(s =&gt; s.name) <br>
····  .{{c5::fold}}(e =&gt; 'no street', n =&gt; n) <br>

%

%

clozeq

---

## 05: either examples 04

··  const concatUniq = (x, ys) =&gt; { <br>
····  const found = ys.filter(y =&gt; y === x)[0] <br>
····  return found ? ys : ys.concat(x) <br>
··  } <br>
··  ---&gt;&gt;&gt; <br>
··  const concatUniq = (x, ys) =&gt;  <br>
····  {{c1::fromNullable}}(ys.filter(y =&gt; y === x)[0]) <br>
····  .fold({{c1::() =&gt; ys.concat(x), y =&gt; ys}}) <br>

%

%

clozeq

---

## 05: either examples 05

··  wrapExamples = example =&gt; { <br>
····  if(example.previewPath) { <br>
······  try { <br>
········  example.preview = fs.readFileSync(example.previewPath) <br>
······  } catch(e) {} <br>
····  } <br>
····  return example <br>
··  } <br>
··  ---&gt;&gt;&gt; <br>
··  const readFile = x =&gt; {{c1::tryCatch}}(() =&gt; fs.readFile(x)) <br>
··  wrapExamples = example =&gt;  <br>
····  {{c2::fromNullable}}({{c3::example.previewPath}}) <br>
····  .chain(readFile) <br>
····  .{{c4::fold}}(() =&gt; example,  <br>
··········  preview =&gt; Object.assign({preview}, ex)) <br>

%

%

clozeq

---

## 05: definitions of functions

··  const Box = x =&gt; ({ <br>
····  map: f =&gt; Box(f(x)), <br>
····  fold: f =&gt; f(x), <br>
··  const Right = x =&gt; ({  <br>
····  chain: f =&gt; {{c1::f(x)}},  <br>
····  map: f =&gt; {{c2::Right(f(x))}}, <br>
····  fold: (f, g) =&gt; g(x), <br>
··  const Left = x =&gt; ({  <br>
····  map: f =&gt; {{c3::Left(null)}}, <br>
····  fold: (f, g) =&gt; f(x), <br>
··  const tryCatch = f =&gt; { <br>
····  try { <br>
······  {{c4::return Right(f())}} <br>
····  } catch(e) { <br>
······  return Left(e) <br>
··  const fromNullable = x =&gt; <br>
····  x != null ? {{c5::Right(x)}} : Left(null) <br>

%

%

clozeq

---

## frisby04: currying

data as {{c1::last}} argument

const match = curry( {{c1::(regex, s)}} =&gt; s.match(regex));

match(/\s+/g)('hello world');

%

%

clozeq

---

## frisby04: currying 02

Wrapping a curried function with `map`, makes the function work on {{c1::arrays}}.

Same with: {{c1::`sort`}}, {{c1::`filter`}}, `map` and other higher order functions.

%

%

clozeq

---

## frisby04: currying 03

Wrapping a curried function with `map`, makes the function work on arrays.

··  const allHasLetterR = {{c1::map}}(hasLetterR); <br>
··  const xs = ['world', 'ali']; <br>
··  {{c2::allHasLetterR}}(xs); <br>
··  // [Array(1), null] <br>

%

%

clozeq

---

## frisby04: currying 04

Refactor by partially applying arguments:

··  // words :: String -&gt; [String] <br>
··  const words = str =&gt; split(' ', str); <br>
··  ---&gt;&gt;&gt; <br>
··  const words = {{c1::split(' ')}}; <br>

%

%

clozeq

---

## frisby04: currying 05

Refactor by partially applying arguments:

··  // filterQs :: [String] -&gt; [String] <br>
··  const filterQs = xs =&gt; filter(x =&gt; x.match(/q/i), xs); <br>
··  ---&gt;&gt;&gt; <br>
··  const filterQs = {{c1::filter(x =&gt; x.match(/q/i))}}; <br>
··  ---&gt;&gt;&gt; <br>
··  const filterQs = {{c2::filter(match(/q/i))}}; <br>

%

%

clozeq

---

## frisby04: currying 06

Refactor by partially applying arguments:

··  const keepHighest = (x, y) =&gt; (x &gt;= y ? x : y); <br>
··  // max :: [Number] -&gt; Number <br>
··  const max = xs =&gt; reduce((acc, x) =&gt; (x &gt;= acc ? x : acc), -Infinity, xs); <br>
··  ---&gt;&gt;&gt; <br>
··  const max = {{c1::reduce}}({{c2::keepHighest}}, -Infinity) <br>

%

%

clozeq

---

## frisby04: currying 07

Definition of curry:

··  // curry :: ({{c1::(a, b, ...) -&gt; c)}} -&gt; a -&gt; b -&gt; ... -&gt; c <br>
··  function curry(fn) { <br>
····  const arity = fn.{{c2::length}}; <br>
····  return function $curry(...args) { <br>
······  if (args.length &lt; arity) { <br>
········  return $curry.{{c3::bind}}(null, ...args); <br>
······  } <br>
······  return fn.{{c4::call}}(null, ...args); <br>
····  }; <br>
··  } <br>

%

%

clozeq

---

## frisby05: composing 01

Definition of compose:

··  const compose = (f, g) =&gt; x =&gt; {{c1::f(g(x))}}; <br>

x: value being {{c2::piped}} through f and g

%

%

clozeq

---

## js: composing order

Definition of compose:

··  const compose = (f, g) =&gt; x =&gt; f(g(x)); <br>

Which one first?

{{c1::First g, then f}}

{{c2::Reverse}} order (f,g)

First g means: g {{c3::inside}} 

%

%

clozeq

---

## frisby05: composing 02

Ex: "ali" -&gt; "ALI!"

··  var toUpperCase = function(x) { <br>
····  return x.toUpperCase(); <br>
··  }; <br>
··  var exclaim = function(x) { <br>
····  return x + '!'; <br>
··  }; <br>
··  var shout = compose({{c1::exclaim, toUpperCase}}); <br>
··  shout("ali"); <br>

%

%

clozeq

---

## frisby05: composing 03

Ex: [1,2] -&gt; [2,1] -&gt; 2

··  var head = x =&gt; x[0] <br>
··  var reverse = reduce( {{c1::(acc,x)}} =&gt; {{c2::[x].concat(acc)}}, {{c3::[]}}) <br>
··  var last = compose({{c4::head, reverse}}) <br>

%

%

clozeq

---

## frisby05: composing 04

associativity law

··  var associative = compose(f, compose(g,h)) == compose({{c1::compose(f,g), h}}) <br>

%

%

clozeq

---

## frisby05: composing 05

associaty law allows {{c1::variadic (any number of args)}} compose:

··  compose(toUpperCase, compose(head, reverse)); <br>
··  // or <br>
··  compose(compose(toUpperCase, head), reverse); <br>
··  ---&gt;&gt;&gt; <br>
··  var lastUpper = compose({{c1:: toUpperCase, head, reverse }}) <br>

%

%

clozeq

---

## frisby05: composing 06

Definition of pointfree:

Never having to say your data

Functions {{c1::don't mention the data}} upon which they operate.

%

%

clozeq

---

## frisby05: composing 07

Pointfree ex:

····  // name is data <br>
····  var snakeCase = function(word) { <br>
······  return word.toLowerCase().replace(/\s+/ig, '—'); <br>
····  }; <br>
····  ---&gt;&gt;&gt; <br>
····  var snakeCase = compose(replace(/\s+/ig, '—'), {{c1::toLowerCase}}); <br>

%

%

clozeq

---

## frisby05: composing 08

Pointfree ex

····  var initials = function(name) { <br>
······  return name.split(' ').map(compose(toUpperCase, head)).join('. '); <br>
····  }; <br>
····  ---&gt;&gt;&gt; <br>
····  var initials = compose({{c1::join('. ')}} <br>
··························  , {{c2::map(compose(toUpperCase, head))}} <br>
··························  , {{c3::split(' ')}} <br>
··························  ); <br>
····  initials("hunter stockton thompson"); <br>
····  // 'H. S. T' <br>

%

%

clozeq

---

## frisby05: composing 09

Use `trace` to debug any error:

··  const trace = curry((tag, x) =&gt; { <br>
····  {{c1::console.log}}(tag, x); <br>
····  return x; <br>
··  }); <br>

··  const dasherize = compose( <br>
····  join('-'), <br>
····  toLower, <br>
····  {{c1::trace('after split'), }} <br>
····  split(' '), <br>
····  replace(/\s{2,}/ig, ' '), <br>
··  ); <br>

··  dasherize('The world is a vampire'); <br>
··  // after split [ 'The', 'world', 'is', 'a', 'vampire' ] <br>

%

%

clozeq

---

## frisby05: composing 10

`prop` definition:

··  // prop :: String -&gt; Object -&gt; a <br>
··  const prop = curry(({{c1::p, obj}}) =&gt; {{c2:: obj[p] }}); <br>

%

%

clozeq

---

## frisby05: composing 11

Use `compose`:

··  // isLastInStock :: [Car] -&gt; Boolean <br>
··  const isLastInStock = (cars) =&gt; { <br>
····  const lastCar = last(cars); <br>
····  return prop('in—stock', lastCar); <br>
··  }; <br>
··  ---&gt;&gt;&gt; <br>
··  const isLastInStock = compose({{c1::prop('in—stock'), last}}); <br>

%

%

clozeq

---

## frisby05: composing 12

Make it a composition:

··  const average = xs =&gt; reduce(add, 0, xs) / xs.length; <br>
··  // averageDollarValue :: [Car] -&gt; Int <br>
··  const averageDollarValue = (cars) =&gt; { <br>
····  const dollarValues = map(c =&gt; c.dollar—value, cars); <br>
····  return average(dollarValues); <br>
··  }; <br>
··  ---&gt;&gt;&gt; <br>
··  const averageDollarValue = compose(average, {{c1::map(prop('dollar—value'))}} ); <br>

%

%

clozeq

---

## frisby05: composing 13

Make it a composition:

··  // fastestCar :: [Car] -&gt; String <br>
··  const fastestCar = (cars) =&gt; { <br>
····  const sorted = sortBy(car =&gt; car.horsepower, cars); <br>
····  const fastest = last(sorted); <br>
····  return concat(fastest.name, ' is the fastest'); <br>
··  }; <br>
··  ---&gt;&gt;&gt; <br>
··  const append = {{c1::flip(concat)}}; <br>
··  const fastestCar = compose( <br>
····  append(' is the fastest'), <br>
····  {{c1::prop('name')}}, <br>
····  last, <br>
····  sortBy({{c1::prop('horsepower')}}), <br>
··  ); <br>

%

%

clozeq

---

## frisby05: composing 14

Category Theory: definition of identity

··  var id = function(x) { <br>
····  {{c1::return x}}; <br>
··  }; <br>
··  {{c2::compose(id, f)}} == compose(f, id) == f; <br>
··  // true <br>

%

%

clozeq

---

## frisby05: mnemonics

Assume that:

··  const f = curry( (x,y) =&gt; ... ) <br>

Then first call puts single argument into the first position. Second call puts the argument into the next position:

··  f{{c1::(x)(y)}} <br>

%

%

clozeq

---

## frisby05: mnemonics 02

Assume that:

··  const Impure = { <br>
····  getJSON: curry((callback, url) =&gt; $.getJSON(url, callback)), <br>
····  trace: curry((tag, x) =&gt; { console.log(tag, x); return x; }), <br>
··  };  <br>

Consider:

··  Impure.getJSON(Impure.trace('response')) <br>

Type signatures of the curried functions are:

··  Impure.trace('response') :: {{c1::a -&gt; a}} <br>
··  Impure.getJSON :: {{c2::(a-&gt;a) -&gt; a -&gt; j}} <br>
··  Impure.getJSON(Impure.trace('response')) :: {{c3::a -&gt; j}} <br>

%

%

clozeq

---

## frisby05: mnemonics 03

Consider:

··  getJSON = curry((callback, url) =&gt; $.getJSON(url, callback)), <br>
··  trace = curry((tag, x) =&gt; { console.log(tag, x); return x; }), <br>
··  const app = compose(getJSON(trace('response')), url); <br>
··  app('cats'); <br>

This code prints the result of:
··   <br>
··  trace( {{c1::'response', url('cats')}} ) <br>

%

%

clozeq

---

## frisby05: map signature

··  map :: {{c1::(a-&gt;a)}} -&gt; [a] -&gt; [a] <br>

··  // map :: Functor f =&gt; (a -&gt; f b) -&gt; f a -&gt; f b <br>
··  const map = curry({{c2::(fn, f)}} =&gt; f.map(fn)); <br>

%

%

clozeq

---

## frisby05: Definition of flip:

    // flip :: {{c1::(a -> b)}} -> (b -> a)
    const flip = {{c2::curry}}({{c3::(fn, a, b)}} => fn(b, a));

%

%

clozeq

---

