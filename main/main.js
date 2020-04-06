'use strict';

function printReceipt(inputs) {
	var outputReceipt = `***<store earning no money>Receipt ***\n`;

	var itemCounter = countQuantity(inputs);
	var totalCost = 0;

  for (const itemID in itemCounter) {
  	var itemDetail = getItemDetail(itemID);

  	var itemName = itemDetail["name"];
  	var itemUnit = itemDetail["unit"];
  	var itemPrice = itemDetail["price"];
  	var itemQuantity = itemCounter[itemID];

  	var itemSubTotal = calculateSubTotal(itemQuantity, itemPrice);
  	totalCost += itemSubTotal;

  	outputReceipt += generateReceiptItemList(itemName, itemQuantity, itemUnit, itemPrice, itemSubTotal);
  }
  outputReceipt += generateReceiptTotal(totalCost);
  console.log(outputReceipt);
}

function countQuantity(inputs) {
	var itemCounter = {};
	for (var i = 0; i < inputs.length; i++) {
	  itemCounter[inputs[i]] = itemCounter[inputs[i]] ? itemCounter[inputs[i]] + 1 : 1;
	}
	return itemCounter;
}

function getItemDetail(itemID) {
	var allItemDetail = loadAllItems();
	var returnItem;
	allItemDetail.forEach(function (item) {
		if (itemID == item["barcode"]) {
			returnItem = item;
		}
	});
	return returnItem;
}

function calculateSubTotal(itemQuantity, itemPrice) {
	return (itemQuantity * itemPrice);
}

function generateReceiptItemList(itemName, itemQuantity, itemUnit, itemPrice, itemSubTotal) {
	if (itemQuantity > 1) 
		itemUnit = itemUnit + "s";
	return (`Name：${itemName}，Quantity：${itemQuantity} ${itemUnit}，Unit：${itemPrice.toFixed(2)} (yuan)，Subtotal：${itemSubTotal.toFixed(2)} (yuan)\n`);
}

function generateReceiptTotal(totalCost) {
	return (`----------------------\nTotal：${totalCost.toFixed(2)} (yuan)\n**********************`);
}