    <url:file:///~/Dropbox (Personal)/mynotes/content/articles/articles_db.md>

_ id=r_lastid adb_004

# Articles DB

## PostgreSQL

    PostgreSQL Basics by Example
      http://blog.trackets.com/2013/08/19/postgresql-basics-by-example.html
      psql
        \h                 # help on SQL commands
        \?                 # help on psql commands, such as \? and \h
        \l                 # list databases
        \c database_name   # connect to a database
        \d                 # list of tables
        \d table_name      # schema of a given table
        \du                # list roles
        \e                 # edit in $EDITOR
      user management
        allow login
          CREATE ROLE john WITH LOGIN
          ALTER ROLE john LOGIN
        multiple attributes
          postgres=# CREATE ROLE deploy SUPERUSER LOGIN;
          postgres=# ALTER ROLE deploy NOSUPERUSER CREATEDB;  # the LOGIN privilege is not touched here
        add role to some group
          postgres=# CREATE GROUP admin LOGIN;
          postgres=# GRANT admin TO john;
    pgScript for Geocoding
      http://www.postgresonline.com/journal/archives/181-pgAdmin-pgScript.html
      plpgsql function
      for adhoc batch jobs
      compared to stored procedures
        not a single transaction
          you run something in a loop
          each loop commit separately
      ex: geocodes 500 records at a time, repeats 20000 times
        code
          DECLARE @I;
          SET @I = 0;
          WHILE @I < 20000
          BEGIN
            UPDATE addr_to_geocode
            SET (rating, norm_address, pt)
            = (
              g.rating,
              COALESCE ((g.addy).address::text, '')
                || COALESCE(' ' || (g.addy).predirabbrev, '')
                || COALESCE(' ' || (g.addy).streetname,'')
                || ' ' || COALESCE(' ' || (g.addy).streettypeabbrev, '')
                || COALESCE(' ' || (g.addy).location || ', ', '')
                || COALESCE(' ' || (g.addy).stateabbrev, '')
                || COALESCE(' ' || (g.addy).zip, '')
              ,
              g.geomout
            )
                FROM (SELECT DISTINCT ON (addid) addid, (g1.geo).*
                FROM (SELECT addid, (geocode(address)) As geo
                FROM (SELECT * FROM addr_to_geocode WHERE ag.rating IS NULL ORDER BY addid LIMIT 500) As ag
            ) As g1
            -- 5 pick lowest rating
            ORDER BY addid, rating) As g
            WHERE g.addid = addr_to_geocode.addid;
            SET @I = @I + 1;
            PRINT @I;
          END
    string_agg
      ex
        http://www.postgresonline.com/journal/archives/191-stringagg.html
        SELECT p.p_name, 
        STRING_AGG(a.activity, ';' ORDER BY a.activity) As activities
    FROM people AS p 
        LEFT JOIN people_activities As a ON (p.p_name = a.p_name)
        GROUP BY p.p_name
        ORDER BY p.p_name; 
    postgrest
      Postgrest Manual id=g_10158
        Postgrest Manual <url:file:///~/Dropbox/mynotes/content/articles/articles_db.md#r=g_10158>
        https://postgrest.com/en/v4.3/intro.html
        Introduction
          Motivation
            turns db into REST API
              constraints and permissions in db determine API endpoints and operations
            alternative to CRUD programming
              solves logic duplication problem:
                business logic duplicates, ignores db structure
              orm is leaky abstraction and slow
            single declarative source of truth: data itself
          Declarative Programming
            easier to ask psql
              to join data
              to loop through rows
              to manage permissions
              to set constraints
          Leak-proof Abstraction
            no ORM
            creating new views happens in SQL
            db admin can create API
          Embracing the Relational Model
            1970 Codd: criticized hierachical model of db
              similarity bw hierarchical db and nested http routes
            prest: uses flexible filtering and embedding rather than nested routes
          One Thing Well
          Shared Improvements
          Ecosystem
            postgrestR
              https://github.com/clesiemo3/postgrestR
        Tutorials
          Tutorial 0: Get it Running id=g_10154
            ref
              ~/projects/study/pg/postgrest01/
              Tutorial postgrest <url:file:///~/projects/study/study_js.md#r=g_10154>
            intro
              pgr turns db into API
              endpoints and permissions come from db objects (tables, views ...)
            run postgresql
              sudo docker run --name tutorial -p 5432:5432 \
                -e POSTGRES_PASSWORD=mysecretpassword \
                -d postgres
              volume to persist (optional)
                docker volume create --name=tutorialdb
                sudo docker run --name tutorial -p 5432:5432 \
                  -e POSTGRES_PASSWORD=mysecretpassword \
                  -v tutorialdb:/var/lib/postgresql/data \
                  -d postgres
            install postgrest
              wget https://github.com/begriffs/postgrest/releases/download/v0.4.3.0/postgrest-v0.4.3.0-osx.tar.xz
              tar xfJ postgrest.tar.xz
              mv postgrest /usr/local/bin
              postgrest
            create database for api
              docker exec -it tutorial psql -U postgres
              psql commands
                CREATE SCHEMA api;
                CREATE TABLE api.todos (
                  id SERIAL PRIMARY KEY,
                  done BOOLEAN NOT NULL DEFAULT FALSE,
                  task TEXT NOT NULL,
                  due TIMESTAMPTZ
                );
                INSERT INTO api.todos (task) VALUES
                  ('finish tutorial 0'), ('pat self on back');
              create role for web requests
                CREATE ROLE web_anon NOLOGIN;
                GRANT web_anon TO postgres;
                GRANT usage ON SCHEMA api TO web_anon;
                GRANT select ON api.todos TO web_anon;
              web_anon can access 
                api SCHEMA
                api.todos TABLE
            run postgrest
              create file: tutorial.conf
                db-uri = "postgres://postgres:mysecretpassword@localhost/postgres"
                db-schema = "api"
                db-anon-role = "web_anon"
              cd ~/projects/study/pg/postgrest01/
              postgrest tutorial.conf
                ❯ postgrest tutorial.conf
                Listening on port 3000
              test
                curl http://localhost:3000/todos
                [{"id":1,"done":false,"task":"finish tutorial 0","due":null},{"id":2,"done":false,"task":"pat self on back","due":null}]
              but we cannot add new record
                curl http://localhost:3000/todos -X POST \
                  -H "Content-Type: application/json" \
                  -d '{"task": "do bad thing"}'
          Tutorial 1: The Golden Key
            step 1: add a trusted user
              previously: web_anon role
                executes anonymous web requests
              new role: todo_user for authenticated users
                psql
                  CREATE ROLE todo_user NOLOGIN;
                  GRANT todo_user TO postgres;
                  GRANT USAGE ON SCHEMA api TO todo_user;
                  GRANT ALL ON api.todos TO todo_user;
                  GRANT USAGE, SELECT ON SEQUENCE api.todos_id_seq TO todo_user;
            step 2: make a secret
              create a secret password
                openssl rand -base64 32
              error: {"message":"JWSError JWSInvalidSignature"}
                use openssl to create secret password for jwt
              touch tutorial1.conf. add:
                jwt-secret = "<secret>"
                jwt-secret = "T8k0JBUifFC6UevcbjpJi1Jc7mJfCVg3eEfoQi7IpuI"
              run pgr
                postgrest tutorial1.conf
            step 3: sign a token
              go to jwt.io and make a token
                payload:
                  { "role": "todo_user" }
                jwt:
                  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidG9kb191c2VyIn0.nZ1wYdWinlOGkzh_FE6CP0cJo4W8IWETc6LVtnEO2P0
                note: token is signed but not encrypted. it is easy to see inside
            step 4: make a request
              http header will contain authentication token
              ex
                export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidG9kb191c2VyIn0.IF9PKgLZ_XA70Uz5vm0OxrqYTCQdXxBA0Oz4uK8lBqM"
                curl http://localhost:3000/todos -X POST \
                  -H "Authorization: Bearer $TOKEN"   \
                  -H "Content-Type: application/json" \
                  -d '{"task": "learn how to auth"}'
            step 5: add expiration
              currently jwt token is valid endlessly
              expiration timestamp: use "exp" claim
                postgrest treats two jtw claims specially:
                  role: database role
                  exp: expiration timestamp in "unix epoch time"
                    number of seconds since 1970.01.01
              find epoch value of five minutes from now. in psql:
                SELECT extract(epoch from now() + '5 minutes'::interval) :: integer;
                  1505825517
                payload of jwt
                  "exp": <epoch>
                token
                  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidG9kb191c2VyIiwiZXhwIjoxNTA1ODI1NTE3fQ.Tf-tihwQzyrFK40Gqn_YKTlyDjxTP_b5rvxZh805bKw
                  export NEW_TOKEN=".."
                request
                  curl http://localhost:3000/todos \
                    -H "Authorization: Bearer $NEW_TOKEN"
            bonus: immediate revocation
              payload:
                "email": "disgruntled@mycompany.com"
              token
                eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidG9kb191c2VyIiwiZW1haWwiOiJkaXNncnVudGxlZEBteWNvbXBhbnkuY29tIn0.4t6agb-sv1PCG0zWehWFkhnDPpy77mkgqCXDsOGnkcQ
                export WAYWARD_TOKEN=".."
              psql: stored procedure
                CREATE SCHEMA auth;
                GRANT USAGE ON SCHEMA auth TO web_anon, todo_user;
                CREATE OR REPLACE FUNCTION auth.check_token() RETURNS void
                  LANGUAGE PLPGSQL
                  AS $$
                BEGIN
                  IF current_setting('request.jwt.claim.email', true) =
                     'disgruntled@mycompany.com' THEN
                    raise insufficient_privilege
                      using hint = 'Nope, we are on to you';
                  END IF;
                END
                $$;
              touch tutorial2.conf: add
                pre-request = "auth.check_token"
              postgrest tutorial2.conf
              request
                # this request still works
                curl http://localhost:3000/todos \
                     -H "Authorization: Bearer $TOKEN"
                # this one is rejected
                curl http://localhost:3000/todos \
                     -H "Authorization: Bearer $WAYWARD_TOKEN"
        Installation
          Docker
            docker-compose.yml
              # docker-compose.yml
              server:
                image: postgrest/postgrest
                ports:
                  - "3000:3000"
                links:
                  - db:db
                environment:
                  PGRST_DB_URI: postgres://app_user:password@db:5432/app_db
                  PGRST_DB_SCHEMA: public
                  PGRST_DB_ANON_ROLE: app_user
              db:
                image: postgres
                ports:
                  - "5432:5432"
                environment:
                  POSTGRES_DB: app_db
                  POSTGRES_USER: app_user
                  POSTGRES_PASSWORD: password
        Administration
          Hardening PostgREST
            proxy requests to PostgREST server
              nginx.conf
                http {
                  ...
                  # upstream
                  upstream postgrest {
                    server localhost:3000;
                    keepalive 64; 
                  }
                  ...
                  server {
                    ...
                    # expose to outside
                    location /api/ {
                      default_type application_json;
                      proxy_hide_header Content-Location;
                      add_header Content-Location /api/$upstream_http_content_location;
                      ...
                    }
                    ..
            Block Full-Table Operations
              prevent accidental DELETE
                DELETE /logs
              use: pg-safeupdate extension from PGXN network
                sudo -E pgxn install safeupdate
                # add to postgresql.conf:
                  shared_preload_libraries='safeupdate';
              use RLS (row level security)
                ref
                  5.7. Row Security Policies <url:#r=adb_002>
            Count-Header DoS
            HTTPS
            Rate Limiting
          Debugging
            Server Version
              "Server" http response header
            HTTP Requests
              full information about client requests and SQL commands
                # watch network
                sudo ngrep -d lo0 port 3000
            Database Logs
              postgresql.conf
                where is it
                  show data_directory; 
                log_destination = "stderr"
                log_directory = "pg_log"
                log_statement = "all"
            Schema Reloading
          Alternate URL Structure
            singular or plural object response
        API
          Tables and Views
            intro
              ex
                GET /people HTTP/1.1
              no nested routes
                such as: /films/1/director
                instead: resource embedding
                  handles 1-n and n-n relationships
              verbs: OPTIONS, GET, POST, PATCH, DELETE
            horizontal filtering (rows)
              people aged under 13
                GET /people?age=lt.13
              multiple parameters
                GET /people?age=gte.18&student=is.true
              complex logic
                GET /people?and=(grade.gte.90,student.is.true,or(age.gte.14,age.is.null))
              operators
                eq gt gte lt lte neq 
                like iilike 
                  use * in place of %
                in 
                  ?a=in.1,2,3
                  ?a=in."hi there","yes"
                is
                  null, true, false
                fts
                  full text search
                  @@
                cs
                  contains
                  ?tags=cs.{example, new}
                  @>
                cd
                  contained in
                  ?values=cd.{1,2,3}
                  <@
                ov
                  overlap
                  ?period=ov.[2017-01-01,2017-06-30]
                  &&
                sl
                  strictly left of
                  ?range=sl.(1,10)
                  <<
                sr
                nxr
                  does not extend to the right
                  ?range=nxr.(1,10)
                  &<
                nxl
                adj
                  is adjacent to
                  ?range=adj.(1,10)
                  -|-
                not
                  negates another operator
                  ?a=not.eq.2
                  ?not.and=(a.get.0,a.lte.100)
                for more complicated filters
                  create a new view or stored procedure
                  ex
                    CREATE VIEW fresh_stories AS
                    SELECT *
                      FROM stories
                     WHERE pinned = true
                        OR published > now() - interval '1 day'
                    ORDER BY pinned DESC, published DESC;
                    -->
                    GET /fresh_stories HTTP/1.1
            vertical filtering (columns)
              GET /people?select=fname,age
              computed columns
                computed columns are not in output by default
                  to include them
                    GET /people?select=*,full_name
                ex
                  CREATE TABLE people (
                    fname text,
                    lname text
                  );
                  CREATE FUNCTION full_name(people) RETURNS text AS $$
                    SELECT $1.fname || ' ' || $1.lname;
                  $$ LANGUAGE SQL;
                  -- (optional) add an index to speed up anticipated query
                  CREATE INDEX people_full_name_idx ON people
                    USING GIN (to_tsvector('english', full_name(people)));
                  -->
                  GET /people?full_name=fts.Beckett
            ordering
              GET /people?order=age.desc,height.asc
              GET /people?order=age
            limits and pagination
              postgrest uses http range headers
              ex: response
                HTTP/1.1 200 OK
                Range-Unit: items
                Content-Range: 0-14/*
              opt1: specify range in request:
                ex: request
                  GET /people HTTP/1.1
                  Range-Unit: items
                  Range: 0-19
                ex: response
                  HTTP/1.1 200 OK
                  Range-Unit: items
                  Content-Range: 0-14/*
                no limit:
                  Range: 10-
              opt2: specify with query params:
                ex
                  GET /people?limit=15&offset=30
                useful for embedded resources
              get total count
                ex: request header
                  Prefer: count=exact
                ex: response header
                  Content-Range: 0-24/434902
            response format
              same API endpoint can respond in different formats
              use: "Accept"
              ex
                GET /people
                Accept: application/json
              possibilities
                */*
                text/csv 
                application/json
                application/openapi+json
                application/octet-stream
            singular or plural
              by default returns json in an array
                /items?id=eq.1
                returns:
                  [
                    {"id":1}
                  ]
              to return first result as an object without array:
                /items?id=eq.1
                Accept: application/nd.pgrst.object+json
                returns:
                  {"id":1}
            binary output
              ex
                GET /items?select=bin_data&id=eq.1
                Accept: application/octet-stream
          unicode
            use percent encoding
            ex
              http://localhost:3000/%D9%85...
          resource embedding
            allows related sources to be included in single api call
            server uses fk to determine which tables are returned
            ex:
              Actors 1-n Roles n-1 Films n-1 Directors
              Films 1-n Nominations n-1 Competitions
            ex: titles of all fimls
              /films?select=title
            ex: include directors names
              /films?select=title,directors(id,last_name)
              returns:
                [
                  { "title": "..",
                    "directors": {
                      "id": 2,
                      "last_name": ".."
                    }
                  },
                  ...
                ]
            must specify: pk of related (embedded) table
            ex: table name alias
              /films?select=title,director:directors(id,last_name)
            ex: films of all directors
              /directors?select=films(title,year)
            embedded filters and order
              ex: order actors in each film
                GET /films?select=*,actors(*)&actors.order=last_name,first_name
          stored procedures
            accessible under /rpc
              POST /rpc/function_name
            named arguments: supplied as json
              ex:
                CREATE FUNCTION add_them(a integer, b integer)
                ...
                -->
                POST /rpc/add_them
                {"a":1, "b":2}
            accessing request headers/cookies
              ex:
                request.header.XYZ
                SELECT current_setting('request.header.origin', true);
            raising errors
          insertions/updates
            ex
              POST /table_name 
              {"col1": "value", "col2": "value"}
            response: includes Location header
              to find the new object
            note: when inserting, you must post a not quoted JSON
              {"col1": "value"}
              note: no single quotes '{}' around
                '{"col1": "value"}'
            update: PATCH
              PATCH /people?age=lt.13
              {"category": "child"}
            prevent full table updates:
              Block full table operations
            bulk insert
              provide json array or csv
                csv is much faster
              post with: Content-Type: text/csv
              ex: csv
                POST /people
                Content-Type: text/csv
                name,age
                J Doe,62 
                Jonas,10
              empty field: ,,
                coerced to empty string
              NULL is mapped to sql null
              ex: json
                POST /people
                Content-Type: application/json
                [
                  {"name":"J Doe", "age":62},
                  ..
                ]
          deletions
            DELETE /user?active=is.false
          openapi support
            use: Swagger UI
          http error codes
        Authentication
          Overview of role System
            intro
              authenticate: verify that a user is who he says he is
              authorize: user has permissions to do db operations
            Authentication Sequence
              three types of roles
                authenticator
                  switches to actual user roles
                anonymous
                user
              db admin creates them
              ex
                jwt:
                  {"role": "user123"}
                switch to db role:
                  SET LOCAL Role user123;
                note: db admin must allow authenticator role to switch into this user
                  GRANT user123 TO authenticator;
            Users and Groups
              concept of roles:
                either: user, group of users
              roles for each web user
                role is available to SQL through: current_user variable
            Custom Validation
      postgrest starter kit  id=adb_003
        postgrest starter kit  <url:#r=adb_003>
        official wiki
          https://github.com/subzerocloud/postgrest-starter-kit/wiki
          intro
            postgrest is a solid candidate for production
            features
              items
                docker environment
                standard directory structure
                debugging and live code
                authentication
                unit tests
                reverse proxy configuration
                  to add custom logic at any step of http request
                CI scripts
              any production project needs these
              but this is not to learn postgrest and how it works
          Architecture and Project Structure
            why multiple languages
              look at frontend:
                css, html, sass, js, npm, webpack, rest, graphql etc.
            use nginx as integration point
              use it for routing requests based on runtime logic
            use postgresql
              for more than dumb data store
              complicated data questions: as view, procedure
              rules for who can access data
            use rabbitmq
              email: trigger on signup
            define your API do not write them
          Project Structure
            docker-compose.yml
            .env
            openresty: reverse proxy and lua code
              lualib/user_code: application lua code
              nginx/
                conf
                html
              tests
                rest: rest interface tests
                common.js: helper functions
              Dockerfile
              entrypointsh: custom entrypoint
            postgrest
              tests: bash based integration tests
            db: 
              src: schema definition
                data: definition of source tables
                api: api entities
                libs:
                authorization: roles and privileges
                sample_data
                init.sql: entry point
              tests: pgTap tests
          HTTP Request Flow
            /Users/mertnuhoglu/Dropbox/public/img/ss-225.png
            OpenResty
              OpenResty = nginx + lua
              routes requests
              you can alter shape of request
            PostgREST
            PostgreSQL
            RabbitMQ
              lua hooks: run code synchronously
              rabbit: run code async
                ex: email, log event, live updates
              from db, you can generate an event
                then route it to consumers (clients)
                then do live updates
          PostgREST Crash Course
            get one item
              curl http://localhost:8080rest/items/1
            get a filtered list
              curl http://localhost:8080rest/items?id=gt.1
            specify columns
              curl http://localhost:8080rest/items?id=gt.1&select=id,name
            embed related entities
              curl http://localhost:8080rest/items?id=gt.1&select=id,name,subitems(id,name)
            apply filters to embedded items
              curl http://localhost:8080rest/items?id=gt.1&select=id,name,subitems(id,name)&subitems.name=like.%subitem%
            insert one item and return its id
              curl -s -X POST \
              -H 'Prefer: return=representation' \
              -d '{"name":"New Item"}'  \
              http://localhost:8080/rest/items?select=id
            update: PATCH
            delete: DELETE
          PostgreSQL Concepts
            this tool will let you become proficient in postgresql
              we tricked you into being a DBA
              90% of the work will be in db
            Tables
            Constraints
            Triggers
              server programming
            Roles, Grants, and Row Level Security
              application users defined as database users
              ref
                Application users vs. Row Level Security <url:#r=adb_004>
            Views
            Stored Procedures
          Authentication Authorization Flow
            Json Web Tokens JWT
          Iterative Development Workflow
            Overview
              big problem: logic moves from a file (stored in git) to environment (database)
              subzero-cli solves this problem
              also does this for nginx config as well
            Install
            Workflow
              step01
                docker-compose -d up db postgrest openresty
                subzero dashboard
              step02
                curl http://localhost:8080/rest/todos?select=id 09:26:01odo
              step03: change todos view
                #before
                select id, todo, private, (owner_id = request.user_id()) as mine from data.todo;
                #after
                select ('#' || id::text) as id, ('do this: ' || todo) as todo, private, (owner_id = request.user_id()) as mine from data.todo;
          Production Infrastructure
            Overview
            Familiarize yourself with ECS concepts
            Install AWS CLI
            ECS Cluster
              save cluster name
                export CULSTER_NAME=mycluster
              get cluster's cloudformation stack name
                aws cloudformation list-stacks --output table --query 'StackSummaries[*].[StackName,TemplateDescription]'
              save stack name to env
                export STACK_NAME=EC2ContainerService-mycluster
              extract stack configuration info
              save cluster region in env
                export AWS_REGION=`echo $Cluster_Param_VpcAvailabilityZones | cut -d',' -f1 | head --bytes -2`
                echo $AWS_REGION
            SSL Certificate
              # create a certificate in AWS Certificate Manager
              aws acm list-certificates
              # save arn
              export CERTIFICATE_ARN="arn:aws:acm:us-east-1:CHANGE-WITH-YOURS:certificate/CHANGE-WITH-YOURS"
            Loadbalancer
            Image Repository
              store docker image in EC2 Container Registry
            Database (RDS)
          Tutorial postgrest 
            ref
              ~/codes/pg/example-api/
            Overview
              What We Are Building
                app: todo app for project management
                tables: users, clients, projects, tasks, comments
                production ready app
                  a few hours of work
                  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoid2VidXNlciJ9.vAN3uJSleb2Yj8RVPRsb1UBkokqmKlfl6lJ2bg3JfFg
            Beyond Data Access
              Overview
                we are used to a specific design of backend:
                  dumb webserver and dumb database
                  we assume: single place for logic = simple design
                    this is not true
                this tool: holistic approach
                  leverage all features of underlying components
                think of these components
                  not as separate processes
                  but as modules in your code
              Reacting to database events 
                how it works
                  whenever an event occurs
                  you send a message to Message queue (events table)
                    insert a row
                  another system (a script) reads rows
                    performs additional tasks
      official repo
        https://github.com/begriffs/postgrest
        intro
          Using PostgREST is an alternative to manual CRUD programming. Custom API servers suffer problems. Writing business logic often duplicates, ignores or hobbles database structure. Object-relational mapping is a leaky abstraction leading to slow imperative code. 
          The PostgREST philosophy establishes a single declarative source of truth: the data itself.
      HN: PostgREST – A fully RESTful API from any existing PostgreSQL database 
        https://news.ycombinator.com/item?id=13959156
        q: how to write complex queries
          to define richer endpoints you create views in the database and stored procedures. It can follow foreign key and m2m through a select url param
          select=id,foreignkey(name)
        q: big picture
          not PostgREST alone that accomplishes this "big claim" of eliminating the need for custom APIs. 
          It's the combination of using openresty(nginx)/postgrest/postgres/rabbitmq together that gives you the possibility of "defining" apis rather then "manually coding" apis.
        q: how to do CRUD with a little extra
          ex: "create this object and kick off a Stripe payment"
          trigger external actions by psql pubsub
            https://postgrest.com/en/v0.4/intro.html#external-notification
        q: Odd choice to push JSON serialization onto the DB while touting horizontal scaling
          ans: this is the only way to extract tree like data from db
            very small burden on db
              still 99% never outgrow a single db
            traversing trees in postgres: "WITH RECURSIVE"
              starting from this point in the tree, recursively return all of its children
            protocol can onyl represent 2D array
        q: comparison to ORM
          shifts the work of writing a basic CRUD API (a task for which you would probably use an ORM) to declaring a SQL schema
    Application users vs. Row Level Security id=adb_004
      Application users vs. Row Level Security <url:#r=adb_004>
      https://blog.2ndquadrant.com/application-users-vs-row-level-security/
      Introduction to RLS
        chat table
          CREATE TABLE chat (
              message_uuid    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              message_time    TIMESTAMP NOT NULL DEFAULT now(),
              message_from    NAME      NOT NULL DEFAULT current_user,
              message_to      NAME      NOT NULL,
              message_subject VARCHAR(64) NOT NULL,
              message_body    TEXT
          );
        problem: 
          prevent users from 
            reading messages intended for other users
            sending messages with a fake message_from
        ex:
          CREATE POLCIY chat_policy ON chat
            USING ((message_to = current_user) OR (message_from = current_user))
            WITH CHECK (message_from = current_user)
      Application Users
        all examples use current_user
          but most database applications don't maintain 1:1 mapping to database users
          how to use RLS with application users?
        Session variables
          goal: pass additional context to database session
          ex
            SET my.username = 'tomas'
          my: new namespace
          useranem: a variable in the namespace
          ex: RLS
            CREATE POLCIY chat_policy ON chat
              USING (current_setting('my.username') IN (message_from, message_to))
              WITH CHECK (message_from = current_setting('my.username'))
          problem: what if  the user can set arbitrary username due to SQL injection
        Signed session variables
          goal: verify that the value was not subverted
          ex: trusted part (application) does:
            signature = sha256(username + timestamp + SECRET)
            # store both value and signature in session variable
            SET my.username = 'username:timestamp:signature'
            # the user cannot modify the value without invalidating the signature
          to protect SECRET value 
            store it in a table inaccessible by the user
            providing a security definer function
            requiring a password
            ex:
              CREATE FUNCTION set_username(uname TEXT, pwd TEXT) RETURNS text AS $$
              DECLARE 
                v_key TEXT;
                v_value TEXT;
              BEGIN
                SELECT sign_key INTO v_key FROM secrets;
                ...
    Auditing Users and Roles in PostgreSQL
      https://blog.2ndquadrant.com/auditing-users-and-roles-in-postgresql/
      security reviews (audits)
        most issues: roles and privileges
      Owner is a small superuser
        initial checks:
          role should not 
            be a superuser
            have excessive privileges (ex: CREATEDB, CREATEROLE)
            own database objects (tables, functions, ...)
              since owners can grant arbitrary privileges
      Role inheritance
        split application into multiple parts
          into schemas
          each module uses a separate set of roles
        ex
          CREATE ROLE module_users;  -- user info
          CREATE ROLE module_users_ro;
          CREATE ROLE module_posts;  -- blog posts
          CREATE ROLE module_posts_ro;
          CREATE USER admin_user IN ROLE module_users, module_posts;
          CREATE USER web_user IN ROLE module_users_ro, module_posts_ro;
        roles used as groups

## PostgreSQL 9.6.5 Manual id=g_10156

    PostgreSQL 9.6.5 Manual <url:file:///~/Dropbox/mynotes/content/articles/articles_db.md#r=g_10156>
      4.2 Value Expressions
        ex: new column values in INSERT/UPDATE
        also called: 
          scalar
          scalar expressions
            to distinguish from table expression = table
          expressions
        value expression is one:
          literal value
          column reference
          positional parameter reference
          subscripted expression
          field selection expression
          operator invocation
          function call
          aggregate expression
          window function call
          type cast
          collation expression
          scalar subquery
          array constructor
          row constructor
          another value expression in parantheses
        column references
          correlation.columnname
          correlation: name of table
        positional parameters
          $number
          ex
            CREATE FUNCTION dept(text) RETURNS dept AS $$ SELECT * FROM dept WHERE name = $1 $$ LANGUAGE SQL;
            $1
        subscripts
          expression[subscript]
          if expression yields array, access specific element by this
          array slice:
            expression[lower:upper]
          ex
            mytable.arraycolumn[4]
            mytable.two_d_column[17][334]
              multidimensional array
            $1[10:42]
            (arrayfunction(a,b))[42]
        field selection
          expression.fieldname
          ex
            mytable.mycolumn
            $1.somecolumn
            (rowfunction(a,b)).col3
            (compositecol).somefield
              parantheses around compositecol: this is a column name not a table name
            (mytable.compositecol).somefield
          all fields of a composite:
            (compositecol).*
        operator invocations
          3 syntaxes:
            expression operator expression
              binary infix
            operator expression
              unary prefix
            expression operator
              unary postfix
          operators
            AND, OR, NOT
            OPERATOR(schema.operatorname)
        function calls
          function_name([expression [, expression ...]])
          ex
            sqrt(2)
          single argument of composite type:
            col(table)
            table.col
        aggregate expressions
          application of a function across the rows selected by a query
          reduces multiple values to a single value
          syntax
            aggregate_name(expression [, ...] [order_by_clause]) [ FILTER ( WHERE filter_clause ) ]
          ex
            SELECT array_agg(a ORDER BY b DESC) FROM table
            SELECT string_agg(a, ',' ORDER BY a) FROM table
          ex
            SELECT count(*) AS unfiltered, count(*) FILTER (WHERE i < 5) AS filtered FROM generate_series(1,10) AS s(i); 
            unfiltered | filtered 
            10 | 4
        window function calls
        type casts
      Chapter 5. Data Definition
        5.7. Row Security Policies id=adb_002
          5.7. Row Security Policies <url:#r=adb_002>
          row level security per user basis:
            which rows can be returned by
              queries, inserts, updates, deletes
          enabled on a table:
            ALTER TABLE ... ENABLE ROW LEVEL SECURITY
          ex: only "managers" role can access rows and only rows of their accounts:
            CREATE TABLE accounts (manager text, company text);
            ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
            CREATE POLICY account_managers ON accounts TO managers
              USING (manager = current_user);
          ex: allaw all users to access their own row:
            CREATE POLICY user_policy ON users
              USING (user_name = current_user);
          ex: allow all users to view all rows, but only modify their own:
            CREATE POLICY user_policy ON users
              USING (true)
              WITH CHECK (user_name = current_user);
          ex:
            -- table: [passwd|user_name, shell]
            -- roles: admin, bob, alice
            -- Be sure to enable row level security on the table
            ALTER TABLE passwd ENABLE ROW LEVEL SECURITY;
            -- Create policies
            -- Administrator can see all rows and add any rows
            CREATE POLICY admin_all ON passwd TO admin USING (true) WITH CHECK (true);
            -- Normal users can view all rows
            CREATE POLICY all_view ON passwd FOR SELECT USING (true);
            -- Normal users can update their own records, but
            -- limit which shells a normal user is allowed to set
            CREATE POLICY user_mod ON passwd FOR UPDATE
              USING (current_user = user_name)
              WITH CHECK (
                current_user = user_name AND
                shell IN ('/bin/bash','/bin/sh','/bin/dash','/bin/zsh','/bin/tcsh')
              );
            -- Allow admin all normal rights
            GRANT SELECT, INSERT, UPDATE, DELETE ON passwd TO admin;
            -- Users only get select access on public columns
            GRANT SELECT
              (user_name, uid, gid, real_name, home_phone, extra_info, home_dir, shell)
              ON passwd TO public;
            -- Allow users to update certain columns
            GRANT UPDATE
              (pwhash, real_name, home_phone, extra_info, shell)
              ON passwd TO public;
          test it: 
            ex: psql
              set role admin;
              table passwd;
              set role alice;
              table passwd;
              # ERROR
              select user_name from passwd;
              update passwd set user_name = 'joe';
              # ERROR
              update passwd set real_name = 'Alice doe';
      Chapter 9. Functions and Operators
        intro
          list all functions \df
          list all operators \do
        9.1. Logical Operators
          common: AND OR NOT
        9.2. Comparison Operators
          common
            < > <= >= = 
            <> != not equal
          BETWEEN
            a BETWEEN x and y
            a <= x AND a <= y
          NOT BETWEEN
            a NOT BETWEEN x AND y
            a < x OR a > y
          if either input is null
            operators yield null
            ow: use IS [NOT] DISTINCT FROM
              equivalent to <>
              but if null it returns false
          IS NULL
            <expression> IS [NOT] NULL
          IS
            TRUE
            FALSE
            UNKNOWN
            NOT
        9.3. Mathematical Functions and Operators
          + - * /
          % modulo
          ^ exponentiation
          |/ square root
          ||/ cube root
          ! factorial
            5 !
          !!  factorial (prefix)
            !! 5
          @ absolute value
            @ -5.0
          & bitwise AND
            | OR
            # XOR
            ~ NOT
            91 & 15 -> 11
          << bitwise shift left
          abs(x)
          cbrt(dp)  cube root
          ceil(dp)
          ceiling(dp)
          degrees(dp)   radians to degrees
          div(y,x)    integer quotient
          exp(dp)
          floor()
          ln()
          log()   base 10
          log(b, x)
          mod(y x)
          pi()
          power(a,b)
          round(a,b)
          random()
          setseed(dp)
          trigonometric functions
        9.4. String Functions and Operators
          || concatenation
            'post' || 'gresql'
          char_length(string)
          lower(string)
          overlay(..)
          substring(string, int, int)
          trim()
          upper()
          other
            ascii(string)
            chr(int)
            concat(a,b)
            format('help %s", 'me')
            left('abcde', 2)
            length(string)
            lpad('hi', 5, '#')
            ltrim
            md5
            pg_client_encoding()
            quote_ident('foo bar')
            regexp_matches()
            regexp_replace()
            regexp_split_to_array()
            regexp_split_to_table()
            repeat(text, int)
            replace()
            reverse()
            right()
            rpad()
            split_part()
            strpos()
            substr()
            to_ascii()
        9.5. Binary String Functions and Operators
        9.6. Bit String Functions and Operators
        9.7. Pattern Matching
          LIKE
            'abc' LIKE 'a%'
            'abc' LIKE '_b_'
            ILIKE: case insensitive
            ~~ equivalent LIKE
              !~~
            ~~* equivalent ILIKE
              !~~*
          SIMILAR TO
            uses regex
              | * + ? {m} {m,} () [..] 
              note: . is not a metacharacter
            'abc' SIMILAR TO '%(b|c)%'
          POSIX regex
            operators
              ~ matches
              ~* matches case insensitive
              !~
              !~*
            ex
              'thomas' ~ '.*thomas.*'
            ex: substring
              substring('foobar' from 'o.b')
              regexp_replace('foobar', 'b(..)', E'X\\1Y', 'ig')
        9.8. Data Type Formatting Functions
          functions
            to_char(timestamp, text)
              to_char(current_timestamp, 'HH12:MI:SS')
            to_date(text, text)
              to_date('05 Dec 2000', 'DD Mon YYYY')
            to_number(text, text)
            to_timestamp(text, text)
          template patterns
            HH
            HH24
            MI
            SS
            ..
        9.9. Date/Time Functions and Operators
          operators
            +
              + date '2001-09-28' + integer '7' date '2001-10-05'
              + date '2001-09-28' + interval '1 hour' timestamp '2001-09-28 01:00:00'
          date/time functions
            age(timestamp, timestamp)
            current_date()
            current_time()
            date_part(text, timestamp)
              date_part('hour', timestamp '2011-02-16 20:38:40')
            now()
            OVERLAPS
              (start1, end1) OVERLAPS (start2, end2)
                SELECT (DATE '2001-02-16', DATE '2001-12-21') OVERLAPS
                       (DATE '2001-10-30', DATE '2002-10-30');
                Result: true
            EXTRACT
              EXTRACT(field FROM source)
                SELECT EXTRACT(DAY FROM TIMESTAMP '2001-02-16 20:38:40');
                Result: 16
          date_trunc
            SELECT date_trunc('hour', TIMESTAMP '2001-02-16 20:38:40');
            Result: 2001-02-16 20:00:00
          AT TIME ZONE
            SELECT TIMESTAMP '2001-02-16 20:38:40' AT TIME ZONE 'MST';
            Result: 2001-02-16 19:38:40-08
          Current Date/Time
            CURRENT_DATE
            CURRENT_TIME
            CURRENT_TIMESTAMP
            CURRENT_TIME(precision)
            CURRENT_TIMESTAMP(precision)
            LOCALTIME
            LOCALTIMESTAMP
            LOCALTIME(precision)
            LOCALTIMESTAMP(precision)
            ex
              SELECT CURRENT_TIMESTAMP;
              Result: 2001-12-23 14:39:53.662522-05
            ex
              SELECT CURRENT_TIMESTAMP;
              SELECT now();
          Delaying Execution
            SELECT pg_sleep(1.5);
        9.10. Enum Support Functions
          ex
            CREATE TYPE rainbow AS ENUM ('red', 'orange', 'yellow', 'green', 'blue', 'purple');
          support functions
            enum_first(null::rainbow) # red
            enum_range(null::rainbow)  # {red,orange,yellow,green,blue,purple}
        9.11. Geometric Functions and Operators
          geometric types
            point, box, lseg, line, path, polygon, circle
          geometric operators
            + Translation 
              box '((0,0),(1,1))' + point '(2.0,0)'
            * Scaling/rotation  
              box '((0,0),(1,1))' * point '(2.0,0)'
            # Point or box of intersection  
              box '((1,-1),(-1,1))' # box '((1,1),(-2,-2))'
          geometric functions
            area(object)
            center
            diameter
            height
          geometric type conversion 
            box(circle)
            lseg(box)
            point(box)
        9.12. Network Address Functions and Operators
        9.13. Text Search Functions and Operators
        9.14. XML Functions
        9.15. Sequence Manipulation Functions
          functions for operating on sequence objects
            also: sequence generators or sequences
          sequence objects:
            single-row tables
            created with CREATE SEQUENCE
          functions
            currval()
            lastval()
            nextval()
            setval()
        9.16. Conditional Expressions
          9.16.1. CASE
            syntax
              CASE WHEN condition THEN result
                   [WHEN ...]
                   [ELSE result]
              END
            ex
              SELECT a,
                     CASE WHEN a=1 THEN 'one'
                          WHEN a=2 THEN 'two'
                          ELSE 'other'
                     END
                  FROM test;
               a | case
              ---+-------
               1 | one
               2 | two
               3 | other
            ex: simple syntax
              SELECT a,
                 CASE a WHEN 1 THEN 'one'
                        WHEN 2 THEN 'two'
                        ELSE 'other'
                 END
              FROM test;
          9.16.2. COALESCE
            returns first argument that is not null
              used to substitute a default value for null for display
            COALESCE(value [, ...])
            SELECT COALESCE(description, short_description, '(none)') ...
          9.16.3. NULLIF
            reverse of COALESCE
            The NULLIF function returns a null value if value1 equals value2; otherwise it returns value1.
            NULLIF(value1, value2)
          9.16.4. GREATEST and LEAST
            GREATEST(value [, ...])
            LEAST(value [, ...])
        9.17. Array Functions and Operators
          operators
            = equal ARRAY[1.1,2.1,3.1]::int[] = ARRAY[1,2,3]  t
            @>  contains  ARRAY[1,4,3] @> ARRAY[3,1]  t
            <@  is contained by ARRAY[2,7] <@ ARRAY[1,7,4,2,6]  t
            &&  overlap (have elements in common) ARRAY[1,4,3] && ARRAY[2,1]  t
            ||  array-to-array concatenation  ARRAY[1,2,3] || ARRAY[4,5,6]  {1,2,3,4,5,6}
          functions
            array_append(ARRAY[1,2], 3) 
            array_cat(ARRAY[1,2,3], ARRAY[4,5]) 
            array_ndims(ARRAY[[1,2,3], [4,5,6]])  
            array_length(array[1,2,3], 1)  # 3
            unnest(ARRAY[1,2])  
              1
              2
              (2 rows)
        9.19. Range Functions and Operators
          operators
            = equal int4range(1,5) = '[1,4]'::int4range t
            @>  contains range  int4range(2,4) @> int4range(2,3)  t
            @>  contains element  '[2011-01-01,2011-03-01)'::tsrange @> '2011-01-10'::timestamp t
            <@  range is contained by int4range(2,4) <@ int4range(1,7)  t
            <@  element is contained by 42 <@ int4range(1,7)  f
            &&  overlap (have points in common) int8range(3,7) && int8range(4,12) t
            <<  strictly left of  int8range(1,10) << int8range(100,110) t
        9.18. Aggregate Functions
          Aggregate functions compute a single result from a set of input values
          functions
            array_agg(expression) any non-array type    
              array of the argument type  
            avg(expr)
            bool_and(expr)
            bool_or(expr)
            count(*)
            count(expr)
              number of input rows for which the value of expression is not null
            json_agg(expression)  
              aggregates values as JSON array
            json_object_agg(name, value)  
              aggregates key/values as JSON object
            max
            min
            string_agg(expr, delimiter)
            sum(expr)
          note: count(*) performance is slow when no WHERE filter is used or
            SELECT COUNT(*) FROM (SELECT DISTINCT column_name FROM table_name) AS temp;
          functions for statistics
            crr(Y,X)
            regr_avgx(Y,X)
            stddev
            variance
          functions for ordered-sets (niverse distribution)
            mode() WITHIN GROUP 
              out: most frequent value
            percentile_cont(fraction)
              continous percentile
        9.19. Window Functions
          perform calculations across set of rows
          invoked using window syntax
            OVER clause is required
          any aggregate function can be used
            as window function
            with OVER clause
          general purpose functions
            row_number()
              1 2 3
            rank()
              with gaps: 1 1 3
            dense_rank()
              no gaps: 1 1 2
            percent_rank()
            cume_dist()
            ntile
            lag
            lead
            first_value
            last_value
            nth_value
        9.20. Subquery Expressions
          all return boolean results
          9.20.1. EXISTS
            EXISTS(subquery)
            ex
              SELECT col1
              FROM tab1
              WHERE EXISTS (SELECT 1 FROM tab2 WHERE col2 = tab1.col2);
          9.20.2. IN
            expression IN (subquery)
          9.20.3. NOT IN
          9.20.4. ANY/SOME
            expression operator ANY (subquery)
            expression operator SOME (subquery)
          9.20.5. ALL
            expression operator ALL (subquery)
        9.21. Row and Array Comparisons
        9.22. Set Returning Functions
          return multiple rows
          series generating functions
            generate_series(start, stop)
            generate_series(start, stop, step)
            generate_series(start, stop, step interval)
          subscript generating
            generates valid subscripts for an array
            ex
              SELECT generate_subscripts('{NULL,1,NULL,2}'::int[], 1) AS s;
               s 
              ---
               1
               2
               3
               4
              (4 rows)
        9.23. System Information Functions
          functions
            current_catalog
            current_database()
            current_role
            current_schema
            current_user
            user
            session_user
            version()
          query object access privileges
            has_any_column_privilege(user, table, privilege)
            has_column_privilege(user, table, column, privilege)
            has_function_privilege
            has_schema_privilege
            has_xxx_privilege
              server, table, tablespace, type, language
            pg_has_role(user, role, privilege)
        9.24. System Administration Functions
          functions
            current_setting(setting_name [, missing_ok ]) 
            set_config(setting_name, new_value, is_local) 
            ex
              SELECT current_setting('datestyle');
               current_setting
              -----------------
               ISO, MDY
              (1 row)
              SELECT set_config('log_statement_stats', 'off', false);
          server signaling functions
            pg_cancel_backend(pid int)  
          backup control functions
            pg_create_restore_point(name text)  
            pg_start_backup
              select pg_start_backup('label_goes_here');
          Recovery Control Functions
        9.25. Trigger Functions
      Chapter 21. Database Roles
        21.3 Role Membership
          create a group role:
            CREATE ROLE name;
          add/remove members:
            GRANT group_role TO role1, ...;
            REVOKE group_role TO role1, ...;
          ex
            CREATE ROLE joe LOGIN INHERIT;
            CREATE ROLE admin NOINHERIT;
            CREATE ROLE wheel NOINHERIT;
            GRANT admin TO joe;
            GRANT wheel TO admin;
          change effective role:
            SET ROLE wheel;


## PostgreSQL Up and Running 1491963417 id=g_10157

    PostgreSQL Up and Running 1491963417 <url:file:///~/Dropbox/mynotes/content/articles/articles_db.md#r=g_10157>
    intro
      why postgresql
        not just a db
          also an application platform
        fast
        functions in several pl
          python, r, js
          pgsql
        data types
          custom made
            composite types
          types from tables
            functions that work on them
        don't treat db as dumb storage
          accomplish jobs in seconds that would take hours in coding 
        nonrelational data
          ltree -> graphs
          hstore -> key-value
          json + jsonb
      why not postgresql
        size 100M+
        security might be overkill
        combine pgs with other db types
          ex: redis/memcache to cache query results from pgs
          ex: sqlite for offline. pgs for online
    chapter 1. the basics
      administration tools
        psql, pgAdmin, phpPgAdmin, Adminer
      psql
        unusual features
          import/export csv/tab
          report writer for html
      pgAdmin
        gui tool
        start with pgAdmin
          get birds eye view
      PostgreSQL Database Objects
        databases
        schemas
          a database contains several schemas
          default schema: public
          if lots of tables, organize them into different schemas
        tables
          a schema contains several tables
          have two features
            inheritable
            custom data type for each table
        views
          a view is an abstraction from tables
          views that join multiple tables
            need a trigger to update data
          materialized views
            cache data to speed up queries
            cost: not most up-to-date data
        extensions
          to package functions, data types, casts, indexes etc. for installation
          may depend on other extensions
            CASCADE: to install dependents
        functions
          create functions using pls
          can return: scalar, array, records
          stored procedure = function
        languages
          pl: procedural language
          default: sql, pgSQL, C
          additional: python, v8 (js), r, java
        operators
          aliases for functions
          can create your own
        foreign tables and foreign data wrapper
          foreign tables can link to csv, other servers, other databases, web services
          foreign data wrappers (fdw) makes handshake between pgs and external data source
            follow sql/management of external data standard
          existing fdw for popular data sources
        triggers and trigger functions
          detect data change events
          execute trigger functions
          in response to 
            statements
            changes in particular rows
            before or after data change
          pgadmin > .table > triggers
          trigger functions
            have access to special variables
              that have data before/after event
            can be used for validation 
        catalog
          system schemas that store builtin functions and metadata
          every db has two catalogs
            pg_catalog
              all functions, tables,...
            information_schema
              views of metadata
          pgs has self-replicating structure
            all settings are in system tables
            this gives pgs extensibility (hackability) 
        types
          type = data type
          ex: integer, character, array
          pgs has composite types
            ex: complex numbers, coordinates, vectors, tensors
          a composite type for each table
        full text search (fts)
          natural language based search
          match based on semantics
            ex: running, ran, runner, jog, sprint
          3 objects for fts
            fts configurations
            fts dictionaries
            fts parsers
        cast
          convert one data type to another
          ex: zip codes: from character to integer
        sequence
          auto incrementation of a serial data type
        rules
          instructions to rewrite sql prior to execution
          fallen out of favor because of triggers
        settings at multiple levels
          server level
          database level
          schema level
          GUC: grand unified configuration = configuration settings in pgs
      What is New
        Features in pgs 10
          parallel query improvements
          logical replication
          full text for json
          fdw aggregates
            count(*) sum(*) on remote queries
          declarative table partitioning
          query execution
          create statistics
          case and coalesce
          identity
        Features in pgs 9.6
          query parallelization
            for multiple cores
          phrase full text search
            distance operator <->
              to indicate how far two words can be apart
          psql \gexec options
          postgres_fdw
          fdw joins
            fdw will perform join remotely
        Features in pgs 9.5
          foreign table architecture improvements
          using unlogged tables to populate new tables 
          arrays in array_agg
            accepts arrays to construct multidim arrays too
          block range indexes (brin)
            new kind of index
              other than btree and gin
          grouping sets, roll up and cube sql predicates
            to return additional sub total rows
          index only scans
            support gist indexes
          insert and update conflict handling
            prior: automatic fail
            now: option to catch exception and skip 
          update lock failures
          row level security
        Features in pgs 9.4
          materialized views enhancements
          new analytic functions to compute percentiles
            percentile_disc (discrete)
            percentile_cont (continous)
            used with: WITHIN GROUP (ORDER BY ...)
          protection against updates in views
            WITH CHECK OPTION
          new data type: jsonb
          improved generalized inverted index (GIN)
            for fts, trigrams, hstores, jsonb
          more json functions
            json_build_array
            json_build_object
            json_to_record
          expedited moves between tablespaces
            move all db objects from/to tablespace
              tablespace is a location on disk where PostgreSQL stores data files containing database objects
          row numbers in returned sets
          using sql to alter system-configuration settings
            ALTER system SET ...
              for global system settings
          triggers on foreign tables
          better unnesting
          ROWS FROM
          dynamic background workers
      Database Drivers
      Notable PGS Forks
    chapter 2. database administration
      configuration files
        postgresql.conf
          general settings
            ex: memory allocation, default storage location, ip addresses, location of logs
        pg_hba.conf
          access to the server
            which users can log in to which db
            which ip addresses
            which authentication scheme
        pg_ident.conf
          maps os login to pgs user
        note: pgs role = user
          here: user: role with login privilege
        where are config files
          SELECT name, setting FROM pg_settings WHERE category = 'File Locations'
        making configurations take effect
          reload or restart
          reloading
            opt
              pg_ctl reload -D <data_directory>
              service postgresql-9.6 reload
              SELECT pg_reload_conf()
          restarting
            service postgresql-9.5 restart
      Managing Connections
        typical steps:
          1. retrieve list of recent connections:
            SELECT * FROM pg_stat_activity
          2. cancel active queries on a connection
            SELECT pg_cancel_backend(procid)
          3. kill connection
            SELECT pg_terminate_backend(procid)
        kill connections by a user
          SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE usename = 'some_role'
      Roles
        intro
          login roles
            roles that can login
          group roles
            roles that contain other roles
            usually: DBAs don't grant login right to group roles
          superuser
            have unlimited access
          commands
            old
              CREATE USER
              CREATE GROUP
            CREATE ROLE
        Creating Login Roles
          CREATE ROLE leo LOGIN PASSWORD 'king' CREATEDB VALID UNTIL 'infinity'
            CREATEDB: grants database creation rights
            VALID: optional, default: infinity
          grant superuser rights
            CREATE ROLE regina LOGIN PASSWORD 'queen' SUPERUSER UNTIL '2020-1-1 00:00'
        Creating Group Roles
          CREATE ROLE royalty INHERIT
            INHERIT: any member will inherit rights of royalty role
              except superuser rights
          GRANT royalty TO leo  
            add role "leo" to group "royalty"
            "royalty" is group role
            "leo" is member role
            when we change group role privileges, member roles are updated
        Inheriting rights
          take some role per connection:
            SET ROLE royalty
              imperasanation
      Database Creation   
        CREATE DATABASE mydb
          copies "template1" db
      Template Databases
        defn: database that serves as model
        default template db:
          template0
            pure model that you need to copy if you screw up your templates
            never alter it
          template1
            used as template for new db
        CREATE DATABASE mydb TEMPLATE my_template
          create mydb based on my_template
          you can pick any db as template
          you can mark any db as template
        UPDATE pg_database SET datistemplate = TRUE WHERE dataname = 'mydb'
          now mydb becomes immutable (due to dataistemplate = TRUE)
      Using Schemase
        to organize db into groups
        default: public
        always prepend schema name to table name:
          SELECT * FROM my_schema.dogs
        search_path
          variable to keep schema names
          ex: "public, my_schema"
            searches a table in this list
        user
          variable that lists name of currently logged in user
          SELECT user
          ex: best practice
            search_path = "$user", public
              first look in $user schema then public
        best practice: create schemase to house extensions
          install extensions to custom schema
          ex:
            CREATE SCHEMA my_extensions
            ALTER DATABASE mydb SET search_path = '"$user", public, my_extensions'
              needs reconnect
      Privileges
        defn: permissions
        tricky to administer because of fine granular control
      Types of Privileges
        object level privileges:
          SELECT, INSERT, UPDATE, ALTER, EXECUTE, TRUNCATE
          modifier: WITH GRANT
      Getting Started
        have superuser and db
          default: postgres
        create first role
          CREATE ROLE mydb_admin LOGIN PASSWORD 'ss'
        create db and sent owner
          CREATE DATABASE mydb WITH owner = mydb_admin
        login as mydb_admin
        setup additional schemas and tables
      GRANT
        assigns privileges to others
        GRANT some_privilege TO some_role
        note:
          you need to be the holder of privilege that you're granting
          some privileges can never be granted away:
            ex: DROP, ALTER 
          owner of object has all privileges
          you can add: WITH GRANT OPTION
            means: grantee can grant onwards
            GRANT ALL ON ALL TABLES IN SCHEMA public TO mydb_admin WITH GRANT OPTION
          all relevant privileges on an object:
            ALL
            GRANT SELECT, REFERENCES, TRIGGER ON ALL TABLES IN SCHEMA my_schema TO PUBLIC
          ALL alias: grant for all objects within a db/schema
            GRANT SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA my_schema TO PUBLIC
          PUBLIC alias: to grant privileges to all roles
            GRANT USAGE ON SCHEMA my_schema TO PUBLIC
        REVOKE
          REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA my_schema FROM PUBLIC
        default granted to PUBLIC
          CONNECT, CREATE TEMP TABLE for db
          EXECUTE for functions
          USAGE for languages
      Default Privileges
        ex: all users to have EXECUTE and SELECT to all in schema
          GRANT USAGE ON SCHEMA my_schema TO PUBLIC
          ALTER DEFAULT PRIVILEGES IN SCHEMA my_schema GRANT SELECT, REFERENCES ON TABLES TO PUBLIC
          ALTER DEFAULT PRIVILEGES IN SCHEMA my_schema GRANT ALL ON TABLES TO MYDB_ADMIN WITH GRANT OPTION
          ALTER DEFAULT PRIVILEGES IN SCHEMA my_schema GRANT SELECT, UPDATE ON SEQUENCES TO PUBLIC
          ALTER DEFAULT PRIVILEGES IN SCHEMA my_schema GRANT ALL ON FUNCTIONS TO MYDB_ADMIN WITH GRANT OPTION
          ALTER DEFAULT PRIVILEGES IN SCHEMA my_schema GRANT USAGE ON TYPES TO PUBLIC
      Privilege Idiosyncrasies
        don't forget
          or
            GRANT USAGE ON SCHEMA
            GRANT ALL ON SCHEMA
          you may own schema, but can not use it
      Extensions
        extensions on server
          SELECT name FROM pg_available_extensions WHERE installed_version IS NOT NULL ORDER BY name
      Installing Extensions
        step 1: installing on the server
          apt get postgresql-contrib
          SELECT * FROM pg_available_extensions
        step 2: installing into a database
          opt
            CREATE EXTENSION fuzzystrmatch SCHEMA my_extensions
            CREATE EXTENSION fuzzystrmatch
            psql -p 5432 -d mydb -c "CREATE EXTENSION fuzzystrmatch;"
      Common extensions
        Popular extensions
          postgis
          fuzzystrmatch
            ex: soundex, levenshtein for fuzzy string matching
          hstore
            key-value pair storage
          pg_trgm (trigram)
            fuzzy string search
          dblink
            query pgs on other servers
          pgcrypto
        classic extensions
          tsearch
            indexes, operators, functions to enhance full text searches
          xml
            xml data type, functions
      Backup and Restore
        pg_dump
        pg_dumpall
        may use: ~/.pgpass
          to store all paswords
      Selective Backup Using pg_dump
        compressed, single db backup
          pg_dump -h localhost -p 5432 -U someuser -F c -b -v -f mydb.backup mydb
        plain text single db backup
          pg_dump -h localhost -p 5432 -U someuser -C -F p -b -v -f mydb.backup mydb
        compressed tables that start with "pay"
          ... -F c -b -v -t *.pay* -f pay.backup mydb
        compressed all objects in hr and payroll schemas
          ... -F c -b -v -n hr -n payroll -f hr.backup mydb
        compressed all objects in all schemas excluding public schema
          ... -F c -b -v -N public -f all_schema_except_public.backup mydb
        plain text sql of select tables
          ... -F p --column-inserts -f select_tables.backup mydb
          # useful for porting data to any db
        directory format: creates a dir and puts each table as a file
          ... -F d -f /path/dir mydb
      Systemwide Backup Using pg_dumpall
        plain text file
        includes server globals as well
        tip: backup globals such as roles, tablespace definitions on daily basis
        backup roles and tablespaces
          pg_dumpall ... -f myglobals.sql --globals-only
      Restore
        opt
          psql: restore plain text
          pg_restore: compressed, TAR, directory backups
        psql: restore plain text
          restore full backup and ignore errors
            psql -U postgres -f myglobals.sql
          restore, stop if error
            psql -U postgres --set ON_ERROR_STOP=on -f myglobals.sql
          restore to specific database
            psql -U postgres -d mydb -f myglobals.sql
        pg_restore
          restoring
            1. create db
              CREATE DATABASE mydb
            2. restore
              pg_restore --dbname=mydb --jobs=4 --verbose mydb.backup
          restore just structure
            --section=pre-data
      Managing Disk Storage with Tablespaces
        initializing pgs cluster creates two tablespaces
          pg_default
            user data
          pg_global
            system data
          in the same folder
        Creating Tablespaces
          CREATE TABLESPACE secondary LOCATION 'path'
        Moving Objects Between Tablespaces
          move database
            ALTER DATABASE mydb SET TABLESPACE secondary
          move one table
            ALTER TABLE mytable SET TABLESPACE secondary
        Verboten Practices
          logs
            pg_log folder in pgs data folder
          don't delete pgs core system files
            ok: pg_log
              but some files are critical
            never: pg_xlog
              stores transaction logs
        dont Give Full OS Admin Rights
          postgres account should be regular user
        dont set shared_buffers too high
        dont try to start pgs on a port already in use
      postgresql.conf file
        multiple levels: database, role, session, function
        checking settings
          query view: pg_settings
          ex
            SELECT name, context , unit , setting, boot_val, reset_val FROM pg_settings WHERE name IN ('listen_addresses','deadlock_timeout','shared_buffers' 'effective_cache_size','work_mem','maintenance_work_mem') ORDER BY context, name;
          
    chapter 3. psql
      Environment Variables
        PSQL_HISTORY  
          default: ~/.psql_history
        PSQLRC
          config file
        PGHOST
        PGPORT
        PGUSER
        PGPASSWORD
          or .password file
      Interactive vs Noninteractive psql
        \?
          list of commands
        \h <command>
        psql -f <some_script_file>
        psql -c <sql_statements>
          psql -d postgresql_book -c "DROP TABLE ..."
        interactive commands inside script files
          ex: build_stage.psql
            \a \t
            SELECT 'CREATE TABLE
            staging.count_to_50(array_to_string(array_agg('x' || i::text ' varchar(10)));' As create_sql
            FROM generate_series(1,9) As i;
            \g create_script.sql
            \i create_script.sql
          expl
            \t: save output remove headers
            \a: remove extra line breaks
            staging...
              create a table with nine varchar columns
            \g: output to a file
            \i: execute script interactively (vs -f)
          run:
            psql -f build_stage.psql -d postgresql_book
      psql Customizations
        settings: .psqlrc
          runs all commands therein
          ex:
            \pset null 'NULL'
            \encoding latin1
            ...
          expl
            each "set" commond on a single line
        Custom Prompts
          which db server:
            \set PROMPT1 '%n@..'
        Timing Executions
          \timing
            toggle it on and off
          ex:
            SELECT COUNT(*) FROM pg_tables
          out
            count
            ----
            ..
            Time: 18.3 ms
        Autocommit Commands
          \set AUTOCOMMIT off
            now you can roll back
          ex:
            UPDATE census.facts SET short_name = "mistake"
            ROLLBACK
            COMMIT
        Shortcuts
          for typing shortcuts
          ex:
            \set eav 'EXPLAIN ANALYZE VERBOSE'
          psql:
            :eav SELECT COUNT(*) FROM pg_tables
          prepend ":" to resolve variable
          use lowercase
        Retrieving Prior Commands
          \set HISTSIZE 10
            recover 10 comands
      psql Gems
        Executing Shell Commands
          \! ls
        Watching Statements
          \watch
          ex: monitor queries that have not completed
            SELECT datname, waiting, query
            FROM pg_stat_activity
            WHERE state = 'active' AND pid != pg_backend_pid(); \watch 10
          expl: watch traffic every 10 seconds
          ex: run a function (logging) every 5 seconds
            SELECT * INTO log_activity FROM pg_stat_activity;
            INSERT INTO log_activity SELECT * FROM pg_stat_activity; \watch 5
          to kill: ^x ^c
        Lists
          \d: detail
          ex: list tables that start with pg_t: \dt+
            \dt+ pg_catalog.pg_t*
          ex: more details about an object: \d+
            \d+ pg_ts_dict
      Importing and Exporting Data
        \copy
          default delimiter: tab
        psql Import
          best practice in denormalized data:
            create a separate staging schema for incoming data
            write explorative queries
            distribute data into normalized production tables
            delete staging schema
          ex: importing
            \connect postgresql_book
            \cd /postgresql_book/ch03
            \copy staging.factfinder_import FROM DEC_..csv CSV
              # CSV not tsv
              NULL AS ''
              DELIMITER '|'
              FROM somefile.txt
        psql Export
          ex
            \connect postgresql_book
            \copy (SELECT * FROM staging.factfinder_import WHERE s01 ~ E'^[0-9]+') TO '/test.tab'
            WITH DELIMITER E'\t' CSV HEADER
          arg
            FORCE QUOTE *
              all columns are double quoted
        Copy from/to Program
          ex: 
            \connect ..
            CREATE TABLE dir_list (filename text) 
            \copy dir_list FROM PROGRAM 'ls <path> /b'
        Basic Reporting
          ex
            psql -d postgresql_book -H -c
            "<sql_query>" -o test.html
    chapter 4. Using pgAdmin
      Overview of Features
        graphical explain your queries
        SQL pane
          see generated SQL
        GUI editor for configi files
          ex: postgresql.conf pg_hba.conf
        Data export and import
          CSV, HTML etc
        Backup and restore 
        Grant wizard
        pgScript engine
        Plugin architecture
          install addons
        pgAgent
          job scheduling agent
      Connecting to a pgs Server
      Navigating pgAdmin
        Tools > Options > Browser
      pgAdmin Features
        access psql
        edit posgresql.conf
        creating database assets and setting privileges
        privilege management
          Tools > Grant Wizard
          .select schema > Grant Wizard
      Import and Export
        .select table > import
        query > run > export
      Backup and Restore
      pgScript
        for running sql tasks
        similar to Transact SQL
        has: conditionals, loops, print, records
        variables: prepended with @
        commands: DECLARE, SET
        control: IF-ELSE, WHILE
        ex
          SET @labels = SELECT ...
        ex: loop through using LINES
          WHILE @I < LINES(@labels)
          BEGIN
            SET @tdef = @tdef + ', ' + @labels[@I][0] + ' numeric(12,3) ';
            SET @I = @I +1;
          END
        ex: print
          PRINT @tdef
        ex: create table
          CREATE TABLE @tdef
      Graphical Explain
      Job Scheduling with pgAgent
    chapter 5. Data Types
      Numerics
      Serials
        serial bigserial
          autoincrementing integers
        pgs creates: a sequence object
          table_name_column_name_seq
        you can create sequences independently:
          CREATE SEQUENCE
        to use some sequence in another column:
          nextval(sequence_name)
      Generate Series Function
        generate_series()
          mimics for loop in SQL
        ex:
          select x FROm generate_series(1,20,1) As x
      Characters and Strings
        char varchar text
        char: fixed length
      String Functions
        padding: lpad, rpad
        trimming: rtrim, ltrim, trim, btrim
        extracting: substring
        concat: ||
        splitting
          split_part()
            ex: get nth element
              split_part("text.sub", ".", 1) 
          unnest(string_to_array())
            to convert array to rows
            ex
              SELECT unnest(string_to_array("split.this", ".")) As x
      Regex
        ex
          regexp_replace('text', 'regex', E'replace')
        backreferences: \\1
        symbols: () [] {3}
        E: treat \ literally
        ex:
          unnest(regexp_matches('text', 'match', 'flags'))
        SIMILAR TO (~) operator
          ex
            SELECT ..
            FROM ..
            WHERE description ~ E'match'
      Temporals
        date: month, day, year
        time: without time zone and date
        timestamp: +date without time zone
        timestamptz: with time zone and date
        timetz: time with time zone
        interval
        tsrange: range of timestamp
        tstzrange
        daterange
        ex
          SELECT '2012-03-11 3:10 AM America/Los_Angeles'::timestamptz
          SELECT '2012-03-11 3:10 AM'::timestamp - '2012-03-11 1:10 AM'::timestampt
          SELECT '2012-03-11 3:10 AM America/Los_Angeles'::timestamptz AT TIME ZONE 'Europe/Paris'
      Datetime Functions
        +: add interval
        -
        ex
          SELECT '2012-03-11 3:10 AM'::timestamp + '1 hour'::interval
          SELECT '23 hours'::interval + '1 hour'::interval
        OVERLAPS: returns true if two ranges overlap
        ex
          SELECT ('2012-03-11 3:10 AM'::timestamp ,'2012-03-11 5:10 AM'::timestamp) OVERLAPS (<timestamp>) 
        generate_series()
          ex
            generate_series(<timestamp>, <end_timestamp>, <interval>)
        extracting/formatting
          date_part('hour', <timestamp>)
          to_char(<timestamp>, 'HH12:MI AM')
      Arrays
        useful in 
          building aggregate functions
          IN and ANY clauses
          holding intermediary values
        ex
          integer[]
          character[]
        Array Constructors
          SELECT ARRAY[2001, 2002] As years
          array(): extract from query
            SELECT array(SELECT ...)
          casting
            '{Alex,Sonia}'::text[] As name
          convert delimited strings to array
            string_to_array('ca.ma.tx', '.')
          convert any to array
            SELECT array_agg(log_ts)
            FROM logs
            WHERE log_ts BETWEEN ...
        Referencing Elements 
          my_array[1] # first
          my_array[array_upper(my_array,1)] # last
        Slicing and Splicing
          my_array[2:4]
          gluing
            arr[1:2] || arr[5:6]
        Unnesting Arrays to Rows
          unnest('{1,2,3}'::smallint[])
      Range Types
        (-2,2]
        (-2,2)
        [-2,2]
        () open ends
        [] closed ends
        Discrete Vs Continuous Ranges
        Defining Tables with Ranges
          ex
            CREATE TABLE employment (id serial PRIMARY KEY, employee varchar(20), period daterange)
            CREATE INDEX idx_emp_period ON employment USING gist (period)
            INSERT INTO employment (employee, period)
              VALUES ('Alex', '[2012-04-24, infinity)'::daterange)
        Range Operators
          overlap (&&)
          contains (@>)
          ex: overlap: who worked with whom
            SELECT e1.employee, 
              string_agg(DISTINCT e2.employee, ', ' ORDER BY e2.employee) As colleagues
            FROM employment As e1 INNER JOIN employment As e2
            ON e1.period && e2.period
            WHERE e1.employee <> e2.employee GROUP BY e1.employee;
          out:
            employee | colleagues
            ----------+------------------
            Alex     | Leo, Regina, Sonia
            Leo      | Alex, Regina
          ex: contains @>: who is currently working
            SELECT employee FROM employment WHERE period @> CURRENT_DATE GROUP BY employee
          out:
            employee
            ---
            Alex
          ex: contained in <@
            first arg: value
            second arg: range
      JSON
        Inserting JSON Data
          ex: define a column
            CREATE TABLE families_j (id serial PRIMARY KEY, profile json)
          ex: insert
            INSERT INTO families_j (profile) VALUES (
              '{"name":"Gomez", "members": [{"member":{"relation":"padre",...}}]}')
        Querying
          functions
            json_extract_path
            json_array_elements
            json_extract_path_text
          ex: query subelements
            SELECT
              json_extract_path(profile, 'name') As family,
              json_extract_path_text( json_array_elements( json_extract_path(profile, 'members') ), 'member', 'name') As member
              json_array_elements
            FROM families_j
          out:
            family | member
            ---
            Gomez | Alex
            Gomez | Sonia
          shortcut operators
            json_extract_path
            json_array_elements
            ->> #>> json_extract_path_text
          ex: operators ->>
            SELECT
              profile->>'name' As family,
              json_array_elements( (profile->'members')) #>> '{member,name}'::text[] As member
            FROM families_j
          funs
            json_array_length
            -> 
              return specific index element
          ex
            SELECT id,
              json_array_length(profile->'members') As numero,
              profile->'members'->0#>>'{member,name}'::text[] As primero
            FROM ..
          out:
            id|numero|primero
            1|4|Alex
          -> operator
            profile->'members'
            profile->0
          note: arrays in json start at 0
        Outputting JSON
          converting other data to JSON
          funs
            row_to_json
          ex
            SELECT
              row_to_json(f) As x
            FROM (SELECT id, profile->>'name' As name FROM families_j) As f
          out
            x
            {"id":1,"name":"Gomez"}
          ex: output each row
            SELECT row_to_json(f) FROfamilies_j As f
        Binary JSON: jsonb
          same-named operators
          differences
            no duplicate keys
            better performance
            indexed using GIN
          ex
            CREATE TABLE families_b (id serial PRIMARY KEY, profile jsonb)
          new operators:
            = equality
            @> contains 
            <@ contained
            ? key exists
            ?| any of array of keys exists
            ?& all of array of keys exists
          ex: list all families that have a member named Alex
            SELECT profile->>'name' As family
            FROM families_b
            WHERE profile @> '{"members":[{"member":{"name":"Alex"} }]}'
      XML
      Composite Data Types
        All Tables are Custom Data Types
    chapter 6. Tables, Constraints and Indexes
      Tables
        Basic Table Creation
        Inherited Tables
          ex
            CREATE TABLE logs_2011 (PRIMARY KEY(log_id)) INHERITS (logs)
            ALTER TABLE logs_2011 ADD CONSTRAINT chk_y2011
              CHECK (log_ts >= '2011-1-1'::timestamptz 
                AND log_ts < <timestamp>)
        Unlogged Tables
          ex
            CREATE UNLOGGED TABLE ...
          writing data is much faster
        TYPE OF
          pgs automatically creates a composite data type in background for each table
          reverse: use composite data type as template for creating tables
      Constraints
        Foreign Key Constraints
          opt
            referential integrity
              cascade update
              delete rules to avoid orphaned records
          ex: fk constraints and indexes
            set search_path=census, public;
            ALTER TABLE facts ADD CONSTRAINT fk_facts_f FOREIGN KEY (fact_type_id) REFERENCES lu_fact_types (fact_type_id)
              ON UPDATE CASCADE ON DELETRESTRICT;
            CREATE INDEX fki_facts_1 ON facts (fact_type_id);
          indexes for fk constraints are not created automatically
        Unique Constraints
          automatically creates a unique index
          ex
            ALTER TABLE logs_2011 ADD CONSTRAINT uq UNIQUE (user_name, log_ts);
        Check Constraints
          ex: all user names to be lowercase
            ALTER TABLE logs ADD CONSTRAINT chk CHECK (user_name = lower(user_name));
        Exclusion Constraints
          ex: prevent overlapping bookings
            CREATE TABLE schedules(id .., room smallint, time_slot tstzrange);
            ALTER TABLE schedules ADD CONSTRAINT ex_schedules
              EXCLUDE USING gist (room WITH =, time_slot WITH &&)
      Indexes
        PostgreSQL Stock Indexes
          b-tree
            common index
            default
            only method for PK and unique keys
          GiST
            Generalized Search Tree
            for full text search, spatial data, unstructured data, hierarchical data
            not for uniqueness
          GIN 
            Generalized Inverted Index
            full text, jsonb
            GiST without lossiness
          SP-GiST
          hash
            popular before GIST and GIN
          btree Gist/btree GIN
        next 
    chapter 7. SQL: The PostgreSQL Way
      Views
        purists: never directly query a table
          always query via views
          useful for
            controlling permissions
            abstarction of logic
        Updatable views
          better: use INSTEAD OF triggers
        materialized views
          requery data only with REFRESH command
          benefit: not wasting resources repeatedly
          cost: not most up-to-date data
        Single Table Views
          always include PK if you will write data back to the table
          ex
            CREATE OR REPLACE VIEW census.vw_facts_2011 AS
            SELECT fact_type_id, ... FROM <table> WHERE yr = 2011;
          editing data:
            DELETE FROM <view> WHERE val = 0
            UPDATE <view> SET val = 1 WHERE val = 0;
          updating may empty view due to WHERE filter
            WITH CHECK OPTION
              keep data in view always
            then: error when you empty data
        Using Triggers to Update Views
          ex:
            CREATE OR ... AS
            SELECT ..
            FROM <table> INNER JOIN <table>
            ON <fk1> = <fk2>
          ex: trigger function
            CREATE OR REPLACE FUNCTION census.trig_vw_facts() RETURNS trigger AS $$
            BEGIN
              IF (TG_OP = 'INSERT') THEN
                INSERT INTO <table(col1, col2)>
                SELECT NEW.col1, NEW.col2;
                RETURN NEW;
              END IF;
            END;
            $$
            LANGUAGE plpgsql VOLATILE;
          bind trigger to view
            CREATE TRIGGER census.trig_vw_facts
            INSTEAD OF INSERT OR UPDATE OR DELETE ON <table>
            FOR EACH ROW EXECUTE PROCEDURE census.trig_vw_facts();
        Materialized Views
      Handy Constructions
        DISTINCT ON
          behaves like DISTINCT
            sadece () içine koyduğun kolonlara göre ayrıştırır
        LIMIT and OFFSET
          rows to skip
        Shorthand Casting
          CAST('2011-1-11' AS date)
          ===
          '2011-1-1'::date
        Multirow Insert
          ex
            INSERT INTO <table> (<cols>)
            VALUES
              (<row1>),
              (<row2>);
          ex: multirow constructor
            SELECT *
            FROM (
              VALUES
                (<row1>),
                (<row2>)
              )
        ILIKE for Case insensitive Search
          ex
            SELECT .. WHERE <col1> ILIKE '%duke%'
        Returning Functions
          ex
            SELECT i_type,
              generate_series(<arg1>, <arg2>, i_type) 
            FROM <table>;
        Restricting DELETE, UPDATE, SELECT from Inherited Tables
          child tables
            drill down hierararchy
          ONLY: delete only those records that don't have child
        DELETE USING
          join gibi delete için
          ex
            DELETE FROM census.facts
            USING census.lu_fact_types As ft
            WHERE facts.fact_type_id = ft.fact_type_id AND ft_short_name = 's01'
        Returning Affected Records
          RETURNING
          update ve insert tarafından etkilenen satırlar
          ex
            UPDATE census.lu_fact_types AS f
            SET short_name = ..
            WHERE ..
            RETURNING fact_type_id, short_name
          hangi satırları etkilediyse, onları döner
        Composite Types in Queries
          ex
            SELECT x FROM census.lu_fact_types As x LIMIT 2;
          out
            x
            ---
            (86,Population,"{D001,Total:}",d001)
            (87,Population,"{D002,Total:,""Not Hispanic or Latino:""}",d002)
          used as input for useful functions:
            array_agg
            hstore(): converts a row into key-value hstore object
          ex
            SELECT array_to_json(array_agg(f)) As cat FROM (
              SELECT MAX(fact_type_id) As max_type, category FROM census.lu_fact_types
              GROUP BY category
            ) As f
          out
            [{"max_type":102,"category":"Population"},
            {"max_type":153,"category":"Housing"}]
        DO
          inject procedural code into SQL
            all languages
          ex
            DO language plpgsql
            $$
            DECLARE var_sql text
            BEGIN
              var_sql := string_agg(
                'INSERT INTO ...
                ' || lpad(i::text, 2, '0') || '..
                '
              )
              FROM generate_series(1,51) As i;
              EXECUTE var_sql;
            END
            $$;
        FILTER Clause for Aggregates
          replaced CASE WHEN
          ex
            SELECT student,
              AVG(score) FILTER (WHERE subject ='algebra') As algebra, 
              AVG(score) FILTER (WHERE subject ='physics') As physics
            FROM test_scores 
            GROUP BY student;
        Window Functions
          windows add aggregate information
            to each row
            where aggregation involves other rows in the same window
          ex
            SELECT tract_id, val, AVG(val) OVER () as val_avg
            FROM census.facts
            WHERE fact_type_id = 86;
          OVER: sets boundary of window
        PARTITION BY
          window function over rows containing particular values (like GROUP BY)
          ex
            SELECT tract_id, val, AVG(val) OVER (PARTITION BY left(tract_id,5)) as val_avg_county
            FROM census.facts
            WHERE fact_type_id = 86 ORDER BY tract_id;
        ORDER BY
          window functions allow ORDER BY in OVER clause
          ex
            SELECT ROW_NUMBER() OVER (ORDER BY tract_name) As rnum, tract_name
            FROM census.lu_tracts
            ORDER BY rnum LIMIT 4;
          ex: PARTITION BY and ORDER BY: restarting ordering for each partition
            SELECT tract_id, val, AVG(val) OVER (PARTITION BY left(tract_id,5) ORDER BY val) as sum_county_ordered
            FROM census.facts
            WHERE fact_type_id = 86 
            ORDER BY left(tract_id,5), val;
          ex: LEAD and LAG
            SELECT * FROM (
              SELECT 
                ROW_NUMBER() OVER (wt) As rnum, 
                substring(tract_id,1,5) As county_code,
                tract_id,
                LAG(tract_id,2) OVER wt As tract_2_before,
                LEAD(tract_id) OVER wt As tract_after,
                FROM census.lu_tracts
                WINDOW wt AS (PARTITION BY substring(tract_id,1,5) ORDER BY tract_id)
              ) As x
              ..
          any aggregate function can be used as a window function
      Common Table Expressions (CTE)
        3 ways
          Basic CTE
          Writable CTE
          Recursive CTE
        Basic CTE
          WITH introduces the CTE
          ex:
            WITH 
              cte1 AS (
                SELECT * FROM <table1>
              ), 
              cte2 AS (
                SELECT * FROM <table2>
              )
            SELECT *
            FROM cte1
            WHERE ..
        Writable CTEs
          ex: child table
            CREATE TABLE logs_2011_01 (
              PRIMARY KEY (..),
              CONSTRAINT chk
                CHECK (log_ts >= '2011-01-01')
            )
            INHERITS (logs_2011);
          ex: move data from parent 2011 to childd 2011_01
            WITH t AS (
              DELETE FROM ONLY logs_2011 WHERE log_ts < '2011-03-0' RETURNING *
            )
            INSERT INTO logs_2011_01_02 SELECT * FROM t;
        Recursive CTE
          recursively cascading table relationships
          ex
            WITH RECURSIVE tbls AS (
              SELECT 
                *
              FROM 
                tbls INNER JOIN
                pg_inherits As th ON th.inhparent = tbls.tableoid 
            )
            SELECT * FROM tbls;
        Lateral Joins
          Subqueries appearing in FROM can be preceded by the key word LATERAL. This allows them to reference columns provided by preceding FROM items
          Without LATERAL, each subquery is evaluated independently and so cannot cross-reference any other FROM item
          ex
            SELECT * FROM foo, LATERAL (SELECT * FROM bar WHERE bar.id = foo.bar_id) ss
            === conventional form
            SELECT * FROM foo, bar WHERE bar.id = foo.bar_id
    chapter 8. Writing Functions
      Anatomy of PostgreSQL Functions
        Function Basics
          ex: basic function structure
            CREATE OR REPLACE FUNCTION func_name(arg1 arg1_datatype DEFAULT arg1_default)
            RETURNS some type | set of some type | TABLE (..) AS
            $$ 
            BODY of function
            $$ 
            LANGUAGE languafe_of_function
          list of languages
            SELECT lanname FROM pg_language;
      Triggers and Trigger Functions
        actuate at level:
          statement
          row
        statement triggers
          run once per SQL statement
        row triggers 
          run for each row affected by SQL
        timing
          BEFORE
            prior to execution
            only to tables
          AFTER
            only to tables
          INSTEAD OF
            instead of the statement
            only to views
        WHEN
          which rows will fire trigger
        UPDATE OF columns_list
          fire only if certain columns are updated
        data type: trigger
          trigger function always outputs trigger data type
      Aggregates
        builtin: MIN, MAX, AVG, SUM, COUNT
        custom aggregate functions 
        ex
          CREATE AGGREGATE my_agg (input data type) (
            SFUNC=<state function name>,
            STYPE=<state type>,
            FINALFUNC=<final function name>,
            INITCOND=<initial state value>,
            SORTOP=<sort_operator
            );
      Trusted and Untrusted Languages
        Trusted
          lacks access to file system
            cannot execute OS commands
          SQL, pgSQL, PL/Perl
        Untrusted
      Writing Functions with SQL
        Basic SQL Function
          ex: insert a row and return a scalar value
            CREATE OR REPLACE FUNCTION write_to_log(param_user_name varchar, param_description text)
            RETURNS integer AS
            $$
            INSERT INTO logs(user_name, description) VALUES($1, $2)
            RETURNING log_id;
            $$
            LANGUAGE 'sql' VOLATILE;
          ex: calling it
            SELECT write_to_log('alejandro', 'Woke up') As new_id;
          ex: update a record 
            CREATE OR REPLACE FUNCTION update_logs(log_id int, param_user_name varchar, param_description text)
            RETURNS void AS
            $$
            UPDATE logs
              SET user_name = $2, description = $3 log_ts = CURRENT_TIMESTAMP WHERE log_id = $1;
            $$
            LANGUAGE 'sql' VOLATILE;
          ex: calling it
            SELECT update_logs(12, 'alejandro', 'fell back');
          using named arguments
            param_1 instead of $1
          functions can return sets
            3 approaches:
              ANSI SQL: RETURNS TABLE syntax
              OUT parameters
              composite data types
          ex: RETURNS TABLE
            CREATE OR REPLACE FUNCTION select_logs_rt(param_user_name varchar)
            RETURNS TABLE (log_id int, user_name varchar(50), description text, log_ts timestamptz) AS
            $$
            SELECT log_id, user_name, description, log_ts FROM logs WHERE user_name = $1;
            $$
            LANGUAGE 'sql' STABLE;
          ex: OUT
            CREATE OR REPLACE FUNCTION select_logs_out(param_user_name varchar, OUT log_id int, OUT user_name varchar, OUT description text, OUT log_ts timestamptz)
            RETURNS SETOF record AS
            $$
            SELECT * FROM logs WHERE user_name = $1;
            $$
            LANGUAGE 'sql' STABLE;
          ex: composite type
            CREATE OR REPLACE FUNCTION select_logs_so(param_user_name varchar)
            RETURNS SETOF logs AS
            $$
            SELECT * FROM logs WHERE user_name = $1;
            $$
            LANGUAGE 'sql' STABLE;
          ex: calling them
            SELECT * FROM select_logs_xxx('alejandro');
        Writing SQL Aggregate Functions
          how to create a geometric mean aggregate function with SQL
            geometric mean: nth root of a product of n positive numbers ((x1*x2*x3...xn)^{1/n})
            formula:
              (EXP(SUM(LN(x))/n))
          two subfunctions:
            a state transition function to sum the logs
            a final function to exponentiate the logs
          ex: state function
            CREATE OR REPLACE FUNCTION geom_mean_state(prev numeric[2], next numeric)
            RETURNS numeric[2] AS
            $$
            SELECT
              CASE
                WHEN $2 IS NULL OR $2 = 0 THEN $1
                ELSE ARRAY[COALESCE($1[1],0) + ln($2), $1[2] + 1]
              END;
            $$
            LANGUAGE sql IMMUTABLE;
          bu fonksiyon foldl fonksiyonuna karşılık geliyor
          ex: final function: divide the sum by count
            CREATE OR REPLACE FUNCTION geom_mean_final(numeric[2])
            RETURNS numeric AS
            $$
            SELECT CASE WHEN $1[2] > 0 THEN exp($1[1]/$1[2]) ELSE 0 END;
            $$
            LANGUAGE sql IMMUTABLE;
          ex: assembling pieces
            CREATE AGGREGATE geom_mean (numeric) (
              SFUNC=geom_mean_state,
              STYPE=numeric[],
              FINALFUNC=geom_mean_final,
              INITCOND='{0,0}'
            );
          ex: calling it
            SELECT geom_mean(val) As div_county
            FROM census.vw_facts
            WHERE category = 'Population'
            GROUP BY county
            ORDER BY div_county DESC LIMIT 5;
      Writing PL/pgSQL Functions
        pgSQL surpasses SQL
          declare local variables using DECLARE
          control flow
          Basic PL/pgSQL Function
            ex: return a table
              CREATE FUNCTION select_logs_rt(param_user_name varchar)
              RETURNS TABLE (log_id int, user_name varchar(50), description text, log_ts timestamptz) AS 
              $$
              BEGIN RETURN QUERY
                SELECT log_id, user_name, description, log_ts FROM logs
                WHERE user_name = param_user_name;
              END;
              $$
              LANGUAGE 'plpgsql' STABLE;
          Writing Trigger Functions in pgSQL
            you can't write trigger functions in SQL
            steps
              1. write trigger function
              2. attach it to trigger
            ex: trigger function to timestamp new records
              CREATE OR REPLACE FUNCTION trig_time_stamper() RETURNS trigger AS
              $$
              BEGIN
                NEW.upd_ts := CURRENT_TIMESTAMP;
                RETURN NEW;
              END;
              $$
              LANGUAGE plpgsql VOLATILE;
              CREATE TRIGGER trig_1
              BEFORE INSERT OR UPDATE OF session_state, session_id
              ON web_sessions
              FOR EACH ROW EXECUTE PROCEDURE trig_time_stamper();
            trigger fire only if specific columns have changed
              BEFORE INSERT OR UPDATE OF session_state, session_id
          Writing PL/Python Functions
            install python extension
              # install python on server
              CREATE EXTENSION plpython3u;
            Basic Python Function
              ex: searching docs 
                CREATE OR REPLACE FUNCTION pgs_help_search(param_search text)
                RETURNS text AS
                $$
                import urllib, re
                response = urllib.urlopen('http://...' + param_search)
                raw_html = response.read()
                result = raw_html[raw_html.find("<!-- docbot-->") : raw_html.find("<!--contentWrap-->") -1]
                result = re.sub(..)
                return result
                $$ 
                LANGUAGE plpython2u SECURITY DEFINER STABLE;
              ex: calling it
                SELECT search_term, left(pgs_help_search(search_term), 125) AS result
                FROM (VALUES ('regexp_match'), ('pg_trgm')) As x(search_term);
              ex: list files in directories
                CREATE OR REPLACE FUNCTION list_incoming_files()
                RETURN SETOF text AS
                $$
                import os
                return os.listdir('/niincoming')
                $$ 
                LANGUAGE plpython2u VOLATILE SECURITY DEFINER;
              ex: cllanig
                SELECT filename
                FROM list_incoming_files() AS filename 
                WHERE filename ILIKE '%.csv'
            PL/V8
              Livescript: trusted
                more like python, haskell
              features
                faster than SQL
                window functions (also in R)
    chapter 10. Replication and External Data
      Replication Overview
        availability and scalability
        Replication Jargon
          Master
          Slave
          Write-ahead log (WAL)
          Synchronous
          Asynchronous
          Streaming
          Cascading replication
          Remastering
        Evolution of PosgreSQL Replication
          1. only async warm slaves
          2. async hot slave + streaming replication
          3. sync replication
          4. cascading streaming replication
        Third-Party Replication Options
          Slony, Bucardo
      Setting Up Replication
        Configuring the Master
        Configuring the Slaves
        Initiating the Replication Process
      Foreign Data Wrappers
        other data sources
          foreign tables
        Querying Flat Files
          install
            CREATE EXTENSION file_fdw;
          setup
            CREATE SERVER my_server FOREIGN DATA WRAPPER file_fdw;
            CREATE FOREIGN TABLE staging.devs (developer VARCHAR(150), company VARCHAR(150))
            SERVER my_server
            OPTIONS (format 'csv', header 'true', filename '/postgresql_book/ch10/devs.psv', delimiter '|', null '');
          query
            SELECT * FROM staging.devs WHERE developer like 'T%';
            DROP FOREIGN TABLE staging.devs;
        Querying a Flat File as Jagged Arrays
          jagged array
            flat file that has different number of columns in each line
            and contain multiple header rows and footer rows
          usually orignate from spreadsheets
        Querying Nonconventional Data Sources
          ex: web services
            www_fdw 
            setup
              CREATE EXTENSION www_fdw;
              CREATE SERVER www_fdw_server_google_search
              FOREIGN DATA WRAPPER www_fdw
              OPTIONS (uri 'http://ajax.googleapis.com/...');
            make a table
              CREATE FOREIGN TABLE www_fdw_google_search (
                q text
                GsearchResultClass text,
                ...
              ) SERVER www_fdw_server_google_search;
            query
              SELECT regexp_replace(title, E'..') As title
              FROM www_fdw_server_google_search where q = 'New PostgreSQL'
              LIMIT 2;






              
                


