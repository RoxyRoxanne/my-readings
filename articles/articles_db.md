    <url:file:///~/Dropbox (Personal)/mynotes/content/articles/articles_db.md>

_ id=r_lastid adb_009

# Articles DB

## OReilly.Designing.Data-Intensive.Applications.1449373321.pdf

    Preface
      data intensive app
        data is its primary challenge
          quantity, complexity, speed of data
        as opposed to compute-intensive
          where processing speed is bottleneck
    CHAPTER 1 Reliable, Scalable, and Maintainable Applications
      common functionality of data-intensive applications
        store and find data (databases)
        remember the result of expensive operations (caches)
        search by keyword (search indexes)
        send message to another process (stream processing)
        crunch large amount of accumulated data (batch processing)
      Thinking About Data Systems
        data systems
          why umbrella term data systems?
          any new tools emerged
            datastore used as message queues (redis)
            message queues with database-like durability (kafka)
          wide-ranging requirements not fulfilled by a single tool
            ex: application managed caching layer (memcached)
              full text search server (elasticsearch, solr)
              application's responsibility: to keep them in sync with main database
            when you combine several tools
              new special-purpose data system
            then you are both application developer + data system designer
        3 critical concerns:
          reliability: synstem should work correctly even in the face of adversity (errors)
          scalability: as system (volume, speed, complexity) grows, ways to deal with it
          maintainability: 
      Reliability
        reliability: continuing to work correctly, even when things go wrong
        faults: the things that can go wrong
        fault-tolerant or resilient: to cope with faults
        failure: system as a whole stops providing service
          fault: component of a system deviates from its spec
        goal: to prevent faults from causing failures
        Hardware Faults
          MTTF (mean time to failure): 10-50 years
          redundancy
        Software Errors
        Human Errors
          make it easy to do right thing
          sandbox environments
          test thoroughly
          allow easy recovery
          monitoring: telemetry
        How Important is Reliability?
      Scalability
        describing Load
          load parameters:
            ex: requests per second to a web server
              ration of reads to writes in a database
              number of simultaneously active users in 
              hit rate on a cache
            ex: twitter
              post tweet: 12k req/sec
              home timeline: 300k req/sec
              2 approaches
                classical relational
                write to memcached home timelines
              /Users/mertnuhoglu/Dropbox/public/img/ss-240.png
              better: to do more work at write time and less at read time
                write 312k tweet/sec to each timeline cache
                makes reading simpler
        describing performance
          what happens when load increases
            two ways:
            1. increase load and keep resources unchanged. how is performance?
            2. increase load. how much to increase resources to keep performance unchanged?
          hadoop: batch processing system
            we care about throughput
              number of records to process per second
          online systems: 
            we care: response time
              time between a request sending and response receiving
          latency and response time:
            response time: time to process request (service time). includes network and queuing delays
            latency: time a request waits to be handled (awaiting service)
          percentile: 99.9 percentile
            99.9% of users have response time of ...
          SLO: service level objectives
          SLA: service level agreements
            service is considered to be up if it has a median response time of less than 200 ms and a 99th percentile under 1 s
            service is required to be up at least 99.9% of the time
          queueing delays

## GraphQL

    Explaining GraphQL Connections
      https://dev-blog.apollodata.com/explaining-graphql-connections-c48b7c3d6976

## PostgreSQL

    json_populate_record
      select * from json_populate_record(null::x, '{"a":1,"b":2}')  
       a | b
      ---+---
       1 | 2
    select into 
      pgsql doesn't create table with "select into"
        https://stackoverflow.com/questions/11979154/select-into-to-create-a-table-in-pl-pgsql
          use: create table as
            CREATE TEMP TABLE mytable AS
            SELECT *
            FROM orig_table;
          https://www.postgresql.org/docs/current/static/sql-selectinto.html
          note: CREATE TABLE AS is functionally similar to SELECT INTO. CREATE TABLE AS is the recommended syntax, since this form of SELECT INTO is not available in ECPG or PL/pgSQL, because they interpret the INTO clause differently. Furthermore, CREATE TABLE AS offers a superset of the functionality provided by SELECT INTO.
      https://www.w3schools.com/SQl/sql_select_into.asp
        ex: copy all columns into new table
          SELECT *
          INTO newtable [IN externaldb]
          FROM oldtable
          WHERE condition;
        ex: creates a backup copy
          SELECT * INTO CustomersBackup2017
          FROM Customers;
        ex: backup in another database
          SELECT * INTO CustomersBackup2017 IN 'Backup.mdb'
          FROM Customers;
      http://www.dofactory.com/sql/select-into
        ex
          SELECT column-names
            INTO new-table-name
            FROM table-name
           WHERE EXISTS 
                (SELECT column-name
                   FROM table-name
                  WHERE condition)
    record type
      https://www.postgresql.org/docs/9.0/static/plpgsql-declarations.html#PLPGSQL-DECLARATION-RECORDS
      <name> RECORD;
      similar to row-type variables
        but have no predefined structure
        like tuple
        they take row structure of the row they are assigned during a SELECT or FOR
      it is not a true data type, only a placeholder
      when pgsql function returns type record
        record variable can change its row structure on the fly
    change current_schema
      first schema in search path is current schema
      ex
        set search_path = data, public;
        select settings.set('auth.data-schema', current_schema);
    store check passwords crypt()
      https://www.postgresql.org/docs/current/static/pgcrypto.html
        Example of setting a new password:
          UPDATE ... SET pswhash = crypt('new password', gen_salt('bf'));
        Example of authentication:
          SELECT (pswhash = crypt('entered password', pswhash)) AS pswmatch FROM ... ;
        This returns true if the entered password is correct.
    list tables: \dt
      ex:
        # \dt settings.
        List of relations
        Schema  |  Name   | Type  |   Owner
       ----------+---------+-------+-----------
       settings | secrets | table | superuser
    list functions: \df
      ex:
        # \df settings.
        List of functions
        Schema  | Name | Result data type | Argument data types |  Type
        ----------+------+------------------+---------------------+--------
        settings | get  | text             | text                | normal
        settings | set  | void             | text, text          | normal 
    single quote vs double quote for text variables
      single quote vs. double quote
        strings: always single quoted
          double quote as: '' (double single quote)
        double quotes used only for quoted identifiers
      ex
        # SELECT settings.get('jwt_secret');
          get
          ----------------------------------
          reallyreallyreallyreallyverysafe
        # SELECT settings.get("jwt_secret");
          error: column "jwt_secret" does not exist
    echo variables of psql
      ex:
        # \set test1 hello
        # \echo :test1
        hello
      ex
        # \setenv base_dir :DIR
        # \set test2 `echo $base_dir`
        # \echo :test2
        :DIR
    Difference between set, \set and \pset in psql
      https://stackoverflow.com/questions/29593908/difference-between-set-set-and-pset-in-psql#29594391
      SET: sql command
      \set \pset: psql meta-commands
      SET
        to change runtime params
        executed on server
      \set psql local variables 
      \pset: affecting the output of query result tables
      ex: 
        SET ROLE dba;
        \set time 'select current_timestamp'
        \pset border 2
    GRANT USAGE
      https://stackoverflow.com/questions/2126225/why-is-a-grant-usage-created-the-first-time-i-grant-a-user-privileges#3972085
        USAGE === "no privileges"
      https://stackoverflow.com/questions/17338621/what-grant-usage-on-schema-exactly-do#17355059
        rights tests are done in order:
          1. do you have USAGE on schema?
          2. do you have appropriate rights on table?
          3. check column privileges
        USAGE on schema, not on objects within the schema
        it is like a directory teree
          ex: somedir/somefile
            rwx------ on dir
            rw------- on file
        in general use this configuration:
          --ACCESS DB
          REVOKE CONNECT ON DATABASE nova FROM PUBLIC;
          GRANT  CONNECT ON DATABASE nova  TO user;
          --ACCESS SCHEMA
          REVOKE ALL     ON SCHEMA public FROM PUBLIC;
          GRANT  USAGE   ON SCHEMA public  TO user;
          --ACCESS TABLES
          REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC ;
          GRANT SELECT                         ON ALL TABLES IN SCHEMA public TO read_only ;
          GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO read_write ;
          GRANT ALL                            ON ALL TABLES IN SCHEMA public TO admin ;
    PostgreSQL Recursive Query By Example id=adb_005
      PostgreSQL Recursive Query By Example <url:#r=adb_005>
      http://www.postgresqltutorial.com/postgresql-recursive-query/
      used for hierarchical queries
        ex: product bill, organization hierarchy
      general form
        WITH RECURSIVE cte_name(
            CTE_query_definition -- non-recursive term
            UNION [ALL]
            CTE_query definion  -- recursive term
        ) SELECT * FROM cte_name;
      ex:
        recursive query
          WITH RECURSIVE subordinates AS (
            SELECT employee_id, manager_id, full_name
              FROM employees
              WHERE employee_id = 2
            UNION
            SELECT e.employee_id, e.manager_id, e.full_name
              FROM employees e
              INNER JOIN subordinates s ON s.employee_id = e.manager_id
          ) 
          SELECT * FROM subordinates;
        two parts:
          1. before UNION: non-recursive
            | employee_id | manager_id | full_name   |
            | 2           | 1          | Megan Berry |
          2. after UNION: recursive
          | employee_id | manager_id | full_name     |
          | 6           | 2          | Bella Tucker  |
          | 7           | 2          | Ryan Metcalfe |
    psql
      17 Practical psql Commands
        http://www.postgresqltutorial.com/psql-commands/
        connect
          psql -d database -U  user -W
            asks password
        switch to new database
          \c <dbname> <username>
        list available databases: \l
        list tables: \dt
          more: \dt+
        describe a table: \d <table_name>
          more: \d+ <table>
        list schemas: \dn
        list functions: \df
        list views: \dv
        list users and roles: \du
          more information: \du+
        execute previous command: \g
        command history: \s
        save command history: \s <filename>
        exec commands from file: \i <filename>
        send query results to file: \o <file>
        get help: \?
        help on statement: \h <ALTER TABLE>
        turn on query exec time: \timing
        edit command in editor: \e
        edit function in editor: \ef <function_name>
        quit: \q
        query buffer
          reset query buffer: \r
          write query buffer: \w <file>
        general
          exec command in shell: \! <command>
          show/set encoding: \encoding <enc>
          change working dir: \cd <dir>
    PostgreSQL Cheat Sheet
      http://www.postgresqltutorial.com/postgresql-cheat-sheet/
      connect
        psql -U <username>
        \c <database_name>
      pretty format: \x
      create new role:
        CREATE ROLE <role_name>;
        CREATE ROLE <username> NOINHERIT LOGIN PASSWORD <password>;
      change role for session:
        SET ROLE <role>;
      allow <role_1> to set its role as <role_2>
        GRANT role_2 TO role_1;
      create db
        CREATE DATABASE [IF NOT EXISTS] db_name
      delete db
        DROP DATABASE [IF EXISTS] db_name
      managing tables
        add new column
          ALTER TABLE table_name ADD COLUMN new_col TYPE;
        drop column
          ALTER TABLE table_name DROP COLUMN col1;
        rename column
          ALTER TABLE table_name RENAME col1 TO col2;
        add primary key
          ALTER TABLE table_name ADD PRIMARY KEY (column,...)
        remove pk
          ALTER TABLE table_name DROP CONSTRAINT pk_constraint_name
        rename table
          ALTER TABLE table_name RENAME TO new_table
      managing views
        create a view
          CREATE OR REPLACE view_name AS query
        create recursive view
          CREATE RECURSIVE VIEW view_name(columns) AS query
        create materialized view
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
      Postgrest Manual <url:file:///~/Dropbox/mynotes/content/articles/articles_db.md#r=g_10158>
      Postgrest Starter Kit Manual  <url:#r=adb_003>
      Stop calling PostgREST “MAGIC”!
        https://medium.freecodecamp.org/stop-calling-postgrest-magic-8f3e1d5e5dd1
        Whats in a URL
          ex
            GET /items/1
            SELECT * FROM items WHERE id=1
          postgrest :: Schema -> HTTP -> SQL
          ex
            GET /items?select=id,name&id=gt.10&order=name
            SELECT id, name FROM items WHERE id > 10 ORDER BY name
        The three magic ingredients
          JSON encoding
            ex: postgrest generates:
              WITH essence AS (
                SELECT id, name FROM items WHERE id > 10 ORDER BY name
              )
              SELECT 
                coalesce(
                  array_to_json(array_agg(row_to_json(response))),
                  '[]'
                )::character varying AS BODY
              FROM (SELECT * FROM essence) response
          Authentication / Authorization
            pgrest connects using a role "authenticator"
              the role has no privileges aside from login
            when an authenticated request comes in, and there is an Authorization header that contains a JWT token, pgrest decodes the token, verify it is valid, and look at it payload for field "role"
              say role has "alice"
              ie. this request will be executed with privileges of "alice"
                to do this, pgs switches the current user
                  SET ROLE alice
              ex:
                BEGIN;
                SET LOCAL role TO 'alice'; 
                -- query
                COMMIT;
              for this, you say that "authenticator" has the right to assume "alice" role:
                GRANT alice TO authenticator;
            benefits:   
              no imperative code to check authorization
              no latency due to this
            pgs has full picture:
              who is issuing the query (role)
              his privileges (grants)
              his restrictions (RLS)
            query planner can do much better job
              get faster over time
          Resource Embedding
            pgrest can do basic CRUD and more
            trick: &select= parameter
            ex
              GET /items?select=id,name,subitems(id,name)
            similar to GraphQL
              replace () with {}
            how does this work?
              at boot time:
                pgrest runs a bunch of queries
                  to understand 
                    what entities live
                    relations between them
                      based on fks
                when you say "subitems(...)
                  it knows table "items" is related to "subitems" through fk "item_id"
                  thus it can generate join query
            ex:
              SELECT items.id, items.name,
                COALESCE(
                  ( 
                    SELECT array_to_json(array_agg(row_to_json(subitems)))
                    FROM (
                      SELECT subitems.id, subitems.name
                      FROM subitems
                      WHERE subitems.item_id = items.id
                    ) subitems
                  ),
                  '[]'
                ) AS subitems
              FROM items
        But why (do we need PostgREST)?
        Do one thing well
          You'll no longer write APIs, you'll be defining and configuring them
        Beyond REST
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
      Swagger
        1. run swagger-ui
          docker run -p 80:8080 swaggerapi/swagger-ui
        2. open swagger
          http://localhost
        3. swagger > explore > 
          localhost:3000
            enter url of postgrest api uri
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
          ex: allow all users to access their own row:
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
              SET ROLE admin;
              TABLE passwd;
              SET ROLE alice;
              TABLE passwd;
              # ERROR
              SELECT user_name from passwd;
              UPDATE passwd set user_name = 'joe';
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
      chapter 35. The Information Schema
        35.1. The Schema
        35.2. Data Types
        35.3. information_schema_catalog_name
          database name
        35.4. administrable_role_authorizations
          current user has admin option for these roles
        35.5. applicable_roles
          all roles whose privileges current user can use
          columns: grantee, role_name, is_grantable
        35.6. attributes
          attributes of composite data types
        35.7. character_sets
          character sets available
          columns: character_set_name
            UTF8
        35.8. check_constraint_routine_usage
          functions used by a check constraint
        35.9. check_constraints
        35.10. collations
        35.11. collation_character_set_applicability
        35.12. column_domain_usage
        35.13. column_options
        35.14. column_privileges
          kolonlara erişim yetkileri 
        35.15. column_udt_usage
          data types of columns
        35.16. columns
          all table columns in database
        35.17. constraint_column_usage
          columns used by some constraint
        35.18. constraint_table_usage
          tables used by some constraint
        35.19. data_type_privileges
        35.20. domain_constraints
        35.21. domain_udt_usage
        35.22. domains
        35.23. element_types
        35.24. enabled_roles
        35.25. foreign_data_wrapper_options
        35.26. foreign_data_wrappers
        35.27. foreign_server_options
        35.28. foreign_servers
        35.29. foreign_table_options
        35.30. foreign_tables
        35.31. key_column_usage
        35.32. parameters
        35.33. referential_constraints
        35.34. role_column_grants
        35.35. role_routine_grants
        35.36. role_table_grants
        35.37. role_udt_grants
        35.38. role_usage_grants
        35.39. routine_privileges
        35.40. routines
        35.41. schemata
        35.42. sequences
        35.43. sql_features
        35.44. sql_implementation_info
        35.45. sql_languages
        35.46. sql_packages
        35.47. sql_parts
        35.48. sql_sizing
        35.49. sql_sizing_profiles
        35.50. table_constraints
        35.51. table_privileges
        35.52. tables
        35.53. transforms
        35.54. triggered_update_columns
        35.55. triggers
        35.56. udt_privileges
        35.57. usage_privileges
        35.58. user_defined_types
        35.59. user_mapping_options
        35.60. user_mappings
        35.61. view_column_usage
        35.62. view_routine_usage
        35.63. view_table_usage
        35.64. views

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
          numeric types
            int
            numeric(precision)
            real double float(precision)
            serial
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
              impersonation
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
      Using Schemas
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
          select x FROM generate_series(1,20,1) As x
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
            SELECT array_agg(log_ts) FROM logs WHERE log_ts BETWEEN ...
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
            INSERT INTO employment (employee, period) VALUES ('Alex', '[2012-04-24, infinity)'::daterange)
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
            SELECT row_to_json(f) FROM families_j As f
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
          ref
            PostgreSQL Recursive Query By Example <url:#r=adb_005>
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

