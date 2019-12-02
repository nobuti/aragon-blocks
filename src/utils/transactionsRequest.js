const request = async ({ web3, transactions }) => {
  const batch = new web3.eth.BatchRequest();
  let promises = transactions.map(transaction => {
    return new Promise((resolve, reject) => {
      batch.add(
        web3.eth.getTransaction.request(transaction, async (error, data) => {
          if (error) {
            reject(error);
          } else {
            const { gasUsed } = await web3.eth.getTransactionReceipt(data.hash);
            const transactionFee = data.gasPrice * gasUsed; // calculate the transaction fee
            resolve({
              ...data,
              fee: web3.utils.fromWei(`${transactionFee}`),
              ether: web3.utils.fromWei(new web3.utils.BN(data.value))
            });
          }
        })
      );
    });
  });

  batch.execute();
  return Promise.all(promises);
};

export default request;
