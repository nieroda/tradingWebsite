const redis = require('redis')

const client = redis.createClient()
const nathan = "76561198197292179"
const dummyData = [{"item_id":80,"effect":null,"itemData":"v"},{"item_id":86,"effect":null,"itemData":"v"},{"item_id":251,"effect":null,"itemData":""},{"item_id":9999,"effect":6,"itemData":"u"},{"item_id":505,"effect":6,"itemData":"u"},{"item_id":368,"effect":6,"itemData":"su"}]
const mongoID = "_id507f191e810c19729de860ea"

const fakeTrade = {
  user: nathan,
  mongoID,
  dummyData,
  toHave: dummyData
}

function insertRedis() {
  return new Promise((resolve, reject) => {
    client.lpush(`trade:${nathan}`, JSON.stringify(fakeTrade), (err, result) => {
      return err ? reject(false) : resolve(true)
    })
  })
}

function trimTrade() {
  return new Promise((resolve, reject) => {
    client.ltrim(`trade:${nathan}`, '0', '9', (err, resp) => {
      return err ? reject(false) : resolve(true)
    })
  })
}

function queryRedis() {
  return new Promise((resolve, reject) => {
    client.lrange(`trade:${nathan}`, '0', '-1', (err, res) => {
      return err ? reject(100) : resolve(res.length)
    })
  })
}


afterAll(() => {
  client.quit()
})

describe('We can create 10 trades in redis max', () => {
  for (let i = 0; i < 20; i++) {
    test(`Create trade ${i}`, async () => {
      expect(await insertRedis()).toBeTruthy()
      expect(await trimTrade()).toBeTruthy()
      expect(await queryRedis()).toBeLessThan(11)
    });
  }
});
