
## System

### Internet wifi network

	wifi connection issues id=g_10099
		ref
			<url:file:///~/Dropbox (Personal)/mynotes/content/code/cosx/internet_connection_drops_constantly.md>
		opt1: bounce mDNSResponder
			http://apple.stackexchange.com/questions/26616/dns-not-resolving-on-mac-os-x
			code
				sudo launchctl unload -w /System/Library/LaunchDaemons/com.apple.mDNSResponder.plist
				sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.mDNSResponder.plist
				restart wifi
				chrome
					chrome://net-internals/#dns
					clear host cache
		http://apple.stackexchange.com/questions/177873/full-wi-fi-ethernet-signal-but-no-internet
		https://support.apple.com/en-ca/HT202222
		http://apple.stackexchange.com/questions/26616/dns-not-resolving-on-mac-os-x
		http://serverfault.com/questions/64837/dns-name-lookup-was-ssh-not-working-after-snow-leopard-upgrade
		http://apple.stackexchange.com/questions/26616/dns-not-resolving-on-mac-os-x
		http://apple.stackexchange.com/questions/55129/i-cannot-connect-to-internet-but-my-macbook-pro-detects-the-network-and-my-hp-co
		https://business.tutsplus.com/tutorials/what-to-do-when-your-mac-wont-connect-to-the-internet--mac-47294
		
