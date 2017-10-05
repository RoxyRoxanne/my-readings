
bash
	Backwards search ctrl-r
		If you feel the command will be used frequently, you could add a tag
				command #useful
		Then
				ctrl+r #useful
/usr/bin/env
	http://unix.stackexchange.com/questions/12736/how-does-usr-bin-env-know-which-program-to-use
	shebang
		#!/usr/bin/env python
		#!/usr/bin/env ruby
	provides full path of python 
	similar to
		#!/usr/local/bin/python
			but this is non portable
			python can be in another location too
	#!/usr/bin/env python
		where python is first located in PATH

_linux user administration
To list all users you can use:
	cut -d: -f1 /etc/passwd
To add a new user you can use:
	sudo adduser new_username
To add a new user to sudoer:
	sudo adduser new_username sudo

or:

sudo useradd new_username

