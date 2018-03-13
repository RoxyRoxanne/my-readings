
_ id=r_lastid ccd_0009

## stuff

    abstraction
      http://www.sandimetz.com/blog/2016/1/20/the-wrong-abstraction
        duplication is far cheaper than the wrong abstraction
    shaape
      examples
        - "inner[12]": {fill:[[0.3, 0.6, 0.6], flat], frame:[[0, 0, 0], dashed, 1], text:[[0, 0, 0,]]}
          fill: flat
            no gradient
          inner[12]
            matches: inner1, inner2
        - ".*": ...
          matches: all objects
      keys
        fill
          polygon, arrow, line
        frame
          polygon frame or arrow
        text
        fill attributes
          shadow / no-shadow
            - ".*": {fill: [no-shadow]}
          solid / dashed / dotted / dash-dotted
            line styles
            - "_line_" : ...
              all lines
          color definitions:
            red / green / blue
            [0.5, 0.5, 0.5]
            multiple:
              [red, [0, 1, 0]]
          width of line (single number)
            fill: [3.5]
        frame attributes
          solid / ...
          color definitions
          width
        text attributes
          font family
            in pygtk format
              http://www.pygtk.org/docs/pygtk/class-pangofontdescription.html#constructor-pangofontdescription
            {text : ["Courier italic 9", red, shadow]}
    run h2 terminal client
      <url:file:///usr/local/Cellar/h2/1.4.190/libexec/bin>
      java -cp h2*.jar org.h2.tools.RunScript -url jdbc:h2:~/test -script test.sql
      java -cp /usr/local/Cellar/h2/1.4.190/libexec/bin/h2*.jar org.h2.tools.Shell 
      RUNSCRIPT FROM 'test.sql'

## chrome
    
    shortcuts
      #!i   developer tools
    monitor events
      https://developers.google.com/web/tools/chrome-devtools/debug/command-line/events?hl=en
      view even listeners
        getEventListeners(document)
        registered on dom elements
          <url:file:///.select dom > event listeners>

## cloud

    aws # aws # amazon
      s3 # s3
        http://www.hongkiat.com/blog/amazon-s3-the-beginners-guide/
          using amazon s3
            bucket = root folder
        https://paulstamatiou.com/how-i-use-amazon-s3/
        https://paulstamatiou.com/2007/07/29/how-to-bulletproof-server-backups-with-amazon-s3
          why
            automate backup process
      AWS S3 User Guide
        Objects
          Operations on Objects
            Uploading Objects
              Uploading Objects Using Pre-Signed URLs
                http://docs.aws.amazon.com/AmazonS3/latest/dev/PresignedUrlUploadObject.html
                All objects and buckets by default are private. 
                The pre-signed URLs are useful 
                  if you want your user/customer to be able to upload a specific object to your bucket, 
                  but you don't require them to have AWS security credentials or permissions
      aws lambda
        AWS.Lambda.A.Guide.to.Serverless.Microservices.B016JOMAEE.epub
      Amazon Web Services in Action
        Part 2: Building virtual infrastructure with servers and networking
          ch03: Using virtual servers: EC2
            3.1 Exploring a virtual server
              physical server: host server
              virtual servers running on it: guests
              hypervisor: software that isolates guests from each other
              3.1.1 Launching a virtual server
                ec2 > Launch Instance
                  selecting an OS:
                    preinstalled software for virtual server: Amazon Machine Image (AMI)
                virtual appliances: imagge containing an OS and preconfigured software
                  AMI doesn't include kernel of the OS
                  kernel is loaded from Amazon Kernel Image (AKI)
                  hypervisor on aws: Xen
                  Hardware Virtual Machine (HVM): virtual servers that use hardware-assisted virtualization
                  make sure you use HVM images
                Choosing Size
                  ex: t2.micro
                    t: instance family
                      small virtual servers
                    2: generation
                    micro: size
                Instance Details
                  options
                    IAM role
                    Shutdown behavior
                    Enable termination protection
                    Monitoring: Enable CloudWatch
                    Storage
                    Tags
                Reviewing your Input
              3.1.2 Connecting to a virtual server
                ssh -i <path_to_key.pem> ubuntu@<public_ip>
            3.2 Monitoring and debugging a virtual server
              3.2.1 Showing logs
                ec2 console > instances > .select server > Actions > Instance Settings > Get System Log
              3.2.2 Monitoring the load
                ec2 console > instances > .select server > Monitoring > Network In
            3.3 Shutting down
              actions:
                start
                stop: not billed. can be started
                reboot: no data lost. restarts
                terminate: deletes it. deletes dependencies like network-attached storage too
            3.4 Changing the size
              it is possible to change the size
              start a new server
                ec2 console > Launch Instance > .select server > .choose instance type > Launch
                # get cpu info
                cat /proc/cpuinfo
                # get memory info
                free -m
              stop server
                ec2 console > instances > .select instance > Instance State > Stop
              change instance type
                Instance Settings > Actions > .select instance type > Apply
            3.5 Starting a virtual server in another data center
            3.6 Allocating a public IP address
              ec2 console > Elastic IPs > Allocate New Address
            3.7 Adding an additional network interface
              why:
                to assign two different public IP addresses
                then you can serve two different websites depending on the public IP address
            3.8 Optimizing costs
              On-demandn
              Reserved
              Spot
              3.8.1 Reserve virtual servers
              3.8.2 Bidding on unused virtual servers: spot instances
          ch04: Programming your infrastructure
            intro
            4.1 Infrastructure as code
              4.1.1 Automation and the DevOps movement
              4.1.2 Infrastructure language: JIML (JSON Infrastructure Markup Language)
                ex:
                  {
                    infrastructure: {
                    loadbalancer: {
                      server: {...}
                      }
                    , cdn: {...}
                    , database: {...}
                    }
                  }
                $ indicates a reference to an ID
                ex:
                  {
                    "region": "us-east-1",
                    "resources": [
                      {
                        "type": "loadbalancer",
                        "id": "LB",
                        "config": {
                          "server": {
                            "cpu": 2,
                            "ram": 4,
                            "os": "ubuntu",
                            "waitFor": "$DB"
                            },
                          "servers": 2
                        }
                      }
                      , {
                        "type": "cdn",
                        "id": "CDN",
                        "config": {
                          "defaultSource": "$LB",
                          "sources": [{
                            "path": "/static/*",
                            "source": "$BUCKET"
                            }]
                          } 
                        }
                      , {
                        "type": "database",
                        "id": "DB",
                        "config": {
                          "password": "***",
                          "engine": "MySQL"
                          }
                        }
                      , {
                        "type": "dns",
                        "config": {
                          "from": "www.mydomain.com",
                          "to": "$CDN"
                          }
                        }
                      , {
                        "type": "bucket",
                        "id": "BUCKET"
                      }
                    ] 
                  }
                how to turn this JSON to API calls?
                  build dependency graph
                    from bottom to top
                      nodes with no children: DB and bucket
                      they have no dependencies
                    server nodes depend on DB node
                  build linear flow of commands
            4.2 Using CLI
              4.2.1 Installing CLI
                sudo pip install awscli
              4.2.2 Configuring CLI
                don't use aws root account
                create a new user in IAM service
                get aws access key id and secret access key
                cli
                  aws configure
              4.2.3 Using CLI
                ex: get a list of ec2 instances of type t2.micro
                  $ aws ec2 describe-instances --filters "Name=instance-type,Values=t2.micro"
                general template:
                  $ aws <service> <action> [--key value ...]
                aws help
                aws <service> help
                aws <service> <action> help
                ex: server.sh
                  aws ec2 describe-images --filters "Name=description, Values=Amazon Linux AMI 2015.03.? x86_64 HVM GP2" --query "Images[0].ImageId" --output text
                note: --query option uses JMESPath
                  ex
                    {
                      "Images": [
                          {
                            "ImageId": "ami-146e2a7c",
                            "State": "available"
                      }, {
                            "State": "available"
                          }
                      ] 
                    }
                  ex:
                    Images[0].ImageId
                    Images[*].State
            4.4 Using a blueprint
              AWS CloudFormation: better than JIML
                based on templates = blueprint
              4.4.1 Anatomy of CloudFormation template
                5 parts:
                  1. Format version
                  2. Description
                  3. Parameters
                  4. Resources
                  5. Outputs
                Output
                  ex: references "Server"
                    "Outputs": {
                      "ServerEC2ID": {
                        "Value": {"Ref": "Server"},
                        "Description": "EC2 ID of the server"
                      },
                      "PublicName": {
                        "Value": {"Fn::GetAtt": ["Server", "PublicDnsName"]},
                        "Description": "Public name of the server"
                      } 
                    }
              4.4.2 Creating your first template                                  
                ex: case: provide a virtual server
                  server needs more cpu
                  CloudFormation: change InstanceType property
                  code
                    ref
                      <url:file:///~/codes/aws/aws_in_action/chapter4/server.json>
                    ...
                    "InstanceType": {
                      "Description": "Select one of the possible instance types",
                      "Type": "String",
                      "Default": "t2.micro",
                      "AllowedValues": ["t2.micro", "t2.small", "t2.medium"]
                    }
                  stack = instance
                  template = class
            next
              Finding a Linux AMI <url:#r=ccd_0008>
          ch05: Automating deployment
            5.1 Deploying applications in a flexible cloud environment
            5.2 Running a script on server startup using CloudFormation
            5.3 Deploying with Elastic Beanstalk
              intro
                to deploy common web apps
                based on php, java, py, docker ...
              5.3.1 Components of Elastic Beanstalk
                application: logical container
                version: first upload executables to S3
                configuration template: default configuration
                environment: 
              5.3.2 Using Elastic Beanstalk for Etherpad
                create an application
                  aws elasticbeanstalk create-application --aplication-name etherpad
                create a version
                  aws elasticbeanstalk create-application-version --application-name etherpad ---version-label 1.5.2 --source-bundle S3Bucket=awsinaction,S3Key=chapter5/etherpad.zip
                create an environment
                  # create an environment for nodejs basen on AMI
                  # use a solution stack name
                  aws elasticbeanstalk ...
            5.4 Deploying a multilayer application with OpsWorks
              complex applications consisting of different services (layers)
                then use OpsWorks not Elastic Beanstalk
              OwsWorks controls AWS resources like
                virtual servers, load balancers, databases
              Chef: deployment controller
                community recipes:
                  https://supermarket.chef.io/
              5.4.1 Components of OpsWorks
                /Users/mertnuhoglu/Dropbox/public/img/ss-254.png
                elements
                  stack: container for all other components 
                  layer: belongs to a stack
                    represents an application/service
                  instance: represents virtual server
                    multiple instances per layer
                  app: software to deploy
              5.4.2 Using OpsWorks to deploy IRC chat app
                steps
                  1. create a stack
                  2. create a nodejs layer for kiwiIRC
                  3. create a custom layer for IRC server
                  4. create an app to deploy kiwiIRC to nodejs layer
                  5. add an instance for each layer
            5.5 Comparing deployment tools
              intro
                we deployed in three ways in this chapter:
                  1. AWS CloudFormation: to run a script on server startup
                  2. AWS Elastic Beanstalk: to deploy a common web app
                  3. AWS OpsWorks: to deploy a multilayer application
                differences between these solutions
              5.5.1 Classifying the deployment tools
                more control: CloudFormation
                OpsWorks
                more conventions: Elastic Beanstalk
              5.5.2 Comparing deployment services
          ch06: Securing your system
            intro
              4 critical steps:
                1. installing software updates
                2. restricting access to your AWS account
                3. controlling network traffic to and from ec2 instances
                4. creating a private network in AWS
            6.1 Who's responsible for security?
            6.2 Keeping your software up to date
              6.2.1 Checking for security updates
                when logging in, linux warns you:
                  4 package(s) needed for security, out of 28 available
                  Run "sudo yum update" to apply all updates
                which packages require a security update
                  yum --security check-update 
              6.2.2 Installing security updates on server startup
                when using CloudFormation
                  opt 
                    install all updates on server start
                      $ yum -y update
                      # put in user-data script
                    install security updates on server start
                      $ yum -y --security update
                      # put in user-data script
                    define package versions explicitly
                  ex: user-data script
                    "Server": {
                      "Type": "AWS::EC*::Instacnce",
                        "Properties": {
                          ...
                            "UserData": {"Fn::Base64": {"Fn::Join": ["", [
                              "#!/bin/bash -ex\n",
                              "yum -y update\n"
                            ]]}}
                        }
                    }
                problem with installing all updates:
                  system becomes unpredictable
              6.2.3 Installing security updates on running servers
                run on all servers automatically
                  <url:file:///~/codes/aws/aws_in_action/chapter6/update.sh>
                    PUBLICNAMES=$(aws ec2 describe-instances --filters "Name=instance-state-name,Values=running" --query "Reservations[].Instances[].PublicDnsName" --output text)
                    for PUBLICNAME in $PUBLICNAMES; do
                      ssh -t -o StrictHostKeyChecking=no ec2-user@$PUBLICNAME "sudo yum -y --security update"
            6.3 Securing your AWS account
              authenticating with your account
                3 ways:
                  1. root user
                  2. normal user
                  3. authenticating as an aws resource like an ec2 instance
                for users
                  need password or access keys
              6.3.1 Securing root user
                console > .click your name > security credentials > install mfa app > expand mfa > activate mfa
              6.3.2 Identity and Access Management service (IAM)
                every request to aws api goes through IAM
                  IAM checks who (authentication) can do what (authorization)
                authentication: defined by users and roles
                authorization: defined by policies
              6.3.3 Policies for authorization
                defined in json
                contains some statements
                  allow/deny some action on some resource
                list of actions
                  http://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_Operations.html
                ex: a statement
                  {
                    "Version": "2012-10-17",
                     "Statement": [{
                      "Sid": "1",
                      "Effect": "Allow",
                       "Action": ["ec2:*"],
                       "Resource": ["*"]
                     }]
                  }
                Deny overrides Allow
                ex: allows all actions except terminating instances
                  {
                    "Version": "2012-10-17",
                     "Statement": [{
                      "Sid": "1",
                      "Effect": "Allow",
                       "Action": ["ec2:*"],
                       "Resource": ["*"]
                     }, {
                        "Sid": "2",
                        "Effect": "Deny",
                        "Action": ["ec2:TerminateInstances"],
                        "Resource": ["*"]
                    }]
                  }
      aws ec2 User Guide id=g_10165
        aws ec2 User Guide <url:file:///~/Dropbox/mynotes/content/code/ccode.md#r=g_10165>
        http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/RootDeviceStorage.html?shortFooter=true
        What is EC2
          Amazon EC2 Root Device Volume
            root device volume: image used to boot the instance
            AMIs backed by either
              a template ec2 from instance store
              a EBS snapshot (recommended) 
                they use persistent storage
            Root Device Storage Concepts
              description of AMI includes either:
                ebs
                instance store
              Instance Store-backed Instances
                when instance terminated, all data is deleted
                no Stop action
              EBS-backed Instances
                root volume is an EBS volume
                can be restarted without affecting data in attached volumes
                when stopped, you can do:
                  modify properties of the instance
                  change size of instance
                  update kernel
                  attach root volume to a different instance
                if ebs-backed instance fails:
                  stop and start agagin
                  snapshot all volumes to create a new AMI
                  attach volume to new instance:
                    1. create snapshot of root volume
                    register new AMI using snapshot
        Setting Up
          1. Sign Up AWS
          2. Create IAM User
          3. Create a Key Pair
            check regions
              http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html?shortFooter=true
              us-east-2
              US East (Ohio)
            dashboard > ec2 > navigation pane > .select region: us-east-2 (Ohio)
            navigation pane > network & security > Key Pairs
              .Key Pair Name = mertnuhoglu-key-pair-useast2
              download and save pem file
              chmod 400 mertnuhoglu-key-pair-useast2.pem
          4. Create a Virtual Private Cloud (VPC)
            check if VPC is supported:
              ec2 > Account Attributes > Supported: VPC
          5. Create a Security Group
            allow ssh access from specific ip addresses
            ec2 > navigation pane > Security Groups > Create Security Group
              name: mertnuhoglu_sg_useast2
              type: http | source: anywhere
              type: https | source: anywhere
              type: ssh | source: anywhere
        Getting Started
          1. Launch an Instance
            ec2 dashboard > Launch Instance AMI (Amazon Machine Image)
              Choose an Instance Type
        Best Practices
          Storage
            ensure volume with data persists after instance termination
              Preserving Amazon EBS Volumes on Instance Termination <url:#r=ccd_0005>
        Tutorials
        Amazon Machine Images
          Finding a Linux AMI id=ccd_0008
            Finding a Linux AMI <url:#r=ccd_0008>
            http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/finding-an-ami.html
            Using EC2 Console
              ec2 console > navigation bar > .region
              sidebar > AMIs > .Filter options = Public images
              .select image > Launch Instance
            Using CLI
              ex: public AMIS owned by you or Amazon
                $ aws ec2 describe-images --owners self amazon
              ex: only AMIs backed by EBS
                $ aws ec2 describe-images --owners self amazon --filters "Name=root-device-type,Values=ebs"
        Instances
          Instance Purchasing Options
            Spot Instances
              How Spot Fleet Works id=ccd_0007
                How Spot Fleet Works <url:#r=ccd_0007>
                http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-fleet.html?shortFooter=true
                intro
                  Spot Fleet is
                    a collection of spot instances
                    tries to meet target capacity you request
                Allocation Strategy
                  strategies
                    lowestPrice: default strategy
                    diversified: distributed across pools
              Spot Instance Requests
                Spot Instance Request States
                  open active failed closed cancelled
                  types of requests:
                    one-time
                    persistent
                  one-time request life: open -> active -> closed
                  persistent request life: open -> active -> open -> active ...
                Specifying a duration
                  amazon doesn't terminade instances with specified durations
                  price is fixed and remanis in effect until instance terminates
                  cli
                    aws ec2 request-spot-instances --spot-price "0.050" --instance-count 5 --block-duration-minutes 120 --type "one-time" --launch-specification file://specification.json
                Specifying a Tenancy
                  ref
                    Dedicated Instances <url:#r=ccd_0006>
                  for dedicated instances
                Service-Linked Role
                Creating request
                  console
                    ec2 > Spot Requests > Request Spot Instances
                    .Request type: Request
                  cli
                    # one-time
                    aws ec2 request-spot-instances --spot-price "0.05" --instance-count 5 --type "one-time" --launch-specification file://specification.json
                    # persistent
                    aws ec2 request-spot-instances --spot-price "0.05" --instance-count 5 --type "persistent" --launch-specification file://specification.json
              Spot Fleet Requests
                http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-fleet-requests.html?shortFooter=true#create-spot-fleet
                ref
                  How Spot Fleet Works <url:#r=ccd_0007>
                intro
                  amazon tries to maintain your fleet's target capacity
            Dedicated Instances id=ccd_0006
              Dedicated Instances <url:#r=ccd_0006>
              http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-instance.html
              physically isolated from other aws accounts
          Instance Lifecycle
            Terminate
              https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/terminating-instances.html#preserving-volumes-on-termination
              intro
                deleting instance = terminating instance
                  state: shutting-down or terminated
                  no further charges incur
                you can't restart terminated instances
        Storage
          Amazon EBS (Elastic Block Store)
            http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html
            intro
              storage volumes for use with ec2 instances
              ebs volumes persist independently from instance
        Preserving Amazon EBS Volumes on Instance Termination id=ccd_0005
          Preserving Amazon EBS Volumes on Instance Termination <url:#r=ccd_0005>
      ec2 spot prices
        awespottr: find cheapest ec2 spot prices
          https://github.com/arithmetric/awespottr
          npm install -g awespottr
          awespottr -h
          awespottr c4.xlarge
        price history
          https://www.reddit.com/r/aws/comments/4ue6il/how_to_bid_for_cheapest_spot_instances_all/
          aws ec2 describe-spot-price-history --product-description "Linux/UNIX" --instance-types c4.xlarge --start-time `date -u --date="7 days ago" +'%Y-%m-%dT%H:%M:00'` | jq -r -c '.SpotPriceHistory[] | (.Timestamp),(.SpotPrice)'
          aws ec2 describe-spot-price-history --product-description "Linux/UNIX" --instance-types c4.xlarge --start-time `date -u --date="7 days ago" +'%Y-%m-%dT%H:%M:00'` | jq -r -c '.SpotPriceHistory[]'
          by region / availability zone
            export AWS_DEFAULT_REGION=us-east-2
            aws ec2 describe-spot-price-history --availability-zone "${AWS_DEFAULT_REGION}b" --product-description "Linux/UNIX" --instance-types c4.xlarge --start-time `date -u --date="7 days ago" +'%Y-%m-%dT%H:%M:00'` | jq -r -c '.SpotPriceHistory[] | (.Timestamp),(.SpotPrice)'
            # note if you don't specify region, then it only list prices for default region
      aws cli
        ref
          http://localhost:8888/notebooks/aws%20study.ipynb
        configure
          aws configure list
        multiple profiles
        environment variables
          override configuration
          used for temporarily
          ex
            AWS_DEFAULT_REGION
            export AWS_DEFAULT_REGION=us-west-2
        list ebs volumes
          aws ec2 describe-volumes
      IAM (Identity and Access Management) User Guide
        ref
          http://localhost:8888/notebooks/study_aws.ipynb
        what is iam?
          to control
            who can use aws (authentication)
            how they can use resources (authorization)
        Getting Setup
          create administrators group
            http://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html?shortFooter=true
          create a user and group
          signin page
            https://iterative.signin.aws.amazon.com/console
        Identities
          Users
            Multi-Factor Authentication
              Using Multi-Factor Authentication (MFA) in AWS
                http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html
                intro
                  two ways
                    security token based
                      you need to enable a device for MFA
                    sms based (not valid anymore)
                      not for root user
                      only for IAM users
              Enabling a Virtual Multi-factor Authentication (MFA) Device
                http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html?shortFooter=true
                note: you save a copy of the QR code or the secret key in a secure place.
                  if you lose the phone, you can reconfigure the app using same virtual MFA
                Enable a Virtual MFA Device for an IAM User
                Enable and manage virtual MFA devices (AWS CLI)
                  http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_cliapi.html?shortFooter=true
                  you must use AWS Console to manage for root user
      articles
        Backing up and restoring snapshots on Amazon EC2 machines id=ccd_0009
          Backing up and restoring snapshots on Amazon EC2 machines <url:#r=ccd_0009>
          https://www.techrepublic.com/blog/the-enterprise-cloud/backing-up-and-restoring-snapshots-on-amazon-ec2-machines/
          create a snapshot
            1. ec2 console > instances > .select instance
            2. > root device
            3. Elastic Blockstore > Snapshots > Create Snapshot
        Tricks to make an AWS spot instance “persistent”?
          https://stackoverflow.com/questions/19575348/tricks-to-make-an-aws-spot-instance-persistent
          ans
            ans2
              1. create a new spot request
                uncheck "Delete on Termination" for root device
              2. ssh into instance
                make a file
              3. create a snapshot
                Backing up and restoring snapshots on Amazon EC2 machines <url:#r=ccd_0009>
              4. exit ssh and terminate instance
              5. create AMI from snapshot
                new spot request using new image
                  Virtualization: hvm
                uncheck "Delete on Termination" for root
                expand: "Advanced Options" > set kernel ID
          steps
            ebs volume
              vol-03058883d903bf9ed
            next
              snapshot nedir
              kernel id vs. opsiyonları incele
              persistence konularını arat
        AWS Tips I Wish I'd Known Before I Started
          https://wblinks.com/notes/aws-tips-i-wish-id-known-before-i-started/
          intro
            paradigm shift: from pheysical servers to cloud
              physical: you care about each host
          Application Development
            Store no application state on your servers
              ex: sessions stored in database not on local filesystem
              ex: logs handled via syslog and sent to remote store
              ex: uploads go directly to S3
                tip: use pre-signed URLs to let users upload directly to S3
                  http://docs.aws.amazon.com/AmazonS3/latest/dev/PresignedUrlUploadObject.html
              ex: long running tasks done via an async queue (SQS)
            Store extra information in your logs
              extra: instance-id, region, availability-zone, environment
              get data from: instance metadata service
            If you need to interact with AWS, use the SDK for your langauge.
            Have tools to view application logs.
              minimal tool set: admin tool, syslog viewer, centralised logging
          most important: disable ssh
          Operations
            Disable ssh access to all servers
              If you have to SSH into your servers, then your automation has failed
              this forces you to paradigm shift
                highlihts any areas you need to automate
            Servers are ephemeral, you don't care about them. You only care about the service as a whole.
              if a server dies
                no concern to you
                because auto-scaling gives you a fresh new instance soon
              ex: netflix: Chaos Monkey
                kills random instances in production
            Don't give servers static/elastic IPs.
              for auto-scaling: use load balancer instead of unique IPs per instance
            Automate everything
              ex: recovery, deployment, failover etc.
            Everyone gets an IAM account. Never login to the master
              ex: extreme case
                some users who give the MFA token to two people, and the password to two others, so to perform any action on the master account, two of the users need to agree
            Get your alerts to become notifications
              your health checks should automatically destroy bad instances and spawn new ones
                if everything is automated
          Billing 
            Set up granular billing alerts
          Security
            Use EC2 roles, do not give applications an IAM account
            Assign permissions to groups, not users
            Set up automated security auditing
            Use CloudTrail to keep an audit log
          S3
            Use "-" instead of "." in bucket names for SSL
            Avoid filesystem mounts (FUSE, etc).
            You don't have to use CloudFront in front of S3 (but it can help)
              S3 can scale to any capacity
              for very high bandwidth: use CDN like CloudFront in front of S3
                CloudFront can dramatically speed up access for users around the globe, as it copies your content to edge locations
            Use random strings at the start of your keys
          EC2/VPC
            Use tags!
              good for organising things, easier to search and group things up
              to trigger specific actions:
                ex: env=debug
                  can put your app into debug mode when it deploys
            Use termination protection for non-auto-scaling instances. Thank me later
              one-off things that aren't under auto-scaling, then you should probably enable termination protection, to stop anyone from accidentally deleting the instance
            Use a VPC
              easy to set up
              uses
                control traffic at network level using ACLs
                modify instance size, security groups etc. without terminating instance
                private subnet where instances are isolated from outside
            Use reserved instances to save big $$$
            Lock down your security groups
              Don't use 0.0.0.0/0 
            Don't keep unassociated Elastic IPs
          ELB
            Terminate SSL on the load balancer
            Pre-warm your ELBs if you're expecting heavy traffic
          ElastiCache
            Use the configuration endpoints, instead of individual node endpoints
          CloudWatch
            Use the CLI tools
            Use the free metrics
            Use custom metrics
            Use detailed monitoring
          Auto-Scaling
          IAM
            Use IAM roles
            Users can have multiple API keys
            Multi-factor authentication
          Route53
            Use ALIAS records
              free
          Misc
            Scale horizontally
              using lots of smaller machines is more reliable
          hn discussion
            https://news.ycombinator.com/item?id=7172060
        quora
          What is the most difficult part of setting up an AWS cloud infrastructure? Do you find cloud formation to be very complicated to use?
            www.quora.com/What-is-the-most-difficult-part-of-setting-up-an-AWS-cloud-infrastructure-Do-you-find-cloud-formation-to-be-very-complicated-to-use
            ans
              cloudformation is complex
              recommend using:
                editor that understands json
                json validators
                aws cloudformation validate-template
              CloudFormer
                create infrastructure through console/cli
                run cloudformer
                it creates cf template

