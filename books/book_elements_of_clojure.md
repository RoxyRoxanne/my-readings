
# Elements of Clojure - Zachary Tellman

## Names

    intro
      names should be 
        narrow
        consistent
      narrow: exclude things it cannot represent
      consistent: easily understood by someone familiar with domain, code, ecosystem
      ex: get_sol_jupiter(m, k, not_found)
        m: represents any map
        k: represents key
          don't shadow the word "key" and "map"
        bad name
          reader might assume lots of different logic
          a lot of ambiguity
          function can be replaced by it implementation
        describe its purpose, not implementation
          get_jovian_moon
        separates what function does from how how it does it
      name is a layer of indirection
        indirection = abstraction
      names: most common indirection means
      act of writing software = act of naming
        programmers create more names than any other person
      philosophy terminology:
        sign: textual representation of a name
        referent: the thing it refers to
      relation between signs and referents
        opt1: arbitrarily related (before 1900s)
        opt2: 
          Gottlob Frege: found a flaw 
          two names might refer to the same thing now
          but it is possible that tomorrow they differ
          we cannot just consider what a name references,
          we must also consider how it is referenced
          this is the sense of a name
        similar to variable references
          a = 52
          b = 52
          the values of a and b are equal
          but over time they might change. thus they are not equal names
          sign = name's textual representation
            ex: "a" "b"
          referent: what name points to
            = underlying implementation
          sense: fundamental properties we ascribe to a name
          ex: "id" is the name for our unique identifier
            its implementation is in UUID 128-bit values
            consider now:
              our unique identifiers are unique
              our unique identifiers are 128-bit values
            first sentence is true fundamentally
              this is like "sense"
            second sentence is true temporarily for this implementation only
              thus it is fundamentally wrong
              this is like "implementation" = "referent"
        when we read a new name, we only need to understand its sense
        narrow and specificness
          narrow name reveals its sense
          specific name captures most of an implementation
          general name captures small part of implementation
          narrow ≠ specific
          overly general name obscures fundamental properties
          overly specific name exposes implementation
            mynote:
              oop: cohesion vs coupling
          narrow name finds a balance between two
        narrowness: derives from sign and context 
          context: surrounding code, documentation, conversations
          ex: replacing "uuid" for "id" in emails will distort the sense
          without constant care, narrowness may disappear
        sense can be implicit
          ex: engineer working on serialization for "id" decides to use 128-bit encoding
            implicitly: encoding a fundamental property
            other engineer: regex that looks for 36 hexadecimal chars
              implicitly doing the same
        this problem cannot be fully solved
          ambiguous words/thoughts
          projects exist in a continuous state of low-level confusion
        confusion problem can be minimized through consistency
          a name whose sense is consistent with reader's expectations
            requires less effort
            if not, readers must deliberately remember what context a name exists in
          there can be inconsistencies between sense and referent
            ex: "id" means unique
              but if we use poor random-number generator for uuid
              then there is a likeliness for duplicate identifiers
        we can choose: how we wish to be inconsistent
          ex: student in university software
            different departments have different expectation for "student" name
              admissions office: anyone eligible to apply
              bursar's office: anyone attending
              faculty: anyone registored for classes
          to be fully consistent:
            one-to-one relation between signs and senses
            we must invent a sign for each sense
            but also readers must agree on their sense
            thus "student" name must be avoided
            most "natural" names have rich collection of senses
            to avoid ambiguity we must use synthetic names
              which have no intuitive sense in the context
          ex: category theory
            full with synthetic names
            "monad" means nothing to anyone
            thus we can define it to mean anything
            experts use synthetic names to communicate without ambiguity
            noviced are forced to learn
        natural names allow analogy
          synthetic names defy analogies
    Naming Data
      vars of immutable data
        we control both: sign and referent
        we don't control the sense
        ex:
          def errors = ["too_hot", "too_cold"]
          should we add "too_hard" and "too_soft" to the set?
      function parameters
        we control sign
          data could be anything
            in static type languages: values that fall outside var's sense
            type systems are a tool, not a solution
        if sense assumes certain invariants
          we can enforce them at the top of function
          but relationship between our functions is not adversarial
            no need to check invariants at every level
          relationship between our software and outside world
            can be adversarial
          sanity checks should exist at the periphery of code
      names provide indirection
        for vars: inderection hides underlying value
        for function parameters: indirection hides implementation of invoking functions
        for let-bound values: inderection hides right-hand expression
        when names are evident, then no need to read right hand sides (implementations)
      self-evidency
        every name we create, as we create it, seems self-evident
        6 months later, less so
      repeatedly used values
        prefer to use short names rather than self-evident one
        then right-hand expression should be as simple as possible
      finding good names is difficult
        thus we should avoid trying if possible
        ex: a series of transformations on data
        ex: function's implementation is more self-explanatory than any name
          make it anonymous
        ex: if you can't find any good names for pieces of a large function
          leave it as is
      guidelines for good names
        should be judged in their context
        but there is a collection of defaults
        ex: for clojure ecosystem
          x: can be anything
          xs: list of anything
          m: map of any key onto any value
          f: arbitrary function
          ms, fs: lists of maps/functions
          this: anonymous function or self-reference
          [a b c ...]: function takes a few args with same type
          form: arbitrary expression
          body: variadic parameter of a macro
          key->value: map with well-defined types
            ex: class->students
            dept->class->students
          a+b: tuple of different types
            ex: tutor+student
    Naming Functions
      data scope: any data we can see
        contains: lexical scope, accessible vars
      functions do:
        pull data into scope
        transform data
        push data into other scope
        ex: 
          GET: pull 
          POST: push
      most functions should only: push, pull or transform data
        at least one function in a process: must do all three
      if function 
        crosses scope boundaries: verb
        pulls data: describe type it returns
        pushes data: describe effect
        ex: 
          get_payload
          delete_payload
          compress_and_get_payload
        if they are in namespace specific to payloads:
          get, delete, compress_and_get
          other namespaces will prefix with namespace
        transforms data: no verb
        ex:
          md5
          timestamp
          last_modified
          ->base64
        modifies data: verb (often)
        ex:
          add_student
    Naming Macros
      two kinds of macros:
        that we understand syntactically
        that we understand semantically

        
