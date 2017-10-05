	<url:file:///~/Dropbox (Personal)/mynotes/content/code/sof_what-does-fd-mean-exactly-in-dockerd-h-fd.md>

## sof: what does fd:// mean exactly in dockerd -H fd://

	http://stackoverflow.com/questions/43303507/what-does-fd-mean-exactly-in-dockerd-h-fd

[Docker daemon documentation][1] suggests the following `hosts` option for most setups:

	dockerd -H fd://

I guess `fd` stands for file descriptor. I don't understand how `fd` is used for socket communication. 

I understand the following options:

	-H unix:///var/run/docker.sock -H tcp://192.168.59.106 -H tcp://10.10.10.2

These are unix domain sockets and tcp sockets. I know how to call docker daemon using these sockets:

	docker -H tcp://0.0.0.0:2375 ps

But if I started docker daemon using `-H fd://`, the following call gives error:

	$ docker -H fd:// ps
	error during connect: Get http:///v1.26/containers/json: http: no Host in request URL

So what is the meaning of `fd://`? Is there any use for it?

[1]: https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-socket-option

