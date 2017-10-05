	<url:file:///~/Dropbox (Personal)/mynotes/content/books/js/purescript_by_example_phil_freeman.md>

# Purescript By Example by Phil Freeman

## 2. Getting Started

2.2 Introduction

	psc: compiler
	npm
	pulp: command line tool
	bower: package manager

2.5 Hello 

	code
		mkdir test01
		cd test01
		pulp init
		src/Main.purs
			module Main where
			import Control.Monad.Eff.Console
			main = log "Hello, World!"
		pulp run
	logic
		module header
			capitalized words, dots
		imported using full names
		main program
	2.6 compiling for the browser
		pulp browserify
	Removing unused code
		pulp build -O --to output.js
	Tracking dependencies with Bower
		bower install purescript-math --save
			--save: dependency is added to bower.json
	Interactive Mode
		REPL: PSCi
		pulp psci
		:?
			list of commands

# 3. Functions and Records

	3.2 Project Setup
		@code: addressbook/
	3.3 Simple Types
		pulp psci 
		:type "test"
		:type true
		:type 1
		:type 1.0
		:type 'a'
		:type [1,2,3]
		:type [true, false]
		let author = {name: "Phil" }
		:type author
		author.name
		# functions
			import Prelude
			:type flip
		# paste mode
			:paste
			^D to exit
	3.4 Quantified Types
		:type flip
		forall a b c. ...
		forall: universally quantified type
			a,b,c can be replaced by any type
	3.5 Notes on Indentation
		like python
	3.6 Defining Our Types
		code
			type Entry =
				{ first :: String
				, addresss :: Address
				}
			type Address =
				{ street :: String
				, state :: String
				}
			type AddressBook = List Entry
		type synonym: Entry, Address
			a record type with two fields: first, address
	3.7 Type Constructors and Kinds
		type constructor: example: List
			values don't have the type List
			they are List a
			List takes a type argument a and constructs a new type List a
		type annotation operator: ::
		error:
			Nil :: List
			kind error
				values are distinguished by their types
				types are distinguished by their kinds
				ill-typed values result in type errors
				ill-kinded types result in kind errors
		special kind: *
			represents kind of all types which have values
			List String
		kind for type constructors: * -> *
			like List
		code
			:kind Number
			:kind List
			:kind List String
	3.8 Displaying Address Book Entries
		type declaration contains a type annotation 
			showEntry :: Entry -> String
		this is a type signature
		code
			type AddressBook = List Entry
			:type Cons
			a -> List a -> List a
			insertEntry :: Entry -> AddressBook -> AddressBook
			insertEntry entry book = Cons entry book
	3.11 Curried Functions
		functions take only one argument
			insertEntry: takes two arguments
				it is an example of a curried function
		-> operator associates to the right
			insertEntry :: Entry -> AddressBook -> AddressBook
			insertEntry :: Entry -> (AddressBook -> AddressBook)
			:type insertEntry entry
			AddressBook -> AddressBook
		consider:
			insertEntry :: Entry -> AddressBook -> AddressBook
			insertEntry entry book = Cons entry book
			paranthesize explicitly:
				insertEntry entry book = (Cons entry) book
			(insertEntry entry) and (Cons entry) are same function
			remove book
				insertEntry entry = Cons entry 
			insertEntry and Cons are same function
				insertEntry :: Entry -> AddressBook -> AddressBook
				insertEntry = Cons 
			this is sufficient
		eta conversion: this process is called
			to rewrite functions in point-free form
			ie. functions defined withoud reference to their arguments
	3.12 Querying the Address Book
		specialize filter and head
			filter :: (Entry -> Boolean) -> AddressBook -> AddressBook
			head :: AddressBook -> Maybe Entry
			findEntry :: String -> String -> AddressBook -> Maybe Entry
			findEntry firstName lastName = head <<< filter filterEntry
				where
				filterEntry :: Entry -> Boolean
				filterEntry entry = entry.firstName == firstName && entry.lastName == lastName
	3.13 Infix Function Application
		$ and <<<
			head <<< filter filterEntry
			head $ filter filterEntry book
			($) alias for apply
		definition
			apply :: forall a b. (a -> b) -> a -> b
			apply f x = f x
			infixr 0 apply as $
		why use $?
			$ is right associative
			thus allows us to remove parantheses for deeply nested applications
	3.14 Function Composition
		composition operators
			<<< backwards composition
			>>> forwards composition
		we can rewrite
			head $ filter filterEntry book
			-->
			(head <<< filter filterEntry) book
		by eta conversion
			findEntry firstName lastName = head $ filter filterEntry book
			-->
			findEntry firstName lastName = head <<< filter filterEntry
		or by forwards:
			findEntry firstName lastName = filter filterEntry >>> head
	3.15 Tests, Tests, Tests ...

