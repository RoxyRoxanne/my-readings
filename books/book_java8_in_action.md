	<url:file:///~/Dropbox (Personal)/mynotes/content/books/book_java8_in_action.md>

# Book: Java 8 in Action

	Manning.Java.8.in.Action.Lambdas.Streams.and.functional-style.programming.1617291994.epub
	ch02: Passing code with behavior parameterization
		ex: filter apples
			List<Apple> redApples = filter(inventory, (Apple apple) -> "red".equals(apple.getColor()));
			List<String> evenNumbers = filter(numbers, (Integer i) -> i % 2 == 0);
		ex: sorting with Comparator
			inventory.sort( (Apple a1, Apple a2) -> a1.getWeight().compareTo(a2.getWeight()));
		ex: execute block with Runnable
			Thread t = new Thread(() -> System.out.println("Hello world"));
		ex: GUI event handling
			button.setOnAction((ActionEvent event) -> label.setText("Sent!!"));
	ch03: Lambda expressions 
		basic syntax:
			(params) -> expression
			(params) -> { statements; }
		functional interface
			specifiies only one abstract method
		function descriptor
			function descriptor: abstract method describes signature of lambda expression
		common functional interfaces
			| Functional interface | Function descriptor | Primitive specializations                                                                                                                                                                     |
			|----------------------|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
			| Supplier<T>          | () -> T             | BooleanSupplier, IntSupplier, LongSupplier, DoubleSupplier                                                                                                                                    |
			| Predicate<T>         | T -> boolean        | IntPredicate, LongPredicate, DoublePredicate                                                                                                                                                  |
			| Consumer<T>          | T -> void           | IntConsumer, LongConsumer, DoubleConsumer                                                                                                                                                     |
			| Function<T, R>       | T -> R              | IntFunction<R>, IntToDoubleFunction, IntToLongFunction, LongFunction<R>, LongToDoubleFunction, LongToIntFunction, DoubleFunction<R>, ToIntFunction<T>, ToDoubleFunction<T>, ToLongFunction<T> |
			| UnaryOperator<T>     | T -> T              | IntUnaryOperator, LongUnaryOperator, DoubleUnaryOperator                                                                                                                                      |
			| BiPredicate<L, R>    | (L, R) -> boolean   |                                                                                                                                                                                               |
			| BiConsumer<T, U>     | (T, U) -> void      | ObjIntConsumer<T>, ObjLongConsumer<T>, ObjDoubleConsumer<T>                                                                                                                                   |
			| BiFunction<T, U, R>  | (T, U) -> R         | ToIntBiFunction<T, U>, ToLongBiFunction<T, U>, ToDoubleBiFunction<T, U>                                                                                                                       |
			| BinaryOperator<T>    | (T, T) -> T         | IntBinaryOperator, LongBinaryOperator, DoubleBinaryOperator                                                                                                                                   |
		@FunctionalInterface annotation
		execute around pattern:
			blocks A and B are surrounded by same redundant code
			code
				public interface BufferedReaderProcessor {
					String process(BufferedReader b) throws IOException
				}
				public static String processFile(BufferedReaderProcessor p) throws IOException {
					try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {
						return p.process(br)
					}
				}
				String oneLine = processFile((BufferedReader br) -> br.readLine())
		using functional interfaces
			interface Predicate<T> { boolean test(T t) }
			interface Consumer<T> { void accept(T t) }
			interface Function<T, R> { R apply(T t) }
			ex
				| Use case                      | Example of lambda                                                 | Matching functional interface                                                           |
				|-------------------------------|-------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
				| A boolean expression          | (List<String> list) -> list.isEmpty()                             | Predicate<List<String>>                                                                 |
				| Creating objects              | () -> new Apple(10)                                               | Supplier<Apple>                                                                         |
				| Consuming from an object      | (Apple a) -> System.out.println(a.getWeight())                    | Consumer<Apple>                                                                         |
				| Select/extract from an object | (String s) -> s.length()                                          | Function<String, Integer> or ToIntFunction<String>                                      |
				| Combine two values            | (int a, int b) -> a * b                                           | IntBinaryOperator                                                                       |
				| Compare two objects           | (Apple a1, Apple a2) -> a1.getWeight().compareTo (a2.getWeight()) | Comparator<Apple> or BiFunction<Apple, Apple, Integer> or ToIntBiFunction<Apple, Apple> |
		Type checking
			same lambda, different functional interfaces 
				Callable<Integer> c = () -> 42;
				PrivilegedAction<Integer> p = () -> 42;
				Comparator<Apple> c1 =
					(Apple a1, Apple a2) -> a1.getWeight().compareTo(a2.getWeight());
				ToIntBiFunction<Apple, Apple> c2 =
					(Apple a1, Apple a2) -> a1.getWeight().compareTo(a2.getWeight());
				BiFunction<Apple, Apple, Integer> c3 =
					(Apple a1, Apple a2) -> a1.getWeight().compareTo(a2.getWeight());
			diamond operator: type inference
				List<String> listOfStrings = new ArrayList<>();
				List<Integer> listOfIntegers = new ArrayList<>();
			type inference
				no need for parameter type specification
				ex
					Comparator<Apple> c = (Apple a1, Apple a2) -> a1.getWeight().compareTo(a2.getWeight())
					-->
					Comparator<Apple> c = (a1, a2) -> a1.getWeight().compareTo(a2.getWeight())
			using free variables: vars that are defined in an outer scope
				final int portNumber = 1337;
				Runnable r = () -> System.out.println(portNumber);
		Method references
			ex
				inventory.sort(comparing(Apple::getWeight))
			examples
				| Lambda                                   | Method reference equivalent       |
				| (Apple a) -> a.getWeight()               | Apple::getWeight                  |
				| () -> Thread.currentThread().dumpStack() | Thread.currentThread()::dumpStack |
				| (str, i) -> str.substring(i)             | String::substring                 |
				| (String s) -> System.out.println(s)      | System.out::println               |
			3 kinds of method references
				static method
					Integer::parseInt
				instance method 
					String::length
				instance method of an existing object
					anObj::getValue
			ex
				List<String> str = Arrays.asList("a","b","A","B");
				str.sort((s1, s2) -> s1.compareToIgnoreCase(s2));
				-->
				List<String> str = Arrays.asList("a","b","A","B");
				str.sort(String::compareToIgnoreCase);
			constructor references
				ex
					Supplier<Apple> c1 = () -> new Apple()
					Apple a1 = c1.get()
					-->
					Supplier<Apple> c1 = Apple::new
					Apple a1 = c1.get()
				ex: Apple(Integer weight)
					Function<Integer, Apple> c2 = Apple::new
					Apple a2 = c2.apply(110)
				ex
					list<Integer> weights = Arrays.asList(7, 3)
					List<Apple> apples = map(weights, Apple::new)
				ex
					static Map<String, Function<Integer, Fruit>> map = new HashMap<>()
					static {
						map.put("apple", Apple::new)
						map.put("orange", Orange::new)
					}
					public static Fruit giveMeFruit(String fruit, Integer weight) {
						return map.get(fruit.toLowerCase())
							.apply(weight)
					}
				ex
					interface TriFunction<T, U, V, R> {
						R apply(T t, U u, V v)
					}
		Putting lambdas and method references into practice! 
			final goal
				inventory.sort(comparing(Apple::getWeight))
			sort
				void sort(Comparotr<? super E> c)
			opt
				opt1: Comparator anonymous class
					inventory.sort(new Comparator<Apple>() {
							public int compare(Apple a1, Apple a2){
									return a1.getWeight().compareTo(a2.getWeight());
							}
					});
				opt2: lambda
					inventory.sort((a1, a2) -> a1.getWeight().compareTo(a2.getWeight()));
				opt2: Comparator.comparing
					Comparator<Apple> c = Comparator.comparing((Apple a) -> a.getWeight());
					-->
					import static java.util.Comparator.comparing;
					inventory.sort(comparing((a) -> a.getWeight()));
				opt3: method reference
					inventory.sort(comparing(Apple::getWeight));
		Useful methods to compose lambda expressions 
			composing comparators
				Comparator<Apple> c = Comparator.comparing(Apple::getWeight);
				reversed order
					inventor.sort(comparing(Apple::getWeight).reversed())
				chaingn comparators
					inventor.sort(comparing(Apple::getWeight)
						.reversed())
						.thenComparing(Apple::getCountry))
			composing predicates
				Predicate<Apple> notReadApple = readApple.negate()
				Predicate<Apple> redHeavy = red.and(a -> a.getWeight() > 150)
				Predicate<Apple> redHeavy = red
					.and(a -> a.getWeight() > 150)
					.or(a -> "green".equals(a.getColor()))
			composing functions
				Function<Integer, Integer> f = x -> x + 1
				Function<Integer, Integer> g = x -> x * 2
				Function<Integer, Integer> h = f.andThen(g)
				int result = h.apply(1)
	ch04: Introducting Streams
		intro
			features
				declarative
				composable
				parallelizable
			parallel processing included
			ex
				List<String> lowCaloricDishesName =
				menu.parallelStream()
						.filter(d -> d.getCalories() < 400)
						.sorted(comparing(Dishes::getCalories))
						.map(Dish::getName)
						.collect(toList());
			data processing pipeline
				in each step:
					pipe data
					+ lambda function
				final step: collect()
					convert to List, Array
			ex: groupingBy
				Map<Dish.Type, List<Dish>> dishesByType =
					menu.stream().collect(groupingBy(Dish::getType));
				# note
					type: Type
					public enum Type { MEAT, FISH, OTHER }
		getting started with streams
			sequence of elements
				like collection
				has ordering
			source: such as collections, arrays, IO
			data processing operations: filter, map...
			pipelining
				laziness, short-circuiting
			internal iteration
		streams vs. collections
			difference
				when things are computed
			collection: in-memory
				holds all values
			stream: fixed, cannot be mutated
				computes on demand
					producer-consumer
					computed when demanded by consumer
			traversable only once
		stream operations
			ex
				List<String> lowCaloricDishesName = menu.parallelStream()
						.filter(d -> d.getCalories() < 400)
						.map(Dish::getName)
						.limit(3)
						.collect(toList());
		intermediate operations
			filter, map etc. return a new stream
			ex
				List<String> lowCaloricDishesName = menu.parallelStream()
						.filter(d -> {
							System.out.println(..)
							return d.getCalories() < 400)
						})
						.map(Dish::getName)
						.limit(3)
						.collect(toList());
			short-circuiting: limit(3) sayesinde sadece ilk 3 kayıt için println() yapılıyor
		terminal operations
			result: nonstream value such as List, void etc
			ex: forEach
				menu.stream().forEach(System.out::println)
			ex: count
				menu.stream().count()
		working with streams
	ch05: Working with streams
		ex
			List<Dish> vegetarianDishes = menu.stream()
				.filter(Dish::isVegetarian)
				.collect(toList());
		Filtering and slicing
			with a predicate
				ex: unique elements
					numbers.stream()
						.filter(i -> i %2 == 0)
						.distinct()
						.forEach(System.out::println)
				ex: skip
					numbers.stream()
						.filter(i -> i %2 == 0)
						.skip(2)
						.forEach(System.out::println)
		Mapping
			ex
				List<String> dishNames = menu.stream()
					.map(Dish::getName)
					.collect(toList());
			ex
				words.stream()
					.map(String::length)
					.collect(toList());
			ex
				List<String> dishNames = menu.stream()
					.map(Dish::getName)
					.map(String::length)
					.collect(toList());
			Flattening streams
				ex: unique characters in a list of words
					opt1
						words.stream()
							.map(word -> word.split(""))
							.distinct()
							.collect(toList());
						# this returns a list of list
					opt2
						words.stream()
							.map(word -> word.split(""))
							.map(Arrays::stream)
							.distinct()
							.collect(toList());
						# returns a list of stream
					opt3
						words.stream()
							.map(word -> word.split(""))
							.flatMap(Arrays::stream)
							.distinct()
							.collect(toList());
		Finding and matching
			anyMatch: does match any element
				ex: boolean
					menu.stream().anyMatch(Dish::isVegetarian)
			allMatch
				ex: boolean
					menu.stream().allMatch(Dish::isVegetarian)
					menu.stream().noneMatch(Dish::isVegetarian)
			findAny
				ex: return any object
					Optional<Dish> dish = menu.stream()
						.filter(Dish::isVegetarian)
						.findAny();
				Optional<Dish>
					ifPresent(Consumer<T> block)
					T orElse(T default)
				ex
					menu.stream()
						.filter(Dish::isVegetarian)
						.findAny()
						.ifPresent(d -> System.out.println(d.getName()))
			findFirst
				ex
					numbers.stream()
						.filter(i -> i %2 == 0)
						.findFirst()
		Reducing
			summing
				ex
					numbers.stream().reduce(0, (a,b) -> a + b)
					numbers.stream().reduce(1, (a,b) -> a * b)
				ex: using method reference
					numbers.stream().reduce(0, Integer::sum)
			maximum
				ex: using method reference
					Optional<Integer> max = numbers.stream().reduce(Integer::max)
					Optional<Integer> max = numbers.stream().reduce((a,b) -> a<b ? b : a)
				why Optional: stream can be empty
			stateless vs stateful
				stateless: map, filter
				reduce: stateful
			ex: find min transaction
				t.stream()
					.reduce((t1,t2) ->
						t1.getValue() < t2.getValue() ? t1 : t2)
				opt
					t.stream()
						.min(comparing(Transaction::getValue))
		Numeric streams
			primitive stream specializations
				IntStream, DoubleStream, LongStream
					tackle int, double, long
				not Stream<T>
				ex
					menu.stream()
						.mapToInt(Dish::getCalories)
						.sum()
				ex: boxed():Stream<T>
					menu.stream()
						.mapToInt(Dish::getCalories)
						.boxed()
				OptionalInt, OptionalDouble, OptionalLong
					ex
						OptionalInt maxC = menu.stream()
							.mapToInt(Dish::getCalories)
							.max()
						maxC.orElse(1)
			numeric ranges
				ex
					IntStream even = IntStream.rangeClosed(1, 100)
						.filter(n -> n % 2 == 0)
					IntStream.range(1,100)
					# open
		Building streams
			ex
				Stream.of("..","..")
					.map(String::toUpperCase)
			ex: from array
				Arrays.stream(numbers)
			ex: from files
				Files.lines(Paths.get(".."), charset)) {
					uniq = lines.flatMap(line -> Arrays.stream(line.split(" ")))
						.distinct()
						.count()
				}
			ex: from functions
				Stream.iterate(0, n -> n + 2)
					.limit(10) 
				Stream.generate(Math::random)
					.limit(5)
			ex: generate
				IntStream ones = IntStream.generate(() -> 1)
				IntStream twos = IntStream.generate(new IntSupplier(){
					public int getAsInt(){
							return 2;
					}
				});
			ex: stateful generate
				IntSupplier fib = new IntSupplier(){
					private int previous = 0;
					private int current = 1;
					public int getAsInt(){
							int oldPrevious = this.previous;
							int nextValue = this.previous + this.current;
							this.previous = this.current;
							this.current = nextValue;
							return oldPrevious;
					}
				};
				IntStream.generate(fib).limit(10).forEach(System.out::println);
		summary
			you process collections with database-like operations. 
			You can view Java 8 streams as fancy lazy iterators of sets of data. 
			They support two types of operations: intermediate operations such as filter or map and terminal operations such as count, findFirst, forEach, and reduce. 
			Intermediate operations can be chained to convert a stream into another stream. 
			These operations don’t consume from a stream; their purpose is to set up a pipeline of streams. 
			By contrast, terminal operations do consume from a stream—to produce a final result (for example, returning the largest element in a stream).
	ch06: Collecting data with streams
		you will learn
			collect() is a reduction operation like reduce
			ex queries:
				group transactions by currency:
					Map<Currencey, Integer>
				partition transactions: expensive and not expensive
					Map<Boolean, List<Transaction>>
				multilevel groupings: by cities and then by whether expensive
					Map<String, Map<Boolean, List<Transaction>>>
			ex: Map<Currencey, Integer>
				t.stream().collect(groupingBy( Transaction::getCurrency))
		Collectors as advanced reductions 
			reducing and summarizing
				ex
					long howManyDishes = menu.stream().collect(Collectors.counting());
					-->
					long howManyDishes = menu.stream().count();
				finding maximume
					Comparator<Dish> dishCaloriesComparator =
							Comparator.comparingInt(Dish::getCalories);
					Optional<Dish> mostCalorieDish =
							menu.stream()
									.collect(maxBy(dishCaloriesComparator));
				summarization
					int totalCalories = menu.stream().collect(summingInt(Dish::getCalories));
				joining strings
					String shortMenu = menu.stream().map(Dish::getName).collect(joining());
					String shortMenu = menu.stream().map(Dish::getName).collect(joining(", "));
				generalized summarization
					ex:
						int totalCalories = menu.stream().collect(reducing(
							0, Dish::getCalories, (i, j) -> i + j));
						-->
						Optional<Dish> mostCalorieDish = menu.stream().collect(reducing(
							(d1, d2) -> d1.getCalories() > d2.getCalories() ? d1 : d2));
						-->
						int totalCalories = menu.stream().collect(reducing(
							0, Dish::getCalories, Integer::sum);
						--> reduce
						int totalCalories = menu.stream().map(Dish::getCalories).reduce(Integer::sum).get();
						--> use sum() as sugar
						int totalCalories = menu.stream().mapToInt(Dish::getCalories).sum()
					ex: counting
						public static <T> Collector<T, ?, Long> counting() {
							return reducing(0L, e -> 1L, Long::sum);
						}
					ex: join strings
						String shortMenu = menu.stream().map(Dish::getName).collect(joining());
						-->
						String shortMenu = menu.stream().map(Dish::getName)
							.collect( reducing( (s1, s2) -> s1 + s2 ) ).get();
						-->
						String shortMenu = menu.stream()
							.collect( reducing( "", Dish::getName, (s1, s2) -> s1 + s2 ) );
				collect vs. reduce
					reduce: immutable reduction
					collect: mutates container to accumulate result
		Grouping
			ex
				Map<Dish.Type, List<Dish>> dishesByType = menu.stream().collect(groupingBy(Dish::getType));
				# {FISH=[prawns, salmon], OTHER=[french fries, rice, season fruit, pizza], MEAT=[pork, beef, chicken]}
			groupingBy(Function):Map<..>
			ex: using lambda
				public enum CaloricLevel { DIET, NORMAL, FAT }
				Map<CaloricLevel, List<Dish>> dishesByCaloricLevel = menu.stream().collect(
					groupingBy(dish -> {
						if (dish.getCalories() <= 400) return CaloricLevel.DIET;
						else if (dish.getCalories() <= 700) return CaloricLevel.NORMAL;
						else return CaloricLevel.FAT;
					} ));
			Multilevel grouping
				groupingBy(collector1, collector2)
				ex
					Map<CaloricLevel, List<Dish>> dishesByCaloricLevel = menu.stream().collect(
						groupingBy( (Dish::getType),
							groupingBy(dish -> {
								if (dish.getCalories() <= 400) return CaloricLevel.DIET;
								else if (dish.getCalories() <= 700) return CaloricLevel.NORMAL;
								else return CaloricLevel.FAT;
							} )));
				equivalent to: n-dimensional table
					/Users/mertnuhoglu/Dropbox/public/img/ss-171.png
			Collecting data in subgroups
				collector2: can be any type
					not just groupingBy
				ex
					Map<Dish.Type, Long> typesCount = menu.stream().collect(
						groupingBy(Dish::getType, counting()));
					# {MEAT=3, FISH=2, OTHER=4}
				note: groupingBy(f) is shorthand for
					groupingBy(f, toList())
				ex
					Map<Dish.Type, Optional<Dish>> mostCaloricByType = menu.stream() 
						.collect(groupingBy(Dish::getType, 
							maxBy(comparingInt(Dish::getCalories))));
					# {FISH=Optional[salmon], OTHER=Optional[pizza], MEAT=Optional[pork]}
				note: Optional is useless here
				ex
					Map<Dish.Type, Optional<Dish>> mostCaloricByType = menu.stream() 
						.collect(groupingBy(Dish::getType, 
							collectingAndThen( 
								maxBy(comparingInt(Dish::getCalories)),
								Optional::get)
							))
					# {FISH=salmon, OTHER=pizza}
				ex
					Map<Dish.Type, Integer> totalCaloriesByType = menu.stream()
						.collect(groupingBy(Dish::getType,
							summingInt(Dish::getCalories)));
				ex: collector: mapping(fun, collector) 
					Map<Dish.Type, Set<CaloricLevel>> caloricLevelsByType = menu.stream().collect(
						groupingBy(Dish::getType, mapping(
							dish -> { 
								if (dish.getCalories() <= 400) return CaloricLevel.DIET;
								else if (dish.getCalories() <= 700) return CaloricLevel.NORMAL;
								else return CaloricLevel.FAT; },
							toSet() )));
					# {OTHER=[DIET, NORMAL], MEAT=[DIET, NORMAL, FAT], FISH=[DIET, NORMAL]}
			Partitioning
				special case of grouping
					predicate: called partitioning function
					as a classification function
				ex
					Map<Boolean, List<Dish>> partitionedMenu =
						menu.stream().collect(partitioningBy(Dish::isVegetarian))
					# {false=[pork, beef, chicken, prawns, salmon], true=[french fries, rice, season fruit, pizza]}
					List<Dish> vegetarianDishes = partitionedMenu.get(true);
					-->
					List<Dish> vegetarianDishes = menu.stream().filter(Dish::isVegetarian).collect(toList());
				benefits of partitioning
					keeps both lists
					second collector can be overloaded
					ex
						Map<Boolean, Map<Dish.Type, List<Dish>>> vegetarianDishesByType =
							menu.stream().collect(
								partitioningBy(
									Dish::isVegetarian,
									groupingBy(Dish::getType)))
						# {false={FISH=[prawns, salmon], MEAT=[pork, beef, chicken]}, true={OTHER=[french fries, rice, season fruit, pizza]}} 
					ex
						Map<Boolean, Dish> mostCaloricPartitionedByVegetarian =
						menu.stream().collect( 
							partitioningBy(
								Dish::isVegetarian,
								collectingAndThen(
									maxBy(comparingInt(Dish::getCalories)),
									Optional::get)));
					ex: multilevel partitioning
						menu.stream().collect(partitioningBy(Dish::isVegetarian,
							partitioningBy(d -> d.getCalories() > 500)));
						menu.stream().collect(partitioningBy(Dish::isVegetarian,
							counting()));
					ex: partitioning numbers into prime and nonprime
						public boolean isPrime(int candidate) {
								int candidateRoot = (int) Math.sqrt((double) candidate);
								return IntStream.rangeClosed(2, candidateRoot)
																.noneMatch(i -> candidate % i == 0);
						}
						public Map<Boolean, List<Integer>> partitionPrimes(int n) {
								return IntStream.rangeClosed(2, n).boxed()
																.collect(
																	partitioningBy(candidate -> isPrime(candidate)));
						}
				examples
					| Factory method | Returned type | Used to |
					| toList  | List<T>  | Gather all the stream’s items in a List. |
					| toSet  | Set<T>  | Gather all the stream’s items in a Set, eliminating duplicates. |
					| toCollection  | Collection<T>  | Gather all the stream’s items in the collection created by the provided supplier. |
					| counting  | Long  | Count the number of items in the stream. |
					| summingInt  | Integer  | Sum the values of an Integer property of the items in the stream. |
					| averagingInt  | Double  | Calculate the average value of an Integer property of the items in the stream. |
					| summarizingInt  | IntSummary-Statistics  | Collect statistics regarding an Integer property of the items in the stream, such as the maximum, minimum, total, and average. |
					| joining  | String  | Concatenate the strings resulting from the invocation of the toString method on each item of the stream. |
					| maxBy  | Optional<T>  | An Optional wrapping the maximal element in this stream according to the given comparator or Optional.empty() if the stream is empty. |
					| minBy  | Optional<T>  | An Optional wrapping the minimal element in this stream according to the given comparator or Optional.empty() if the stream is empty. |
					| reducing  | The type produced by the reduction operation  | Reduce the stream to a single value starting from an initial value used as accumulator and iteratively combining it with each item of the stream using a BinaryOperator. |
					| collectingAndThen  | The type returned by the transforming function  | Wrap another collector and apply a transformation function to its result. |
					| groupingBy  | Map<K, List<T>>  | Group the items in the stream based on the value of one of their properties and use those values as keys in the resulting Map. |
					| partitioningBy  | Map<Boolean, List<T>>  | Partition the items in the stream based on the result of the application of a predicate to each of them. |
				uses
					List<Dish> dishes = menuStream.collect(toList());
					Set<Dish> dishes = menuStream.collect(toSet());
					Collection<Dish> dishes = menuStream.collect(toCollection(), ArrayList::new);
					long howManyDishes = menuStream.collect(counting());
					int totalCalories = menuStream.collect(summingInt(Dish::getCalories));
					double avgCalories = menuStream.collect(averagingInt(Dish::getCalories));
					IntSummaryStatistics menuStatistics = menuStream.collect(summarizingInt(Dish::getCalories));
					String shortMenu = menuStream.map(Dish::getName).collect(joining(", "));
					Optional<Dish> fattest = menuStream.collect(maxBy(comparingInt(Dish::getCalories)));
					Optional<Dish> lightest = menuStream.collect(minBy(comparingInt(Dish::getCalories)));
					int totalCalories = menuStream.collect(reducing(0, Dish::getCalories, Integer::sum));
					int howManyDishes = menuStream.collect(collectingAndThen(toList(), List::size));
					Map<Dish.Type, List<Dish>> dishesByType = menuStream.collect(groupingBy(Dish::getType));
					Map<Boolean, List<Dish>> vegetarianDishes = menuStream.collect(partitioningBy(Dish::isVegetarian));
			Collector interface
				methods to implement reduction operations
					toList, groupingBy
				Collector interface
					public interface Collector<T, A, R> {
						Supplier<A> supplier();
						BiConsumer<A, T> accumulator();
						Function<A, R> finisher();
						BinaryOperator<A> combiner();
						Set<Characteristics> characteristics();
					}
				ex: implementing ToListCollector
					supplier
						public Supplier<List<T>> supplier() {
							return () -> new ArrayList<T>()
						}
						-->
						public Supplier<List<T>> supplier() {
							return ArrayList::new
						}
					accumulator: fun that performs reduction op
						public BiConsumer<List<T>, T> accumulator() {
							return (list, item) -> list.add(item)
						}
						-->
						public BiConsumer<List<T>, T> accumulator() {
							return List::add
						}
					finisher: returns result
						public Function<List<T>, List<T>> finisher() {
							return Function.identity()
						}
					combiner: how to combine when run in parallel
						public BinaryOperator<List<T>> combiner() {
							return (list1, list2) -> {
								list1.addAll(list2)
								return list1
							}
						}
				ex: without creating a Collector
					menu.collect(
						ArrayList::new,
						List::add,
						List::addAll)
			Developing your own collector for better performance 
	ch10: Using Optional as a better alternative to null 
		intro
			covers
				why not null
				from null to Optional
				reading value in Optional
		Introducing the Optional class 
		Patterns for adopting Optional 
			creating
				Optional<Car> optCar = Optional.empty();
				Optional<Car> optCar = Optional.of(car);
				Optional<Car> optCar = Optional.ofNullable(car);
			transforming with map
				Optional<Insurance> optInsurance = Optional.ofNullable(insurance);
				Optional<String> name = optInsurance.map(Insurance::getName);
			chaining with flatMap
				opt1: map
					Optional<Person> optPerson = Optional.of(person);
					Optional<String> name =
						optPerson.map(Person::getCar)
							.map(Car::getInsurance)
							.map(Insurance::getName);
					# error: getCar returns Optional<Car>
						thus result of map is
							Optional<Optional<Car>>
				opt2: flatMap
					Optional<Person> optPerson = Optional.of(person);
					Optional<String> name =
						optPerson.flatMap(Person::getCar)
							.flatMap(Car::getInsurance)
							.map(Insurance::getName)
							.orElse("unknown")
			default actions
				get()
					least safe
					expects a wrapped value
				orElse(T other)
				orElseGet(Supplier<? extends T> other)
					lazy counterpart of orElse
				orElseThrow(..)
				ifPresent(Consumer<? super T> consumer)
			combining two optionals
				opt1: traditional way
					public Optional<Insurance> nullSafeFindCheapestInsurance(
						Optional<Person> person, Optional<Car> car) {
							if (person.isPresent() && car.isPresent()) {
								return Optional.of(findCheapestInsurance(person.get(), car.get()));
							} else {
								return Optional.empty();
							}
						}
				opt2: declarative way
					person.flatMap(p -> car.map(c -> findCheapestInsurance(p, c)))
			rejecting certain values with filter
				opt1: traditional
					Insurance insurance = ...;
					if(insurance != null && "CambridgeInsurance".equals(insurance.getName())){
						System.out.println("ok");
					}
				opt2: new way
					Optional<Insurance> optInsurance = ...;
					optInsurance.filter(insurance ->
						"CambridgeInsurance".equals(insurance.getName()))
						.ifPresent(x -> System.out.println("ok"));
				ex: filtering
					public String getCarInsuranceName(Optional<Person> person, int minAge) {
							return person.filter(p -> p.getAge() >= minAge)
													 .flatMap(Person::getCar)
													 .flatMap(Car::getInsurance)
													 .map(Insurance::getName)
													 .orElse("Unknown");
					}
				methods of Optional
					| Method | Description |
					| empty  | Returns an empty Optional instance |
					| filter  | If the value is present and matches the given predicate, returns this Optional; otherwise returns the empty one |
					| flatMap  | If a value is present, returns the Optional resulting from the application of the provided mapping function to it; otherwise returns the empty Optional |
					| get  | Returns the value wrapped by this Optional if present; otherwise throws a NoSuchElementException |
					| ifPresent  | If a value is present, invokes the specified consumer with the value; otherwise does nothing |
					| isPresent  | Returns true if there is a value present; otherwise false |
					| map  | If a value is present, applies the provided mapping function to it |
					| of  | Returns an Optional wrapping the given value or throws a NullPointerException if this value is null |
					| ofNullable  | Returns an Optional wrapping the given value or the empty Optional if this value is null |
					| orElse  | Returns the value if present or the given default value otherwise |
					| orElseGet  | Returns the value if present or the one provided by the given Supplier otherwise |
					| orElseThrow  | Returns the value if present or throws the exception created by the given Supplier otherwise |
		Practical examples of Optional
			wrapping a potentially null value
				Object value = map.get("key")
				-->
				Object value = Optional.ofNullable(map.get("key"))
			exceptions vs. optional
				static Optional<Integer> stringToInt(String s) {
					try {
						return Optional.of(Integer.parseInt(s))
					} catch (NumberFormatException e) {
						return Optional.empty()
					}
			primitive optionals: don't use them
				OptionalInt, OptionalLong
				they lack map, flatMap, filter

