console.log('dfasd')
d3.json("data.json", function(error, data) {
  console.log(error)
  console.log(data)

  var livingThings = window.l = crossfilter(data);

  function getCurrentGroupReduceCount(lt) {
    // crossFilter is statefull
    var n = lt.groupAll().reduceCount().value();
    return n;
  }

  function getCurrentGroupReduceSumOfLeg(lt) {
    // crossFilter is statefull
    var legs = livingThings.groupAll().reduceSum(fact=>fact.legs).value()
    return legs;
  }

  // How many living things are in my house?
  // var n = livingThings.groupAll().reduceCount().value();
  var n = getCurrentGroupReduceCount(livingThings);
  console.log("There are " + n + " living things in my house.") // 6

  // How many total legs are in my house?
  // var legs = livingThings.groupAll().reduceSum(fact=>fact.legs).value()
  var legs = getCurrentGroupReduceSumOfLeg(livingThings);
  console.log("There are " + legs + " legs in my house.") // 14

  // group by type
  console.log("** group by type")
  var typeDimension = livingThings.dimension(d => d.type);

  console.log("** check sum of leg, still the grand total, even we had grouping them into type")
  var legs = getCurrentGroupReduceSumOfLeg(livingThings);
  console.log("There are " + legs + " legs in my house.") // 14

  // Filter for dogs.
  console.log("** filter by type dog")
  typeDimension.filter("dog");

  // var n = livingThings.groupAll().reduceCount().value();
  var n = getCurrentGroupReduceCount(livingThings);
  console.log("There are " + n + " dogs in my house.") // 2

  var legs = getCurrentGroupReduceSumOfLeg(livingThings);
  console.log("There are " + legs + " dog legs in my house.") // 14

  // Filter for human.
  console.log("** filter by type human")
  typeDimension.filter("human");

  var n = getCurrentGroupReduceCount(livingThings);
  console.log("There are " + n + " humans in my house.") // 2

  var legs = getCurrentGroupReduceSumOfLeg(livingThings);
  console.log("There are " + legs + " human legs in my house.") // 14

  // Clear the filter.
  console.log("** clear filter")
  typeDimension.filterAll()

  var legs = getCurrentGroupReduceSumOfLeg(livingThings);
  console.log("There are " + legs + " legs in my house.") // 14

  console.log("******* collection group")

  console.log("** count of item in each group")
  // How many living things of each type are in my house?
  var getGroupsOfAllType = typeDimension.group()
  var collectionOfItemCountInGroups = getGroupsOfAllType.reduceCount().top(Infinity);
  console.table(collectionOfItemCountInGroups)
  for (let item of collectionOfItemCountInGroups) {
    console.log(`There are ${item.value} ${item.key} in my house`)
  }

  console.log("** sum of legs in eachgroup")
  var collectionOfLegSumInGroups = getGroupsOfAllType.reduceSum( fact=>fact.legs).top(Infinity);
  console.table(collectionOfLegSumInGroups)
  for (let item of collectionOfLegSumInGroups) {
    console.log(`There are total of ${item.value} ${item.key} legs in my house`)
  }

  debugger;
});
