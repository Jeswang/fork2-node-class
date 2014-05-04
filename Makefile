
warm4:
	mocha verify -R spec -g 'Implement Class Constructor'
	mocha verify -R spec -g 'Implement Instance Methods'

warm5:
	mocha verify -R spec -g "Implement Class __super__"
	mocha verify -R spec -g 'Implement Methods Inheritance'
	mocha verify -R spec -g "Implement Super call"
	mocha verify -R spec -g "Implement Super's Super"

.PHONY: warm4
