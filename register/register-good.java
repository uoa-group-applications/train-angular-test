class Register {

	private Receipt receipt;
	private Calculator calculator;
	private float gst;

	public Register(float gst) {
		this(null, null, gst);
	}

	public Register(Receipt receipt, Calculator calculator, float gst) {
		this.receipt = receipt;
		this.calculator = calculator;
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
		return this.calculator.withTax(amount, gst);
	}

	// now overridable in unit-test
	protected List<ReceiptElement> getReceiptElements() {
		return this.receipt.getElementStore().all();
	}


	protected void addToReceipt(ReceiptElement receiptElement) {
		this.receipt.addToList(receiptElement);
	}

}