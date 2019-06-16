'use strict';

//CONSTRUCTOR
function Stores(name, minCustomerPerHour, maxCustomersPerHour, avgCookiePerSale) {

  //Properties
  this.name = name;
  this.minCustomerPerHour = minCustomerPerHour;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.avgCookiePerSale = avgCookiePerSale;
  this.sales = [];
}

//FUNCTION DEFINITION FOR THE CONSTRUCTOR

/* Generate random numbers of customers based on the flow of maximum and minimum customers per hour */
Stores.prototype.generateRandomCustomers = function() {
  var result = Math.floor(Math.random() * this.maxCustomersPerHour) + this.minCustomerPerHour; //Generate random numbers betn: MIN & MAX
  return result;
};

/* Generates total sales and puts into results of each stores */
Stores.prototype.generateSalesForecast = function() {
  var calculation; //Number of cookies sold based on average cookies and random number of customers
  var startTime = 6; //Military Standard hours for 6 am
  var endTime = 20; //Military Standard hours for 8 pm
  var totalSales = 0; //Sum of total cookies from start to end time

  for (var j = startTime; j <= endTime; j++) {
    calculation = Math.round (this.avgCookiePerSale * this.generateRandomCustomers()); //Calculates and round to nearest integer
    totalSales += calculation;
    this.sales.push(calculation);
  }
  this.sales.push(totalSales); //Make a final push of total cookies

};

/*  Rendering function for the store object */
Stores.prototype.generateRendering = function() {
  var tableEl = document.getElementById('sales-forecast');
  var trEl = document.createElement('tr');
  var tdNameEl = document.createElement('td');
  tdNameEl.textContent = this.name;
  trEl.appendChild(tdNameEl);
  tableEl.appendChild(trEl);
  var tdEl = [];
  for (var i = 0; i < this.sales.length; i++) {
    tdEl[i] = document.createElement('td');
    tdEl[i].textContent = this.sales[i];
    trEl.appendChild(tdEl[i]);
    tableEl.appendChild(trEl);
  }

};
//MAIN FUNCTION TO RUN THE SCRIPT
function generateStoreData() {
//Create Objects and store in array of stores
  var arrayOfStores = [];
  var totalOfColumns = []; //Stores total of the column
  arrayOfStores.push(new Stores('First & Pike', 23, 65, 6.3));
  arrayOfStores.push(new Stores('SeaTac Airport', 3, 24, 1.2));
  arrayOfStores.push(new Stores('Seattle Center', 11, 38, 3.7));
  arrayOfStores.push(new Stores('Capitol Hill', 20, 38, 2.3));
  arrayOfStores.push(new Stores('Alki', 2, 16, 4.6));

  /* Generate Sales Forecast and display elements on table for each stores  */
  for (var i = 0; i < arrayOfStores.length; i++) {
    arrayOfStores[i].generateSalesForecast();
    arrayOfStores[i].generateRendering();
  }

  /* Generates total of the columns in the display and store in the array*/
  for (i = 0; i < arrayOfStores[0].sales.length; i++) {
    var total = 0;
    for (var j = 0; j < arrayOfStores.length; j++) {
      total += arrayOfStores[j].sales[i];
    }
    console.log(total);
    totalOfColumns.push(total);

  }

  /* Final Rendering for the 'Totals' row */
  var tableEl = document.getElementById('sales-forecast');
  var trEl = document.createElement('tr');
  var tdNameEl = document.createElement('td');
  tdNameEl.textContent = 'Totals';
  trEl.appendChild(tdNameEl);
  tableEl.appendChild(trEl);
  var tdEl = [];
  for (i = 0; i < totalOfColumns.length; i++) {
    tdEl[i] = document.createElement('td');
    tdEl[i].textContent = totalOfColumns[i];
    trEl.appendChild(tdEl[i]);
    tableEl.appendChild(trEl);
  }

  //test to validate data in console
  for (i = 0; i < arrayOfStores.length; i++) {
    console.log(arrayOfStores[i].name);
    for (j = 0; j < 16; j++) {
      console.log(arrayOfStores[i].sales[j]);
    }
  }

}
generateStoreData();




