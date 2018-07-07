const mongoose = require('mongoose')
const userModel = require('../models/userModel');

const profileURL = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fc/fc4aeb854b209f34718fb2af6be0a7168a241d84_medium.jpg"

var newUser

describe('We can create users successfully', () => {

  beforeAll(async () => {
    await mongoose.connect(`mongodb://nkamm:boson@ds014658.mlab.com:14658/testlab`)
    newUser = await userModel.create({
     displayName: "Jest",
     profileurl: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fc/fc4aeb854b209f34718fb2af6be0a7168a241d84_medium.jpg",
     avatarmedium: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fc/fc4aeb854b209f34718fb2af6be0a7168a241d84_medium.jpg",
     steam64ID: "76561198197292179",
   })
  })

  test('foobar', () => {
    let {
      tradesOpen,
      profileVisits,
      trades,
      displayName,
      profileurl,
      avatarmedium,
      steam64ID,
      time
    } = newUser
    expect(tradesOpen).toBe(0)
    expect(profileVisits).toBe(0)
    expect(trades).toEqual(expect.arrayContaining([]))
    expect(displayName).toEqual("Jest")
    expect(profileurl).toEqual(profileURL)
    expect(avatarmedium).toEqual(profileURL)
    expect(steam64ID).toEqual("76561198197292179")
    expect(time).toEqual(expect.any(Date))
  })

  afterAll(async () => {
    //await newUser.remove()
    await mongoose.connection.close()
  })
})
