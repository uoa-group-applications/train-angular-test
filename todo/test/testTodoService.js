describe("todo service", function() {

	beforeEach(module('app'));
	
	it("should do something", function() {
		expect(true).toBe(true);
	});

	it("should be able to set the list properly", inject(function(todoService) {

		dump("hello");

		expect(true).toBe(true);


	}));

});