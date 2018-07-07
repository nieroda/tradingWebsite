const redis = require('redis')

let client
const s64_id = "76561198197292179"
const dummyData = [{"item_id":80,"effect":null,"itemData":"v"},{"item_id":86,"effect":null,"itemData":"v"},{"item_id":251,"effect":null,"itemData":""},{"item_id":9999,"effect":6,"itemData":"u"},{"item_id":505,"effect":6,"itemData":"u"},{"item_id":368,"effect":6,"itemData":"su"}]
const mongoID = "_id507f191e810c19729de860ea"

const fakeTrade = {
  user: s64_id,
  mongoID,
  dummyData,
  toHave: dummyData
}

function insertRedis() {
  return new Promise((resolve, reject) => {
    client.lpush(`trade:${s64_id}`, JSON.stringify(fakeTrade), (err, result) => {
      return err ? reject(false) : resolve(true)
    })
  })
}

function trimTrade() {
  return new Promise((resolve, reject) => {
    client.ltrim(`trade:${s64_id}`, '0', '9', (err, resp) => {
      return err ? reject(false) : resolve(true)
    })
  })
}

function queryRedis() {
  return new Promise((resolve, reject) => {
    client.lrange(`trade:${s64_id}`, '0', '-1', (err, res) => {
      return err ? reject(100) : resolve(res.length)
    })
  })
}



describe('We can create 10 trades in redis max', () => {
  beforeAll(async () => {
    client = redis.createClient()
  })

  test(`Creating trade, testing values`, async () => {
    for (let i = 0; i < 200; i++) {
      expect(await insertRedis()).toBeTruthy()
      expect(await trimTrade()).toBeTruthy()
      expect(await queryRedis()).toBeLessThan(11)
    }
  })

  afterAll(async () => {
    await client.quit()
  })

});
