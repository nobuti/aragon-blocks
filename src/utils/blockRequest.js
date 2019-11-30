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

  // const detail = await web3.eth.getTransaction(
  //   "0x2dbee8aa069df17324320000fb94b8b583da11c589b6926e529ab7d78462c9e6"
  // );

  // console.log(detail);

  batch.execute();
  return Promise.all(promises);
};

export default request;
