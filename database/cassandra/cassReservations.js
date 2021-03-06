const fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

const reservationMaker = () => {
  writer.pipe(fs.createWriteStream('cassReservations.csv'));
  let count = 1;
  let roomCount = 1;
  for (var i = 1; i < 10000001; i++) {
    writer.write(
      {
        reservation_id: `${i}`,
        room_id: `${roomCount}`,
        check_in: faker.date.between('2020-11-01', '2021-01-01'),
        check_out: faker.date.between('2021-03-01', '2021-06-01'),
        guests: randomInt(1, 5),
        user_id: `${i}`,
        user_name: `${faker.name.firstName()}${faker.name.lastName()}`,
        email: `${faker.internet.exampleEmail()}`,
      },
    );
    count++;
    if (count === 3) {
      roomCount += 1;
      count = 1;
    }
  }
  writer.end();
  console.log('Toast is done');
};
reservationMaker();
