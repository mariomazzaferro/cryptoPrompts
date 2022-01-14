const Prompts = artifacts.require('Prompts');

contract('Prompts', (accounts) => {
  let prompts;
  beforeEach(async () => {
    prompts = await Prompts.new();
  });

  // Checks the value of the counter variable while calling mintPrompt() function.
  it('Should mintPrompt() successfully', async () => {
    let counter0 = await prompts.counter();
    await prompts.mintPrompt("Prompt1");
    let counter1 = await prompts.counter();
    await prompts.mintPrompt("Branch1", 1);
    let counter2 = await prompts.counter();

    let writerCollection = await prompts.writerCollection(accounts[0]);
    console.log(writerCollection);

    let writerPrompt2 = await prompts.collections(accounts[0], 1)

    let tokenURI = await prompts.tokenURI(1);
    console.log(tokenURI);

    assert.equal(counter0, 0, "counter0 is not 0!");
    assert.equal(counter1, 1, "counter1 is not 1!");
    assert.equal(counter2, 2, "counter2 is not 2!");

    assert.equal(writerPrompt2, 2, "writerPrompt2 is not 2!");
  });

  // Checks the value of the counter variable while calling mintPrompt() function
  // with invalid oldId argument. 
  it('Should NOT mintPrompt() successfully (validOldCid)', async () => {
    let counter0 = await prompts.counter();
    await prompts.mintPrompt("Prompt1");
    let counter1 = await prompts.counter();
    try {
      await prompts.mintPrompt("Branch1", 2);  //Should pass test
      //await prompts.mintPrompt("Comment1", 1); //Should fail test with counter2 = 2
    } catch(err) {
      console.log(err.message);
    }

    let counter2 = await prompts.counter();
    assert.equal(counter0, 0, "counter0 is not 0!");
    assert.equal(counter1, 1, "counter1 is not 1!");
    assert.equal(counter2, 1, "counter2 is not 1!");
  });

  // Checks if promptBranches() is working while minting branches.
  it('Should promptBranches() successfully', async () => {
    await prompts.mintPrompt("Prompt1");
    let branches0 = await prompts.promptBranches(1);
    await prompts.mintPrompt("Branch1", 1);
    let branches1 = await prompts.promptBranches(1);
    await prompts.mintPrompt("Branch2", 1);
    let branches2 = await prompts.promptBranches(1);

    assert.equal(branches0, 0, "branches0 is not 0!");
    assert.equal(branches1, 1, "branches1 is not 1!");
    assert.equal(branches2, 2, "branches2 is not 2!");
  });

  // Checks if promptCids getter is working properly.
  it('Should get promptCids successfully', async () => {
    await prompts.mintPrompt("Prompt1");
    let prompt1 = await prompts.promptCids(1);

    await prompts.mintPrompt("Prompt2");
    let prompt2 = await prompts.promptCids(2);

    await prompts.mintPrompt("Prompt3");
    let prompt3 = await prompts.promptCids(3);

    assert.equal(prompt1, "Prompt1", "prompt1 is not 'Prompt1'!");
    assert.equal(prompt2, "Prompt2", "prompt2 is not 'Prompt2'!");
    assert.equal(prompt3, "Prompt3", "prompt3 is not 'Prompt3'!");
  });

  // Checks if branches getter is working properly.
  it('Should return branch successfully', async () => {
    await prompts.mintPrompt("Prompt1");
    await prompts.mintPrompt("Branch1", 1);
    let branches1 = await prompts.branches(1, 0);
    await prompts.mintPrompt("Branch2", 1);
    let branches2 = await prompts.branches(1, 1);

    assert.equal(branches1, 2, "branches1 is not 2!");
    assert.equal(branches2, 3, "branches2 is not 3!");
  });
});