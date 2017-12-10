    <url:file:///~/Dropbox (Personal)/mynotes/content/code/cpy/cpy.md>

_ id=r_lastid cpy_0001

# stuff

    os - operating system
      get working directory
        import os
        cwd = os.getcwd()

# database sql

    tools
      jupyter: ipython-sql
      anosql
      pgcli
    sql jupyter
      https://github.com/catherinedevlin/ipython-sql
      install
        pip install ipython-sql
        pip install psycopg2
      usage
        %load_ext sql
        %%sql postgresql://superuser:superuserpass@localhost/app
        select * from api.todos;
        %sql select 1;
      multiple databases
        %%sql user@db2
        select 1;
      credentials from env
        In [11]: user = os.getenv('SOME_USER')
           ....: password = os.getenv('SOME_PASSWORD')
           ....: connection_string = "postgresql://{user}:{password}@localhost/some_database".format(user=user, password=password)
           ....: %sql $connection_string
        Out[11]: u'Connected: some_user@some_database'
      bind variables
        In [12]: name = 'Countess'
        In [13]: %sql select description from character where charname = :name
        Out[13]: [(u'mother to Bertram',)]
      dict style access
        In [14]: result = %sql select * from work
        43 rows affected.
        In [15]: result['richard2']
        Out[15]: (u'richard2', u'Richard II', u'History of Richard II', 1595, u'h', None, u'Moby', 22411, 628)
      multi line sql
        code
          %%sql 
            works << SELECT title, year
            FROM work
        sql code should be in separate line than %%sql
        Returning data to local variable works
      Pandas
        In [3]: result = %sql SELECT * FROM character WHERE speechcount > 25
        In [4]: dataframe = result.DataFrame()
      config options
        %config SqlMagic
        %config SqlMagic.displaylimit = 5
    anosql
      https://github.com/honza/anosql
      setup
        pip install anosql
        import anosql
        import psycopg2
        import sqlite3
        # PostgreSQL
        conn = psycopg2.connect('...')
        queries = anosql.load_queries('postgres', 'queries.sql')
        # Or, Sqlite3...
        conn = sqlite3.connect('cool.db')
        queries = anosql.load_queries('sqlite', 'queries.sql')
      use
        queries = queries.get_all_greetings(conn)
        # => [(1, 'Hi')]
        queries.get_all_greetings.__doc__
        # => Get all the greetings in the database
        queries.get_all_greetings.__query__
        # => SELECT * FROM greetings;
        queries.available_queries
        # => ['get_all_greetings']
    pgcli
      setup
        pip install -U pgcli
        pgcli postgresql://superuser:superuserpass@localhost/app
      psql backslash commands
        \dn
      ipython/jupyter
        %load_ext pgcli.magic
        %pgcli postgres://someone@localhost:5432/world
        %pgcli postgresql://superuser:superuserpass@localhost/app

# panda



