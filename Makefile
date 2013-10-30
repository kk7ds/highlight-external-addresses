VERSION_PREV = $(shell grep em:version install.rdf | grep -o '[0-9.]*')
VERSION_MAJ = $(shell echo $(VERSION_PREV) | cut -d . -f 1)
VERSION_MIN = $(shell echo $(VERSION_PREV) | cut -d . -f 2)
VERSION_REV = $(shell echo $(VERSION_PREV) | cut -d . -f 3)
VERSION_REV_NEXT = $(shell echo $$(($(VERSION_REV) + 1)))
VERSION = $(shell echo $(VERSION_MAJ).$(VERSION_MIN).$(VERSION_REV_NEXT))

all:
	git diff --quiet
	sed -ri 's/$(VERSION_PREV)/$(VERSION)/' install.rdf
	zip mailwarn-$(VERSION).xpi `git ls-tree --name-only -r HEAD | grep -v Makefile`
