
const express = require('express');
const router = express.Router();

router
  .get('/', studentControllers.getAllUsers)
  // .get('/:id', studentControllers.getUserById)
  .post('/addStudentsData', async (req, res) => {

    let wb = await xlsx.readFile('studentsInfo.xlsx', { cellDates: true });
    // console.log(wb.SheetNames) // this will give an aray of the topics bellow to the left
    // the option Celldata:true is to show the date in the excel sheet as js date

    let workSheet = await wb.Sheets["Sheet1"];

    let data = await xlsx.utils.sheet_to_json(workSheet) //this to transform Excel to JSON

    // let newWorkingBook = xlsx.utils.book_new();
    // let newWorkingSheet = xlsx.utils.json_to_sheet(data) // the one after edit should be passed in here
    // xlsx.utils.book_append_sheet(newWorkingBook, newWorkingSheet, "new something");
    // xlsx.writeFile(newWorkingBook,"newStudentsSheet.xlsx");
    for (let i = 0; i < data.length; i++) {
       // add to DB
        console.log(data.length)
    }
    return res.status(200).json({ success: true, data });

})


// .put('/:id', studentControllers.setUserMark)
// .get('/sendStudentData', (req, res) => {
//   console.log(req.query)
//   res.render('/test', { fn: req.query })
// })
module.exports = router;
