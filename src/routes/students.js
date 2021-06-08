
const express = require('express');
// const { json } = require('express');
const studentsRouter = express.Router();
const xlsx = require('xlsx')
const studentsModel = require('../models/students/students-collection.js');
const bearer=require('../middleware/bearer');
const authorized=require('../middleware/authorize');

studentsRouter.post('/addStudentsData',bearer,authorized('create'), async (req, res) => {
  let wb = xlsx.readFile('src/routes/studentsInfo.xlsx', { cellDates: true });
  // console.log(wb.SheetNames) // this will give an aray of the topics bellow to the left
  // the option Celldata:true is to show the date in the excel sheet as js date

  let workSheet = wb.Sheets["Sheet1"];

  let data = xlsx.utils.sheet_to_json(workSheet) //this to transform Excel to JSON

  // let newWorkingBook = xlsx.u tils.book_new();
  // let newWorkingSheet = xlsx.utils.json_to_sheet(data) // the one after edit should be passed in here
  // xlsx.utils.book_append_sheet(newWorkingBook, newWorkingSheet, "new something");
  // xlsx.writeFile(newWorkingBook, "newStudentsSheet.xlsx");

  for (let i = 11; i < data.length; i++) {
      console.log("hi there", Object.values(data[i])[0])
      studentsModel.create({
          firstName: Object.values(data[i])[0],
          lastName: Object.values(data[i])[1],
          email: Object.values(data[i])[2],
          birthDate: Object.values(data[i])[3],
          nationallity: Object.values(data[i])[4],
          nationlNumber: Object.values(data[i])[5],
          mark: Object.values(data[i])[6],

      }).then(result => {
          console.log(result)
      })
  }

  return res.status(200).json({ success: true });
})

studentsRouter.post('/onestudent',bearer,authorized('create'),async(req,res)=>{
  const data= await studentsModel.create(req.body);
  res.status(201).json(data);

})

studentsRouter.put('/firstenter/:id', async(req, res) => {
  let id = req.params.id;
 let data= await studentsModel.get(id)[0];
 if(data.firstEnterance===false){
  await studentsModel.update(id,{firstEnterance:true})
  let results= await studentsModel.get(id)
  res.status(200).json(results[0]);
 }else{
  res.status(403).json({result:"this user aready took the exam"}); 
 }
});


// router
//   .get('/', studentControllers.getAllUsers)
//   // .get('/:id', studentControllers.getUserById)
//   .post('/addStudentsData', async (req, res) => {

//     let wb = await xlsx.readFile('studentsInfo.xlsx', { cellDates: true });
//     // console.log(wb.SheetNames) // this will give an aray of the topics bellow to the left
//     // the option Celldata:true is to show the date in the excel sheet as js date

//     let workSheet = await wb.Sheets["Sheet1"];

//     let data = await xlsx.utils.sheet_to_json(workSheet) //this to transform Excel to JSON

//     // let newWorkingBook = xlsx.utils.book_new();
//     // let newWorkingSheet = xlsx.utils.json_to_sheet(data) // the one after edit should be passed in here
//     // xlsx.utils.book_append_sheet(newWorkingBook, newWorkingSheet, "new something");
//     // xlsx.writeFile(newWorkingBook,"newStudentsSheet.xlsx");
//     for (let i = 0; i < data.length; i++) {
//        // add to DB
//         console.log(data.length)
//     }
//     return res.status(200).json({ success: true, data });

// })


// .put('/:id', studentControllers.setUserMark)
// .get('/sendStudentData', (req, res) => {
//   console.log(req.query)
//   res.render('/test', { fn: req.query })
// })
module.exports = studentsRouter;
