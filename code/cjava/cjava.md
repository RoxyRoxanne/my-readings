
# Java Command Line

    classpath
      java -cp target/itr_vrp-0.1.jar study.StudyConnectMongoOnDocker
        not: -jar kullanırsan, -cp kullanamazsın
      java -cp MyJar.jar:lib/* com.somepackage.subpackage.Main

# JHipster

  https://github.com/jhipster/jhipster-sample-app
    testing
      admin/admin
      user/user
    doc
      https://jhipster.github.io/documentation-archive/v4.4.1/development/

# Maven

    package
      normalde sadece projenin kendi kodlarını içerir
      executable fat jar (one jar) üretmek için iki alternatif var:
        spring boot
        http://www.mkyong.com/maven/maven-create-a-fat-jar-file-one-jar-example/
    spring boot BOOT-INF klasörü oluşturuyor
      eğer plugin olarak spring-boot varsa, jar dosyası içinde BOOT-INF altına konuluyor .class dosyaları
      bu durumda java -cp Main gibi komutlar çalışmıyor
    jar oluşturma
      https://www.mkyong.com/maven/how-to-create-a-jar-file-with-maven/
        code
          <plugin>
              <groupId>org.apache.maven.plugins</groupId>
              <artifactId>maven-jar-plugin</artifactId>
              <configuration>
                  <archive>
                      <manifest>
                          <!-- Jar file entry point -->
                          <mainClass>study.mongodb.ConnectMongo</mainClass>
                      </manifest>
                  </archive>
              </configuration>
          </plugin>
        mvn package

# Spring Boot

  leaks in abstraction
    sebep: pom.xml'de mongodb olunca, spring otomatik ona bağlanıyor başlatırken
      <dependency>
      <groupId>org.mongodb</groupId>
      <artifactId>mongo-java-driver</artifactId>
      <version>3.2.2</version>
      </dependency>
      yan etkileri:
        ilk başlatırkenki ayarları vermediysen, varsayılan olarak localhost'a bağlanıyor.
        bu da hatalara neden oluyor.
  run
    intellij
      düz Application 
    maven
      mvn spring-boot:run
  LiveReload ve HotSwap id=g_10147
    LiveReload ve HotSwap <url:file:///~/Dropbox/mynotes/content/code/cjava/cjava.md#r=g_10147>
    https://docs.spring.io/spring-boot/docs/current/reference/html/howto-hotswapping.html
    spring-boot-devtools plugin
    maven

# Dropwizard

  Getting Started
    http://www.dropwizard.io/1.1.2/docs/getting-started.html
      ref
        /Users/mertnuhoglu/Dropbox/projects/study/study/java/dropwizard01/
      run
        http://localhost:8080/hello-world
        http://localhost:8080/hello-world?name=Successful+Dropwizard+User
      admin port
        http://localhost:8081/
      classes
        Configuration.java
        config.yml
        Application.java
          run()
            jersey().register(resource)
            healthChecks().register("x", healthCheck)
        Representation.java
        Resource.java
        HealthCheck.java
        pom.xml
          maven-shade-plugin
      running
        mvn package
        java -jar app.jar server config.yml
        from IDE:
          main class: Application 
          parameters: server config.yml
  logging
    config.yml
      logging:
        level: INFO
          loggers:
            io.dropwizard: INFO
          appenders:
            - type: console
    usage
      private static final Logger LOGGER = LoggerFactory.getLogger(RestApi.class);
      LOGGER.info("test request");

# Logging

  slfj
    private static final Logger LOGGER = LoggerFactory.getLogger(RestApi.class);
    LOGGER.info("test request");
