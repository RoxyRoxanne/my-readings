
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