## Postgrest Manual id=g_10158

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
            export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidG9kb191c2VyIn0.nZ1wYdWinlOGkzh_FE6CP0cJo4W8IWETc6LVtnEO2P0"
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
                  proxy_pass http://postgrest/;
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
            to describe size of results
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
            Accept: application/vnd.pgrst.object+json
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

## Postgrest Starter Kit Manual id=adb_003

    Postgrest Starter Kit Manual <url:#r=adb_003>
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
          export CLUSTER_NAME=mycluster
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
      API Core
        Schemas 
          Data Schema
            schema: data
            sql file: db/src/data/tables.sql
              create table client (...)
              create index client_user_id_index on client(user_id);
              create table project (...)
              create index project_user_(d_index on project(user_id);
              create index project_client_id_index on project(client_id);
              create table task (...)
              create index task_user_id_index ...
              create index task_project_id_index ...
              create table project_comment (...)
              ...
              create table task_comment (...)
            "user_id" in each table
              it will help to enforce access rights for each row
                instead of complicated joins
            two tables for comments
              not good
              but will show how to decouple API from tables
            sql file: db/src/data/schema.sql
              ...
              -- import application models
              \ir todo.sql
              \ir tables.sql
          Api Schema
            schema: api
              used for exposing REST
              contains only views and functions
            sql file: db/src/api/views_and_procedures.sql
              create view clients as
                select id, ... from data.client;
              create view projects as
                select id, ... from data.project;
              ...
            sql file: db/src/api/schema.sql
              -- ...
              -- our endpoints
              \ir todos.sql
              \ir views_and_procedures.sql
            note:
              we expose only fields and tables we want
          Sample Data
            tool: datafiller to generate data
            sql file: db/src/sample_data/data.sql
              ...
              set search_path = data,public;
              \echo # client
              COPY client (id,name,...) FROM STDIN (FREEZE ON); 
              1  Apple  address_1_   1   ...
              2  ...
              ...
              ALTER SEQUENCE client_id_seq RESTART WITH 4;
              ...
              ANALYZE client;
              ...
            sql file: db/src/sample_data/reset.sql
              BEGIN;
              \set QUIET on
              ...
              truncate todo restart identity cascade;
              ...
              \ir data.sql
              COMMIT;
            test it
              curl -H ".." http:.../clients?select=id,name
              # {"permission error"}
        Securing your API
          Access rights to API entities
            goal: give authenticated API users the ability to access endpoints
              ie. grant them rights to views in api schema
            sql file: db/src/authorization/privileges.sql
              -- ...
              grant select, insert, update, delete
              on api.clients, api.projects, ...
              to webuser;
            test it
              curl -H ".." http:.../clients?select=id,name
              # [{"id":1,...}]
            issue: any user can modify existing data and see all of it
          The magic "webusers" role and mystery $JWT token
            "webuser" role is created in roles.sql
          Row Level Security
            code
              views_and_procedures.sql
                # change owners of views to "api" role
                ...
                alter view clients owner to api;
              privileges.sql
                " restrict rows a user can access
                ...
                grant select, ... on client to api;
                create policy access_own_rows on client to api
                using (request.user_role() = 'webuser' and request.user_id() = user_id )
                with check (request.user_role() = 'webuser' and request.user_id() = user_id);
                ...
            test it: returns only my rows
              curl -H ".." http:.../clients?select=id,name
              # [{"id":1,...}]
            when data inserted:
              give a default value for "user_id"
                user_id      int not null references "user"(id) default request.user_id(),
          Authentication
            how do users log in?
              functions come into play
            we use functions from "auth" lib
            ex:
              curl -H .. -d '{"email":..}' http://../rpc/login
          Input Validation
            ex
              create table client (
                ..
                check (length(name)>2 and length(name)<100),
                check (updated_on is null or updated_on > created_on)
          Mutations on complex views
            ex
              create or replace function mutation_comments_trigger() returns trigger as $$
              ...
                  elsif (tg_op = 'UPDATE') then
                      if (new.parent_type = 'task' or old.parent_type = 'task') then
                          update data.task_comment 
                          set 
                              body = coalesce(new.body, old.body),
                              task_id = coalesce(new.task_id, old.task_id)
                          where id = old.id
                          returning * into c;
                          if not found then return null; end if;
                          return (c.id, c.body, 'task'::text, c.task_id, null::int, c.task_id, c.created_on, c.updated_on);
                      elsif (new.parent_type = 'project' or old.parent_type = 'project') then
          Progress
            ex:
              curl ...
              http://localhost:8080/rest/clients \
              --data-urlencode select="id,name,projects(id,name,comments(body),tasks(id,name,comments(body)))" | \
              python -mjson.tool
      Using the API
        REST
          ex: get projects of a client and all active tasks
            curl ...
            /projects
            --data-urlencode select="id,name,tasks(id,name)" \
            --du client_id="eq.1" \
            --du tasks.completed="eq.false"
          ex: add a client and return its new id 
            curl ...
            -d '{"name":"Google",..}'
            /clients?select=id,created_on
          ex: update projects name
            -d {"name":"updated name"}
            /projects?select=id,name&id=eq.1
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
        Restricting filtering capabilities
          ex: prevent filtering by a column that is not part of an index
            hooks.lua
              local function check_filters()
              end
        Reacting to database events 
          %90 of what an API does is CRUD
          how it works
            whenever an event occurs
            you send a message to Message queue (events table)
              insert a row
            another system (a script) reads rows
              performs additional tasks
    Tutorial steps - postgrest starter kit id=g_10159
      Tutorial steps - postgrest starter kit <url:file:///~/Dropbox/mynotes/content/articles/articles_db.md#r=g_10159>
      cd khumbuicefall
        .env
        docker-compose.yml
          - "postgresstore:/var/lib/postgresql/data"
          volumes:
            postgresstore:
        docker-compose up -d 
        curl http://localhost:8080/rest/todos?select=id
        # install subzero-cli
        npm install -g subzero-cli
        subzero dashboard
      connect db
        credentials - datagrip intellij
          DB_NAME=app
          DB_SCHEMA=api
          SUPER_USER=superuser
          SUPER_USER_PASSWORD=superuserpass
        psql
          docker exec -it postgreststarterkit_db_1 bash
          docker exec -it postgreststarterkit_db_1 psql -d app -h localhost -p 5432 -U superuser
          psql -d app -h localhost -p 5432 -U superuser
        DataGrip
          connection > Schemase
            app > api
        pgAdmin
          connection > Databases > app > Schemas > api
      pretty json
        curl -s ... | python -mjson.tool
      authenticated call
        export JWT_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoid2VidXNlciJ9.uSsS2cukBlM6QXe4Y0H90fsdkJSGcle9b7p_kMV1Ymk
        curl -H "Authorization: Bearer $JWT_TOKEN" http://localhost:8080/rest/todos?select=id,todo
      ~/codes/pg/khumbuicefall/db/src/sample_data/data.sql
        change: item_1 to updated
      Schemas
        Data Schema
          add new tables to schema "data"
            db/src/data/tables.sql: 
              create table client (
                id           serial primary key,
                ...
            db/src/data/schema.sql:
              \ir tables.sql
        Api Schema
          add new views to schema "api"
            db/src/api/views_and_procedures.sql
              create or replace view clients as
              select id, name, address, created_on, updated_on from data.client;
              ...
            db/src/api/schema.sql
              \ir views_and_procedures.sql
          # so we decoupled implementation details (underlying source tables) from API we expose using views
        Sample Data
          db/src/sample_data/data.sql
            COPY client (id,name,address,user_id,created_on,updated_on) FROM STDIN (FREEZE ON);
            1 Apple address_1_  1 2017-07-18 11:31:12 \N
          db/src/sample_data/reset.sql
          test
            curl -H "Authorization: Bearer $JWT_TOKEN" http://localhost:8080/rest/clients?select=id,name
            # permission denied
              we need to state who can access what resource
      Securing Your API
        Access rights to API entities
          db/src/authorization/privileges.sql
            grant select, insert, update, delete 
            on api.clients, api.projects, api.tasks, api.comments
            to webuser;
          test
            curl -H "Authorization: Bearer $JWT_TOKEN" http://localhost:8080/rest/clients?select=id,name
            # response correct
        The magic "webusers" role and the mystery $JWT token
          "webuser" role created in roles.sql
            db/src/authorization/roles.sql
            differentiate between logged-in users "webuser" and rest "anonymous"
        Row Level Security
          limit access of users to their rows only
            db/src/api/views_and_procedures.sql
              alter view clients owner to api;
              ...
            db/src/authorization/privileges.sql
              create policy access_own_rows on client to api
              using ( request.user_role() = 'webuser' and request.user_id() = user_id )
              with check ( request.user_role() = 'webuser' and request.user_id() = user_id);
              ...
            test
              curl -H "Authorization: Bearer $JWT_TOKEN" http://localhost:8080/rest/clients?select=id,name
              # [{"id":1,"name":"Apple"},{"id":2,"name":"Microsoft"}]
            default value for user_id:
              user_id      int not null references "user"(id),
              -->
              user_id      int not null references "user"(id) default request.user_id(),
        Authentication
          how do users signup and log in?
            stored procedures defined in "api" schema
            use functions when sth cannot be expressed using a single query
          login:
            curl \
            -H "Content-Type: application/json" \
            -H "Accept: application/vnd.pgrst.object+json" \
            -d '{"email":"alice@email.com","password":"pass"}' \
            http://localhost:8080/rest/rpc/login
          response:
            {
              "me":{"id":1,"name":"alice","email":"alice@email.com","role":"webuser"},
              "token":"xxxxxxxxxxxxx"
            }
        Input Validation
          check if rules are applied:
            curl \
            -H "Authorization: Bearer $JWT_TOKEN" \
            -H "Content-Type: application/json" \
            -H 'Prefer: return=representation' \
            -d '{"name":"A"}'  \
            http://localhost:8080/rest/clients
            # error: permission denied for sequence client_id_seq
          db/src/authorization/privileges.sql
            grant usage on sequence data.client_id_seq to webuser;
            ...
          test:
            curl ... http://localhost:8080/rest/clients
            # new row
          add constraints
            db/src/data/tables.sql
              check (length(name)>2 and length(name)<100),
              check (updated_on is null or updated_on > created_on)
          test:
            curl ... http://localhost:8080/rest/clients
            # {"hint":null,"details":null,"code":"23514","message":"new row for relation \"client\" violates check constraint \"client_name_check\""}
          test2:
            curl ... -d '{"name":"Uber"}'  
        Mutations on complex views
          db/src/libs/util/schema.sql
            drop schema if exists util cascade;
            create schema util;
            set search_path = util, public;
          db/src/libs/util/mutation_comments_trigger.sql
            create or replace function mutation_comments_trigger() returns trigger as $$
              ..
              elsif (tg_op = 'UPDATE') then
                  if (new.parent_type = 'task' or old.parent_type = 'task') then
                      update data.task_comment 
                      set 
                          body = coalesce(new.body, old.body),
                          task_id = coalesce(new.task_id, old.task_id)
                      where id = old.id
                      returning * into c;
                      if not found then return null; end if;
                      return (c.id, c.body, 'task'::text, c.task_id, null::int, c.task_id, c.created_on, c.updated_on);
          db/src/libs/util/schema.sql
            \ir mutation_comments_trigger.sql;
          db/src/init.sql
            -- add this line just below the place where rabbitmq lib is included
            \ir libs/util/schema.sql
          db/src/api/views_and_procedures.sql
            create trigger comments_mutation
            instead of insert or update or delete on comments
            for each row execute procedure util.mutation_comments_trigger();
          test
            curl -s -X POST \
            -H "Authorization: Bearer $JWT_TOKEN" \
            -H "Content-Type: application/json" \
            -H "Accept: application/vnd.pgrst.object+json" \
            -H 'Prefer: return=representation' \
            -d '{"body": "Hi there!","parent_type": "task","task_id":1}'  \
            http://localhost:8080/rest/comments| \
            python -mjson.tool
          response:
            {
              "id": 3,
              "body": "Hi there!",
              ..
        Progress
          get comments
            curl -s -G \
            -H "Authorization: Bearer $JWT_TOKEN" \
            http://localhost:8080/rest/clients \
            --data-urlencode select="id,name,projects(id,name,comments(body))" | \
            python -mjson.tool
          how much code did we write 
            cloc --include-lang=SQL db/src/api/views_and_procedures.sql db/src/data/tables.sql db/src/authorization/privileges.sql db/src/libs/util/
      next

## Other

    Return setof record (virtual table) from function
      https://stackoverflow.com/questions/955167/return-setof-record-virtual-table-from-function
      code
        CREATE OR REPLACE FUNCTION f_foo(open_id numeric)
          RETURNS TABLE (a int, b int, c int) AS
        $func$
        BEGIN
           -- do something with open_id?
           RETURN QUERY VALUES
             (1,2,3)
           , (3,4,5)
           , (3,4,5);
        END
        $func$  LANGUAGE plpgsql IMMUTABLE ROWS 3;
      Call:
        SELECT * FROM f_foo(1);
      major points
        Use RETURNS TABLE to define an ad-hoc row type to return.
        Or RETURNS SETOF mytbl to use a pre-defined row type.
        Use RETURN QUERY to return multiple rows with one command.
        Use a VALUES expression to enter multiple rows manually. This is standard SQL and has been around for ever.
        Use a parameter name (open_id numeric) instead of ALIAS, which is discouraged for standard parameter names. In the example the parameter isn't used and just noise ...
        No need for double-quoting perfectly legal identifiers. Double-quotes are only needed to force otherwise illegal names (mixed-case, illegal characters or reserved words).
    Debugging your PL_pgSQL code-pOb-7JZQoW4.webm
      pgAdmin
        breakpoints inside functions
      plprofiler
        runs a query inside profiler
    Upsert
      INSERT ..
      ON CONLICT(pk_field)
      UPDATE ..
    SQL and Business Logic
      http://tapoueh.org/blog/2017/06/sql-and-business-logic/
      pgloader:
        load csv, mysql etc files like copy
    SQL Joins with On or Using
      https://lornajane.net/posts/2012/sql-joins-with-on-or-using
      why: you use ON for most things, but USING is a handy shorthand for the situation where the column names are the same
      ex:
        select owners.name as owner, pets.name as pet, pets.animal 
          from owners join pets USING (owners_id);
        ===
        select owners.name as owner, pets.name as pet, pets.animal 
          from owners join pets ON (pets.owners_id = owners.owners_id);
    Becoming a SQL Guru-cL8QZ2yyFCM.mp4
      Set Operations
        Union vs union all
          union: distinct rows only
          ex:
            select city from customers
            UNION ALL
            select city from suppliers
          ex:
            select city from customers
            UNION 
            select city from suppliers
        Except vs intersect
          ex:
            select city from customers
            EXCEPT
            select city from suppliers
          ex:
            select city from customers
            INTERSECT
            select city from suppliers
      Filtered Aggregates
        before:
          select 
            sum(revenue) as total_revenue,
            sum(CASE
              WHEN country = 'USA'
                THEN revenue
              ELSE 0
              END) as USA_revenue
          from suppliers
        after:
          select 
            sum(revenue) as total_revenue,
            sum(revenue) FILTER (where country = 'USA') as USA_revenue
          from suppliers
    Grouping Sets, Cube, Rollup
      like pivot tables
      Grouping sets: allows creation of sets wherein a subtotal is calculated for each set
      Rollup: allows for creating of hierarchical 
      Cube: 
    Example Questions from Stackoverflow
      how people ask questions?
        opt1: equivalent of the following mysql command
        opt2: i want to do this: select * ... but there is an error. 
        opt3: i can do this. but i want more in addition to it: ...
        opt4: i do this. but sometimes i get this error. how can i do this?
        opt5: show table sample and table ddl
          id | fixture
         ----|----------
           1 |    1
           1 |    2
           2 |    3
         CREATE TABLE channel(
           id INT NOT NULL PRIMARY KEY,
           fixture INT NOT NULL
           );
        opt6: prepare sqlfiddle page
        opt7: \d+ bss.amplifier_saturation
      https://stackoverflow.com/questions/653714/insert-results-of-a-stored-procedure-into-a-temporary-table
      https://stackoverflow.com/questions/452859/inserting-multiple-rows-in-a-single-sql-query
      https://stackoverflow.com/questions/63447/how-do-i-perform-an-if-then-in-an-sql-select
        q
          How do I perform an IF...THEN in an SQL SELECT statement?
          For example:
          SELECT IF(Obsolete = 'N' OR InStock = 'Y' ? 1 : 0) AS Saleable, * FROM Product
      https://stackoverflow.com/questions/109325/postgresql-describe-table
        q
          How do you perform the equivalent of Oracle's DESCRIBE TABLE in PostgreSQL (using the psql command)?
      https://stackoverflow.com/questions/769683/show-tables-in-postgresql
        q
          What's the alternative to SHOW TABLES (from MySQL) in PostgreSQL?
      https://stackoverflow.com/questions/1109061/insert-on-duplicate-update-in-postgresql
        q
          Several months ago I learned from an answer on Stack Overflow how to perform multiple updates at once in MySQL using the following syntax:
          INSERT INTO table (id, field, field2) VALUES (1, A, X), (2, B, Y), (3, C, Z)
          ON DUPLICATE KEY UPDATE field=VALUES(Col1), field2=VALUES(Col2);
      https://stackoverflow.com/questions/7869592/how-to-do-an-update-join-in-postgresql
        q
          Basically, I want to do this:
          UPDATE vehicles_vehicle v 
              JOIN shipments_shipment s on v.shipment_id=s.id 
          SET v.price=s.price_per_vehicle;
      https://stackoverflow.com/questions/2596670/how-do-you-find-the-row-count-for-all-your-tables-in-postgres
        q
          I'm looking for a way to find the row count for all my tables in Postgres. I know I can do this one table at a time with:
          SELECT count(*) FROM table_name;
          but I'd like to see the row count for all the tables and then order by that to get an idea of how big all my tables are.
      https://stackoverflow.com/questions/4069718/postgres-insert-if-does-not-exist-already
        q
          because some of my rows are identical, I get the following error:
            psycopg2.IntegrityError: duplicate key value  
              violates unique constraint "hundred_pkey"
          How can I write an 'INSERT unless this row already exists' SQL statement?
          I've seen complex statements like this recommended:
          ...
      https://stackoverflow.com/questions/16677191/sql-one-to-many
        q
          I cannot have a table :
           id | fixture
          ----|----------
            1 |    1
            1 |    2
            2 |    3
          CREATE TABLE channel(
            id INT NOT NULL PRIMARY KEY,
            fixture INT NOT NULL
            );
          ...
      https://stackoverflow.com/questions/10292355/how-do-i-create-a-real-one-to-one-relationship-in-sql-server
        q
          I have two tables tableA and tableB, I set tableB's primary key as foreign key which references  tableA's primary. But when I use Entity Framework database-first, the model is 1 to 0..1.
          Any one know how to create real 1 to 1 relationship in database?
      https://stackoverflow.com/questions/15251761/sql-query-one-to-many-relationship
        q
          Example Employee table
          ╔════╦══════╗
          ║ ID ║ NAME ║
          ╠════╬══════╣
          ║  1 ║ Bob  ║
          ║  2 ║ Tom  ║
          ║  3 ║ John ║
          ╚════╩══════╩
      https://dba.stackexchange.com/questions/90128/unused-index-in-range-of-dates-query/90183#90183
        code
          mustang=# \d+ bss.amplifier_saturation
                                                         Table "bss.amplifier_saturation"
           Column |           Type           |                             Modifiers                             | Storage | Description 
          --------+--------------------------+-------------------------------------------------------------------+---------+-------------
           value  | integer                  | not null                                                          | plain   | 
           target | integer                  | not null                                                          | plain   | 
      next
        https://stackoverflow.com/questions/17946221/sql-join-and-different-types-of-joins
    Subquery Examples
      http://www.zentut.com/sql-tutorial/sql-subquery/
        WHERE set
          SELECT ... WHERE field IN (SELECT field2 FROM ...)
        expression
          to substitute an expression in SQL
            SELECT field1, 
              (SELECT AVG(unitprice) FROM products AS 'avg_price'),
              (unitprice - (SELECT AVG(unitprice) FROM products)) as diff
            FROM products
            WHERE category_id = 1
        these subqueries execute independently
          alternative: correlated subquery
            executed dependently of some outer query
      http://www.zentut.com/sql-tutorial/understanding-correlated-subquery/
        in SELECT clause
          for each row of Customers table runs the subquery
          SELECT 
              companyname,
              city,
              (SELECT SUM(unitprice * quantity)
               FROM orders
               INNER JOIN orderdetails ON orderdetails.orderid = orders.orderid
               WHERE orders.customerid = customers.customerid) AS total
          FROM customers
          ORDER BY total DESC
          LIMIT 5;
        in WHERE clause
          SELECT companyname, city
          FROM customers
          WHERE 100000 < (
                  SELECT SUM(unitprice * quantity)
                  FROM orders
                  INNER JOIN orderdetails ON orderdetails.orderid = orders.orderid
                  WHERE orders.customerid = customers.customerid);
        in HAVING clause
          SELECT t1.categoryID, categoryName
          FROM products t1
          INNER JOIN categories c ON c.categoryID = t1.categoryID
          GROUP BY categoryID
          HAVING MAX(unitprice) > ALL (
             SELECT  2 * AVG(unitprice)
             FROM products t2
             WHERE t1.categoryID = t2.categoryID)
    Optimize GROUP BY query to retrieve latest record per user id=adb_007
      Optimize GROUP BY query to retrieve latest record per user <url:#r=adb_007>
      https://stackoverflow.com/questions/25536422/optimize-group-by-query-to-retrieve-latest-record-per-user/25536748#25536748
      code
        CREATE TABLE user_msg_log (
            aggr_date DATE,
            user_id INTEGER,
            running_total INTEGER
        );
        SELECT user_id, max(aggr_date), max(running_total) 
        FROM user_msg_log 
        WHERE aggr_date <= :mydate 
        GROUP BY user_id
      index: user_msg_log(aggr_date)
      query very slow. what index to define?
      multicolumn index
        CREATE INDEX user_msg_log_combo_idx
          ON user_msg_log (user_id, aggr_date DESC NULLS LAST)
      recursive cte
        WITH RECURSIVE cte AS (
           (
           SELECT u  -- whole row
           FROM   user_msg_log u
           WHERE  aggr_date <= :mydate
           ORDER  BY user_id, aggr_date DESC NULLS LAST
           LIMIT  1
           )
           UNION ALL
           SELECT (SELECT u1  -- again, whole row
                   FROM   user_msg_log u1
                   WHERE  user_id > (c.u).user_id  -- parentheses to access row type
                   AND    aggr_date <= :mydate     -- repeat predicate
                   ORDER  BY user_id, aggr_date DESC NULLS LAST
                   LIMIT  1)
           FROM   cte c
           WHERE  (c.u).user_id IS NOT NULL        -- any NOT NULL column of the row
           )
        SELECT (u).*                               -- finally decompose row
        FROM   cte
        WHERE  (u).user_id IS NOT NULL             -- any column defined NOT NULL
        ORDER  BY (u).user_id;
    Index-only scans
      https://wiki.postgresql.org/wiki/Index-only_scans
      allows certain queries to be run just by getting data from indexes, not from tables
      Example queries where index-only scans could be used in principle
        select count(*) from categories;
          assuming: an index on a column
        select 1st_indexed_col, 2nd_indexed_col from categories;
          assuming: composite index 1. 2. col
    Unused index in range of dates query
      https://dba.stackexchange.com/questions/90128/unused-index-in-range-of-dates-query/90183#90183
      code
        mustang=# \d+ bss.amplifier_saturation
                                                       Table "bss.amplifier_saturation"
         Column |           Type           |                             Modifiers                             | Storage | Description 
        --------+--------------------------+-------------------------------------------------------------------+---------+-------------
         value  | integer                  | not null                                                          | plain   | 
         target | integer                  | not null                                                          | plain   | 
      code
        The query/plan:
        mustang=# explain select max(lddate) from bss.amplifier_saturation
        where start >= '1987-12-31 00:00:00'
        and   start <= '1988-04-09 00:00:00';
      best index:
        (lddate, start)
      why lddate IS NOT NULL
        Index Cond: ((lddate IS NOT NULL) AND ...
        Why does Postgres have to exclude NULL values?
        Because NULL sorts after the greatest value in ASCENDING or before in DESCENDING order. The maximum non-null value which is returned by the aggregate function max() is not at the beginning / end of the index if there are NULL values.  
        DESC NULLS LAST is the beter choice.
    What is the difference between LATERAL and a subquery in PostgreSQL? id=adb_006
      What is the difference between LATERAL and a subquery in PostgreSQL? <url:#r=adb_006>
      https://stackoverflow.com/questions/28550679/what-is-the-difference-between-lateral-and-a-subquery-in-postgresql#28557803
      ref
        Optimize GROUP BY query to retrieve latest record per user <url:#r=adb_007>
      LATERAL: more like a correlated subquery
        subquery has to be evaluated many times, once for each row in lhs
    Modern SQL
      https://www.slideshare.net/MarkusWinand/modern-sql
      Modern SQL in PostgreSQL-nFfS1HmiWCM.webm
      LATERAL
        ref
          What is the difference between LATERAL and a subquery in PostgreSQL? <url:#r=adb_006>
        before:
          SELECT ...
            , (SELECT column1 
              FROM t1)
            ...
          wrong: SELECT column1, column2
          wrong: more than one row returned 
        after:
          SELECT ..., ldt.*
            FROM t2
            LEFT JOIN LATERAL 
              (SELECT column_1, column_2
              FROM t1
              WHERE t1.x = t2.y
              ) AS ldt
              ON (true) ...
          new:
            lift both limitations
            and can be correlated
        before:
          inline views can't refer to outside view:
            SELECT *
              FROM t1
              JOIN (SELECT *
                FROM t2
                WHERE t2.x = t1.x
                ) inline view
          WHERE t2.x = t1.x
            this refers to outside view
            this was wrong
          solution
            SELECT *
              FROM t1
              JOIN (SELECT *
                FROM t2
                ) inline view
              ON (inline_view.x = t1.x)
        now:
          inline views can refer to outside view
            SELECT *
              FROM t1
              JOIN LATERAL 
                (SELECT *
                  FROM t2
                  WHERE t2.x = t1.x
                  ) inline view
              ON (true)   -- useless but still required
        why? where to use?
          usecase1: calling table functions with args from previously mentioned tables
            SELECT t1.id, tf.*
              FROM t1
              JOIN LATERAL table_function(t1.id) tf
              ON (true)
            LATERAL is optional here
          usecase2: limiting data set
            SELECT top_products.*
              FROM categories c
              JOIN LATERAL 
                (SELECT *
                  FROM products p
                  WHERE p.cat = c.cat
                  ORDER BY p.rank DESC
                  LIMIT 3
                  ) top_products
            no way to do without limit
            ex: get 10 most recent news
              SELECT n.*
                FROM news n
                JOIN subscriptions s
                ON (n.topic = s.topic)
                WHERE s.user = ?
                ORDER BY n.created DESC
                LIMIT 10
              # this joins 900 K rows. we only need 10 recent subscriptions
              SELECT n.*
                FROM subscriptions s
                JOIN LATERAL 
                  (SELECT *
                    FROM news n
                    WHERE n.topic = s.topic
                    ORDER BY n.created DESC
                    LIMIT 10
                    ) top_news ON (true)
                WHERE s.user_id = ?
                ORDER BY n.created DESC
                LIMIT 10
        nutshell
          LATERAL is "for each" loop of SQL
            executed predefined number of times
          plays well with outer joins
          great for TOP-N suqueries
          can join table functions (unnest)
      GROUPING SETS
        before:
          only one GROUP BY operation at a time
          SELECT year, month, sum(revenue)
            FROM tbl
            GROUP BY year, month
          SELECT year
            , sum(revenue)
            FROM tbl
            GROUP BY year
          both together:
            SELECT year, month, sum(revenue)
              FROM tbl
              GROUP BY year, month
            UNION ALL
            SELECT year
              , null
              , sum(revenue)
              FROM tbl
              GROUP BY year
        after:
          SELECT year, month, sum(revenue)
            FROM tbl
            GROUP BY 
              GROUPING SETS (
                (year, month)
                , (year)
                )
        nutshell
          multiple GROUP BY
          () "empty brackets" build a group over all rows
          Permutations can be created using ROLLUP and CUBE
            (ROLLUP(a,b,c) = GROUPING SETS ((a,b,c), (a,b),(a),()))
            https://stackoverflow.com/questions/25274879/when-to-use-grouping-sets-cube-and-rollup#25276123
              CUBE is the same of GROUPING SETS with all possible combinations
              if you don't really need all combinations, you should use GROUPING SETS rather than CUBE
              GROUP BY CUBE (C1, C2, C3, ..., Cn-2, Cn-1, Cn)
              ===
              GROUP BY GROUPING SETS (
                   (C1, C2, C3, ..., Cn-2, Cn-1, Cn) -- All dimensions are included.
                  ,( , C2, C3, ..., Cn-2, Cn-1, Cn) -- n-1 dimensions are included.
                  ,(C1, C3, ..., Cn-2, Cn-1, Cn)
                  …
      WITH (common table expressions CTE)
        nested subqueries are hard to read
        syntax
          WITH
            a (c1, c2) -- column names optional
            AS (SELECT c1, c2 FROM ...)
        before:
          nested queries are hard to read:
            SELECT ...
              FROM (SELECT ...
                FROM t1
                JOIN (SELECT ... FROM ...
                  ) a ON (...)
              ) b
              ...
        after
          CTEs are statement-scoped views
            WITH
              a (c1, c2, c3)
              AS (SELECT c1, c2, c3 FROM ...),
              b (c4, ...)
              AS (SELECT c4, ... FROM ... JOIN a ON (...)),
            SELECT ...
              FROM b JOIN a ON (...)
        nutshell
          they are like private methods of SQL
          views can be referred
          allows chaining instead of nesting
          allowed where SELECT is allowed
            INSERT INTO tbl
            WITH ... SELECT ...
        but
          pgs: WITH views are like materialized views
        INSERT, UPDATE, DELETE inside WITH
        WITH deleted_rows AS (
          DELETE FROM source_tbl
          RETURNING *
          )
          INSERT INTO destination_tbl
          SELECT * FROM deleted_rows;
        issue: performance 
          CTE doesn't know about outer filters
      WITH RECURSIVE
        this also part of making SQL, turing complete
        before:
          too hard
        after
          WITH RECURSIVE cte (n)
            AS 
              (SELECT 1
                UNION ALL
                SELECT n+1
                FROM cte
                WHERE n < 3)
            SELECT * FROM cte;
        use cases
          row generators
          for graph processing
          loops that
            pass data to next iteration
            need a dynamic abort condition
        nutshell
          WITH RECURSIVE is while of SQL
          supports infinite loops
      OVER and PARTITION BY
        together with recursive CTE SQL became turing complete with over feature
        /Users/mertnuhoglu/Dropbox/public/img/ss-249.png
          | sql                                          | merge rows | aggregate |
          | select * from t                              | false      | false     |
          | select distinct c1 from t                    | true       | false     |
          | select * from t join (select .. group by ..) | false      | true      |
          | select sum(c1) from t group by ..            | true       | true      |
          better:
            select * from t join (select .. group by ..) 
            -->
            select sum(c2) over (partition by c1) from t
        before:
          WITH total_salary_by_department
            AS (SELECT dep, SUM(salary) total
              FROM emp
              GROUP BY dep)
            SELECT dep, emp_id, salary,
              salary/ts.total*100 "% of dep"
              FROM emp
              JOIN total_salary_by_department ts
              ON (emp.dep = ts.dep)
        what if we add:
          WHERE emp.dep = ?
        before: there was no chance to collect aggregates but not collapse rows
        after:
          SELECT dep, emp_id, salary,
            salary/SUM(salary) OVER (PARTITION BY dep) * 100 "% of dep"
            FROM emp
        notes:
          PARTITION BY seggregates like GROUP BY does
          OVER () aggregates over all result set
        nutshell
          any aggregate function ok
      OVER and ORDER BY
        before: calculating a running total
          SELECT txid, value,
            (SELECT SUM(value)
              FROM transactions tx2
              WHERE tx2.acnt = tx1.acnt
              AND tx2.txid <= tx1.txid) bal
            FROM transactions tx1
            WHERE acnt = ?
            ORDER BY txid
          # issues
            requires a scalar subselect or selfjoin
            poor maintenance
            poor performance
            better: do it in application
        after:
          SELECT txid, value,
            SUM(value)
              OVER(ORDER BY txid
                ROWS
                BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) bal
            FROM transactions tx1
            WHERE acnt = ?
            ORDER BY txid
        new functions makes sense with OVER(ORDER BY ...)
          ROW_NUMBER
          ranking:
            RANK, DENSE_RANK, CUME_DIST
        use cases:
          aggregates without GROUP BY
          running totals, moving averages
          ranking
            top-n per group
          avoiding self-joins
      WITHIN GROUP
        grouped rows cannot be ordered prior aggregation
          how to get middle value (median) of a set
        before:
          ...
        after:
          SELECT PERCENTILE_DISC 0.5
            WITHIN GROUP (ORDER BY val)
          FROM data
        hypothetical set-functions
          SELECT RANK(123)
            WITHIN GROUP (ORDER BY val)
          FROM data
      OVER
        before: calculate difference to previous row
          WITH numbered_data AS (
            SELECT *,
              ROW_NUMBER() OVER(ORDER BY x) rn
              FROM data)
            SELECT cur.*, cur.balance - prev.balance
              FROM numbered_data cur
              LEFT JOIN numbered_data prev 
              ON (cur.rn = prev.rn - 1)
        after:
          SELECT *, balance - LAG(balance) OVER (ORDER BY x)
            FROM data
        other functions
          LEAD/LAG
          FIRST_VALUE / LAST_VALUE
          NTH_VALUE(col, n) FROM FIRST/LAST RESPECT/IGNORE NULLS
      FETCH FIRST
        like LIMIT but SQL standard
        before:
          SELECT *
            FROM (SELECT *,
              ROW_NUMBER() OVER(ORDER BY x) rn
              FROM data) numbered_data
            WHERE rn <= 10
        after:
          SELECT *
            FROM data
            ORDER BY x
            FETCH FIRST 10 ROWS ONLY
      OFFSET
        OFFSET is EVIL
          comparison to sleep
          problem: renumbering rows 
        before: skip 10 rows, then get next 10
          SELECT *
            FROM (SELECT *,
              ROW_NUMBER() OVER(ORDER BY x) rn
              FROM data
              FETCH FIRST 20 ROWS ONLY
            ) numbered_data
            WHERE rn > 10
        after:
          don't use offset
        alternative to OFFSET:
          http://use-the-index-luke.com/no-offset
            db still fetches these rows and bring them in order before it can send the following ones
            use where clause that filters the data you look for
            sql
              SELECT ...
              FROM ...
              WHERE ...
              AND id < ?last_seen_id
              ORDER BY id DESC
              FETCH FIRST 10 ROWS ONLY
          http://use-the-index-luke.com/sql/partial-results/fetch-next-page
            how to do proper pagination
            opt1: offset
              SELECT *
                FROM sales
               ORDER BY sale_date DESC
              OFFSET 10
               FETCH NEXT 10 ROWS ONLY
              costs
                db counts all rows from beginning until requested page
                  pages drift when inserting new rows
                  response time increases when browsing further back
            opt2: seek
              SELECT *
                FROM sales
               WHERE sale_date < ?
               ORDER BY sale_date DESC
               FETCH FIRST 10 ROWS ONLY
              benefits:
                doesn't get already shown pages
                where condition uses index
                you get stable results if new rows are inserted
      AS OF
        before: changing data was destructive
        after: tables can be system versioned
          CREATE TABLE t (...,
            start_ts TIMESTAMP(9) GENERATED ALWAYS AS ROW START,
            end_ts TIMESTAMP(9) GENERATED ALWAYS AS ROW END,
            PERIOD FOR SYSTEM TIME (start_ts, end_ts)
          ) WITH SYSTEM VERSIONING
        ex:
          INSERT ... (ID, DATA) VALUES (1, 'x')
            | ID | Data | start_ts | end_ts |
            | 1  | x    | 10:00    |        |
          UPDATE ... SET DATA = 'y' ...
            | ID | Data | start_ts | end_ts |
            | 1  | x    | 10:00    | 11:00  |
            | 1  | y    | 11:00    |        |
        with AS OF you can query:
          SELECT *
            FROM t FOR SYSTEM_TIME AS OF
              TIMESTAMP '2015-04-02 10:30:00'
            | ID | Data | start_ts | end_ts |
            | 1  | x    | 10:00    | 11:00  |
      WITHOUT OVERLAPS
        how to avoid overlapping periods
          | id | begin | end   |
          | 1  | 9:00  | 11:00 |
          | 1  | 10:00 | 12:00 |
        before:
          using triggers 
        after:
          PRIMARY KEY (id, period WITHOUT OVERLAPS)
          ===
          EXCLUDE USING gist (id WITH =, period WITH &&)
      Temporal/Bi-Temporal SQL
      LIST_AGG
        ex:
          | grp | val |
          | 1   | B   |
          | 1   | A   |
          | 1   | C   |
          | 2   | X   |
          SELECT grp
            , LIST_AGG(val, ', ')
              WITHIN GROUP (ORDER BY val)
            FROM t
            GROUP By grp
          -->
          | grp | val     |
          | 1   | A, B, C |
          | 2   | X       |
    Temporal Features in Sql 2011
      http://cs.ulb.ac.be/public/_media/teaching/infoh415/tempfeaturessql2011.pdf
      Introduction
      Temporal data support
        Periods
          an interval on timeline
          period definitions are metadata to tables
            pair of columns: period start and period end time
    Assign Names to Columns Without Known Name
      http://modern-sql.com/use-case/naming-unnamed-columns
      table functions produce columns with no names:
        ex: unnest, values 
      opt1: using aliases in the from Clause
        SELECT COUNT(c1)
             , COUNT(*)
          FROM (VALUES (1)
                     , (NULL)
               ) t1(c1)
        t1: table alias
          c1: column alias for first column
      opt2: Using CTE
        WITH t1 (c1) AS (
             VALUES (1)
                  , (NULL)
        )
        SELECT COUNT(c1)
             , COUNT(*)
          FROM t1
    Literate SQL
      http://modern-sql.com/use-case/literate-sql
      WITH has two properties:
        names come first
        subqueries are unnested
      Names first
        meaningful names: very important
        ex: name is out of sight
          SELECT ...
            FROM (SELECT ...
                    FROM ...
                 ) intention_revealing_name
             ...
        after: name put before the code (like programming languages)
          WITH intention_revealing_name AS (
               SELECT ...
                 FROM ...
               )
          SELECT ...
            FROM intention_revealing_name irn
             ...
      Order of human logic
        turn nesting into chaining
        with is a prefix for SELECT
    Unit Tests on Transient Data
      http://modern-sql.com/use-case/unit-tests-on-transient-data
      opt1: Open Transactions
      opt2: with and values
        1. with creates table with the same name
        2. with generates test data
        ex
          WITH cart (product_id, qty) AS (
               VALUES (1, 2)
          )
          SELECT ...
            FROM cart
             ...
    with — Organize Complex Queries
      http://modern-sql.com/feature/with
      you can use 'with' as prefix for select everywhere:
        WITH query_name (column_name1, ...) AS
             (SELECT ...)
        SELECT ...
      WITH is like CREATE VIEW
    case — Conditional Expressions
      http://modern-sql.com/feature/case
      code
        CASE WHEN <condition> THEN <result>
            [WHEN <condition> THEN <result>
             ...]
            [ELSE <result>]
        END
      handling NULL
        note: null = null is not true
          thus 'when null' never applies
        opt1: coalesce
          COALESCE(a, b)
          ===
          CASE WHEN a IS NOT NULL THEN a
               ELSE b
          END
        opt2: nullif
          x / NULLIF(y, 0)
          ===
          x / CASE WHEN y = 0 THEN null 
                   ELSE y
              END
    EXTRACT expression
      http://modern-sql.com/feature/extract
      code
        EXTRACT(<field> FROM <expression>)
      fields
        Year  YEAR
        Month MONTH
        Day of month  DAY
        24 hour HOUR
        Minute  MINUTE
        Seconds (including fractions) SECOND
        Time zone hour  TIMEZONE_HOUR
        Time zone minute  TIMEZONE_MINUTE
      related:
        EXTRACT gets single field
        to extract multiple fields, CAST can be used
      CAST
        CAST(<timestamp> AS [DATE|TIME])
      anti-patterns
        string formatting functions
        inappropriate use in WHERE
          ex: consider
            WHERE EXTRACT(YEAR FROM some_date) = 2016
            last time unit is not known
            resolution unknown
            no index can be utilized
          better:
            WHERE some_date >= DATE'2016-01-01'
              AND some_date <  DATE'2017-01-01'
    FILTER clause
      http://modern-sql.com/feature/filter
      ex:
        SUM(<expression>) FILTER (WHERE <condition>)
        SUM(<expression>) FILTER (WHERE <condition>) OVER (...)
    The FILTER clause in Postgres 9.4
      https://medium.com/little-programming-joys/the-filter-clause-in-postgres-9-4-3dd327d3c852
      before:
        SELECT
          COUNT(*) AS unfiltered,
          SUM( CASE WHEN i < 5 THEN 1 ELSE 0 END ) AS filtered
        FROM generate_series(1,10) AS s(i);
      after:
        SELECT
          COUNT(*) AS unfiltered,
          COUNT(*) FILTER (WHERE i < 5) AS filtered
        FROM generate_series(1,10) AS s(i);
      ex: sellers sales counters based on purchase states
        SELECT purchases.seller_id,
          SUM(CASE WHEN state IN ('authorized', 'reversed') THEN 1 ELSE 0 END) AS sales_count,
          SUM(CASE WHEN state = 'authorized' THEN 1 ELSE 0 END) AS successful_sales_count
        FROM purchases
        GROUP BY purchases.seller_id
        -->
        SELECT purchases.seller_id,
          COUNT(1) FILTER (WHERE state IN ('authorized', 'reversed')) AS sales_count,
          COUNT(1) FILTER (WHERE state = 'authorized') AS successful_sales_count
        FROM purchases
        GROUP BY purchases.seller_id
    https://blog.jooq.org/2014/12/30/the-awesome-postgresql-9-4-sql2003-filter-clause-for-aggregate-functions/
      ex: get number of countries with GDP higher than 40000 for each year
        CREATE TABLE countries (
          code CHAR(2) NOT NULL,
          year INT NOT NULL,
          gdp_per_capita DECIMAL(10, 2) NOT NULL
        );
        SELECT
          year,
          count(*) FILTER (WHERE gdp_per_capita >= 40000)
        FROM countries
        GROUP BY year
        -->
        year   count
        ------------
        2012   4
        2011   5
      ex: use as window function
        SELECT
          year,
          code,
          gdp_per_capita,
          count(*) 
            FILTER (WHERE gdp_per_capita >= 40000) 
            OVER   (PARTITION BY year)
        FROM
          countries
        -->
        year   code   gdp_per_capita   count
        ------------------------------------
        2009   CA           40764.00       4
        2009   DE           40270.00       4
    filter by count of records
      http://sqlfiddle.com/#!12/bbbdd/3
      schema
        CREATE TABLE states
          ("name" int, "admin" int)
        ;
        INSERT INTO states
          ("name", "admin")
        VALUES
          (1, 1),
          (2, 1),
          (3, 1),
          (4, 2),
          (5, 3)
        ;
      code:
        SELECT s.name,s.admin 
        FROM states s
        INNER JOIN (
        SELECT ss.admin
        FROM states ss
        GROUP BY ss.admin
        HAVING COUNT(*) < 100
        ) a ON a.admin = s.admin
        ORDER BY s.admin ASC;
      out
        name  admin
        4 2
        5 3
    Table Column Aliases
      http://modern-sql.com/feature/table-column-aliases
      code
        FROM … [AS] alias [(<derived column list>)]
      issues:
        you have to alias all columns in the table in order
      use case: unnest, values table functions
      ex: WITH clause can be used to name columns
        WITH t1 (c1) AS (
             VALUES (1)
                  , (NULL)
        )
        SELECT COUNT(c1)
             , COUNT(*)
          FROM t1
    listagg Function
      http://modern-sql.com/feature/listagg
      rows to delimited strings
      used to denormalize rows into a string of csv values
      issue: no way to escape separator
      ...
    match_recognize Clause
      http://modern-sql.com/feature/match_recognize
    values Clause   
      http://modern-sql.com/feature/values
      can be used where SELECT is allowed
    SELECT without FROM
      instead of non-conforming select without from:
        SELECT CURRENT_DATE
      use VALUES without INSERT
        VALUES (CURRENT_DATE)
      better because: can return multiple rows 
        SELECT without FROM can return 1 row
      opt: conforming
        SELECT *
          FROM (VALUES (1,2)
                     , (3,4)
               ) t1 (c1, c2)
    Processing graphs
      http://aprogrammerwrites.eu/?p=1391#.Wfgzdj_EeRs
      shortest route from person A to B in LinkedIn/Facebook
      for certain classes of graphs: relational db can offer better performance than graph databases
    Use the Index Luke
      http://use-the-index-luke.com/sql/table-of-contents
      Preface — Why is indexing a development task?
        some say: sql is inherently slow
          why is performance problems commonplace
        sql: most successful 4GL programming language
          separates: what and how
            SELECT date_of_birth
              FROM employees
             WHERE last_name = 'WINAND'
          side effect: we need to know "how" to solve performance problems
        only thing you need to learn: how to index
          database indexing: a development task
          because it depends on how application queries the data
        most important index type: B-tree index
          works identically in most db
        Chapter 1: fundamental structure of an index
          essential don't skip it
      Anatomy of an Index — What does an index look like?
        intro
          index: a distinct structure in db
            built using: "create index" statement
            has own disk space
            holds a copy of indexed table data
            thus it is pure redundancy
              does not change table data
              create new data structure that refers to table
          it is like: phonebook directory
            difference: insert, delete, update keeps index order without moving data
        The Leaf Nodes — A doubly linked list
          main purpose of index: ordered representation of indeexd data
            not possible to store data sequentially
              because insert would need to move following entries
            solution: build a logical order independent of physical order
          logical order
            built via doubly linked list
            each node
              has links to two neighboring entries
                like a chain
            new nodes: inserted between two existing nodes
              by updating their links
            doubly linked: node refers to preceding and following node
            doubly linked lists:
              java.util.LinkedList
              databases use them for index leaf nodes
          leaf node:
            stored in a database block/page
              smallest storage unit
              a few kb
          structure:
            doubly linked list of leaf nodes
              index entries inside each leaf node
          /Users/mertnuhoglu/Dropbox/public/img/ss-250.png
        The B-Tree — It's a balanced tree
          leaf nodes are in arbitrary order
            position in disk is independent of logical position of index order
            it is like shuffled pages
          how to find entry among shuffled pages?
            a balanced search tree: B-tree
          /Users/mertnuhoglu/Dropbox/public/img/ss-251.png
            root node
              branch nodes
                leaf nodes
            branch nodes: 
              each branch node entry: corresponds to biggest value in respective leaf node
            each layer built similarly
              repeats until all keys fit into a single node: root node
            structure is balanced search tree
              because tree depth is equal at every position
              unlike a binary tree
          /Users/mertnuhoglu/Dropbox/public/img/ss-252.png
            search for the key: 57
          tree traversal
            very efficient
            first power of indexing
              because: tree balance and logarithmic growth of tree depth
                ie. tree depth grows very slowly
        Slow Indexes, Part I — Two ingredients make the index slow
          still there are cases where an index lookup is slow
            myth of "degenerated index"
              solution: rebuilding index
              this has no effect in fact
          first factor for slowness: leaf node chain
            ex: search for 57 in previous example
              two entries are same
              db must read next leaf node to see if there are any more matching entries
          second factor: accessing the table
            there is additional table access for each hit
          index lookup consists of 3 steps:
            1. tree traversal
            2. following leaf node chain
            3. fetching table data
            only tree traversal has upper bound
      The Where Clause — Indexing to improve search performance
        intro
          poorly written where clause => slowness
        The Equals Operator — Exact key lookup
          Primary Keys — Verifying index usage
            simplest where clause: primary key lookup
            ex:
              CREATE TABLE employees (
                 employee_id   NUMBER         NOT NULL,
                 first_name    VARCHAR2(1000) NOT NULL,
                 last_name     VARCHAR2(1000) NOT NULL,
                 date_of_birth DATE           NOT NULL,
                 phone_number  VARCHAR2(1000) NOT NULL,
                 CONSTRAINT employees_pk PRIMARY KEY (employee_id)
              )
            db automatically creates an index for pk
            ex:
              SELECT first_name, last_name
                FROM employees
               WHERE employee_id = 123
            execution plan:
              Index Scan using employees_pk on employees 
                 (cost=0.00..8.27 rows=1 width=14)
                 Index Cond: (employee_id = 123::numeric)
          Concatenated Keys — Multi-column indexes
            if the key consists of multiple columns
            /Users/mertnuhoglu/Dropbox/public/img/ss-253.png
            thus ordering of columns for index is important
            ex:
              CREATE UNIQUE INDEX EMPLOYEES_PK 
                  ON EMPLOYEES (SUBSIDIARY_ID, EMPLOYEE_ID)
              this index is used for it as well:
                where SUBSIDIARY_ID = 20
          Slow Indexes, Part II — The first ingredient, revisited
      Execution Plans
        PostgreSQL
          Getting an Execution Plan
            put "explain" command in front of a sql statement
              for bind parameters:
                put "prepare" first
                ex:
                  PREPARE stmt(int) AS SELECT $1
                    "$n" used for bind parameters
                  EXPLAIN EXECUTE stmt(1)
            for other statements:
              EXPLAIN SELECT 1
            out
              Result  (cost=0.00..0.01 rows=1 width=0)
                operation name: Result
                related cost
                  two cost values:
                    first: cost for startup
                    second: execution cost if all rows are retrieved
                row count estimate
                expected row width
            opt2: ANALYZE
              it executes actually
                so data is modified for INSERT, UPDATE, DELETE
              to prevent it:
                enclose in transaction
                perform a rollback afterwards
              ex:
                BEGIN 
                EXPLAIN ANALYZE EXECUTE stmt(1)
                ROLLBACK
              out
                Result  (cost=0.00..0.01 rows=1 width=0)
                       (actual time=0.002..0.002 rows=1 loops=1)
                Total runtime: 0.020 ms
              prints estimated+actual cost
            prepared statements must be closed:
              DEALLOCATE stmt
          Operations
            Index and Table Access
              Seq Scan
                scans entire relation (table) as stored on disk
              Index Scan
                performs a b-tree traversal
                fetches corresponding table data
            Join Operations
              "table" ≅ "intermediate result"
              nested loops
                query other table for each row from the first
              hash join / hash
                "Hash" in plan
                loads candidate records into a hash table
                probes for each record of the other side
              merge join
                both sides must be presorted
            Sorting and Grouping
              sort / sort key
                needs large memory to materialize intermediate result
              GroupAggregate
              HashAggregate
            Top-N Queries
              Limit
              WindowAgg
          Distinguishing Access and Filter-Predicates
            3 different methos to apply where clauses (predicates)
            Access predicate ("Index Cond")
              express start and stop conditions of leaf node traversal
            Index Filter Predicate ("Index Cond")
              applied during leaf node traversal only
            Table level filter predicate ("Filter")
              for unindexed columns
      Bind Parameters
        Parameterized Queries
      Tips
        Visualizing index
          code
            SELECT <INDEX COLUMN LIST> 
              FROM <TABLE>  
             ORDER BY <INDEX COLUMN LIST>
             FETCH FIRST 100 ROWS ONLY
          get a sample from the index
    sof questions
      Select first row in each GROUP BY group?
        https://stackoverflow.com/questions/3800551/select-first-row-in-each-group-by-group/7630564#7630564
        q
          SELECT * FROM purchases;
          id | customer | total
          ---+----------+------
           1 | Joe      | 5
           2 | Sally    | 3
          query: something like this
            SELECT FIRST(id), customer, FIRST(total)
            FROM  purchases
            GROUP BY customer
            ORDER BY total DESC;
            FIRST(id) | customer | FIRST(total)
            ----------+----------+-------------
                    1 | Joe      | 5
        ans1:
          opt1
            SELECT DISTINCT ON (customer)
                   id, customer, total
            FROM   purchases
            ORDER  BY customer, total DESC, id;
          opt2
            SELECT DISTINCT ON (2)
                   id, customer, total
            FROM   purchases
            ORDER  BY 2, 3 DESC, 1;
          opt3: if total can be NULL
            ...
            ORDER  BY customer, total DESC NULLS LAST, id;
          major points
            DISTINCT ON 
            CREATE INDEX purchases_3c_idx ON purchases (customer, total DESC, id);
      PostgreSQL error: Fatal: role “username” does not exist
        https://stackoverflow.com/questions/11919391/postgresql-error-fatal-role-username-does-not-exist/11919677#11919677
        q
          Fatal: role h9uest does not exist
        ans
          use system user 'postgres' to create your db
          sudo -u postgres -i
      escaping single quotes
        https://stackoverflow.com/questions/12316953/insert-text-with-single-quotes-in-postgresql/12320729#12320729
        ans
          opt1:
            double ': ''
            'user''s log'
          opt2: dollar-quoted strings
            $$escape ' with '' $$
      How do I (or can I) SELECT DISTINCT on multiple columns?
        https://stackoverflow.com/questions/54418/how-do-i-or-can-i-select-distinct-on-multiple-columns/12632129#12632129
        ans
          opt1:
            UPDATE sales
            SET    status = 'ACTIVE'
            WHERE  (saleprice, saledate) IN (
                SELECT saleprice, saledate
                FROM   sales
                GROUP  BY saleprice, saledate
                HAVING count(*) = 1 
                );
          opt2: much faster: NOT EXISTS
            UPDATE sales s
            SET    status = 'ACTIVE'
            WHERE  NOT EXISTS (
               SELECT 1
               FROM   sales s1
               WHERE  s.saleprice = s1.saleprice
               AND    s.saledate  = s1.saledate
               AND    s.id <> s1.id                     -- except for row itself
               );
            AND    s.status IS DISTINCT FROM 'ACTIVE';  -- avoid empty updates. see below
      PostgreSQL Crosstab Query
        https://stackoverflow.com/questions/3002499/postgresql-crosstab-query/11751905#11751905
        q
          how to create crosstab queries
          ex:
            Section    Status    Count
            A          Active    1
            A          Inactive  2
            B          Active    4
            B          Inactive  5
            -->
            Section    Active    Inactive
            A          1         2
            B          4         5
        ans
          install 'tablefunc'
            it provides crosstab()
          test case
            CREATE TEMP TABLE t (
              section   text
            , status    text
            , ct        integer  -- don't use "count" as column name.
            );
            INSERT INTO t VALUES 
              ('A', 'Active', 1), ('A', 'Inactive', 2)
            , ('B', 'Active', 4), ('B', 'Inactive', 5)
                                , ('C', 'Inactive', 7);  -- 'C' with 'Active' is missing
          sql
            SELECT *
            FROM   crosstab(
               'SELECT section, status, ct
                FROM   t
                ORDER  BY 1,2'  -- needs to be "ORDER BY 1,2" here
               ) AS ct ("Section" text, "Active" int, "Inactive" int);
            -->
            Section | Active | Inactive
            ---------+--------+----------
            A       |      1 |        2
            B       |      4 |        5
            C       |      7 |           -- !!
      Select rows which are not present in other table
        https://stackoverflow.com/questions/19363481/select-rows-which-are-not-present-in-other-table/19364694#19364694
        q
          two postgresql tables:
            table name     column names
            -----------    ------------------------
            login_log      ip | etc.
            ip_location    ip | location | hostname | etc.
          query like
            SELECT login_log.ip 
            FROM login_log 
            WHERE NOT EXIST (SELECT ip_location.ip
                             FROM ip_location
                             WHERE login_log.ip = ip_location.ip)
        ans
          opt1: NOT EXISTS (fastest) = anti-join
            SELECT ip 
            FROM   login_log l 
            WHERE  NOT EXISTS (
               SELECT 1              -- it's mostly irrelevant what you put here
               FROM   ip_location i
               WHERE  l.ip = i.ip
               );
          opt2: LEFT JOIN - shortest
            SELECT l.ip 
            FROM   login_log l 
            LEFT   JOIN ip_location i USING (ip)  -- short for: ON i.ip = l.ip
            WHERE  i.ip IS NULL;
          opt3: EXCEPT: not for complex queries
            SELECT ip 
            FROM   login_log
            EXCEPT ALL               -- ALL, to keep duplicate rows and make it faster
            SELECT ip
            FROM   ip_location;
          opt4: NOT IN: only if no NULL values exist
            SELECT ip 
            FROM   login_log
            WHERE  ip NOT IN (
               SELECT DISTINCT ip  -- DISTINCT is optional
               FROM   ip_location
               );
      What is easier to read in EXISTS subqueries? [closed]
        https://stackoverflow.com/questions/7710153/what-is-easier-to-read-in-exists-subqueries
        SELECT foo FROM bar WHERE EXISTS (SELECT * FROM baz WHERE baz.id = bar.id);
          better because
            *: not relevant
            semi-join
        SELECT foo FROM bar WHERE EXISTS (SELECT 1 FROM baz WHERE baz.id = bar.id);
      What is semi-join
        http://www.answers.com/Q/What_is_semi_join_in_SQL
        ex
          select * 
          from Customers C 
          where exists ( 
          select * 
          from Sales S 
          where S.Cust_Id = C.Cust_Id 
          ) 
      Find records where join doesn't exist
        https://stackoverflow.com/questions/14251180/find-records-where-join-doesnt-exist/14260510#14260510
        NULL trap of NOT IN
        ans
          WHERE NOT EXISTS (
             SELECT 1
             FROM   votes v
             WHERE  v.some_id = base_table.some_id
             AND    v.user_id = ?
             )
          NOT EXISTS () vs NOT IN ()
            result of NULL in NOT IN is null
            
      How to check if a table exists in a given schema
        https://stackoverflow.com/questions/20582500/how-to-check-if-a-table-exists-in-a-given-schema/24089729#24089729
        How to check whether a table (or view) exists, and the current user has access to it?
          opt1: information_schema
            SELECT EXISTS (
               SELECT 1
               FROM   information_schema.tables 
               WHERE  table_schema = 'schema_name'
               AND    table_name = 'table_name'
               );
          opt2: pg_tables
            SELECT EXISTS (
               SELECT 1 
               FROM   pg_tables
               WHERE  schemaname = 'schema_name'
               AND    tablename = 'table_name'
               );
      How to implement a many-to-many relationship in PostgreSQL?
        https://stackoverflow.com/questions/9789736/how-to-implement-a-many-to-many-relationship-in-postgresql/9790225#9790225
        ans
          The DDL statements could look like this:
            CREATE TABLE product (
              product_id serial PRIMARY KEY  -- implicit primary key constraint
            , product    text NOT NULL
            , price      numeric NOT NULL DEFAULT 0
            );
            CREATE TABLE bill (
              bill_id  serial PRIMARY KEY
            , bill     text NOT NULL
            , billdate date NOT NULL DEFAULT CURRENT_DATE
            );
            CREATE TABLE bill_product (
              bill_id    int REFERENCES bill (bill_id) ON UPDATE CASCADE ON DELETE CASCADE
            , product_id int REFERENCES product (product_id) ON UPDATE CASCADE
            , amount     numeric NOT NULL DEFAULT 1
            , CONSTRAINT bill_product_pkey PRIMARY KEY (bill_id, product_id)  -- explicit pk
            );
          major points
            use: IDENTITY instead of serial
            Another widespread anti-pattern would be just id as column name.
              I am not sure what the name of a bill would be. Maybe bill_id can be the name in this case.
            ON UPDATE CASCADE ON DELETE CASCADE
              you cannot delete product rows. but if you wish, you can mark them as "obsolete"
            sequence of key columns is relevant in multicolumn keys
              (bill_id, product_id) assumes queries look for bill_id always 
      PostgreSQL 10 identity columns explained
        https://blog.2ndquadrant.com/postgresql-10-identity-columns/
        PK columns should be IDENTITY to conform SQL standard
        before:
          CREATE TABLE test_old (
              id serial PRIMARY KEY,
              payload text
          );
          INSERT INTO test_old (payload) VALUES ('a'), ('b'), ('c') RETURNING *;
        now: 
          CREATE TABLE test_new (
              id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
              payload text
          );
          INSERT INTO test_new (payload) VALUES ('a'), ('b'), ('c') RETURNING *;
        managing sequences:
          before
            ALTER SEQUENCE test_old_id_seq RESTART WITH 1000;
          now: With an identity column, you don’t need to know the name of the sequence:
            ALTER TABLE test_new ALTER COLUMN id RESTART WITH 1000;
      How do I query using fields inside the new PostgreSQL JSON datatype?
        https://stackoverflow.com/questions/10560394/how-do-i-query-using-fields-inside-the-new-postgresql-json-datatype/10560761#10560761
        ans
          ex
            SELECT *
            FROM   json_array_elements(
              '[{"name": "Toby", "occupation": "Software Engineer"},
                {"name": "Zaphod", "occupation": "Galactic President"} ]'
              ) AS elem
            WHERE elem->>'name' = 'Toby';
          major points:
            always use jsonb instead of json
      Check if value exists in Postgres array
        https://stackoverflow.com/questions/11231544/check-if-value-exists-in-postgres-array/11231965#11231965
        q
          Edit: Just realized I could do this
            select '{1,2,3}'::int[] @> ARRAY[value_variable::int]
          This is much better and I believe will suffice, but if you have other ways to do it please share.
        ans
          ex
            SELECT value_variable = ANY ('{1,2,3}'::int[])
          ANY rhs: can be a set or an array
          points:
            does not work with NULL elements
      Index for finding an element in a JSON array
        https://stackoverflow.com/questions/18404055/index-for-finding-an-element-in-a-json-array/18405706#18405706
        q
          CREATE TABLE tracks (id SERIAL, artists JSON);
          INSERT INTO tracks (id, artists) 
            VALUES (1, '[{"name": "blink-182"}]');
          INSERT INTO tracks (id, artists) 
            VALUES (2, '[{"name": "The Dirty Heads"}, {"name": "Louis Richards"}]');
          SELECT * FROM tracks
            WHERE 'The Dirty Heads' IN 
              (SELECT value->>'name' FROM json_array_elements(artists))
          this does a full table scan
        ans
          GIN index:
            CREATE TABLE tracks (id serial, artists jsonb);
            CREATE INDEX tracks_artists_gin_idx ON tracks USING gin (artists);
          No need for a function to convert the array. This would support a query:
            SELECT * FROM tracks WHERE artists @> '[{"name": "The Dirty Heads"}]';
          @> being the new jsonb "contains" operator, which can use the GIN index.
      Check if NULL exists in Postgres array
        https://stackoverflow.com/questions/34848009/check-if-null-exists-in-postgres-array/34848472#34848472
        opt 
          array_replace(ar, NULL, 0) <> ar
          array_remove(ar, NULL) <> ar
          array_position(ar, NULL) IS NOT NULL
        test case
          SELECT num, ar, expect
              , array_replace(ar, NULL, 0) <> ar                       AS t_93a --  99 ms
              , array_remove(ar, NULL) <> ar                           AS t_93b --  96 ms
              , cardinality(array_remove(ar, NULL)) <> cardinality(ar) AS t_94  --  81 ms
              , COALESCE(array_position(ar, NULL::int), 0) > 0         AS t_95a --  49 ms
              , array_position(ar, NULL) IS NOT NULL                   AS t_95b --  45 ms
              , CASE WHEN ar IS NOT NULL
                     THEN array_position(ar, NULL) IS NOT NULL END     AS t_95c --  48 ms
         FROM  (
            VALUES (1, '{1,2,NULL}'::int[], true)     -- extended test case
                 , (2, '{-1,NULL,2}'      , true)
                 , (3, '{NULL}'           , true)
                 , (4, '{1,2,3}'          , false)
                 , (5, '{-1,2,3}'         , false)
                 , (6, NULL               , null)
            ) t(num, ar, expect);
        Function wrapper
          For repeated use:
            CREATE OR REPLACE FUNCTION f_array_has_null (anyarray)
              RETURNS bool LANGUAGE sql IMMUTABLE AS
             'SELECT array_position($1, NULL) IS NOT NULL';
          points
            Using a polymorphic input type this works for any array type, not just int[].
            Make it IMMUTABLE to allow performance optimization and index expressions
      Polymorphic Types
        https://www.postgresql.org/docs/current/static/extend-type-system.html#extend-types-polymorphic
        Five pseudo-types of special interest are anyelement, anyarray, anynonarray, anyenum, and anyrange, which are collectively called polymorphic types. 
        Any function declared using these types is said to be a polymorphic function
      Best way to select random rows PostgreSQL
        https://stackoverflow.com/questions/8674718/best-way-to-select-random-rows-postgresql/8675160#8675160
        q
          I want a random selection of rows in PostgreSQL, I tried this:
            select * from table where random() < 0.01;
          But some other recommend this:
            select * from table order by random() limit 1000;
        ans
          SELECT *
          FROM  (
              SELECT DISTINCT 1 + trunc(random() * 5100000)::integer AS id
              FROM   generate_series(1, 1100) g
              ) r
          JOIN   big USING (id)
          LIMIT  1000;
      Fast way to discover the row count of a table in PostgreSQL
        https://stackoverflow.com/questions/7943233/fast-way-to-discover-the-row-count-of-a-table-in-postgresql/7945274#7945274
        ans
          counting can be slow
            precise number: needs full count of rows
              due to MVCC: concurrency control
          ex: exact count (slow)
            SELECT count(*) AS exact_count FROM myschema.mytable;
          ex: estimate (fast)
            SELECT reltuples::bigint AS estimate FROM pg_class where relname='mytable';
          ex: better (specify schema)
            SELECT c.reltuples::bigint AS estimate
            FROM   pg_class c
            JOIN   pg_namespace n ON n.oid = c.relnamespace
            WHERE  c.relname = 'mytable'
            AND    n.nspname = 'myschema'
          ex: better, more elegant
            SELECT reltuples::bigint AS estimate
            FROM   pg_class
            WHERE  oid = 'myschema.mytable'::regclass;
          better:
            to_regclass('myschema.mytable') 
          ex:
            Postgres actually stops counting beyond the given limit, you get an exact and current count for up to n rows (500000 in the example), and n otherwise
            SELECT count(*) FROM (SELECT 1 FROM token LIMIT 500000) t;
      Double colon (::) notation in SQL
        https://stackoverflow.com/questions/5758499/double-colon-notation-in-sql
        b.date_completed >  a.dc::date + INTERVAL '1 DAY 7:20:00'
        the :: converts a.dc to a date type of date.
        cast to a data type
      How to concatenate columns in a Postgres SELECT?
        https://stackoverflow.com/questions/19942824/how-to-concatenate-columns-in-a-postgres-select/19943343#19943343
        q
          I have two string columns a and b.
          So select a,b from foo returns values a and b. However, concatenation of a and b does not work. I tried :
            select a || b from foo
          and
            select  a||', '||b from foo
        ans
          SELECT a::text || ', ' || b::text AS ab FROM foo;
          if NULL exists:
            SELECT concat_ws(', ', a::text, b::text) AS ab FROM foo;
            Or just concat() if you don't need separators:
            SELECT concat(a::text, b::text) AS ab FROM foo;
      Combine two columns and add into one new column
        https://stackoverflow.com/questions/12310986/combine-two-columns-and-add-into-one-new-column/12320369#12320369
        q
          I want to use an SQL statement to combine two columns and create a new column from them.
          I'm thinking about using concat(...), but is there a better way?
        ans1
          ddl
            CREATE TABLE tbl
              (zipcode text NOT NULL, city text NOT NULL, state text NOT NULL);
            INSERT INTO tbl VALUES ('10954', 'Nanuet', 'NY');
          before
            \pset border 2
            SELECT * FROM tbl;
            +---------+--------+-------+
            | zipcode |  city  | state |
            +---------+--------+-------+
            | 10954   | Nanuet | NY    |
            +---------+--------+-------+
          Now add a function with the desired "column name" which takes the record type of the table as its only parameter:
            CREATE FUNCTION combined(rec tbl)
              RETURNS text
              LANGUAGE SQL
            AS $$
              SELECT $1.zipcode || ' - ' || $1.city || ', ' || $1.state;
            $$;
          after
            This creates a function which can be used as if it were a column of the table, as long as the table name or alias is specified, like this:
            SELECT *, tbl.combined FROM tbl;
            +---------+--------+-------+--------------------+
            | zipcode |  city  | state |      combined      |
            +---------+--------+-------+--------------------+
            | 10954   | Nanuet | NY    | 10954 - Nanuet, NY |
            +---------+--------+-------+--------------------+
        ans2
          if NULL exists:
            use concat()
          difficult to read:
            SELECT COALESCE(col_a, '') || COALESCE(col_b, '');
          elegant:
            SELECT concat(col_a, col_b);
      Any downsides of using data type “text” for storing strings?
        https://stackoverflow.com/questions/20326892/any-downsides-of-using-data-type-text-for-storing-strings/20334221#20334221
        q
          3 data-types for character data:
            character varying(n), varchar(n)  variable-length with limit
            character(n), char(n)             fixed-length, blank padded
            text                              variable unlimited length
        ans
          text is optimum
          to enforce maximum length, use CHECK constraint
            ALTER TABLE tbl ADD CONSTRAINT tbl_col_len CHECK (length(col) < 100);
          CHECK can do more, pretty much anything
      Change PostgreSQL columns used in views
        https://stackoverflow.com/questions/8524873/change-postgresql-columns-used-in-views/8527792#8527792
        q
          Let's say I have the following:
            CREATE TABLE monkey
            (
              "name" character varying(50) NOT NULL,
            )
            CREATE OR REPLACE VIEW monkey_names AS 
             SELECT name
               FROM monkey
          I really just want to do the following in a migration script without having to drop and recreate the view.
            ALTER TABLE monkey ALTER COLUMN "name" character varying(100) NOT NULL
        ans
          use: "text" without length specifier
          CREATE TABLE monkey(name text NOT NULL)
          If you really want to enforce a maximum length, create a CHECK constraint:
            ALTER TABLE monkey 
              ADD CONSTRAINT monkey_name_len CHECK (length(name) < 101);
          points:
            view is not just an alias to subquery
              views are special tables with a rule:
                ON SELECT TO my_view DO INSTEAD
              you can GRANT, add comments, define column defaults
      Best way to check for “empty or null value”
        https://stackoverflow.com/questions/23766084/best-way-to-check-for-empty-or-null-value/23767625#23767625
        q
          i use:
            coalesce( trim(stringexpression),'')=''
        ans
          stringexpression = '' yields:
            TRUE   .. for '' (or for any string consisting of only spaces with the data type char(n))
            NULL   .. for NULL
            FALSE .. for anything else
          So to check for: "stringexpression is either NULL or empty":
            (stringexpression = '') IS NOT FALSE
            Or the reverse approach (may be easier to read):
              (stringexpression <> '') IS NOT TRUE
          opt
            coalesce(stringexpression, '') = ''
          the opposite: stringexpression is neither NULL nor empty" is even simpler:
            stringexpression <> ''
          test
            SELECT stringexpression 
                  ,stringexpression = ''                    AS simple_test
                  ,(stringexpression = '')  IS NOT FALSE    AS test1
                  ,(stringexpression <> '') IS NOT TRUE     AS test2
                  ,coalesce(stringexpression, '') = ''      AS test_coalesce1
                  ,coalesce(stringexpression, '  ') = '  '  AS test_coalesce2
                  ,coalesce(stringexpression, '') = '  '    AS test_coalesce3
            FROM  (
               VALUES
                 ('foo'::char(5))
               , ('')
               , (NULL)
               , ('   ')                -- not different from '' in char(n)
               ) sub(stringexpression);
      Does PostgreSQL support “accent insensitive” collations?
        https://stackoverflow.com/questions/11005036/does-postgresql-support-accent-insensitive-collations/11007216#11007216
        q
          sql server: which means that it's possible for a query like
            SELECT * FROM users WHERE name LIKE 'João'
          to find a row with a Joao name.
        ans
          Use the unaccent module for that
            CREATE EXTENSION unaccent;
          ex
            SELECT *
            FROM   users
            WHERE  unaccent(name) = unaccent('João');
          index
            Postgres only accepts IMMUTABLE functions for indexes. If a function can return a different result for the same input, the index could silently break.
            unaccent() is only STABLE, not IMMUTABLE
          Best for now
            Create a wrapper function with the two-parameter form and "hard-wire" the schema for function and dictionary:
            CREATE OR REPLACE FUNCTION f_unaccent(text)
              RETURNS text AS
            $func$
            SELECT public.unaccent('public.unaccent', $1)  -- schema-qualify function and dictionary
            $func$  LANGUAGE sql IMMUTABLE;
      Are PostgreSQL column names case-sensitive?
        https://stackoverflow.com/questions/20878932/are-postgresql-column-names-case-sensitive/20880247#20880247
        ans
          yes: All identifiers (including column names) that are not double-quoted are folded to lower case in PostgreSQL
          SELECT * FROM persons WHERE "first_Name" = 'xyz';
          Values (string literals) are enclosed in single quotes.
      Query a parameter (postgresql.conf setting) like “max_connections”
        https://stackoverflow.com/questions/8288823/query-a-parameter-postgresql-conf-setting-like-max-connections/8288860#8288860
        ans
          opt
            SHOW max_connections;
            SHOW ALL;
            SELECT *
              FROM   pg_settings
              WHERE  name = 'max_connections';
      How to filter SQL results in a has-many-through relation
        https://stackoverflow.com/questions/7364969/how-to-filter-sql-results-in-a-has-many-through-relation/7774879#7774879
        q
          student {
              id
              name
          }
          club {
              id
              name
          }
          student_club {
              student_id
              club_id
          }
          goal
            SELECT student.*
            FROM   student
            INNER  JOIN student_club sc ON student.id = sc.student_id
            LEFT   JOIN club c ON c.id = sc.club_id
            WHERE  c.id = 30 AND c.id = 50
        ans
          ddl
            ALTER TABLE student ADD CONSTRAINT student_pkey PRIMARY KEY(stud_id );
            ALTER TABLE student_club ADD CONSTRAINT sc_pkey PRIMARY KEY(stud_id, club_id);
            ALTER TABLE club       ADD CONSTRAINT club_pkey PRIMARY KEY(club_id );
            CREATE INDEX sc_club_id_idx ON student_club (club_id);
          opt1: JOIN twice
            SELECT s.stud_id, s.name
            FROM   student s
            JOIN   student_club x ON s.stud_id = x.stud_id
            JOIN   student_club y ON s.stud_id = y.stud_id
            WHERE  x.club_id = 30
            AND    y.club_id = 50;
          opt2: IN
            SELECT s.stud_id,  s.name
            FROM   student s
            WHERE  s.stud_id IN (SELECT stud_id FROM student_club WHERE club_id = 30)
            AND    s.stud_id IN (SELECT stud_id FROM student_club WHERE club_id = 50);
          opt3: EXISTS
            SELECT s.stud_id,  s.name
            FROM   student s
            WHERE  EXISTS (SELECT * FROM student_club
                           WHERE  stud_id = s.stud_id AND club_id = 30)
            AND    EXISTS (SELECT * FROM student_club
                           WHERE  stud_id = s.stud_id AND club_id = 50);
          opt4: EXISTS
            SELECT s.*
            FROM   student s
            JOIN   student_club x USING (stud_id)
            WHERE  sc.club_id = 10                 -- member in 1st club ...
            AND    EXISTS (                        -- ... and membership in 2nd exists
               SELECT *
               FROM   student_club AS y
               WHERE  y.stud_id = s.stud_id
               AND    y.club_id = 14
               )
      Export specific rows from a PostgreSQL table as INSERT SQL script
        https://stackoverflow.com/questions/12815496/export-specific-rows-from-a-postgresql-table-as-insert-sql-script/12824831#12824831
        ans
          COPY
            For a data-only export use COPY.
            You get a file with one table row per line as plain text (not INSERT commands), it's smaller and faster:
            COPY (SELECT * FROM nyummy.cimory WHERE city = 'tokio') TO '/path/to/file.csv';
          Import 
            COPY other_tbl FROM '/path/to/file.csv';
          COPY vs pg_dump/psql
            COPY: runs on server
            pg_dump, psql: runs on client
          \copy
            run by client
            runs an SQL COPY command
            psql reads/writes
      https://stackoverflow.com/questions/22736742/query-for-array-elements-inside-json-type/22737710#22737710
      PostgreSQL sort by datetime asc, null first?
        https://stackoverflow.com/questions/9510509/postgresql-sort-by-datetime-asc-null-first/9511492#9511492
        ans
          NULLS FIRST | LAST keywords for the ORDER BY clause to cater for that need exactly:
          ORDER BY last_updated NULLS FIRST
      PostgreSQL unnest() with element number
        https://stackoverflow.com/questions/8760419/postgresql-unnest-with-element-number/8767450#8767450
        q
          myTable
            id | elements
            ---+------------
            1  |ab,cd,efg,hi
            2  |jk,lm,no,pq
            3  |rstuv,wxyz
          select id, unnest(string_to_array(elements, ',')) AS elem
          from myTable
            id | elem
            ---+-----
            1  | ab
            1  | cd
            1  | efg
            1  | hi
            2  | jk
            ...
          How can I include element numbers? I.e.:
            id | elem | nr
            ---+------+---
            1  | ab   | 1
            1  | cd   | 2
            1  | efg  | 3
        ans
          opt
            SELECT t.id, a.elem, a.nr
            FROM   tbl t, unnest(t.arr) WITH ORDINALITY a(elem, nr);
          opt
            SELECT t.id, a.elem, a.nr
            FROM   tbl AS t
            LEFT   JOIN LATERAL unnest(string_to_array(t.elements, ','))
                                WITH ORDINALITY AS a(elem, nr) ON TRUE;
      Concatenate multiple result rows of one column into one, group by another column [duplicate]
        https://stackoverflow.com/questions/15847173/concatenate-multiple-result-rows-of-one-column-into-one-group-by-another-column/15850510#15850510
        q
          Movie   Actor   
            A       1
            A       2
            A       3
            B       4
          -->
          Movie   ActorList
           A       1, 2, 3
        ans
          SELECT movie, string_agg(actor, ', ') AS actor_list
          FROM   tbl
          GROUP  BY 1;
          The 1 in GROUP BY 1 is a positional reference and a shortcut for GROUP BY movie in this case.
      How to update selected rows with values from a CSV file in Postgres?
        https://stackoverflow.com/questions/8910494/how-to-update-selected-rows-with-values-from-a-csv-file-in-postgres/8910810#8910810
        ans
          I would COPY the file to a temporary table and update the actual table from there. Could look like this:
            CREATE TEMP TABLE tmp_x (id int, apple text, banana text); -- but see below
            COPY tmp_x FROM '/absolute/path/to/file' (FORMAT csv);
            UPDATE tbl
            SET    banana = tmp_x.banana
            FROM   tmp_x
            WHERE  tbl.id = tmp_x.id;
            DROP TABLE tmp_x; -- else it is dropped at end of session automatically
          If the imported table matches the table to be updated exactly, this may be convenient:
            CREATE TEMP TABLE tmp_x AS SELECT * FROM tbl LIMIT 0;
      PL/pgSQL checking if a row exists
        https://stackoverflow.com/questions/11892233/pl-pgsql-checking-if-a-row-exists/11892796#11892796
          ans
            IF EXISTS (SELECT 1 FROM people WHERE person_id = my_person_id) THEN
              -- do something
            END IF;
      Create PostgreSQL ROLE (user) if it doesn't exist
        https://stackoverflow.com/questions/8092086/create-postgresql-role-user-if-it-doesnt-exist/8099557#8099557
        ans
          DO
          $body$
          BEGIN
             IF NOT EXISTS (
                SELECT                       -- SELECT list can stay empty for this
                FROM   pg_catalog.pg_user
                WHERE  usename = 'my_user') THEN

                CREATE ROLE my_user LOGIN PASSWORD 'my_password';
             END IF;
          END
          $body$;
          Unlike, for instance, with CREATE TABLE there is no IF NOT EXISTS clause for CREATE ROLE (yet). And you cannot execute dynamic DDL statements in plain SQL.
      Which data type for latitude and longitude
        ans
          point in geography
      How to select id with max date group by category in PostgreSQL
        https://stackoverflow.com/questions/16914098/how-to-select-id-with-max-date-group-by-category-in-postgresql/16920077#16920077
        ans
          SELECT DISTINCT ON (category)
                 id
          FROM   tbl
          ORDER  BY category, "date" DESC;
          points
            If the column can be NULL, you may want to add NULLS LAST
      Postgres FOR LOOP
        https://stackoverflow.com/questions/19145761/postgres-for-loop/19147320#19147320
        ans
          DO
          $do$
          BEGIN 
          FOR i IN 1..25 LOOP
             INSERT INTO playtime.meta_random_sample (col_i, col_id) -- use col names
             SELECT i, id
             FROM   tbl
             ORDER  BY random()
             LIMIT  15000;
          END LOOP;
          END
          $do$;
      What is the difference between LATERAL and a subquery in PostgreSQL
        https://stackoverflow.com/questions/28550679/what-is-the-difference-between-lateral-and-a-subquery-in-postgresql/28557803#28557803
        ans
          A LATERAL join (Postgres 9.3+) is more like a correlated subquery, not a plain subquery. Like @Andomar pointed out, a function or subquery to the right of a LATERAL join typically has to be evaluated many times - once for each row left of the LATERAL join
          examples:
            Optimize GROUP BY query to retrieve latest record per user <url:#r=adb_007>
          Things a subquery can't do
            correlated subquery can
              return one value (no multiple columns and rows)
            So this works, but cannot easily be replaced with a subquery:
              CREATE TABLE tbl (a1 int[], a2 int[]);
              SELECT *
              FROM   tbl t
                   , unnest(t.a1, t.a2) u(elem1, elem2);  -- implicit LATERAL
            The comma (,) in the FROM clause is short notation for CROSS JOIN.
              LATERAL is assumed automatically for table functions like unnest().)
              ref
                How do you declare a set-returning-function to only be allowed in the FROM clause? <url:#r=adb_008>
          Set-returning functions in the SELECT list
            SELECT *, unnest(t.a1) AS elem1, unnest(t.a2) AS elem2
            FROM   tbl t;
              http://dbfiddle.uk/?rdbms=postgres_10&fiddle=b78160f4899d95444e2a605a9609cf8f
      How do you declare a set-returning-function to only be allowed in the FROM clause? id=adb_008
        How do you declare a set-returning-function to only be allowed in the FROM clause? <url:#r=adb_008>
        https://dba.stackexchange.com/questions/160309/how-do-you-declare-a-set-returning-function-to-only-be-allowed-in-the-from-claus/160310#160310
        q
          "unnest" is only allowed in FROM clause
          unnest is set-returning function
          How does one declare their set returning function to be FROM-clause only, or is this only permissible with unnest?
        ans
          this is only for unnest()
          unnest() with multiple parameters is a special Postgres feature, that's internally rewritten into multiple unnest() calls
          The special table function UNNEST may be called with any number of array parameters, and it returns a corresponding number of columns, as if UNNEST (Section 9.18) had been called on each parameter separately and combined using the ROWS FROM construct.
          If you try unnest() with multiple parameters in the SELECT list, you get:
            ERROR: function unnest(text[], text[]) does not exist
          In fact, there is no unnest() function with multiple parameters registered in the system:
            SELECT proname, proargtypes, proargtypes[0]::regtype
            FROM   pg_proc
            WHERE  proname = 'unnest';
             proname | proargtypes | proargtypes
            ---------+-------------+-------------
             unnest  | 2277        | anyarray
             unnest  | 3614        | tsvector
      Postgres - array for loop
        https://stackoverflow.com/questions/9783422/postgres-array-for-loop/9784986#9784986
        ans
          Since PostgreSQL 9.1 there is the convenient FOREACH:
            DO
            $do$
            DECLARE
               m   varchar[];
               arr varchar[] := array[['key1','val1'],['key2','val2']];
            BEGIN
               FOREACH m SLICE 1 IN ARRAY arr
               LOOP
                  RAISE NOTICE 'another_func(%,%)',m[1], m[2];
               END LOOP;
            END
            $do$
          Solution for older versions:
            DO
            $do$
            DECLARE
               arr varchar[] := '{{key1,val1},{key2,val2}}';
            BEGIN
               FOR i IN array_lower(arr, 1) .. array_upper(arr, 1)
               LOOP
                  RAISE NOTICE 'another_func(%,%)',arr[i][1], arr[i][2];
               END LOOP;
            END
            $do$
      Table name as a PostgreSQL function parameter
        https://stackoverflow.com/questions/10705616/table-name-as-a-postgresql-function-parameter/10711349#10711349
        ans
          function
            CREATE OR REPLACE FUNCTION some_f(_tbl regclass, OUT result boolean) AS
            $func$
            BEGIN
            EXECUTE format('SELECT EXISTS (SELECT 1 FROM %s WHERE id = 1)', _tbl)
            INTO result;
            END
            $func$ LANGUAGE plpgsql;
          call
            SELECT some_f('myschema.mytable');  -- would fail with quote_ident()
          points
            Use an OUT parameter to simplify the function. You can directly select the result of the dynamic SQL into it and be done.
            I use the object identifier type regclass as input type for _tbl. That does everything quote_ident(_tbl) or format('%I', _tbl) would do, but better, because:
              it prevents SQL injection just as well.
              it fails immediately and more gracefully if the table name is invalid / does not exist / is invisible to the current user.
              it works with schema-qualified table names, where a plain quote_ident(_tbl) or format(%I) would fail because they cannot resolve the ambiguity.
      SQL Injection with user input
        http://sqlfiddle.com/#!15/39ef7/3
        schema
          CREATE TABLE foo (id serial, data text);
          INSERT INTO foo (data) VALUES ('Important data');
          CREATE FUNCTION unsafe_add_table(text)
            RETURNS void AS
          $func$
          BEGIN
             EXECUTE 'CREATE TABLE ' || $1 || '(item_1 int, item_2 int)';
          END
          $func$  LANGUAGE plpgsql;
        code
          TABLE foo;
          -- malicious call with SQL injection
          SELECT unsafe_add_table('bar(id int); DELETE FROM foo; CREATE TABLE baz');
          TABLE foo;
      SQL injection in Postgres functions vs prepared queries
        https://dba.stackexchange.com/questions/49699/sql-injection-in-postgres-functions-vs-prepared-queries
        ans
          With SQL functions (LANGUAGE sql), the answer is generally yes. Passed parameters are treated as values and SQL-injection is not possible - as long as you don't call unsafe functions from within and pass parameters.
          With PL/pgSQL functions (LANGUAGE plpgsql), the answer is normally yes.
            However, PL/pgSQL allows for dynamic SQL where passed parameters (or parts) can be treated as identifiers or code, which makes SQL injection possible. You cannot tell from outside whether the function body deals with that properly. 
          If parameters should be treated as values or plain text in dynamic SQL with EXECUTE, use
            the USING clause. Example.
              function
                CREATE OR REPLACE FUNCTION get_stuff(_param text, _orderby text, _limit int)
                  RETURNS SETOF stuff AS
                $BODY$
                BEGIN
                RETURN QUERY EXECUTE '
                    SELECT *
                    FROM   stuff
                    WHERE  col = $1
                    ORDER  BY ' || quote_ident(_orderby) || '
                    LIMIT  $2'
                USING _param, _limit;
                END;
                $BODY$
                  LANGUAGE plpgsql;
              Call:
                SELECT * FROM get_stuff('hello', 'col2', 100);
            format() with %L. The format specifier %s is only good for safe text, not for user input.
              ref
                Postgresql manual: format() <url:#r=adb_009>
            quote_literal() or quote_nullable()
          If parameters should be treated as identifiers, properly sanitize them with one of these tools:
            format() with %I
            quote_ident(_tbl)
            A cast to a registered type (regclass) _tbl::regclass. Example.
      Postgresql manual: format() id=adb_009
        Postgresql manual: format() <url:#r=adb_009>
        https://www.postgresql.org/docs/current/static/functions-string.html#FUNCTIONS-STRING-OTHER
        type (required)
          s formats the argument value as a simple string. A null value is treated as an empty string.
          I treats the argument value as an SQL identifier, double-quoting it if necessary. It is an error for the value to be null (equivalent to quote_ident).
          L quotes the argument value as an SQL literal. A null value is displayed as the string NULL, without quotes (equivalent to quote_nullable).
        %%: for literal %
        ex
          SELECT format('Hello %s', 'World');
          Result: Hello World
          SELECT format('Testing %s, %s, %s, %%', 'one', 'two', 'three');
          Result: Testing one, two, three, %
          SELECT format('INSERT INTO %I VALUES(%L)', 'Foo bar', E'O\'Reilly');
          Result: INSERT INTO "Foo bar" VALUES('O''Reilly')
          SELECT format('INSERT INTO %I VALUES(%L)', 'locations', E'C:\\Program Files');
          Result: INSERT INTO locations VALUES(E'C:\\Program Files')
      PostgreSQL: SQL Injection
        http://bobby-tables.com/postgresql
        ex1: plpgsql
          CREATE OR REPLACE FUNCTION user_access (p_uname TEXT)
            RETURNS timestamp LANGUAGE plpgsql AS
          $func$
          BEGIN
              RETURN accessed_at FROM users WHERE username = p_uname;
          END
          $func$;
        ex2: sql
          CREATE OR REPLACE FUNCTION user_access (p_uname TEXT)
            RETURNS timestamp LANGUAGE sql AS
          $func$
              SELECT accessed_at FROM users WHERE username = $1
          $func$;
        ex3: dynamic sql - vulnerable
          CREATE OR REPLACE FUNCTION get_users(p_column TEXT, p_value TEXT)
            RETURNS SETOF users LANGUAGE plpgsql AS
          $func$
          DECLARE
              query TEXT := 'SELECT * FROM users';
          BEGIN
              IF p_column IS NOT NULL THEN
                  query := query || ' WHERE ' || p_column
                        || $_$ = '$_$ || p_value || $_$'$_$;
              END IF;
              RETURN QUERY EXECUTE query;
          END
          $func$;
        ex4: better: USING
          CREATE OR REPLACE FUNCTION get_users(p_column TEXT, p_value TEXT)
            RETURNS SETOF users LANGUAGE plpgsql AS
          $func$
          DECLARE
              query TEXT := 'SELECT * FROM users';
          BEGIN
              IF p_column IS NOT NULL THEN
                  query := query || ' WHERE ' || quote_ident(p_column) || ' = $1';
              END IF;
              RETURN QUERY EXECUTE query
              USING p_value;
          END;
          $func$;
      Sort NULL values to the end of a table
        https://stackoverflow.com/questions/7621205/sort-null-values-to-the-end-of-a-table/7622046#7622046
        ans:
          NULL are sorted last in default ascending order
          in descending: NULL first
            ORDER BY col DESC NULLS LAST
      What are '$$' used for in PL/pgSQL
        https://stackoverflow.com/questions/12144284/what-are-used-for-in-pl-pgsql/12172353#12172353
        ans
          dollar signs: used for dollar quoting
          opt: use single quotes for function body
            CREATE OR REPLACE FUNCTION check_phone_number(text)
            RETURNS boolean AS
            '
            BEGIN
              IF NOT $1 ~  e''^\\+\\d{3}\\ \\d{3} \\d{3} \\d{3}$'' THEN
                RAISE EXCEPTION ''Malformed string "%". Expected format is +999 999'';
              END IF;
              RETURN true; 
            END
            ' LANGUAGE plpgsql STRICT IMMUTABLE;
          ex: better use $$ or $token$
            CREATE OR REPLACE FUNCTION check_phone_number(text)
              RETURNS boolean  
            AS
            $func$
            BEGIN
             ...
            END
            $func$  LANGUAGE plpgsql STRICT IMMUTABLE;
      PostgreSQL: Which Datatype should be used for Currency
        ans
          personally: store currency as "integer" representing Cents
      Discard millisecond part from timestamp
      Optimize GROUP BY query to retrieve latest record per user
        https://stackoverflow.com/questions/25536422/optimize-group-by-query-to-retrieve-latest-record-per-user/25536748#25536748
        ans
      Order varchar string as numeric
      Creating temporary tables in SQL
        https://stackoverflow.com/questions/15691243/creating-temporary-tables-in-sql/15700736#15700736
        ans
          CREATE TEMP TABLE temp1 AS
          SELECT dataid
               , register_type
               , timestamp_localtime
               , read_value_avg
          FROM   rawdata.egauge
          WHERE  register_type LIKE '%gen%'
          ORDER  BY dataid, timestamp_localtime
          This creates a temporary table and copies data into it. A static snapshot of the data, mind you. It's just like a regular table, but resides in RAM if temp_buffers is set high enough, is only visible within the current session and dies at the end of it. When created with ON COMMIT DROP it dies at the end of the transaction.
          Temp tables comes first in the default schema search path, hiding other visible tables of the same name unless schema-qualified:
      Grant all on a specific schema in the db to a group role in PostgreSQL
        https://stackoverflow.com/questions/10352695/grant-all-on-a-specific-schema-in-the-db-to-a-group-role-in-postgresql/10353730#10353730
        ans
          GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA foo TO staff;
          not:
            GRANT ALL ON SCHEMA foo TO staff;
            GRANT ALL ON DATABASE mydb TO staff;
          note that ALL TABLES is considered to include views and foreign tables).
          for serial columns, also do:
            GRANT USAGE ON ALL SEQUENCES IN SCHEMA foo TO mygrp;
          what about new objects:
            ALTER DEFAULT PRIVILEGES IN SCHEMA foo GRANT ALL PRIVILEGES ON TABLES TO staff;
            ALTER DEFAULT PRIVILEGES IN SCHEMA foo GRANT USAGE          ON SEQUENCES TO staff;
            ALTER DEFAULT PRIVILEGES IN SCHEMA foo REVOKE ...;
      How to return result of a SELECT inside a function in PostgreSQL
        https://stackoverflow.com/questions/7945932/how-to-return-result-of-a-select-inside-a-function-in-postgresql/7945958#7945958
        ans
          Use RETURN QUERY:
          function
            CREATE OR REPLACE FUNCTION word_frequency(_max_tokens int)
              RETURNS TABLE (
                txt   text   -- visible as OUT parameter inside and outside function
              , cnt   bigint
              , ratio bigint) AS
            $func$
            BEGIN
               RETURN QUERY
               SELECT t.txt
                    , count(*) AS cnt  -- column alias only visible inside
                    , (count(*) * 100) / _max_tokens  -- I added brackets
               FROM  (
                  SELECT t.txt
                  FROM   token t
                  WHERE  t.chartype = 'ALPHABETIC'
                  LIMIT  _max_tokens
                  ) t
               GROUP  BY t.txt
               ORDER  BY cnt DESC;  -- note the potential ambiguity 
            END
            $func$  LANGUAGE plpgsql;
          Call:
            SELECT * FROM word_frequency(123);
          points
            It is much more practical to explicitly define the return type than simply declaring it as record. This way you don't have to provide a column definition list with every function call. RETURNS TABLE is one way to do that
      Running PostgreSQL in memory only
      PostgreSQL: running count of rows for a query 'by minute'
      Calculating Cumulative Sum in PostgreSQL
      Split comma separated column data into additional columns
      Select first row in each GROUP BY group
      What are the pros and cons of performing calculations in sql vs. in your application
      Auto increment SQL function
      PostgreSQL IF statement
      Computed / calculated columns in PostgreSQL
      Store common query as column
      vim
        %s/\w\{3\} \d\d\? '\d\{2\} at \d\d\?:\d\d \d\d /\r/g















