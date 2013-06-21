class Register {

	Receipt receipt;
	float gst;

	public Register(float gst) {
		this.receipt = new Receipt();
		this.gst = gst;
	}

	public void addProduct(String productName, int priceInCents) {
		Calculator calculator = new Calculator();
		float inDollars = priceInCents * 0.01f;
		float total = calculator.withTax(inDollars, gst);
		this.receipt.addToList(new ReceiptElement(productName, total));
	}

	public float totalPriceInDollars() {
		float sum = 0.0f;
		for (ReceiptElement el : this.receipt.getElementStore().all()) {
			sum += el.price();		
		}
		return sum;
	}

}