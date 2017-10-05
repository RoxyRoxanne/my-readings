    <url:file:///~/Dropbox/mynotes/content/ref.otl>

# _me automation scripts

  classify books
    project root
      /Users/mertnuhoglu/projects/classify_books
  use
    cd ~/Downloads/kitap
    classify_books.sh /Users/mertnuhoglu/Documents/yayin/kitap/

# Android

  transfer files from android to osx
    windows pc (toshiba) -> usb ile bağla -> düz dosya transferi
    ekran açık olmalı

# aws

    access key
      aws cosnole > mert nuhoglu (top right) > my security credentials > access keys
    cli
      s3
        aws s3 ls s3://mert01
          lists all files in bucket mert01
        aws s3 ls s3://mert01/2017
          lists all files that start with 2017 in bucket mert01
        aws s3 rm s3://mert01 --include="2017-*"
          remove files 
        aws s3 sync . s3://mert01/test/
          uploads all files in . to mert01/test
          creates test/ directory

# bash

  cd to script directory
    https://stackoverflow.com/questions/3349105/how-to-set-current-working-directory-to-the-directory-of-the-script
    cd "$(dirname "$0")"
  default value for arguments/variables
    tmpdir=/tmp
    defvalue=1
    DIR=${1:-$tmpdir}   # Defaults to /tmp dir.
    VALUE=${2:-$defvalue}           # Default value is 1.
  history/previous command starting with
    ctrl-r start typing
    ctrl-s  next search
  argument
    #!/bin/bash
    echo "Total number of arguments: $#"
    echo "Argument 1: $1"
  cd to directory of the running script
    DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
      http://stackoverflow.com/questions/59895/can-a-bash-script-tell-what-directory-its-stored-in
    cd "${0%/*}"
      http://stackoverflow.com/questions/3349105/how-to-set-current-working-directory-to-the-directory-of-the-script
  quoting quotes
    awk -F "\t" '{printf("INSERT  %s ;\n", $1)}'
    ->
    awk -F "\t" '{printf("INSERT '\''%s'\'' ;\n", $1)}'

## terminal shortcuts

  http://www.skorks.com/2009/09/bash-shortcuts-for-maximum-productivity/
  ^a  go to start
  ^e  go to end
  ^k  delete from cursor to end
  ^u  delete from cursor to start
  ^w  delete backwards word
  !b  move back one word
  !f  move forward one word
  ^1  clear screen
  !!  run last command

## _me custom commands

  xlsxcut_all 7
    cut 7th column of all xlsx files in the current directory and save as csv
    cut using csvcut
  convert_1280
    convert image to 1280 
      convert_1280 x.jpg
  md dosyalarını word docx formatına çevirmek
    md2word
    md2word_all_dirs
    usage
      # ./md2word.sh dir_name/
      # md2word_all_dirs.sh

## getopt option arguments

  example
    ex1
      while getopts ":n:" opt; do
        case $opt in
          n)
            dry_run="True"
            ;;
          \?)
            dry_run="False"
            ;;
        esac
      done
      if [[ $dry_run == "True" ]]; then 
        match=$2
        replace=$3
        echo $match
        echo $replace
        ack -l "$match" | xargs -n1 -d '\n' -I {} echo {}
      else
        match=$1
        replace=$2
        echo $match
        echo $replace
        ack -l "$match" | xargs -n1 -d '\n' -I {} sed -i -e "s#$match#$replace#g" {}
      fi
    ex2
      while getopts ":s:d:e:f:r:" opt; do
        case $opt in
          d)
            dir=${OPTARG}
            ;;
          f)
            file_list_source=${OPTARG}
            ;;
          s)
            ;;
          *)
            ;;
        esac
      done
      if [ -z ${file_list_source+x} ]; then 
        file_list=($(ls $dir | grep -F $ext))
      else 
        f=($(< $file_list_source ))
        f=("${f[@]/%/$ext}")
        file_list=("${f[@]:0}")
      fi

## string

  boşluk/space
    dizin yollarında boşluk varsa, "" çift tırnak içine al
    cd "$analysis_dir"
  concat strings
    http://stackoverflow.com/questions/4181703/how-can-i-concatenate-string-variables-in-bash
      foo="Hello"
      foo="$foo World"
      echo $foo
      > Hello World
      In general to concatenate two variables you can just write them one
      after another:
      a='hello'
      b='world'
      c=$a$b
      echo $c
      > helloworld
    

## read/write input/output

  read lines into an array
    http://stackoverflow.com/questions/11393817/bash-read-lines-in-file-into-an-array
      IFS=$'\n' read -d '' -r -a lines < /etc/passwd
      printf "line 1: %s\n" "${lines[0]}"
  read csv lines into array
    while IFS=$'\t' read -r -a lines; do
      source="${lines[0]}"
      target="${lines[1]}"
      echo $source
      echo $target
    done < ${folder_list}

## if conditional control

  man test
  check if string is empty/unset
    if [ -z ${var+x} ]; 
      then echo "var is unset"; 
      else echo "var is set to '$var'"; 
    fi
    ${var+x} is a parameter expansion 
      evaluates to the null if var is unset and 
      substitutes the string "x" otherwise,
  -z  is empty string
  -n  is not empty (default operation)
  -f  if file exists 
  -L  if file exists and is a symlink
  -x  if file exists and is executable


