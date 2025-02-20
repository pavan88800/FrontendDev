function parseAndTransformCSV(csvString) {
  const row = csvString.split("\n");
  const header = row[0].split(", ");
  const users = {};

  for (let i = 1; i < row.length; i++) {
    const value = row[i].split(", ");
    const records = {};
    header.forEach((header, index) => {
      records[header] = value[index];
    });
    const userId = Number(records.userId);
    const name = records.name;
    const item = records.item;
    const totalQuantity = parseInt(records.quantity);
    const totalPrice = parseFloat(records.price);

    if (!users[userId]) {
      users[userId] = {
        userId: userId,
        name: name,
        purchases: []
      };
    }
    users[userId].purchases.push({
      item: item,
      totalQuantity: totalQuantity,
      totalPrice: Number(totalPrice)
    });
  }

  for (let key in users) {
    const purchase = users[key].purchases;
    purchase.forEach((el) => {
      el.totalPrice = (el.totalPrice * el.totalQuantity).toFixed(2);
    });
  }
  return Object.values(users);
}

// Input CSV string
const csv = `userId, name, item, quantity, price
  1, John Doe, apple, 3, 1.50
  2, Jane Smith, orange, 1, 0.99
  1, John Doe, banana, 2, 0.75
  2, Jane Smith, apple, 1, 1.50
  3, Mark Turner, orange, 5, 0.99`;

const result = parseAndTransformCSV(csv);

console.log(result);

/** https://javascript.info/js **/
const csv2 = `userId, name, item, quantity, price
1, John Doe, apple, 3, 1.50
2, Jane Smith, orange, 1, 0.99
1, John Doe, banana, 2, 0.75
2, Jane Smith, apple, 1, 1.50
3, Mark Turner, orange, 5, 0.99`;

const parseCsvRow = (row) => row.split(", ");

/**
 * map => Array of the same length
 *
 * reduce = bigger array into smaller array
 * array => [] -> single value
 * {} -> true/false -> number
 *
 * [{ userId: 'string', item: 'string', quanityt: 3, price: 1.5}]
 */
const parseCsv = () => {
  const rows = csv.split("\n");
  const headers = parseCsvRow(rows[0]);
  const entries = rows.slice(1);

  const parsedEntries = entries.map((entry) => {
    const parsedEntry = parseCsvRow(entry);

    return headers.reduce((acc, header, index) => {
      const parsedNumberEntry = Number(parsedEntry[index]);

      return {
        ...acc,
        [header]: isNaN(parsedNumberEntry)
          ? parsedEntry[index]
          : parsedNumberEntry
      };
    }, {});
  });

  return parsedEntries;
};

const transformCsv = (entries) => {
  const result = [];
  const getPurchase = (entry) => ({
    item: entry.item,
    totalQty: entry.quantity,
    totalPrice: entry.quantity * entry.price
  });

  entries.forEach((entry) => {
    const foundResult = result.find(
      (eachResult) => eachResult.userId === entry.userId
    );
    if (foundResult) {
      foundResult.purchases.push(getPurchase(entry));
    } else {
      result.push({
        userId: entry.userId,
        name: entry.name,
        purchases: [getPurchase(entry)]
      });
    }
  });

  return result;
};

const parsedCsv = parseCsv(csv2);
console.log(JSON.stringify(transformCsv(parsedCsv)), null, true);
