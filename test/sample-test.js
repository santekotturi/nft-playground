const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('KiftVanNFT', function () {
  it('Should mint and transfer an NFT to someone', async function () {
    const KiftVans = await ethers.getContractFactory('KiftVans');
    const kiftVans = await KiftVans.deploy();
    await kiftVans.deployed();

    // const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    const metadataURI = 'cid/test.png';

    let balance = await kiftVans.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await kiftVans.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther('0.05')
    });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    console.log('Minted NFT 1: ', newlyMintedToken);

    balance = await kiftVans.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await kiftVans.isContentOwned(metadataURI)).to.equal(true);

    const newlyMintedToken2 = await kiftVans.payToMint(recipient, 'foo', {
      value: ethers.utils.parseEther('0.05')
    });
    await newlyMintedToken2.wait();
    console.log('Minted NFT 2: ', newlyMintedToken2);

    expect(await kiftVans.isContentOwned('foo')).to.equal(true);
    // expect(await kiftVans.isContentOwned('bar')).to.equal(true);  // expect to fail
  });
});