## databases

    shard
      horizontal partition of data
      each shard is held on a separate database server instance

      
## git

    git pull vs git fetch
      https://stackoverflow.com/questions/292357/what-is-the-difference-between-git-pull-and-git-fetch#292359
      git pull = git fetch + git merge
      git fetch never changes working copy
    different config files in branches
      https://stackoverflow.com/questions/24498844/using-conditional-configuration-files-with-git/24498888#24498888
      git attributes
        https://git-scm.com/book/en/v2/Customizing-Git-Git-Attributes#_merge_strategies
          path specific settings: git attributes
            set in 
              .gitattributes: per directory
              .git/info/attributes: project wise
          uses:
            handling binary files differently
            merge strategies
          merge strategies: different config files for different branches
            .gitattributes
              database.xml merge=ours
            git config --global merge.ours.driver true
            git merge topic
    change submodule after fork
      https://stackoverflow.com/questions/11637175/swap-git-submodule-with-own-fork
      .gitmodules:
      $ cat .gitmodules
      [submodule "ext/google-maps"]
          path = ext/google-maps
          url = git://git.naquadah.org/google-maps.git
      edit the url with a text editor, you need to run the following:
      $ git submodule sync
    git repo inside git repo: submodules
      https://git-scm.com/book/en/v2/Git-Tools-Submodules
      Submodules
        you need another project within some project
        two procejts well be separate
      adding
        # adds existing repo as a submodule of working repo
        git submodule add https://github.com/chaconinc/DbConnector
        # added into directory named same as repo: "DbConnector"
          different path:
            git submodule add https://github.com/chaconinc/DbConnector <new_folder>
      ex:
        # cd to directory where subrepo will be installed
        cd themes
        git submodule add https://github.com/spf13/herring-cove 
        $ cat ../.gitmodules
        [submodule "themes/herring-cove"]
          path = themes/herring-cove
          url = https://github.com/spf13/herring-cove
      cloning
        opt1
          git clone x
          git submodule init
          git submodule update
        opt2
          git clone --recursive x
    
## haskell
    
    tutorials
      Haskell to javascript
        https://lettier.github.io/posts/2016-07-04-haskell-to-javascript.html
        tek tek satır satır anlatıyor
    tools
      build tool: haskell stack
        https://github.com/commercialhaskell/stack
    articles/videos
      Haskell Sucks
        if you can avoid avoid it 
        monad difficult to teach
        lazy vs. 
      Haskell Monads in 8 Minutes

