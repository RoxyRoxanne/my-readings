
## code: araçlar 01

··  {{c1::slack-term}}: slack cli <br>
··  {{c2::jsonlint}}: json linter <br>
··  {{c3::mermaid}}: text to diagram generation  <br>

%

%

clozeq

---

## code: kitap kaynaklar 01

··  {{c1::brilliant.org}}: matematiksel bulmacalar <br>
··  {{c2::3b1b}}: matematik videoları <br>
··  {{c3::mathaloger}}: matematik videoları <br>

%

%

clozeq

---

## code: web araçlar 01

··  https://{{c1::limitless-atoll}}-85321.herokuapp.com/: youtube to pocketcast <br>

%

%

clozeq

---

## code: pretty print json tools 01

··  {{c1::jq}} <br>
··  {{c2::underscore}} <br>
··  node -p "JSON.{{c3::stringify}}(JSON.parse(path), null, 2);" <br>
··  python -m {{c4::json.tool}} <br>

%

%

clozeq

---

## code: js/html cheatsheets

··  {{c1::html-css-js}}.com <br>
··  {{c2::oscarotero}}.com/jquery/ <br>

%

%

clozeq

---

## Rmd: how to embed js in Rmd?

{{c1::&lt;script&gt; tag}}

{{c2::\`\`\`{js} block}}

%

%

clozeq

---

## vim: vim-db database client

··  :DB {{c1::postgresql}}:///&lt;dbname&gt; &lt;sql&gt; <br>
··  DB postgresql:///{{c2::app}} select * from data.client <br>
····  sql query  <br>
··  DB postgresql:///&lt;dbname&gt; &lt; {{c3::&lt;sql—file&gt;}} <br>
····  import external sql file <br>
··  DB {{c4::g:prod}} = postgresql://superuser:superuserpass@localhost/app <br>
····  DB g:prod {{c5::select * from data.client}} <br>
····  # global variable: g:prod <br>

%

%

clozeq

---

## docker: basic commands

··  docker {{c1::pull}} &lt;image&gt;:&lt;tag&gt; <br>
····  pull latest image <br>
··  docker {{c2::stop}} &lt;container&gt; <br>
····  stop running container <br>
··  docker {{c3::rm}} my-application   <br>
····  remove stopped container <br>
··  docker {{c4::rmi}} &lt;image&gt;:&lt;tag&gt; <br>
····  remove image behind stopped container <br>
··  docker {{c5::tag}} &lt;image&gt;:latest &lt;user&gt;/&lt;image&gt;:&lt;tag&gt; <br>
····  tag newly downloaded image <br>
··  docker {{c6::run}} -d {{c7::--name}} my-application &lt;image&gt;:latest &lt;user&gt;/&lt;image&gt;:&lt;tag&gt; <br>
····  run new container <br>
··  docker {{c8::images}} <br>
····  list images <br>
··  docker {{c9::ps}} <br>
····  list running containers <br>
··  docker ps {{c10::-a}} <br>
····  list all containers <br>

%

%

clozeq

---

## docker: list dangling (untagged images) volumes 

··  docker images {{c1::-f}} "{{c2::dangling}}=true" <br>
····  full information <br>
··  docker images {{c1::-f}} "{{c2::dangling}}=true" {{c3::-q}} <br>
····  only container ids <br>

remove all of them:

··  docker rmi {{c4::$(}}docker images -f "dangling=true" -q --no-trunc) <br>

purging (removing) all unused images, containers etc.

··  docker system {{c5::prune}} <br>

%

%

clozeq

---

## py: local http server

··  python3 -m {{c1::http.server}} <br>

%

%

clozeq

---

## vim: prettify indent 

··  gg{{c1::=}}G <br>

%

%

clozeq

---

## rg: cli options

··  `` {{c1::-L}} --follow symbolic links symlinks `` <br>
··  `` {{c2::-S}} --smart-case `` <br>
··  `` -s --case-sensitive `` <br>
··  `` -l --files-with-matches `` <br>
··  `` -i --ignore-case `` <br>
··  `` rg <keyword> {{c3::**/*.md}} `` <br>
····  `` search recursively in md files `` <br>


%

%

clozeq

---

## github repos

··  `` {{c1::csvtotable}} `` <br>
····  `` https://github.com/vividvilla/csvtotable `` <br>
····  `` cli to convert CSV files to searchable and sortable HTML table `` <br>
··  `` {{c2::learnxinyminutes-docs}} `` <br>
····  `` https://github.com/adambard/learnxinyminutes-docs `` <br>
····  `` learn programming languages with examples in actual code `` <br>
····  `` ex `` <br>
······  `` // ... or using the dot syntax, provided the key is a valid identifier. `` <br>
······  `` myObj.myKey; // = "myValue" `` <br>
··  `` {{c3::asciinema}} `` <br>
····  `` screencasting tool for terminal `` <br>
··  `` {{c4::vimagit}} `` <br>
····  `` https://github.com/jreybert/vimagit `` <br>
····  `` vim git client, very useful `` <br>
····  `` ex `` <br>
······  `` S: stage block `` <br>
······  `` CC: commit block `` <br>
··  `` toddmotto/{{c5::public-apis}} `` <br>
····  `` https://github.com/toddmotto/public-apis `` <br>
····  `` collective list of public JSON APIs for use in web development `` <br>
··  `` audreyr/cookiecutter `` <br>
····  `` https://github.com/audreyr/cookiecutter `` <br>
····  `` A command-line utility that creates projects from cookiecutters (project templates),  `` <br>
····  `` e.g. creating a Python package project from a Python package project template. `` <br>


%

%

clozeq

---

## bash: $(..) and `..`

{{c1::command substitution}}: classic form:

··  `` cd "`pwd`" `` <br>

better: $(..)

··  `` output=$(sed -n /"$1"/p $file) `` <br>


%

%

clozeq

---

## vim: keybinding to run current script with node

··  `` nmap üb :{{c1::!node}} {{c2::%<cr>}} `` <br>

%

%

clozeq

---

## bash: pipe output to pbcopy and to stdout

··  `` echo 'hello' | {{c2::tee}} {{c1::>(pbcopy)}} `` <br>
··  `` > hello `` <br>

%

%

clozeq

---

## code: araçlar 02

··  `` {{c1::blessed}}: terminal interface for nodejs `` <br>


%

%

clozeq

---

## 04-egghead-misc-chrome-devtools-elements-console-integration.mp4 01

current element in inspector:

··  `` {{c1::$0}} `` <br>

previous element:

··  `` {{c1::$1 $2 ...}} `` <br>

%

%

clozeq

---

## 04-egghead-misc-chrome-devtools-elements-console-integration.mp4 02

find an element like jquery:

··  `` {{c1::$}}('span') // finds one element `` <br>
··  `` {{c2::$$}}('span') // finds all elements `` <br>
··  `` {{c3::$x}}('html/body/div') // find by path `` <br>
··  `` {{c4::inspect}}($('span')) // select in inspector `` <br>

%

%

clozeq

---

## 04-egghead-misc-chrome-devtools-elements-console-integration.mp4 03

monitor events on web page
··  ``  `` <br>
··  `` {{c1::monitorEvent}}($('h1'), 'click') `` <br>

dom breakpoint

··  `` inspector > .select element > {{c2::Break on}} ... > Subtree Modifications `` <br>


%

%

clozeq

---

## chrome devtools 01

display console as drawer

··  `` {{c1::Esc}} `` <br>
··  `` menu > Show Console `` <br>

%

%

clozeq

---

## html to hyperscript tool

··  `` http://{{c1::html-to-hyperscript}}.paqmind.com/ `` <br>

··  `` https://github.com/ivan-kleshnin/html-to-hyperscript `` <br>

%

%

clozeq

---

## vim: insert string into text

opt1: use expression register "=

		{{c1::"=}}strftime('%c')&lt;C-M&gt;p

opt2: use :put command

		{{c2::put =}}a:refid

%

%

clozeq

---

## vim: infoman RefX 01

{{c1::RefWord}}

··  `` " put cursor on this word_x `` <br>
··  `` " -> `` <br>
··  `` " <url:/Users/mertnuhoglu/.vim/bundle/vim-infoman/plugin/vim-infoman.vim#word_x `` <br>

%

%

clozeq

---

## vim: infoman RefX 02

{{c1::RefLine}}

··  `` " some text `` <br>
··  `` " -> `` <br>
··  `` " <url:/Users/mertnuhoglu/.vim/bundle/vim-infoman/plugin/vim-infoman.vim#tn=some text `` <br>

%

%

clozeq

---

## vim: infoman RefX 03

{{c1::RefId}}

··  `` " CopyRefId id=g_00009 `` <br>
··  `` " --> `` <br>
··  `` " ~/.vim/bundle/vim-infoman/plugin/vim-infoman.vim#r=g_00009 `` <br>

%

%

clozeq

---

## vim: infoman RefX 04

{{c1::RefLineId}}

··  `` " wifi connection issues id=g_10099 `` <br>
··  `` " > `` <br>
··  `` " wifi connection issues ~/Dropbox/mynotes/code/cosx/cosx.md#r=g_10099 `` <br>

%

%

clozeq

---

## vim: infoman RefX 01

··  `` {{c1::RefWord}} `` <br>
··  `` {{c2::RefLine}} `` <br>
··  `` {{c3::RefId}} `` <br>
··  `` {{c4::RefLineId}} `` <br>

%

%

clozeq

---

