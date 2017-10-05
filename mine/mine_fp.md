	<url:file:///~/Dropbox/mynotes/content/mine/mine_fp.md>

# Mine FP

## Mathematics

	proof techniques
		170206.01.1.jpg
		(p ⇒  q) = (!q ⇒  !p)
		why?
			assume (!q ⇒  p)
			we know that (p ⇒  q) so, p is True and q and !q are True. This is contradiction.
			so (!q ⇒  !p)

## Category Theory

	relationships table
		ref
			160203.02.1.jpg
		| concept             | relationship between |
		| morphism            | objects              |
		| functor             | categories           |
		| nat. transformation | functors             |
	Functor: database_schema-database_instance
		Database Schema = Category C
		Database Instance = Category S
		F: C → S
		set of records is a functor
		similar to:
			| definition of types | instances of types       |
			| class definitions   | runtime object instances |
	equivalence of objects:
		the fundamental goal of category theory is to find which objects/morphisms are equivalent
			ex:
				handling side effects:
					transform pure functions to side effects (monads)
					then return pure functions back
				equivalence of paths in database:
					business rules implemented as integrity constraints
				schema migration:
					some schema C1 is equivalent to C2
					then schema migration can be automated
		thus, isomorphism is the ultimate goal, not homomorphism 
			remember:
				isomorphism keeps the complete structure
					bijective functions
					there is no loss of information
				homomorphism keeps some of the structure
					injective functions
					loss of information occurs

### Questions regarding CT

	can any operation be regarded as morphism?
		ex:
			ℕ is a category:
				with morphism:
					x → y if x ≤ y
				x ≤ y
					this is a relation
				x + y
					opt1:
						this is "inside" of some function (morphism) that takes two arguments
						no relation here
					opt2:
						this doesn't respect morphism definition:
							f:X → Y
						one input, one output
						there shouldn't be two args
		thus:
			an operation is about "inside" of some morphism
			ct doesn't care "inside" of morphisms
		is this true?

