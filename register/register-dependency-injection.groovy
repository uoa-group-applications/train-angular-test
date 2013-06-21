
@UniversityComponent
class Register {

	@Value("${app.gst}")
	float gst;

	@Inject Receipt receipt;
	@Inject Calculator calculator;


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
		return this.receipt.getElementStore().all();
	}


	protected void addToReceipt(ReceiptElement receiptElement) {
		this.receipt.addToList(receiptElement);
	}


}