## latex

    ref
      mathematical symbols: http://oeis.org/wiki/List_of_LaTeX_mathematical_symbols
      detexify: draw and find symbol http://detexify.kirelabs.org/classify.html
    Latex primer
      http://data-blog.udacity.com/posts/2016/10/latex-primer/
      inline and display
        inline: $y=mx+b$
        display: $$y=mx+b$$
      superscript and subscript
        x^2
        x_2
        x_{10}
        _{10}x
      commands
        \sqrt{2\pi}
        \frac{P}{X}
      symbols
        greek letters
          \alpha \beta \gamma
          \Alpha \Gamma
        operators
          \times \pm \cup \oplus \cdot
        trigonometry
          \sin \arctan
        relations
          \leq \geq \approx \neq
        triple dots
          \cdots \ldots \ddots
        various
          \infty \nabla \partial
        derivative del partial
          \partial ∂ \dP
          \nabla ∇ \NB del
      accents
        \hat x
        \widehat{abs}
        \bar x
        \overline{abs}
        \dot x
        \ddot x
        \vec{x}
        \overrightarrow{xy}
      parentheses
        cases
          f(x)= 
          \begin{cases}
              \frac{x^2-x}{x},& \text{if } x\geq 1\\
              0,              & \text{otherwise}
          \end{cases}
        \left \right
          \left( \frac{dx}{dy} \right)
        vertical lines 
          | or \vert or \mid
        angle brackets
          \langle \rangle
        matrix brackets
          \left\lgroup \matrix{a & b\cr c & d} \right\rgroup
        vertical bars
          \|
      typefaces
      summation integral
        \sum
      spaces
        \, \: \;
        \quad \qquad
      escaping characters
        \{ \_ \$ \backslash
      newline
        \\
      aligned equations
        \begin{align}
        a_1 & = b_1 + c_1 \\
        a_2 & = b_2 + c_2 
        \end{align}
      set of real numbers
        \rm I\!R

## jq: json query
    

## security

    MFA (multi-factor authentication)
      mobile apps
        Google Authenticator vs. Authy vs. FreeOTP. What do you guys think?
          https://www.reddit.com/r/privacy/comments/2q01bb/google_authenticator_vs_authy_vs_freeotp_what_do/
          pros and cons
            authy: 
              + has PIN protection 
                needs to enter PIN to use the tool
              + cloud backup
                if you lose mobile phone, you can restore from cloud

## websocket

  use socket.io instead of websocket
  basic example
    run socketio-chat
      <url:file:///~/projects/stuff/js/socketio-chat/>
      run
        node index.js
      index.js
        app.get -> send index.html
        io.on { socket.on { io.emit(msg) } }
      dataflow
        client: form.submit -> socket.emit
        server: socket.on -> io.emit('id')
        broadcasted: socket.on('id') -> html.append


## firebug
  how to audit js events and functions
    http://stackoverflow.com/questions/11097234/using-firefox-how-can-i-monitor-all-javascript-events-that-are-fired
    opt
      firebug > html > events
      firebug > body > right > log > events
        console > enable
        console > persist

# bash

## fd: find replacement

    https://github.com/sharkdp/fd
    ref
      <url:file:///~/projects/study/vim/vim_ex_fzf_fuzzy_file_finder.Rmd> 
    brew install fd
    fd '[0-9]\.jpg$' ~
    fd <pattern>

## fzf: fuzzy file finder

    https://github.com/junegunn/fzf
    brew install fzf
    $(brew --prefix)/opt/fzf/install
    brew reinstall fzf
    ex:
      find * -type f | fzf
      -m    multi-select
        tab: to mark
    search syntax
      abcd    fuzzy match
      ^abc    prefix-exact
      .mp3$   suffix-exact
      'wild   exact-match
      !fire   inverse-exact-match
      !.mp3$
    ex: multiple args
      ^core rb$ | py$
      # start with core
      # ends with rb or py
    man fzf
    shortcuts for cli
      ^t    paste selected lines onto cli
      ^r    paste from history
      !c    cd into selected dir

## global gtags

    https://www.gnu.org/software/global/download.html
    tags for definition, reference, calling etc
    brew install global

## rsync

    rsync manual
      https://linux.die.net/man/1/rsync
      intro
        delta-transfer algorithm
          sends only differences
        finds files that need to be transferred
      Usage
        rsync -t *.c foo:src/
          all files matching pattern *.c
          to machine foo
        rsync -avz <src> <dest>
          recursively transfer

# purescript

    psci multiline mode
    Partial
      The Partial type class
        https://github.com/purescript/purescript/wiki/The-Partial-type-class
        Why have a Partial type class?
          partial functions
            functions which don't handle every possible case of their inputs
        I just want to use a partial function, please

# ruby

## rubymine

  jruby support
    jruby is supported only in intellij ultimate + ruby plugin
  running rspec tests
    https://www.jetbrains.com/ruby/help/using-rspec-in-ruby-projects.html
    Project Structure > .select folder for tests
    <url:file:///.choose directory > run > all rspec tests>
  irb (repl)
    Tools > run irb console
  how to import (require) code in irb
    normal just: 
      require "logstash/event"
    importing a file
      same, but the path should be relative to root

## Ruby in twenty minutes

    https://www.ruby-lang.org/en/documentation/quickstart/

## yield and blocks

    http://stackoverflow.com/questions/3066703/blocks-and-yields-in-ruby
  expl1
    methods may receive code block
      then they invoke block using yield function
    ex
      class Person
        @name
        def do_with_name
          yield( @name )
        end
      end
      person = Person.new("Oscar")
      person.do_with_name do |name|
        puts "hello #{name}"
      end
    ex in R
      f1 = function( fun )
        function( obj )
          print( "hello " %+% fun(obj) )
      do_with_name = function(obj)
        return( obj$name )
      f2 = f1( do_with_name )
      obj = list(name="ali")
      f2(obj)
      ===
      f1(do_with_name)(obj)
    ex2
      do_with_name %>%
        f1 %>%
        list(k

## closures in ruby

    https://innig.net/software/ruby/closures-in-ruby
    blocks like closures
      closed wrt variables defined in the context they were created
      but we can not pass them
        yield only refers to the block passed 
        we cannot hold a block
    summary
      blocks refer to variables from defining context
        def thrice
          yield
        end
        x = 5
        thrice { x += 1}
      {..} and do..end equivalent
        thrice do 
          <url:file:///...>
        end
    text
      # ---------------------------- Section 1: Blocks ----------------------------
       
      # Blocks are like closures, because they can refer to variables from their defining context:
       
      def thrice
        yield
        yield
        yield
      end
       
      x = 5
      puts "value of x before: #{x}"
      thrice { x += 1 }
      puts "value of x after: #{x}"
       
      # A block refers to variables in the context it was defined, not the context in which it is called:
       
      example 2
       
      def thrice_with_local_x
        x = 100
        yield
        yield
        yield
        puts "value of x at end of thrice_with_local_x: #{x}"
      end
       
      x = 5
      thrice_with_local_x { x += 1 }
      puts "value of outer x after: #{x}"
       
      # A block only refers to *existing* variables in the outer context; if they don't exist in the outer, a
      # block won't create them there:
       
      example 3
       
      thrice do # note that {...} and do...end are completely equivalent
        y = 10
        puts "Is y defined inside the block where it is first set?"
        puts "Yes." if defined? y
      end
      puts "Is y defined in the outer context after being set in the block?"
      puts "No!" unless defined? y
       
      # OK, so blocks seem to be like closures: they are closed with respect to variables defined in the context
      # where they were created, regardless of the context in which they're called.
      # 
      # But they're not quite closures as we've been using them, because we have no way to pass them around:
      # "yield" can *only* refer to the block passed to the method it's in.
      #
      # We can pass a block on down the chain, however, using &:
       
      example 4
       
      def six_times(&block)
        thrice(&block)
        thrice(&block)
      end
       
      x = 4
      six_times { x += 10 }
      puts "value of x after: #{x}"
       
      # So do we have closures? Not quite! We can't hold on to a &block and call it later at an arbitrary
      # time; it doesn't work. This, for example, will not compile:
      #
      # def save_block_for_later(&block)
      #     saved = &block
      # end
      #
      # But we *can* pass it around if we use drop the &, and use block.call(...) instead of yield:
       
      example 5
       
      def save_for_later(&b)
        @saved = b  # Note: no ampersand! This turns a block into a closure of sorts.
      end
       
      save_for_later { puts "Hello!" }
      puts "Deferred execution of a block:"
      @saved.call
      @saved.call
       
      # But wait! We can't pass multiple blocks to a function! As it turns out, there can be only zero
      # or one &block_params to a function, and the &param *must* be the last in the list.
      #
      # None of these will compile:
      #
      #    def f(&block1, &block2) ...
      #    def f(&block1, arg_after_block) ...
      #    f { puts "block1" } { puts "block2" }
      #
      # What the heck?
      #
      # I claim this single-block limitation violates the "principle of least surprise." The reasons for
      # it have to do with ease of C implementation, not semantics.
      #
      # So: are we screwed for ever doing anything robust and interesting with closures?
       
       
      # ---------------------------- Section 2: Closure-Like Ruby Constructs ----------------------------
       
      # Actually, no. When we pass a block &param, then refer to that param without the ampersand, that
      # is secretly a synonym for Proc.new(&param):
       
      example 6
       
      def save_for_later(&b)
        @saved = Proc.new(&b) # same as: @saved = b
      end
       
      save_for_later { puts "Hello again!" }
      puts "Deferred execution of a Proc works just the same with Proc.new:"
      @saved.call
       
      # We can define a Proc on the spot, no need for the &param:
       
      example 7
       
      @saved_proc_new = Proc.new { puts "I'm declared on the spot with Proc.new." }
      puts "Deferred execution of a Proc works just the same with ad-hoc Proc.new:"
      @saved_proc_new.call
       
      # Behold! A true closure!
      #
      # But wait, there's more.... Ruby has a whole bunch of things that seem to behave like closures,
      # and can be called with .call:
       
      example 8
       
      @saved_proc_new = Proc.new { puts "I'm declared with Proc.new." }
      @saved_proc = proc { puts "I'm declared with proc." }
      @saved_lambda = lambda { puts "I'm declared with lambda." }
      def some_method 
        puts "I'm declared as a method."
      end
      @method_as_closure = method(:some_method)
       
      puts "Here are four superficially identical forms of deferred execution:"
      @saved_proc_new.call
      @saved_proc.call
      @saved_lambda.call
      @method_as_closure.call
       
      # So in fact, there are no less than seven -- count 'em, SEVEN -- different closure-like constructs in Ruby:
      #
      #      1. block (implicitly passed, called with yield)
      #      2. block (&b  =>  f(&b)  =>  yield)  
      #      3. block (&b  =>  b.call)    
      #      4. Proc.new  
      #      5. proc  
      #      6. lambda    
      #      7. method
      #
      # Though they all look different, some of these are secretly identical, as we'll see shortly.
      #
      # We already know that (1) and (2) are not really closures -- and they are, in fact, exactly the same thing.
      # Numbers 3-7 all seem to be identical. Are they just different syntaxes for identical semantics?
       
      # ---------------------------- Section 3: Closures and Control Flow ----------------------------
       
      # No, they aren't! One of the distinguishing features has to do with what "return" does.
      #
      # Consider first this example of several different closure-like things *without* a return statement.
      # They all behave identically:
       
      example 9
       
      def f(closure)
        puts
        puts "About to call closure"
        result = closure.call
        puts "Closure returned: #{result}"
        "Value from f"
      end
       
      puts "f returned: " + f(Proc.new { "Value from Proc.new" })
      puts "f returned: " + f(proc { "Value from proc" })
      puts "f returned: " + f(lambda { "Value from lambda" })
      def another_method
        "Value from method"
      end
      puts "f returned: " + f(method(:another_method))
       
      # But put in a "return," and all hell breaks loose!
       
      example 10
       
      begin
        f(Proc.new { return "Value from Proc.new" })
      rescue Exception => e
        puts "Failed with #{e.class}: #{e}"
      end
       
      # The call fails because that "return" needs to be inside a function, and a Proc isn't really
      # quite a full-fledged function:
       
      example 11
       
      def g
        result = f(Proc.new { return "Value from Proc.new" })
        puts "f returned: " + result #never executed
        "Value from g"               #never executed
      end
       
      puts "g returned: #{g}"
       
      # Note that the return inside the "Proc.new" didn't just return from the Proc -- it returned
      # all the way out of g, bypassing not only the rest of g but the rest of f as well! It worked
      # almost like an exception.
      #
      # This means that it's not possible to call a Proc containing a "return" when the creating
      # context no longer exists:
       
      example 12
       
      def make_proc_new
        begin
            Proc.new { return "Value from Proc.new" } # this "return" will return from make_proc_new
        ensure
            puts "make_proc_new exited"
        end
      end
       
      begin
        puts make_proc_new.call
      rescue Exception => e
        puts "Failed with #{e.class}: #{e}"
      end
       
      # (Note that this makes it unsafe to pass Procs across threads.)
       
      # A Proc.new, then, is not quite truly closed: it depends on the creating context still existing,
      # because the "return" is tied to that context.
      #
      # Not so for lambda:
       
      example 13
       
      def g
        result = f(lambda { return "Value from lambda" })
        puts "f returned: " + result
        "Value from g"
      end
       
      puts "g returned: #{g}"
       
      # And yes, you can call a lambda even when the creating context is gone:
       
      example 14
       
      def make_lambda
        begin
            lambda { return "Value from lambda" }
        ensure
            puts "make_lambda exited"
        end
      end
       
      puts make_lambda.call
       
      # Inside a lambda, a return statement only returns from the lambda, and flow continues normally.
      # So a lambda is like a function unto itself, whereas a Proc remains dependent on the control
      # flow of its caller.
      #
      # A lambda, therefore, is Ruby's true closure.
      #
      # As it turns out, "proc" is a synonym for either "Proc.new" or "lambda."
      # Anybody want to guess which one? (Hint: "Proc" in lowercase is "proc.")
       
      example 15
       
      def g
        result = f(proc { return "Value from proc" })
        puts "f returned: " + result
        "Value from g"
      end
       
      puts "g returned: #{g}"
       
      # Hah. Fooled you.
      #
      # The answer: Ruby changed its mind. If you're using Ruby 1.8, it's a synonym for "lambda."
      # That's surprising (and also ridiculous); somebody figured this out, so in 1.9, it's a synonym for
      # Proc.new. Go figure.
       
      # I'll spare you the rest of the experiments, and give you the behavior of all 7 cases:
      #
      # "return" returns from caller:
      #      1. block (called with yield)
      #      2. block (&b  =>  f(&b)  =>  yield)  
      #      3. block (&b  =>  b.call)    
      #      4. Proc.new
      #      5. proc in 1.9
      #
      # "return" only returns from closure:
      #      5. proc in 1.8
      #      6. lambda    
      #      7. method
       
      # ---------------------------- Section 4: Closures and Arity ----------------------------
       
      # The other major distinguishing of different kinds of Ruby closures is how they handle mismatched
      # arity -- in other words, the wrong number of arguments.
      #
      # In addition to "call," every closure has an "arity" method which returns the number of expected
      # arguments:
       
      example 16
       
      puts "One-arg lambda:"
      puts (lambda {|x|}.arity)
      puts "Three-arg lambda:"
      puts (lambda {|x,y,z|}.arity)
       
      # ...well, sort of:
       
      puts "No-args lambda: "
      puts (lambda {}.arity) # This behavior is also subject to change in 1.9.
      puts "Varargs lambda: "
      puts (lambda {|*args|}.arity)
       
      # Watch what happens when we call these with the wrong number of arguments:
       
      example 17
       
      def call_with_too_many_args(closure)
        begin
            puts "closure arity: #{closure.arity}"
            closure.call(1,2,3,4,5,6)
            puts "Too many args worked"
        rescue Exception => e
            puts "Too many args threw exception #{e.class}: #{e}"
        end
      end
       
      def two_arg_method(x,y)
      end
       
      puts; puts "Proc.new:"; call_with_too_many_args(Proc.new {|x,y|})
      puts; puts "proc:"    ; call_with_too_many_args(proc {|x,y|})
      puts; puts "lambda:"  ; call_with_too_many_args(lambda {|x,y|})
      puts; puts "Method:"  ; call_with_too_many_args(method(:two_arg_method))
       
      def call_with_too_few_args(closure)
        begin
          puts "closure arity: #{closure.arity}"
          closure.call()
          puts "Too few args worked"
        rescue Exception => e
          puts "Too few args threw exception #{e.class}: #{e}"
        end
      end
       
      puts; puts "Proc.new:"; call_with_too_few_args(Proc.new {|x,y|})
      puts; puts "proc:"    ; call_with_too_few_args(proc {|x,y|})
      puts; puts "lambda:"  ; call_with_too_few_args(lambda {|x,y|})
      puts; puts "Method:"  ; call_with_too_few_args(method(:two_arg_method))
       
      # Yet oddly, the behavior for one-argument closures is different....
       
      example 18
       
      def one_arg_method(x)
      end
       
      puts; puts "Proc.new:"; call_with_too_many_args(Proc.new {|x|})
      puts; puts "proc:"    ; call_with_too_many_args(proc {|x|})
      puts; puts "lambda:"  ; call_with_too_many_args(lambda {|x|})
      puts; puts "Method:"  ; call_with_too_many_args(method(:one_arg_method))
      puts; puts "Proc.new:"; call_with_too_few_args(Proc.new {|x|})
      puts; puts "proc:"    ; call_with_too_few_args(proc {|x|})
      puts; puts "lambda:"  ; call_with_too_few_args(lambda {|x|})
      puts; puts "Method:"  ; call_with_too_few_args(method(:one_arg_method))
       
      # Yet when there are no args...
       
      example 19
       
      def no_arg_method
      end
       
      puts; puts "Proc.new:"; call_with_too_many_args(Proc.new {||})
      puts; puts "proc:"    ; call_with_too_many_args(proc {||})
      puts; puts "lambda:"  ; call_with_too_many_args(lambda {||})
      puts; puts "Method:"  ; call_with_too_many_args(method(:no_arg_method))
       
      # For no good reason that I can see, Proc.new, proc and lambda treat a single argument as a special
      # case; only a method enforces arity in all cases. Principle of least surprise my ass.
       
       
       
      # ---------------------------- Section 5: Rant ----------------------------
      #
      # This is quite a dizzing array of syntactic options, with subtle semantics differences that are not
      # at all obvious, and riddled with minor special cases. It's like a big bear trap from programmers who
      # expect the language to just work.
      #
      # Why are things this way? Because Ruby is:
      #
      #   (1) designed by implementation, and
      #   (2) defined by implementation.
      #
      # The language grows because the Ruby team tacks on cool ideas, without maintaining a real spec apart
      # from CRuby. A spec would make clear the logical structure of the language, and thus help highlight
      # inconsistencies like the ones we've just seen. Instead, these inconsinstencies creep into the language,
      # confuse the crap out of poor souls like me who are trying to learn it, and then get submitted as bug
      # reports. Something as fundamental as the semantics of proc should not get so screwed up that they have
      # to backtrack between releases, for heaven's sake! Yes, I know, language design is hard -- but something
      # like this proc/lambda issue or the arity problem wasn't so hard to get right the first time.
      # Yammer yammer.
       
       
      # ---------------------------- Section 6: Summary ----------------------------
      #
      # So, what's the final verdict on those 7 closure-like entities?          
      #
      #                                                     "return" returns from closure
      #                                    True closure?    or declaring context...?         Arity check?
      #                                    ---------------  -----------------------------    -------------------
      # 1. block (called with yield)       N                declaring                        no
      # 2. block (&b => f(&b) => yield)    N                declaring                        no
      # 3. block (&b => b.call)            Y except return  declaring                        warn on too few
      # 4. Proc.new                        Y except return  declaring                        warn on too few
      # 5. proc                                    <<< alias for lambda in 1.8, Proc.new in 1.9 >>>
      # 6. lambda                          Y                closure                          yes, except arity 1
      # 7. method                          Y                closure                          yes
      #
      # The things within each of these groups are all semantically identical -- that is, they're different
      # syntaxes for the same thing:
      #   
      #      1. block (called with yield)
      #      2. block (&b  =>  f(&b)  =>  yield)  
      #      -------
      #      3. block (&b  =>  b.call)
      #      4. Proc.new  
      #      5. proc in 1.9
      #      -------
      #      5. proc in 1.8
      #      6. lambda    
      #      -------
      #      7. method (may be identical to lambda with changes to arity checking in 1.9)
      #
      # Or at least, this is how I *think* it is, based on experiment. There's no authoritative answer other
      # than testing the CRuby implementation, because there's no real spec -- so there may be other differences
      # I haven't discovered.
      #
      # The final verdict: Ruby has four types of closures and near-closures, expressible in seven syntactic
      # variants. Not pretty. But you sure sure do cool stuff with them! That's up next....
      #
      # This concludes the "Ruby makes Paul crazy" portion of our broadcast; from here on, it will be the "Ruby is
      # awesome" portion.
       
       
      # ---------------------------- Section 7: Doing Something Cool with Closures ----------------------------
       
      # Let's make a data structure containing all of the Fibonacci numbers. Yes, I said *all* of them.
      # How is this possible? We'll use closures to do lazy evaluation, so that the computer only calculates
      # as much of the list as we ask for.
       
      # To make this work, we're going to use Lisp-style lists: a list is a recursive data structure with
      # two parts: "car," the next element of the list, and "cdr," the remainder of the list.
      #
      # For example, the list of the first three positive integers is [1,[2,[3]]]. Why? Because:
      #
      #   [1,[2,[3]]]     <--- car=1, cdr=[2,[3]]
      #      [2,[3]]      <--- car=2, cdr=[3]
      #         [3]       <--- car=3, cdr=nil
      #
      # Here's a class for traversing such lists:
       
      example 20
       
      class LispyEnumerable
        include Enumerable
       
        def initialize(tree)
          @tree = tree
        end
       
        def each
          while @tree
            car,cdr = @tree
            yield car
            @tree = cdr
          end
        end
      end
       
      list = [1,[2,[3]]]
      LispyEnumerable.new(list).each do |x|
        puts x
      end
       
      # So how to make an infinite list? Instead of making each node in the list a fully built
      # data structure, we'll make it a closure -- and then we won't call that closure
      # until we actually need the value. This applies recursively: the top of the tree is a closure,
      # and its cdr is a closure, and the cdr's cdr is a closure....
       
      example 21
       
      class LazyLispyEnumerable
        include Enumerable
       
        def initialize(tree)
            @tree = tree
        end
       
        def each
            while @tree
                car,cdr = @tree.call # <--- @tree is a closure
                yield car
                @tree = cdr
            end
        end
      end
       
      list = lambda{[1, lambda {[2, lambda {[3]}]}]} # same as above, except we wrap each level in a lambda
      LazyLispyEnumerable.new(list).each do |x|
        puts x
      end
       
      example 22
       
      # Let's see when each of those blocks gets called:
      list = lambda do
        puts "first lambda called"
        [1, lambda do
          puts "second lambda called"
          [2, lambda do
            puts "third lambda called"
            [3]
          end]
        end]
      end
       
      puts "List created; about to iterate:"
      LazyLispyEnumerable.new(list).each do |x|
        puts x
      end
       
       
      # Now, because the lambda defers evaluation, we can make an infinite list:
       
      example 23
       
      def fibo(a,b)
        lambda { [a, fibo(b,a+b)] } # <---- this would go into infinite recursion if it weren't in a lambda
      end
       
      LazyLispyEnumerable.new(fibo(1,1)).each do |x|
        puts x
        break if x > 100 # we don't actually want to print all of the Fibonaccis!
      end
       
      # This kind of deferred execution is called "lazy evaluation" -- as opposed to the "eager
      # evaluation" we're used to, where we evaluate an expression before passing its value on.
      # (Most languages, including Ruby, use eager evaluation, but there are languages (like Haskell)
      # which use lazy evaluation for everything, by default! Not always performant, but ever so very cool.)
      #
      # This way of implementing lazy evaluation is terribly clunky! We had to write a separate
      # LazyLispyEnumerable that *knows* we're passing it a special lazy data structure. How unsatisfying!
      # Wouldn't it be nice of the lazy evaluation were invisible to callers of the lazy object?
      #
      # As it turns out, we can do this. We'll define a class called "Lazy," which takes a block, turns it
      # into a closure, and holds onto it without immediately calling it. The first time somebody calls a
      # method, we evaluate the closure and then forward the method call on to the closure's result.
       
      class Lazy
        def initialize(&generator)
        @generator = generator
        end
       
        def method_missing(method, *args, &block)
          evaluate.send(method, *args, &block)
        end
       
        def evaluate
          @value = @generator.call unless @value
          @value
        end
      end
       
      def lazy(&b)
        Lazy.new &b
      end
       
      # This basically allows us to say:
      #
      #   lazy {value}
      # 
      # ...and get an object that *looks* exactly like value -- except that value won't be created until the
      # first method call that touches it. It creates a transparent lazy proxy object. Observe:
       
      example 24
       
      x = lazy do
        puts "<<< Evaluating lazy value >>>"
        "lazy value"
      end
       
      puts "x has now been assigned"
      puts "About to call one of x's methods:"
      puts "x.size: #{x.size}"          # <--- .size triggers lazy evaluation
      puts "x.swapcase: #{x.swapcase}"
   
# unix

    backtick ``
      https://unix.stackexchange.com/questions/27428/what-does-backquote-backtick-mean-in-commands
      not a quotation sign
      it is evaluated by shell before main command
      output is used instead
    .d extension in init.d and other directories
      .d in directory names typically indicates a directory containing many configuration files or scripts for a particular situation 
    memory usage of processes
      https://unix.stackexchange.com/questions/164653/actual-memory-usage-of-a-process
        ans1
          no single command gives actual memory usage
            because there is no such thing as actual memory usage
          memory page can be
            transient storage used by that process alone
            shared with other processes
            backed up by a disk file
            physical memory or swap
        ans2
          pmap source: /proc/[N]/maps
          virtual address space vs physical memory
            virtual address space
              not real
              a map of all memory allocated
              limit is same for each process (2-4 GB)
              not accumulated (multiple processes can only has 512 MB of physical memory)
              data is not stored from virtual address space
              kernel's job: manage the relation bw physical and virtual memory
              virtual space useful for:
                structure of a process
                relation to physical memory use
            amount of RAM actually used: physical memory counts
          pmap: info about virtual space
          pmap -x: Dirty column
            this is closed to real amount of memory
          top columns
            VIRT: VirtualSz: from virtual space
            RES: ResidentSz: from physical memory

## curl

    man curl
      download url to filename
        curl "{{URL}}" -o {{filename}}
      send form-encoded data
        curl --data {{name=bob}}
        POST request of type: application/x-www-form-urlencoded
      send json data
        curl -X POST -H "Content-Type: application/json" -d {{'{"name":"bob"}'}} <url>
      specify http method
        curl -X {{DELETE}} <url>
      head request
        curl --head <url>
      include extra header
        curl -H "{{X-Myheader: 123}}" <url>
    media type (MIME type / content type) id=g_10155
      media type (MIME type / content type) <url:file:///~/Dropbox/mynotes/content/code/ccode.md#r=g_10155>
      https://en.wikipedia.org/wiki/Media_type
        two-part identifier for file formats
        IANA (Internet Assigned Numbers Authority) manages
        defined in RFC2045
          for denoting type of email content and attachments
          name MIME: Multipurpose Internet Mail Extensions
          used by HTTP and HTML as well
        naming
          composed of
            type
            subtype
            optional params
          ex
            text/html; charset=UTF-8
              text: type
              html: subtype
              charset: optional parameter
          registered type names:
            application, audio, image, multipart, text, ...
          ex:
            application/javascript
            application/json
            application/x-www-form-urlencoded
            text/html
            text/csv
            image/png
          registration trees
            type/media_type_name[+suffix]
            vendor tree
              vnd.
    How are parameters sent in an HTTP POST request?
      https://stackoverflow.com/questions/14551194/how-are-parameters-sent-in-an-http-post-request#
      sent in request body
        in the format that content type specifies
          usually: application/x-www-form-urlencoded
          ex: request body contains string:
            parameter=value&also=another
      for file upload:
        multipart/form-data
      content is put after http header
        ex
          POST /path/script.cgi HTTP/1.0
          From: frog@jmarshall.com
          User-Agent: HTTPTool/1.0
          Content-Type: application/x-www-form-urlencoded
          Content-Length: 32
          # blank line
          home=Cosby&favorite+flavor=flies
        debug with Fiddler
      for json data:
        application/json

## make

    Minimal make
      http://kbroman.org/minimal_make/
      intro
        most important tool for reproducible research is: GNU make
        consider: files associated with a book
          R scripts
          Latex files for main text
          BibTex for references
      A simple example

# tools

## anki

    Basics: Objects
      Cards
        card = question + answer pair
      Decks
        deck = group of cards
        tree structure
          parent::child
      Notes & Fields
        ex: note
          French: Bojour
          English: Hello
          Page: 12
        we will generate two cards from this note:
          card1 
            Q: Bonjour
            A: Hello
            Page 12
          card2
            Q: Hello
            A: Bonjour
            Page 12
      Card Types
        blueprint: card type
        a type of note can have many card types
        when you create a note, anki will create a card for each card type
        each card type has two templates: Q and A
        ex1:
          Q: {{French}}
          A: {{English}}<br>
          Page #{{Page}}
        ex2:
          Q: {{English}}
          A: {{French}}<br>
          Page #{{Page}}
      Note Types
        tip: make a new note type for each topic
        ex: "French" note type
        ex: "Country" note type
        standard note types:
          Basic
          Basic (and reversed card)
            creates two cards for each text you enter
            front -> back and back -> front
          Cloze
            ex
              Canberra was founded in {{c1::1913}}.
              ->
              Canberra was founded in [...].
            ex:
              {{c2::Canberra}} was founded in {{c1::1913}}.
              ->
              Canberra was founded in [...].
              [...] was founded in 1913.
            ex:
              {{c1::Canberra}} was founded in {{c1::1913}}.
              ->
              [...] was founded in [...].
            ex: hints
              C{{c1::anberra}} was founded in 1913.
            ex: hint 2
              {{c1::Canberra::city}} was founded in 1913.
              ->
              [city] was founded in 1913.
      Collection
    Adding Material
      Downloading Shared Decks
      Adding Cards and Notes
          
## audacity

    shortcuts
      http://vip.chowo.co.uk/wp-content/uploads/jaws/Audacity-2.1.0-Guide.html#moving-the-cursor
    moving cursor
      start/end    J/K
        start/end    Home/End
      short move    , .
        long move    shift , .
      very short    left/right
      during playback
        move current position    [ ]
      reading the position of cursor
      using selection toolbar
        activate selection toolbar    #F6
    naming a track
      Track > .Name > Name
    editing shortcuts
      Prefences > Keyboard
    play/record
      play/pause  space
      record  R
    zoom
      zoom in  !+f
      zoom out    -
    me
      mute    #u
      unmute/mute selected    u
      export selected  #e
      export multiple  #L

## docker id=g_10120

    docker <url:file:///~/Dropbox/mynotes/content/code/ccode.md#r=g_10120>
    list dangling (untagged images) volumes
      docker images -f "dangling=true" -q
      remove them
        docker rmi $(docker images -f "dangling=true" -q --no-trunc)
    purging (removing) all unused images, containers etc.
      docker system prune
    list container names - print names only - docker ps
      docker ps -a --format '{{.Names}}'
      docker ps -a | tail -n +2 | awk '{print $NF}'
    list volumes
      docker inspect -f '{{ json .Mounts  }}' <containerid> | python -m json.tool
    remove a container and its volumes
      https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes
      docker rm -v vrp_nginx-router_1
    error: opencpu_1       | httpd (pid 13) already running
      solution
        docker rm vrp_opencpu_1
        docker-compose up
    pass environment variables from config file
      https://docs.docker.com/compose/environment-variables/#substituting-environment-variables-in-compose-files
      https://docs.docker.com/compose/compose-file/#variable-substitution
        ex:
          env variable in shell:
            POSTGRES_VERSION=9.3
          docker-compose.yml:
            db:
              image: "postgres:${POSTGRES_VERSION}"
        ex: put env variables into .env file (default)
          .env
        ex: default values
          ${VARIABLE:-default} will evaluate to default if VARIABLE is unset or empty in the environment.
        ex: set env vars in command line
          docker run -e VARIABLE=VALUE ...
        ex: multiple env files
          opt: command line
            docker run --env-file=FILE ...:
          opt: in docker-compose.yml
            web:
              env_file:
                - web-variables.env
        ex: .env file
          $ cat .env
          TAG=v1.5
          $ cat docker-compose.yml
          version: '3'
          services:
            web:
              image: "webapp:${TAG}"
    change user in Dockerfile
      USER <user>[:<group>]
      USER <uid>[:<gid>]
    error: can't run mvn package:
      container_linux.go:247: starting container process caused "open /proc/self/fd: no such file or directory"
      solution
        VOLUME . /srv/app/itr_vrp
        ->
        COPY . /srv/app/itr_vrp
      cause:
        shared volumes don't have correct file permissions in container
        see: file permissions problem in docker volumes <url:#r=ccd_0002>
    running as non-root user
      https://stackoverflow.com/questions/24308760/running-app-inside-docker-as-non-root-user
        root user: security breach
          can access any host file
          https://news.ycombinator.com/item?id=7909622
        note: when using chown
          make sure that the directory is not a shared volume
    file permissions problem in docker volumes id=ccd_0002
      file permissions problem in docker volumes <url:#r=ccd_0002>
      when mounting a host directory as docker volume, the ownership of the directory becomes messy
        the ownership belongs to the host user
        but there is no such user in container
        a non-root user in container doesn't have permissions to write those shared volumes
      to fix problem:
        opt1: old way
          create same users in container
          https://denibertovic.com/posts/handling-permissions-with-docker-volumes/
          https://stackoverflow.com/questions/23544282/what-is-the-best-way-to-manage-permissions-for-docker-shared-volumes
        opt2: new way using user namespace mapping
          https://www.jujens.eu/posts/en/2017/Jul/02/docker-userns-remap/
          https://stackoverflow.com/questions/35291520/docker-and-userns-remap-how-to-manage-volume-permissions-to-share-data-betwee
        opt3: bad way: run docker apps with root user
    Use Linux user namespaces to fix permissions in docker volumes
      https://www.jujens.eu/posts/en/2017/Jul/02/docker-userns-remap/
      "chmod -R 777 DIR" yapmadan mounted volume kullanmak için
    Introduction to User Namespaces in Docker Engine
      https://success.docker.com/KBase/Introduction_to_User_Namespaces_in_Docker_Engine
      what are namespaces
        ex: a process has some pid in container
          some other pid in host
          then we say:
            inside container there is a pid namespace 
        man definition:
          A namespace wraps a global system resource in an abstraction that
          makes it appear to the processes within the namespace that they have
          their own isolated instance of the global resource...
        another explanation: 
          pid namespace is a mechanism for remapping pid inside container
        uid namespace:
          remapping UIDs inside container
    differences in file permissions and owners between osx and linux containers
      https://stackoverflow.com/questions/40165921/docker-on-the-mac-separates-internal-and-external-file-ownerships-not-so-on-lin
      ex: 
        linux
          root@c7bb08d325c3:/home/opencpu/vrpdata# cd /srv/app/
          root@c7bb08d325c3:/srv/app# ls -l
          drwxrwxr-x 3 500 500 4096 Aug  3 16:54 data
        osx
          opencpu@6166628a105e:~$ cd /srv/app/
          opencpu@6166628a105e:/srv/app$ ls -l
          drwxr-xr-x 10 opencpu www-data 340 Aug  3 16:09 data
      reason:
        hosted volumes ownership should be determined by host 
          that is how linux docker works
          but osx doesn't comply 
    run container in bash (pseudo-tty)
      docker run -it --rm cplex01:current bash
      for docker-compose
        docker-compose.yml
          stdin_open: true
          tty: true
          entrypoint:
            - "bash"
        docker-compose up
        docker run -it <container_name> bash
    efficient Dockerfile for nodejs apps
      http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
      summary:
        first copy package.json
        then npm install
        then copy all other sources
        so that when a source file changes, docker will reuse caches
      ex
        COPY package.json /starter/package.json
        WORKDIR /starter
        RUN yarn install --production
        COPY . /starter
    how to push data volumes to registry
      https://serverfault.com/questions/632122/how-do-i-deploy-a-docker-container-and-associated-data-container-including-cont
      docker images: union filesystem + metadata
      data volumes: a directory that bypasses union filesystem
      since data volumes aren't part of containers, committing a container won't persist data in that volume
    data volume container in docker-compose
      ex: docker-compose.yml
        version: '3'
          services:
            image: mongo:3.4
            volumes:
              - "mongostore:/data/db"
          volumes:
            mongostore:
      command line
        docker volume create --name="myAwesomeApp"
        docker run -d --name="myApp-1" -v="myAwesomeApp:/data/app" myApp
    Manage data in containers
      https://docs.docker.com/engine/tutorials/dockervolumes/
      two ways to manage data:
        data volumes
        data volume containers
      data volumes
        definition: a directory that bypasses union file system
          union file system: implements a union mount and operate by creating layers
        features for persistent data
          volumes are initialized when a container is created
            if parent image contains data, that data is copied
              note: this does not apply when mounting a host directory
          can be reused among containers
          changes to data volume are direct
          changes are not included when you update an image
          data volumes persist after container is dead
            docker never deletes volumes when you remove container
      add data volume
        opt
          -v flag with 
            docker create
            docker run
          VOLUME in Dockerfile
        ex
          docker run -d -P --name web -v /webapp training/webapp python app.py
            a new volume at /webapp in container
      locate a volume
        $ docker inspect web
        ...
        "Mounts": [ {..}]
      mount a host directory as data volume
        opt: host-dir
          absolute path: starts with /
          name
        ex: absolute path
          $ docker run -d -P --name web -v /src/webapp:/webapp training/webapp python app.py
          #: /webapp
      Creating data volume container
        why: to share between containers
        ex
          $ docker create -v /dbdata --name dbstore training/postgres /bin/true
            creating
          $ docker run -d --volumes-from dbstore --name db1 training/postgres
            using
      Backup, restore, migrate
        using --volumes-from
        ex: backup
          $ docker run --rm --volumes-from dbstore -v $(pwd):/backup ubuntu tar cvf /backup/backup.tar /dbdata
        ex: restore
          $ docker run -v /dbdata --name dbstore2 ubuntu /bin/bash
          $ docker run --rm --volumes-from dbstore2 -v $(pwd):/backup ubuntu bash -c "cd /dbdata && tar xvf /backup/backup.tar --strip 1"
    Union file system
      https://washraf.gitbooks.io/the-docker-ecosystem/content/Chapter%201/Section%203/union_file_system.html
      https://stackoverflow.com/questions/32775594/why-does-docker-need-a-union-file-system
        it allows files (known as branches) to be transparently overlaid
      https://en.wikipedia.org/wiki/UnionFS
      Union mount
        https://en.wikipedia.org/wiki/Union_mount
        a way of combining multiple directories into one
          that appears to contain their combined contents
        ex: need to update info in cdrom
          cdrom is not writable
          one can overlay cd's mount point with a writable directory in a union mount
          then updating files in union directory
            end up in the writable directory
      Mount point
        https://en.wikipedia.org/wiki/Mount_(computing)#MOUNT-POINT
        a physical location in partition used as a root filesystem
    data volumes
      https://stackoverflow.com/documentation/docker/1318/docker-data-volumes/11075/creating-a-named-volume
        data volumes: to pesist data independent of container's life cycle
        creating named volume
          opt
            docker volume create --name="myAwesomeApp"
            docker run -d --name="myApp-1" -v="myAwesomeApp:/data/app" myApp
          what is difference from mounting a host directory as a volume?
            instead of valid path, volume name is specified
        named volumes can be shared with other containers
          docker run -d --name="myApp-2" --volumes-from "myApp-1" myApp
      data volumes and data containers
        https://stackoverflow.com/documentation/docker/3224/data-volumes-and-data-containers
        data-only containers
          obsolet and considered an anti-pattern
          replaced by "named volumes" and "docker volume" subcommand
        data volume: a docker volume which is not mounted from the host
          created either with VOLUME Dockerfile directive, or using -v in docker run, with format -v /path/on/container
          ex: data only container
            docker run -d --name "mysql-data" -v "/var/lib/mysql" alpine /bin/true
            docker run -d --name="mysql" --volumes-from="mysql-data" mysql
        data volume lives even if the container dies
    create image from running container: commit
      https://docs.docker.com/engine/reference/commandline/commit/
      docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
      docker commit 434902323 mertnuhoglu/mongo_vrp:1
    my docker image settings
      node
        ex: compose
          image: node:6.6.0
          working_dir: "/starter"
          entrypoint:
            - npm
            - start
          volumes:
           - ./frontend:/starter
           - /starter/node_modules
      nodemon
        ex: compose 
          image: mertnuhoglu/nodemon:6.6.0
          working_dir: "/starter"
          entrypoint:
            - nodemon
            - app.js
          volumes:
           - ./frontend:/starter
           - /starter/node_modules
    entrypoint in compose
      entrypoint:
        - "java"
        - "-jar"
        - "-Done-jar.silent=true"
        - "target/vrp-0.1.jar"
        - "server"
        - "config.yml"
      equivalent to:
        java -jar -Done-jar.silent=true target/vrp-0.1.jar server config.yml 
    working directory in compose
      working_dir: "/srv/app/itr_vrp"
    difference between entrypoint vs cmd
      https://stackoverflow.com/questions/21553353/what-is-the-difference-between-cmd-and-entrypoint-in-a-dockerfile
        entrypoint: runs always as the actual command
        cmd: passed as arg to entrypoint
        ex
          ENTRYPOINT ["/bin/cat"]
          docker run img /etc/passwd
          -> end result:
          /bin/cat /etc/passwd
        Dockerfile may specify default ENTRYPOINT and CMD
          ex
            CMD ["bash"]
          if not, then default entrypoint is:
            /bin/sh -c
        ex
          FROM debian:wheezy
          ENTRYPOINT ["/bin/ping"]
          CMD ["localhost"]
          # running
            docker run -it test
              ->
              /bin/ping localhost
            docker run -it test google.com
              ->
              /bin/ping google.com
      https://www.ctl.io/developers/blog/post/dockerfile-entrypoint-vs-cmd/
        default CMD and ENTRYPOINT can be overridden
          CMD:
            docker run demo <new_cmd>
          ENTRYPOINT
            docker run --entrypoint <new_entrypoint> demo
    networking: links
      docker container networking
        https://docs.docker.com/engine/userguide/networking/
        default networks
          $ docker network ls
            3 tane var: bridge, none, host
            varsayılan bridge
        detach from container: ^p ^q
        inspect
          $ docker network inspect bridge
        user defined networks
          bunu kullanmayı tavsiye ediyorlar
          bridge network
            $ docker network create --driver bridge isloated_nw
              isolated_nw: network name
            $ docker network inspect isolated_nw
            $ docker network ls
              isolated_nw de yeni bir network olarak görünür
            $ docker run --network=isolated_nw -itd --name=container3 busybox
              yeni container bu network üzerinde çalışır
      https://docs.docker.com/engine/userguide/networking/default_network/dockerlinks/
        networks'ten önce link vardı, bu artık deprecate oldu
        connect using network port mapping
          $ docker run -d -P training/webapp python app.py
          -P: map network port inside to a random host port
          $ docker ps 
          # 49155 -> 5000
            host'un 49155 portu container'ın 5000 portuna bağlı
          opt: -p 49155:5000
            zararı: bu portta sadece bir tane container kullanabilirsin
          opt: ephemeral port range
            -p 8000-9000:5000
            random portlara bağlar yine
          $ docker port container_name 5000
          # 127.0.0.1:49155
        connect with linking system
          bu eski yöntem, default bridge network kullanarak
          naming: önce tüm containerlara isim vermelisin
            docker run --name db ...
          buna referans ver:
            docker run --name web --link db:db ...
          inspect
            $ docker inspect -f "{{ .HostConfig.Links }}" web
            [/db:/web/db]
          /etc/hosts
            buraya link mappingleri konuluyor
          restart
            docker restart db
              bu komut tüm linkleri günceller
      difference between network and link
        https://stackoverflow.com/questions/41294305/docker-compose-difference-between-network-and-link
        compose içinde
          side effecti var linklerin
          depends_on ile çalıştırmalısın
    docker-compose
      docker-compose up vs docker run
        http://stackoverflow.com/questions/33715499/what-is-the-difference-between-docker-compose-up-and-docker-compose-start
          docker-compose start
            starts existing containers
          docker-compose up
            -d: starts containers in background
      docker-compose up vs docker-compose run
        https://stackoverflow.com/questions/33066528/should-i-use-docker-compose-start-up-or-run
          eğer yml dosyasını override edeceksen run kullan
          run kullanacaksan '--service-ports' da ekle
            çünkü port'lar pasiftir varsayılan
          docker-compose run --service-ports --rm <service_name>
            fakat sadece ilgili servisi çalıştırır, tümünü değil
    tag push
      docker tag 9fe9654eb474 mertnuhoglu/mertwhalesay:latest
      docker login --username=mertnuhoglu --email=mert.nuhoglu@gmail.com
      docker push mertnuhoglu/mertwhalesay:latest
    build your image
      write a dockerfile
        FROM 
          FROM docker/whalesay:latest
        RUN
          RUN apt-get -y update && apt-get install -y fortunes
          # installs fortunes
        CMD
          CMD /usr/games/fortune -a | cowsay
          # run cmd after setup 
      build image 
        code
          docker build -t docker-whale .
        -t: gives image a tag
        .: look for Dockerfile here
    articles
      Leanpub.Docker.for.Developers.pdf
        ch02
          controlling containers
            -ti: interactive
            -rm: remove after exit
            --name
          container data
            volumes
            -v `pwd`/dir:/root
            -v /root
              directory will persist as container lives
            --volumes-from <other_container>
              link volumes with other containers
          networking
            --link app_php:phpserver
              access `app_php` with name `phpserver`
            -p [host_port]:[port]
        ch03: Containerizing your Application
          -u $UID
            change UID of user inside container
          -w /var/www
            changes working directory of command
        ch04: Creating Custom Containers
          RUN
            RUN apt-get update && apt-get install -y \
                    nginx \
                    && apt-get clean \
                     && rm -rf /var/lib/apt/lists/*
            desc
              3. Update the apt cache, and
              4. and install the nginx package
              5. and clean the apt cache
              6. and remove and leftover lists to conserve space in the image
          CMD
            can be overridden
          ENTRYPOINT
            runs always
            ex
              1 $dockerrun\
              2 -d -v `pwd`:/var/www --name testphp \
              3 php:5.6-fpm php -S 0.0.0.0:80 -t /var/www/html
              --> simplify it
              1 FROM php:5.6
              2 EXPOSE 80
              3 ENTRYPOINT ["php", "-S", "0.0.0.0:80"]
              4 CMD ["-t", "/var/www/html"]
              This sets the command that will always execute to php -S 0.0.0.0:80, and we can override the -t /var/www/html if we want to. If we build this Dockerfile as ‘phpdevserver’, we can run it like the following:
              1 $ docker run -d -v `pwd`:/var/www phpdevserver
              2 // Or to override the path we are watching
              3 $ docker run -d -v `pwd`:/opt/app phpdevserver -t /opt/app/html
          VOLUME
            VOLUME /path/inside/image
        ch05: Docker Tools
          Docker Machine
            handles hosting to DO, AWS ...
            get an API token from hosting provider
              1 $ docker-machine create \
              2 --driver digitalocean \
              3 --digitalocean-access-token [token] \
              4 dockerfordevs
              5
              6 $ docker-machine ls
              7 NAME ACTIVE DRIVER STATE URL
              8 dockerfordevs - digitalocean Running tcp://XXX.XXX.XXX.XXX:2376
            set env vars
              1 $ docker-machine env dockerfordevs
              2 export DOCKER_TLS_VERIFY="1"
              3 export DOCKER_HOST="tcp://XXX.XXX.XXX.XXX:2376"
              4 export DOCKER_CERT_PATH="/home/user/.docker/machine/machines/dockerfordevs"
              5 export DOCKER_MACHINE_NAME="dockerfordevs"
              6 # Run this command to configure your shell:
              7 # eval "$(docker-machine env dockerfordevs)"
          Docker Swarm
            creating a swarm
              Swarm Master
                # get token
                docker run --rm swarm create
                493049809 # token
                # create master
                docker-machine create -d virtualbox
                  --swarm \
                  --swarm--master \
                  --swarm-discovery token://493049809 \
                  swarm-master
                # create nodes
                $ docker-machine create -d virtualbox \
                    --swarm \
                    --swarm-discovery token://40122bb69c98825b4ac7094c87a07e21 \
                    swarm-node-1
                docker-machine ls
          Docker Compose
            docker-compose up -d
            # 4 tane phpserver container oluştur
              docker-compose scale phpserver=4
              docker-compose up -d
        Manual
        https://docs.docker.com/machine/concepts/
        Getting started mac
          Setup 
            https://docs.docker.com/mac/step_one/
            running
              create a new docker engine host
              switch to new VM
              use docker client
            how to run?
              1. docker quickstart terminal
          Understand images and containers
            docker run hello-world
              hello-world: image
                image: filesystem and parameters to use at runtime
              container: running instance of an image
              run: runs a docker container
              what happens?
                1. checks if you have hello-world image
                2. download image form Docker Hub
                3. load image and run it
          Find and run whalesay image
            1. docker hub
            2. search for whalesay
            3. run
              docker run docker/whalesay cowsay boo
          Build your own image
            new directory
            vim Dockerfile
              FROM docker/whalesay:latest
              RUN apt-get -y update && apt-get install -y fortunes
              CMD /usr/games/fortune -a | cowsay
            docker build -t docker-whale .
              1. takes Dockerfile
              2. builds an image "docker-whale"
                from docker/whalesay
                runs apt-get command
            docker images
            run
              docker run docker-whale
          Create docker hub repository
            docker hub
              create repository
          Tag, push, and pull your image
            docker images
            tag it
              docker tag 9fe9654eb474 mertnuhoglu/mertwhalesay:latest
            push it
              docker login --username=mertnuhoglu --email=mert.nuhoglu@gmail.com
              docker push
            pull new image
              docker rmi -f 9fe9654eb474
                removes your image
              docker run mertnuhoglu/mertwhalesay
        Docker Hub
          what is
            registry service for containers
            features
              image repositories
              automated builds
              webhooks
              organizations
          search
            docker search ubuntu
          repositories
            adding multiple images to a repostory
              ex: docs/base:testing
            renaming repos
              docker tag <existing> <user>/<repo>[:<tag>]
          automated builds
            docker hub > create > automated build
              <url:file:///.select: github project>
              note: github repo should have ./Dockerfile
        Docker Compose
          what it does
            defines and runs docker apps
          using it:
            1. define app's environment in Dockerfile
            2. define services in docker-compose.yml
            3. run docker-compose up
          docker-compose.yml
            services:
              web:
                ports:
                volumes:
          use cases
            creating isolated development environments
            automated testing environments
              docker-compose up -d
              <url:file:///./run_tests>
              docker-compose down
        Docker Machine
          what it does
            creates host
          Learn by example
            Machine concepts and help
              ip addresses for docker hosts
                docker-machine ls
                  list machines
      Manning.Docker.in.Action.1633430235.pdf
        ch11: Declarative environments with Docker Compose
          11.1.1 Onboarding with a simple development environment
            1. install docker
            2. install docker compose
            3. clone a development environment
              create a new dir: wp-example
              create file: docker-compose.yml
                wordpress:
                  image: wordpress:4.2.2
                  links:
                    - db:mysql
                  ports:
                    - 8080:80
                db:
                  image: mariadb
                  environment:
                    MYSQL_ROOT_PASSWORD: example
              docker-compose up
              open: http://localhost:8080
                from osx:
                  docker-machine ip
                  open: its address
    DockerBook
      ch1 Introduction
        containers vs. hypervisor virtualization
          independent machine runs virtually on physical hardware 
          containers instead
            run in user space
            on top of os' kernel
            called: os level virtualization
        docker images
          like "source code" for containers
            can be shared, stored
          "build" part of life cycle
        registries
          stores images
        containers
          contain running processes
          launced from images
      ch2 Installing Docker 
        use ip address for your local virtual machine's ip instead of localhost
          docker-machine ip
        check if daemon is running
          sudo status docker
    sudo/root password
      http://stackoverflow.com/questions/32646952/docker-machine-boot2docker-root-password
        instead of sudo use:
          sudo -i
          or
          su sudo
        then it won't ask for root password
        or use username
          http://stackoverflow.com/questions/24286007/how-do-i-ssh-into-the-boot2docker-host-vm-that-the-vagrant-1-6-docker-provider-s
          docker-machine ip
          ssh docker@192.168.99.100
          user: docker
          pass: tcuser
    How to execute host's Docker command from container? id=g_10127
      How to execute host's Docker command from container? <url:file:///~/Dropbox/mynotes/content/code/ccode.md#r=g_10127>
      ref
        http://stackoverflow.com/questions/34687421/docker-issue-command-from-one-linked-container-to-another
        http://stackoverflow.com/questions/31625679/how-to-execute-hosts-docker-command-from-container
      mantık
        docker exec komutunu vermelisin, ancak host'a erişmen lazım önce
          docker exec -it vrp_java_1 bash
        bunun için host'un docker client'ına soket üzerinden komut iletirsin
        soket üzerinden komut iletmek için, remote api client kütüphanelerini kullanırsın
          docker-py, dockerode gibi
        ancak önce host docker daemon'u soketlerle çalıştırmalısın
          docker -d -H=0.0.0.0:2375 ..
    docker daemon vs client
      http://stackoverflow.com/questions/42641011/what-is-the-need-for-docker-daemon
        client ve daemon aynı makinede
          neden ayrı varlıklar?
        ans1
          client sadece cli
            http api wrapper
          daemon her şeyin beyni
            ex: docker run komutu
              client bunu http API call'a çevirir
              daemon'a gönderir
              daemon bunu yürütür
          daemon aynı makinede olmayabilir
      Docker Overview
        https://docs.docker.com/engine/understanding-docker/
        what is docker engine
          client-server app
            server: daemon process
            rest api: daemon'la konuşmak için
            cli client: docker client
          manages
            network
            data volumes
            containers
            images
      docker daemon in osx
        traybar > docker > preferences
        dockerd configuration options
          daemon configuration file in json
            --config-file /etc/docker/daemon.json
      daemon configuration file
        https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file
        daemon configuration file in json
          --config-file /etc/docker/daemon.json
        json keys = dockerd flag names
          https://docs.docker.com/engine/reference/commandline/dockerd/
          if allow several entries, then plural
        ex
          "hosts": [],
        -H = hosts = DOCKER_HOST
          The Docker client will honor the DOCKER_HOST environment variable to set the -H flag for the client.
          $ docker -H tcp://0.0.0.0:2375 ps
          # or
          $ export DOCKER_HOST="tcp://0.0.0.0:2375"
          $ docker ps
          # both are equal
      Configure the Docker daemon
        https://docs.docker.com/engine/admin/#configure-the-docker-daemon
        dockerd -D --tls=true --tlscert=/var/docker/server.pem --tlskey=/var/docker/serverkey.pem -H tcp://192.168.59.3:2376
      What is the Difference Between 127.0.0.1 and 0.0.0.0?
        https://www.howtogeek.com/225487/what-is-the-difference-between-127.0.0.1-and-0.0.0.0/
        127.0.0.1: loopback address (localhost)
        0.0.0.0: meta address
          designates invalid/unknown target
        in servers:
          0000: all address on local machine
          if host has 2 ip: 192.168.1.1 and 10.1.2.1
            and a server running on host listens on 0.0.0.0
            it is reachable at both ips
        what is 127.0.0.1
          loopback ip address = localhost
        special addresses
      Telnet
        https://www.rootusers.com/how-to-test-network-connectivity-with-telnet/
          telnet google.com 80
            GET /
        https://www.howtogeek.com/79830/basic-network-troubleshooting-using-command-line-telnet-fun/
          telnet towel.blinkenlights.nl
      Christian Heimes - File descriptors, Unix sockets and other POSIX wizardry - PyCon 2016-Ftg8fjY_YWU.mp4
        ex
          # read.py
          with open('example.txt') as f:
            print(f.read())
        ex
          strace ./read.py
        open file table (global)
          kernel maintains this table
            all open resources
        every process has 
          file descriptor table
          /Users/mertnuhoglu/Dropbox/public/img/ss-164.png
        different processes can share
          same file descriptor
        file descriptor table
          maps to open file table
          cloexec flags
        open file table
          position
          mode 
          owner
          locks
          credentials
          reference count
          ...
        how unix create processes
          spawn a new process
            fork & exec
          fork()
            creates a clone of current process
            child inherits copy of file descriptor table
          exec()
            replaces current code
            file descriptors are inherited
        why does child process get clone of file descriptor table
          subprocess.PIPE
          ex
            import os
            readend, writeend = os.pipe()
            pid = os.fork()
            if pid != 0: # parent process
              os.close(writeend)
            else: # child
              os.close(readend)
              os.dup2(writeend, 1)
              os.execl('/bin/ls', 
                'ls', '-l', 'example.txt')
        network sockets
          addressing/routing: ipv4
          flow control:
            tcp
            udp
          ex: socket server
            server = socket(AF_INET, SOCK_STREAM)
            server.bind(('0.0.0.0', 443))
            server.listen(1) 
            while True:
              conn, addr = server.accept()
          ex: socket client
            cl4 = socket(AF_INET, SOCK_STREAM)
            cl4.connect(('ip..', 443))
        unix sockets (unix domain sockets / local sockets)
          like pipes and network sockets
          ex: server
            server = socket(AF_UNIX, SOCK_STREAM)
            server.bind('/path/to/file')
          ex: client
            client = socket(AF_UNIX, SOCK_STREAM)
            client.connect('/path/to/file')
          ex:
            a,b = socketpair()
          ex: peer credentials
      System Startup Commands and Configurations
        systemctl - digitalocean
          https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units
          intro
            systemd: init system and system manager
              new standard for linux
          service management
            target of actions: units
              resources to manage
              defined with unit files
                type: suffix of file
            targut unit of service management: service units 
              .service suffiex
          starting and stopping services
            start command
            sudo systemctl start application.service
              ===
              sudo systemctl start application
          restarting/reloading
            restart command
            reload command
              reloads configuration files without restarting
          enable/disable
            enable: start a service at boot
              creates a symlink
                from service file
                  in /lib/systemd/system or /etc/systemd/system
                to autostart files
                  /etc/systemd/system/x.target.wants
          check status
            status
              systemctl status docker.service
            is-active: is currently running
              systemctl is-active docker.service
          unit management
            display unit file
              systemctl cat docker.service
            display dependencies
              systemctl list-dependencies docker.service
            editing unit files
              systemctl edit docker.service
              sudo systemctl edit --full docker.service
    Rethinking PID 1
      http://0pointer.de/blog/projects/systemd.html
      ref
        http://0pointer.de/blog/projects/socket-activation.html
      Process Identifier 1
        special process identifier 1
          started by kernel
            before all processes
          parent process for all other
          responsible for things
            that other process are not responsible for
          historically: siysvinit
            replacement: upstart
        central responsibility:
          bring up userspace during boot
            userspace: memory where user processes run
            kernel space: memory where kernel executes 
          should be fast
            sysv was not fast
        for fast bootup, 2 things are crucial:
          to start less
          to start more in parallel
      hardware and software change dynamically
        init system
          needs to dynamically start services
            as they are needed
        daemon services depend on each other
          many of them require syslog
          so they wait until syslog is started up
      parallelizing socket services
        this kind of synchronization
          results in serialization of boot process
        how to get rid of it?
        why is the startup of daemons delayed?
          they wait until the dependent socket is ready
          that is an AF_UNIX socket or AF_INET
          ex: clients of D-Bus wait
            /var/run/dbus/system_bus_socket
          ex: clients of syslog wait for
            /dev/log
        this (sockets) is all they are waiting for
          make them available
            instead of full daemon startup
        how?
          create listening sockets before starting daemon
          then pass the socket during exec() to it
        ex: you start syslog and syslog clients at the same time
          messages of the clients are added to 
            /dev/log socket
          clients can proceed with their startup
          when syslog is ready, it dequeues all messages
    sof: what does fd:// mean exactly in dockerd -H fd://
      <url:file:///~/Dropbox (Personal)/mynotes/content/code/sof_what-does-fd-mean-exactly-in-dockerd-h-fd.md>
    how to ssh to boot2docker vm?
      docker-machine ssh 
        or
        docker-machine ssh default
      if more than one machine:
        docker-machine ls
    docker commands
      http://zeroturnaround.com/rebellabs/docker-commands-and-best-practices-cheat-sheet/
    Official Documentation
      Get started with Docker for Mac
        https://docs.docker.com/docker-for-mac/
        check versions
          docker --version
        run 
          ❯ docker run -d -p 80:80 --name webserver nginx
          141ccfa801795c0fa586053ea1cbcc26079af682e101eb2f7b7fc17a23fd391d
          ❯ docker ps
          CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                         NAMES
          141ccfa80179        nginx               "nginx -g 'daemon ..."   42 seconds ago      Up 40 seconds       0.0.0.0:80->80/tcp, 443/tcp   webserver
          ❯ docker stop webserver
          webserver
        run hello-world
          docker run hello-world
          hello-world: image
        docker ps
          show currently running containers
        docker images
          lists images
        build your image
          write a dockerfile
            FROM 
              FROM docker/whalesay:latest
            RUN
              RUN apt-get -y update && apt-get install -y fortunes
              # installs fortunes
            CMD
              CMD /usr/games/fortune -a | cowsay
              # run cmd after setup 
          build image 
            code
              docker build -t docker-whale .
            -t: gives image a tag
            .: look for Dockerfile here
      Sample app overview
        https://docs.docker.com/engine/getstarted-voting-app/
    videos
      Learn Docker in 12 Minutes 🐳-YFl2mCHdv24.mp4
        container vs. vm
          c uses kernel of host os
        image
          contains apps, software everything
          built by 
            Dockerfile
        container runs image
          dockerfile builds image
        Dockerfile
          use existing image
            FROM php:7.0-apache
          copy our src/ folder to docker's dir
            COPY src/ /var/www/html
          container listens 80
            EXPOSE 80
        build image
          docker build -t hello-world .
          -t: gives image a tag
        run it
          docker run -p 80:80 hello-world
            forward 80 on host to 80 on container
        file structure
          .: root
            /hello-world
              /src
            Dockerfile
          docker build hello-world
      Containers 101 Meetup - Docker Compose Version 2-Uez88TWOECg.mp4
        docker compose
          for multi-container docker apps
        ex
          chat app
            containers
              nodejs container: web
              mongodb container: mongo
            docker-compose.yml
              web
                build: .
                ports:
                  - 5000:5000
                links: 
                  - mongo
              mongo
                image: mongo
                # uses an image
                # doesn't build therefore
            run
              git clone ..demochat.git
              cd demochat/
                Dockerfile
              vim docker-compose.yml
              docker-compose build
                builds web container
                mongo container is an image
                images created:
                  demochat_web
                  mongo
              docker-compose up
                run containers
              docker-machine ip default
                ip of container
            stop
              docker-compose stop
              docker-compose rm
        docker compose v2
          yml structure
            version: '2'
            services
            networks 
            volumes
          ex:
            docker-compose.yml
              version: '2'
              services:
                web
                  build: .
                  ports:
                    - 5000:5000
                  links: 
                    - mongo
                mongo
                  image: mongo
        network
          we can create several networks
          each service can use any of them
      Create a Development Environment with Docker Compose by Mark Ranallo-Soh2k8lCXCA.mp4
        why use it?
          disposability and immutability
          multiple services
        dockerfile
          RUN a command
          ADD Gemfile ..
          WORKDIR change dir
          RUN bundle install
            just run command not during build
      Docker Tutorial - Docker Container Tutorial for Beginners-JBtWxj9l7zM.mp4
        basic commands
          docker run <image>
            every time you run, you create a new container
          docker start <name|id>
            starts existing container
          docker stop <name|id>
          docker ps [-a include stopped containers]
          docker rm <name|id>
        droplet
          get ip
          put into /etc/hosts
            ip docker.me
          ssh root@docker.me
        after ssh
        ssh1 window
          docker login
            login docker hub
          docker run tutum/hello-world
            pulls all layers
            this doesn't expose 80 to external world
          docker run -p 8080:80 tutum/hello-world
            http://docker.me:8080
          docker ps -a
            i have two copies of container
          docker rm ee2332342
        run 2 web servers and load balance
          docker run -d --name web1 -p 8081:80 tutum/hello-world
            -d: runs in background
          docker run -d --name web2 -p 8082:80 tutum/hello-world
      Docker Tutorial - What is Docker & Docker Containers, Images, etc-pGYAg7TMmp0.mp4
      Live In-Docker Debugging for Java with IntelliJ-sz5Zv5QQ5ek.mp4
      Part 6 - Linking and working with multiple containers to perform single operation-HY3WDz6j_hU.mp4
        mysql container
          docker pull mysql
          start a server instance
            docker run --name mysql01 -e MYSQL_ROOT_PASSWORD=abs -d mysql:latest
              mysql: image
              name: instance name: mysql01
              latest: tag, 5.7
        wordpress container
          docker pull wordpress
          start instance
            docker run --name wp01 --link mysql01:mysql -d wordpress
          expose some port
            -p 8080:80
            localhost:8080
        docker images
        docker ps -a
        docker port instanceid
      Part 7 - An Introduction to Docker Compose-k900NVwFfcA.mp4
        compose: for multi containers
        yml compose file: to configure services
          instead of cli commands like docker run --name .. --link .. -p ..
      Part 8 - Working with Multiple Containers using Docker Compose-UB3-qj2QA50.mp4
        yml file
        docker-compose ps
          nothing
        docker-compose up
      Docker Swarm Mode Walkthrough-KC4Ad1DS8xU.mp4
        you have docker on several vm/machines
        you manage them using swarm
        one of them is manager
          ssh docker-swarm-00
            docker swarm init --listen-addr 10.0.0.1
              becomes swarm manager
            docker node ls
              one node
          ssh docker-swarm-01
            docker swarm join 10.0.04:2377
              joins as worker
            docker node ls
              two nodes
        we work now on higher level than individual containers
          this level is called service level
            docker service create --replicas 2 nginx
              i want to start 2 nginx containers
      Using Docker to deploy Apache, Nginx, Wordpress and Nodejs containers with Digital Ocean-1OLyXJJPBSA.mp4
      Where are Docker images stored?
        http://blog.thoward37.me/articles/where-are-docker-images-stored/
        image vs dockerfile
          dockerfile is used to build the image
            when you run docker build
          docker uses images to run your code
          docker push: publishes an image
        registry vs index
          index manages stuff in public web
            such as: user accounts, permissions, search, tagging
          registry stores actual image assets
            it delegates authentication to index
          docker search: searches index, not registry
            index may access multiple registries
          docker push or docker pull: 
            index determines your permission to access
            index finds out in which registry image lives
            registry sends it down
          docker images: uses not index or registry, but a little of both
        repository
          repository vs registry
          repository vs image
          repository vs index username
          repository
            is all of them and not any of them
          when you do: docker build or docker commit
            you specify a name for image
            username/image_name
          when you docker push
            index checks if it has a matching repository
            if it does, it checks if you have access
            if so, you can push new version of the image
            a registry holds a collection of named repositories
              which are a collection of images
                tracked by GUIDs
              this is where tags come in
                you tag an image
                  and store multiple versions of that image
                    with different GUIDs
                    in a single named repository
                access different tagged versions of an image
                  username/image_name:tag
        local storage
          docker images
            where is this stuff?
              /var/lib/docker
            ex
              $ sudo cat /var/lib/docker/repositories | python -mjson.tool
              {
                  "Repositories": {
                      "ubuntu": {
                          "12.04": "8dbd9e392a964056420e5d58ca5cc376ef18e2de93b5cc90e868a1bbc8318c1c",
                          "12.10": "b750fe79269d2ec9a3c593ef05b4332b1d1a02a62b4accb2c21d589ff2f5f2dc",
            docker images
              REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
              ubuntu              12.04               8dbd9e392a96        8 months ago        131.3 MB (virtual 131.3 MB)
              ubuntu              latest              8dbd9e392a96        8 months ago        131.3 MB (virtual 131.3 MB)
            check: /var/lib/docker/graph
              $ sudo ls -al /var/lib/docker/graph
              total 24
              drwx------ 6 root root 4096 Nov 22 06:52 .
              drwx------ 5 root root 4096 Dec 13 04:25 ..
              drwxr-xr-x 3 root root 4096 Dec 13 04:26 27cf784147099545
              drwxr-xr-x 3 root root 4096 Nov 22 06:52 8dbd9e392a964056420e5d58ca5cc376ef18e2de93b5cc90e868a1bbc8318c1c
            what is actually stored?
              $ sudo ls -al /var/lib/docker/graph/8dbd9e392a964056420e5d58ca5cc376ef18e2de93b5cc90e868a1bbc8318c1c
              total 20
              drwxr-xr-x  3 root root 4096 Nov 22 06:52 .
              drwx------  6 root root 4096 Nov 22 06:52 ..
              -rw-------  1 root root  437 Nov 22 06:51 json
              drwxr-xr-x 22 root root 4096 Apr 11  2013 layer
              -rw-------  1 root root    9 Nov 22 06:52 layersize
            folders
              json: metadata about image
              layersize: size of layer
              layer/: holds rootfs for image
        DIY Dockerfiles
          FROM ubuntu
            ubuntu: image as our base layer
          docker build -t scooby_snacks .
            look for Dockerfile in `.`
            build it
            use name `scooby_snacks` for the repository
            docker puts it to: /var/lib/docker
          docker images
            scooby_snacks       latest              8dbd9e392a96        8 months ago        131.3 MB (virtual 131.3 MB)
            docker kept the same image id
          # now make a change
          RUN touch scooby_snacks.txt
          docker build -t scooby_snacks .
            docker gives a new image ID
          # delete repository
          docker rmi scooby_snacks
      How to Automate Docker Deployments
        http://paislee.io/how-to-automate-docker-deployments/
        deployment script
          to upgrade a running container to a newer version
          code
            #!/bin/bash
            docker pull docker.example.com/my-application:latest  
              pull latest image
            docker stop my-application  
              stop running container
            docker rm my-application  
              remove stopped container
            docker rmi docker.example.com/my-application:current  
              remove image behind stopped container
            docker tag docker.example.com/my-application:latest docker.example.com/my-application:current  
              tag newly downloaded image
            docker run -d --name my-application docker.example.com/my-application:latest  
              run new container
      Leanpub.Docker.for.Developers.pdf
        ch01 Working With Containers
          Mounting Host Directories
            ex: docker run
              mkdir testdir
              docker run -ti --rm
                -v `pwd`/testdir:/root
                ubuntu /bin/bash
              # testdir/ dizinini /root/ altına yükler
          Persisting Data with Data volumes
            ex
              docker run -ti --name x -v /root ubuntu /bin/bash
              # create some files
              exit
              docker start x
              docker attach x
              # files are here
          Data Containers
            make a container to store data only
              docker create -v /root --name docker4devs_data busybox
            busybox is a very small image
            let other containers use this data volume
              docker run \
                --rm -ti --volumes-from docker4devs_data \
                ubuntu /bin/bash
          Networking
            ex: create a php container
              dragonmantank@reorx:~$ mkdir -p networking/html
              dragonmantank@reorx:~$ echo '<?php phpinfo();' > networking/html/index.php dragonmantank@reorx:~$ cd networking/
              dragonmantank@reorx:~$ docker run \
              -d --name app_php -v `pwd`/html:/var/www/html \ php:fpm
            docker ps
              # exposing port 9000 on container
            learn ip by docker inspect
              dragonmantank@reorx:~$ docker inspect \
                  -f "{{.NetworkSettings.IPAddress}}" app_php
              172.17.0.16
      @mine: image-container-repository
        shell
          ❯ docker images
          REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
          demochat_web        latest              c19e1e8d9846        24 hours ago        405 MB
          hello2              latest              5e9576a653ca        26 hours ago        182 MB
          nginx               latest              6b914bbcb89e        13 days ago         182 MB
          mongo               latest              686238c7a975        2 weeks ago         402 MB
          hello-world         latest              48b5124b2768        8 weeks ago         1.84 kB
          node                0.10-slim           6a8ed129edb7        4 months ago        191 MB
          ❯ docker ps
          CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
          ❯ docker ps -a
          CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                    PORTS               NAMES
          2e6ebb86e474        hello2              "nginx -g 'daemon ..."   25 hours ago        Exited (0) 25 hours ago                       musing_kowalevski
          fcb9c1a495a7        hello2              "nginx -g 'daemon ..."   25 hours ago        Exited (0) 25 hours ago                       sleepy_kilby
          cf1af8fcb51f        hello2              "nginx -g 'daemon ..."   25 hours ago        Exited (0) 25 hours ago                       modest_spence
          141ccfa80179        nginx               "nginx -g 'daemon ..."   26 hours ago        Exited (0) 26 hours ago                       webserver
          d70267d8e34f        hello-world         "/hello"                 26 hours ago        Exited (0) 26 hours ago                       ecstatic_hodgkin
        uml
          [Layer| image_id; prev_image; ]
          [Repository| name; tag; ]
          [Container| id; name; ]
          [Image]
          [Image] 1-n [Layer]
          [Layer] prev_image n->1 [Layer]
          [Layer] 1-n [Repository]
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
      next
        docker image, instance, container vs. kavramların arasındaki ilişkiler net değil
          bunları çıkart ve yayınla
        R ile java docker'ını çağırıp sonucunu nasıl alırım?
          promise?
          rest?

## elastic

    Getting Started Tutorial
      https://www.elastic.co/guide/en/elasticsearch/guide/current/_installing_elasticsearch.html
    installing marvel
      ./bin/plugin -i elasticsearch/marvel/latest
    running
      ./bin/elasticsearch
    test
      curl 'http://127.0.0.1:9200/?pretty'
    talking to es
      for java
        a. node client
        b. transport client
      for rest
        curl -X<VERB> '<PROTOCOL>://<HOST>/<PATH>?<QUERY_STRING>' -d '<BODY>'
          verb: get, post, put, head, delete
          protocol: http, https
          host
          port
          query_string: ?pretty
          body: json body
            if request needs one
        ex
          query: _count
          body: query: { match_all: {}}
        shorthand format
          GET /_count
          {
            'query': {
              'match_all': {}
            }
          }
        shorter format
          get /_count
          match_all: {}
    Elasticsearch in 5 minutes
      http://www.elasticsearchtutorial.com/elasticsearch-in-5-minutes.html
    running
      elasticsearch
    test
      http://localhost:9200
    indexing data
      put some data
        curl -XPUT 'http://127.0.0.1:9200/blog/user/dilbert' -d '{ "name" : "Dilbert Brown" }'
      result
        {"_index":"blog","_type":"user","_id":"3","_version":1,"created":true}
      verify operations
        curl -XGET 'http://127.0.0.1:9200/blog/user/dilbert?pretty=true'
        curl -XGET 'http://127.0.0.1:9200/blog/post/1?pretty=true'
      searching
        curl 'http://127.0.0.1:9200/blog/post/_search?q=user:dilbert&pretty=true' 
          find all blog posts by user dilbert
        q=-title:search
          all posts which don't contain term search
        q=+title:search%20-title:distributed
          + search - distributed
        search by range on postDate
          curl -XGET 'http://localhost:9200/blog/_search?pretty=true' -d '
          {
              "query" : {
                  "range" : {
                      "postDate" : { "from" : "2011-12-10", "to" : "2011-12-12" }
                  }
              }
          }'

## ffmpeg
  video slideshow from image + audio
    ffmpeg -loop 1 -i slide001.jpg -i slide001.mp3 -c:v libx264 -c:a aac -strict experimental -b:a 192k -shortest slide001.mp4
    ffmpeg -loop 1 -framerate 2 -i input.png -i audio.ogg -c:v libx264 -preset medium -tune stillimage -crf 18 -c:a copy -shortest -pix_fmt yuv420p output.mkv
      optimized for youtube
      https://trac.ffmpeg.org/wiki/Encode/YouTube
  concatenating videos
    opt1
      ls *.mp4 | perl -ne 'print "file $_"' | ffmpeg -f concat -i - -c copy output.mp4
    opt2
      ls *.mp4 | perl -ne 'print "file $_"' | ffmpeg -i - -filter_complex \
      '[0:0] [0:1] [1:0] [1:1] [2:0] [2:1] \
       concat=n=3:v=1:a=1 [v] [a]' \
      -map '[v]' -map '[a]' output.mp4

## htop

    usage
      use mouse
        header columns to sort
      fn+up/dn: page scroll
      space: line scroll

## hugo id=g_10167

    hugo <url:file:///~/Dropbox/mynotes/content/code/ccode.md#r=g_10167>
    adding a theme
      cd themes
      git submodule add https://github.com/spf13/herring-cove 
      vim config.yaml
        # ++
        theme: herring-cove
    official documentation
      Quick Start
        http://gohugo.io/getting-started/quick-start/
        install
          brew install hugo
          hugo version
        new site
          hugo new site quickstart
        theme
          cd quickstart;\
          git init;\
          git submodule add https://github.com/budparr/gohugo-theme-ananke.git themes/ananke;\
          echo 'theme = "ananke"' >> config.toml
        add content
          hugo new posts/my-first-post.md
        start hugo with drafts enabled
          $ hugo server -D
          http://localhost:1313
        render
          hugo
        set draft=false in front parameters
        deploy
          rsync to server
      templates
        go template primer
          http://gohugo.io/templates/go-templates/
          basic syntax
            {{ foo }}
            {{ add 1 2 }}
              params separated by space
            {{ .Params.bar }}
              members access via dot
            {{ if or (isset .Params "alt").. }}
              parantheses to group items
          variables
            {{ .Title }}
            {{ $address := "123" }}
              defined new variable
          functions
            {{ add 1 2 }}
          includes
            /layout/
              location of templates
            {{ template "partials/header.html" . }}
              trailing dot: to pass along the current context
          logic
            iteration
              range
                using context
                  {{ range array }}
                    {{ . }}
                  {{ end }}
                using value
                  {{ range $element := array }}
                    {{ $element }}
                key-value
                  {{ range $index, $element := array }}
                    {{ $index }}
                    {{ $element }}
            conditionals
              if
                {{ if isset .Params "title" }}
                  {{ ... }}
          pipes
            ex1: no pipe
              {{ shuffle (seq 1 5) }}
            ex2: with pipe
              {{ (seq 1 5) | shuffle }}
          context (the dot)
            top level of template
              data set available
            inside iteration
              value of current item
            global context
              $.
          whitespace
            to trim whitespace around
              use -
              {{- .Title -}}
          hugo parameters
            content (page) parameters
              ex: hiding toc
                front matter
                  notoc: true
                usage
                  {{ if not .Params.notoc }}
            site (config) parameters
              ex: copyright footer
                config.yaml
                  params:
                    CopyrightHTML: "..."
                use
                  {{ if .Site.Params.CopyrightHTML }}
        single content template
        list of content
        homepage
          Homepage is a Page
          /layouts/index.html

## imagemagick

    split pdf into pages
      convert file.pdf image.png
        convert -quality 100 -density 300x300 -resize 1280x720 index.pdf slide%03d.jpg
        mogrify -quality 100 -density 300x300 -resize 1280x720\! *.jpg 
          forces resize to fixed dimensions
      use pdftk (better quality)
        http://unix.stackexchange.com/questions/14640/use-convert-to-grab-a-specific-page-from-a-pdf-file
    ghostscript
      gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -dFirstPage=3 -dLastPage=5 -sOUTPUTFILE=input.3_5.pdf index.pdf

## intellij

    live reload and hotswap
      LiveReload ve HotSwap <url:file:///~/Dropbox/mynotes/content/code/cjava/cjava.md#r=g_10147>
      LiveReload
        bu css/html/js güncellemelerini otomatik yükler
        ayarlamasını yapamadım
        maven ile çalıştırınca oldu
      HotSwap - Spring Boot Devtools
        bu compile edilmiş class kodlarını otomatik yükler
        https://dzone.com/articles/spring-boot-application-live-reload-hot-swap-with
        Settings > Build Compiler > Compiler > Build project automatically
    keybindings osx
      ^Space  code completion
      ^+space
      #p  parameter info
      ^n  new file/folder ...
    debugging js
      debug angularjs
        http://ignaciosuay.com/how-to-debug-angularjs-with-intellij/
        run > edit configurations > new > javascript debug
          url: http://localhost:8080
          Remote URLs:
            index.html = http://localhost:8080/index.html

## kafka

    run kafka server
      bin/zookeeper-server-start.sh config/zookeeper.properties
      bin/kafka-server-start.sh config/server.properties
      bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic test
      bin/kafka-topics.sh --list --zookeeper localhost:2181
      bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test
      bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic test --from-beginning
      ex2
        bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic page_visits
        bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic page_visits --from-beginning
        bin/kafka-console-producer.sh --broker-list localhost:9092 --topic page_visits
      ex3
        bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic outlier
        bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic outlier --from-beginning
    rkafka using kafka in R
      library("rkafka")
      creating a producer
        producer1=rkafka.createProducer("127.0.0.1:9092")
      sending message
        rkafka.send(producer1,"test","127.0.0.1:9092","Testing")
      creating a consumer
        consumer1=rkafka.createConsumer("127.0.0.1:2181","test")
      reading messages
        rkafka.read()
          one by one
        rkafka.readPoll()
          in batch
      close them
        rkafka.closeProducer(producer1)
        rkafka.closeConsumer(consumer1)
      simple consumer (didnt understand yet)
        consumer2=rkafka.createSimpleConsumer("172.25.1.78","9092","10000","100000","test")
        rkafka.receiveFromSimpleConsumer(consumer2,"test","0","0","100")
        print(rkafka.readFromSimpleConsumer(consumer2))
        rkafka.closeSimpleConsumer(consumer2)
      consumer 2
        consumer1=rkafka.createConsumer("127.0.0.1:2181","test")
        print(rkafka.read(consumer1))
        print(rkafka.readPoll(consumer1))
      test arguments
        
## moa

### Tutorial 1

  running gui
    java -cp moa.jar -javaagent:sizeofag.jar moa.gui.GUI
  running tasks
    configure > .select: task
    running on command line
      copy command > run on command line
  data streams evaluation
    requirements for data stream
      process an example at a time
      limited memory
      limited time
      predict any time
    accuracy over time
      holdout
      interleaved test-then-train or prequential
        test with each new example first
        then train the model with it
    ex1_1
      expl
        compare
          HoeffdingTree with NaiveBayes
        data stream
          RandomTreeGenerator 1M 
        accuracy
          interleaved
          sample frequency 10K
      cmd1
        java -cp moa.jar -javaagent:sizeofag.jar moa.DoTask \
          EvaluateInterleavedTestThenTrain \
          -l trees.HoeffdingTree \
          -s generators.RandomTreeGenerator -i 1000000 -f 10000
      cmd2
        java -cp moa.jar -javaagent:sizeofag.jar moa.DoTask \
          EvaluateInterleavedTestThenTrain \
          -l bayes.NaiveBayes \
          -s generators.RandomTreeGenerator -i 1000000 -f 10000
      opt
        use prequential
          java -cp moa.jar -javaagent:sizeofag.jar moa.DoTask \
            EvaluatePrequential \
            -l trees.HoeffdingTree \
            -s generators.RandomTreeGenerator -i 1000000 -f 10000
    ex1_2
      expl
        same but use 3 different evaluations
          periodic held out with 1000 for testing
          interleaved test
          perquential with sliding window of 1000 
      cmd1
        EvaluatePeriodicHeldOutTest -i 1000 -f 10000
      me
        use with ./runmoa
          ./runmoa EvaluatePeriodicHeldOutTest -i 1000 -f 10000
  drift stream generators
    streams built using
      generators
      arff files
      joining several streams
      filtering streams
    concept drift stream
      cmd
        EvaluatePeriodicHeldOutTest -s (ConceptDriftStream -s (generators.AgrawalGenerator -f 7) -d (generators.AgrawalGenerator -f 2) -p 900000 -w 1000000) -i 1000 -f 10000
  learning and evaluating models
    moa.DoTask
      running tasks
      args
        name of task
          LearnModel
            -l learner
              HoeffdingTree
        stream to learn from
          -s
            generators.WaveformGenerator
        max. number of examples to train
          -m
        output
          -O
    ex 1
      expl
        learning using HoeffdingTree
        streaming data using WaveformGenerator
        output model: model1.moa
      cmd
        java -cp moa.jar -javaagent:sizeofag.jar moa.DoTask \
          LearnModel -l trees.HoeffdingTree \
          -s generators.WaveformGenerator -m 1000000 -O model1.moa    
    ex 2
      expl
        evaluate model using different seed
        load model -m
        generate a new stream with seed 2
          nesting parameters using brackets
      cmd
        java -cp moa.jar -javaagent:sizeofag.jar moa.DoTask \
          "EvaluateModel -m file:model1.moa \
          -s (generators.WaveformGenerator -i 2) -i 1000000"
    ex 3
      expl
        do the previous steps in one step
          without an external file
      cmd
        java -cp moa.jar -javaagent:sizeofag.jar moa.DoTask \
          "EvaluateModel \
            -m (LearnModel -l trees.HoeffdingTree \
            -s generators.WaveformGenerator -m 1000000) \
          -s (generators.WaveformGenerator -i 2) -i 1000000"
    ex 4
      expl
        EvaluatePeriodicHeldOutTest
          train model while taking snapshots
          using heldout test set at periodic intervals
      cmd
        java -cp moa.jar -javaagent:sizeofag.jar moa.DoTask \
          "EvaluatePeriodicHeldOutTest \
            -l trees.HoeffdingTree \
            -s generators.WaveformGenerator \
            -n 100000 -i 10000000 -f 1000000" > dsresult.csv
              use first 100K for testing
              train on 100M
              test every 1M 

### Tutorial 2

  using API
    project
      /Users/mertnuhoglu/projects/study/java/moa_tutorial2/
    
  Massive online data stream mining with R 
  link
    http://bnosac.be/index.php/blog/26-massive-online-data-stream-mining-with-r
  description
    using Moa clustering from R
    
## mongodb

    export/import
      dump all db
        mongodump -d <database_name> -o <directory_backup>
        mongorestore -d <database_name> <directory_backup>
    mongo setup
      mongo --port 27017 -u "administrator" -p "12345" --authenticationDatabase "admin"
        use movies
        db.createUser({ user: "myUserAdmin", pwd: '12345', roles: ["readWrite"] });
      mongo --port 27017 -u "myUserAdmin" -p "12345" movies
        use movies
        db.temp.insert({"a":"b"})
      mongo --port 27017 -u "administrator" -p "12345" --authenticationDatabase "admin"
        show dbs
    docker mongodb
      to persist mongodb: use data volume
        -v "./mongo/jtn/db:/data/db"
        /data/db is where mongodb expects the data files to be stored
    refcard mongodb dzone
      https://dzone.com/asset/download/174
      help
        $ help
          db.help()
          db.mycoll.help()
        source code of any function:
          $ db.someFunction
      edit
        for multiline editing in shell
          x = function() {
          edit x
      .mongorc.js: initial startup script
        ex: remove dropDatabase()
          DB.prototype.dropDatabase = function() {
            print("no dropping dbs")
          }
          db.dropDatabase = DB.prototype.dropDatabase
      diagnosing
        viewing and killing operations
          db.currentOp()
          db.killOp(123)
        index usage
          explain(): which index is used for a query
            $ db.foo.find(criteria).explain()
      query format
        general form
          {key: {$op: value}}
          {age: {$gte: 18}}
          exceptions: $and $or $nor
          {$or: [{age: {$gte: 18}}, {age: {$lt: 18}}]}
      update format
        general form
          {key: {$mod: value}}
          {age: {$inc: 1}}
      query operators
        $gt $gte $lt $lte $ne
          {numSold: {$lt:3}}
        $in $nin
          {age: {$in:[10,14,21]}}
          # bir tanesinin eşleşmesi yeterli
            {age:[9,10,11]}
        $all
          {hand: {$all: ["10","J"]}}
          match:
            {hand:["10","A","J"]}
        $not
          {name: {$not: /jon/i}}
          match
            {name: "Jon"}
        $mod
          {age: {$mod: [10,0]}}
          match
            {age:50}
        $exists
          {phone: {$exists:true}}
          match:
            {phone: "323"}
        $type
          {age: {$type:2}}
          match: {age:"42"}
          nonmatch: {age:42}
        $size
          {"top-three":{$size:3}}
          match: {"top-three": ["gold", "sil", "brn"]}
        $regex
          {role: /admin.*/i}
          {role: {$regex:'admin.*', $options:'i'}}
      update modifiers
        /Users/mertnuhoglu/Dropbox/public/img/ss-203.png
        modifiers
          $set $unset $inc $push $pushAll $pull $pullAll $pop $addToSet $each $rename $bit
        ex
          | modifier         | start doc                       | example                            | end doc                 |
          | $set             | {x:"foo"}                       | {$set:{x:[1,2,3]}}                 | {x:[1,2,3]}             |
          | $unset           | {x:"foo"}                       | {$unset:{x:true}}                  | {}                      |
          | $inc             | {countdown:5}                   | {$inc:{countdown:-1}}              | {countdown:4}           |
          | $push, $pushAll  | {votes:[-1,-1,1]}               | {$push:{votes:-1}}                 | {votes:[-1,-1,1,-1}}    |
          | $pull, $pullAll  | {blacklist:["ip1","ip2","ip3"]} | {$pull:{blacklist:"ip2"}}          | {blacklist:"ip1","ip3"} |
          | $pop             | {queue:["1pm","3pm","8pm"]}     | {$pop:{queue:-1}}                  | {queue:["3pm","8pm"]}   |
          | $addToSet, $each | {ints:[0,1,3,4]}                | {$addToSet:{ints:{$each:[1,2,3]}}} | {ints:[0,1,2,3,4]}      |
          | $rename          | {nmae:"sam"}                    | {$rename:{nmae:"name"}}            | {name:"sam"}            |
          | $bit             | {permission:6}                  | {$bit:{permissions:{or:1}}}        | {permission:7}          |
      aggregation pipeline operators
        performs complex aggregations and also simple queries
        operators
          $project $match $limit $skip $sort $group $unwind $redact $out
        ex
          db.collection.aggregate({$match:{x:1}},
            {$limit:10},
            {$group:{_id: "$age"}})
        ex
          {$project: {"new name": "$old_name"}}
      user management
        check current user priviliges
          db.runCommand(
            {
              usersInfo:"myUserAdmin",
              showPrivileges: true
            }
          )
        create a superadmin
          use admin
          db.createUser(
            {
              user: “myUserAdmin”,
              pwd: “12345”,
              roles:
              [
                {
                  role: “userAdmin”,
                  db: “movies”
                }
              ]
            }
          )
    refcard mongodb official
      mongodb_qrc_booklet.pdf
      queries
        {"a.b": 10}
          b nested in a
        {a: {$elemMatch: {b: 1, c:2}}}
          b, c nested in a
        {$or: [{a:1}, {b: 2}]}
        {a: /^m/}
      sql to mongodb
        terms
          table = collection
          row = document
          column = field
          joining = embedding & linking
        commands
          CREATE TABLE users (..)
            db.createCollection("users")
          INSERT INTO users VALUES ('Bob', 32)
            db.users.insert({name: "Bob", age: 32})
          SELECT * FROM users 
            db.users.find()
          SELECT name, age FROM users
            db.users.find({}, {name: 1, age: 1, _id:0})
          SELECT name, age FROM users WHERE age = 33
            db.users.find({age: 33}, {name: 1, age: 1, _id:0})
          SELECT * FROM users WHERE age > 33
            db.users.find({age: {$gt: 33}})
          SELECT * FROM users WHERE age > 33 and name = 'Bob'
            db.users.find({$and: [{age: {$gt: 33}}, {name: "Bob"}]})
          SELECT * FROM users WHERE age = 33 ORDER BY name ASC
            db.users.find({age: 33}).sort({name: 1})
          SELECT * FROM users ORDER BY name DESC
            db.users.find().sort({name: -1})
          SELECT * FROM users WHERE name LIKE 'Joe%'
            db.users.find({name: /^Joe/})
          SELECT * FROM users LIMIT 10 SKIP 20
            db.users.find().skip(20).limit(10)
          SELECT DISTINCT name FROM users 
            db.users.distinct("name")
          SELECT COUNT(*) FROM users 
            db.users.count()
          SELECT COUNT(*) FROM users WHERE AGE > 30
            db.users.find({age: {$gt: 30}}).count()
          SELECT COUNT(AGE) FROM users 
            db.users.find({age: {$exists: true}}).count()
          UPDATE users SET age = 33 WHERE name = 'Bob'
            db.users.update({name: "Bob"}, {$set: {age: 33}}, {multi: true})
          UPDATE users SET age = age + 2 WHERE name = 'Bob'
            db.users.update({name: "Bob"}, {$inc: {age: 2}}, {multi: true})
          DELETE FROM users WHERE name = 'Bob'
            db.users.remove({name: "Bob"})
          CREATE INDEX ON users (name ASC)
            db.users.ensureIndex({name: 1})
          CREATE INDEX ON users (name ASC, age DESC)
            db.users.ensureIndex({name: 1, age: -1})
          EXPLAIN SELECT * FROM users WHERE age = 32
            db.users.find({age: 32}).explain()
      replication
        what is replication
          duplicating data from one system to another
          replica set: a primary and multiple secondaries
          provide automatic failover and recovery
      indexes
        db.users.getIndexes()
          get a list of all indexes
        db.users.totalIndexSize()
          size of indexes
        db.users.reIndex()
          rebuild all indexes
        db.users.dropIndex(..)
      bson types
        string 2
        array 4
        binary 5
        date 9
    https://www.hacksparrow.com/the-mongodb-tutorial.html
      ex
        use movies
        db.temp.insert({"a":"b"})
        db.getName()
          movies
        show collections
          temp
        list collections
          db.getCollectionNames()
            ["temp"]
      databases are created lazily. 
        "use movies" => movies db is created when you insert something
      ex
        db.comedy.insert({name:"Bill & Ted's Excellent Adventure", year:1989})
      db: refers to database selected with `use` command
      create
        ex: insert
          db.comedy.insert({name:"Wayne's World", year:1992})
          db.comedy.insert({name:'The School of Rock', year:2003})
        ex: save
          db.comedy.save({name:"Wayne's World", year:1992})
          db.comedy.save({name:'The School of Rock', year:2003})
        difference: save vs insert
          insert: always add a  new document
          save: insert if no _id key, else update
        use: insert and update not save
      read
        ex: find()
          db.comedy.find()
          db.comedy.find().limit(2)
          db.comedy.findOne()
        ex: conditions
          db.comedy.find({year:{$lt:1994}})
        conditional operators
          $lt - ' $lte - ' $gte - '>='
          $ne - '!='
          $in - 'is in array'
          $nin - '! in array'
        ex: equal to
          db.comedy.find({year: 1992})
        ex: regex
          db.comedy.find({name:{$regex: /bill|steve/i}})
        ex: regex 2
          var names = ['bill', 'steve']
          names = names.join('|');
          var re = new RegExp(names, 'i')
          db.comedy.find({name:{$regex: re}})
        ex: projection
          db.comedy.find({year:{'$lt':1994}}, {name:true})
        ex: insert
          db.articles.insert({title:'The Amazingness of MongoDB', meta:{author:'Mike Vallely', date:1321958582668, likes:23, tags:['mongo', 'amazing', 'mongodb']}, comments:[{by:'Steve', text:'Amazing article'}, {by:'Dave', text:'Thanks a ton!'}]})
          db.articles.insert({title:'Mongo Business', meta:{author:'Chad Muska', date:1321958576231, likes:10, tags:['mongodb', 'business', 'mongo']}, comments:[{by:'Taylor', text:'First!'}, {by:'Rob', text:'I like it'}]})
          db.articles.insert({title:'MongoDB in Mongolia', meta:{author:'Ghenghiz Khan', date:1321958598538, likes:75, tags:['mongo', 'mongolia', 'ghenghiz']}, comments:[{by:'Alex', text:'Dude, it rocks'}, {by:'Steve', text:'The best article ever!'}]})
        ex: nested search using dot
          db.articles.find({'meta.author':'Chad Muska'})
          db.articles.find({'meta.likes':{$gt:10}})
        ex: query array
          db.articles.find({'meta.tags':'mongolia'})
        ex: object inside an array
          db.articles.find({'comments.by': 'Steve'})
        ex: refer array indexes
          db.articles.find({'comments.0.by': 'Steve'})
        ex: array with elemMatch
          db.articles.find({'comments': {$elemMatch: {'by': 'Steve'}}}).pretty()
          ===
          db.articles.find({'comments.by': 'Steve'}).pretty()
        ex: multiple criteria with elemMatch
          db.articles.find({'comments': {$elemMatch: {'by': 'Steve', text: /best/i}}}).pretty()
        ex: js expression
          db.comedy.find('this.year > 1990 && this.name != "The School of Rock"')
          ===
          db.comedy.find({year:{$gt:1990}, name:{$ne:'The School of Rock'}})
        ex: js and where expression
          db.comedy.find({$where: 'this.year > 2000'})
      update
        ex: 
          db.comedy.update({name:"Bill & Ted's Excellent Adventure"}, {'$set':{director:'Stephen Herek', cast:['Keanu Reeves', 'Alex Winter']}})
        ex: push to array
          db.comedy.update({name:"Bill & Ted's Excellent Adventure"}, {'$push':{cast:'George Carlin'}})
          db.comedy.update({name:"Bill & Ted's Excellent Adventure"}, {'$push':{cast:'Chuck Norris'}})
        ex: delete from array
          db.comedy.update({name:"Bill & Ted's Excellent Adventure"}, {'$pull':{cast:'Chuck Norris'}})
      delete
        ex: from one document
          db.comedy.update({name:'Hulk'}, {$unset:{cast:1}})
        ex: from all documents
          db.comedy.update({$unset:{cast:1}}, false, true)
        ex: delete whole document
          db.comedy.remove({name:'Hulk'})
        ex: empty collection
          db.comedy.remove()
        ex: delete collection
          db.comedy.drop()
        ex: drop database
          db.dropDatabase()
    Store a JavaScript Function on the Server
      https://docs.mongodb.com/manual/tutorial/store-javascript-function-on-server/
      not: tavsiye edilmiyor: performans ve yönetim zorluğundan
      ex
        db.system.js.save(
           {
             _id: "echoFunction",
             value : function(x) { return x; }
           }
        )
    group by 
      https://www.mkyong.com/mongodb/mongodb-aggregate-and-group-example/
        test data
          { "_id" : 1, "domainName" : "test1.com", "hosting" : "hostgator.com" }
          { "_id" : 2, "domainName" : "test2.com", "hosting" : "aws.amazon.com"}
        ex: $group
          code
            db.website.aggregate( {
              $group : {_id : "$hosting", total : { $sum : 1 }}
                }
              );
          output
            {
              "result" : [ 
                { 
                  "_id" : "godaddy.com",
                  "total" : 1
                },
          sql:
            SELECT hosting, SUM(hosting) AS total
                   FROM website
                   GROUP BY hosting
    group by and take first document
      https://docs.mongodb.com/manual/reference/operator/aggregation/first/
        test data
          { "_id" : 1, "item" : "abc", "price" : 10, "quantity" : 2, "date" : ISODate("2014-01-01T08:00:00Z") }
          { "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "date" : ISODate("2014-02-03T09:00:00Z") }
        query
          db.sales.aggregate(
             [
               { $sort: { item: 1, date: 1 } },
               {
                 $group:
                   {
                     _id: "$item",
                     firstSalesDate: { $first: "$date" }
                   }
               }
             ]
          )
        output
          { "_id" : "xyz", "firstSalesDate" : ISODate("2014-02-03T09:05:00Z") }
    ex: update
      db.products.update(
         { _id: 100 },
         { $set:
            {
              quantity: 500,
              details: { model: "14Q3", make: "xyz" },
              tags: [ "coats", "outerwear", "clothing" ]
            }
         }
      )
    delete/remove user
      use dentas
      db.dropUser("myUserAdmin")
    convert String field to Date field in mongodb id=g_10148
      make date from validFrom
        var validFrom = "1.4.2017"
        var ad = new Date(validFrom)
        opt1:
          function stringToDate(_date,_format,_delimiter)
          {
                      var formatLowerCase=_format.toLowerCase();
                      var formatItems=formatLowerCase.split(_delimiter);
                      var dateItems=_date.split(_delimiter);
                      var monthIndex=formatItems.indexOf("mm");
                      var dayIndex=formatItems.indexOf("dd");
                      var yearIndex=formatItems.indexOf("yyyy");
                      var month=parseInt(dateItems[monthIndex]);
                      month-=1;
                      var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
                      return formatedDate;
          }
          stringToDate("17/9/2014","dd/MM/yyyy","/");
          stringToDate("9/17/2014","mm/dd/yyyy","/")
          stringToDate("9-17-2014","mm-dd-yyyy","-")
      opt1: https://stackoverflow.com/questions/34837489/how-can-convert-string-to-date-with-mongo-aggregation
        var cursor = db.collection.find({"validFrom": {"$exists": true, "$type": 2 }}),
            bulkOps = [];
        cursor.forEach(function (doc) { 
            var newDate = new Date(doc.validFrom);
            bulkOps.push(         
                { 
                    "updateOne": { 
                        "filter": { "_id": doc._id } ,              
                        "update": { "$set": { "validFrom": newDate } } 
                    }         
                }           
            );   
            if (bulkOps.length === 1000) {
                db.collection.bulkWrite(bulkUpdateOps);
                bulkOps = [];
            }
        });         
        if (bulkOps.length > 0) { db.collection.bulkWrite(bulkOps); }
      save date into mongodb
        opt1: js
          https://stackoverflow.com/questions/24483727/how-to-insert-a-document-with-date-in-mongo
          db.example.insert({"date":ISODate("2016-03-03T08:00:00.000")});

## nginx id=ccd_0004
  
    nginx <url:#r=ccd_0004>
    ref
      SSL/TLS certificates <url:#r=ccd_0003>
    HSTS: cache for browsers to remember to not try http instead of https
      add_header Strict-Transport-Security "max-age=31536000";
      # about 1 year
    alias: replacement for location
      http://nginx.org/en/docs/http/ngx_http_core_module.html#alias
      ex
        location /i/ {
            alias /data/w3/images/;
        }
        # on request of “/i/top.gif”, the file /data/w3/images/top.gif will be sent
    path for nginx web root
      depends on nginx.conf
      ex: 
        /etc/nginx/nginx.conf
          server {
            listen 80;
            server_name _; #
            location / {
              root /srv/;
        -->
        /srv/
    ssl nginx
      ref
        SSL/TLS certificates <url:#r=ccd_0003>
      Lets Encrypt with an nginx reverse proxy
        https://serverfault.com/questions/768509/lets-encrypt-with-an-nginx-reverse-proxy#784940
        ans
          you can have nginx proxy requests to HTTP servers, and then itself respond to clients over HTTPS
          getting certificate
            modify "server" clause for ".well-known" subdirectory
            server {
                listen 80;
                server_name sub.domain.com www.sub.domain.com;
                […]
                location /.well-known {
                        alias /var/www/sub.domain.com/.well-known;
                }
                location / {
                    # proxy commands go here
                    […]
                }
            }
            certbot with webroot plugin
              certbot certonly --webroot -w /var/www/sub.domain.com/ -d sub.domain.com -d www.sub.domain.com
          configurign nginx to use certificate
            server {
                listen 443 ssl;
                # if you wish, you can use the below line for listen instead
                # which enables HTTP/2
                # requires nginx version >= 1.9.5
                # listen 443 ssl http2;
                server_name sub.domain.com www.sub.domain.com;
                ssl_certificate /etc/letsencrypt/live/sub.domain.com/fullchain.pem;
                ssl_certificate_key /etc/letsencrypt/live/sub.domain.com/privkey.pem;
                # Turn on OCSP stapling as recommended at 
                # https://community.letsencrypt.org/t/integration-guide/13123 
                # requires nginx version >= 1.3.7
                ssl_stapling on;
                ssl_stapling_verify on;
                # Uncomment this line only after testing in browsers,
                # as it commits you to continuing to serve your site over HTTPS
                # in future
                # add_header Strict-Transport-Security "max-age=31536000";
                access_log /var/log/nginx/sub.log combined;
                # maintain the .well-known directory alias for renewals
                location /.well-known {
                    alias /var/www/sub.domain.com/.well-known;
                }
                location / {
                    # proxy commands go here as in your port 80 configuration
                    […]
                }
            }
            service nginx reload
            test:
              https://sub.domain.com
          Redirect HTTP requests to HTTPS
            replace port 80 server clause with:
              server {
                  listen 80;
                  server_name sub.domain.com www.sub.domain.com;
                  rewrite     ^   https://$host$request_uri? permanent;
              }
      How To Use Certbot Standalone Mode to Retrieve Let's Encrypt SSL Certificates
        https://www.digitalocean.com/community/tutorials/how-to-use-certbot-standalone-mode-to-retrieve-let-s-encrypt-ssl-certificates
        install certbot
          sudo add-apt-repository ppa:certbot/certbot
          sudo apt-get update
          sudo apt-get install certbot
          sudo certbot certonly --standalone --preferred-challenges http -d example.com
            The --preferred-challenges option instructs Certbot to use port 80 or port 443. If you're using port 80, you want --preferred-challenges http. For port 443 it would be --preferred-challenges tls-sni
        renewal
          sudo nano /etc/letsencrypt/renewal/example.com.conf
            renew_hook = systemctl reload rabbitmq
      How To Secure Nginx with Let's Encrypt on Ubuntu 16.04
        https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04
        install certbot
          # not in debian:
            sudo add-apt-repository ppa:certbot/certbot
          sudo apt-get update
          sudo apt-get install python-certbot-nginx
        setup nginx
          sudo nano /etc/nginx/sites-available/default
            server_name example.com www.example.com;
          sudo nginx -t
          sudo systemctl reload nginx
        allow https through firewall
          sudo ufw status
          sudo ufw allow 'Nginx Full'
          sudo ufw delete allow 'Nginx HTTP'
        get ssl certificate
          sudo certbot --nginx -d example.com -d www.example.com
        certbot auto-renewal
          sudo certbot renew --dry-run
          sudo certbot renew 
      Setting up SSL with nginx (using a NameCheap EssentialSSL wildcard certificate on DigitalOcean) - Aral Balkan
        https://ar.al/scribbles/setting-up-ssl-with-nginx-using-a-namecheap-essentialssl-wildcard-certificate-on-digitalocean/
        on development machine
          # create private key
          openssl genrsa 2048 > key.pem
          # create a key to use for forward secrecy
          openssl dhparam -out dhparams.pem 2048
          # create signing request
          openssl req -new -key key.pem -out csr.pem
          # buy EssintialSSL wildcard certificate from Namecheap
          # send csr.pem content to the form on Namecheap
          # create certificate bundle
          # you will get:
            STAR_yourdomain_ext.crt
            COMODORSADomainValidationSecureServerCA.crt
            COMODORSAAddTrustCA.crt
            AddTrustExternalCARoot.crt
          # bundle them
          cat STAR_yourdomain_ext.crt COMODORSADomainValidationSecureServerCA.crt COMODORSAAddTrustCA.crt AddTrustExternalCARoot.crt > bundle.cer
        on server
          # place private key and certificate bundle
          # copy keys
          sudo mkdir /etc/nginx/ssl
          sudo vim /etc/nginx/ssl/bundle.cer
          # copy paste
          sudo vim /etc/nginx/ssl/key.pem
          # copy paste
          sudo chmod 600 /etc/nginx/ssl
          opt: put /etc/nginx under git
        configuring nginx
          sudo vim /etc/nginx/sites-available/default
            server {
              listen 80;
              server_name yourdomain.ext;
              return 301 https://yourdomain.ext$request_uri;
            }
            server {
              listen 80;
              server_name www.yourdomain.ext;
              return 301 https://yourdomain.ext$request_uri;
            }
            server {
              listen 443 ssl;
              listen [::]:443 ipv6only=on;
              ssl_certificate ssl/bundle.cer;
              ssl_certificate_key ssl/key.pem;
              root /path/to/the/root/of/your/site;
              index index.html index.htm;
              # Make site accessible from http://localhost/
              server_name yourdomain.ext;
              location / {
              # More lines…
        perfect forward secrecy and hsts
          server {
            # …
            # Perfect forward secrecy
            ssl_prefer_server_ciphers on;
            ssl_dhparam /etc/nginx/ssl/dhparams.pem;
            ssl_ciphers "EECDH+ECDSA+AESGCM EECDH+aRSA+AESGCM EECDH+ECDSA+SHA384 EECDH+ECDSA+SHA256 EECDH+aRSA+SHA384 EECDH+aRSA+SHA256 EECDH+aRSA+RC4 EECDH EDH+aRSA RC4 !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS !RC4";
            # HSTS
            add_header Strict-Transport-Security "max-age=31536000; includeSubdomains";
            # …
          }
          # what is HSTS (HTTP Strict Transport Security)
            The ‘max-age’ values specifies how long, in seconds, you want the client to treat you as a HSTS host. That is, how long you want them to contact you using HTTPS exclusively. The value I’m using here is 1 year and each time the client visits my site and receives the header, the timer is reset back to a year. Assuming your browser is HSTS compliant, after the first page load over HTTPS, you will no longer be able to communicate with me via HTTP, the browser will prevent it
        fixing poodle vulnerability in ssl3
          # disable ssl3.0
          ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        nginx.conf
          sudo nano /etc/nginx/nginx.conf
          # uncomment
          server_names_hash_bucket_size 64;
          sudo service nginx reload
        file locations
          nginx’s configuration files are in:
          /etc/nginx
          nginx config file:
          /etc/nginx/nginx.conf
          The default site is served from:
          /usr/share/nginx/html
          Default site config info:
          /etc/nginx/sites-available/default
      How To Create an SSL Certificate on Nginx for Ubuntu 14.04
        https://www.digitalocean.com/community/tutorials/how-to-create-an-ssl-certificate-on-nginx-for-ubuntu-14-04
        install nginx 
          apt-get update
          apt-get install nginx
        get a certificate
          sudo mkdir /etc/nginx/ssl
          # self signed
          sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt
          # out:
            nginx.key
              private key
            nginx.crt
              certificate
        configure nginx
          # nginx.conf
            server {
                    listen 80 default_server;
                    listen [::]:80 default_server ipv6only=on;
                    listen 443 ssl;
                    root /usr/share/nginx/html;
                    index index.html index.htm;
                    server_name your_domain.com;
                    ssl_certificate /etc/nginx/ssl/nginx.crt;
                    ssl_certificate_key /etc/nginx/ssl/nginx.key;
                    location / {
                            try_files $uri $uri/ =404;
                    }
            }
        testing
          http://server_domain_or_IP
          https://server_domain_or_IP
      How To Configure Nginx with SSL as a Reverse Proxy for Jenkins
        https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-with-ssl-as-a-reverse-proxy-for-jenkins
        install nginx
          apt-get update
          apt-get install nginx
          nginx -v
        get a certificate
          cd /etc/nginx
          # self signed certificate
          sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/cert.key -out /etc/nginx/cert.crt
          # output:
            cert.key
            cert.crt
        edit nginx config
          sudo vim /etc/nginx/sites-enabled/default
            server {
                listen 443;
                server_name jenkins.domain.com;
                ssl_certificate           /etc/nginx/cert.crt;
                ssl_certificate_key       /etc/nginx/cert.key;
                ssl on;
                ssl_session_cache  builtin:1000  shared:SSL:10m;
                ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
                ssl_ciphers HIGH:!aNULL:!eNULL:!EXPORT:!CAMELLIA:!DES:!MD5:!PSK:!RC4;
                ssl_prefer_server_ciphers on;
                access_log            /var/log/nginx/jenkins.access.log;
                location / {
                  proxy_set_header        Host $host;
                  proxy_set_header        X-Real-IP $remote_addr;
                  proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
                  proxy_set_header        X-Forwarded-Proto $scheme;
                  # Fix the “It appears that your reverse proxy set up is broken" error.
                  proxy_pass          http://localhost:8080;
                  proxy_read_timeout  90;
                  proxy_redirect      http://localhost:8080 https://jenkins.domain.com;
                }
              }
    reload restart nginx
      nginx -s signal
      Where signal may be one of the following:
        stop — fast shutdown
        quit — graceful shutdown
        reload — reloading the configuration file
        reopen — reopening the log files
        nginx -s reload
      start
        nginx -g daemon off
    resolver
      Configures name servers used to resolve names of upstream servers into addresses, for example:
      resolver 127.0.0.1 [::1]:5353;
    error: 413 (Request Entity Too Large)
      POST yaptığım request kabul edilmiyor
      sebep:
        nginx varsayılan olarak 1M'nin üstündeki payload'ları reddediyor
      solution
        https://www.daveperrett.com/articles/2009/11/18/nginx-error-413-request-entity-too-large/
        nginx
          server {
              client_max_body_size 20M;
    error: 503 Service Temporarily Unavailable
      nginx loglarını debug et
      muhtemelen route işlemlerinde eksik vardır
      ex: dc.yml'de VIRTUAL_HOST silinmiş
    error: 502 bad gateway
      ex: nginx'e gelen request, java'ya iletilmiyor
        docker-compose.yml'da java'nın dahili portunu 8090 yapmışım. nginx ise 8080'e yönlendirmeye çalıştığından bulamıyor.
        nasıl debug ettim?
          nginx'in loglarına bak
            docker logs nginx
            hata logları
              2017/09/12 18:14:04 [error] 6#6: *247 connect() failed (111: Connection refused) while connecting to upstream, client: 172.18.0.2, server: dentasrotaplandev.i-terative.com, request: "GET / HTTP/1.1", upstream: "http://34.251.15.137:8100/", host: "dentasrotaplandev.i-terative.com"
              172.18.0.2 - - [12/Sep/2017:18:14:04 +0000] "GET / HTTP/1.1" 502 575 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36 OPR/47.0.2631.80" "94.55.173.59"
            explain
              request nginx'e gelmiş
              o is upstream'e yani 34...:8100 adresine yönlendirmeye çalışmış ama bulamamış
              yani java uygulama sunucusu yanıt vermemiş
    authentication in nginx
      https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-nginx-on-ubuntu-14-04
        shell
          apt-get update
          apt-get install apache2-utils
          htpasswd -cb /etc/nginx/.htpasswd manager s6EcRuxe
          htpasswd -b /etc/nginx/.htpasswd iterative iterative
          vim /etc/nginx/nginx.conf
            # inside server {}
            auth_basic "Restricted Content";
            auth_basic_user_file /etc/nginx/.htpasswd;
        make .htpasswd file once then you can just use it without installing htpasswd app
          docker run -p 80:80 --name ng -v /home/ec2-user/.htpasswd:/etc/nginx/.htpasswd -v /home/ec2-user/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx
    nginx: cors
      https://stackoverflow.com/questions/10636611/how-does-access-control-allow-origin-header-work
      https://enable-cors.org/server.html
      nginx.conf
        server {
            listen 80;
            server_name jotunboya.i-terative.com;
            location / {
                proxy_pass http://jotunboya.i-terative.com:3000;
                proxy_set_header Host $host;
                proxy_set_header 'Access-Control-Allow-Origin' 'http://jotunboya.i-terative.com';
                proxy_set_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
                proxy_set_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
                proxy_set_header 'Access-Control-Expose-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
            }   
        }
      https://stackoverflow.com/questions/35553500/xmlhttprequest-cannot-load-https-www-website-com
      https://stackoverflow.com/questions/10636611/how-does-access-control-allow-origin-header-work
        Site A
        Site B
        Site A tries to fetch content from Site B
        Site B sends "Access-Control-Allow-Origin" response header
          that tells browser the origins that can access
        To allow it, Site B sends response header:
          Access-Control-Allow-Origin: http://siteA.com
      opt2: nginx configuration
        proxy_set_header 'Access-Control-Allow-Origin' 'http://api.mysite.com';
    Setting up webservers with Nginx
      https://www.youtube.com/watch?v=7QXnk8emzOU
      performance
        worker processes = number of cpu cores
      ex
        server {
          listen 80;
          server_name _; # 
          location / {
            root /test/a/;
            index index.htm;
            # ex: localhost -> redirects to index.htm
            autoindex on; # automatically shows directory contents
          }
        }
      proxying:
        shellinabox: works as login terminal
          runs on 4200 port
        ex:
          location /shbox/ { # redirects all requests to /shbox
            proxy_pass http://127.0.0.1:4200; # redirect all /shbox requests to :4200 
          }
      ssl:
        server {
          listen 443;
          server_name _;
          ssl on;
          ssl_certificate /etc/ssl/private/bck.me.pem;
          ssl_certificate_key ..;
      vhosting (virtual host)
        ex
          server {
            listen 80;
            server_name _; # default server
            location / {
              root /test/a/;
              index index.htm;
            }
          }
          server {
            listen 80;
            server_name example_org; # specific domain
            location / {
              root /test/b/;
              index index.htm;
            }
          }
    Nginx Tutorial - Jakob Jenkov
      http://tutorials.jenkov.com/nginx/index.html
      starting nginx
        /etc/init.d/nginx start
      check if nginx is running
        htop
      original configuration file
    Beginner’s Guide - Nginx
      http://nginx.org/en/docs/beginners_guide.html
      starting, stopping, reloading
        once nginx is started, use:
          nginx -s signal
          signal:
            stop, quit, reload, reopen
      configuration file's structure
        directives:
          simple directives: one line
          block directives: {} braces
            some have other directives inside
              called context: events, http, server, location
        directives outside any contexts: in the main context
          events, http reside in main context
          server in http
          location in server
          summary:
            main
              events
              http
                server
                  location
        serving static content
          location = local directories
          ex
            location / {
                root /data/www;
            }
            note: "/" is added to URI
          ex
            server {
                location / {
                    root /data/www;
                }
                location /images/ {
                    root /data;
                }
            }
            # note
              http://localhost/images/example.png
                sends:
                /data/images/example.png
        Setting Up a Simple Proxy Server
          ex
            server {
                location / {
                    proxy_pass http://localhost:8080/;
                }
                location ~ \.(gif|jpg|png)$ {
                    root /data/images;
                }
            }
            note:
              requests with .gif to /data/images
              allo  other to proxied server
        FastCGI Proxying
          to run applications with PHP
    how-to-set-up-nginx-server-blocks id=g_10106
      how-to-set-up-nginx-server-blocks <url:file:///~/Dropbox/mynotes/content/code/ccode.md#r=g_10106>
      https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-14-04-lts
      step 1: set up new document root directories
        by default:
          /usr/share/nginx/html
        create dirs:
          sudo mkdir -p /srv/www/example.com/html
        ownership to our non-sudo user
          sudo chown -R $USER:$USER /srv/www/example.com/html
      step 2: create sample pages
        vim /srv/www/example.com/html/index.html
      step 3: create server block files for the domain
        server block = virtual host in apache
          each domain = 1 server block
          by default: nginx has server block called `default`
        copy existing default server block
          sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/example.com
        edit the file
          sudo vim /etc/nginx/sites-available/example.com
            update lines "default_server"
              listen 80;
              listen [::]:80;
            update line "root"
              root /srv/www/example.com/html;
            update line "server_name"
              server_name example.com www.example.com;
      step 4: enable server blocks and restart
        create symbolic links 
          sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
          /etc/nginx/sites-enabled/
        sudo vim /etc/nginx/nginx.conf
          uncomment line
            server_names_hash_bucket_size 64;
        restart nginx
          sudo service nginx restart
    NGINX rate-limiting in a nutshell
      https://medium.freecodecamp.org/nginx-rate-limiting-in-a-nutshell-128fe9e0126c
      300r/m to allow 300 requests per minute, or 5r/s to allow 5 requests each second
        limit_req_zone $request_uri zone=zone1:10m rate=300r/m;
        limit_req_zone $request_uri zone=zone2:10m rate=5/s;

## openshift rhcloud

  account
    openshift 2 > applications > .dev > source code: repo
      git clone <repo>
  deploy
    git commit
    git push

## osx

    osx setup guide for development tools
      http://sourabhbajaj.com/mac-setup/index.html
    karabiner
      dahili tanım dosyaları burada
        <url:file:///Applications/Karabiner.app/Contents/Resources>
      kendi özelleştirmelerim burada
        <url:file:///~/Library/Application Support/Karabiner/private.xml>
      ModifierFlag::NONE
        http://blog.iansinnott.com/using-keyremap4macbooks-private-xml/
        like non-recursive mapping in vim
      mapping alt+shift to return
        http://apple.stackexchange.com/questions/236774/how-to-map-altshiftspace-to-return-correctly-in-karabiner
      KeyOverlaidModifier
        --KeyOverlaidModifier--
        KeyCode::<key we want to affect>,
        KeyCode::<key to fire when held continuously>,
        KeyCode::<key to fire when pressed and released quickly>

## scim - spreadsheet on terminal

    basics
      in normal mode
        <text
          puts "text" left aligned
        \center
        >right
        =100
          enters number with =
        =@sum(b4:b6)
        gf4
          jump to F4 cell
        ei ea
          edit numeric cell
        Ei Ea
          edit text cell
        f up/dn
          change decimal places
      fill numbers
        :fill {range} {initial_number} {increment_number}
          Example:   :fill A0:A100 1 0.25
      decimal precision numbers
        f+ , fk , f-UP:         Change cell format: Increment decimal precision.
        f- , fj , f-DOWN:       Change cell format: Decrement decimal precision.
        f< , fh , f-LEFT:       Change cell format: Decrement column width.
        f> , fl , f-RIGHT:      Change cell format: Increment column width.
    formulas
      @sum
      @prod
    Quick tools #1 sc The spreadsheet calculator-LFWD5slyVfc.mp4


## screenflow

    moving
      forward one second    +right
    adding multiple media
      1. # right
      2. select media
      3. double click
    moving scrubber
      move one sec forward/backward   +rg/lf    
      move to next clip     '
      move to prev clip     ;
    marker
      insert marker at scrubber     `
      delete marker         shift -
      next marker     + up
      prev marker     + dn
    trimming
      trim front of selected clip to scrubber   w
      trim end    e
    selection
      insert in   i
      insert out  o

## sox

    duration/length of audio
      soxi -D file.mp3
      globbing
        soxi -D *.aiff
      sum all files
        soxi -D *.aiff | paste -sd+ - | bc
    manipulating audio files
      merge audio files <url:#r=dat_064>

## vlc

    subscribe to podcast
      window > playlist > podcasts > subscribe
    play youtube playlist
      http://www.makeuseof.com/tag/watch-entire-youtube-playlists-in-vlc-heres-how/

## webfaction

    redirection of subdomains
      redirect wf to digitalocean
        admin | domains | .choose domain
        hosting = external
          add ip address: 207.154.192.228
        save
      test
        ping subdomain.x.com

## word2vec

    how does it work
      input: text corpus
      output: word vectors
      study
        find closest words
          distance tool
        find linguistic regularities
          ex
            vector('Paris') - vector('France') + vector('Italy')
              ≅ vector('Rome')
            vector('king') - vector('man') +vector('woman')
              ≅ vector('queen')
        from words to phrases

# topics

## 3D Design

    tutorials
      Blender for Hackers - 3D modeling is just like using VIM
        https://learntemail.sam.today/blog/blender-for-hackers-3d-modeling-is-just-like-using-vim/
        çok kolay ve vim tarzı bir anlatım


## authentication

    token authentication for spa
      https://stormpath.com/blog/token-auth-spa
        single page applications: the authentication problem
          spa -> rest api
          rest api -> how to open api in a secure way?
        before tokens, the cookie session
          store cookie in the browser
            after login -> cookie contains id of the session in the server
            additional reqs:
              https only cookies that cannot be read by js
              implement csrf mitigation strategy
        json web tokens (jwt)
          oauth 2.0 spec + jwt specification
          jwt: reliable
            structured way to declare users and their access rights
            scopes: powerful and simple
            refresh tokens: confusing and useless
            token ex: "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk..."
              base64 encoded string
              3 sections:
                header: describes token
                payload
                signature hash: to verify integrity of the token (with secret key)
              decoded payload:
                "sub": "users/TzMUocMF4p",
                "name": "Robert Token Man",
                "scope": "self groups/admins",
                "exp": "1300819380"
              information:
                who that user is + uri 
                what can user access (scope)
                when token expires
              claim: these declarations are called
            tokens are given to user after they present credentials (username+pass or api keys or other tokens)
        why jwt is great for spa
          spa has many views:
            logged in, logged out, restricted
            it is about access control
        how to use jwt securely
          if tokens stolen, all bets are off
          solutions:
            sign tokens with keys available only to authentication service
              verify token is signed with secret key
            encrypt tokens
            never transmit tokens over non-https
            stoke jwt in https-only cookies
              prevents xss attacks
        token expiration and revocation
          oauth: two token approach
            short-lived access token 
            with long-lived refresh token to get access token
            convoluted solution

## financial budget planning - ibm cognos tm1

    olap cubes
      cube = map 
      dimension = key
      multi-dimensional = multiple keys to one value

## functional programming

    distinguishing fold left from fold right
      How do you know when to use fold-left and when to use fold-right?
        http://stackoverflow.com/questions/1446419/how-do-you-know-when-to-use-fold-left-and-when-to-use-fold-right
        convert a fold into an infix operator notation
          ex
            fold x [A, B, C]
          if left-associative, it becomes:
            ((A x B) x C )
            natural order
          if right-associative, it becomes:
            (A x (B x c))
            reverse order
          ex: cons-operator
            foldr (:) [] [1, 2, 3] 
              = 1 : (2 : (3 : []))
              = 1 : 2 : 3 : []
              = [1, 2, 3]
          in general most operators are left-associative
        2. answer:
          left: it is like an accumulator as in a tail-recursive iteration
            ((1 + 2) + 3)
            1 stack frame is sufficient
          right: traverses until the base then builds up the result from there
            (1 + (2 + 3))
            needs to preserve n-1 stack frames
          rule of thumb:
            if no specific associativity: choose left
      Understanding fold-left and fold-right in Scheme
        http://stackoverflow.com/questions/32686736/understanding-fold-left-and-fold-right-in-scheme
        1. answer:
          both reduces a list 
          right: keeps the order
          left: reverses the order of the list while applied
      Operator Associativity - wikipedia
        https://en.wikipedia.org/wiki/Operator_associativity
        operators may be associative
          = operations can be grouped arbitrarily
        left associative
          = operations are grouped from the left
        exponentiation: right associative
      Associative property - wikipedia
        https://en.wikipedia.org/wiki/Associative_property
        word root: grouping
        changing order of operations doesn't matter
          2 x (3 x 4) = (2 x 3) x 4
        commutativity: changing the order of arguments
          a x b = b x a
        associative operations are abundant
          many algebraic structures require their binary operations to be associative
        many important operations are non-associative:
          subtraction, exponentiation
      cons operator - wikipedia 
        https://en.wikipedia.org/wiki/Cons
        word root: construct list
          oop: constructor
          algebraic data type system: constructor function
        jargon:
          to cons x onto y
          = (cons x y)
          left half: car (content of address register)
          right half: cdr (condent of decrement register)
        haskell: `:`
          adds an element to the beginning of a list
          prepend
      What is tail recursion? Why is it so bad? - quora
        https://www.quora.com/What-is-tail-recursion-Why-is-it-so-bad
        tail recursion:
          a kind of recursion
          where recursive call is the last thing in the function
          function does not do anything after recursing
        benefit:
          no need to consume stack space
          pass result of recursive call directly without waiting
          difference from normal function:
            compiler has to have a stack frame
            so that he comes back to it after 

## SSL/TLS certificates id=ccd_0003

  SSL/TLS certificates <url:#r=ccd_0003>
  ref
    nginx <url:#r=ccd_0004>
  letsencrypt
    LetsEncrypt Documentation: 
      Getting Started
        https://letsencrypt.org/getting-started/
        intro
          to enable HTTPS
            you need a certificate (a file type)
            from a Certificate Authority (CA)
          letsencrypt is a CA
          to get a certificate
            you need to demonstrate control over a domain
          letsencrypt does this using ACME protocol
            it runs on web host
        with shell accesss
          use Certbot ACME client
            it automates
              certificate issuance
              certificate installation
        without shell 
          manually
            install Certbot locally
            upload a specific file to website to prove control
      How It Works
        https://letsencrypt.org/how-it-works/
        goal: set up an https server automatically
          done by an agent (client) on the web server
        two steps
          1. agent proves to CA that web server controls a domain
          2. agent requests, renews, revokes certificates for that domain
        domain validation
          1. agent asks lenc (letsencrypt) CA
            what it needs to do
          2. CA looks at domain name and issues challenges
            ex
              provisioning a dns record under example.com
              provisioning an http resource on example.com
            nonce: in cryptograph
              http://en.wikipedia.org/index.php?q=aHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ3J5cHRvZ3JhcGhpY19ub25jZQ
              an arbitrary number that can be used once
              it is issued in an authentication protocol
                to ensure old communications cannot be reused
              ex
                client -> server.getNonce() : nonce
                client -> server.login(username, nonce, hash(nonce+password)) : token
            result: an authorized key pair for example.com
        certificate issuance and revocation
          now agent can request, renew, revoke certificates
            by signing messages with authorized key pair
      FAQ
        for multiple domain names
          SAN certificates (subject alternative name)
        wildcard certificates
          from 2018
          require base domain validation
      What is a Certificate
        https://certbot.eff.org/docs/what.html
        intro
          public key = digital certificate (current name) = ssl certificate
            uses a public key + a private key
            to enable secure communication between client and server
          certificate used 
            to encrypt initial stage (secure key exchange)
            to identify the server
          certificate contains
            information about key
            information about server identity
            digital signature of certificate issuer
          is the issuer trusted by client? + is the signature valid?
            then: use key to communicate
          prevents man-in-the-middle attacks
        certificates and lineages
      Get Certbot
        https://certbot.eff.org/docs/install.html
      User Guide
        Certbot Commands
          Getting certificates
            two types of plugins:
              authenticators, installers
            authenticators
              "certonly" command
              to obtain a certificate
              validates that you control the domain
              obtains a certificate
              places it in the /etc/letsencrypt
            installers
              "install" command
              modifies webserver's configuration
            both
              "run" command: default
              combined with plugins:
                --nginx
                --webroot: writes to webroot directory of a webserver
                  no install
                --standalone: no install
                --manual: no install. perform validation yourself
            several ACME protocol challenges exist:
              tls-sni-01: uses port 443
              http-01: uses port 80
              dns-01: requires DNS server on port 53
              you can choose with: "--preferred-challenges"
            standalone mode
              "certonly" and "--standalone"
                certbot certonly --standalone -d www.example.com -d example.com
              needs 80 or 443 to perform domain validation
                --preferred-challenges http
                --preferred-challenges tls-sni
            manual mode
              perform domain validation yourself
                certbot certonly --manual -d www.example.com -d example.com
              "certonly" and "--manual"
              "http" challenge
                place a file in "/.well-known/acme-challenge/" in web root directory of webserver
                  same as "webroot" plugin but manual
              "dns" challenge
                place a TXT DNS record under domain name
              "tls-sni" challenge
                uses SNI
          Managing certificates
            intro
              certbot certificates
                get list of certificates
              run certonly certificates renew delete commands:
                "--cert-name"
                  specify a particular certificate
              ex:
                certbot certonly --cert-name example.com
            Re-creating and Updating Existing Certificates
              options:
                --force-renewal
                  request a new certificate for an existing certificate
                --duplicate
                  mostly not used
                --expand
                  update existing certificate
                  certbot --expand -d existing.com,example.com,newdomain.com
                  certbot --expand -d existing.com -d example.com -d newdomain.com
          Changing a Certificate’s Domains
            intro
              --cert-name: can be used to modify domains of a certificate
              certbot certonly --cert-name example.com -d example.com,www.example.org
            Revoking certificates
              ex
                certbot revoke --cert-path /etc/letsencrypt/live/CERTNAME/cert.pem
                certbot revoke --cert-path /etc/letsencrypt/live/CERTNAME/cert.pem --reason keycompromise
              after revoking, it can be deleted
                certbot delete --cert-name example.com
              if not deleted, it can be renewed 
            Renewing certificates
              certbot renew
                checks all installed certificates
                renews the ones that expire in less than 30 days
              hooks: to restart
                certbot renew --pre-hook "service nginx stop" --post-hook "service nginx start"
            Modifying the Renewal Configuration File
          Where are my certificates?
            /etc/letsencrypt/live/$domain
              point your server to these files, not copy
              archive/ keys/: previous keys and certificates
              live/ symlinks to latest versions
            files:
              privkey.pem
                pirvate key for certificate
                must be secret
                nginx: ssl_certificate_key
              fullchain.pem
                all certificates, including server certificate (leaf, end-entity)
                nginx: ssl_certificate
              cert.pem chain.pem (less common)
            pem-encoded: all files
          Pre and Post Validation Hooks
        Log Rotation
          /var/log/letsencrypt
        Command Line Options
          certbot --help all
          nginx:
            Nginx Web Server plugin - Alpha
            --nginx-server-root NGINX_SERVER_ROOT
                                  Nginx server root directory. (default: /etc/nginx)
            --nginx-ctl NGINX_CTL
                                  Path to the 'nginx' binary, used for 'configtest' and
                                  retrieving nginx version number. (default: nginx)
          standalone:
            Spin up a temporary webserver
          next
            aynı domain için birden fazla cert alabilir miyim farklı yerlerden?
              validasyonları geçersem alabilirim
            validasyon yapamazsam cert alamamam lazım bu durumda
              cert alabilirsin, fakat geçerli olmadığından "not secure" görünebilir browserda
    How to configure HTTPS on Apache, AWS, EC2
      https://medium.com/@nishantasthana/how-to-configure-https-on-apache-aws-ec2-5e483c1c1f15
      note: SSL protocol is renewed as TLS
      1. buy certificate from DigiCert
      2. generate CSR on server
      3. upload certificate
      4. create dir /sslcert
      5. edit /etc/httpd/conf.d
      6. follow instructions
      7. open port 443
      8. restart apache
      9. redirect http to https
    Configuring HTTPS - nginx
      http://nginx.org/en/docs/http/configuring_https_servers.html
      nginx.conf
        ssl parameter:
          listen 443 ssl
        locations of server certificate and private key
          ssl_certificate example.com.crt
          ssl_certificate_key example.com.key
    How to properly configure your nginx for TLS
      https://medium.com/@mvuksano/how-to-properly-configure-your-nginx-for-tls-564651438fe0
      critical because
        this is the waiting time user first senses
      1. get TLS certificates
      2. enable TLS and http2
        listen 443 ssl http2
      3. disable ssl (old protocol)
        ssl_protocols TLSv1 TLSv1.1
      4. optimise cipher suites. this is where encryption happens
        ssl_prefer_server_ciphers on
        ssl_ciphers ECDH+...
      5. DH params: it is a protocol that allows two parties to talk a secret without ever making that secret open 
        ssl_dhparam /etc/...
        openssl dhParam 2048 -out ...
      6. enable OCSP stapling: to verify that certificate is not revoked, browser contacts issuer of the certificate. nginx gets a signed message from OCSP sevrer. when initialising a connection with some browser, staple it to initial handshake.
      7. enable HSTS
        HSTS: allows a server to tell clients they should only use secure protocol HTTPS
      8. optimize SSL session cache: reduce number of handshakes
      9. enable session tickets: alternative to session cache. cache is stored in client
    Let’s Encrypt: TLS for NGINX
      https://www.nginx.com/blog/lets-encrypt-tls-nginx/
      SSL Test
        ssllabs.com/ssltest
      Mixed Content Blocking
        https page calls http resources
      Too many CAs (certificate authorities)
      Lets Enrcypt Mission
        tries to solve all these problems
        usability + security together
        new certificate authority
      TLS and HTTPS problem
        no way to follow latest security news
        better: provide an agent (client) that does these things correctly
    NGINX, NODE.JS AND HTTPS VIA LET'S ENCRYPT
      https://smalldata.tech/blog/2015/12/29/nginx-nodejs-and-https-via-letsencrypt
    Certbot Documentation
      https://certbot.eff.org/docs/
    docker
      jrcs: nginx letsencrypt
        https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion
        1. container: nginx-proxy
          explain
            writes to 3 volumes
              certs: to create letsencrypt certificates
              vhost.d: to change configuration of vhosts
              html: to write challenge files
            --label: st. letsencrypt container knows this
          command
            docker run -d -p 80:80 -p 443:443 \
              --name nginx-proxy \
              -v /path/to/certs:/etc/nginx/certs:ro \
              -v /etc/nginx/vhost.d \
              -v /usr/share/nginx/html \
              -v /var/run/docker.sock:/tmp/docker.sock:ro \
              --label com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy \
              jwilder/nginx-proxy
        2. container: letsencrypt 
          command
            docker run -d \
              -v /path/to/certs:/etc/nginx/certs:rw \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              --volumes-from nginx-proxy \
              jrcs/letsencrypt-nginx-proxy-companion
        3. container: proxied containers can be any image
          command
            docker run -d \
              --name example-app \
              -e "VIRTUAL_HOST=example.com,www.example.com,mail.example.com" \
              -e "LETSENCRYPT_HOST=example.com,www.example.com,mail.example.com" \
              -e "LETSENCRYPT_EMAIL=foo@bar.com" \
              tutum/apache-php
        Separate containers
          nginx proxy can be run as two containers:
            docker-gen
            nginx
          1. container: nginx
            docker run -d -p 80:80 -p 443:443 \
              --name nginx \
              -v /etc/nginx/conf.d  \
              -v /etc/nginx/vhost.d \
              -v /usr/share/nginx/html \
              -v /path/to/certs:/etc/nginx/certs:ro \
              --label com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy \
              nginx
          2. container: docker-gen
            docker run -d \
              --name nginx-gen \
              --volumes-from nginx \
              -v /path/to/nginx.tmpl:/etc/docker-gen/templates/nginx.tmpl:ro \
              -v /var/run/docker.sock:/tmp/docker.sock:ro \
              --label com.github.jrcs.letsencrypt_nginx_proxy_companion.docker_gen \
              jwilder/docker-gen \
              -notify-sighup nginx -watch -wait 5s:30s /etc/docker-gen/templates/nginx.tmpl /etc/nginx/conf.d/default.conf
          3. container: letsencrypt
            docker run -d \
              --name nginx-letsencrypt \
              --volumes-from nginx \
              -v /path/to/certs:/etc/nginx/certs:rw \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              jrcs/letsencrypt-nginx-proxy-companion
          4. container: proxied containers
            same as above
        proxied container
          environment variables:
      evertramos examples
        https://github.com/evertramos/docker-compose-letsencrypt-nginx-proxy-companion
        docker-compose.yml
          1. nginx
          2. nginx-gen
          3. nginx-letsencrypt
        .env
          NGINX_FILES_PATH
          YOUR_PUBLIC_IP
        proxied containers:
          ex
            wordpress
              expose:
                - "443"
              environment:
                VIRTUAL_HOST: domain.com, www.domain.com
                VIRTUAL_PROTO: https
                VIRTUAL_PORT: 443
                LETSENCRYPT_HOST: domain.com, www.domain.com
                LETSENCRYPT_EMAIL: your_email@domain.com
      george ilyes examples
        https://github.com/gilyes/docker-nginx-letsencrypt-sample
        docker-compose.yml
          1. nginx
          2. nginx-gen
          3. nginx-letsencrypt
        proxied containers
          sample-api:
            environment:
              - VIRTUAL_HOST=sampleapi.example.com
              - VIRTUAL_NETWORK=nginx-proxy
              - VIRTUAL_PORT=3000
              - LETSENCRYPT_HOST=sampleapi.example.com
              - LETSENCRYPT_EMAIL=email@example.com
          sample-website:
            environment:
              - VIRTUAL_HOST=samplewebsite.example.com
              - VIRTUAL_NETWORK=nginx-proxy
              - VIRTUAL_PORT=80
              - LETSENCRYPT_HOST=sample.example.com
              - LETSENCRYPT_EMAIL=email@example.com
        debugging
          view logs
            docker logs nginx
          view generated nginx configuration
            docker exec -it nginx-gen cat /etc/nginx/conf.d/default.conf
        explain
          nginx
            only publicly exposed container
              routes traffic to servers
              provides TLS termination
            volumes
              conf.d: generated config files
              /nginx/html: used by letsencrypt for challenges from CA
              /certs: written by letsencrypt for storing TLS certs
          nginx-gen
            this generates nginx configuration
              first, it reads metadata (VIRTUAL_HOST) from other containers
              then it generates nginx configuration using template file for main nginx
            when a new container is run, this container detects that
                generates configuration entries
                restarts nginx
            volume
              /nginx.tmpl
          letsencrypt
            it inspects other containers too
              it acquires letsencrypt certificates based on LETSENCRYPT_HOST and LETSENCRYPT_EMAIL
              at regular intervals it renews certificates
            volumes
              /certs
    jwilder: Automated Nginx Reverse Proxy for Docker
      http://jasonwilder.com/blog/2014/03/25/automated-nginx-reverse-proxy-for-docker/
      intro
        reverse proxy server
          sits in front of other web servers
            to provide extra functionality
          ex: extra functionality
            SSL termination, load balancing, request routing, caching, AB testing
      generating reverse proxy configs
        manual configuration is time consuming
        docker provides remote API
          to inspect containers
        docker provides realtime events PAI
          to notify container start/stop
        docker-gen: a utility
          exposes container meta-data to templates
          templates are rendered
          restarts services
      nginx reverse proxy for docker
        nginx template
          to generate a reverse proxy config 
            using virtual hosts for routing
        template: golang template package
  intro
    SSL Certificate Explained
      https://www.youtube.com/watch?v=SJJmoDZ3il8
      Firma Adı: Mustafa Boyacı Vizyon İletişim
      Şehir: Samsun
    Wildcard Certificate
      http://en.0wikipedia.org/index.php?q=aHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvV2lsZGNhcmRfY2VydGlmaWNhdGU
      wildcard certificate is a public key certificate which can be used with multiple subdomains of a domain
      single wildcard certificate for *.example.com, will secure all these domains:[2]
        payment.example.com
        contact.example.com
      only one level of subdomain
        not be valid for the certificate:
        test.login.example.com
    How To Secure Nginx with Let's Encrypt on Ubuntu 16.04 id=g_10164
      How To Secure Nginx with Let's Encrypt on Ubuntu 16.04 <url:file:///~/Dropbox/mynotes/content/code/ccode.md#r=g_10164>
      https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04
      install certbot
        sudo add-apt-repository ppa:certbot/certbot
        sudo apt-get update
        sudo apt-get install python-certbot-nginx
      allow HTTPS through firewall
        sudo ufw status
      Obtaining an SSL Certificate
        sudo certbot --nginx -d dentas2.i-terative.com

## startups
    
    reviews of software services from startup founders: founderkit
      https://founderkit.com
## streammining
  frequent pattern mining
    http://www.analysis-of-patterns.net/files/bgoethals.pdf
      agrawal, imielinski 1993: 13 most cited paper
      find associations between products
        ex: supermarket
          which products are bought together?
          products influence the sales of other products?
        applications
          supermarket
            cross selling
            product placement
            special promotions
            basket / products
          websearch
            keywords occur together in webpages?
            web pages / keywords
          health care
            sets of symptoms of a disease
            patient / symptoms
          prediction
            associative classifiers
      complex patterns
        data structures
          sets
          sequences
          graphs
          relational structures
        sequences
          dna
          patterns in sequences
        relational databases
          ex
            likes(drinker, beer)
            visits(drinker, bar)
            serves(bar, beer)
          patterns in RDB
            Query 1
              select L.drinker, V.bar
              From Likes L, Visits V
              Where V.drinker = L.drinker
              And L.beer = 'Duvel'
            Query 2
              Select L.drinker, V.bar
              From Likes L, Visits V, Serves S
              Where V.drinker = L.drinker
              And L.beer = 'Duvel'
              And S.bar = V.bar
              And S.beer = 'Duvel'
            association rule
              query 1 => query 2
              if a person that likes Duvel visits bar,
              then that bar serves Duvel
        pattern mining in general
          given
            a database
            a partially ordered class of patterns
            an interestingness measure (eg. support)
              which is monotone wrt partial order
          problem
            find all interesting patterns
    http://www.warse.org/pdfs/2014/ijacst05342014.pdf
      Complete survey on application of FPM on Crime Pattern Mining
      crime pattern functions
  Introduction to stream
    requirements
      bounded storage
      single pass
      real time
      concept drift
        data generating process evolves over time
          distributions change
          new structure in data appears
    r data stream libraries:
      data sources
        random numbers as streams
          rstream, relcuyer
        financial data
          quantmod
        twitter
          streamR twitteR
      statistical models
        iteratively updating models
        factas
          correspondence analysis, PCA, correlation, discriminant
        birch
          clustering
        rEMM
          clustering
        RMOA
          interfaces to MOA
      distributed computing frameworks
        HadoopStreaming
          using R mapreduce scripts in hadoop
          no data stream
        RStorm
          prototyping bolts (computational units) in R
          spouts (data stream sources): represented as data frames
    data stream mining
      common tasks
        clustering, classification, frequent pattern mining
      data stream clusternig
        standard algorithms
          access all data points
          iterate over data multiple times
    examples
      # creating a data stream
      > library("stream")
      > stream = DSD_Gaussians(k = 3, d = 3, noise = .05, p = c(.5, .3, .1))
      > stream
      Mixture of Gaussians
      Class: DSD_Gaussians, DSD_R, DSD_data.frame, DSD
      With 3 clusters in 3 dimensions
      > = get_points(stream, n = 5)
      > p
               V1        V2        V3
      1 0.7642897 0.7008495 0.3779178
      2 0.6736316 0.6506696 0.4708139
      3 0.7456190 0.7255487 0.4731610
      4 0.4460507 0.7063144 0.2449593
      5 0.3688679 0.6551766 0.1235002
      plot( stream, n = 500 )
  RMOA at github
    https://github.com/jwijffels/RMOA
    examples
      library(RMOA)
## Create a HoeffdingTree
      hdt <- HoeffdingTree(numericEstimator = "GaussianNumericAttributeClassObserver")
      hdt
## Define a stream - e.g. a stream based on a data.frame
      data(iris)
      iris <- factorise(iris)
      irisdatastream <- datastream_dataframe(data=iris)
## Train the HoeffdingTree on the iris dataset
      mymodel <- trainMOA(model = hdt, 
        formula = Species ~ Sepal.Length + Sepal.Width + Petal.Length, 
        data = irisdatastream)
## Predict using the HoeffdingTree on the iris dataset
      scores <- predict(mymodel, newdata=iris, type="response")
      str(scores)
      table(scores, iris$Species)
      scores <- predict(mymodel, newdata=iris, type="votes")
      head(scores)
## Boosting example
      irisdatastream$reset()
      mymodel <- OzaBoost(baseLearner = "trees.HoeffdingTree", ensembleSize = 30)
      mymodel <- trainMOA(model = mymodel, 
        formula = Species ~ Sepal.Length + Sepal.Width + Petal.Length, 
        data = irisdatastream)
## Streaming regressions and streaming recommendation engines. Examples can be found in the documentation
      ?trainMOA.MOA_regressor
      ?trainMOA.MOA_recommender    
    summary
      data -> data stream -> 
      model = HoeffdingTree
      trainMOA( data, model, formula )
      predict( model, data )
      table( results, data$labels )
  RMOA reference
    https://cran.r-project.org/web/packages/RMOA/RMOA.pdf
    functions
      datastream
        datastream_file
        datastream_dataframe
        datastream_ffdf
      datastream_dataframe
        x = datastream_dataframe(data = iris)
        x$get_points(10)
      datastream_ffdf
        irisff = as.ffdf(factorise(iris))
        x = datastream_ffdf(data = irisff)
      datastream_file
        mydata = iris
        mydata$Species[2:3] = NA
        myfile = tempfile()
        write.csv(iris, file = myfile, row.names=F, na = "")
        x = datastream_csv(file = myfile, na.strings = "")
        x$get_points(10)
      factorise
      MOAattributes
      MOAoptions

## rest apis

    openapi
      https://www.openapis.org/about
        goal: standardizing descriptions of rest apis
        OpenAPI Initiative OAI
          governed under Linux Foundation
        based on Swagger Specification
    HATEOAS: Hypertext As The Engine Of Application State
      https://stackoverflow.com/questions/717851/can-someone-explain-hypertext-as-engine-of-application-state-in-simple-terms
      http://restcookbook.com/Basics/hateoas/
        means: hypertext should be used to find your way through the API 
        ex
          GET /account/12345 HTTP/1.1
          HTTP/1.1 200 OK
          <?xml version="1.0"?>
          <account>
              <account_number>12345</account_number>
              <balance currency="usd">100.00</balance>
              <link rel="deposit" href="/account/12345/deposit" />
              <link rel="withdraw" href="/account/12345/withdraw" />
              <link rel="transfer" href="/account/12345/transfer" />
              <link rel="close" href="/account/12345/close" />
          </account>
        explain:
          we have 100 dollars
          we see 4 options
            deposit money
            withdraw money
            ... 
        ex
          <account>
              <account_number>12345</account_number>
              <balance currency="usd">-25.00</balance>
              <link rel="deposit" href="/account/12345/deposit" />
          </account>
        explain
          we are -25 dollars
          we have 1 option:
            deposit money
      http://barelyenough.org/blog/2007/05/hypermedia-as-the-engine-of-application-state/
        application is a state machine
          every page = a state
          links = possible transitions from current state
      https://begriffs.com/posts/2014-03-06-beyond-http-header-links.html
        ex: pagination link headers
          Request
            GET /resource
            Range-Unit: items
            Range: 0-24
          Response
            Status: 206
            Range-Unit: items
            Content-Range: 0-24/1000000

## video production

    software tools
        gifcurry: overlay text on animated gifs from video files
          https://github.com/lettier/gifcurry
        videoscribe
            explainer videos
        powtoon
        go animate
        toontastic

# unclassified

    books
      Data Analytics Made Accessible
      Practical Foundations of Mathematics Paul Taylor
        http://www.paultaylor.eu/~pt/prafm/html/index.html
      pragmatic
        Exercises for Programmers
        Customer Requirements
        Mazes for Programmers
        Predicting the Unpredictable Pragmatic Approaches to Estimating Project Schedule or Cost
        Behind Closed Doors

    Maker products marketplace: tindie.com
    hackaday.io: maker projeleri sosyal ağı
    HackerRank: challenges for hackers
      https://www.hackerrank.com/challenges/tutorial-intro
      eğer problemleri çözersen seni işverenlerle görüştürüyorlar
    Diagrams - vector dsl in haskell
      http://projects.haskell.org/diagrams/
    The Curse of the Excluded Middle "Mostly functional" programming does not work.
      Erik Meijer
      http://queue.acm.org/detail.cfm?id=2611829
    peter norvig code puzzles and solutions
      http://nbviewer.jupyter.org/url/norvig.com/ipython/Advent%20of%20Code.ipynb
    https://maryrosecook.com/blog/post/a-practical-introduction-to-functional-programming
      examples in imperative and functional style
    https://gobyexample.com
      go by example
    apps
      scan uygulamaları
        http://lifehacker.com/five-best-mobile-document-scanning-apps-1691417781
        http://www.howtogeek.com/166610/who-needs-a-scanner-scan-a-document-to-pdf-with-your-android-phone/
    books
      Data Analysis for the Life Sciences 
        leanpub
      Social Architecture book
        https://www.gitbook.com/book/hintjens/social-architecture/details
      Hintjens books  
        http://hintjens.com/books
      Github Cheat Sheet
        https://www.gitbook.com/book/snowdream86/github-cheat-sheet/details
    data analysis
      https://github.com/Quartz/bad-data-guide
      csvconf
        https://gist.github.com/philandstuff/496b0a4872b89da5bb33a245171d789a
        https://librecatproject.wordpress.com/2014/12/01/day-1-getting-catmandu/
        https://jorol.github.io/2016-csvconf-catmandu/
        https://richfitz.github.io/jiffy/
    tools
      json
        jsonbrowse.com: online browser for json
      Viz.js — Graphviz in your browser. 
      https://code.hackmit.org
        tools for hackathons
        jury app, mentor app
      https://github.com/simeji/jid
        json incremental digger
        very useful tool to filter/query json docs
      https://hyper.is/
        js temelli bir terminal app
        çok kolay konfigüre edilebilir  
      https://github.com/nathancahill/anycomplete
        autocomplete for all apps
        thesaurus gibi işlev görür
        hammerspoon temelli
      https://kapeli.com/dash
        dokümantasyon takip app
      http://pencil.evolus.vn/
        js temelli bir gui çizim editörü
      https://github.com/mas-cli/mas
        mac appstore cli
      https://github.com/jaspervdj/patat
        terminal based presentations
      https://github.com/ok-borg/borg?utm_content=bufferefcfa&utm_medium=twitter&utm_source=changelog&utm_campaign=buffer
        terminal based search engine for bash commands
      https://github.com/gravitational/teleconsole?utm_content=buffer87f6d&utm_medium=twitter&utm_source=changelog&utm_campaign=buffer
        remote terminal connection to any computer 
      https://github.com/jkbrzt/httpie
        http like curl
      https://github.com/christabor/flask_jsondash?utm_content=bufferf684e&utm_medium=twitter&utm_source=changelog&utm_campaign=buffer
        dashboard app for any api
      http://datasciencemasters.org/?utm_content=buffer5774b&utm_medium=twitter&utm_source=changelog&utm_campaign=buffer
        curriculum for data science
      httpstat — curl statistics made simple http://chlg.co/2bGamiU 
      Mojibar – 🍊 Emoji searcher but as a menubar app. http://chlg.co/2b01kwc
      Thyme – Automatically track which applications you use and for how long. http://chlg.co/2blN5Yn 
      Librevault - p2p, decentralized and open source file sync
      Checkup — distributed, self-hosted health checks and status pages http://chlg.co/2aI0fdv 
      gron makes JSON more greppable http://chlg.co/2asQEtd 
      Jargon from the functional programming world in simple terms! http://git.io/fp-jargons
      m-cli — helps you programmatically administer macOS
      It brings you Slack-style :emoji: keyboard shortcuts https://github.com/warpling/Macmoji 
      Write your next presentation in #Markdown with Marp http://chlg.co/29wMHkN 
      "ES6 for Humans" looks like a great starting point to level up your JavaScript skills from ES5 to ES6
      Atmo – a server-side power tool (UI) for quickly mocking #API endpoints http://chlg.co/29hECiR 
      TellForm – an #OSS alternative to TypeForm or Google Forms: http://chlg.co/29NYv2B 
      "You should have to pass a quiz that proves you actually read an article before you can comment / share it." readsure
      A game designed to teach JavaScript and artificial intelligence in a fun, interactive way. http://chlg.co/298EJBj warrior.js
      https://github.com/thechangelog/ping/issues?utm_content=buffer81c94&utm_medium=twitter&utm_source=changelog&utm_campaign=buffer
        podcast içeriği önerilerini github issue'ları olarak almak
      Neodoc – Beautiful, handcrafted commandline interfaces for #NodeJS http://chlg.co/294A7rT 
      All of @github’s #opensource code (2.8M+ repos) is now in BigQuery. Start analyzing: http://goo.gl/0yJMyr 
      https://sourcegraph.com/
        navigate any code
      emoj — Find relevant emojis from text on the command-line 😮 ✨ 🙌 🐴 💥 🙈 http://chlg.co/28RhzAB 
      gitalias: useful git aliases
      lemonade-stand: https://t.co/v1TOattOdV financial support for oss projects
      VisualAlchemist — A web-based database diagramming and automation tool http://chlg.co/1UW4VuO 
      Mailtrain – a self-hosted email newsletter app built on top of #Node http://chlg.co/1rpM2J8 
      https://github.com/fstab/grok_exporter
        Grok is a tool to parse crappy unstructured log data into something structured and queryable. Grok is heavily used in Logstash to provide log data as input for ElasticSearch.
      A complete daily plan for studying to become a machine learning engineer (Insta-🔖) https://t.co/HfjAhx67ve
      Cayley — a db inspired by the graph database behind Freebase and Google's Knowledge Graph. https://t.co/6jgUxOg33j
      People are starting to build things on top of #IPFS! Check out Orbit, a distributed, peer-to-peer chat app https://t.co/PKMLjLL1jb
      Mega Boilerplate — handcrafted starter projects, optimized for simplicity and ease of use http://chlg.co/1tbs8mt 
      gvar(1) -- bash: display, set, or remove global variables. http://arturoherrero.github.io/gvar/g…
        https://github.com/arturoherrero/gvar?utm_content=buffer7ca40&utm_medium=twitter&utm_source=changelog&utm_campaign=buffer
      The simplest, fastest way to get business intelligence and analytics to everyone in your company 😋 http://metabase.com
      movtogif: CLI simplifies converting mov/mp4 files to high quality animated GIFs http://chlg.co/28LUPw3 
      grok: Grok is a tool to parse crappy unstructured log data into something structured and queryable. Grok is heavily used in Logstash to provide log data as input for ElasticSearch.
      https://github.com/dbohdan/structured-text-tools
      convert excel to csv on terminal
        pip install xlsx2csv
        xlsx2csv excel_file out_file
      yuml
        Terminalden Yuml Kullanımı
          https://github.com/wandernauta/yuml
          run
            echo "[This]-[That]" | ./yuml -s nofunky -o diagram.png
          options
            -i  read file
            -o  store output
            -f  format png, pdf, jpg, svg
            -t  diagram type: class, activity, usecase
            -s  diagram style: scruffy, plain, nofunky
            --dir direction: LR, RL, TD
            --scale percentage
            -v  debug info
          run full
            yuml -i -o -f png -t class -s plain --dir 
    http://www.cis.upenn.edu/~bcpierce/tapl/main.html
      Types and Programming Languages
    https://github.com/askn/crystal-by-example
    game
      https://www.codingame.com/
        programlayarak oyun oynama
      http://www.bootstrapworld.org/
        algebraic game programming
      http://treksit.com/
        game to learn graph theory
    unix
      https://www.learnenough.com/command-line-tutorial
    learning
      http://exercism.io/
        exercises for programming languages
    https://www.edx.org/course/beauty-joy-computing-cs-principles-part-uc-berkeleyx-bjc-1x
    http://www.lambda.cd/
      pipelines for build server
    https://www.getsync.com/
    programming
      graphql
        https://www.compose.com/articles/postgraphql-postgresql-meets-graphql/
      purescript
        https://github.com/paf31/24-days-of-purescript-2016
          book for purescript
      thoughtworks technology radar
      http://martinfowler.com/articles/command-line-google.html
      'Coder Decoder - Functional Programmer Lingo Explained, with Pictures' by Katie Miller-uwrCQmpZ8Ts.mp
    category theory - fp
      https://manning.com/books/design-for-the-mind
      https://manning.com/books/reactive-data-handling
      https://www.manning.com/books/functional-programming-in-javascript
      https://manning.com/books/learn-haskell
      <url:file:///~/Movies/youtube/wadler/Category Theory, The essence of interface-based design - Erik Meijer-JMP6gI5mLHc.mp4>
      http://debasishg.blogspot.com/2012/07/does-category-theory-make-you-better.html
      http://debasishg.blogspot.com/2014/03/functional-patterns-in-domain-modeling.html
      Philip Wadler - Everything old is new again - Quoted domain specific languages - Curry On-FiflFiZ6pPI.mp4
      Immutable JavaScript - You can't change this-wA98Coal4jk.mp4
      Category Theory, The essence of interface-based design - Erik Meijer-JMP6gI5mLHc.mp4
      Spreadsheets for developers by Felienne Hermans-0CKru5d4GPk.mp4
    tools 
      https://asciinema.org/
        screencasting tool for terminal
      https://github.com/jreybert/vimagit
        vim git client, very useful
      Google Translate plugin for chrome
        çift tıklayarak kelimelerin karşılıklarını bulur
      http://kk.org/cooltools/tag/cool-tools-show/
        podcast
      cooltools: chris anderson
        usician
        3d printer
    ux
      https://www.oreilly.com/learning/fundamentals-of-mapping-experiences
    linux
      Linux Fundamentals, Paul Cobbaut
    datalog
      learndatalogtoday.com
        extensible data notation (edn)
          similar to json plus
            user defined value types
            more base types
            subset of clojure data
          consists of
            numbers
            strings
            keywords: :kw
            symbols: max
            vectors: [1 2 3]
            lists: (+ 1 2 3)
            instants: #inst
            more
          ex: find all movie titles
            [:find ?title
            :where
            [_ :movie/title ?title]]
          the query is a vector with 4 elements
            keyword :find
            symbol ?title
            keyword :where
            vector [_ :movie/title ?title]
    machine learning
      youtube: nando de freitas
      videolectures.net
      goodwell
      bishop
    fp
      covariant and contravariant
        https://www.johndcook.com/blog/2013/02/28/covariant-and-contravariant/
        Nowadays such situations are always distinguished by calling the things which go in the same direction “covariant” and the things which go in the opposite direction “contravariant.”
          
      Philip Wadler on Functional Programming
        https://www.infoq.com/interviews/wadler-functional-programming/
    multimedia
      ProCreate - ipad üzerinde video aracı
        çok iyi
        yaptığın tüm işlemleri kaydediyor
        https://www.youtube.com/watch?v=G78NXyHaRok
      Kendi ipad stylus kalemini yap
        https://www.youtube.com/watch?v=2XKJ9bF0GVk
          kulak çöpü + alüminyum + su + kalem
        https://www.youtube.com/watch?v=4tf2lm5RgCU
          metalik bir kalemin ucuna pamuk sıkıştır
          
      Infinite-Quality Abstract Art and Animations with Primitive
        http://minimaxir.com/2016/12/primitive/
        herhangi bir resmi soyut bir resim ve animasyon haline getiriyor
        açık kaynak
    python
      conda
        Conda: Myths and Misconceptions
          https://jakevdp.github.io/blog/2016/08/25/conda-myths-and-misconceptions/
          conda sadece python değil, başka yazılımları da yönetir
          conda ikiye ayrılır:
            conda: package manager
            anaconda/miniconda: distribution
          pip: python paketlerini yönetir, conda pip'i kullanır altta
    nodered: flow based programming for iot and web
      https://nodered.org
    cypress: web ui testing
      https://www.cypress.io
    Building JavaScript and mobile_native Clients for Token-based Architectures-eF2myGRT8bo.mp4
      token based security
        one token for all API clients
          mobile, native, web, 3rd party
      token security as a service
      first protocol: who is the user
        uses security token service
        OpenID Connect: authenticates user
      2. protocol: for talking to API
        delegate the identity of user to API
        OAuth 2.0
      flow  
        1. client aunthenticates, establishes session with token service
        2. token service returns identity token, access token
        3. clients process response, validate identity token
        4. client send access token to API
      login ui
        opt1: local login ui in client
          benefit:
            you have control of login page
        opt2: redirect to server rendered login page
          benefit:
            single sign on
            3rd party apps won't get password 
          better in general
          client apps use that as a service
      why tokens instead of cookies
        in spa there is no server side app
        apis don't use cookies
        cookies are only for browser based apps
        csrf security issue
      discovery
        1. get discovery document
          it contains all key information such as
            authorization_endpoint
            token_endpoint
        2. client redirects to openid provider (op)
        3. user authenticates
        4. op returns to client
          id token
        5. client validates id token
      id token
        it is returned as hash fragment in url #lekalmik
        format is JSON web token (jwt)
          header
          claims
          signature
      openid client library: oidcclient
    Migrating to Serverless - an experience report - Gojko Adzic-i2gEbw_jzfY.mp4
      from heroku to amazon lambda
      1/3 less code
        no authentication, no deployment code etc
      no need to provision servers for scaling
      tool
        npm install claudia-api-builder -S
        npm install claudia -D
        vim api.js
          const API = require('claudia-api-builder'),
            api = new API();
          module.exports = api;
          api.get('/hello', () => "hi there!");
        vim package.json
          "scripts":
            "create": "claudia create --region us-east-1 --api-module api",
        npm run create
        # "url": "https://...amazonaws.com/latest"
      using
        $ curl https://...amazonaws.com/latest
        "hi there!"
      infrastructure and monitoring is ready
        logging
        invocations
        authentication
        recovery
        versioning
          20 different deployments cost the same as 1 deployment
          very useful for full a/b testing with different api services
        scaling
      update
        package.json
          "update": ".."
        npm update
          # version: 2
          # url: https:.../dev
      embrace platform
        gatekeeper -> distributed authentication
          authentication, senin sunucun tarafından yapılmak zorunda değil
          doğrudan amazon cognito ile yapılabilir
          böylece örneğin:
            kullanıcı pdf dosyası yükler
            authentication tarafını amazon yapar
            istediği zaman url ile indirir
            senin sunucuların hiç çalışmaz bile
        orchestration -> client or workflow engines
      don't design for stateless, design for share-nothing
    Object-Oriented Programming is Bad-QM1iUe6IofM.mp4
      most important programming video you will ever watch
        %5 will say oo is not important
        %25 it has some virtues and some benefits
        i say: oo is definitively not relevant for any problem
        that is contrary to common knowledge
      procedural code is better
        even when not functional
        procedural & imperative (default)
        procedural & functional (minimize state)
        oo & imperative (segregate state)
      not part of discussion
        inheritance irrelevant
          be very careful or not use at all
        polymorphism is not exclusively oop
      core: encapsulation does not work
        that is the essence of oop but it doesn't work
      why does oop dominate industry?
        oop is something that programmers did to themselves
        java is one main reason
        before java windows app programming was very difficult
          encrypted libraries
        people liked: subject.verb(object)
          ide provides code completion, simplifies programming
        gui programming: very compatible for objects
          components = widgets 
      unit of code abstraction larger than functions and data types?
        combination of two: objects
        led to patterns
          SOLID principle
          dependency injection
          tdd
          agile
        all best practices are bandates
          since oop doesn't satisfy its promise
          every few years new buzzwords arise
      why does oop (encapsulation) not work?
        what is an object
          encapsulated state
          we shouldn't access state (private)
          we can only call a message
          objects call messages to each other
        in origin: messages send only copies of state, not references
          objects are state
          then messages cannot pass object references
          then A must hold a private reference to B
          then B must be part of A's private state
    Practical lessons from a year of building web components - Google I_O 2016-zfQoleQEa4w.mp4
    Federated Wiki
      Keynote - The Federated Wiki-3nB8ml6UowE.mp4
        normal mode 
          double click
          right/left   move horizontally
          drag    move items
        edit mode
          #i  info about markup
          +enter  add new item
        buttons
          flag  i claim it is my own
          +     new item
      Tutiorial
        02-02. cross-page-refactoring-tYrLwlxOKmA.mp4
    DataFiller: generate sample data
      https://www.cri.ensmp.fr/people/coelho/datafiller.html
    Ports & Adapters Architecture
      https://herbertograca.com/2017/09/14/ports-adapters-architecture/
      problems of traditional approach
        no seperation of concerns -> unreusable components
      evolving from layered architecture
        ddd: really relevant: inner layers
          where business logic should live
        cockburn: top and bottom layers are simply entry/exit points for application
          presentation <-> business logic <-> data 
          controllers <-> business logic <-> data
          /Users/mertnuhoglu/Dropbox/public/img/ss-227.png
          each side can have several entry/exit points
            ex:
              left side: api and ui are two entry/exit
              right side: orm and search engine are two entry/exits
            multiple entry/exit points, hence hexagonal
        ports & adapters: an abstraction layer as a port and adapter
      what is port
        consumer agnostic entry/exit point
        an interface 
        ex: interface to perform search
      what is adapter
        transforms an interface into another
        ex: 
    Vivaldi Browser
      https://www.howtogeek.com/250683/the-best-features-of-vivaldi-a-new-customizable-web-browser-for-power-users/
        tile tabs
        multiple select tabs
        screencapture
        #+c   copy to notes
        #!p   show panel
        add page to web panel
        f2    quick commands
        #^b   bookmark manager
        nicknames for bookmarks
      vimium
        ?     help
        hl    scroll horizontally
      shortcuts
        #+p   save in pocket
    Dat: dat project
      install
        npm install -g dat
    franchise: opensource notebook for sql
      https://franchise.cloud
      /Users/mertnuhoglu/Dropbox/public/img/ss-229.png
      using
        # inside codes
        cd franchise
        PORT=3090 yarn start
        http://localhost:3090
      features
        csv xlsx sql
        table view, card view
        plots
        side by side queries 
        data pipeline
          /Users/mertnuhoglu/Dropbox/public/img/ss-230.png
        export/download
    golem: cloud sharing
      https://golem.network
    CommonCrawl: web crawler that shares all data
      http://commoncrawl.org/
    CloudCraft: cloud/network diagram visualization
      https://cloudcraft.co
    Hands-on TensorBoard
      https://www.youtube.com/watch?v=eBbEDRsCmv4
      TensorFlow graph visualization
    3D models to navigate
      https://poly.google.com
    link fish: turn websites into structured data
      scrape web sites
      https://link.fish/api/
    Wordpress Knowledge Base Plugin: Helpie
      http://helpie.pauple.com/demo/
    ripgrep
      ag ack alternatifi
      https://github.com/BurntSushi/ripgrep
      rg -tpy foo
      rg -Tpy foo
    em-keyboard: cli emoji keyboard
      https://github.com/kennethreitz/em-keyboard
      Provide the names of a few emoji, and those lucky chosen emojis will be displayed in your terminal, then copied to your clipboard
      install
        $ pip install em-keyboard
      ex
        $ em sparkles cake sparkles
        Copied! ✨🍰✨
      ex: search
        $ em -s read
        🚗  car
        🎴  flower_playing_cards
        👹  japanese_ogre
        👺  japanese_goblin
    sql_insert_writer: make long SQL INSERT statements
      https://github.com/18F/sql_insert_writer
    mermaid: diagram generation from text
      https://github.com/knsv/mermaid
      gantt, workflow, sequence, network
      install
        npm install -g mermaid.cli
      ex
        graph TD;
            A-->B;
            A-->C;
            B-->D;
            C-->D;
      https://news.ycombinator.com/item?id=13326065
        alternatives
          draw.io
      cli:
        mermaid.cli
        ex:
          mmdc -i input.mmd -o output.png
          mmdc -i input.mmd -o output.png
          mmdc -i input.mmd -o output.pdf
          mmdc -i input.mmd -o output.svg -w 1024 -H 768
          mmdc -i input.mmd -t forest
          mmdc -i input.mmd -o output.png -b '#FFF000'
          mmdc -i input.mmd -o output.png -b transparent
    word dictionary files, thesaurus databases
      myspell: previously
      hunspell: current
      R hunspell library
        uses any .dic file as dictionary
      dictionary files resource
        https://github.com/titoBouzout/Dictionaries
        english
          https://raw.githubusercontent.com/titoBouzout/Dictionaries/master/English%20(American).dic
          https://raw.githubusercontent.com/titoBouzout/Dictionaries/master/English%20(American).aff
      how to install
        https://apple.stackexchange.com/questions/11827/easy-way-to-install-additional-spell-check-dictionaries-for-os-x/11842#11842
        osx
          Move the files with the .aff and .dic extensions (ro_RO.aff and ro_RO.dic for Romanian) to your ~/Library/Spelling folder.
          Go to System Preferences > Keyboard > Text > Spelling and choose the language of your choice
      vim plugin
        https://github.com/Ron89/thesaurus_query.vim
          lookup synonyms
          replace them
      common words
        https://github.com/first20hours/google-10000-english
    tldr: examples for bash commands
      ex
        tldr tar
        tldr git mv
    marker: cli tool
      Marker is a command palette for the terminal. It lets you bookmark commands (or commands templates) and easily retreive them with the help of a real-time fuzzy matcher.
      /Users/mertnuhoglu/Dropbox/keynote_resimler/yayin/marker_cli_tool.gif
    Command line flash cards with bash-lX8jqo70r1I.mp4
      tsv file contains two columns:
        question|answer
      shows one by one
    libuv
      https://github.com/libuv/libuv
        async io made simple
        multiplatform support for async io
        features
          event loop
          async tcp/udp sockets
          async dns resolution
          async file/systems ops
    Semantic versioning
      https://semver.org
        MAJOR.MINOR.PATCH
        MAJOR version: incompatible API changes
        MINOR: new functionality backwards-compatible
        PATCH: backwards-compatible bug fixes
    Graphviz in Browser
      http://www.webgraphviz.com



