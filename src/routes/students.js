
const { json } = require('express');
const express = require('express');
const router = express.Router();
const xlsx = require('xlsx')
let studentColletion = require("../models/students/studentCollection")


router.post('/addStudentsData', async (req, res) => {
    let wb = xlsx.readFile('src/routes/studentsInfo.xlsx', { cellDates: true });
    console.log(wb.SheetNames) // this will give an aray of the topics bellow to the left
    // the option Celldata:true is to show the date in the excel sheet as js date

    let workSheet = wb.Sheets["new something"];

    let data = xlsx.utils.sheet_to_json(workSheet) //this to transform Excel to JSON


    for (let i = 0; i < data.length; i++) {
        console.log("hi there", Object.values(data[i])[0])
        studentColletion.create({
            firstName: Object.values(data[i])[0],
            lastName: Object.values(data[i])[1],
            email: Object.values(data[i])[2],
            birthDate: Object.values(data[i])[3],
            nationallity: Object.values(data[i])[4],
            nationlNumber: Object.values(data[i])[5],
            mark: Object.values(data[i])[6],
        }).then(result => {
            data[i].ID = JSON.stringify(result._id);
            let newWorkingBook = xlsx.utils.book_new();
            let newWorkingSheet = xlsx.utils.json_to_sheet(data) // the one after edit should be passed in here
            xlsx.utils.book_append_sheet(newWorkingBook, newWorkingSheet, "new something");
            xlsx.writeFile(newWorkingBook, "src/routes/studentsInfo.xlsx")
        })
    }

    return res.status(200).json({ success: true, data });
})
router.post('/addStudentsDatatest', async (req, res) => {
    let studentsData = JSON.parse(req.body.data);
    // let studentsDataWithID = [];
    const studentsDataWithID = studentsData.map((val, i) => {
        console.log(i)
        return studentColletion.create({
            firstName: studentsData[i][0],
            lastName: studentsData[i][1],
            email: studentsData[i][2],
            birthDate: studentsData[i][3],
            nationallity: studentsData[i][4],
            nationlNumber: studentsData[i][5],
            mark: studentsData[i][6],
        })

        console.log(savedStudentInfo._id)
        studentsDataWithID.push({
            First_Name: studentsData[i][0],
            Last_Name: studentsData[i][1],
            Email: studentsData[i][2],
            BirthDate: studentsData[i][3],
            Nationallity: studentsData[i][4],
            NationlNumber: studentsData[i][5],
            Mark: studentsData[i][6],
            ID: savedStudentInfo._id
        })

    })
    if (studentsDataWithID.length > 0) {
        console.log('test', studentsDataWithID)
        let newWorkingBook = xlsx.utils.book_new();
        let newWorkingSheet = xlsx.utils.json_to_sheet(studentsDataWithID) // the one after edit should be passed in here
        xlsx.utils.book_append_sheet(newWorkingBook, newWorkingSheet, "new something");
        xlsx.writeFile(newWorkingBook, "src/routes/studentsInfo.xlsx");
    }
    // setTimeout(() => {
    //     console.log("students data", studentsSheetRow)
    // }, 3000)



})

    .put("/updateMark", (req, res) => {
        console.log(req.body)

    })

module.exports = router;
