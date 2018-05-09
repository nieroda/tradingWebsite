var AsyncLock = require('async-lock');
var lock = new AsyncLock();


 const randomReturnFunction = () => {
   return new Promise(resolve => {
     setTimeout(
       () => { resolve() },
       5000 * Math.random())
   })
 }

 lock.acquire("foo", () => {
     console.log('one acquired')
     return randomReturnFunction()
 }).then(() => {
     console.log('one released')
 });


 lock.acquire("baz", () => {
     console.log('one acquired {1}')
     return randomReturnFunction()
 }).then(() => {
     console.log('one released {1}')
 });
