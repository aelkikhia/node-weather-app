var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers');
      }
    }, 1500);
  });
};

asyncAdd(5, '7').then((res) => {
  console.log('Result:', res);
  return asyncAdd(res, 33);
}).then((res) => {
  console.log('Should be 45:', res);
}).catch((errorMessage) => {
  console.log(errorMessage);
});

// asyncAdd(2, 'l').then((res) => {
//   console.log('Result:', res);
// }, (errorMesage) => {
//   console.log('error:', errorMesage);
// });
// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Hey, it worked!');
//     reject('Unabled to fulfill promise');
//   }, 2500);
// });
//
// somePromise.then((message) => {
//   console.log('Success', message);
// }, (errorMessage) => {
//   console.log('Error', errorMessage);
// });
