class Register {

	private Receipt receipt;
	private Calculator calculator;
	private float gst;

	public Register(float gst) {	
		this.gst = gst;
	}

	public void addProduct(String productName, int priceInCents) {
		float inDollars = priceInCents * 0.01f;
		float total = this.calculateTax(inDollars, gst);
		ReceiptElement receiptElement = new ReceiptElement(productName, total);
		this.addToReceipt(receiptElement);
	}

	public float totalPriceInDollars() {
		float sum = 0.0f;
		for (ReceiptElement el : this.getReceiptElements()) {
			sum += el.price();		
		}
		return sum;
	}

	// now overridable in unit-test
	protected float calculateTax(float amount, float gst) {
		return this.getCalculator().withTax(amount, gst);
	}

	// now overridable in unit-test
	protected List<ReceiptElement> getReceiptElements() {
		return this.getReceipt().getElementStore().all();
	}


	protected void addToReceipt(ReceiptElement receiptElement) {
		this.getReceipt().addToList(receiptElement);
	}

	// ---------------------------------------------------------------------------
	// 	 This class has a preference when it comes to the friends it calls
	// ---------------------------------------------------------------------------

	/**
	 * get a receipt instance, these methods can be overridden in the unit test
	 */
	protected Receipt getReceipt() { 
		return receipt ?: (receipt = new AwesomeReceipt()); 
	}

	/**
	 * get the calculator instance, can be overridden in unit test
	 */
	protected Calculator getCalculator() { 
		return calculator ?: (calculator = new TaxSynchedCalculator());
	}

}



Register myRegister = new Register(0.18f);