# 4. Recursion, Maps and Folds

	4.3 Introduction
		factorial
			fact :: Int -> Int
			fact 0 = 1
			fact n = n * fact (n-1)
		fibonacci
			fib :: Int -> Int
			fib 0 = 1
			fib 1 = 1
			fib n = fib (n-1) + fib (n-2)
	4.4 Recursion on Array
		length of an array
			length :: forall a. Array a -> Int
			length arr =
				if null arr
					then 0
					else 1 + length (unsafePartial tail arr)
	4.5 Maps
		map: changes contents of array but preserves its shape (length)
		type classes: map is an example of shape preserving fnutcions which transform a class of type constructors called functors
		ex
			map (\n -> n +1) [1,2,3]
	4.6 Infix Operators
		infix function application
		ex
			(\n -> n +1) `map` [1,2,3]
		<$> is alias for map infix
			(\n -> n +1) <$> [1,2,3]
			(<$>) (\n -> n +1) [1,2,3]
		.. is alias for range function
			infix 8 range as ..
			1 .. 5
		precedence
			8 is precedence
		associativity
			infixl infixr
	4.7 Filtering Arrays
		ex
			filter (\n -> n `mod` 2 == 0) (1 .. 10)
	4.8 Flattening Arrays	
		concat: flattens an array of arrays into a single array
		code
			:type concat
			Array (Array a) -> Array a
			concat [[1,2], [4,5]]
		concatMap: combination of concat and map
			:type concatMap
			(a -> Array b) -> Array a -> Array b
			concatMap (\n -> [n, n*n]) (1 .. 5)
		map, filter, concatMap
			basis for range of functions over array called "array comprehensions"
	4.9 Array Comprehensions
		goal: finding factors of a number n
		opt1: brute force
			let pairs n = concatMap (\i -> 1 .. n) (1 .. n)
			pairs 3
			let pairs' n = 
				concatMap (\i ->
					map (\j -> [i,j]) (i .. n)
				) (1 .. n)
			pairs' 3
			let factors n = filter (\pair -> product pair == n) (pairs' n)
			factors 10
	4.10 Do Notation
		generalizations of map and concatMap: map and bind
			they form basis of special syntax called do notation
		map, concatMap --> to write array comprehensions
		map, bind --> to write monad comprehensions
		array: example of monad
		rewrite factors:
			factors :: Int -> Array (Array Int)
			factors n = filter (\xs -> product xs == n) $ do
				i <- 1 .. n
				j <- i .. n
				[[i, j]]
	4.11 Guards
		do
			guard $ i * j == n
		> length $ guard true
		1
		> length $ guard false
		0
	4.12 Folds
		import Data.Foldable
		:type foldl
		foldl (+) 0 (1 .. 100) 
		49 * 101
		foldl (\acc n -> acc <> show n) "" [1,2,3,4,5]
		foldr (\acc n -> acc <> show n) "" [1,2,3,4,5]
	4.13 Tail Recursion
		tail recursion optimization
	4.14 Accumulators
		accumulator parameter: turns a function into a tail recursive one
	4.15 Prefer Folds to Explicit Recursion
		instead of recursion, use map, fold combinators
		ex: reverse
			let reverse :: forall a. Array a -> Array a
			    reverse = foldr (\x xs -> xs <> [x]) []
	4.16 A Virtual Filesystem

## 5. Pattern Matching

	5.1 Chapter Goals
		pattern matching
			to write compact functions
			by breaking their implementation down
		algebraic data types
			enable expressiveness in the language of types
				closely related to pattern matching
	5.2 Project Setup
		bower packages
			purescript-globals: common js
			purescript-math: js Math
		Data.Picture module: 
			data type Shape
			type: Picture: collections of shapes
			imports Data.Foldable
				folding functions
			imports Global and Math using as
				import Global as Global
					allows qualified names:
						Global.infinity
	5.3 Simple Pattern Matching
		gcd: greatest common divisor
			gcd :: Int -> Int -> Int
			gcd n 0 = n
			gcd 0 m = m
			gcd n m = if n > m
									 then gcd (n - m) m
									 else gcd n (m - n)
		each line: alternative or case
		left expressions: patterns
		each case: 1+ patterns 
	5.4 Simple Patterns
		types of paterns:
			Integer literals: 0
			Variable patterns: n
			Number, String, Char, Boolean literals
			Wildcard patterns: _
				match any argument, don't bind any names
		ex
			fromString :: String -> Boolean
			fromString "true" = true
			fromString _ = false
			toString :: Boolean -> String
			toString true = "true"
			toString false = "false"
	5.5 Guards
		gcd
			gcd :: Int -> Int -> Int
			gcd n 0 = n
			gcd 0 n = n
			gcd n m | n > m     = gcd (n - m) m
							| otherwise = gcd n (m - n)
	5.6 Array Patterns
		array literal patterns
			matches arrays of fixed length
		ex:
			isEmpty :: forall a. Array a -> Boolean
			isEmpty [] = true
			isEmpty _ = false
		ex:
			takeFive :: Array Int -> Int
			takeFive [0, 1, a, b, _] = a * b
			takeFive _ = 0
		matching arrays unspecified length is impossible
	5.7 Record Patterns and Row Polymorphism
		record patterns
			to match records
		ex
			showPerson :: { first :: String, last :: String } -> String
			showPerson { first: x, last: y } = y <> ", " <> x
		row polymorphism
			ex:
				defining showPerson without type 
					> let showPerson { first: x, last: y } = y <> ", " <> x
					> :type showPerson
					forall r. { first :: String, last :: String | r } -> Stringsignature
					> showPerson { first: "Phil", last: "Freeman", location: "Los Angeles" }
					"Freeman, Phil"
			function is polymorphic in the row r of record fields
	5.8 Nested Patterns
		for arrays and records
		ex
			type Address = { street :: String, city :: String }
			type Person = { name :: String, address :: Address }
			livesInLA :: Person -> Boolean
			livesInLA { address: { city: "Los Angeles" } } = true
			livesInLA _ = false
	5.9 Named Patterns
		for arrays 
		ex
			sortPair :: Array Int -> Array Int
			sortPair arr@[x, y]
				| x <= y = arr  
				| otherwise = [y, x]
			sortPair arr = arr
	5.10 Case Expressions
		case expression
			to use patterns to match an intermediate value in a computateion
	5.11 Pattern Match Failures and Partial Functions
		when none of the patterns in a case alternatives match their inputs:
			pattern match failure
			ex
				partialFunction :: Boolean -> Boolean
				partialFunction = unsafePartial \true -> true
				--
					this matches only true
					error at runtime:
						> partialFunction false
						Failed pattern match
			total functions
				return a value for any combination of inputs
			partial functions
				don't
			unsafePartial
				used to silence error when function is not total
				and you are sure it is still safe
			ex
				partialFunction true = true
				-- inferring type:
				> :type partialFunction
				Partial => Boolean -> Boolean
			=> symbol
				psc keeps track of partial functions
	5.12 Algebraic Data Types
		ex: shapes
			oop way: Shape interface
				define all operations on this interface
				adding new operations becomes difficult
			adt solves this sort of problem
			code
				data Shape
					= Circle Point Number
					| Rectangle Point Number Number
					| Line Point Point
					| Text Point String
				data Point = Point 
					{ x :: Number
					, y :: Number
					}
			note
				Point type constructor is different from Point data constructor
					data x
						x: algebraic data type
					= Circle | Rectangle
						type constructors
			ex
				data Maybe a = Nothing | Just a
				data List a = Nil | Cons a (List a)
					recursive data structure
	5.13 Using ADTs
		ex
			exampleLine :: Shape
			exampleLine = Line p1 p2
				where
					p1 :: Point
					p1 = Point { x: 0.0, y: 0.0 }
					p2 :: Point
					p2 = Point { x: 100.0, y: 50.0 }
		how to use them?
		ex
			showPoint :: Point -> String
			showPoint (Point {x: y, y: y} = ..
			showShape :: Shape -> String
			showShape (Circle c r) = ...
			showShape (Line start end) = ...
		each constructor is used as a pattern
	5.14 Record Puns
		record pun
			specify names of properties, but not values
				showPoint (Point {x, y} = ..
		use record puns to construct records
			origin :: Point
			origin = Point { x, y }
				where
					x = 0.0
					y = 0.0
	5.15 Newtypes
		newtypes: a special algebraic data type
			introduced using "newtype" instead of "data"
		they define exactly one constructor
			it takes exactly one argument
			ie. newtypes gives a new name to an existing type
		ex
			newtype Pixels = Pixels Number
		type level alias for Number
	5.16 A Library for Vector Graphics
		define a type synonym for a Picture:
			type Picture = Array Shape
		ex
			showPicture = map showShape
	5.17 Computing Bounding Rectangles
		ex

# 6. Type Classes

	6.1 Chapter Goals
	6.2 Project Setup
		purescript-maybe: Maybe
		tuples: Tuple
		either: Either
		strings
		functions
		Data.Hashable
	6.3 Show Me!
		ex
			class Show a where
				show :: a -> String
		a new type class: Show
			parameterized by type variable a
		type class instance: 
			contains implementations of the functions defined in type class
		ex: Show type class instance for Boolean values
			instance showBoolean :: Show Boolean where
				show true = "true"
				show false = "false"
		type class instances are named to aid readability in generated javascript
		ex:
			show true
			show 10.0
		error with Data.Either value:
			show (Left 10)
				cause: psci is unable to infer the type
			show (Left 10 :: Either Int String)
				works
	6.4 Common Type Classes
		standard type classes
		Eq
			defines eq function
			== is alias
			code
				class Eq a where
					eq :: a -> a -> Boolean
				1 == 2
				"kal" == "kal"
		Ord
			defines compare function
			< > <= >=
			code
				data Ordering = LT | EQ | GT
				class Eq a <= Ord a where
					compare : a -> a -> Ordering
				compare 1 2
		Field
			identifies types that support arithmetic operators
			class EuclideanRing a <= Field a
		Semigroups and Monoids
			Semigroup: identifies types that support append to combine two values
			code
				class Semigroup a where
					append :: a -> a -> a
			Strings, arrays form semigroup under string concatenation
			<> concatenation operator
				alias for append
			Monoid: extends Semigroup with the concept of empty value, called mempty
			code
				class Semigroups m <= Monoid m where
					mempty :: m
			strings, arrays are monoids
			a Monoid type class instance for a type
				describes how to accumulate a result
				by starting with empty value
		Foldable
			Monoid: act as result of a fold
			Foldable: used as source of a fold
			code
				class Foldable f where
					foldr :: forall a b. (a -> b -> b) -> b -> f a -> b
					foldl :: forall a b. (b -> a -> b) -> b -> f a -> b
					foldMap :: forall a m. Monoid m => (a -> m) -> f a -> m
			what does Monoid m => mean?
				foldMap :: forall a m. Monoid m => (a -> m) -> f a -> m
				m should be an instance of Monoid
			Foldable: an ordered container
		Functor, and Type Class Laws
			programming with side-effects: Functor, Applicative, Monad
			code
				class Functor f where
					map :: forall a b. (a -> b) -> f a -> f b
			<$> alias
			map: lifts a function over a data structure
			functor laws
				map id xs = xs
					identity law
				map g (map f xs) = map (g <<< f) xs
					composition law
	6.5 Type Annotations
		constraining by using type classes
		ex
			threeAreEqual :: forall a. Eq a => a -> a -> a -> Boolean
			threeAreEqual a1 a2 a3 = a1 == a2 && a2 == a3
		Eq a =>: is a type constraint
	6.6 Overlapping Instances
		overlapping instances rule:
			psc infers type to choose correct instance
			there should be only one instance for that type
		code
			data T = T
			instance showT1 :: Show T where
				show _ = "Instance 1"
			instance showT2 :: Show T where
				show _ = "Instance 2"
			error: when using show with T
	6.7 Instance Dependencies
		ex
			instance showArray :: Show a => Show (Array a) where
		Show is defined using nested Show
	6.8 Multi Parameter Type Classes
		type class parameterizd by zero or more type arguments
		ex: two type arguments
			class Stream stream element where
				uncons :: stream -> Maybe { head :: element, tail :: stream }
			instance streamArray :: Stream (Array a) a where
				uncons = Array.uncons
			instance streamString :: Stream String Char where
				uncons = String.uncons
	6.9 Functional Dependencies
		ex: stream -> element is a functional dependency
			class Stream stream element | stream -> element where
	6.10 Nullary Type Classes
		type classes with zero type arguments
		ex: Partial class
			head :: forall a. Partial => Array a -> a
			using head directly is a type error
			head [1, 2]
	6.11 Superclasses
		making an instance dependent on another instance
		we say: one type class is a superclass of another
			if every instance of second is required to be an instance of the first
	6.12 A type class for Hashes

# 7. Applicative Validation

	7.1 Chapter Goals
		ex: validating form data
		another type class: Traverable
			traversable functors
	7.2 Project Setup
		dependencies
			control: control flow
			validation: applicative validation
	7.3 Generalizing Function Application
		consider Maybe
		ex
			address :: String -> String -> String -> Address
			address "123 Fake" "Faketown" "CA"
			-- missing city
			address (Just "123 Fake") Nothing (Just "CA")
			-- error
			lift3 address (Just "123 Fake") Nothing (Just "CA")
			-- lift address to work with Maybe types
	7.4 Lifting Arbitrary Functions
		type of lift3:
			> :type lift3
			forall a b c d f. Apply f => (a -> b -> c -> d) -> f a -> f b -> f c -> f d
		above: type constructor f is Maybe
			class Functor f where
				map :: forall a b. (a -> b) -> f a -> f b
			class Functor f <= Apply f where
				apply :: forall a b. f (a -> b) -> f a -> f b
		<$> alias for map
		<*> alias for apply
		difference between map and apply
			first arg of apply is boxed in the type constructor f
		implementing apply for Maybe:
			instance functorMaybe :: Functor Maybe where
				map f (Just a) = Just (f a)
				map f Nothing = Nothing
			instance applyMaybe :: Apply Maybe where
				apply (Just f) (Just a) = Just (f a)
				apply _ _ = Nothing
	7.5 The Applicative Type Class
		related type class: Applicative
			class Apply f <= Applicative f where
				pure :: forall a. a -> f a
		pure: takes a value, returns a value boxed with f
		Applicative instance for Maybe
			instance applicativeMaybe :: Applicative Maybe where
				pure x = Just x
		think like
			functors: takes boxed arguments
			applicatives: functors that allow lifting of functions
			pure: lifting functions of zero arguments
	7.6 Intuition for Applicative
		Applicative functors
			support side-effects
		ex
			Maybe: side effect of possibly missing values
			Either err: side effect of possible errors of type err
			arrow functor r ->: side effect of reading from a global configuration
	7.7 More Effects
	7.8 Combining Effects
		combineList :: Applicative f => List (f a) -> f (List a)
	7.9 Applicative Validation

# 8. The Eff Monad

	8.1 Chapter Goals
		monads: to deal with side effects in expressive way
		their connection with do notation
		Eff monad: encapsulates native effects
	8.2 Project Setup
		eff: Eff monad
		react: bindings to React
	8.3 Monads and Do Notation
		do notation: in array comprehensions
			sugar for concatMap
			ex
				countThrows :: Int -> Array (Array Int)
				countThrows n = do
					x <- 1 .. 6
					y <- 1 .. 6
					if x + y == n
						then pure [x, y]
						else empty
		intuition
			aplicative functor Maybe: for using functions supporting optional values
			array monad: functions supporting non-deterministic choice
		in general
			monad for type constructor m
				provides a way
				to use do notation
				with values of type m a
			m: monad
			a: some type
			m: same on every line
				we fix side-effect
	8.4 The Monad Type Class
		definition
			class Apply m <= Bind m where
				bind :: forall a b. m a -> (a -> m b) -> m b
			class (Applicative m, bind m) <= Monad m
		>>= alias for bind
			instance bindArray :: Bind Array where
				bind xs f = concatMap f xs
			instance bindMaybe :: Bind Maybe where
				bind Nothing _ = Nothing
				bind (Just a) f = f a
		how Bind is related to do notation
			starts by binding a value from some computation
				do value <- someComputation
					whatToDoNext
			now psc replaces this pattern with this code:
				bind someComputation \value -> whatToDoNext
			when multiple binds, this rule is applied repeatedly:
			ex:
				userCity :: XML -> Maybe XML
				userCity root = do
					prof <- child root "profile"
					addr <- child prof "address"
					city <- child addr "city"
					pure city
				-->
				userCity :: XML -> Maybe XML
				userCity root =
					child root "profile" >>= \prof ->
						child prof "address" >>= \addr ->
							child addr "city" >>= \city ->
								pure city
			>== leads to point-free form
	8.5 Monad Laws
		identity laws
			right identity
				we can eliminate a call to pure if it is the last expression in a do notation block:
					do 
						x <- expr
						pure x
				this is equivalent to just expr
			left identity
				we can eliminate a call to pure if it is the first expression:
					do 
						x <- pure y
						next
				equivalent to  next
		associativity law
			how to deal with nested do notation block
				c1 = do 
					y <- do
						x <- m1
						m2
					m3
			is equivalent to:
				c2 = do
					x <- m1
					y <- m2
					m3
	8.6 Folding With Monads
		we will write: foldM
			generalizing foldl
		type signature
			foldM :: forall m a b
			      . Monad m
						=> (a -> b -> m a)
						-> a
						-> List b
						-> m a
			foldM _ a Nil = pure a
			foldM f a (b : bs) = do
				a' <- f a b
				foldM f a' bs
	8.7 Monads and Applicatives
		every Monad is an Applicative
	8.8 Native Effects
		Eff monad
			to manage native side effects
			side effects that distinguish js from psc
			ex:
				console io, random number generation, exceptions, mutable state
				dom manipulation, ajax, websocket, local storage
	8.9 Side-Effects and Purity
	8.10 Eff monad
	8.11 Extensible Effects
	8.12 Interleaving Effects
	8.13 The Kind of Eff
		so far: *, ->
		Eff
			:kind Eff
			! -> * -> *
		! kind of effects
			represents type level labels for different types of side effects
	8.14 Objects and Rows
	8.17 Mutable State
		ST effect
	
# 9. Canvas Graphics

