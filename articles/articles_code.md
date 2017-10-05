
# IntelliJ

  42 IntelliJ IDEA Tips and Tricks-eq3KiAH4IBI.mp4
    keymap: osx 10.5
    Plugin > Presentation Assistant
      everytime a key pressed, it shows it
    Plugin > AceJump
      ^;
    Open Class
      * wildcards
      Sch:40
        go to line 40
    Symbol lookup
      OST.sumfl
        namespace filtering
    Search Everywhere
      ++ double shift
      anything searched
        recent files
        menus, symbols, configurations
      tab to navigate
      history: oklarla
    don't use multiple tabs
      inefficient to navigate
    navigate back/forwarde: #[ #]
    go to project window > type to search
    sync project window to editor
      opts > Autoscroll from source
    new file 
      project > #n
      namespace included: a.b.c
      inside a file: !#n
    scratch file action
      draft file
    hide all windows/restore: #+f12
    enter distraction free mode
    enter presentation mode
      make everything big
    stretch to left/right
      resize windows
    select word !up
    move line up/down   !+up
    clipboard history   ^+v
    put multiple cursors
    auto indent lines   ^!i
    reformat code #!L
    code cleanup action
      entire project
    select function > show intention action !enter
      to change code style (adjust style)
    writing escaped strings
      intent action > inject language > json
      then it becomes json editor
      intent action > edit json
    regex
      intent action > inject language
      edit regex
    smart completion ^+space
    parameter info  ^p
    double smart completion
    hippie completion
      cyclic expand word  !/
      farklı değişkenlerin arasında dolaşır
    surround with #!t
    complete current statement  #!enter
    html: #myDiv>ul>li*5  Tab
    type hierarchy  ^t
    method type hierarchy #+h
    file structure  #f12
    navigate: file structure  #up
      create files from there
    prefs > inspections
      switch simple ones off
      next highlighted error  f2
    run inspect code action
      run inspection by name
    structural search replace
      search code based on template
      modify templates:
        prefs > inspections > sturctural > template
          replacement template: as intention quick fix
    analyze > analyze dataflow to here
      hangi değişkenler nerede değiştirilmiş
    analyze > analyze dependency matrix
      modüller arasındaki bağımlııklar
    plugin > Metrics Reloaded
      Metrics: kod metriklerini hesaplar
    databases
      sql statements in string
        code completion
        intention > run query in console
        refactor > rename > alter table sql
    version control window
      select two different things > compare
      action > annotate
        you see annotations
          > copy revision number
          see it in version logs
      commit changes  #k
        before commit: reformat, optimize imports
    debugging
      right click breakpoint
        > more
          set a condition
          log messages to console
          group breakpoints
        > break at individual 
      stepping into: lambda functions
      debugger > select variable > show referring objects
    refactoring ^t
    Test Restful Webservice
    vcs operations  ^v
      quick list of ops
        prefs > quick lists > customize them
    quick switch scheme ^`
      ex: keymap bindings, color scheme etc.
    Help > productivity guide
      how many times you used commands
    Registry action
      low level settings
  IntelliJ IDEA - Tips and Tricks-P2MoObVeMX4.mp4
    multiple cursors !+click
    select all occurrences of word  #^g
  IntelliJ IDEA Tips and Tricks 'Secret' _ IntelliJ IDEA Tricks to Boost Productivity-S5B7ClJ76Ek.mp4
    cursor movement
      !ok 
      #ok
      fn ok
    moving lines
      !+up  lines
      #+up  statements
    folding #+ #-
    static method completion  
      ^space ^space
      !enter: import
    action postfix completion
      display suggestions #j
      try, for, fori, forr
    generate menu items #n
    vcs
      commit changes  #k
      diff  #d
        make changes there
      revert changes  #!z
        select a file first
  40 Tips & Tricks for Spring in IntelliJ IDEA -  Yann Cébron & Stéphane Nicoll @ Spring I_O 2016-OfdERvmIJXc.mp4
  Debugging JavaScript in WebStorm-CdXoeVRN1JU.mp4
  Debugging JavaScript in WebStorm and Chrome - quick start-a-IsnxZpRrQ.mp4
  JDK 8 - Lessons Learnt With Lambdas and Streams-wZKmA6XodNE.mp4
    Supplier<T>
      logger.finest( () -> getSomething() )
      # if the logger doesn't need the value, it doesn't call lambda
    Loops 
      don't forEach neiteher
        sks.stream()
          .mapToInt(..)
          .sum()
      peek: like trace
        map.get(name)
          .stream()
          .peek(method -> output.println(method))
          .mapToInt(m -> ..)
          .sum()
      find length of longest line in a file
        reader.lines()
          .mapToInt(String::length)
          .max()
          .getAsInt()
      find longest line
        opt1
          reader.lines()
            .sort((x,y) -> y.length() - x.length())
            .findFirst()
            .get()
          # not efficient
        opt2
          reader.lines()
            .reduce( (x,y) -> {
              if (x.length() > y.length())
                return x;
              return y;
            })
            .get()
            # x in effect maintains state for us
        opt3
          reader.lines()
            .max(comparingInt(String::length)
            .get()
  An Overview of Guava - Google Core Libraries for Java-MFEJll-wU7Q.mp4
    Preconditions
      # validate assumptions at the start of functions
      Car(engine) 
        this.engine = checkNotNull(engine)
      drive(speed) 
        checkArgument( speed > 0.0, "..")
        checkState(engine.isRunning(), "..")
    Object.toStringHelper()
      # implementing toString()
        Objects.toStringHelper(this)
          .add("name", name)
          .add("id", userId)
          .omitNullValues()
          .toString()
        // Person{name=Kurt, id=42}
    Stopwatch
      # prefer over System.nanoTime()
      stop = newStowpacth()
      stop.start()
      doSomething()
      long millis = stop.elapsedMillis()
    String Splitting Quiz
      " foo, , bar".split(",")
      // " foo" " " "bar"
      # to trim
      Splitter.on(',')
        .trimResults()
        .omitEmptyStrings()
        .split("..")
    String Joining
      Joiner.on(", "
        .skipNulls()
      // .useForNull(String)
    CharMatcher
      .is('x')
      .isNot(..)
      .oneOf("aielm")
      inRange('a', 'z')
      matches(char)
      ex
        matchesAllOf
        indexIn
        removeFrom
        trimFrom
        collapseFrom
      CharMatcher.DIGIT.or(CharMatcher.is('-')).retainFrom(userInput)
    Optional<T>
      immutable wrapper in two states
        present: non-null ref
        absent: contains nothing
        it never contains null
      creating
        Optional.of(notNull)
        Optional.absent()
        Optional.fromNullable(..)
      unwrapping
        media.charset().get()
        media.charset().or(Charsets.UTF_8) // default value
      useful
        media.charset().transform(stringFun)
    Functional Programming
      Function<F, T>
      Predicate
    collect
      MultiMap
        single key - multiple values
      BiMap
        bidirectional map
        keys and values are unique
      Table<R, C, V>
        map with two keys: row, column
        use instead of
          Map<R, Map<C, V>>
      Immutable Collections
      ComparisonChain
        Comparison.start()
          .compare(getOffset(..), getOffset(..))
          .result()
  Selfish Purity - How Functional Programming Makes Every-Day Jobs Easier-WupzbiMZrl8.mp4
    control flow
      control flow is all about concurrency
      computation dependency
        sequential (flatMap/for-comprehensions) (do notation) control flow
          sequential control flow
        parallel control flow (zip)
      abstraction for that
        monads = sequential
        applicative = parallel
          maybe more important than monads

# ScreenFlow - combocasting

in marker
  i
out marker
  o
  
02 Screenflow Basics Part 2-x3lND3JbBTY.mp4
  applying effects to make presentation more dynamic
  title for video
    sidebar > T > add text box
    clip > add starting transition
    clip > add ending transition
  change transition
    dblclick: transition
  background of text
    sidebar > backdrop
  styling
    make a black ribbon
  callout - mouse vurgulama
    highlight: mouse cursor
    zoom: 200%
  video action
    clip
      sidebar > video > action
    zoom
    scale
    to reverse it:
      make another video action
  annotation
    sidebar > annotation
    clip > add starting transition
    clip > sidebar > video > action
      end of video action:
        scale: 400%
        opacity: 0%
  break a clip and move its position
  going from one clip to another
    prolong it
    make a transition
  make it more dynamic by video actions
    video action: that zooms very little
    in a long time
  adding watermark logo
    add media > select png
    drag it to timeline
    move its layer above
  transparency of background in image
    keynote > alpha
    click background > drag circle
08 Screenflow Tutorial - ComboCasting with Graphics Part 2-lDisMTEqP0I.mp4
  put videos into png screen frame
    tv, mp3, etc. 
09 ComboCasting with Graphics - Part 3-0o92AkgOaZQ.mp4
  plr video: powerpoint presentation with voiceover
    existing content
      from youtube or your own content
  add branding logo
    prepare in photoshop
      make a bottom border
      add warp
      add logo
      add shadow
  add note titles
    add transition
10 Using Skitch in your Screenflow screencasts.-qXB9vciP6BU.mp4
  direct dragging to screenflow
    no saving required
  use cases
    grab background from keynote
    grab a web page
    edit an image with the same background
    grab part of an image
    pop out a specific part of a web page
11 Using Keynote to create ComboCasts-ekNq1CRpfNs.mp4
  benefits
    organize the structure
    standard theme
    visual effects
    exciting intro videos
    sizing
    graphic editor
      banners + posters
    graphical structure + outline
12 Keynote Quick Tour-C0dIyFSEpog.mp4
  masters
    templates for slides
  mask
    using a part of an image
  alpha
    making background transparent
  inspector
    edit image
    rotation, size, shadow, color
    manipulating text
    effects
  color
    copy current color
  view > show adjust image
    manipulate photo
      temperature, saturation, contrast, sharpness
13 Sizing and themes for Keynote-nuxnESazVk8.mp4
  hd video better
    no black region beside the videos
  4x3
    800x600
    1280x720: hd
  get image from web
    skitch > drag to keynote master
  making custom background theme
    keynote > white theme
    google images > "background themes"
      resizing:
        inspector > metrics > .size + .remove constraint
    arrange > lock
      this slide becomes a master
  put content
    add image 
      put a frame
        inspector > graphics > stroke > .picture frame
    add border
      shapes > rectangle
      move to bottom
      extend the whole bottom side
      add logo or url
        to prevent url linking
          inspector > hyperlink > .uncheck: enable as a hyperlink
    make image fit better with background color
      view > show adjust image > temperature
  save file as "template"+file name
  make multiple videos from that template
14 Keynote Branding for Screenflow-ByFvNEE6GyU.mp4
  build a branded elements page
    benefits
      no need to decide the font, size, color each time
      productivity will skyrocket
15 Article to Video Tutorial-_jH1KotLjgQ.mp4
  if lots of text to read
    zoom it closer
    revert back:
      slow transition
    zoom using an angle
  freesound.org
    get swoosh sound
    put it where page effects occur
    make them not loud
16 Editing your Keynote recording in Screenflow-_n1mn_dteB4.mp4
  freeze frame #+f
    to split a slide into two
  split #+te
18 Article to Video production using Screenflow.-6CqEIPs_5TU.mp4
19 Adding effects and transitions to Keynote-7SxAVzhkZuA.mp4
  how to build the keynote raw presentation
  slide 1
    inspector > build > build in
      add effects
    > more options
      to see all effects
      > start build: automatically with build 1
        both efffects together
        > delay: 0.5 s
    make all effects in sequence
    text: > effect: typewriter
  next slides
    let logo static
    text: > effect: typewriter
    let title dissolve out
  find images from google
    drag drop
    alpha: transparency
    inspector > graphics > shadow
  page to page effect
    inspector > slide > transition
21 Editing your script and creating frames in Keynote-FchpKECQnos.mp4
22 Compare a ComboCast and a Screencast-fJqCasXkJM0.mp4
  screencasts
    create a standard bg, intro/outro and music for everyday screencasts
    target keywords
  combocasts
    image, text, presentation, zooming, effects
    message more organized and fluent
    entertaining
    inspiring
26 Recording Audio Track with Garage Band-o8J32pL3dqs.mp4
  why garageband
    loops
    podcast
      voice if not
  prepare script first
  screen
    tracks
      in layers
    sound effects
  read article from script
    in one shot
      make repetitions in the same recording
  editing
    in lower region
    #t  to split track
25 Breaking Down a ComboCast-IZqsm08o0So.mp4
  steps to a combocast
    1. research and write the script
    2. create keynote document/background, edit script
    3. record the script
    4. capture images and elements
    5. record app walk-through (silent)
    6. record keynote presentation (1280x720)
    7. edit presentation
    8. add theme music and sound effects
      music is below
      sound effects above (small sounds)
    9. export as hd 1280x720
  what did i do 
    adding sound effects
      make all sound effects together and put it at the end
      like a swipe file
    zoom and pan effect
    add text in screenflow
    overlay sound effects above the visual effects
      move sound a bit forward
      increase the amplitude a little
    make image pop out of the book
      duplicate layers in keynote first
      add effect to above layer
    skitch image of website
      zoom and pan
    inserted section of app walk through
    typing with sound
      sound effect
    creating todo list
      speed things up
      all different scales, angles
      hectic sound effects
    non-static effects
      giving angle
      to retain attention
    zoom to small area
    added fire
      a rectangle
      inspector > effect: flame
    added arrow annotations (skitch)
    added voice bubble png
      text art
      software: "ArtText"
        png images of squares, buttons etc.
    added video recording from hand-held camera
    changed background music at the end
      added volume
      increases attention
    added beep sounds when each device pops out
    added FREE on new background
      stopped music
      added voice bubble: "are you kidding me?"
    zoom out image
      set opacity to zero
    created multiple text effect
      in keynote
24 How to create your own background music for videos.-g7KHr2j7wVM.mp4
  mix multiple jingles
  add to screenflow
    drop volume after intro
      audio action
23 intro-final-email-FLw3pSnQFjI.mp4

# YouTrack Documentation id=art_0005

  # YouTrack Documentation <url:#r=art_0005>
topics
  creating and editing issues
    attachements
    image editor
    urls for preset fields 
    cloning
    mention username
    watching issues
    commenting issues
    linking issues
    visibility
    wiki markup
    bookmarklet
    screenshots
  searching issues
    filters
    saved searches
    search context
    tags
    search query and commands
  navigating
  command window
    via jabber
    reordering issues
    change multiple issues
  notifications
  sidebar
  mobile ui
  integrations
    git
    jira
    mailbox
  live dashboard
cases
  admin
    users
      delete user
        admin > users > .select > ban
        https://confluence.jetbrains.com/display/YTD65/Deleting+User+Accounts
        there is no user deleting, you can only ban
      assing a role to user
        admin > users > .select > roles > add role
    projects
      create project
        projects > create project
      assign users to projects
        settings > project > edit > team > .select users > add to assignees
    roles
      Developer role is sufficient
    states
    create new shortcuts scheme
      administration > global settings > keyboard shortcuts > export selected shortcuts
shortcuts
  general
    esc   toggle search box
    up/dn   move issues
    hm/end  first/last issues
    #->     next page
    #+->    last page
    ->      expand/collapse
    space     select issue
    ^!n       new subtask
    F2        open issue
      esc       go back to list
    ^+del     toggle sidebar
    ^+0       toggle watching
    ^/        shortcut hints
    ^n        new issue
    #c        select id
    ^!=
    ^!-       decrease/increase detail level
    ^!c       write comment
    ^!k       command window
    ^!v       attach image
  full issues view
    F2        edit issue
    #up       open issues list
    ^+c       switch comments tab
    ^+h       switch history tab
    ^+l       switch links tab
  bookmarklets
    create new issue
workflows
  what is workflow
    https://confluence.jetbrains.com/display/YTD65/What+Is+a+Workflow+and+Why+You+Should+Care
    workflow
      set of states and transitions
        an issue go through
      set of rules addressing a task
    rule
      a script written in DSL
    types of rules
      stateless
        when issue changed/created
      state-machine
        how an issue transits between states
      scheduled
    rule code
      when state.changed && !state.oldValue.isResolved && state.isResolved && parent for.isNotEmpty {
        for each subtask in parent for 
          assert subtask.state.isResolved : "please resolve";
  how to create
    https://confluence.jetbrains.com/display/YTD65/How+to+create+workflows+and+rules+for+YouTrack
    uses
      notify teams, enforce policies, periodic tasks
    workflow
      rules
        stateless
        state-machine
        scheduled
  what
gitlab integration
  Admin > vcs integrations
videos
  1-YouTrack 5.0 Overview-A8sWYBe7pO8.mp4
    searches
      #Unassigned #{This wwek}
      for: me #Normal .. #Show-stopper order by: Priority
      by: me order by: summary
    navigating
      esc
      ->
        leave a quick comment
    commands
      modifying issues
        type: me
          assigned to me
        type: hadi
          assigned to hadi
      select multiple
        type: in progress
          status updated
        tag Fix Before Lunch
      apply last command
        ^!k
      stack commands
        hadi Major Bug in Progress
          applies to last selection
    creating issues
      ^n
        shows potential duplicates
      use command prompt to modify as well
    agile board
      swimlanes
        states in columns
      apply a command
  2-Creating and Editing Issues in YouTrack-GxBXL97kWJs.mp4
    linking issues:
      types of links:
        dependency, required for, relates to, parent-child, duplicates 
    cloningn issues
      cmd: clone
  3-Using Commands in YouTrack-jhSTP_M7_Ns.mp4
    modifying state
      cmd: in progress
    modifying tag
      cmd: tag xxx
    inside issue
      change visibility
        cmd: visible to Developers
      time tracking
        cmd: work today 5h scaffolding
      delete 
        cmd: delete
  4-Searching for Issues in YouTrack-fzkKcG7KIhI.mp4
    sb: denotes search bar
    sb: project: ARB type: task
    save search
      "Save Search" link
    sb: for: me #Unresolved type: Task order by: Priority created:2013-12 .. Today 
    sb: word description: word2
  5-Time Management in YouTrack-vwt_bJRII3M.mp4
    Enable Time Tracking
      Projects > edit > time tracking
    enter time
      issue > estimation
      issue > time tracking
        enter time spent
      cmd: work Development today 15m coding
    automatic time tracking
      project settings > workflow > workTimer
    issue
      opt1
        state: in progress
          starts timer
        state: fixed
          stops timer
      opt2
        timer > start
    Report 
      how much time in each step?
  01-YouTrack Overview-d7oSxVVzb2A.mp4
    search
      sb: #unresolved spent time: 1w
      sb: summary: ui
        full text search
  sb: tag: ux and tag: dpiu
    create issue
      drafts automatically saved
    view
      compact view
      tree view
      detailed view
      one line view
    dashboard
    custom fields
      custom enum types
      custom workflows
  02-Whats New in YouTrack 6.5-unqotxEofB0.mp4
    Hub and Upsource
  03-Dashboard and Reporting in YouTrack-ryuS0fdA2z0.mp4
    dashboard > add widget
    widgets
      notes
      issue list
        by search query
      report
        .select report
    example reports
      reopened vs. verified rate
      fixed vs. reported rate
      issues average age
      cumulative flow this week
        per state
      weekly time report per person
      issues assignee vs. priority
      verified issues this month
    Reporting
      issue distribution reports
        issues per assignee
        issues per project
        issues per arbitrary field
        issues per two fields
          ex
            issue assignee vs. priority
              | assignee | priority |
              | ali      | 1566     |
              | mehmet   | 305      |
        matrix report
      timeline reports
        burndown
        cumulative flow
        resolution time (sla)
          ex 1
            | date  | days |
            | 03.10 | 15   |
            | 04.10 | 17   |
          ex 2
            | date  | resolved today |
            | 03.10 | 12             |
            | 04.10 | 10             |
      time management report
        weekly time report
          ex
            | user | type | spent |
            | ali  | dev  | 10h   |
            | veli | doc  | 5h    |
      state transition
        verified distribution
        reopened issues this month
          ex  
            | status   | how many |
            | normal   | 17       |
            | critical | 10       |
  04-Agile Development with YouTrack-UgEgIDRfOpM.mp4
    backlog management
      what is backlog
        set of items that haven't been scheduled yet
    sb: project: x Fix versions: unscheduled #unresolved
    agile board
      agile boards > admin
        board comes from
          saved search
    scrum support
      which sprint a feature is associated?
        Fix versions: Sprint 2
      agile boards > per sprint
        how much is done?
        columns:
          open > in progress > to discuss > done
        moving cards modifies their states
        shows: how much time spent
      burndown chart
        3 lines
          green: spent time
          orange: estimated effort
          blue: ideal development
    kanban support
      settings > max cards in each state (wip)
    personal agile board
      two projects: crms css
    epics support
  05-Time Management in YouTrack-vwt_bJRII3M.mp4
  06-YouTrack and IDE integration-n2_3Y1jLm5U.mp4
    open tasks in ide
    show history
  07-GitHub Integration in YouTrack 6-3XfMvHdyOcU.mp4
    fix status from commit
    commit link from issue comment
  08-Creating and Editing Issues in YouTrack-GxBXL97kWJs.mp4
  10-Using Commands in YouTrack-jhSTP_M7_Ns.mp4
  13-Drag Files Anywhere in YouTrack-dBdSyzAz1w8.mp4
  03-YouTrack -- Not Just an Issue Tracker!-IQYrU6CSLIc.mp4
    travel database
    rules
      ex
        trip end cannot be before trip start
      workflow editor
        rule1
          when <issue created or updated>
            if issue.TravelType == {Dailye Expense}
              issue.Currency = {RUB}
        rule2: nice arrows
          when <>
            issue.summary = issue.summary.replace("-->", "=>")
  07-Tracking YouTrack - a Practical Guide on Searches-R1Sf6YprAE8.mp4
    sb
      for: me #Open
      sort by: tag desc
      Priority: Critical
      reported by: me
      #Today
      tag:
      updated:
      commenter:
      created:
      by: 
      issue id:
      depends on:
      links:
workflows
  Warn if assignee isn't included into the visibility group
    !Assignee.isInGroup(permittedGroup.name)
  Auto-raise priority from Normal to Major if not resolved in 7 days
    daily at 08:00:00 [issue.resolved == null && issue.Priority == {Normal} && issue.created < now - 7 days] { 
  No Comments for Verified Issues
    assert comments.added.isEmpty: l10n ( Commenting for fixed and verified issues is disabled. );
  Description template for external users
    description = l10n ( What steps will reproduce the problem? ) + "\n1.\n2.\n3.\n\n" + l10n ( What is the expected result? ) + "\n\n" + l10n ( What happens instead? ) + "\n\n" + l10n ( Please provide any additional information below. ) + "\n" + l10n ( Attach a screenshot if possible ) + "\n"
  Do not allow fix issue with unresolved dependencies
    for each dep in depends on { if (dep.isReported()) { assert dep.State.isResolved: l10n ( The issue has unresolved dependencies and thus cannot be set Fixed! ); } }
  Notify assignee about overdue issues
    daily at 10:00:00 [now > issue.Due Date] { 
     if (!isResolved()) { 
  deniedCombinations
    assert !(Priority == {Show-stopper} && State == {Submitted}): l10n ( Denied fields combination detected (Submitted Show-stopper) );
  Don't allow to submit issue without Due Date set
    Due Date.required(l10n ( You must set the Due Date! ))
  Notify assignee of dependant issue when required issue is resolved
    for each depends in is required for { 
      depends.Assignee.notify(l10n ( [Youtrack, Required issue is resolved] )


  _mine notes 
    Yeni yaptığın tüm iş atamalarını bir yandan YT'den de yap
    Save Search 
      for each people
        what did he complete today?
        what does he have to do next?
      for statuses
        #Critical
      by work type
        graphics
        analysis
        development
        translation
        management
    Enter all contract requirements
      Create a new project first
        check Wayne's notes
    Enter all your own tasks
      Enter into PM project by default
    What are existing tasks for each team member
      İmdad: Read and evaluate existing documentation
      Arif: Publish job posting
      Mehman: Complete analysis revisions
      Fatih: Prototyping workflow of BP-03 initially
      Ömer: Build domain model for EMDK organization
      Gizil: Collect documents for BP 01,02,03,12
      Gizil: Collect documents for BP 08,09,10,11
    Emaillerin üzerinden geç
      Kime ne iş çıkarmalısın?
        hepsini yt ile etiketle

# BetterTouchTool
http://www.makeuseof.com/tag/power-trackpad-user-bettertouchtool-mac/
http://blog.boastr.net/?page_id=1619#firsteps
http://www.bettertouchtool.net/drawinginstructions.html

# OmniPlan

## _java id=art_0006
  # _java <url:#r=art_0006>
set/change default java jdk version on osx
  http://stackoverflow.com/questions/21964709/how-to-set-or-change-the-default-java-jdk-version-on-os-x
  opt1
    /usr/libexec/java_home -V
      lists existing jdk 
    export JAVA_HOME=`/usr/libexec/java_home -v 1.8.0_60`
      or
        /usr/libexec/java_home -v 1.8
    java -version
    add export to shell's init file
  opt2: update alias to java
    sudo ln -nsf /Library/Java/JavaVirtualMachines/jdk1.8.0_60.jdk/Contents /System/Library/Frameworks/JavaVM.framework/Versions/CurrentJDK
    sudo ln -nsf /Library/Java/JavaVirtualMachines/jdk1.8.0_60.jdk/Contents /Users/mertnuhoglu/Library/CurrentJDK
    check symlinks
      ls -la | acm "\-\>"
error: /Users/mertnuhoglu/Library/CurrentJDK/Home//bin/java: cannot execute: No such file or directory
  cause
    JAVA_HOME is wrong
    export JAVA_HOME to correct directory

### _me

## Keyboard shortcuts

View menu
  Task View
    !#1
  Resource View
    !#2
  Calendar View
    !#3
  Network View
    !#4
  Styles View
    !#5
  Outline
    Expand All
      ^#9
    Collapse All
      ^#0
    Expand Row
      #9
      →
    Collapse Row
      #0
      ←
  Show Scheduling Influences
    !#?
  Scale to Fit Project
    !#0
  Scale to Fit Selection
    +!#0
  Go to Today
    +#T
Structure menu
  Add
    Task
      ret
    Child Task
      #}
    Aunt Task
      #{
    Milestone
      +#M
  Move
    Move Down
      ^#↓
      d
    Move Right
      ^#→
      r
    Move Up
      ^#↑
      u
    Move Left
      ^#←
      l
  Indent
    #]
  Outdent
    #[
  Group
    !#L
  Split Task
    !#S
  Connect Tasks
    Finish-Start
      ^#=
  Disconnect Tasks
    ^#-
  Clear Assignments
    !#del
  Inspectors
  Show/Hide Inspectors
    +#I
Window menu
  Minimize
    #M
  Minimize All
    !#M
  Violations
    +#V

Tutorial
  project start end date
    inspectors > project
  create milestones
    structure > add > milestone #+m
      alt
        create task > task inspector > change to milestone
  create task
    structure > add > task
      shortcut: return
    editing shortcuts
      #return: toggle editing
      +arrow: select multiple tasks
      
      
# github pages id=g_10027

  ref
    github pages <url:file:///~/Dropbox/mynotes/content/articles/articles.md#r=g_10027>

## configuring github pages

  https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/
    configuration alternatives
      master branch
      gh-pages branch
      /docs folder on master branch
      exceptions
        repo with names: <name>.github.io
          only published from master branch
    settings: publishing source
      github pages > source > .select branch: master or gh-pages branch
    publishing /docs on master branch

## logic of github pages

  https://bookdown.org/yihui/bookdown/github.html
    publishing alternatives
      tools
        jekyll
        static website builder
        website from markdown files
        static html files
      github pages settings
        master branch /docs folder
          https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/
          settings > github pages > source = master branch /docs folder
        gh-pages branch, put html output
          creating gh-pages branch
            git co --orphan gh-pages
            git rm -rf .
            touch .nojekyll
            git add .nojekyll
            git commit -m "initial"
            git push origin gh-pages
          .nojekyll tells github not to be built via jekyll (html output only)
      automating bookdown publishing on github
        opt
          travis ci
            when push to github -> travis triggered to run 
    
## _video
Video publishing process
  convert pdf into images
    convert x.pdf x-%0d.jpg
  /Users/mertnuhoglu/Music/myrecords/presentations/classification_of_data_mining_problems/

## _ffmpeg
convert-all-jpeg-images-to-mp4
  http://www.commandlinefu.com/commands/view/14881/convert-all-jpeg-images-to-mp4
  cat *.jpg | ffmpeg -f image2pipe -r 1 -vcodec mjpeg -i - -vcodec libx264 out.mp4

## _pdf
split pdf into pages
  http://superuser.com/questions/827462/how-can-i-split-a-pdf-file-into-single-pages-quickly-i-e-from-the-terminal-com
  brew install poppler
  . This will also install pdfseparate. To split the PDF document.pdf into into single pages 1.pdf, 2.pdf, etc. use:
  pdfseparate document.pdf %d.pdf
mogrify ile
  convert x.pdf x-%0d.jpg

# other

## git

### branching

branching

http://gitref.org/branching/#branch

list branches
  git branch
  * master
    master: current branch (with star)
create branch
  git branch testing
  git checkout (branch)
    swith to that branch
see last commit of each branch
  git branch -v
create branch and switch
  git checkout -b (branch)
delete branch
  git branch -d (branch)


git branch mybranch
git checkout mybranch
veya
git checkout -b mybranch

switch between branches:
git checkout master
git checkout mybranch

merge: make changes etc.
  git checkout master
  git merge mybranch
  git branch -d mybranch
  meta
    git merge = git add some branch to this branch

---


### git-done

git clone https://github.com/staltz/git-done.git
git clone https://github.com/staltz/git-done.git#v2.0.1
pip install -e .

workflow
  1. create TODO at root
  2. insert tasks
    TODO ...
  3. work on task
  3. flip TODO to DONE
    DONE ...
  4. git done

## _omnigraffle
shortcuts
  edit text of a shape    enter
  edit text of a connector arrow
    drag a label onto line
  collect your shapes in a stencil
    open stencil
    move new shapes into canvas of stencil
    switch apps
  default hot keys
    v arrow
    s shape
    c connector
    t text
    e polygon
    d directed graph
    w paint
    r 
    m magnet
    z zoom
    space hand
    b handy
  outlining
    add child       #}
    add sibling     !#'
    add aunt        #{
    add parent      !#;
    add spouse      !#/
  text
    bigger        #+
    smaller       #-
    copy style
    show fonts    #t
  canvas
    new canvas    !#n
    next canvas   #]
  search
    find          #f
    enter sel     #e
    scroll to     #j
    next          #g

_android
install adb on osx
  http://stackoverflow.com/questions/31374085/installing-adb-on-mac-os-x

# graph

## neo4j cypher

http://neo4j.com/developer/cypher-query-language/

ex
  (a) -[:likes]-> (b)
nodes
  uses ascii-art
  looks like circles:
    (node)
  ex
    MATCH (node1)-->(node2)
    RETURN node2.name, node2.quality
relationships
  (person)-[:like]->(thing)
    "person" nodes that have a relationship "like" with "thing" nodes
  ex
    MATCH (node1)-[:REL_TYPE]->(node2)
  ex
    MATCH (person)-[how:LIKE]->(thing)
    RETURN how.rating
    meta
      person's like relationship to things
      what is their rating attribute in these relationships?
labels (types)
  (person:Person)-[:LIKE]->(thing)
    distinguish Person from Company
examples
  create a record for yourself
    CREATE (you:Person {name:"You"})
    RETURN you
  create nodes with labels and properties
    MATCH (you:Person {name:"You"})
    CREATE (you)-[like:LIKE]->(neo:Database:NoSql {name:"Neo4j"})
    RETURN you,like,neo

# DDD

## DDD applied

https://lostechies.com/gabrielschenker/2015/04/28/ddd-applied/

notes
  separate: job from process
    describe everybody

# geojson

More than you ever wanted to know about GeoJSON
Geojson second bite
  http://www.macwright.org/2015/03/23/geojson-second-bite.html  
  coordinate
    representing a single dimension
    dimensions: longitude, latitude
  position
    array of coordinates in order
    = place, location on earth
    [longitude, latitude, elevation]
    why first longitude?
      x,y order in math
  geometry
    shapes
    simple geometries:
      type
      collection of coordinates
    point
      position
      {type: Point, coordinates: [0,0]}
    line
      {type: LineString, coordinates: [ [0,0], [10,10] ]}
    polygon
      can have inside outside
      can have holes in inside
      {type: Polygon, coordinates: [ [ [0,0], [10,10], [10,0], [0,0] ] ] } 
      note:
        point: one level array
        line: two levels nested array
        polygon: three levels nested array
      why three levels?
        for holes/cut-outs
      data structure
        Polygon
          LinearRing (exterior)
            Positions
          LinearRing (interior)
            Positions
          LinearRing (interior)
            Positions
      LinearRing: loop of positions
        exterior: outside edge
        interior: parts that are empty
        only one exterior ring exists, it is the first one
        first coordinate is repeated at the end
    Features
      geometry = shape
      other properties: has identity and attributes
      features = geometry + descriptive properties
      { 
        type: Feature
        geometry: { type: Point, coordinates: .. }
        properties: { name: .. }
      }
      properties should be not nested
    Multi Geometries
      MultiPolygon, MultiLineString, MultiPoint
    GeometryCollection
      set of different kinds of geometries 
        { 
          type: Feature,
          geometry: {
            type: GeometryCollection,
            geometries: [
              { type: Point, coordinates: [0,0] },
              { type: LineString, coordinates: [[..]..] }
            ]
          }
          properties: {..}
        }
    FeatureCollection
      set of features
        {
          type: FeatureCollection,
          features: [
            { type: Feature, geometry: {..}, properties: {..} }
            {..}
          ]
        }

# elastic search

## Get Started with ElasticSearch

  get_started_with_elasticsearch.mp4
  products
    open source
      kibana: visualize
      elastic search: search store
      logstash: collect, enrich data
  installing
  basic configuration
    config/elasticsearch.yml
      cluster.name: elasticsearch
        how to find a es server
      node.name: "Franz Kafka"
      bootstrap.mlockall: true
      network.host: 127.0.0.1
    startup a node
      ./bin/elasticsearch
  crud operations
    basic commands
      curl -XGET localhost:9200/_cluster/health
        execute GET
        against endpoint: cluster
        get information: health
      curl -XGET 'localhost:9200/_cluster/health?pretty'
    marble
      monitoring and dashboard tool
      install
        ./bin/plugin -i elasticsearch/marvel/latest
      open
        http://localhost:9200/_plugin/marvel/
      console
        http://localhost:9200/_plugin/marvel/sense/
        GET /_cluster/health?pretty
    logic
      json: documents
      put into index
        index = database
        multiple indices possible
      every doc put into an index
    ex01
      code 
        PUT /library/books/1
        {
          "title": "hello doc",
          "name" : {
            "first": "mert"
          }
        }
        GET /library/books/1
      expl
        library: index
        books: type
        1: id
        a json doc
      interaction
        meta data first
        then _source = real data
    id
      not all data has natural id
        ex: log lines
      it is optional
      code
        PUT /library/books/
        {
          "title": "intro to elastic",
          "name" : {
            "first": "ozgur"
          }
        }
      elastic returns an id
    update a doc
      overwrites existing doc
      code
        PUT /library/books/1
        {
          "title": "this is cool",
          "name" : {
            "first": "mert"
          }
        }
        GET /library/books/1
      for partial updates: use Update API
        code
          POST /library/books/1/_update
          {
            "doc": {
              "title": "adı bende saklı"
            }
          }
          GET /library/books/1
        note differences:
          "doc" 
          POST
          _update
    delete a doc
      code
        DELETE /library/books/1
      can delete entire index
        DELETE /library
    bulk commands
      adding multiple docs in a single time
      code
        POST /library/books/_bulk
        { "index": { "_id": 2 }}
        { "title": "quick fox", "price": 5 }
        { "index": { "_id": 3 }}
        { "title": "lazy fox", "price": 15 }
      each json should be single line
        no pretty print here
    search
      basic
        find all documents
      code
        GET /library/books/_search
      output
        _score
          how results are sorted
  query and search syntax
    match query
      code - single field single word
        GET /library/books/_search
        { 
          "query": {
            "match": {
              "title": "fox"
            }
          }
        }
      code - single field multiple words
        GET /library/books/_search
        { 
          "query": {
            "match": {
              "title": "lazy fox"
            }
          }
        }
      more terms matching -> more relevant
      code - single field match complete phrase
        GET /library/books/_search
        { 
          "query": {
            "match_phrase": {
              "title": "lazy fox"
            }
          }
        }
      code - boolean combinations
        "query": {
          "bool": {
            "must": [ {"match": {"title": ".."} } ]
            "must_not":
            "should"
          }
        }
      boosting
        this query is more important
        "must": [ {"match": {"title": {
            "query": "..",
            "boost": 0.5
          }
        } } ]
      highlighting
        grab match in emphasis tags
        code
          "query": ..
          "highlight": {
            "fields": {
              "title": {}
      filtering
        inclusion and exclusion
        ignores scoring completely
        for structured search
        faster than query
        code
          query
            filtered
              query
                match
                  FIELD: TEXT
              filter
                range
                  FIELD
                    gte: 10
                    lte: 20
        can combine filter and query
  mappings
  aggregations
          
## Elastic Search Guide - Data in Data out

  https://www.elastic.co/guide/en/elasticsearch/guide/current/data-in-data-out.html
  what is
    distributed document store
    in real time
      as soon as doc stored
      it can be retrieved
    query
      difference from other nosql
        no need 
          how to query
          which fields require an index
      every field is indexed by default
        that is: every field has dedicated inverted index
        it can use all inverted indices in the same query
  document metadata
    ex
      _index
        where doc lives
      _type
        class of object
        
## Logstash: 0-60 in 60

  logstash.mp4
  what is
    event processing engine
  problems with logs
    no consistent format
      date formats
      logs in different ways
      difficult to search
      needs to be expert in format
    date format
      142920788
        number of seconds since 1.1.1970
      oct 11 20:21:47
        year?
      [29/Apr/2011:07:05:20 +0000]
      020805 13:51:24
      @400049c239a932
        exactly when did it occur
    decentralized logs
      spread all over
      iot
      different kinds of logs
      grep isn't scalable
    expert knowledge required
      no access
      don't understand
      don't know where they are
  solution: logstash
    logstash pipeline
      input -> filter -> output
      multiple inputs per logstash instance
    inputs
      network (tcp/udp) + file: most common
      syslog/rsyslog
      kafka, rabbitmq, redis: in large cluster
        when there are too many clients
      stdin: backfilling data, testing
      twitter
      email
      lumberjack: secure protocol
      amazon s3, varnish...
    filters
      grok: extract data using pattern matching
      date: parse timestamps
      mutate: rename, remove, replace fields
      csv: parse
      geoip: from database MaxMind
      kv: key-value pairs in event data
      ruby: any ruby code
    outputs
      storage: index in elastic, mongo, s3, file...
      notification: nagios, email, pagerduty...
      relay: tcp, kafka, redis, syslog
        logstash is not final
        let other clients to read using queue, socket
      metrics: graphite...
        visualize them
    configuration language
      sample event data
        {
          type: web
          agent: ..
          ip: ..
          request: /index.html
          response: ..
        }
      reference to field:
        [request]
      value:
        /index.html
      nested event field
        ex:
          ua: { os: win7 }
        reference:
          [ua][os]
      sprintf format
        output {
          statsd {
            increment => "apache.%{[response][status]}"
      conditional
        if { .. else {..
      ex config
        output {
          if [type] == "web" and [request] == "/" {
            if [response][status] =~ /^5\d\d/ { 
              nagios {..}
            else ...
              elasticsearch {..}
  elastic search
    json doc 
    on top of lucene
    schema free
    distributed + scaled
    multi-tenant data
      single instance serves multiple customers
      each customer is called a tenant
    api centric + restful
    aggregations
      powerful analytics
    easy deployment
  kibana
    dashboard
  data
    twitter data
      2015-10-07_19-05-09.png
      code
        input {
          twitter {
            consumer_key => ..
            keywords => ["logstash", "elasticsearch"]
        filter {}
        output {
          stdout { codec => dots }
          elasticsearch {
            protocol => http
            host => localhost
            index => tweets

## Getting started with Logstash

  https://www.elastic.co/guide/en/logstash/current/getting-started-with-logstash.html
  basic
    bin/logstash -e 'input { stdin {} } output { stdout{} }'
  setup pipeline
    -f <file>
    input -> filter -> output
    ex01: first-pipeline.conf
      input {
        file {
          path => "/path/to/groksample.log"
          start_position => beginning
        }
      }
      note
        logstash starts inputs after changing log file
    file input plugin
      similar to "tail -f"
      "beginning" starts from 0
    grok filter plugin
      first-pipeline.conf
        filter {
            grok {
                match => { "message" => "%{COMBINEDAPACHELOG}"}
            }
        }   
        output {
            elasticsearch {
                protocol => "http"
            }
        }
      run
        logstash -f first-pipeline.conf --configtest
          test
        logstash -f first-pipeline.conf 
      test
        curl -XGET 'localhost:9200/logstash-$DATE/_search?q=response=401'
          replace DATE with YYYY.MM.DD
          curl -XGET 'localhost:9200/logstash-2015.10.08/_search?q=response=401'
    twitter app
      Consumer Key (API Key) 1UKVhmzQ0stWkZVLSU3ekzet9
      Consumer Secret (API Secret) KjPqIevC6fsV6MPy2YdFTnOpLk72sJdKtUmXAFGbOZlMShduBc
      Access Token 7967612-1DIjTr9bWY98JuvsHvUvReSP5QZPPbSSrPPUXD0AW6
      Access Token Secret vxc2NoHfRpggQKgULXvVesb2iaXD5vztOBiawc82OJDBC
    logstash forwarder plugin
      code
        network { .. }
        files { paths : [..] }
      collects logs from files
      forwards to logstash instance
      uses lumberjack protocol
        secure, low latency
    writing logstasth data to file
      file { path => .. }
  Working with plugins
    intro
      avaliable as gems
      listing
        bin/plugin list
      installing
        bin/plugin install logstash-output-kafka
        bin/plugin install logstash-output-csv
        bin/plugin uninstall logstash-output-csv
      building gem
        gem build logstash-codec-evam.gemspec
      local plugin gem
        bin/plugin install /path/to/logstash-output-kafka.gem
        bin/plugin install /Users/mertnuhoglu/projects/ruby/logstash_plugins/logstash-codec-evam/logstash-codec-evam-2.0.1.gem
      local plugin source code
        bin/logstash --pluginpath /Users/mertnuhoglu/projects/ruby/logstash_plugins/logstash-codec-evam/lib/logstash/codecs/evam.rb
    processing pipeline
      inputs
        file
        syslog
        redis
        lumberjack = logstash-forwarder
      filters
        grok
          parse arbitrary text
          120 patterns builtin
        mutate
        drop
          rename, modify fields
        drop
          drop an event
        clone
          copy an event
        geoip
      outputs
        elasticsearch
        file
        graphite
          for metrics
        statsd
          listens for statistics 
      codecs
        what is
          filters that are part of input or output
          separate 
            transport of messages
            from serialization
        json
          encode/decode as json
        multiline
          merge multi line text
        plain
          text
    fault tolerance
      using internal queues
        Ruby SizedQueue
    thread model
      current model
        input threads | filter worker tthreads | output worker
      thread per each input
        => no blocking between inputs
  contributing to logstash
    writing input plugin
      a ruby gem
      lives in github repo
      code
        encoding
        require
        inline documentation
          asciidoc [source, ruby]
        class
    writing codec plugin
      decode method
        data coming in from an input transformed into an event
        must have yield statement
  codecs
    multiline codecs
      https://www.elastic.co/guide/en/logstash/current/plugins-codecs-multiline.html
      ex: java stack traces
        codec => multiline {
          pattern => "^\s"
          what => "previous"
        }     
      ex: lines not starting with a date up to previous line
        codec => multiline {
          # Grok pattern names are valid! :)
          pattern => "^%{TIMESTAMP_ISO8601} "
          negate => true
          what => previous
        }
      ex: c line continuations
        filter {
          multiline {
            type => "somefiletype"
            pattern => "\\$"
            what => "next"
          }
        }
      ex: elastic
        conf
          elasticsearch {
            protocol => "http"
            host => localhost
            index => apachelogs
          }
        elastic search
          GET /apachelogs/_search
          GET /apachelogs/logs/_search
    cloudfront
      https://www.elastic.co/guide/en/logstash/current/plugins-codecs-cloudfront.html
    using codec plugins
      https://www.elastic.co/guide/en/logstash/current/_how_to_write_a_logstash_codec_plugin.html
      bin/logstash -e 'input { stdin{ codec => example{}} } output {stdout { codec => rubydebug }}'
_refcard _me

## logstash plugin code review

### content

  public
  def register
    require "msgpack"
    @decoder = MessagePack::Unpacker.new
    # messagepack gem almış
  end

  public
  def decode(data)
    @decoder.feed(data)
    @decoder.each do |tag, epochtime, map|
      event = LogStash::Event.new(map.merge(
        LogStash::Event::TIMESTAMP => LogStash::Timestamp.at(epochtime),
        "tags" => tag
      ))
      yield event
    end
  end # def decode

# ruby

## Ruby in Twenty Minutes

  https://www.ruby-lang.org/en/documentation/quickstart/2/
  functions
    basic syntax
      def h
        puts "hello"
      end
      def h(name)
        puts "hello #{name}"
      end
      class Greeter
        def initialize(name = "world")
          @name = name
        end
        def hi
          puts "hi #{@name}"
        end
      end
      g = Greeter.new("Pat")
      g.hi
      g.@name
      Greeter.instance_methods
      g.respond_to?("hi")
      class ..
        attr_accessor :name
      g.name
      if @names.nil?
      elsif
      @names.each do |name|
        puts "hello #{name}"
      end
    main script
      if __FILE__ == $0
        ..
    running
      ruby file.rb
    syntax
      @names.join(",")
  longer
    main
      def f
      puts "ola"
      end
      if __FILE__ == $0
      puts "hello"
      f
      end

## tutsplus: Testing with Rspec

  http://code.tutsplus.com/tutorials/ruby-for-newbies-testing-with-rspec--net-21297
  install
    gem install rspec

## Calling Java from JRuby

  https://github.com/jruby/jruby/wiki/CallingJavaFromJRuby
  code
    require 'java'

### 101 Rx Samples

http://rxwiki.wikidot.com/

### Intro To Rx

http://www.introtorx.com/

#### asyncronous background operations

start 
  o = Observable.start(() => ..)
  o.first()
combineLatest
  o = Observable.combineLatest(
    Observable.start( () => {..},
    Observable.start( () => {..},
    ..
  ).finally

### Intro To Rx, Lee Campbell



# Unclassified

    init.d id=g_10119
      init.d <url:file:///~/Dropbox/mynotes/content/articles/articles_code.md#r=g_10119>
      What is the difference between /etc/init/ and /etc/init.d/?
      Get To Know Linux: The /etc/init.d Directory
        init.d directory
          contains start/stop scripts
          for several services
        /etc directory
          several directories are in the form rc#.d
          within each there are scripts that control processes
            either begin with K or S
            K scripts run before S
          sometimes you need to start/stop rocesses
            /etc/init.d directory comes in handy
        /etc/init.d/command OPTION
          ex: OPTION
            start, stop, restart
            /etc/init.d/networking stop
          ex: scripts:
            samba, apache2, mysql
    nginx
      reverse proxy id=g_10117
        reverse proxy <url:file:///~/Dropbox/mynotes/content/articles/articles_code.md#r=g_10117>
        ref
          deployment of java apps <url:file:///~/Dropbox/mynotes/content/articles/articles_java.md#r=g_10118>
        nginx reverse proxy
          https://www.nginx.com/resources/admin-guide/reverse-proxy/
          passing a request to proxied server
            proxy_pass directive inside location
              code
                location /some/path {
                  proxy_pass http://example.com/link;
                }
                # request to /some/path URI will be proxied to example.com/link
              code
                location ~ \.php {
                  proxy_pass http://127.0.0.1:8080;
              eşleşmenin ardındaki kısım aynen iletilir
        Automating Nginx Reverse Proxy Configuration
          https://dzone.com/articles/automating-nginx-reverse-proxy
          ex
            http://api.example.com/product/pinstripe_suit
            It gets routed to:
            http://10.0.1.101:8001/product/pinstripe_suit
            But when you go to:
            http://api.example.com/customer/103474783
            It gets routed to
            http://10.0.1.104:8003/customer/103474783
          configuration 
            code
              http {
                include       /etc/nginx/mime.types;
                default_type  application/octet-stream;
                log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent" "$http_x_forwarded_for"';
                access_log  /var/log/nginx/access.log  main;
                sendfile        on;
                keepalive_timeout  65;
                include /etc/nginx/conf.d/*.conf;
              }
              # include *.conf
                take any conf file and add it here
            code
              server {
                listen          80;
                server_name     api.example.com;
                include         /etc/nginx/conf.d/api.example.com.conf.d/location.*.conf;
                location / {
                    root    /usr/share/nginx/api.example.com;
                    index   index.html index.htm;
                }
              }
              # listen port 80
              # for any requests to host: api.example.com
        HowTo: Use Nginx As Reverse Proxy Server
          https://www.cyberciti.biz/tips/using-nginx-as-reverse-proxy.html
          edit default conf
            vi /etc/nginx/conf.d/default.conf
          code - default.conf
            ## Apache (vm02) backend for www.example.com ##
            upstream apachephp  {
                  server 192.168.1.11:80; #Apache1
            }
            ## Lighttpd (vm01) backend for static.example.com ##
            upstream lighttpd  {
                  server 192.168.1.10:80; #Lighttpd1
            }
            ## Start www.example.com ##
            server {
                listen       202.54.1.1:80;
                server_name  www.example.com;
                access_log  /var/log/nginx/log/www.example.access.log  main;
                error_log  /var/log/nginx/log/www.example.error.log;
                root   /usr/share/nginx/html;
                index  index.html index.htm;
                ## send request back to apache1 ##
                location / {
                 proxy_pass  http://apachephp;
                 proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
                 proxy_redirect off;
                 proxy_buffering off;
                 proxy_set_header        Host            $host;
                 proxy_set_header        X-Real-IP       $remote_addr;
                 proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
               }
            }
          note: proxy_pass  http://apachephp; -> upstream apachephp -> server 192.168.1.11:80
          turn on nginx
            chkconfig nginx on
            service nginx start
        The Benefits of a Reverse Proxy
          http://mikehadlow.blogspot.com.tr/2013/05/the-benefits-of-reverse-proxy.html
          normal way:
            application server is directly visible to public
            costs
              hard to scale, performance, complex
              hard for distributed architecture with multiple http endpoints
          reverse proxy
            a server component that sits between 
              internet and your web servers
            accepts http requests and forwards them to servers
          benefits
            load balancing, security, authentication, ssl, static content, caching, compression, central logging, url rewriting, multiple websites in same subdomain
    AWS re -Invent 2015 _ (DVO209) JAWS - The Monstrously Scalable Serverless Framework-D_U6luQ6I90.mp4
    GOTO 2016 • The Future of Software Engineering • Mary Poppendieck-6K4ljFZWgW8.mp4
      scale up vs scale out
        up: one big computer
        out: multiple small computers
      manage hardware/network resources by software
      scale out: dependency problem
      federated architecture
        future is over here
        learn how to do se (software engineering) not with databases but with apis
      apis as architecture
        good interfaces
        good directories
        good standards to make changes slowly
        version control
        localized changes
        apis lower integration problems
      apis as products
      resilience engineering
        fragile -> robust -> anti-fragile
        stop thinking as database being the integrator
        think about apis how to connect things
        think about stateless
          we kill processes 
        stop thinking about synchronous communication
          event driven programming
        forget defect free
          think on when failure happens, how resilient we can be
      Three ways out: 
        book: Continous Delivery
        book: Devops Handbook
        1. flow
        2. full stack feedback (customer included)
          product manager is wrong half the time
          don't trust his opinions
          don't outsource design
            2/3 of specs are not necessary
        3. experimentation in learning
        we know for sure
          for complex systems 
            this does not work
              when you smash it, you don't know how it responds
            what works
              small containers
    GOTO 2016 • You Can Use CSS For That! • Rachel Andrew-TNhR6ol9mBc.mp4
      flexbox
        for vertical alignment
      grid layout 
      shapes
        text around shapes
      feature queries
        is this feature supported, then use it
      initial letters
      writing modes
        direction of text: vertical, left to right
      custom properties
        variables in css
      basic mathematics
        calc()
        calc(50% - 20px)
      scroll snapping
    GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler-STKCRSUsyP0.mp4
      1. event notification
        reversing dependencies with event notification
          ex
            1. user changes address in customer management system
            2. customer management sends "requote" message to insurance quoting system
            problem: dependency to insurance system
          ex: with event
            1. user changes address in customer management system
            2. customer management emits "address changed" event to a message queue
            3. insurance quoting system listens to "address changed" evnet
          this is how gui works
          additional benefit:
            it encapsulates everything into an event record
        events or commands
          way of communication changes
            "requote insurance for the customer"
              like a command 
            "customer address change"
              i am not indicating what to do next
          hard problem: naming things
            how do i want to describe how the system works
            event: i don't care what happens after this
            command: i particularly want this action to happen after this
        events: allow multiple systems to hook into
          new systems just tap into the event system
          benefit: 
            decouple receiver from sender
          cost:
            what happens next is not easy to learn
              @mine: staltz'ın bahsettiği mesele:
                passive: 
                  easy: who is affected by this event (change address)
                  hard: how requoting works
                reactive:
                  easy: how requoting works
                  hard: who is affected by this event
              true in gui case:
                trace in debugger how various events fly
                  to understand how the overall system works
      2. event carried state transfer
        in event notification, all you emit is event
          quoting system talks back to customer management to get more information
          additional traffic after every event
          how to reduce this traffic?
            /Users/mertnuhoglu/Dropbox/public/img/ss-175.png
            event-carried state transfer
              pass all needed customer information to quoting system after every event 
        benefit
          decoupling
          reduced load on supplier
        cost
          replicated data 
            consistency problems 
      3. event sourcing
        ex
          [John:Person] -> [:Address|city:Portland]
          how to change my address?
            1. create Event
              [:Event|address_changed]
            2. process Event
              [John:Person] -> [:Address|city:Oregon]
        we have an Application State and Log
          any time we can delete all Application State and rebuild it from Log
        typical example: 
          version control git
          accounting ledger
          reduce(accumulator, event) function
      4. cqrs: command query responsibility segregation
        what is it
          separate write and read components/models
          /Users/mertnuhoglu/Dropbox/public/img/ss-177.png
        hard to implement and error-prone
          use only when you need it
    GOTO 2016 • Building an App Using JS_TypeScript, Node, Electron & 100 OSS Components • Erich Gamma-uLrnQtAq5Ec.mp4
    GOTO 2016 • Deep Stupidity - What Neural Networks Can & Cannot Do • John Mark Bishop-1oTe6eUWrpU.mp4
    James Kyle - From Zero To Binary Search Tree - JSConf.Asia 2016-bM5Wfmh9i5k.mp4
      @thejameskyle
      data structure, farklı amaçlar için farklı performanslar sergiler
        /Users/mertnuhoglu/Dropbox/public/img/ss-194.png
    tmux: elinks for documentation lookup 
      Increased developer productivity with Tmux Part 6 - Elinks-ga9aupmU1dI.mp4
    placekitten.com/640/480
      placeholder images
    debug-js egghead
      03-egghead-tools-unbundle-your-javascript-with-source-maps-in-chrome-devtools.mp4
        webpack sourcemap
          bundle.js yerine aynı kaynak kodlarında debug edebilmeni sağlar
      04-egghead-tools-use-snippets-to-store-behaviors-in-chrome-devtools.mp4
        chrome > sources > snippets 
          simulateClick()
          kullanıcı test ediyormuş gibi
          /Users/mertnuhoglu/Dropbox/public/img/ss-195.png
      05-egghead-tools-set-breakpoints-for-the-chrome-debugger.mp4
        different breakpoint types:
          xhr
            any xhr
              herhangi bir xhr çağrıldığında durur
            break when url contains "name"
          event listener
            click
              herhangi bir clicklemede durur
          dom üzerinde:
            elements > break on > subtree modifications
              dom değiştiğinde durur
              /Users/mertnuhoglu/Dropbox/public/img/ss-197.png
          kodun içinden tetikleme
            `debugger` yaz kodun içine
            koşul koyabilirsin bunun için
          breakpoint > sağ > edit
            koşul yazabilirsin
            /Users/mertnuhoglu/Dropbox/public/img/ss-196.png
    OrientDB - the 2nd generation of (MultiModel) NoSQL - Luigi Dell'Aquila- JOTB16-ul1vMJV_F8w.mp4
      nosql veritabanları ilişkileri tutmaktan kaçınır
      what is wrong with join
        her seferinde tekrar hesaplanır
        bu yüzden boyut büyüdükçe performans düşer
          O(Log N)
        çözüm: graph database
      what is graph database
        G = (V, E)
          graph
          vertex
          edge
        1-n and n-m relations
          multiple edges
            [a] visited-> [b]
            [a] worked-> [b]
        edges and vertices have properties
      how does a graph db manage relationships?
        all edges + vertices have immutable id (physical pointer)
      graphdb: creates relationship once
      rdbsm: computes relationship every time you query
      2nd generation nosql is multi-model
        key/value + graph + document + relational
      orientdb: multi-model natively
        graph ex:
          select expand(out("Friend")) from Person where name = 'Luigi'
        ex: no join
          select from Person
          where address.street like 'Foo%' 
          and address.city.country.name = 'UK'
          /Users/mertnuhoglu/Dropbox/public/img/ss-198.png
    Reactive Design Patterns - Roland Kuhn - JOTB16-3IjP9jxEfJQ.mp4
    A Brief Introduction to WebSockets and Socket.io by Saleh Hamadeh-xj58VHRzG_g.mp4
      websockets: push based
    GOTO 2017 • Teaching Children about Clean Code • Felienne Hermans-SQo-Q_L1xTk.mp4
    Data Analysis in Julia with Data Frames (John Myles White)-XRClA5YLiIc.mp4
      ex: with within
        within!(iris, :(Petal_Area = Petal_Length .* Petal_Width))
      ex: subset
        subset(iris, :(Species .== "setosa"))
      ex: merge
        merge(df1, df2, "a")
        merge(df1, df2, "a", "left")
        /Users/mertnuhoglu/Dropbox/public/img/ss-199.png
      split-apply-combine
        /Users/mertnuhoglu/Dropbox/public/img/ss-200.png
        movies = data("ggplot2", "movies")
        by(movies, "year", nrow)
        by(movies, ["Action", "year"], nrow)
    Metaprogramming and Macros in Julia (Stefan Karpinski)-EpNeNCGmyZE.mp4
      ex
        function func_foo(n::Int)
          for i=1:n
            println("foo")
            # ccall(:foo, RetType, (ArgType1, ArgType2), arg1, arg2)
          end
        end
        function func_baz(n::Int)
          for i=1:n
            println("baz")
            # ccall(:baz, RetType, (ArgType1, ArgType2), arg1, arg2)
          end
        end
        --> 
        for sym in {:foo, :baz}
          @eval function ${symybol(string("func_", sym)))(n::Int)
            println($(string(sym)))
          end
        end
    DesmosLIVE: Inequalities: 
      https://www.youtube.com/watch?v=azO7Kkv4Vdo
      ex: Linear Optimization
        constraints
          we have 180 $ 
          each x costs 15
          each y costs 5
          we want at least 3y and 8 x
          each y gains 40
          each x gains 60
          /Users/mertnuhoglu/Dropbox/public/img/ss-221.png
      ex: animating sun's movement
        /Users/mertnuhoglu/Dropbox/public/img/ss-222.png
        (x-a)^2+(y-b)^2 ≤ 1
    2D Motion with Desmos
      https://www.youtube.com/watch?v=V1aZe2hI_-U
      ex: animation
        1. add image
          center: (c, f(c))
        f(x) = 1
        c = slider
        /Users/mertnuhoglu/Dropbox/public/img/ss-223.png
    Sinusoidal Regressions Using Desmos
      https://www.youtube.com/watch?v=b75PEalga4c
      1. enter points on table
      2. write regression function
        y_1 ~ a sin(b (x_1 - c)) + d
      /Users/mertnuhoglu/Dropbox/public/img/ss-224.png
    3blue1brown
      Ever wonder how Bitcoin (and other cryptocurrencies) actually work?
        Ledger
          Alice pays Bob 20
          Bob pays Charlie 40
        Protocol
          Anyone can add lines to ledger
          Settle up at the end of month
        Problem: Anyone can add lines?
          How to trust these data? Is it real or false?
          Solution: digital signatures (cryptography)
            Alice (payer) should add something that proves that she approved the transaction
            And anyone else cannot forge this signature
        How to prevent forgeries?
          everyone generates a public key - private key pair
          ex: pk: 0100 sk: 1000 
            private key = secret key
          secret key is not shared with anyone
          in real world: signatures are always the same
          in virtual: digital signatures are different everytime you sign something
          altering the message even slightly
            makes totally different digital signature
          formally:
            sign is a function
            sign(message, sk) = signature
          since it depends on message, no one can copy your signature and forge it
          a second function exists to verify the signature is valid
            it approves that the signature is produced by the private key of the public key
            verify(message, signature, pk)
              it should be infeasible to find a signature if you don't know sk
              no strategy better than random checking
      How secure is 256 bit security?
      How does JWT work
        https://www.youtube.com/watch?v=K6pwjJ5h0Gg
        there is client and server
        client wants to get info from server
        server needs to know whether this client is trustworthy
        steps
          1. client: curl -u user http://../login
          2. server generates a token (jwt)
          3. server returns token to client
          4. client: curl -H "Authorization: Bearer <token>" http://.../secure
          5. server verifies jwt signature
      Introduction to JSON Web Tokens
        https://jwt.io/introduction/
        /Users/mertnuhoglu/Dropbox/public/img/ss-226.png
        benefits
          makes data API stateless since user state is not stored in server
            CORS not an issue since there is no cookie

## next

  https://github.com/ramda/ramda/wiki/Cookbook





      

