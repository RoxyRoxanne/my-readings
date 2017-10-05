
const All = x => ({ x,
	concat: ({x: y}) => All(x && y),
	fold: x
});

const Fn = f => ({
	fold: f,
	concat: o =>
		Fn(x => f(x).concat(o.fold(x)))
})

const hasVowels = x => !!x.match(/[aeiou]/ig)
const longWord = x => x.length >= 5
const both = Fn(compose(All, hasVowels))
						 .concat(Fn(compose(All, longWord)))

['gym', 'bird', 'lilac']
.filter(x => both.fold(x).x)
// [lilac]

