const request = ({ web3, blocks }) => {
  const batch = new web3.eth.BatchRequest();
  let promises = blocks.map(block => {
    return new Promise((resolve, reject) => {
      batch.add(
        web3.eth.getBlock.request(block, (error, data) => {
          error ? reject(error) : resolve(data);
        })
      );
    });
  });

  batch.execute();
  return Promise.all(promises);
};

export default request;
