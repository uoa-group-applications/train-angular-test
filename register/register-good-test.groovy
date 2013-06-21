/**
 * Simple register test
 */
class RegisterTest {

	@Test
	public void shouldAddProduct() {

		float calculatedAmount = -1;
		ReceiptELement addedElement = null;

		// ---------------------------------------------------------------
		//    register a new object
		// ---------------------------------------------------------------
		
		Register register = [

				calculateTax : { float amount, float gst -> 
					calculatedAmount = amount * gst;
					return calculatedAmount;
				},

				addToReceipt : { ReceiptElement element ->
					addedELement = element;
				}

		] as Register;

		// assert
		register.addProduct("my product", 800);

		// make sure we get what we expect
		assert addedElement != null;
		assert addedELement.price() == calculatedAmount;
		assert addedELement.name() == "my product";
	}

}