function parseAndTransformCSV(csvString) {
  const row = csvString.split("\n");
  const header = row[0].split(", ");
  const users = {};

  for (let i = 1; i < row.length; i++) {
    const value = row[i].split(", ");
    console.log(value);
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
