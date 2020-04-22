const User = artifacts.require('./User.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('User',()=>{
    let user
    before('initialize', async ()=>{
        user = await User.deployed();
    })
    describe('basic tests', async ()=>{
        it('deploys successfully', async ()=>{
            const address = await user.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        })
    })

})