## parameter expansion / substitution / templating

  ${var//Pattern/Replacement}
    global replacement
    ${MYSTRING//conservative/happy}
    replace all spaces with dash
      target=${target// /-}
  ${var:pos:len}
    substring from pos to len
  examples
    remove extension (basename)
      ${filename%.*}
    get extension
      ${filename##*.}
    get directory name (base path)
      ${pathname%/*}
    get filename (remove path)
      ${pathname##*/}
  concept naming
    filepath=$1
    # echo $filepath
    # ./gis/datamodel_gis.md
    basepath=${filepath%/*}
    # echo $basepath
    # ./gis/datamodel_gis
    filename=${filepath##*/}
    # echo $filename
    # datamodel_gis.md
    basename=${filename%.*}
    # echo $basename
    # datamodel_gis
    basepath_nodot=${basepath#*/}
    # echo $basepath_nodot
    # gis
    folder=${basepath_nodot%/*}
    # echo $folder
    # gis
    targetfolder=${folder}/img
    # echo $targetfolder
    # gis/img
    target_text=${targetfolder}/${basename}_yuml.txt
    # echo $target_text
    # gis/img/datamodel_gis_yuml.txt
    target_img=${targetfolder}/${basename}.png
    echo $target_img
    # gis/img/datamodel_gis.png
  why #% instead of /
    string removal - percent of string % - is number #
  from end %, start #
    percent - 100 - end %
  first occurrence or all occurrence
    first: single % #, all double %% ##
  indirection ! why?
    warning this is not me - it is my indirection
  variable name expansion !var*
    indirect wildcard * - how?
  all variables * or @
    @ arguments - @ all
  all array elements
    @ array
  length of string
    length - number - #
  substring - range
    substring - string is an array - range in array - [:] - :
  default value :
    default :

## paths

  get base path
    basepath="${filename##*/}"
  use home dir
    dropbox_root="$HOME/Dropbox (BTG)/"

## array

  declaration
    arr=()
  storing values
    arr[n]=val
    arr[key]=val
    arr=(e1 e2 ...)
    arr=([x]=e1 [y]=e2 ...)
      associative array
    arr+=(e1 e2 ..)
  metadata
    ${#arr[n]}
      length of arr[n] stringlength
    ${#arr[@]}
      number of elements in arr
    ${!arr[@]}
      indexes (keys) of arr
  array=($(..))
    ($string1 $string2)
  string=$(..)
    $tring
  getting values
    ${arr[n]}
    ${arr[key]}
    ${arr[@]}
      all elements
      @ or *
      unquoted or ""
    ${arr[@]:N:M}
      from N to M
  loop over for
    for filename in "${file_list[@]}"; do
  ex
    wpprojects="wpci wpsb wpbp wdpr zwba wpbk"
    for wp in $wpprojects

## redirections

  stdout to file
    ls > logs
  stderr to file
    cmd 2> logs
  stdout and stderr to file
    ls &> logs
  stdout to stderr
    ls 1>&2
  output to trash
    ls &> /dev/null

## for loops

  read csv columns and loop over rows
    <url:file:///~/Dropbox (Personal)/projects/classify_books/classify_books.sh>
    classifications=${script_root}/classification_rules.csv
    while IFS=, read keyword path
    do 
      echo "$keyword $path"
      ls * | ag -i "$keyword" | tr '\012' '\000' | xargs -0 -I file mv $source/file $target/$path
    done < $classifications
  run a script over multiple files
    find . -name '*.md' -print0 | xargs -r0 $filename
  Loop over files
    for filename in *.csv; do
      echo $filename >> test_joined.csv
    done
  Loop over a range of numbers
    for i in {1..5}; do echo $i; done
  using variables for end points
    for i in $(seq 1 $END); do echo $i; done
  built-in bash
    for i in $(eval echo "{1..$END}"); do

## append to file

  how to append some text to a file
    >>

# chrome

  chrome debug developer tools
    debug a HTTP POST (json)
      chrome > network > .refresh page > headers > request payload
    
# Data science on cli
  print column
    awk '{print $1}'
    perl -lane 'print $F[0]'
    cut -d " " -f 1,3 "file"
    Rio -rse 'df[1]'
  calling R using Rio
    find . -name "*.R" | xargs wc -l | perl -pe 's/ +/,/g' | Rio -rse 'df[2] %>% sum'

# DigitalOcean

  ubuntu-01
    static html files
      /srv/www/veribilimi.mertnuhoglu.com/html
    deployment scripts
      deployhugo
      /Users/mertnuhoglu/Dropbox/projects/stuff/bash
  ssh and add new user
    settings > reset password
    ssh root@ > passwd
    adduser mertnuhoglu
    usermod -aG sudo mertnuhoglu
    su - mertnuhoglu
    sudo ls -la /root
  add ssh public key
    client
      cat ~/.ssh/id_rsa.pub | ssh root@[your.ip.address.here] "cat >> ~/.ssh/authorized_keys"
    disallow password access
      vim /etc/ssh/sshd_config
        PermitRootLogin without-password
  upload
  install mongo
    https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04
      sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
      echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
      sudo apt-get update
      sudo apt-get install -y mongodb-org --allow-unauthenticated
      sudo vim /etc/systemd/system/mongodb.service
        # paste content
      sudo systemctl start mongodb
      sudo systemctl status mongodb
      sudo systemctl enable mongodb
      sudo systemctl mongodb stop
    access
      sudo ufw allow 27017
        allow from everywhere
  install java
    https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04
    sudo apt-get update
    # sudo apt-get install default-jre
    sudo apt-get install default-jdk
    sudo update-alternatives --config java
    sudo nano /etc/environment
      JAVA_HOME="/usr/lib/jvm/java-8-oracle"

# Docker

  ref
    docker <url:file:///~/Dropbox/mynotes/content/code/ccode.md#r=g_10120>
  run docker command inside container
    -v /var/run/docker.sock:/var/run/docker.sock 
    -v $(which docker):/usr/bin/docker 
      in general
    - "/usr/bin/docker:/usr/bin/docker"
      osx
  run
    docker run -it node:6.6.0 bash
    docker run --name container_name -d -p -t .. image_name [bash]
    docker run -d --name db training/postgres
    docker run --rm --name web2 --link db:db training/webapp env
    docker run -it --rm cplex01:current bash
    docker run -it <container_name> bash
    docker run -d --name="myApp-1" -v="myAwesomeApp:/data/app" myApp
  exec
    docker exec -it vrp_java_1 bash
  print names only - docker ps
    docker ps -a --format '{{.Names}}'
    docker ps -a | tail -n +2 | awk '{print $NF}'
  config: show config file
    docker-compose config
      this puts env variables into placeholders 
  turn interactive mode off - exit
    ^p^q
  tasks
    inspect / check volumes 
      docker inspect -f '{{ .Mounts }}' <containerid>
  uml
    [Image]
    [Layer| image_id; prev_image; ]
    [Repository| name; tag; ]
    [Container| id; name; ]
    [Image] 1-n [Layer]
    [Layer] prev_image n->1 [Layer]
    [Layer] n-n [Repository]
    [Layer] 1-n [Container]
    container: an instance of an image
    image: a set of layers
    a running instance of an image is a container
  commands
    Dockerfile
      FROM image_name
      EXPOSE port1:port2
    docker build -t container_name:tag PATH
      creates an image from Dockerfile
      PATH  path of Dockerfile
      -t --tag  name and optionally a tag
    docker run --name container_name -d -p -t .. image_name [bash]
      docker run [options] IMAGE [command] [arguments]
      docker run -it --rm cplex01:current bash
      run a command in a new container
      --name  assign a name to container
      -d --detach run container in background
      -p --publish  publish container's port to host
      -t --interactive  allocates a pseudo TTY which connects a user's terminal with stdin and stdout
      -i --interactive  keeps stdin open even if not attached
      --rm  remove container after running
      [bash]  run bash command after running
        so it won't exit after running
    docker pull image_name
    docker images
      shows images
    docker ps -a
      shows containers
    docker ps
      shows running containers
    docker attach container_name
      connect to a container_name after having stopped and started it
    docker stop container_name
    docker rm container_name
    docker-compose -f docker-compose.yml -f production.yml up -d
      https://docs.docker.com/compose/production/#modify-your-compose-file-for-production
      https://docs.docker.com/compose/extends/#different-environments
      multiple yml files
    push to docker hub
      docker tag 6da0a3e0623c mertnuhoglu/maven_shiny_dplyr:3
      docker push mertnuhoglu/maven_shiny_dplyr:5
  installing docker on digitalocean
    https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04
  installing docker on ec2
    http://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html
      sudo yum update -y
      sudo yum install -y docker
      sudo service docker start
      sudo usermod -a -G docker ec2-user
      restart
      docker info
  errors
    error: /reports açılmıyor
      lokalde farklı url'ler çalışmıyor, ama sunucuda çalışıyor. neden?
      sebep:
        lokal dockerdan çalışıyormuş, o yüzden güncellenmiyormuş
  arguments
    -d detached mode
      container starts up and run in background
    --link
      --link <name or id>:alias
        name: container name
        alias: alias for link name inside other container
      --link <name or id>
        by default alias = name
      https://docs.docker.com/engine/userguide/networking/default_network/dockerlinks/
        bridge network
        connect using network port mapping
          -p 80:80
        connect with linking system
          legacy link feature in default bridge network
          relies on the names of containers
            ex:
              docker run -d -P --name web training/webapp python app.py
                training/webapp: username/image_id
                --name web: container name
                -P: all ports
        communication across links
          ex:
            # database
            docker run -d --name db training/postgres
            docker run -d -P --name web --link db:db training/webapp python app.py
          --link doesn't expose any ports
          connectivity information exposed in two ways: 
            environment variables
            /etc/hosts file
          connectivity information by environment variables
            docker creates all env variables from source (ex: db) container in target container
              <alias_NAME> environment variables created
            docker defines env variables for each port exposed by source
              <alias>_PORT_<port>_<protocol>
            docker run --rm --name web2 --link db:db training/webapp env
              # list all env variables
          connectivity information by /etc/hosts
            ex
              $ docker run -t -i --rm --link db:webdb training/webapp /bin/bash
              root@aed84ee21bde:/opt/webapp# cat /etc/hosts
              172.17.0.7  aed84ee21bde
              . . .
              172.17.0.5  webdb 6e5cdeb2d300 db
            172.17.0.5  webdb 6e5cdeb2d300 db
              webdb: alias
              6e5cdeb2d300: container id
              db: name
              # her üçü de kullanılabilir, ip adresi yerine
            ping them
              apt-get install -yqq inetutils-ping
              ping webdb
              ping db
              ping 6e5cdeb2d300


## Dockerfile

  copy files
    COPY run_shiny.R /srv/
  copy directory contents
    COPY shinyapp/ /srv/
  copy directory structure
    COPY shinyapp/ /srv/shinpapp/

# expressjs

## pugjs

  string interpolation inside attributes
    works
      var file = "something"
      a(href=file) `#{file}`
      a(href='/reports/' + file) #{file}

# Firefox

## Vimperator

  disable vimperator 
    +esc    temporarily disable
    :ignorekeys add yt.teuis.net
    :ignorekeys add www.reddit.com
    :ignorekeys list

# Git

  change remote origin
    git remote set-url origin https://...
  add remote origin
    git remote add origin https://...
  get url of repo from local
    git remote show origin
    git remote -v
  commit uncommitted changes to existing branch
    https://stackoverflow.com/questions/2944469/how-to-commit-my-current-changes-to-a-different-branch-in-git
    git stash
    git checkout other-branch
    git stash pop
  branch merging
    # co = checkout
    # dev is a branch
    git co dev
    git merge master
    # resolve conflicts
    git co master
    git merge --no-ff dev
  stash
    stash apply vs stash pop
      stash pop
        stash'i geri yükledikten sonra otomatik olarak drop ediyor
      git stash pop =
        git stash apply
        git stash drop
    dosyayı önce stash'e kaydet sonra pull et, sonra stash'teki değişiklikleri geri al
      git stash
      git pull
      git stash list
      git stash apply
  github
    init project from local
      if local non empty
        create a new repo in github
        git init
        git remote add origin https://github.com/mertnuhoglu/slidify-demo-01.git
      if repo is non-empty
        git init
        git remote add origin https://github.com/mertnuhoglu/hugo01.git 
        git pull origin master
        git add some_file
        git commit -m "initial"
        git branch --set-upstream-to=origin/master master 
        git push origin master 
        git pull
  webfaction
    creating new repository
      ssh into wf
      cd ~/webapps/gitw/repos
      git init --bare repo_name.git
      cd repo_name.git
      git config http.receivepack true
    cloning repository on local
      git clone http://mertnuhoglu@git.mertnuhoglu.com/repo_name.git
      cd repo_name
      git config http.postBuffer 524288000
    cloning repo on webfaction
      git clone ~/webapps/gitw/repos/repo_name.git
  git clone into current directory
    git init .
    git remote add -t \* -f origin <repo-url>
  hub
    # clone your own project
      git clone dotfiles
      git clone git://github.com/YOUR_USER/dotfiles.git
    # clone another project
      git clone github/hub
      git clone git://github.com/github/hub.git
    # see the current project's issues
      git browse -- issues
      open https://github.com/github/hub/issues
    # open another project's wiki
      git browse mojombo/jekyll wiki
      open https://github.com/mojombo/jekyll/wiki
    # Example workflow for contributing to a project:
      git clone github/hub
      cd hub
    # create a topic branch
      git checkout -b feature
      ( making changes ... )
      git commit -m "done with feature"
    # It's time to fork the repo!
      git fork
      (forking repo on GitHub...)
      git remote add YOUR_USER git://github.com/YOUR_USER/hub.git
    # push the changes to your new remote
      git push YOUR_USER feature
    # open a pull request for the topic branch you've just pushed
      git pull-request
      (opens a text editor for your pull request message)
      an open-source maintainer
      a project is easier when you can easily fetch from other forks, review pull requests and cherry-pick URLs. You can even create a new repo for your next thing.
    # fetch from multiple trusted forks, even if they don't yet exist as remotes
      git fetch mislav,cehoffman
      git remote add mislav git://github.com/mislav/hub.git
      git remote add cehoffman git://github.com/cehoffman/hub.git
      git fetch --multiple mislav cehoffman
    # check out a pull request for review
      git checkout https://github.com/github/hub/pull/134
      (creates a new branch with the contents of the pull request)
    # directly apply all commits from a pull request to the current branch
      git am -3 https://github.com/github/hub/pull/134
    # cherry-pick a GitHub URL
      git cherry-pick https://github.com/xoebus/hub/commit/177eeb8
      git remote add xoebus git://github.com/xoebus/hub.git
      git fetch xoebus
      git cherry-pick 177eeb8
    # `am` can be better than cherry-pick since it doesn't create a remote
      git am https://github.com/xoebus/hub/commit/177eeb8
    # open the GitHub compare view between two releases
      git compare v0.9..v1.0
    # put compare URL for a topic branch to clipboard
      git compare -u feature | pbcopy
    # create a repo for a new project
      git init
      git add . && git commit -m "It begins."
      hub create -d "My new thing"
      (creates a new project on GitHub with the name of current directory)
      git push origin master

# github pages id=g_10032

  ref
    github pages <url:file:///~/Dropbox/mynotes/ref.otl#r=g_10032>
    Publishing Web Site and Blog <url:file:///~/Dropbox/mynotes/general/processes.md#r=g_10033>
    github pages <url:file:///~/Dropbox/mynotes/content/articles/articles.md#r=g_10027>
    Jekyll <url:file:///~/Dropbox/mynotes/ref.otl#r=g_10028>

# Google Cloud App Engine

  open deployed app
    gcloud app browse
  gcloud terminal client - cloud sdk 
    https://cloud.google.com/sdk/docs/quickstart-mac-os-x
  maven plugin
    https://github.com/GoogleCloudPlatform/app-maven-plugin
    https://cloud.google.com/appengine/docs/flexible/java/using-maven
    mvn appengine:deploy
  mongodb uri
    gcloud compute instances list
      use external ip
      https://cloud.google.com/python/getting-started/deploy-mongodb
  list instances
    gcloud compute instances list
  transfer files
    https://cloud.google.com/compute/docs/instances/transfer-files
    scp/sftp
    upload files
      gcloud compute copy-files [LOCAL_FILE_PATH] [INSTANCE_NAME]:~/
      gcloud compute copy-files /Users/mertnuhoglu/Dropbox/mynotes/prj/itr/data.zip mongodb-1-server-1:~/
    download files
      gcloud compute copy-files [INSTANCE_NAME]:[REMOTE_FILE_PATH] [LOCAL_FILE_PATH]
      gcloud compute copy-files mongodb-1-server-1:/home/mert_nuhoglu /Users/mertnuhoglu/Dropbox/mynotes/prj/itr/
  set default zones
    https://cloud.google.com/compute/docs/gcloud-compute/#change_your_default_zone_and_region_in_the_metadata_server
    gcloud compute project-info add-metadata --metadata google-compute-default-region=europe-west1,google-compute-default-zone=europe-west1-c
    gcloud init
  ssh
    gcloud compute ssh mongodb-1-server-1 --zone=europe-west1-c

# h2

  run terminal client
    java -cp h2*.jar org.h2.tools.RunScript -url jdbc:h2:~/test -script test.sql
    java -cp /usr/local/Cellar/h2/1.4.190/libexec/bin/h2*.jar org.h2.tools.Shell 
  run sql script from client
    RUNSCRIPT FROM 'test.sql'

# Hardware

  uydunet netmaster cbw 383z4 modem
    admin paneli
      192.168.0.1
      admin/admin
    wps aktifleştirme
      http://www.teknosoru.com/6872/netmaster-cbw-383z4-modemin-wps-%C3%B6zelli%C4%9Fi-nas%C4%B1l-aktif-edilir
      kablosuz | güvenlik |
        otomatik güvenlik yapılandırma = wps

# java 

  notes
    <url:/Users/mertnuhoglu/Dropbox/mynotes/content/articles/articles.md#tn=# _java id=art_0006>

## Basic Java

  iteration
    list
      opt1: basic
        for (int i = 0; i < list.size(); i++) {
          E element = list.get(i);
      opt2: enhanced
        for (E element : list) {
      opt3: map
        list.map({E e => e++ }
      opt4: list.stream.forEach
        list.stream().forEach(e -> f(e));
    map
      opt1: Iterator
        Iterator it = map.entrySet().iterator()
        while (it.asNext())
          Map.Entry pair = (Map.Entry) it.next()
          pair.getKey()
          pair.getValue()
      opt2: keySet
        for (String key: map.keySet())
        for (Object value: map.values())
        for (Map.Entry<String, Object> entry: map.entrySet())
  building list
    opt1: basic
      List list = new ArrayList();
    opt2: generics
      List<T> list = new ArrayList<T>();
    opt3: initialized
      List<String> messages = Arrays.asList("Hello", "World!");
    opt4: string array
      String[] m = new String[] { "elem1", "elem2" };
  List use
    List<T> s = new ArrayList<T>()
    for (String i: s) 
    items
        s.add("Hello")
        s.addAll(coll)
        s.get(i)
        s.set(i, "hello")
        s.insert(i, "hello")
        s.remove(i)
    list.sort()
  array
    String[] arr = new String[s.size()]
    s.toArray(arr)
    List<String> list = Arrays.asList(arr)
    Element[] arr = new Element[] { new Element(1), new Element(2) }
    print array
        opt1: simple array
            System.out.println(Arrays.toString(arr))
        opt2: nested array
            String[][] deep = new String[][] {{"John", "Mary"}, {..}}
            System.out.println(Arrays.deepToString(arr))
        opt3: java8
            Arrays.asList(arr).stream().forEach(s -> System.out.println(s))
        opt3.2: java8
            Arrays.stream(arr).forEach(System.out::println)
  contains
    Arrays.asList(arr).contains(value)
  map
    Map<String, Person> map = new LinkedHashMap<String, Person>()
    for (Map.Entry<String, Person> entry : map.entrySet()) 
      String key = entry.getKey()
      Person value = entry.getValue()
    Person value = map.get(str)
    map.put(key, value)
  String
    System.out.printf("%4d", quantity)
    String msg = MessageFormat.format("A {0} caused {1, date, long}", "hurricane", new GregorianCalendar(2009, 0, 15).getTime())
  regex
    String[] words = str.split("\\s+")
    Pattern pattern = Pattern.compile("[0-9]+")
    Matcher matcher = pattern.matcher(str)
    replacement
      String result = matcher.replaceAll("#")
      while (matcher.find()) 
        process(str.substring(matcher.start(), matcher.end()))
      for (int i = 1; i <= matcher.groupCount(); i++)
        process(matcher.group(i))
    groups
      String line = "This order was placed for QT3000! OK?";
      String pattern = "(.*)(\\d+)(.*)";
      Pattern r = Pattern.compile(pattern);
      Matcher m = r.matcher(line);
      if (m.find( )) {
        System.out.println("Found value: " + m.group(0) );
        System.out.println("Found value: " + m.group(1) );
        System.out.println("Found value: " + m.group(2) );
  type conversions
    double d = Double.parseDouble(str)
    Double d = Double.valueOf(str)
    d.doubleValue()
    new Double(str)
    String.valueOf(dbl)
  comparisons
    aString.equals("Max")
  filtering
    List<Person> beerDrinkers = persons.stream()
        .filter(p -> p.getAge() > 16).collect(Collectors.toList());
  Lambda expressions
    opt1
      Collections.sort(names, (String a, String b) -> { return b.compareTo(a); });
    before:
      Collections.sort(names, new Comparator<String>() {
        public int compare(String a, String b) {
            return b.compareTo(a);
        }
      });
    opt2
      Collections.sort(names, (a,b) -> b.compareTo(a));

# Jekyll id=g_10028

  ref
    Jekyll <url:file:///~/Dropbox/mynotes/ref.otl#r=g_10028>
    Publishing Web Site and Blog <url:file:///~/Dropbox/mynotes/general/processes.md#r=g_10033>

  new project
    best
      clone jekyll_skeleton
      update its repo
    from scratch
      1. create a repo
      2. only gh-pages branch is published
        git checkout -b gh-pages
      3. publish content
        echo “Hello, world” > index.html
          git add
          git commit 
          git push
      4. open mertnuhoglu.github.io/blog_datascience
    fork jekyll_skeleton
      fork a repo multiple times <url:#r=n_011>
      git clone git@github.com:mertnuhoglu/jekyll_skeleton.git
      (new repo)
      git remote rename origin upstream
      git remote add origin git@github.com:mertnuhoglu/new_repo.git
      git remote -v
      git push -u origin master
  updating a site
    jekyll serve
      or jekyll build
    git add
    git commit
    git push origin master
    git subtree push --prefix=_site git@github.com:mertnuhoglu/blog_datascience.git gh-pages
      gsp
  custom subdomain for project github pages
    1: in git repo create file "CNAME"
      echo "veribilimi.mertnuhoglu.com" > CNAME
    2: in webfaction, create a CNAME record
      datascience.mertnuhoglu.com 
      pointing to
        mertnuhoglu.github.io
    3: test it
      dig datascience.mertnuhoglu.com +nostats +nocomments +nocmd
    4: open 
      datascience.mertnuhoglu.com 
  Putting _site into gh-pages branch
    Putting _site into gh-pages branch <url:#r=n_010>
    (do these after each change)
      add all 
        git add -A
      commit push to master
      push _site subtree to gh-pages
        git subtree push --prefix=_site git@github.com:mertnuhoglu/jekyll_skeleton.git gh-pages
  google analytics setup on jekyll
    jekyll-now
    steps
      cp analytics.html
        cp jekyll-now/_includes/analytics.html blog_datascience/_includes
      put into _layouts/default.html before </body>
        {% include analytics.html %}
      _config.yml
        google_analytics: ''
  Putting _site into gh-pages branch id=n_010
    Putting _site into gh-pages branch <url:#r=n_010>
    adapted from
      http://gohugo.io/tutorials/github-pages-blog/
    steps
      remove _site from .gitignore
      new orphand branch
        git co --orphan gh-pages
      unstage all files
        git rm --cached $(git ls-files)
      grab one file
        git co master README.md
      add that file
        git add README.md
      commit that file
      push to gh-pages
        git push origin gh-pages
      checkout master
        git co master
          if error, then move all the files to tmp except README.md
      remove _site folder to make room for gh-pages subtree
        rm -rf _site
      add gh-pages branch. it will look as a folder named _site
        git subtree add --prefix=_site git@github.com:mertnuhoglu/blog_veribilimi.git gh-pages --squash
          if error
            git rm -rf _site
            git commit 
      pull the file just committed
        git subtree pull --prefix=_site git@github.com:mertnuhoglu/blog_veribilimi.git gh-pages
      run jekyll
      add all (do these after each change)
        git add -A
      commit push to master
      push _site subtree to gh-pages
        git subtree push --prefix=_site git@github.com:mertnuhoglu/blog_veribilimi.git gh-pages

# Keynote

  ^!n select text. builds a new node
  ^+m builds a new sub node from clipboard
  ^m   builds a new sibling node from clipboard

# Markdown

  http://daringfireball.net/projects/markdown/dingus
  paragraph
    one blank line
    two spaces at the end of line
  font
    *italic*
    **bold**
    ,u  underline automatically
  Links
    an [inline](http://url.com/ "Title")
    an [ref-style][id]
      [id]: http://url.com/ "Title"
  automatic links:
    <http://example.com/>
  Images
    ![caption](/path/img.jpg "Title")
    ![ref-style][id]
    [id]: http://url.com/img.jpg "Title"
    tekuis
      [physical_system_architecture]: ../../TEUIS%20PROJECT%2030-DEV/devops/hardware/physical_system_architecture.png
  Headers
    setext style
      Header 1
      =======
      Header 2
      -------------
    atx-style
      # Header 1 #
      ## h2 ##
      ###### h6
  Lists
    öncesinde boş satır olmalı.
    numbered
      1. Foo
      2. Bar
        i) sub
          A. sub sub
    bullets
      * list item
      * bar
          continued (indent 4 spaces)
    interrupted lists
      opt1
        (@) item 1
        line
        (@) item 2
      opt2: one space in interrupting lines
        1 item 1
         line
        2 item 2
  nested
    * abacus
      * answer
  Blockquotes
    > email style
    > brackets
  Code spans
    `backticked`
  Preformatted Code Blocks
    normal
       this is formatted
  Horizontal rules
    ---
    ***
  Line Breaks
    two spaces
  sub/superscript^2^~2~
  escaped: \*
  <!--comment-->
  anchor
    line {#anchor}
    jump to [above](#anchor)
  css class
    line {.css_class}


## MultiMarkdown

  nested includes
    {{ddd_tdd.md}}
  file includes
    {{../../TEUIS PROJECT 00-BTG TEAM FOLDER/processes/analysis/validation_with_data/draft/conventions_for_data_modelling.md}}
    <<[](code/enum_category.sql)
    [diagram_datamodel_bps_01_02]: ../../TEUIS%20PROJECT%2005-ANALYSIS/working_library/data_models/mis/diagrams/diagram_datamodel_bps_01_02.png
  conventions
    Marked2: tüm path'leri onun bulunduğu dosyaya relatif yapıyor
    mdmerge komutu ise, Book.txt'ye göre relatif kabul ediyor
    benim uygulamam:
      Marked2 ile ilerle
      <<[]() şeklinde kod inclusion yapma, çünkü bunlar bir şekilde kayboluyor
      bunların yerine o dosyaları indent edip include et


## Marked 2

  Preferences > Advanced > Leanpub support
    open Book.txt or any other .md file
    don't open the compiled output
  exporting to Word 
    export to word doesn't support images 
    fix:
      export to single markdown file
      pandoc x.docx -o x.pdf

## mdmerge

  http://www.freshthought.com/jenesuispasdave/2014/03/working-with-multi-file-markdown-documents/
  https://pypi.python.org/pypi/MarkdownTools2
  index file:
    Book.txt
      chapter1.md
      chapter2.md
  running:
    mdmerge --leanpub Book.txt > merged.md
    mdmerge --leanpub Book.txt -o merged.md
  include code
    <<[Frontend-Backend Architecture](code/001.md)
  include image
    ![Frontend-Backend Architecture](images/001.png)
  produce output
    mdmerge --leanb

# Mongo

  !!! bir şekilde --auth ayarıyla çalıştırınca docker tarafında yeni oluşturduğum kullanıcıya kayıt ekletemedim
    en kolayı: --auth yapmak yerine düz çalıştır
    java kodundaki değişiklik:
      credential = MongoCredential.createCredential(user, "admin", password.toCharArray());
      mongoClient = new MongoClient(new ServerAddress(host, port), Arrays.asList(credential));
      -->
      mongoClient = new MongoClient(new ServerAddress(host, port));
    resmi dokümantasyon
      # https://docs.mongodb.com/manual/tutorial/enable-authentication/
    works - opt1: no authentication
      docker run --name mongo02 -d -p 27017:27017 mongo 
      docker exec -it mongo02 mongo admin
      # inside mongo
        use beyp_poc
        db.temp.insert({"a":"b"})
        show dbs
      # test locally
        mongo admin
        show dbs
      # java
        mongoClient = new MongoClient(new ServerAddress(host, port));
    works - opt2: with authentication
      docker run --name mongo02 -d -p 27017:27017 mongo --auth 
      docker exec -it mongo02 bash
        mongo admin
        # inside mongo
          use admin
          db.createUser({ user: "administrator", pwd: '12345', roles: [ { role: "userAdminAnyDatabase", db: "admin" }  ] });
      # https://stackoverflow.com/questions/20525103/what-mongodb-user-privileges-do-i-need-to-add-a-user-to-a-new-another-mongo-data
      mongo --port 27017 -u "administrator" -p "12345" --authenticationDatabase "admin"
        use beyp_poc
        db.createUser({ user: "myUserAdmin", pwd: '12345', roles: ["readWrite"] });
      mongo --port 27017 -u "myUserAdmin" -p "12345" beyp_poc
        use beyp_poc
        db.temp.insert({"a":"b"})
      mongo --port 27017 -u "administrator" -p "12345" --authenticationDatabase "admin"
        show dbs
      # java
        credential = MongoCredential.createCredential(user, "beyp_poc", password.toCharArray());
        mongoClient = new MongoClient(new ServerAddress(host, port), Arrays.asList(credential));
        mongoDB = mongoClient.getDatabase(db);
  installation
    https://ademirgabardo.wordpress.com/2016/02/02/installing-and-running-mongodb-on-mac-osx-for-beginners/
    brew install mongodb
    mongo -version
    sudo mkdir -p /data/db
    sudo chown mertnuhoglu /data/db
    # run mongodb server
    mongod
    # run mongo client in another terminal
    mongo
  run mongod with authentication
    mongod --auth
  logs
    /usr/local/var/log/mongodb/mongo.log
  data path
    /usr/local/var/mongodb
  client commands
    show dbs
      check database list
    use danone_poc
      # create database
      note: you need to add something to see it by show dbs
    db
      check current database
    db.temp.insert({"a":"b"})
      insert anything to make db shown in show
    create user administrator 
      # https://docs.mongodb.com/manual/tutorial/enable-authentication/
      use mydb
      db.createUser(
        {
          user: "myUserAdmin",
          pwd: "12345",
          roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
        }
      )
      # restart mongo server with --auth option
      mongod --auth --port 27017 --dbpath /data/db1
    authenticate
      mongod --auth
      mongo --port 27017 -u "myUserAdmin" -p "12345" --authenticationDatabase "admin"
      db.auth("myUserAdmin", "12345" )
    import data
      opt: 3T Studio
      opt: terminal
        mongoimport -h localhost -u myUserAdmin -p 12345 -d beyp_poc --mode upsert --file distances.json
        mongoimport --db danone_poc --file admin_distances.json
        mongoimport --db test --collection restaurants --drop --file ~/downloads/primer-dataset.json
    export data
      mongoexport
        -h [ --host ] arg         mongo host to connect to ( <set name>/s1,s2 for
        -u [ --username ] arg     username
        -p [ --password ] arg     password
        -d [ --db ] arg           database to use
        -c [ --collection ] arg   collection to use (some commands)
        -q [ --query ] arg        query filter, as a JSON string
        -o [ --out ] arg          output file; if not specified, stdout is used
      mongoexport -h localhost -u myUserAdmin -p 12345 -d demo -c distances -o distances.json
      ex
        $ mongoexport -d webmitta -c domain -o domain-bk.json
        Export all documents with fields “domain” and “worth” only.
          $ mongoexport -d webmitta -c domain -f "domain,worth" -o domain-bk.json
        Export all documents with a search query, in this case, only document with “worth > 100000” will be exported.
          $mongoexport -d webmitta -c domain -f "domain,worth" -q '{worth:{$gt:100000}}' -o domain-bk.json


# Mysql

  terminal use
      mysql -u database_name -p database  
      mysql -u database_name -ppassword database  
    repair table
      use mertnuhoglu_rxos;
      check table django_session;
      repair table django_session;
    list tables
      show tables;
     

# nginx

  new domain/website
    how-to-set-up-nginx-server-blocks <url:file:///~/Dropbox/mynotes/content/code/ccode.md#r=g_10106>
    sudo mkdir -p /srv/www/example.com/html
    sudo chown -R $USER:$USER /srv/www/example.com/html
    sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/example.com
    sudo vim /etc/nginx/sites-available/example.com
      listen 80;
      listen [::]:80;
      root /srv/www/example.com/html;
      server_name example.com www.example.com;
    sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
    sudo service nginx restart
  reverse proxy for spring boot app
    server {
      listen 80;
      server_name danone_poc.mertnuhoglu.com;
      location / {
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:8080;
      }

# npm node js javascript

  install run
    npm install
    npm start
    open localhost:3000
    node server.js
  errors
    node-gyp: gyp ERR! stack You can pass the --python switch to point to Python >= v2.5.0 & < 3.0.0.
      where python
      npm install --python=/usr/bin/python -g underscore-cli

# OpenShift

  admin panel
    openshift.com > login > openshift 2
  ssh key
    id_rsa.pub ekle
  ssh connection: rhc
    https://developers.openshift.com/getting-started/osx.html
    rhc ssh dev
  export mongo
    rockcloud > export > tek tek tabloları seçip export al
      toplu alınca çıkartmıyor

# OsX

## issues

  who is listening on port
    sudo lsof -iTCP -sTCP:LISTEN -n -P
    lsof -i tcp:8080 
  disk wasn't ejected
    sudo lsof | grep /Volumes/myDrive
      find open files
  usb disk does not mount
    https://apple.stackexchange.com/questions/183003/usb-drive-will-not-mount-not-listed-in-disk-utilities-but-found-in-system-prof
      activity monitor > fsck_exfat: kill
      disk util > first aid
  turkish dictionaries
    http://fatihacet.com/mac-os-turkce-ingilizce-sozluk/
  show file path in spotlight
    command
  reveal spotlight file in finder
    command+enter
  capslock key mapping
    1. 
  http://brettterpstra.com/2012/12/08/a-useful-caps-lock-key/
  1. System Preferences > Keyboard > .caps lock: no action
  2. PCKeyboardHack/Seil
  CapsLock: 80

## shortcuts

  !notification disable notifications
  !file context copy path
  #^d   hover over word -> dictionary lookup
  ^#space   emoji tool
  ^+Power   lock
  #L  alias
  emoji character viewer: ^#space
  #!F5  invert colors / display
  ^#d   lookup selected word in dictionary
  three finger tap    lookup word
  context > lookup    lookup selected word in dictionary
  #!F5  night mode/inverse colors

## file system

  mount ntfs disk
    Mounty app > remount

## spotlight

  index links/symlinks/shortcuts/aliases
    http://apple.stackexchange.com/questions/95906/does-spotlight-normally-index-links-in-applications
      brew linkapps; find ~/Applications -type l | while read f; do osascript -e "tell app \"Finder\" to make new alias file at POSIX file \"/Applications\" to POSIX file \"$(/usr/bin/stat -f%Y "$f")\""; rm "$f"; done
      opt2: finder > select file > #L (make alias)


## Applications

### Multimedia

#### Image/photo/graphics/drawing

  image viewers
  sequential
  xee
  ToyViewer

### Markdown

  Macdown
    very good desktop editor
  stackedit.io
    online editor

## excel

  shortcuts osx
    sort/filter
      open sort #+r
      activate filter #+f
      display filter  !dn 
    outlining data
      hide rows ^9
      unhide  ^+( ^+5
      hide cols ^0
      unhide cols ^+) ^+7
    new line within cell ^!enter
  edit cell
    ^u

## intellij

### custom

  by f keyboard
    Project from existing sources
      #+p pes
    Open...
      #+o
    Manage project...
      #+r mp
    Find Action
      #a
    key mapping
      !   right alt
    ^+w   add to watches
    #f1   select in project view
    #i#,  comment line
    #s    switcher
  by us keyboard
    ^`    switch 
    #!sol/sağ   back/forward
    ^sağ  next tab
  ideavim 
    :set rnu  set relative line numbers
    map \r :action ReformatCode<CR>
      ReformatCode is an Action ID
    nmap zo :action ExpandRegion<CR>
    marks 
      ma
      'a
  action id list
    https://github.com/centic9/IntelliJ-Action-IDs
    https://centic9.github.io/IntelliJ-Action-IDs/
    https://intellij-support.jetbrains.com/hc/en-us/community/posts/206126699-List-of-built-in-action-ID-s-
  normal
    #up   jump to navigation bar
    #!F7  show usages
    !tab  next splitter
    #n    new class (in project), new code (in editor)

### editor

  highlight usages of variable at caret
    Prefs > General > Identifier under Caret > .Background

### run/debug

  show variable values when caret on top
    debug window > settings > Show Value On Selection Change 

### shortcuts

  http://www.jetbrains.com/idea/docs/IntelliJIDEA_ReferenceCard_Mac.pdf
  ++  search everywhere
  Code completion
    ^Space  normal
    ^+Space smart
  Editor
    #+F7  highlight usages of current variable
    #p  parameter info
    #+enter complete statement
    ^j  quick documentation
    #n  generate code
    #!t surround with
    #/  comment
    !yukarı select succesively
    ^+q context info
    !enter  show intention actions
    #!  reformat code
    #d  duplicate
    #delete delete line
    ^+j line join
    +enter  new line
    #+  expand/collapse
    #w  close active tab
  Run/debug
    ^+F10 run current file
    !F8   evaluate
    #!F8  quick eval
  Search
    ++  search everywhere
    !f7 find usages
    #f7 find usages in file
    #+f7  highlight usages
    #!f7  show usages
  Navigation
    #o  go to class
    #+o go to file
    #!o go to symbol
    ^ok next tab
    f12 go to prev tool window
    #e  recent files
    #l  go to line
    #!ok  back/forward
    #+delete  last edit location
    !f1 select current loc in view
    #b  go to declaration
    #!b go to implementation
    !space, #y  quick definition
    ^ok sonraki fonksiyon
    #f12  file structure
    f3  toggle bookmark
    !f3 toggle bookmark with mnemonic
    ^0..^9  go to bookmark
    #f3 show bookmarks
    #.  folding toggle
    ^ok next tab

## LaunchBar

  clipboard history (copy)
  show  #!x
  select  ^#x
  paste ^#!x

# Screenshot

  snagit:
    shows in editor then save manually
    /Users/mertnuhoglu/Dropbox/public/img/Autosaved Captures/
    ^!+r  all in one
  instantshot
    copies path automatically
    /Users/mertnuhoglu/Dropbox/public/img
    #^+s  rect
    #!+s  screen
    #^!+s repeat

## Screen Annotation and Presentation Tools

  http://ink2go.org/
  http://www.swordsoft.idv.tw/screenink/
  http://magnifier.sourceforge.net/#
  http://www.zoomitapp.com/zoom-it.html

## Hammerspoon

setup
  Prefences > security > Privacy > Allow apps: Hammerspoon
alternative
  spectacle

# PostgreSQL

  psql
    psql -d dbname -h hostname -p port -U username
    psql postgresql://dbmaster:5433/mydb
    ~/.pgpass

# Postman

  add POST request
    /Users/mertnuhoglu/Dropbox/public/img/ss-193.png
    new tab > .enter url
    .choose POST
    body > raw > json(application/json)
      .enter payload (argument for POST request)

# Python

  type of a variable
    type(var)

## Data Structures

  convert to string
    list to string
      ''.join(list)
    with new lines
      '\n'.join(d['name'] for d in apps)
        in ipython: prints representation, not string itself
      print '\n'.join(d['name'] for d in apps)
    list of dict to string
      ', '.join(d['memberId'] for d in my_list)
    list of list
      w = '\n'.join('\t'.join([d['name'], d['ip']]) for d in websites)
  access one item of a generator
    g.next()
    list(g)[3]
  nested structures
    opt1
      for d in websites:
          x = '\t'.join( d['subdomains'] )
          print x
    opt2
      rows = [ '\t'.join( d['subdomains'] ) for d in websites ]
    opt3: flatten
      rows = [ d['subdomains'] for d in websites ]
      r2 = flatten(rows)
  nested2
    opt1: flattened
      website_apps = []
      for d in websites:
          for d2 in d['website_apps']:
              website_apps.append( d2[0] )
    opt2: nested still
      website_apps = [ 
              [d2[0] for d2 in d['website_apps']]
              for d in websites ]

## IO

  write to a file
    file = open("newfile.txt", "w")
    file.write("hello world in the new file\n")
    file.write("and another line\n")
    file.close()

## pip

install from local file system
  sudo pip install -e .

## command line uses

  simple http server
    py2
      sudo python -m SimpleHTTPServer 80
    for python 3.x version, you may need :
      sudo python -m http.server 80

# Purescript

  refs
    https://learnxinyminutes.com/docs/purescript/
  repl: psci
    pulp psci
    src/Main.purs içindeki fonksiyonları load etmek
      import Main
      fact 3 # örnek bir fonksiyon çağrısı
    fonksiyon tanımlama
      :paste
      let
        ...
        ...
      ^D
      ex
        -- In psci's multiline mode
        let sumOfSquares :: Int -> Int -> Int
            sumOfSquares x y = x*x + y*y
  build
    bower update
    pulp build
  temel import
    import Prelude
  primitives
    numbers
      import Prelude
      -- Numbers
        1.0 + 7.2*5.5 :: Number -- 40.6
      -- Ints
        1 + 2*5 :: Int -- 11
      -- Types are inferred, so the following works fine
        9.0/2.5 + 4.4 -- 8.0
      -- But Ints and Numbers don't mix, so the following won't
        5/2 + 2.5 -- Expression 2.5 does not have type Int
      -- Hexadecimal literals
        0xff + 1 -- 256
      -- Unary negation
        6 * -3 -- -18
        6 * negate 3 -- -18
      -- Modulus, from purescript-math (Math)
        3.0 % 2.0 -- 1.0
        4.0 % 2.0 -- 0.0
    -- Inspect the type of an expression in psci
      :t 9.5/2.5 + 4.4 -- Prim.Number-- Strings
    -- Booleans
      true :: Boolean -- true
      false :: Boolean -- false
      -- Negation
        not true -- false
        23 == 23 -- true
        1 /= 4 -- true
        1 >= 4 -- false
      -- Comparisons < <= > >=
      -- are defined in terms of compare
        compare 1 2 -- LT
        compare 2 2 -- EQ
        compare 3 2 -- GT
      -- Conjunction and Disjunction
        true && (9 >= 19 || 1 < 2) -- true
    String
      "Hellow" :: String -- "Hellow"
      -- Multiline string without newlines, to run in psci use the --multi-line-mode flag
        "Hellow\
        \orld" -- "Helloworld"
      -- Multiline string with newlines
        """Hello
        world""" -- "Hello\nworld"
      -- Concatenate
        "such " ++ "amaze" -- "such amaze"
  arrays
    -- 2. Arrays are Javascript arrays, but must be homogeneous
      [1,1,2,3,5,8] :: Array Number -- [1,1,2,3,5,8]
      [true, true, false] :: Array Boolean -- [true,true,false]
      -- [1,2, true, "false"] won't work
      -- `Cannot unify Prim.Int with Prim.Boolean`
    -- Cons (prepend)
      1 : [2,4,3] -- [1,2,4,3]
    operations
      import Data.Array
      import Data.Maybe
      -- Safe access return Maybe a
        head [1,2,3] -- Just (1)
        tail [3,2,1] -- Just ([2,1])
        init [1,2,3] -- Just ([1,2])
        last [3,2,1] -- Just (1)
      -- Array access - indexing
        [3,4,5,6,7] !! 2 -- Just (5)
      -- Range
        1..5 -- [1,2,3,4,5]
      length [2,2,2] -- 3
      drop 3 [5,4,3,2,1] -- [2,1]
      take 3 [5,4,3,2,1] -- [5,4,3]
      append [1,2,3] [4,5,6] -- [1,2,3,4,5,6]
  records (javascript objects)
    -- 3. Records are Javascript objects, with zero or more fields, which
    -- can have different types.
    -- In psci you have to write `let` in front of the function to get a
    -- top level binding.
      let book = {title: "Foucault's pendulum", author: "Umberto Eco"}
    -- Access properties
      book.title -- "Foucault's pendulum"
        let getTitle b = b.title
      -- Works on all records with a title (but doesn't require any other field)
        getTitle book -- "Foucault's pendulum"
        getTitle {title: "Weekend in Monaco", artist: "The Rippingtons"} -- "Weekend in Monaco"
      -- Can use underscores as shorthand
        _.title book -- "Foucault's pendulum"
      -- Update a record
        let changeTitle b t = b {title = t}
        getTitle (changeTitle book "Ill nome della rosa") -- "Ill nome della rosa"
  function definition
    add :: Int -> Int -> Int
    opts
      add x y = x + y
      add = \x y -> x + y
    infix
      let myMod x y = x % y
      myMod 3.0 2.0 -- 1.0
      -- Infix application of function
      3 `mod` 2 -- 1
    precedence
      -- function application has higher precedence than all other
      -- operators
      sumOfSquares 3 4 * sumOfSquares 4 5 -- 1025
    conditional if
      -- Conditional
      let abs' n = if n>=0 then n else -n
      abs' (-3) -- 3
    -- Guarded equations
      let abs'' n | n >= 0    = n
                  | otherwise = -n
  pattern matching
    -- Note the type signature, input is a list of numbers. The pattern matching
    -- destructures and binds the list into parts.
    -- Requires purescript-lists (Data.List)
      let first :: forall a. List a -> a
          first (Cons x _) = x
      first (toList [3,4,5]) -- 3
      let second :: forall a. List a -> a
          second (Cons _ (Cons y _)) = y
      second (toList [3,4,5]) -- 4
      let sumTwo :: List Int -> List Int
          sumTwo (Cons x (Cons y rest)) = x + y : rest
      fromList (sumTwo (toList [2,3,4,5,6])) :: Array Int -- [5,4,5,6]
    -- sumTwo doesn't handle when the list is empty or there's only one element in
    -- which case you get an error.
      sumTwo [1] -- Failed pattern match
    -- Complementing patterns to match
      let fib 1 = 1
          fib 2 = 2
          fib x = fib (x-1) + fib (x-2)
      fib 10 -- 89
    -- Use underscore to match any, where you don't care about the binding name
      let isZero 0 = true
          isZero _ = false
    -- Pattern matching on records
      let ecoTitle {author = "Umberto Eco", title = t} = Just t
          ecoTitle _ = Nothing
      ecoTitle book -- Just ("Foucault's pendulum")
      ecoTitle {title: "The Quantum Thief", author: "Hannu Rajaniemi"} -- Nothing
      -- ecoTitle requires both field to type check:
        ecoTitle {title: "The Quantum Thief"} -- Object lacks required property "author"
    -- Lambda expressions
      (\x -> x*x) 3 -- 9
      (\x y -> x*x + y*y) 4 5 -- 41
      let sqr = \x -> x*x
    -- Currying
      let myAdd x y = x + y -- is equivalent with
      let myAdd' = \x -> \y -> x + y
      let add3 = myAdd 3
      :t add3 -- Prim.Int -> Prim.Int
    -- Forward and backward function composition
      -- drop 3 followed by taking 5
        (drop 3 >>> take 5) (1..20) -- [4,5,6,7,8]
      -- take 5 followed by dropping 3
        (drop 3 <<< take 5) (1..20) -- [4,5]
    -- Operations using higher order functions
      let even x = x `mod` 2 == 0
      filter even (1..10) -- [2,4,6,8,10]
      map (\x -> x + 11) (1..5) -- [12,13,14,15,16]
      -- Requires purescript-foldable-traversable (Data.Foldable)
        foldr (+) 0 (1..10) -- 55
        sum (1..10) -- 55
        product (1..10) -- 3628800
    -- Testing with predicate
      any even [1,2,3] -- true
      all even [1,2,3] -- false



  indentation required after block keywords
    where
    of 
    let
  
  

# R

## idioms _me

  caching and restoring
    opt1 - manual
      cache(data)
      cache(data)
      cache(data)
      result = uncache()
    opt2 - llplyc
      llplyc(.data, .fun)
      llplyc_nouncache(.data, .fun)

## Basic Functions

### Basic Types

  x=c(1,2,4,8,16 )               #create a data vector with specified elements
  y=c(1:10)                 #create a data vector with elements 1-10
  n=10
  vect=c(x,y)               #combine them into one vector of length 2n

#### Date

  help
    ?yearmon
    ?strftime
    ?strptime
  base 
    extract year, mon out of date
      as.numeric(format(date1, "%m"))
    convert char to date
      as.Date( '2012-05-12' )
      as.Date('20140408',"%Y%m%d")
  lubridate
    month(date1)
    year(date1)
  current date
    Sys.time()
    Sys.Date()

#### strftime format

  help
    ?strftime
    man strftime
    http://strftime.net/


### Language Rules

  Operator precedence
    x = text[data_starts_at+1:length(text)]
    -->
    x = text[(data_starts_at+1):length(text)]
  Loop
    vector/list
      for (e in mylist) {...}
    data frame/table
      for (i in 1:nrow(df)) {
        df[i,]
        dt[i]
    error:
      for (r in df/dt) 
      r: column of df/dt not row

#### Control structures

  if-else
    if (cond) expr
    if (cond) expr1 else expr2
  for
    for (var in seq) expr
  while
    while (cond) expr
  switch
    switch(expr, ...)
  ifelse
    ifelse(test,yes,no)

#### Debug

  debug in console
    debug(fun)
    setBreakpoint('index_rules.R#15')
  browser()

### Data structures

  mat=cbind(x,y)               #combine them into a n x 2 matrix
  mat[4,2]                   #display the 4th row and the 2nd column
  mat[3,]                 #display the 3rd row
  mat[,2]                 #display the 2nd column
  cbind(df_1, df_2)
  rbind(df_1, df_2)

#### Data Table

  tables()
  setkey(dt, form, date, cik )
    no quote
  setkeyv(dt,'x')
    same using quotes
  read from textconnection
    df = read.table(textConnection(dat), stringsAsFactors=F, sep=',', header=T)
    dt = data.table(df)
  copy(dt)
    real copy. two different instances.

##### Access

  DT[c(2,3)]
    not columns, but rows.
  accessing columns in dt:
    dt[, 2:3, with = FALSE]
  in df:
    df[, 2:3]
  DT['b']
    = DT[x=='b']
  DT[,v]    # column v only
    = DT[,'v',with=F]
  dt[i,j,by=..]
    i: row
    j: column
    by: can be list of function
  dt[2]  
    2nd row
  dt[c(F,T)]
    even rows

###### Column 

  dt[,v]
    v column (as vector). no "" around v
  dt[,list(v)]
    v column (as data.table)
  dt[2:3,sum(v)]
    sum(v) over rows 2 and 3
  dt[,c(1,'col2',10), with = FALSE)
    accessing columns with number or character

##### Query/Join

  join two tables extremely fast
    setkey(dt1, zip)
    setkey(dt2, zip)
    full = dt2[dt1, nomatch=F]
  inner/outer joins
    http://stackoverflow.com/questions/12773822/why-does-xy-join-of-data-tables-not-allow-a-full-outer-join-or-a-left-join
    X[Y,nomatch=NA] -- all rows in Y -- right outer join (default)
    inner join
      X[Y,nomatch=0] -- 1. alt. only rows with matches in both X and Y -- inner join
      merge(X,Y)  -- 2. alt. inner join
    left outer join
      Y[X]  -- 1. alt: left outer join of X[Y]
      merge(X,Y,all.x=TRUE) -- 2. alt.
    full outer join
      unique_keys <- unique(c(X[,t], Y[,t]))
      Y[X[J(unique_keys)]]      
  example
    > d1[d2$a]
        a b
    1: a001 b001
    2: a003  NA
    3: a004 b003
    > d2
        a c
    1: a001 c002
    2: a003 c001
    3: a004 c003
    > d1
        a b
    1: a001 b001
    2: a002 b002
    3: a004 b003
  cross join
    ft = c('D','D/A')
    c3 = c('1571745','1571673')
    CJ(ft,c3) # cross join
  remove duplicated key value rows
    dt[unique(dt$key), mult = "first"]
    http://stackoverflow.com/questions/16037074/aggregating-to-remove-duplicates-in-a-data-table-based-on-the-minimum-in-one-col
  error: Check for duplicate key values in i, each of which join to the same group in x over and over again.
    alt1: remove duplicate key values
    alt2: allow.cartesian = T
      results in duplicate rows in result


##### Grouping/Aggregate/Summarize

  group by col and add column count
    dt[ , count := .N, by = list(col) ]
  multiple aggregations and group by variables
    DT[, list(MySum=sum(v), MyMin=min(v),), by=list(x,y%%2)]
    dt[,list(mean=mean(age),sd=sd(age)),by=group]
      column names
  apply sum function to all variables 
    x[, lapply(.SD, sum), by = ID]
    .SD: subset of data

##### Assignment

  conditional assignment / if true
    a[cik=='1291703']$test = 'ali'
    wrong:
      a['1291703']$test = ''

#### Data Frame

  X[i,]  row i 
  X[,j]  column j
  exclude columns
    myvars <- names(leadership) %in% c("q3", "q4")
    newdata <- leadership[!myvars]
    newdata <- leadership[c(-8, -9)]
  remove columns
    by dropping columns
      drops <- c("col1","col2")
      DF[,!(names(DF) %in% drops)]
    by keeping columns
      keeps <- c("y","a")
      DF[keeps]
    by null
      df$col = NULL
    by range in dt
      dt[,-6:-16,with=F]
    summary
      [ , ! (names(..) %in% drops) ]
      [keeps]
      $col = NULL
  remove rows
    indexler için:
      x = nasdaq_nyse[-dups.idx,]
    T/F için:
      y = nasdaq_nyse[!dups,]
  moving columns / change order
    df = df[,c(1,2,3,4)]
  colClasses
    colClasses = c("character", "integer", "logical", "Date")
    read.csv(.., colClasses = colClasses)

#### List

  append element
    mylist[[length(mylist)+1]] <- obj

#### Joins

  inner join:
    merge(df1, df2, by="CustomerId")
  Outer join: 
    merge(x = df1, y = df2, by = "CustomerId", all = TRUE)
  Left outer: 
    merge(x = df1, y = df2, by = "CustomerId", all.x=TRUE)
  Right outer: 
    merge(x = df1, y = df2, by = "CustomerId", all.y=TRUE)
  Cross join: 
    merge(x = df1, y = df2, by = NULL)
  Summary
    by  = col    # default, inner
    all = T  # outer
    all.x      # left outer
    all.y      # right outer
    by = NULL  # cross

#### Meta

  colnames(df)
  colnames(df)[3]
  setNames
    setNames( 1:3, c("foo", "bar", "baz") )
    # this is just a short form of
    tmp <- 1:3
    names(tmp) <- c("foo", "bar", "baz")
  setnames(df, old_names, new_names)    # data.table
    names(airquality) <- tolower(names(airquality)) # data.frame
  unname(obj)
    remove names
  NA values
    using custom NA labels
      df <- read.csv("file.csv", na.strings = c("foo", "bar"))
      df[ df == "foo" ] = NA

#### Access

  [    # same class + multiple returns
  [[    # any type + single element
  $    # semantics similar to [[
  tail(df, 1)
    Last row

#### Query/subset

  subset(dataset,logical)         #those objects meeting a logical criterion
  subset(data.df,select==variables,logical) #get those objects from a data frame that meet a criterion
  data.df[data.df=logical]           #yet another way to get a subset
  x%in%y
  all(x)
  any(x)
  grep / filter 
    grep('symbol', df)  # returns indexes
    value=T  # return values
    grepl      # returns logical
    ignore.case=T
  get row index of subset
    row.idx = as.numeric(rownames(rows))

#### Sort/order

  vector
    order(symbols)
    [1] 1 2 3   # indexes
    sort(symbols)
    [1] "A"  "AA" "AA^"  # actual values
  data frame
    df[order(df$B),]               #sort a dataframe by the order of the elements in B
    df[rev(order(df$B)),]           #sort the dataframe in reverse order 
  data table
    dt[order(x,y))
    dt[order(-rank(x),y))
      no dt$col since dt is an environment
  summary
    sort: vector
      small > vector 
    order: data frame
      index permutation > dt[ order(col) ]
      index bc. data frame

### Types and conversions

  convert factor columns to character
    df[] = lapply(df, as.character)

### Operators [ [<- [[ $ [[<- $<-

### Input Output

  csv
    fread(file.name, sep=",", header=T) # data.table
      fread(file.name)    # auto defaults
    read.table(filename,header=TRUE)       
    read.table(filename,header=TRUE,sep=',')   
    read.csv(filename,header=TRUE)   
    write.table(df, file.name, sep=",", append=F, row.names=F, col.names=T)
    write.csv(df, file.name, row.names=F)
  fread arguments
    fread("data/flights4.csv", select = vars)
    skip
      skip = "string"
        search "string" start on that line
      skip = 10
        skip first 10 lines
    select
      vector of column names or indices to keep
    drop
      vector of column names to drop
    read url directly
      fread(url)
    read string directly
      fread(string)
  text
    text = readLines( file.name )
    writeLines(lines, "names_stats.txt")
  summary
    fread - easy - single parameter - file.name
    write.csv - data + filename + row.names
      data first
      csv - 3 letters - 3 args - row - 3 letters
  readr
    Read delimited files: 
      read_delim(), read_csv(), read_tsv(), read_csv2().
    Read fixed width files: 
      read_fwf(), read_table().
    Read lines: 
      read_lines().
    Read whole file: 
      read_file().
    Re-parse existing data frame: 
      type_convert().  
  excel
    library(readxl)
    read_excel("my-spreadsheet.xls", sheet = "data")
    l <- list("iris" = iris, "mtcars" = mtcars, chickwts = chickwts, quakes = quakes)
    openxlsx::write.xlsx(l, file = "inst/extdata/datasets.xlsx")


#### excel

  xlsx
    library("xlsx")
    read.xlsx(file, sheetIndex=1, header=T)

#### list files in directory

  dir.create(path = ... )
    mkdir makedir
  list.files(path = ".", pattern = NULL, all.files = FALSE,
          full.names = FALSE, recursive = FALSE,
          ignore.case = FALSE, include.dirs = FALSE, no.. = FALSE)
  dir(path = ".", pattern = NULL, all.files = FALSE,
    full.names = FALSE, recursive = FALSE,
    ignore.case = FALSE, include.dirs = FALSE, no.. = FALSE)
  list.dirs(path = ".", full.names = TRUE, recursive = TRUE)

### Utilities

  switch
    switch(ext,
      txt=dir_filings_txt(),
      xml=dir_filings_xbrl(),
      zip=dir_filings_zip(),
      xbrl=dir_filings_xbrl()
    )
  duplicated(vec)
  which(logical)
  is.na(d1)
  rep(x, times)
  unlist(x)
  do.call('fun', iterable)

#### sequence rep length cut seq

  rep(x, ntimes)
    repeat x (complete vector) n times
    rep(c(0, 5), times=c(3, 2))
      0 0 0 5 5 
    ===
    rep(c(0, 5), c(3, 2))
  rep(x, each=n)
    rep(c(0, 5), each=4)
      0 0 0 0 5 5 5 5
  length(x)
  seq(from, to, by)
  cut(x, n)
  sample(x, size, replace = F)
  replicate(n, expr)
    replicate(5, sample(1:10, 15, replace = T), simplify = F)
      list of 5 vectors with 15 numbers
    simplify=T
      dataframe of 15 rows 5 columns
    unlist(..)
      15x5 numbers
  
### String

  substring
    substring("ahmet", 1, 3)
    substring("ahmet", 1, 3:5)
    remove last n chars
      substr(x, 1, nchar(x) - n)
  string templating
    sprintf
      sprintf("Filings: %d", nrow(hfs) )
      out of order
        sprintf("%2$s %1$s", "hello", "world")
        sprintf("second %2$1.0f, first %1$5.2f, third %3$1.0f", pi, 2, 3)
    leading zeros
      sprintf("%03s", 1:end)
    escaping percent
      sprintf("%s escape %%that", "ali")
  paste (concat)
    paste("q", 1:5, sep="")
      [1] "q1" "q2" "q3" "q4" "q5"
    vektör için collapse kullan:
      paste(c("ali","veli"), collapse=",")
        [1] "ali,veli"
    collapse: 
      tek parçaya collapse eder. bu sırada ne ayraç olmalı.
    sep: 
      concat edilen stringler nasıl ayrılmalı. 
    paste0('converted ', "here")
      [1] "converted here"

### Regex

  https://www.regex101.com/ 
    debug regex
  stringr
    str_replace(fruits, "[aeiou]", "-")
    str_replace_all(fruits, "[aeiou]", "-")
    str_match
      strings <- c(" 219 733 8965", "329-293-8753 ", "banana")
      phone <- "([2-9][0-9]{2})[- .]([0-9]{3})[- .]([0-9]{4})"
      str_extract(strings, phone)
      str_match(strings, phone)
           [,1]      [,2] [,3]  [,4]
      [1,] "219 733 8965" "219" "733" "8965"
      [2,] "329-293-8753" "329" "293" "8753"
      [3,] NA      NA NA  NA
  lookaround
    lookbehind
    (?<=) positive
    (?<!) positive
    lookahead
    (?=)  positive
    (?!)  negative
  escapes backslashes
    backslashes need to be doubled
  character classes
    [:alnum:]
      [:alpha:] [:digit]
    [:blank:]

### dplyr

  result = by_cik %>%
    summarise_each( funs(last(.)) )
  tbl_df
  join by multiple columns
    inner_join(xcr, by = c("filename", "contextRef"))

### magrittr pipe

  alias 
    equals add multiply_by
    extract [
    extract2 [[
  map function
    equvalent:
      lapply( rownames %>% {. %>% partial( path_array_exchange_listing_x, . )})
      rownames %>% { partial( path_array_exchange_listing_x, . ) }
      rownames %>% partialm(path_array_exchange_listing_x)
  argument placeholder
    x %>% f(y, .) === f(y,x)
  tee: return lhs
    matrix(ncol = 2) %T>%
      plot %>%
      colSums
  exposition of variables
    iris %$% cor(Sepal.Length, Sepal.Width)
  define function on fly
    long_vector %>%
    lapply(
      . %>%
      one_action %>%
      two_action
    )
  lambdas (unary function)
    iris %>% 
      {
        n = sample(1:10, size = 1)
        H = head(., n)
        T = tail(., n)
        rbind(H, T)
      } %>%

### XML

  xmlParse()
    doc = xmlParse(file)
  xmlRoot()
    root = xmlRoot(doc)
  navigating
    child = xmlChildren(root)
    xmlName
      name of node
    xmlSize
    xmlAttrs
    xmlGetAttr
    xmlValue
    xmlParent
    xmlAncestors
    getSibling
    xmlNamespace
  looping over nodes
    xmlApply xmlSApply
      root %>% xmlChildren %>% lapply(xmlName)
      ==
      root %>% xmlApply(xmlName)
    sapply(node, names)
    sapply(node, xmlValue)
  xpath
    getNodeSet(doc, path)
    xpathSApply
    links = xpathSApply(root, "path")
    link_attrs = xpathSApply(root, "path", xmlAttrs)
    link_attr_vals = xpathSApply(root, "path", xmlGetAttr, "href")
    link_values = xpathSApply(root, "path", xmlValue)
  custom
    root = filename %>% root_xml
    xpath = "/edgarSubmission/relatedPersonsList/relatedPersonInfo/relationshipClarification"
    xs = getNodeSet(root, xpath)
    xmlSApply(xs, xmlValue)
    xpathValue(root, xpath)

### xml2

  util
    as_list
    url_absolute
    url_escape
    xml_path
    xml_structure
    xml_type
    xml_url
  io
    read_xml
    write_xml
  content
      xml_text
    xml_attr
      xml_attrs
      xml_has_attr
    xml_children
      xml_contents
      xml_parents
      xml_siblings
      xml_parent
    xml_find_all
      xml_find_one
    xml_name
    xml_ns

## ready datasets

  load a data set
    data(Cars93, package="MASS")
  view data sets
    data()

## Functional programming

### apply/ldply/foreach list generations

  merge/rbind several data files
    paths = unlist( lapply(strategy_names(), path_of_exchanges) )
    names(paths) = ltrim_char("/", dirname(paths))
    result = ldply(paths, read.csv)
  how to extract datatable column to array
    data[[1]]
    data$var1
  lapply datatable columns
    lapply(as.data.frame(data), function(x) sprintf(t, x))
    lapply(data[,, with=F], function(x) sprintf(t, x))
    lapply(data, function(x) sprintf(t, x))

### for loop functionals: lapply/sapply/vapply/mapply

  to manipulate: 1d structures
    for data frames not suitable. use apply for them
  lapply(l, f)
    apply f to each element of list
    return: list as l
  aggregating l elements with f
    r = lapply(l, f)
    unlist(r)
    =
    sapply(l, f)
    return: vector (list's elements aggregated using f)
  sapply(X, FUN, ..., simplify = T)
  replicate(n, expr, simplify = "array")
    wrapper for sapply
  simplify
    result simplifed to vector, matrix, array?
    simplify = F, value: list
  vapply(X, FUN, FUN.VALUE)
    similar to sapply
    value: vector
    vapply(mtcars, is.numeric, logical(1))
  Map
    lapply: one argument varies
    Map: multiple args
    Map(f, ...)
    Map(f, list1, list2)
    mapply with simplify = F
  ex
    mtmeans <- lapply(mtcars, mean) 
    mtmeans[] <- Map(`/`, mtcars, mtmeans) 
    # In this case, equivalent to 
    mtcars[] <- lapply(mtcars, function(x) x / mean(x))
  mapply
    variant of Map
    do.call vs. lapply
      do.call(fun, args)
        args passed to fun all in one step:
        fun(args)
      lapply(args, fun)
        args passed to fun one by one
        fun(args[[1]])

### dataframe loop: apply, tapply, plyr

  to manipulate: n (higher) dimensional data
  # 1: Map
    data = generate_data %>%
      Map(df$base_name, df$seq_end) %>%
      setNames(df$variable)
  # 2: lapply equivalent to Map
    dl = split(df, rownames(df))
    data2 = dl %>% 
      lapply(function(x) generate_data(x$base_name, x$seq_end)) %>%
      setNames(df$variable)
  apply
    variant of sapply
    apply(X, MARGIN, SUMMARY.FUN, ...)
    summarizes each row/col 
  aaply
    safer than apply
    aaply(.data, .margin, .fun, ...)
  
## Use Cases

  Remove duplicate rows 
    dups = duplicated( filings$cik )
    filings.with.unique.cik = filings[!dups, ]
      filings.with.unique.cik = filings[!dups] # datatable
  Access last value
    tail(vector, n=1)
    data frame :
      x[length(x[,1]),]
      x[dim(x)[1],]
      x[nrow(x),]
  is.null check: is.blank() in utils.R
    is.null(x) ||       # Actually this line is unnecessary since
    length(x) == 0 ||     # length(NULL) = 0, but I like to be clear
    all(is.na(x)) ||
    all(x=="") ||
    (false.triggers && all(!x))

### Exceptional Cases

  no record
    dt[cikno]
         cik    name 
      1: 1325676   NA 
      join => at least join key exists
    dt[cik==cikno]
      Empty data.table (0 rows) of 2 cols: form,cik

### Queries/Subsetting

  Assignment if true
    leadership$agecat[age > 75] <- "Elder"
  how many exists?
    a = length(which(x$category == 'I.setosa'))
  selecting variables/columns
    myvars <- c("q1", "q2")
    newdata <- leadership[myvars]
  subsetting non na values from vector
    d[!is.na(d)]

#### Operators

  %in%
  grep
  [..==..]

#### Subset

  newdata <- subset(mydata, 
    age >= 20 | age < 10, 
    select=c(ID, Weight))

### Growing

  build parts then join them
    rl = vector('list', n)
    for(i in 1:n) {
      rl[[i]] = data.table(..)
    }
    dt = do.call('rbind', rl)
  better
    dt = rbindlist(rl)
  rbindlist bug
    when columns order is different, rbindlist will produce nonsense 
    use use.names=T
  

### Serialization

  saveRDS(women, "women.rds")
  ## restore it under a different name
  women2 <- readRDS("women.rds")
  dput(x)
  ## Write an ASCII version of mean to the file "foo"
  dput(mean, "foo")
  ## And read it back into 'bar'
  bar <- dget("foo")
  unlink("foo")

### Conversions

  Convert list to data frame/table
    my.df <- do.call('rbind', my.list)

#### dataframe to list conversion

  # 1: split rows into list elements. elements are dataframe
    dl = split(df, rownames(df))
  # 2: transpose and as.list. elements are vectors
    dl2 = df %>%
      t %>%
      as.data.frame %>%
      as.list
  # 3: unlist. elements are vectors
    dl3 = df %>%
      apply(1, list) %>%
      unlist(recursive = F)

## Generate Test Data

  sample_with_replace = function(v, n = 100) sample(v, size = n, replace = T)
  sample_datatable = function(dt, n = 100) dt[ sample(nrow(dt), size = n) ]
  auction_data = data.frame(
    Price = 1:100 %>% sample_with_replace)
  s = auction_data %>% sample_datatable(5)
  kv = data.table(
    keyword = data$keyword %>% sample,
    visit = (runif(n_kw) * 100) %>% ceiling)
  kp = data.table(
    keyword = kv$keyword %>% sample_with_replace(n_pg),
    page = data$page %>% sample(n_pg))

## Platform

  install
  install from github
    library("devtools")
    install_github("repo/username")
  update all packages from CRAN
    update.packages(checkBuilt=TRUE, ask=FALSE)
  set default cran mirror
    inside .Rprofile
    options(repos=structure(c(CRAN="http://cran.pau.edu.tr/"))) 
  remove previous session
    rm .RData

## Performance


  measure time
    system.time(for(i in 1:100) mad(runif(1000)))
  profiling
    Rprof('file')
    # code
    Rprof(NULL)
    summaryRprof('file')

## System

  system(cmd)
  system(cmd, intern=T)
    capture output of command 
  calling R from shell
    bash - opt1
      Rscript script2.R
    bash - opt2
      #!/usr/bin/Rscript
    study_rscript1.R
      #! /usr/bin/Rscript --vanilla --default-packages=utils
      args <- commandArgs(TRUE)
      print(args)

## startup

  initial/startup/default session settings
    ~/.Rprofile

## rmarkdown id=g_10105

  rmarkdown <url:file:///~/Dropbox/mynotes/ref.otl#r=g_10105>
  references
    https://www.rstudio.com/wp-content/uploads/2016/03/rmarkdown-cheatsheet-2.0.pdf
    https://www.rstudio.com/wp-content/uploads/2015/03/rmarkdown-reference.pdf
    RMarkdown Docs <url:file:///~/Dropbox/mynotes/content/articles/articles_r.md#r=g_10030>
    Publishing Web Site and Blog <url:file:///~/Dropbox/mynotes/general/processes.md#r=g_10033>
  getting started
    rstudio > file > new > rmarkdown > .html
      örnek bir şablon dosya açılır
    button bar > knit
  run
    rmarkdown::render("input.Rmd")
    render("input.Rmd", "pdf_document")
  Presenter Mode
  add this to the end of the url while starting
    ?presentme=true
    /Users/mertnuhoglu/projects/dewey/data_analysis_presentations/istanbulcoders/input.html?presentme=true
  adding to slides
    <div class="notes">
    this is notes
    </div>

## rstudio

  ref
    https://www.rstudio.com/wp-content/uploads/2016/01/rstudio-IDE-cheatsheet.pdf
    http://rmarkdown.rstudio.com/lesson-2.html
  shortcuts
    shortcuts help
      !+k window > keyboard shortcuts
    navigating panes
      ^1..9
      add shift to maximize pane
    navigating tabs
      ^f11 12
    source
  notebook

## slidify

  ref
    Publishing Web Site and Blog <url:file:///~/Dropbox/mynotes/general/processes.md#r=g_10033>
  logic
    publish by static html pages
      put: .nojekyll into root
    github settings: source: gh-pages 
    klasörler bağımsız
      x/index.html neredeyse onu yayınlıyor
      http://mertnuhoglu.github.io/data_analysis_presentations/r_verigazeteciligi/
  create deck
    library(slidify)
    author("slidify-demo-01")
  push to github
    github: create a new repo "slidify-demo-01"
    git remote add origin https://github.com/mertnuhoglu/slidify-demo-01.git
    local: git add+commit
  generate/update deck
    slidify("index.Rmd")
  publish github
    publish(user = "mertnuhoglu", repo = "slidify-demo-01", host = "github")
  open
    http://mertnuhoglu.github.io/slidify-demo-01/index.html
  publish dropbox
    publish(user = "mydeck", host = "dropbox")
  open
    https://dl.dropboxusercontent.com/u/103580364/mydeck/index.html
  extensions and themes
    http://ramnathv.github.io/slidifyExamples/
    http://slidify.org/style.html
    http://stackoverflow.com/questions/19348763/how-i-can-include-the-use-of-the-extension-deck-automation-js-when-i-create-a-do
      http://slidify.github.io/add-deck-ext/
  deckjs framework
    https://raw.githubusercontent.com/ramnathv/slidifyExamples/gh-pages/examples/deckjs/index.Rmd
    put into heading part (indent with spaces)
      framework: deckjs
      deckjs:
        transition: horizontal-slide
        extensions: [goto, hash, menu, navigation, scale, status]
    themes
      web-2.0
      swiss
    shortcuts
      m    view menu
      g#  go to slide
  add extensions
    http://slidify.github.io/add-deck-ext/
  add extension: automatic.js
    setup
      curl -o automatic.zip https://github.com/rchampourlier/deck.automatic.js/archive/master.zip
      unzip -oq automatic.zip deck.automatic.js-master/automatic/ 
      mv deck.automatic.js-master/automatic libraries/frameworks/deckjs/extensions/
      rm automatic.zip
      rm -r deck.automatic.js-master
    add to heading
      extensions: [goto, hash, menu, navigation, scale, status, automatic]
    add snippet to libraries/frameworks/deckjs/partials/snippets.html
      <!-- Initialize the deck -->
      <script>
      $(function() {
        // required only if the automatic extension is enabled.
        $.extend(true, $.deck.defaults, {
        automatic: {
          startRunning: false,  // true or false
          cycle: false,      // true or false
          slideDuration: 10000 // duration in milliseconds
        }})
        $.deck('.slide');
      });
      </script>
    add play/pause buttons to libraries/frameworks/deckjs/layouts/deck.html
      <!-- Begin slides -->
      {{{ page.content }}}
      <div class='deck-automatic-link' title="Play/Pause">Play/Pause</div>
  use cases
    impressjs
      visually stunning
    deckjs
      easy to use
    landslide
      question answer
    flowtime
      hierarchical
  multiple presentations
    subdirectory
      author("new_slidify_project")
      cd new_slidify_project
    new file
      cp index.Rmd new_slideshow.Rmd
      slidify("new_slideshow.Rmd")


## options/settings

  options(max.width=100)
  GetOption("max.width")
  options(max.print=100)
  don't save history
    start with --no-save

# Relational Algebra

  symbols for basic operations
    σ    selection (filter-where)
    π    projection (select)
    −    set-difference 
    ∪    union
    ρ    rename
    ⨝    join
    ⨯    cross
  usage examples
    R ⨝ _c S
      join R with S according to condition c
    σ _c (R ⨯ S)
      cross R with S and then filter with condition c

# Ruby

  install update
    https://www.moncefbelyamani.com/how-to-install-xcode-homebrew-git-rvm-ruby-on-mac/
    brew kullanma, rvm kullan
  versions
    rvm -v
    ruby -v
    list ruby installations
      rvm list rubies

# ScreenFlow

  zoom in timeline
    =
    -
  remove/detach audio from mp4
    select mp4 > detach audio
  move scrubber
    right/left
    + right/left
    ; '   to clip start/end
  forward/backward
    j k l
  316
  markers
    i    in
    o    out
    !z  clear
    T    split (select right)
    +T  split (select left)

# SQL

## Oracle

### Alter Table

  http://www.techonthenet.com/oracle/tables/alter_table.php
  add column
    ALTER TABLE table_name ADD column_name column-definition;
    ALTER TABLE customers ADD customer_name varchar2(45);
    multiple columns
      ALTER TABLE customers ADD (customer_name varchar2(45), city varchar2(40));
  modify column
    ALTER TABLE customers MODIFY customer_name varchar2(100) not null;
  drop column
    ALTER TABLE customers DROP COLUMN customer_name;
  rename column
    ALTER TABLE customers RENAME COLUMN customer_name to cname;
  rename table
    ALTER TABLE customers RENAME TO contacts;

### Drop table

  DROP TABLE customers;

### View

  create view
    CREATE OR REPLACE VIEW view_name AS
      SELECT columns
      FROM table
      WHERE conditions;
  drop view
    DROP VIEW view_name;

### Foreign keys

  drop foreign key
    ALTER TABLE table_name DROP CONSTRAINT constraint_name;
  create fk
    CREATE TABLE supplier ( CONSTRAINT supplier_pk PRIMARY KEY (supplier_id) );
    CONSTRAINT fk_supplier FOREIGN KEY (supplier_id) REFERENCES supplier(supplier_id)

# tmux

  move pane to separate window
    break-pane
  join window into a pane
    join-pane
    join-pane -s :3
      grab pane from window 3 and join current
    join-pane -t :1
      send current pane to window 3
  join session
    tmux attach -t 0
  move windows
    bind c-o  rotate window up
    bind m-o  rotate windo down
  resize
    resize-pane -R 20
      resize current pane right by 20 cells
      -D -U -L -R

# Unix

## csvkit

  csvcut
    indices and names
      csvcut -n examples/realdata/FY09_EDU_Recipients_by_State.csv
      1: State Name
      2: State Abbreviate
    Extract columns:
      csvcut -c 1,3 examples/realdata/FY09_EDU_Recipients_by_State.csv
      csvcut -c TOTAL,"State Name" examples/realdata/FY09_EDU_Recipients_by_State.csv
  csvformat
    convert to tab delimited
      csvformat -q "'" -T csv2tsv01_input.csv
        -T  target tab delimited
        -q "'"  quote in ''
      csvformat -q "'" -T -u 0 --tabs temp.csv 
        --tabs  input is in 
        -u0 quoting minimal 
  csvsql
    generate sql from csv
      csvsql data.csv
      doesn't work. but this works
        cat data.csv | awk -F "\t" '{printf("INSERT INTO T_COMMON_ENUM_VALUE (id,name,category_id) values (%s, '\''%s'\'', %s, %s);\n", $1, $2, $3, $4)}'

## cat

  cat *.csv > all.csv
    join all csv files

## chmod

  give permission to write/execute recursively
    RUN chmod -R 777 /srv/app/data
    in docker
      RUN chmod -R 777 /srv/app/data

## date

  append date to filename
    http://unix.stackexchange.com/questions/96380/how-to-append-date-to-backup-file
    echo "$(date +%Y%m%d_%H%M%S)"
      20170922_164920
    date +"%Y%m%d_%H%M%S"
    echo "$(date)"
      Fri Sep 22 16:51:14 UTC 2017
    touch "foo.backup.$(date)"
    touch "foo.backup.$(date +%F_%R)"

## dos2unix

   ^M karakterini temizleme
    http://unix.stackexchange.com/questions/134695/what-is-the-m-character-called
    http://stackoverflow.com/questions/5843495/what-does-m-character-mean-in-vim
    dos2unix 'file.txt'
    cat file1.txt | tr "\r" "\n" > file2.txt
      fazladan satır koyar
    vim: %s/^V^M//g

## du

  disk file size distribution
      du -h . | sort -rh | head 
      -d 1
        depth 1
  List files by size
    du -ah $dir | sort -rh | tail
      -a for all files, not directories
      -h human readable
  List sizes of directories recursively
    du -h | sort -hr

## echo

  Input echo like a file to cat
    cat <(echo "cik,exchange") $dir_result/*/exchanges.csv > $dir_result/exchanges_from_10k_filings.csv

## xargs

  find files and remove them
    find . -name "*.bak" -type f | head | xargs rm -f
  spaces in the arguments
    xargs -n1 -d '\n' zip "temp.zip"
      -d delimiter is \n
      -n1 use only one argument
  placehold
    -i[placeholder] 
        behaves like -I, except that the placeholder is optional; if you omit the placeholder string, it defaults to the string {}. Thus, the previous example could be written as
            xargs -i mv dir1/'{}' dir2/'{}'
            xargs -i'{}'/ mv dir1/'{}' dir2/'{}'
    ls | xargs -I {} mv {} 20080815-{}
    This works because {} is a placeholder meaning "the current argument". (You can use xxx or yyy or any other string instead of {} if you want, as well, and it'll do exactly the same thing.) -I implies -n1, because you want to act on each file individually. 
  find ack and xargs
    http://blog.jessitron.com/2014/10/repeating-commands-in-bash-per-line-per.html
    find . -iname "data*" | ack 'data_model|datamodel' | ack '\.md' | ack -v 'huseyin|arif|rdm|intro|audit|2016|alexey|temp|datamodel_bps_02|/tr/|/en/' | xargs -n1 -d '\n' -I {} make_uml {}
      runs each input one by one
      not in a batch: -n1
  ack/grep and sed by xargs
    ack -l "view_data_model_all.md" | xargs -n1 -d '\n' -I {} echo {}
    ack -l "view_data_model_all.md" | xargs -n1 -d '\n' -I {} sed -i -e 's#view_data_model_all.md#view/view_data_model_all.md#g' {}
    grep -lRZ "\.jpg|\.png|\.gif" . | xargs -0 -l sed -i -e 's/\.jpg\|\.gif\|\.png/.bmp/g'
      grep
      xargs
        -0: use \0 as record separator
        -l: use one line per command as parameter
        


## json

  pretty
    https://stackoverflow.com/questions/352098/how-can-i-pretty-print-json-in-unix-shell-script
    underscore
      echo '{"a":2}' | underscore print
    jq
      jq . file
      jsonlint file.json
      jq . <<< '{ "foo": "lorem", "bar": "ipsum" }'
      echo '{ "foo": "lorem", "bar": "ipsum" }' | jq .
    js
      JSON.stringify({"foo":"lorem","bar":"ipsum"}, null, 4);
        4 spaces per indent
      node -p "JSON.stringify(JSON.parse(process.argv[1]), null, '\t');"
    underscore
      https://github.com/ddopson/underscore-cli

## ack

  -f --follow symlinks
  list file names only
    ack -l
    list known file types
      ack --help-types
  open resulting files
    vim $(ack -l search)
  search in files
    find -iname "dm_kl*" | ack --files-from=- bonitet
  -o
    print only matching pattern
  -h --no-filename      
    suppress filenames on output
  exclude dir
    --ignore-dir=dir1 --ignore-dir=dir2

## ag

  -f --follow symlinks
  limit file types
    ack mertnuhoglu_wpmn -G "wp-config\.php$"
    ag -G csv
    ag --list-file-types
    alias bbag="ag -G '\.(bb|bbappend|inc|conf)$'"
    ag -G '\.md$' ddd 
  show files that will be searched
    ag -l <nosearchterm>
  unlimited search
    ag -u
  literal search (no regex)
    ag -Q .rb dir/
  list file names only
    ag -l
  smart case
    -S
  ignore case
    -i

## alias

  send parameter
    all parameters will appear after its expansion:
      $ alias foo='/path/to/bar'
      $ foo some args
      will get expanded to
      $ /path/to/bar some args
    use function
      find2 () { find . -iname "*$1*"; }
      find2 15504

## dotgpg - encryption

  Setup for GPG Encryption Software
    ref:
    - Sharing Passwords Process
      <url:file:///~/Dropbox (BTG)/TEUIS PROJECT 00-BTG TEAM FOLDER/processes/administration/software_tools/sharing_passwords.md>
    1. Install the tool by the instructions given here:
      https://github.com/ConradIrwin/dotgpg
    For osx:
      brew install gpg
      sudo gem install dotgpg
    You need to install first brew, if you haven't yet:
      ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    2. First running
      dotgpg init
    3. Create a new document
      dotgpg edit passwords.gpg
    4. Read an existing document
      dotgpg cat passwords.gpg
    5. Get your public key to send someone
      dotgpg key
    6. Add someone to your team (folder)
      dotgpg add 
    Paste his public key.
  Sharing your public key on keyservers (optional)
    In order to easily share your public key, use keyservers.
    https://www.madboa.com/geek/gpg-quickstart/
    1. Install GnuPG
      brew install gpg
    2. Create your private/public key
      gpg --gen-key
    3. Get your key id
      $  gpg --list-keys
      /Users/mertnuhoglu/.gnupg/pubring.gpg
      -------------------------------------
      pub   4096R/CB3AF6E6 2015-12-24 [expires: 2016-12-23]
      uid                  Mert Nuhoglu <mert.nuhoglu@gmail.com>
      sub   4096R/0D6B756F 2015-12-24 [expires: 2016-12-23]
    4. Send your public key to keyservers
      gpg --send-keys 'CB3AF6E6' --keyserver hkp://subkeys.pgp.net
    5. Find public key of someone
      $  gpg --search-keys 'mert.nuhoglu@gmail.com'
      gpg: searching for "mert.nuhoglu@gmail.com" from hkp server keys.gnupg.net
      (1)     Mert Nuhoglu <mert.nuhoglu@gmail.com>
                4096 bit RSA key CB3AF6E6, created: 2015-12-24, expires: 2016-12-23
      Keys 1-1 of 1 for "mert.nuhoglu@gmail.com".  Enter number(s), N)ext, or Q)uit > 1

## gem

  use bundler
    https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/
    gem install bundler
    prepare Gemfile
    bundle install
  global install for osx
    sudo gem install jekyll -n/usr/local/bin
    http://stackoverflow.com/questions/31972968/cant-install-gems-on-os-x-el-capitan

## homebrew

  install
    https://www.moncefbelyamani.com/how-to-install-xcode-homebrew-git-rvm-ruby-on-mac/
    xcode için tamamını yükleme, sadece command line tools'u yükle
  switch system applications with brew
    http://stackoverflow.com/questions/8730676/how-can-i-switch-to-ruby-1-9-3-installed-using-homebrew
    change precedence in PATH
    # homebrews should always take precedence
    /usr/local/bin
    # the default stack
    /usr/bin
    /bin
    /usr/sbin
    /sbin
  which app is used
    which -a ruby
  doctor
    brew doctor
  dependencies
    brew deps osxfuse
  sizes of packages
    brew list | xargs brew info

## ed - vim

  global command
    ed -s file <<< $'g/^\*/m$\nwq\n'
  print/delete gibi komutlar için
    grep
    grep -v
  examples: grep = ed
    >temp2 grep -v '[<>:#`"()]' temp 
    >temp3 grep -v '\. \w' temp2 
    >temp4 grep ']\s*$' temp3 
    >temp5 grep '^ ' temp4 
    #>temp2 ed -s temp <<< $'g/[<>:#`"()]/d\n,p'  
    #>temp3 ed -s temp2 <<< $'g/\. \w/d\n,p'  
    #>temp4 ed -s temp3 <<< $'v/]\s*$/d\n,p'
    #>temp5 ed -s temp4 <<< $'v/^ /d\n,p'

## ffmpeg

  concat videos with same codecs
    ffmpeg -f concat -i video_files.in -c copy output.mp4
    video_files.in
      file 'slide001.mp4'
      file 'slide002.mp4'
      for f in ./*.wav; do echo "file '$f'" >> mylist.txt; done
  get information about video
    ffmpeg -i video.mp4
  change dimensions size resolution
    ffmpeg -i input.avi -vf scale=320:240 output.avi
      constant dimensions: 320x240
    ffmpeg -i input.jpg -vf scale=320:-1 output_320.png
      make width 320 and scale proportionally
  cut/split video
    ffmpeg -ss 01:12:30 -i erdem_demo_of_refactored_code_20160204_long.mp4 -t 00:51:00 -vcodec copy -acodec copy discussion_mustafa_erdem_20160204.mp4
      -ss starttime
      -t duration
      -i input
      ffmpeg -ss 00:22:56 -i ahmet_teuis_data_model_development_meeting_02_20160207.mp4 -t 00:27:24 -vcodec copy -acodec copy emre_data_model_20160207.mp4

## find

  remove all files except txt
    find "$HOME/Dropbox (BTG)/TEUIS PROJECT 05-ANALYSIS/working_library/requirements_database/scripts/data/" -type f -not -name '*txt' -print0 | xargs -0 rm --
  under a specific directory
    find data/sql -iname "*.sql" 
    find data/sql dir2 -iname "*.sql" 
  find cat
    find . -iname "links" -print0 | xargs -0 -I {} cat {} > all_links
  find and replace text with sed
    http://unix.stackexchange.com/questions/191274/how-do-i-perform-xargs-grep-on-grep-output-that-has-spaces
    opt3
      grep -Z -z | xargs -0 ..
        -Z zero byte after filename
        -z zero byte (in input)
    opt2
      find . -name "*.cpp" \
        | grep "<name regex>" \
        | perl -pne 's/\n/\0/' \
        | xargs -0 grep "<content regex>"
    opt1
      find /home/www -type f -print0 | xargs -0 sed -i 's/subdomainA.example.com/subdomainB.example.com/g'
        From man find:
          -print0 (GNU find only) tells find to use the null character (\0) instead of whitespace as the output delimiter between pathnames found. This is a safer option if you files can contain blanks or other special character. It is recommended to use the -print0 argument to find if you use -exec command or xargs (the -0 argument is needed in xargs.).
      in specific files only
        find . -regex '.*\.\(R\|md\|otl\|sh\|shaape\)$' -type f -print0 | xargs -0 sed -i 's/meeting_yucel_bps_12_05_20160408/meeting_yucel_bps_12_13_05_20160408/g'
  find files and zip them
    http://stackoverflow.com/questions/13234850/how-can-i-search-for-files-and-zip-them-in-one-zip-file
      find . -name <name> -print | zip name.zip -@
        The -@ tells zip to read files from the input
      zip name.zip `find . -name <name> -print`
      find -regex 'regex' -exec zip filname.zip {} +
        works with spaces too
        '.*\.\(R\|md\|otl\|sh\|shaape\)$' 
        find -regex '.*\.\(R\|md\|otl\|sh\|shaape\)$' -exec zip "$HOME/Dropbox/projeler/btg/backup_dropbox_btg.zip" {} +
          should match the whole name not partially
  go to directory after find
    http://stackoverflow.com/questions/3458461/find-file-then-cd-to-that-directory-in-linux
      cd "$(dirname "$(find / -type f -name ls | head -1)")"
      explanation
        > find / -type f -name ls
        /usr/bin/ls
        > find / -type f -name ls | head -1
        /usr/bin/ls
        > dirname "$(find / -type f -name ls | head -1)"
        /usr/bin
        > cd "$(dirname "$(find / -type f -name ls | head -1)")"
  using xargs
    find . -maxdepth 1 -iname "*.flv" -print0 | xargs -0 -I file ffmpeg -i file -b:a 192K -vn file.mp3
      it removes \n at the end of print
      !!! warning: -print 0 removes \n thus filtering with regex $ such as ag ".*$" does not work
    find search-3S-beta -name '*.log.*' -print0 |xargs -0 rm
      use print0 when using xargs
  remove files
    find . -type f -name "file" -exec rm -f {} \;
    find -type f -size -1000c -exec rm {} +
    find -type f -size -1000c -print0 | xargs -0 rm 
  by regex
    find . -iname "*.zip" | ag "^\.\/\d+.zip" | wc -l
  by size
    find $dir -size 0
    find -type f -size 0
    find -type f -size -1000c
      files less than 1000 bytes
  custom find
    find2 () { find . -iname "*$1*"; }
  by update time
    find . -mtime -3 -iname "*.xlsx"
    find . -mtime -3 | ag ".xlsx"
    find . -mtime -3 -ls
    find . -mmin -240 -iname "*.xlsx"
    params
      -mmin n (modification time in minutes)
      -mtime n (modification time in days)
      -newer file (modification time newer than modification time of file)
      -daystart (adjust start time from current time to start of day)
      Plus alternatives for access time and 'change' or 'create' time.
      -mtime -7
        7 days ago
  how to find folders that have some specific file inside
    opt
      find . -type d -iname ".git"
      find /var/www/html -path "myFolder/otherFolder?" -name "*.php" -exec do_some_housekeeping {} \;
  find or condition: list all files then filter by ack
    find -L | ack 'md' | ack -v '/inbox/'
  find files not matching a path
    find -not -path '*/inbox/*' | ack 'md' 



## grep

  fixed word search
    grep -F
    == fgrep
  grep a list of words
    search words in A in file B
      grep -f A B 
      remove the last \n of A
        tr '\n' '|' < A > A_regex
        egrep -f A_regex B
  find difference between files:
    grep -v -F -x -f file1.md file2.md > diff.md
      lines in file2 but not in file1

## tail

  logs monitoring
    tail -f file
  skip first lines / head from line
    tail -n +2
      start from line 2

## iconv

  bir klasördeki tüm dosyaları çevir
    #!/bin/bash
    FROM_ENCODING="iso-8859-9"
    TO_ENCODING="utf-8//translit"
    CONVERT=" iconv  -f   $FROM_ENCODING  -t   $TO_ENCODING"
    for  file  in  *.csv; do
      echo $file
      $CONVERT   "$file" > "$file.new" &&
      mv -f "$file.new" "$file"
    done
    exit 0

## imagemagick

  split pdf into pages
  convert file.pdf image.png
    convert -quality 100 -density 300x300 -resize 1280x720 index.pdf slide%d.jpg
    mogrify -quality 100 -density 300x300 -resize 1280x720\! *.jpg 
    forces resize to fixed dimensions
  convert multi page pdf to multiple pages
    convert x.pdf x-%0d.jpg
    convert "ICB-TS-16-048 Software Development I.pdf" x-%03d.jpg
  just a single page
    convert x.pdf[2] x3.jpg
  resize image
    convert -resize 1280x720\! intro.pdf intro-%02d.jpg
    resize to fixed dimensions
    convert -resize 1280x720 intro.pdf intro-%02d.jpg
    resize proportionally
  check dimensions of an image
    identify intro-01.jpg
    intro-01.jpg JPEG 1280x720 1280x720+0+0 8-bit Gray 256c 41.6KB 0.000u 0:00.000  

## jsonlint - formatter for json

  jsonlint iktisadi.json | sponge iktisadi.json

## ln - symbolic link

  create
    ln -s /path/to/target /path/to/symlink
  update
    ln -snf /path/to/target /path/to/symlink
  list and remove symbolic links
    ls -la | acm "\-\>"
    rm .bashrc
  symbolic link to directory
    same as
      ln -s /path/to/dir/ /path/to/symlink
    make paths absolute not relative
      ln -s /Users/mertnuhoglu/projects/stuff/bash/ /usr/local/stuff

## ls

  one entry per line
    ls -1a
  list hidden files
    ls -ld .?* 
      -l   use a long listing format
      -d    list  directory entries instead of contents
      .?*  will only state hidden files 
  list directories
    echo */
    ls -d */

## netcat 

  install
    brew install netcat
  start an echoing tcp server
    netcat -l -p 8888
  start client
    netcat localhost 8888

## node js javascript

  run a js script from shell
    http://www.2ality.com/2011/12/nodejs-shell-scripting.html
    opt1 - as js file
      #!/usr/bin/env node
      console.log("test js");
    opt2 - as sh script
      #!/bin/sh
      node ./print_test.js
  read a file
    var fs = require('fs');
    var text = fs.readFileSync('file.txt', "utf8");
  write a file
    fs.writeFileSync(fileName, str, 'utf8');
  change case (titlecase)
    https://www.npmjs.com/package/change-case
    var changeCase = require('change-case');
    text = changeCase.titleCase(text);
  pass an argument
    var file_name = process.argv[2]
  simple web server
    npm install http-server -g
    http-server

## Pandoc

  pandoc $filename -o $word
  pandoc x.docx -o x.pdf

## passwd

  change password
    passwd
  change password of some user
    su
    passwd userx

## Perl

  substitution
    perl -pe 's/<regex>/<repl>/g'
  perl parameters
    -F/pattern/    split() pattern for -a switch
    -l[octal]      automatic "\n" on print
    -a            splits $_ into @F
    -n            assume "while (<>) {...}" loop around program
    -p            assume loop but also print each line
    -e program      one line program

  print column 1
    perl -lane 'print $F[0]'
  multiple columns
    perl -lane 'print @F[0,2..3]'
  print total storage of directory
    ls -l | perl -lane '$sum+=$F[4];print "sum=$sum" if(eof)' 

  match pattern and print
    cat | awk '/pattern/ { print }'
    cat | sed -n '/pattern/ p'
    cat | perl -ne 'print if /pattern/'
      if no arg to print then it prints $_
    perl -ne 'print unless /pattern/'
      print all lines that don't match
    cat | perl -ne '/pattern/ and print'
      'and' operator short-circuits

### multi line

  m
    ^$ matches line based
  s
    . matches \n

  $x = "There once was a girl\nWho programmed in Perl\n";

  $x =~ /^Who/;  # doesn't match, "Who" not at start of string
  $x =~ /^Who/s;  # doesn't match, "Who" not at start of string
  $x =~ /^Who/m;  # matches, "Who" at start of second line
  $x =~ /^Who/sm; # matches, "Who" at start of second line

  $x =~ /girl.Who/;  # doesn't match, "." doesn't match "\n"
  $x =~ /girl.Who/s;  # matches, "." matches "\n"
  $x =~ /girl.Who/m;  # doesn't match, "." doesn't match "\n"
  $x =~ /girl.Who/sm; # matches, "." matches "\n"

### modifiers

  http://perldoc.perl.org/perlre.html#Modifiers
  http://perldoc.perl.org/perlop.html#Regexp-Quote-Like-Operators
  https://www.regex101.com/
  command switches:
    -0777
    perldoc perlrun
    > Command switches

### cpan 

  how to install cpan module
    opt1
      cpan
      install "Email::Reply";
      q
        quit
    opt2
      cpan App::cpanminus
    opt3 (best)
      cpanm Graph::Easy
    first install cpanm
      cpan App::cpanminus

## ps

  ps -u mertnuhoglu -o rss,etime,pid,command
  sum of memory use
    ps --no-headers -u $USER -o pcpu,rss | awk '{cpu += $1; rss += $2} END {print cpu, rss}'

## rename
  rename 's/old-name/new-name/' files
  Arguments
    -v: verbose
    -n: show don't rename
    -f: overwrite
  Change .html to .php
    rename 's/\.html$/\.php/' *.html
  backreference:
    $1 instead of \1
    rename -n 's/(data)/$1/' *.md
  find then rename
    find2 " " | xargs -I file rename 's/ /_/g' file
    for folders
      find . -maxdepth 1 -type d | xargs -I dir rename -n 's/ /_/g' dir
  transliterate file names
    echo bdNİOşığ.pdf | iconv -f utf-8 -t ascii//translit
      bir türlü çalışmadı

## Rio

  Rio R in bash 
    find . -name "*.R" | xargs wc -l | perl -pe 's/ +/,/g' | Rio -rse 'df[2] %>% sum'
    -r  dplyr
    -s  sqldf
    -g  ggplot
    -n  no header
    -d  delimiter

## rsync

  örnek
    rsync -aP --delete "$source/update/" "$target/update/"
      dikkat: klasörleri kopyalarken hedef klasörü tam olarak yazın "update/" yazmazsanız, "update" klasörünü oluşturmaz ve $target içindeki dosyaları siler

  rsync general usage
    rsync -nazP from to/
      copy from dir
    rsync -nazP from/ to/
      copy the contents of from
    rsync -nazP "${folder}" "${target}"
  rsync -options source_dir target_dir
  options
    -r recursively
    -v verbose
    -a preserve file attributes
    --ignore-existing
    -P progress

## scp

  upload single file
    scp source_file_name username@destination_host:destination_folder
    scp data.tar.gz mertnuhoglu@danone.mertnuhoglu.com:~/
  uploading multiple files 
    tar cfz - . | ssh awso "mkdir -p Downloads/sql; cd Downloads/sql; tar xvzf -"
  permission denied Hatası
    dizin yetkisi ver:
      sudo chmod 777 Downloads

## sed

global command
  ex
    sed -i -e '/^\s*#/!s/\\$val\>/$pid/g' getproc.pl 
      Replace all variables $val with $pid in test.pl, except on commented lines. #SEDtember
    sed "/re/d"
  ed -s file <<< $'g/^\*/m$\nwq\n'
  ex
    >temp2 ed -s temp <<< $'g/[.:#]/d\n,p'  
    >temp3 ed -s temp2 <<< $'v/]/d\n,p'
    >temp4 sort -u temp3 
    >temp5 ed -s temp4 <<< $'g/|/m0\n,p'
  hints 
    there is no pipe
    at the end: \n,p
    at start: $
    regex:  
      https://www.gnu.org/software/gnulib/manual/html_node/ed-regular-expression-syntax.html
      http://www.regular-expressions.info/gnu.html
commands
  find then sed
    find . -maxdepth 1 -name "*.R" -exec sed -i "s/\<enum_id\>/enum_category_id/g" {} \;
  replace in place
    sed -i 's/test/sinav/g' temp
  find replace 
    sed 's/test/sinav/g' temp
    echo day | sed s/day/night/
    sed 's/day/night/' <old >new
  global command like use (replace in matching lines)
    Delete with d
      sed '/WORD/d'
    ilk 10 satırı bırak
      sed '11,$ d' <file
    multiple commands
      sed -e '/match/ {s/: /:@@/ ; s/ /%20/g ; s/:@@/: /}' temp.md
      sed -i -e '/searchstring/ s/mystring/1/ ; /searchstring/! s/mystring/0/' $target
        /searchstring/!
          non-matching lines
  ilk ve son satırlara ekleme yap 
    sed -i '1s/^/\nCOMMIT;\n/' data/sql/*.sql
    sed -i '$s/$/\nCOMMIT;\n/' data/sql/*.sql
  Append a line with 'a'
    sed '/WORD/ a\
    Add this line after every line with WORD
    '
  Insert a line with 'i'
  Change a line with 'c'
  You can combine all three actions using curly braces: 
  #!/bin/sh
    shebang
    #!/usr/bin/env python3
      portability için
    #!/usr/local/bin python3
      hardcoded ve statik
    #!/usr/bin/env Rscript
  sed '
  /WORD/ {
  i\
  Add this line before
  a\
  Add this line after
  c\
  Change the line to this one
  }'
  Using & as the matched string
  wrap the matched text in paranthesis:
  sed 's/[a-z]*/(&)/' <old >new
  \1 to keep part of the pattern
  keep first match in a line, delete the rest
  sed 's/\([a-z]*\).*/\1/'
examples
  double every empty line
  sed '/^$/ p'
  act like grep
  sed -n '/match/ p'
  Reversing the restriction with !
  sed -n '/match/ !p' </tmp/b
  save inline
  sed -i 's/test/sinav/g' temp
  run recursively in subdirectories
  find . -type f -print0 | xargs -0 sed -i 's/subdomainA.example.com/subdomainB.example.com/g'
range and lines
  /begin/,/end/ {
  line number
  sed '3 s/[0-9][0-9]*//' <file >new
  patterns
  sed '/^#/ s/[0-9][0-9]*//'
flags
  /g global replacement
  /p print
options
  no print by default
  sed -n 's/pattern/&/p' <file
  Multiple commands with -e
  sed -e 's/a/a/' -e 's/b/B/' <old >new
  run script file
  sed -f scriptname


## sponge

  use a file as input and output
    uniq .bash_history | sponge .bash_history

## ssh

  setup passwordless ssh login
    http://osxdaily.com/2012/05/25/how-to-set-up-a-password-less-ssh-login/
    ssh root@46.101.137.224
    root
    m.0

## su

  change user account
    su user

## tar

  tar cvzf archive_name.tar.gz dirname/
    c – create a new archive
    v – verbosely list files which are processed.
    f – following is the archive file name
    z - gzip
  tar xvfz archive_name.tar.gz


## telnet
  
  telnet 127.0.0.1 6789
    to test sockets
  exiting: ^]

## textutil
  Convert DOCX to TXT:
    textutil -convert txt /path/to/DOCX/files/*.docx
  Convert .docx to .rtf :
    textutil -convert rtf /path/to/docx/files/*.docx

## tr

  trim newline character
    alias cpw='pwd | tr -d "\n" | pbcopy '

## tree

  directory structure
    tree
    tree -L 2

## cut

  print a column
    cut -d " " -f 1,3 "file"

## wttr / weather

  curl wttr.in/Bash
    hava durumu

## xlsx2csv

  xlsx2csv "${filename}" > $target

## xmllint

  xmllint --format file.xml

## wget

  wget -i file
    dl urls in file

## zip

  unzip
  unzip -oq opencart.zip -d ~/webapps/ot01/
    -q  quietly
    -o  overwrite all files
  Zip Multiple Folders Each into its own zip archive
    for i in */; do zip -r "${i%/}.zip" "$i"; done
  Zip multiple files into one zip file
    zip myzip.zip cvd*.txt
  Group files and zip them
    for i in {100..105}; do zip $i.zip $i*.txt; done
    for i in {10..19}; do zip $i.zip $i*.txt; done
  To include the contents of a directory in a zip archive, enter:
    zip -r backup.zip data/
  Relative / Absolute Path
    Hangi dizin içindeysen, ona göre yolları oluşturur. 
    Harici bir yerden zipleme yaparsan, tüm yolu koyar. Çözüm subshell:
    ( cd /some/path ; zip -qr /path/to/out.zip ./folder/ )
    http://superuser.com/questions/119649/avoid-unwanted-path-in-zip-file

## zsh

  profiling startup times
    /usr/bin/time zsh -i -c exit
      zsh başlama süresi
    time brew --prefix hub
      brew komutunun süresini ölçer
    { time ( eval "$(rbenv init -)" ) } 2>&1
      eval blockunun süresini ölçer
  oh-my-zsh
    https://github.com/robbyrussell/oh-my-zsh/wiki/Cheatsheet
    cat ~/.oh-my-zsh/lib/directories.zsh
    alias list all aliases
    ..  cd ..
    ... cd ../..
    / cd /
    cd +n switch to directory number n
    1 cd -
    2 cd +2
    md  mkdir -p
    rd  rmdir
    d dirs -v (lists last used directories)

# Unix use cases

## csv

  Print a column
    cut -d " " -f 1,3 "file"
    perl -pale '$_="@F[0,2]"'
    perl -lane 'print "@F[0,2]"'
    Rio -se 'df[2]'
      find . -name "*.R" | xargs wc -l | perl -pe 's/ +/,/g' | Rio -se 'df[2]'

## copying

  copy all files except some
    rsync -av from/ to/ --exclude=Default.png
      -a, --archive        archive mode; equals -rlptgoD (no -H,-A,-X)
      -v, --verbose        increase verbosity
  cp

## image manipulation

  splitting pdf files into pages
  <url:#tp= split pdf into pages>
  resizing images in terminal
    sips -Z 640 *.jpg
  making image transparent png
  preview - osx
    http://osxdaily.com/2013/01/27/make-a-transparent-image-png-or-gif-easily-with-preview-for-mac-os-x/
    select lasso tool > select area > delete

## system network

  which ports are busy
    sudo lsof -i -n -P | grep TCP

# Vim

  speed up startup time
    vim --startuptime vim.log
      profiling times
    :ColorSchemeSave
      just save color scheme once
  file specific settings commands by extension
    autocmd BufRead,BufNewFile   *.shaape set nowrap
  running vim from shell
    run command
      vim -c OpenStuff
    man vim
    http://stackoverflow.com/questions/18860020/executing-vim-commands-in-a-shell-script
    vim -N -u NONE -n -c "set nomore" -S "commands.vim" "filespec"
      -c  run command
      -S  run commands in file
    vim  -c "set ff=dos" -c wq mine.mak
  color chart
    runtime syntax/colortest.vim
      names of colors
    XtermColorTable
      rgb codes
  call normal in vimscript
    command! SurroundWithBackQuotes normal viwS`e
    command! SurroundWithBackQuotes normal! viwS`e
      never override a key
  alias for command
    command <AliasName> <string of command to be aliased>
  repeat colon command
    @: 
    @@
  silent
    silent argdo ...
      suppress all but error messages
    silent! bufdo ...
      suppress all messages
  remove non-visible non-printable bad invisible characters
    %s/[^[:print:]]//g
  open url under cursor in browser
    gx
  capture ex output
    :redir @a
    :set all
    :redir END
  tab space indent
    use tabs
      set tabstop=2 softtabstop=0 noexpandtab shiftwidth=2 
    tab yerine space kullan
      set expandtab
    mevcut tabları çevir
      retab
    Tersi:
      set no expandtab
  variable parameter values
    set tabstop? 
  unicode
    set bomb | set fileencoding=utf-8 
    set nobomb | set fileencoding=utf-8 
  list all mappings
    nmap, vmap, imap
  current date
    nnoremap üüd "=strftime("%Y%m%d")<CR>P
    abbrev üüd <C-R>=strftime("%Y%m%d")<CR>
  order of settings 
    after a filetype such as votl
      ~/.vim/after/ftplugin/votl.vim

## debugging vim

  ref
    http://peox.net/articles/vimconfig.html
  which script set some option?
    verbose set formatoptions
      output
        formatoptions=tcrq
        Last set from /usr/share/vim/vim70/ftplugin/perl.vim

## mappings - key bindings

  <Plug> mappings
    http://whileimautomaton.net/2008/09/27022735
    http://stackoverflow.com/questions/18546533/execute-plug-commands-in-vim
    nmap <C-v>  <Plug>(fakeclip-p)
      overrides existing mapping
  normal command
    nmap <Leader>sq viwS`e
      nmap: use overridden normal command S
      nnoremap: use default normal command S

## me - custom commands
  using space in file names
    custom commands:
      :W :Save :Cd
    need to escape like "this\ is"
  voom
    voomtoggle  F3
  PutHistory

### information/knowledge organization
  convert email/rtf to md
    ConvertEmailRtf2Md
  convert otl files for md
    ConvertOtl2Md
  put Id ref title
    Id2
      copy Id ref
    Id3
      copy Id ref and put it below
    IdG
      put global Id ref and put it below
    IdR
      put global Id ref in R code and put it below
  resort nodes
    SortNoteTags
  extract nodes
    ExtractTagsWithUnderlineSymbol
    ExtractTagsWithUnderlineSymbolSingle
    ExtractListRequirements
    ExtractTagsWithAtSymbol
    ExtractReqsWithLinks
    ExtractLinesWithSearchWords
  url/link/references
    CopyLineAsUrl  üz
      copy current line as file and text reference
    CopyLocation  üç
      word under cursor as text
    CopyLocationId  üÇ
      word under cursor as id

## normal mode
  count words
    g ^g
  go tab
    gt    next tab
    2 gt  go to tab 2
    gT    prev tab
    2 gT  go 2 tabs prev
    :tablast
    :tabfirst

## ex commands
  
  sort 
    sort
    using decimal number order
      sort n

## visual mode

  o   select from the other end

## quickfix - location list

  normal
    unimpaired mappings
      [Q  first item
      [q ]q   next/prev quickfix
      [l ]l   next/prev location
  ex
    cc 2
    cn    next
    cp
    ccl   close
  unimpaired
    ]a [b
    [<space> ]  add newline
    [e ]e   exchange current line
    [f ]f   next/prev file

## abolish

  convert camel to underscore
    fooBar into foo_bar? 
  commands
    snake_case (crs)
    MixedCase (crm)
    camelCase (crc)
    snake_case (crs)
    UPPER_CASE (cru)

## regex

  ex regex id=g_10107
    ex regex <url:file:///~/Dropbox/mynotes/ref.otl#r=g_10107>
      g/http:/ s#?\S\+$##
        remove trailing parts in urls after `?` symbol
          http://blog.pivotal.io/data-science-pivotal/pivotal-people/pivotal-people-sarah-aerni-on-how-to-become-a-data-scientist?utm_content=buffer728c4&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer
          >
          http://blog.pivotal.io/data-science-pivotal/pivotal-people/pivotal-people-sarah-aerni-on-how-to-become-a-data-scientist
  unicode chars in vim regex
    \w doesn't match unicode chars
    https://stackoverflow.com/questions/19385458/vim-regex-matches-unicode-characters-are-as-non-word
      ASCII                           UTF-8
      -----                           -----
      \w                              [a-zA-Z\u0100-\uFFFF]
      \W                              [^a-zA-Z\u0100-\uFFFF]
    https://unix.stackexchange.com/questions/60481/match-word-containing-characters-beyond-a-za-z/60600#60600
      \k matches all Latin accented chars 
      see iskeyword option
  use different separators 
    %s#reg#ex#g
  match multiline
    \_.
    match quoted multi line string
      "[^"]*\_[^"]*"
  Grouping and Backreferences
    rules
      & the whole matched pattern 
      \L  the following characters are made lowercase
      \0  the whole matched pattern 
      \U  the following characters are made uppercase
      \1  the matched pattern in the first pair of \(\) 
      \E  end of \U and \L
      \2  the matched pattern in the second pair of \(\)  
      \e  end of \U and \L
      ... ... 
      \r  split line in two at this point
      \9  the matched pattern in the ninth pair of \(\) 
      \l  next character made lowercase
      ~ the previous substitute string
      \u  next character made uppercase
    examples
      s:\([.!?]\)\s\+\([a-z]\):\1  \u\2:g
        küçük harfle başlayan cümleleri, büyük harfe çevirir
  Lookbehind Lookaround Lookforward
    ex
      /\(foo.*\)\@<!bar
        to find all bar that are not preceeded by a foo: 
    Dikkat: ATOM: \(foo.*\)
      \@ sembolünden önceki kısma look yapılıyor. 
    Look Ahead
      ATOM\@= 
        perl (?=PATTERN) 
        positive
      ATOM\@! 
        negative
        perl (?!PATTERN) 
    Look Behind
      ATOM\@<= 
        perl (?<=PATTERN) 
      ATOM\@<!
        negative
    ATOM öncesindeki kısma karşılık geliyor:
      \(...\)
  reset position of match
    %s/\v(regex).*\zs/ \1
      http://stackoverflow.com/questions/34965210/how-to-put-regex-match-to-the-end-of-line-in-vim


## digraph symbols
  cheatsheet
    http://sheet.shiar.nl/digraphs
    http://sheet.shiar.nl/unicode
  finding symbol
    searching:
      :h digraph-table
      :SearchUnicode <word>
    browsing all
      :Digraphs
      :UnicodeTable
    identify a character under the cursor
      :UnicodeName
  using/typing symbols
    1. define iab and use:
      :iab %s* σ
      %s*
    2. define InoreabBSlash and use
      :InoreabBSlash jn ⨝ 
      \jn
    3. using defined digraphs
      Ctrl-K {char1} {char2}
    4. with digraph option
      ex: 
        a <BS> :
        is the same as
        ^K a:
  defining new digraphs for unicode chars
    digraphs Jn 10781
      defines for unicode char 10781 the digraph: Jn
      Ctrl-K J n
      c ⊂ 
  UnicodeTable
    ⊂    U+2282 &sub;  SUBSET OF((C)
      (C  existing digraph
  writing unicode char with code
    http://vim.wikia.com/wiki/Entering_special_characters
    ^vunnnnnn                    
      n: hex number
      ex: ^vu27d5
    ^vnxxxx
      x: dec number
  osx sembolleri
    menu > keyboard > show emoji and symbols

## global commands
  for bash scripts:
    prefer grep for d -v
    prefer ed for moving
  multiple commands in one line
    g/url/ s/url/hallo/ | s/hallo/ola/
  run global ex commands from bash
    vim -E -c 'g/csv/join' -c wq cols.otl
  join lines if they end with the following symbols
    g/\().\)\|\([={}\[,;\]]\)$/,/./-j
  substitute in matched lines
    g/pattern/ s /old/new/
  put a new line when a bullet line is succeeded with a normal line
    g/^\s*-\_[^-]*\_^\w/ s/$/\r/
  join multiple blank lines into a single blank line
    g/^$/,/./-j

## utl.vim url
  linking and references
    <url:vimhelp:%5cM>
    <url:vimhelp:vimfiler-default-key-mappings>
  id
    <url:#r=come-here>
    id=come-here
  text next
    <url:#tn=some text>
    here will come some text
    or
    <url:#some text>
  file links
    <url:../plugin/utl.vim>
    <url:../plugin/utl.vim#tn=thanks for>
    <url:../problem_data_model_20160305.md#r=come-here>
  url
    <url:http//www.vim.org>
  embedding-less links
    filename.txt


## unicode utf8 conversion

  opt
    write ++enc=iso-8859-9
    set bomb | set fileencoding=utf-8 
    set bomb | set fileencoding=iso-8859-9 
  opt2
    brew install dos2unix
    dos2unix file.txt

## plugins vim

### ctags+vim

  run ctags on terminal
    ctags -R .
    ctags -R -f ./.git/tags .
      put tags file into .git
  using in vim
    :tag function_name
  vim commands
    :tag /^asserts_*
      find all tags that start with asserts_
    :ts :tselect
    : show list
    :tn :tnext
    :tp
    :tf :tfirst
    :tl :tlast
    :tags
      show tags you've traversed
  vim+ctags+ctrlp
    :CtrlPTag
  vim+ctags+tagbar
    :TagbarToggle<cr>
      pops up in sidebar
      show tags organized
  .ctags
    <url:file:///~/.ctags>
    configuration
  help
    :help exuberant-ctags
  https://github.com/ludovicchabant/vim-gutentags
  http://andrewradev.com/2011/06/08/vim-and-ctags/
    :Function foo
    list functions that start with foo in quickfix

### vimfiler

default keymappings
  useful
    VimFilerExplorer -find 
      open current file in explorer
    VimFiler path
      opens path
  problem/does not work
    <Enter>     <Plug>(vimfiler_cd_or_edit)
  basic
    <BS>      <Plug>(vimfiler_switch_to_parent_directory)
    a cd  change current directory 
    t     <Plug>(vimfiler_expand_tree)
    gs      <Plug>(vimfiler_toggle_safe_mode)
    e     <Plug>(vimfiler_edit_file)
    T     <Plug>(vimfiler_expand_tree_recursive)
    o     <Plug>(vimfiler_expand_or_edit)
    a     <Plug>(vimfiler_choose_action)
    <Space>     <Plug>(vimfiler_toggle_mark_current_line)
  file commands
    yy      <Plug>(vimfiler_yank_full_path)
    c     <Plug>(vimfiler_copy_file)
    m     <Plug>(vimfiler_move_file)
    d     <Plug>(vimfiler_delete_file)
    r     <Plug>(vimfiler_rename_file)
    K     <Plug>(vimfiler_make_directory)
    N     <Plug>(vimfiler_new_file)
  directories
    gc      <Plug>(vimfiler_cd_vim_current_dir)
    L     <Plug>(vimfiler_switch_to_drive)
    ~     <Plug>(vimfiler_switch_to_home_directory)
    \     <Plug>(vimfiler_switch_to_root_directory)
    &     <Plug>(vimfiler_switch_to_project_directory)
    <C-j>     <Plug>(vimfiler_switch_to_history_directory)
  switch windows
    <Tab> (default)
          <Plug>(vimfiler_switch_to_another_vimfiler)
    <Tab> (enabled "no-quit" and "split" options)
          <Plug>(vimfiler_switch_to_other_window)
    q     <Plug>(vimfiler_hide)
    Q     <Plug>(vimfiler_exit)
    -     <Plug>(vimfiler_close)
    g?      <Plug>(vimfiler_help)
  system-shell
    v     <Plug>(vimfiler_preview_file)
    ge      <Plug>(vimfiler_execute_external_filer)
    H     <Plug>(vimfiler_popup_shell)
    !     <Plug>(vimfiler_execute_shell_command)
    gr      <Plug>(vimfiler_grep)
    gf      <Plug>(vimfiler_find)
    Y     <Plug>(vimfiler_pushd)
    P     <Plug>(vimfiler_popd)
  options
    gS  simple mode

  vim hotkeys to learn
    F4
    F2 vimfiler
      e edit
      t tree
      enter
      gs safe
      yy yank path
      r rename
      ^j history
      tab
      q quit
      H shell

### drawit.vim

  asciigraph alternative
  start
    \di
    DrawIt
  stop
    \ds
    DrawIt!
  modes: normal, single-bar, double-bar
    DInrml
    DIsngl
    DIdbl
  visual block mode
    1. select a region in visual mode
    2. command:
      \a  arrow
      \b  box
      \c  canvas (empty lines)
      \e  ellipse
      \f  fill figure
      \l  line from corners
      \s  spacer
  :SetBrush [a-z]
  The DrawIt package has been merged with Sylvain Viart's drawing package 
  shaape
    shaape -o bps01.png diagram_datamodel_bps_01_02.shaape; open bps01.png

### csv.vim

  WhatColumn
    what column is cursor on
    :CSVWhatColumn
    :WhatColumn!
  NrColumns
  SearchInColumn
    SearchInColumn 1 /p013/
  Substitute [column/]pattern/string[/flags]
    :%Substitute 1,4/foobar/baz/gce
    :%S 1,4/foobar/baz/gce
  HiColumn <nr>
    highlight column
    HiColumn!
  ArrangeColumn
  DeleteColumn 
    DeleteColumn <nr>
    DeleteColumn /column_match
  CSVInit
  Header
    freeze header line
    Header 3
      holds first 3 lines
    Header!
  VHeader
    freeze columns
    VHeader 2
  HeaderToggle
  VHeaderToggle
  NewRecord
  NewDelimiter
    change delimiter
  Duplicate
  Normal mode
    ^Left L W
    ^Right E H
    K
    J
    Enter:  fold all lines non-matching with current value
    Space:  fold matching lines
    <BS>:   remove last filter
  Filters
    CSVFilters
  Analyze <nr>
    descriptive stats
  VertFold <nr>
    hides all columns until <nr>
  Transpose
  CSVTabularize
    CSVTable
      for different filetypes
  AddColumn_CSV [column] [count]
  CountCol [nr] [distinct]
  MaxCol
  MinCol

### Voom votl
  outline navigation in tree
    click    move
    i I    beginning of node
    space    toggle node
    left/right    to parent/child
  voomgrep
    very sophisticated search tool
  moving
    ^^  ^up  üu
    --  ^dn  üd
    <<  ^lf  ül
    >>  ^rg  ür
    yy  "+ register
    dd
    pp

### Surround

  asterisk (*) = cursor position
    Old text                  Command     New text ~
    "Hello *world!"           ds"         Hello world!
    [123+4*56]/2              cs])        (123+456)/2
    "Look ma, I'm *HTML!"     cs"<q>      <q>Look ma, I'm HTML!</q>
    if *x>3 {                 ysW(        if ( x>3 ) {
  commands
    | delete surroundings | ds  |
    | change surroundings | cs  |
    | you sorround        | ys  |
    | you surround line   | yss |
    | visual surround     | S   |
  grammar
    command + object + paranthesis
    cs 5w ])

### Table Mode - Table Generator

  https://github.com/dhruvasagar/vim-table-mode
  start using
    :TableModeToggle
      ütm
  table mode
    enter first line
      | col1 | col2 |
    second line
      ||
    body lines
      | content 1 |
    last line
      ||
  convert existing content into a table
    :Tableize
      ütt
    default separator: ,
      g:table_mode_tableize_map
    :Tableize/;
      separator: ;
      üT
        take input from cmd line
  examples
    | col 1 | col 2  |
    |-------|--------|
    | pg1   | pg 2   |
    | cl15  | cl35_a |
    |-------|--------|

### transpose

  TransposeTab
  :Transpose (for character array transposition),
  :TransposeWords (for word array transposition),
  :TransposeTab (for tab-separated table transposition),
  :TransposeCSV (for general delimited text transposition), and
  :TransposeInteractive (for custom transposition).

### ctrlp
  CtrlPClearCache
    refresh indexes 

### netrw - vinegar - file explorer
  shortcuts
    I   help
    i   file information
    -   open explorer
    enter     open file
    o         open horizontal split
    v         open vertical split
    .         prepopulate command line
    !         prepop with bang
    cg cl     add to cd lcd
    :Ntree    change path
    a         switch appearance of files
    d         new dir
    %         new file
    file copying
      mt      mark target dir
      mf      mark files
      mc      copy files
  bookmarking a directory
    mb        mark bookmark
    {cnt}gb   go back to bookmarked dir
    mB        delete bookmark

### vim-markdown
  ]] go to next header
    [[ [] ][ ]c ]u
  gx open link
  :HeaderDecrease
  :TableFormat
  :toc

# Vimscript VimL
  functions
    return value
      return "value"
    use returned value
      let refid = CopyRefId()
  put/write value of some variable into current edit file
    :put =TodayDate
    <C-R>=
    :h <C-R>
  escaping quotes in backslashes
    let id = substitute(line, 'id=\w*', '15', '')
    let id = substitute(line, "id=\\w*", "15", '')
  conversion of String into Number
    let id = line + 0
  sprintf
    let new_id = printf("%05d", id)
  List creation
    let line2 = [new_id, 3]
  file read/write
    let global_refid = '/Users/mertnuhoglu/.vim/.global_refid'
    let line = readfile(global_refid, 1)[0]
    let id = line + 1
    echo id
    let new_id = printf("%05d", id)
    let line2 = [new_id]
    call writefile(line2, global_refid, '')
  arguments
    function DisplayName(name)
      echom a:name
    endfunction
    call DisplayName("Your Name")
  escaping quotes inside quotes
    let @s = 'ma/]mb''awye0j''bkI*nj'
  select word under cursor
    let wordUnderCursor = expand("<cword>")
  overwrite/override existing mappings
    nunmap <F4>
    nnoremap <F4> :Unite outline<CR>
  storing macros
    alt
      use normal commands instead of macro
        normal zM
        /92-TEMPOR
        "let c = 'zM/92-TEMPO'
  map multiple commands to a key
    http://stackoverflow.com/questions/23204110/mapping-one-key-to-multiple-commands-in-vim
    you must escape the bar or use <bar> instead:
    :nnoremap <C-S-F6> :w \| !pdflatex %:t<CR>
    :nnoremap <C-S-F6> :w <bar> !pdflatex %:t<CR>
    nnoremap zn :Sotl<cr> \| :norm! zMzr<cr>
  run shell command
    http://stackoverflow.com/questions/17459104/how-to-execute-an-external-command-in-vim-script
    using system(..)
      call system('chmod +x ' . shellescape(fname))
      help system
    using ! - interactive
      ! echo 'Hello, World\!'
      help :!
  prompt user input
    code
      call inputsave()
      let name = input('Enter name: ')
      call inputrestore()
      let date = strftime("%Y%m%d")
      let filename = 'review_' . name . '_' . date . '.md'
      call setline('.', filename)
    doc
      ask for user input
      setline: put it into current line
  get visually selected lines
    let lines = s:get_visual_selection()
    in infoman
  substitute a string / regex
    let path = substitute(path, "/Users/mertnuhoglu", "\/\\~", "")
  bufdo: update all buffers
    bufdo %s/ / /ge | update
  regex: double \\ instead of \
  range
    command! -range=% RT <line1>,<line2>call RT()
    fun! RT() range
       exe a:firstline.",".a:lastline."v/./d"
    endfun
      :'<,'>RT
      :RT
        current line
    varsayılan range:
      command -range=% 
    :h command-range
  passing argument to commands
    -nargs=1
    <f-args>
    command! -nargs=1 MyCommand call s:MyFunc(<f-args>)
      take one argument (nargs=1)
  resource
    http://ricostacruz.com/cheatsheets/vimscript.html
  getting a line into a variable
    let line=getline('.')
    exe 'let words='.line
  getting file path
    help filename-modifiers
    expand("%:p:h")
      full path of directory of current file
    expand("%:p")
      full path of current file
    let file_name = expand('%:t:r')
      get file name
    cd %:p:h

# xpath

  search without namespace prefix
    xpath = "//us-gaap:SeniorNotes"
    ===
    xpath = "//*[local-name()='SeniorNotes']"

# Webfaction

## git on webfaction
  http://docs.webfaction.com/software/git.html
  creating new repository
    ssh into wf
    cd ~/webapps/gitw/repos
    git init --bare __repo__.git
    cd __repo__.git
    git config http.receivepack true
  cloning repository on local
    git clone http://mertnuhoglu@git.mertnuhoglu.com/__repo__.git
    cd __repo__
    git config http.postBuffer 524288000
  cloning repo on webfaction
    git clone ~/webapps/gitw/repos/evammoa.git

# Youtrack

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

# Youtube

  trimming a video
    video manager > enhancements > trim

# yuml
  http://yuml.me/diagram/scruffy/class/samples
  class
    [User]
  simple association
    [Customer]->[BillingAddress]
  Cardinality
    [Customer]1-0..*[Address]
  Multiple Roles in Association
    [Order]-billing >[Address], [Order]-shipping >[Address]
  Notes
    [Customer]-[note: Aggregate Root{bg:cornsilk}]
  Inheritance
    [Wages]^-[Salaried]
  Dependency
    [HttpContext]uses -.->[Response]
  Stereotypes
    [<<Stereo>>;X]
  Class attributes
    [User|+name;age|+login()]
  Note on diagram
    [note: Sticky note],..

# My scripts

  acksed -n "match" "replace"

# _videoproduction _me

process of video production
  write the text
  prepare the presentation
    write the presenter notes
    export the pdf 
      output: beamer_presentation
      rmarkdown::render("index.Rmd")
    split pdf into jpg pages
      convert -quality 100 -density 300x300 -resize 1280x720 index.pdf slide%03d.jpg
      mogrify -quality 100 -density 300x300 -resize 1280x720\! *.jpg 
  record the audio
    export them to mp3
  join audios of each slide
    prepare list_audio_files.in
    run join_slide_audio_files()
  rename slides (optional if slide001.jpg vs. slide005.mp3)
    rename_audio_files()
  build video slideshow from image + audio
    run audio_join_slide_files.sh
  join slide videos
    run concat_video_slides.sh
  performance metrics
    writing 800 words / h
    audio recording 2000 w/h
    labeling/indexing paragraphs  10000 w/h
    in general:
      1 min video = 25 min work
        17 min: text writing
        4 min: audio recording
        4 min: other
tools/ideas to try
    http://www.buildingwidgets.com/blog/2015/9/5/week-35-gifrecorder
      gif recorder from text


