const Pets = require("../Schemas/petsSchemas");
const AppOperations = require("../Schemas/AppOperationsSchemas");

async function petOfTheWeekModel() {
  try {
    let currentDay = new Date().getDay();
    let isRandomized = await AppOperations.find({}, { isRandomized: 1 });
    // let isRandomized = false;

    if (currentDay === 0 && !isRandomized) {
      const petInfo = await randomizedPet();

      let petId = petInfo[0]._id;
      const PetsOfTheWeekList = await AppOperations.updateOne(
        { _id: "63c3ca514d92b37155fdc20d" },
        { $push: { petsOfTheWeek: petId } }
      );

      const changeIsRandomized = await AppOperations.updateOne(
        { _id: "63c3ca514d92b37155fdc20d" },
        { isRandomized: true }
      );

      const PetOfTheWeek = await AppOperations.updateOne(
        { _id: "63c3ca514d92b37155fdc20d" },
        { petsOfTheWeekInfo: petInfo[0] }
      );
      return petInfo;

    } else if (currentDay === 1 && isRandomized) {
      const changeIsRandomized = await AppOperations.updateOne(
        { _id: "63c3ca514d92b37155fdc20d" },
        { isRandomized: false }
      );
      const petInfo = getPetOfTheWeek();
      return petInfo;

    } else {
      const petInfo = getPetOfTheWeek();
      return petInfo;
    }
  } catch (err) {
    console.log(err);
  }
}

async function randomizedPet() {
  try {
    const allPets = await Pets.find({}, { _id: 1 });// remove isadopted pet from resulte
    const rnd = Math.round(Math.random() * allPets.length);
    const petId = allPets[rnd];

    // const prevPetsList = await AppOperations.find(
    //     { _id: "63c3ca514d92b37155fdc20d" },
    //     { petsOfTheWeek: 1 }
    //     );
    //     const petsOfTheWeekList = prevPetsList[0].petsOfTheWeek;
    //     console.log("list of pets of the week:", petsOfTheWeekList);
    //     console.log("pet id:", petId);

    const petInfo = await Pets.find({ _id: petId });

    return petInfo;
  } catch (err) {
    console.log(err);
  }
}

async function getPetOfTheWeek() {
  try {
    const petOfTheWeek = await AppOperations.find(
      { _id: "63c3ca514d92b37155fdc20d" },
      { petsOfTheWeekInfo: 1 }
    );

    const petInfo = [petOfTheWeek[0].petsOfTheWeekInfo];
    return petInfo;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
    petOfTheWeekModel,
};