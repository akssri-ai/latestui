import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
 import * as Excel from "exceljs/dist/exceljs.min.js"
// import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';
//import { UserDetailModelService } from './shared/user-detail-model.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

// import Excel = require('exceljs');

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

	//constructor(private userDetailModelService : UserDetailModelService) { }
	constructor(){}
  public exportAsExcelFile(json: any[], excelFileName: string, headersArray: any[],  companyName: string,scenarioName: string): void {

    // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    // console.log('worksheet',worksheet);
    const columnNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const header = headersArray;
    const data = json;

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(excelFileName);
    worksheet.getCell(1,1).value = companyName + " : " + scenarioName;
    worksheet.getCell(1,1).font = { bold : true };
    worksheet.getCell(2, 1).value =""
    worksheet.getCell(2,1).font = { bold : true };
    //Add Header Row
    let headerRow = worksheet.addRow(header);

    data.forEach((element) => {
      let eachRow = [];
      headersArray.forEach((headers) => {
        eachRow.push(element[headers])
      })
      
      worksheet.addRow(eachRow);
      
    })

    // doing alignment 
    worksheet.eachRow(function (Row, rowNum) {
      Row.eachCell(function (Cell, cellNum) {
        if (cellNum == 1) {
            Cell.alignment = {
                vertical: 'middle',
                horizontal: 'left'
            }
        }else{
          Cell.alignment = {
              vertical: 'middle',
              horizontal: 'right'
          }
		  

          //Giving currency formatter to these rows
          if(rowNum > 2){
            if((rowNum == 4 || rowNum == 6 || rowNum == 7 || rowNum == 9 
              || rowNum == 10 || rowNum == 12 || rowNum == 13 || rowNum == 15 || rowNum == 16||rowNum == 17  ||rowNum == 19||rowNum == 20)){
              if(cellNum > 1){
                Cell.numFmt = '$#,###;-$#,###;'
              }
            }
            else{
              if(cellNum > 1){
                Cell.numFmt = "0.00%";
              }
            }
          }
        }
      })
    })

    //below row are highlighted as bold - Total Revenue, Gross Profit ,EBIT, EBITDA, EBT, Net Income

    worksheet.getColumn(1).width = 50;
    
    worksheet.getRow(4).font = {bold: true}
    worksheet.getRow(7).font = {bold: true}
    worksheet.getRow(10).font = {bold: true}
    worksheet.getRow(13).font = {bold: true}
    worksheet.getRow(16).font = {bold: true}
    worksheet.getRow(19).font = {bold: true}

    headersArray.forEach( (val, i) => {
      worksheet.getCell(3, i + 1).font = i == 0 ? {italic: true} : {bold: true}
    });

    worksheet.getRow(5).font = {italic: true}
    worksheet.getRow(8).font = {italic: true}
    worksheet.getRow(11).font = {italic: true}
    worksheet.getRow(14).font = {italic: true}
    worksheet.getRow(17).font = {italic: true}
    worksheet.getRow(20).font = {italic: true}



    // worksheet.getColumn(4).width = 20;
    // worksheet.getColumn(5).width = 30;
    // const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'],};
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    // this.saveAsExcelFile(data, excelFileName);

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: EXCEL_TYPE });
      FileSaver.saveAs(blob, excelFileName + EXCEL_EXTENSION);
      // 
      
    })
  }

  cleanString(input) {
    let regex = /^[0-9a-zA-Z\_]+$/
  
    let output = '';
    for (let i = 0; i < input.target.value.length; i++) {
      if (regex.test(input.target.value.charAt(i))) {
        output += input.target.value.charAt(i);
      }
    }
    input.target.value = output;
  }

  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], {
  //     type: EXCEL_TYPE
  //   });
  //   // FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  //   let url = window.URL.createObjectURL(data);
  //   let a = document.createElement("a");
  //   document.body.appendChild(a);
  //   a.setAttribute("style", "display: none");
  //   a.href = url;
  //   a.download = fileName + EXCEL_EXTENSION;
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  //   a.remove();
  // }
}