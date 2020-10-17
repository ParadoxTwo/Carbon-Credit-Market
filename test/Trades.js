// const Trades = artifacts.require('Trades.sol')

// require('chai')
//     .use(require('chai-as-promised'))
//     .should()

// contract('Trades', (accounts) => {
//     let trades
    
//     before(async () => {
//       trades = await Trades.deployed()
//     })

//  describe('tdeployment', async () => {
//     it('T deploys successfully', async () => {      
//   const taddress = await trades.address
//   assert.notEqual(taddress, 0x0)
//   assert.notEqual(taddress, '')
//   assert.notEqual(taddress, null)
//   assert.notEqual(taddress, undefined)
//     })
//   })

//   describe('Transaction',async () => {
// 	let tresult
// 		it('checking initiatedtrade', async()=>{
// 			tresult=await trades.initiateTrade("0xd05c1bE469E7ad141b2dBebEceff5F031A637241","789")
//       console.log(tresult)
//       assert.notEqual(tresult, 0x0)
//       assert.notEqual(tresult, '')
//       assert.notEqual(tresult, null)
//       assert.notEqual(tresult, undefined)

//     describe('initiating trade manual',async ()=>{
//   let tten
//       it('checking initial trade manual rate', async () => {
//         tten = await trades.initiateTradeManualRate("0x80870DC04cC0d624AE82d05EFd95e9CAa87928A9","741","852")
//           console.log(tten)
//           assert.notEqual(tten, 0x0)
//           assert.notEqual(tten, '')
//           assert.notEqual(tten, null)
//           assert.notEqual(tten, undefined)

//       })
//     })
//     describe('accept trade',async ()=>{
//       let aten
//       it('accepting trade', async () => {
//         aten = await trades.acceptTrade("0x6cbce84E58652DdAF53d89f4dF4b14388caf1563")
//         console.log(aten)
//         assert.notEqual(aten, 0x0)
//         assert.notEqual(aten, '')
//         assert.notEqual(aten, null)
//         assert.notEqual(aten, undefined)
//       })
//     })

//     describe('accept trade manual',async ()=>{
//       let atten
//       it('acceptingt ade manual', async () => {
//         atten = await trades.acceptTradeManual("0xe12f5c8523CDf915D0c267C88D6F24CCAFB531Ef","1234")
//         console.log(atten)
//         assert.notEqual(atten, 0x0)
//         assert.notEqual(atten, '')
//         assert.notEqual(atten, null)
//         assert.notEqual(atten, undefined)
//       })
//     })

//     describe('finalizing trade',async ()=>{
//       let ften
//       it('final trade', async () => {
//         ften = await trades.finalizeTrade("0x6E773836fFFC8bD6a781b266bc9e51970020F837")
//         console.log(ften)
//         assert.notEqual(ften, 0x0)
//         assert.notEqual(ften, '')
//         assert.notEqual(ften, null)
//         assert.notEqual(ften, undefined)
//       })
//     })
//     })
// })
// })