## Functional Programming

	q: implement list functions with fold/reduce
		map
		sum
		reverse
		filter
		elemAt
		max
		size
		sortBy
		groupBy
		find
		last
		take
		first
	quiz: how to define higher-order function? id=g_10115
		quiz: how to define higher-order function? <url:file:///~/Dropbox/mynotes/content/mine/mine_fp.md#r=g_10115>
		problem1
			q: is this a valid function definition: f2 = f => f(x)
			ie. f2 is a function that takes a unary function and applies it to some arg.
			how do you define such a function in js?
			opts
				opt1: 
					f2 = function(f) {
						return f(x)
					}
					issue: where is x defined?
				opt2:
					f2 = function(x) {
						return function(f) {
							return f(x)
						}
					}
					issue: but f2 takes a function f not x. 
				opt3:
					f2 = function(f) {
						return function(x) {
							return f(x)
						}
					}
				opt4:
					f2 = f => (x => f(x))
			sol:
				how is f2 used?
				assume f1 = x => x + 2
				f2(f1)(3)
				so, f2 takes first a function, then it returns another function. that function takes an argument.
				f2 = function(f) {
					return function(x) {
						return f(x)
					}
				}
			correct: opt3, opt4
		problem2: identity functions
			q: how to refactor this code: 
				return ajaxCall(function(json) {
					return callback(json)
				}
			opts
				opt1: return ajaxCall(callback(json))
					issue: where is json defined?
				opt2: cannot be simplified
				opt3: return ajaxCall(callback)
				opt4: return callback
				opt5: return callback(json)
			sol:
				let f1 = ajaxCall
				let f2 = function(json) {
					return callback(json)
				}
				let f3 = callback
				so, the original code is equivalent to:
					return f1(f2)
				consider f2 and f3
				what does f2 do really?
					it takes an argument and passes it to f3
				define f2 in short form:
					f2 = j => f3(j)
				now let's use f2:
					f2(a) 
					≅ (j => f3(j)(a)
					≅ f3(a)
				so: f2 ≅ f3
				thus: return f1(f2) ≅ return ajaxCall(callback)
				in general, when a function passes an argument to another function, then you can simplify as such. you don't need the wrapper function.
			correct: opt3
		problem3: identity functions
			q: how to refactor this code:
				var getServerStuff = function(callback) {
					return ajaxCall(callback);
				};
			opts
				opt1: getServerStuff = ajaxCall(callback)
				opt2: getServerStuff = ajaxCall
				opt3: cannot be simplified
				opt4: getServerStuff = callback
			sol:
				let's simplify names:
					let f1 = getServerStuff
					let f2 = ajaxCall
				define f1 in short form
					f1 = cb => f2(cb)
				let's use f1:
					f1(a) 
					≅ (cb => f2(cb))(a)
					≅ f2(a)
				so: f1 ≅ f2
				thus: getServerStuff = ajaxCall
			correct: opt2
		problem4: 
			q: refactor this
				let getHtml = function( document, selector ) {
					return $(document, selector)
				}
			opts
				opt1: getHtml = $
				opt2: getHtml = $(document, selector)
				opt3: needs currying
				opt4: cannot be simplified
			sol: opt1
	function evaluation
		f1 = x => 3+x
		f2 = fun( fun(x) 
	q: convert nextChar to fp
		code
			const nextChar = str => {
				const trimmed = str.trim()
				const number = parseInt(trimmed)
				const nextNumber = number + 1
				return String.fromCharCode(nextNumber)
			}
			const result = nextChar('  64 ')
			console.log(result)
			// A
		v2
			const nextChar = str => 
				String.fromCharCode( parseInt( str.trim()) + 1)
		v3
			const nextChar = str => 
				[str] 
				.map(s => s.trim())
				.map(s => parseInt(s))
				.map(i => String.fromCharCode(i))
			const result = nextChar('  64 ')
			console.log(result)
			// ['A']
		v4: Box instead of []
			const Box = x =>
			({
				map: f => Box(f(x)),
				inspect: () => `Box(${x})`
			})
			const nextChar = str => 
				Box(str)
				.map(s => s.trim())
				.map(s => parseInt(s))
				.map(i => String.fromCharCode(i))
			const result = nextChar('  64 ')
			console.log(result)
			// Box(A)
		v5: move it out of Box
			const Box = x =>
			({
				map: f => Box(f(x)),
				fold: f => f(x),
				inspect: () => `Box(${x})`
			})
			const nextChar = str => 
				Box(str)
				.map(s => s.trim())
				.map(s => parseInt(s))
				.map(i => String.fromCharCode(i))
				.fold(c => c.toLowerCase())
	q: two variables manipulated in applyDiscount
		code: applyDiscount('$5.00', '20%')
			const moneyToFloat = str =>
				Box(str)
				.map(s => s.replace(/\$/g, ''))
				.fold(r => parseFloat(r))
			const percentToFloat = str =>
				Box(str.replace(/\%/g, ''))
				.map(replaced => parseFloat(replaced))
				.fold(number => number * 0.01)
			const applyDiscount = (price, discount) => {
				const cost = moneyToFloat(price)
				const savings = percentToFloat(discount)
				return cost - cost * savings
			}
			const result = applyDiscount('$5.00', '20%')
			console.log(result)
			// 4
		# use map in applyDiscount as well
		ex: multiple variables in a map
			const moneyToFloat = str =>
				Box(str)
				.map(s => s.replace(/\$/g, ''))
				.map(r => parseFloat(r))
			const percentToFloat = str =>
				Box(str.replace(/\%/g, ''))
				.map(replaced => parseFloat(replaced))
				.map(number => number * 0.01)
			const applyDiscount = (price, discount) => 
				moneyToFloat(price)
				.map(cost =>
					percentToFloat(discount)
					.map(savings =>
						cost - cost * savings))
			const result = applyDiscount('$5.00', '20%')
			console.log(result)
			// Box([object Object])
			# to deal with two variables
				we used nesting with closures
			# problem: we have two Boxes nested as result
		v3: unnest Boxes
			const applyDiscount = (price, discount) => 
				moneyToFloat(price)
				.fold(cost =>
					percentToFloat(discount)
					.fold(savings =>
						cost - cost * savings))
			const result = applyDiscount('$5.00', '20%')
			console.log(result)
			// 4
	q: Either type for null checks
		code: Either
			// const Either = Right || Left
			const Right = x =>
			({ 
				map: f => Right(f(x)),
				inspect: () => `Right(${x})`
			})
		ex: use Right and map
			const result = Right(3).map(x => x + 1).map(x => x / 2)
			console.log(result)
			// Right(2)
		code: define Left 
			const Left = x =>
			({
				map: f => Left(x),
				inspect: () => `Left(${x})`
			})
		ex: use Left and map
			const result = Left(3).map(x => x + 1).map(x => x / 2)
			console.log(result)
			// Left(3)
		code: define fold
			// const Either = Right || Left
			const Right = x =>
			({ 
				map: f => Right(f(x)),
				fold: (f, g) => g(x),
				inspect: () => `Right(${x})`
			})
			const Left = x =>
			({
				map: f => Left(x),
				fold: (f, g) => f(x),
				inspect: () => `Left(${x})`
			})
			const result = Right(3).map(x => x + 1).map(x => x / 2).fold(x => 'error', x => x)
			console.log(result)
			// 2
			const result = Left(3).map(x => x + 1).map(x => x / 2)
			console.log(result)
			// error
	q: findColor with Either
		code: findColor 
			const findColor = name => 
				({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'})[name]
			const result = findColor('red').slice(1).toUpperCase()
			console.log(result)
			// #FF4444
		what if the color doesn't exist
		v2: findColor error
			const result = findColor('green').slice(1).toUpperCase()
			console.log(result)
			// throws error: undefined
		v3: use Either for null check
			const findColor = name => {
				const found = ({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'})[name]
				return found ? Right(found) : Left(null)
			}
			const result = findColor('green')
				.map(c => slice(1))
				.fold(e => 'no color', 
							c => c.toUpperCase())
			console.log(result)
			// no color
		v4: color is found
			const result = findColor('blue')
				.map(c => slice(1))
				.fold(e => 'no color', 
							c => c.toUpperCase())
			console.log(result)
			// 3B5998
		define fromNullable to abstract branching from findColor
		v5: fromNullable
			const fromNullable = x =>
				x != null ? Right(x) : Left(null)
			const findColor = name => 
				fromNullable({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'})[name]
	q: tryCatch with Either
		code: fs with try catch
			const fs = require('fs')
			const getPort = () => {
				try {
					const str = fs.readFileSync('config.json')
					const config = JSON.parse(str)
					return config.port
				} catch(e) {
					return 3000
				}
			}
			const result = getPort()
			# cat config.json
			# {"port": 8888}
			console.log(result)
			// 8888
		use Either to get rid of try catch
		v2: fs with try catch
			const tryCatch = f => {
				try {
					return Right(f())
				} catch(e) {
					return Left(e)
				}
			}
			const getPort = () =>		
				tryCatch(() => fs.readFileSync('config.json'))
				.map(c => JSON.parse(c))
				.fold(e => 3000,
							c => c.port)
			const result = getPort()
			console.log(result)
			// 8888
		what if json file cannot be parsed
		v3: json.parse with try catch
			const getPort = () =>		
				tryCatch(() => fs.readFileSync('config.json')) // Right('')
				.map(c => tryCatch(() => JSON.parse(c))) // Right(Right(''))
				.fold(e => 3000,
							c => c.port)
		use chain to unnest nested Right
		v4: use chain
			const Right = x => ({
				chain: f = f(x), .. 
			const Left = x => ({
				chain: f = Left(x), ..
			const getPort = () =>		
				tryCatch(() => fs.readFileSync('config.json')) // Right('')
				.chain(c => tryCatch(() => JSON.parse(c))) // Right('')
				.fold(e => 3000,
							c => c.port)

## Book Materials
	
	exercises
		quiz: how to define higher-order function? <url:file:///~/Dropbox/mynotes/content/mine/mine_fp.md#r=g_10115>
