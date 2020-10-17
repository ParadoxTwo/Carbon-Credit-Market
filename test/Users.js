const Users = artifacts.require('Users.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Users', ([deployer, user1, user2]) => {
    let users
    
    before(async () => {
      users = await Users.deployed()
    })

 describe('deployment', async () => {
    it('deploys successfully', async () => {      
  const address = await users.address
  assert.notEqual(address, 0x0)
  assert.notEqual(address, '')
  assert.notEqual(address, null)
  assert.notEqual(address, undefined)
    })
  })

	describe('Tenements',async ()=>{
	let result
		it('checking register', async()=>{
			result=await users.register(user1,"Yakshith","1234")
      console.log(result)
      let name = await users.name();
      assert.notEqual(name, '')
      assert.notEqual(name, null)
      assert.notEqual(name, undefined)

    describe('Tenements',async ()=>{
  let ten
      it('add tenement', async () => {
        ten = await users.addTenement("Yakshith",user1,456,"\[\[\"80\",\"25\"\], \[\"40\",\"50\"\]\]")
        console.log(ten);
        let tenement = await users.tenements(0)
        let latitude = await users.coordinates(0,0,0)
        let longitude = await users.longitude(0,0,1)
        assert.equal(tenement.id, 0)
        assert.equal(tenement.owner, user1)
        assert.equal(tenement.name, 'Yakshith')
        assert.equal(tenement.sequestrationRate, 456)
        assert.equal(latitude,"80")
        assert.equal(longitude,"25")

      })
    })

      describe('MTenement',async ()=>{
        let mten
        it('modify tenement', async () => {
          mten = await users.modifyTenement(0,"\[\[\"40\",\"50\"\], \[\"15\",\"35\"\]\]", 897)
          console.log(mten)
          let tenement = await users.tenements(0)
          let latitude = await users.coordinates(0,0,0)
          let longitude = await users.longitude(0,0,1)
          assert.equal(tenement.id, 0)
          assert.equal(tenement.sequestrationRate, 897)
          assert.equal(latitude,"40")
          assert.equal(longitude,"50")
        })
      })
      
      describe('CTOwner', async ()=>{
        let ctowner
        it('change tenement owner', async () => {
          ctowner = await users.changeTenementOwner(0,user1,user2)
          console.log(ctowner)
          let tenement = await users.tenements(0)
          assert.notEqual(tenement.owner, 0x0)
          assert.equal(tenement.owner, user2)
        })
      })
    })
  })
})