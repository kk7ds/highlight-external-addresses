VERSION=`grep em:version install.rdf | grep -o '[0-9.]*'`
all:
	zip mailwarn-$(VERSION).xpi `git ls-tree --name-only -r HEAD | grep -v Makefile`
