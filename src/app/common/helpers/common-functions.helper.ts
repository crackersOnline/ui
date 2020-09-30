/* import * as moment from 'moment-timezone';
import { AppConstantsHelper } from './app-constants.helper';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as fs from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export class CommonFunctionsHelper {

    public static formatTimeToAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    public static getESTTime(inputString: string) {
        const momentObj = moment.tz(inputString, 'America/New_York');
        if (momentObj.hour() >= 0 && momentObj.hour() <= 5) {
            momentObj.add(1, 'days');
        }
        return momentObj;
    }
    public static replaceCharacters(value) {
        if (value) {
            const replacebleChars = ['/', '-', '+', '_', '@', '!', '#', '*'];
            if (typeof value === 'string') {
                replacebleChars.forEach((char) => {
                    value = value.split(char).join(' ' + char + ' ');
                });
            }
            const splittedValues = value.split(' ');
            const reConstructedValues = [];
            splittedValues.forEach((element, index) => {
                if (element.length > 20) {
                    const upperValue = Math.ceil(element.length / 20);
                    const reConstructed = [];
                    for (let i = 0; i < upperValue; i++) {
                        reConstructed.push(element.substring(i * 20, ((i * 20) + 20) - 1));
                    }
                    reConstructedValues.push({ index, newVal: reConstructed.join(' ') });
                }
            });
            if (reConstructedValues.length > 0) {
                reConstructedValues.forEach(val => {
                    splittedValues[val.index] = val.newVal;
                });
            }
            value = splittedValues.join(' ');
        }
        return value;
    }

    public static formatDate(date) {
        const time = date.toTimeString().split(' ')[0];
        const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${time}`;
        return formattedDate;
    }


    public static downloadExcel(header, rows, name, summary?: any ) {
        const workbook = new Excel.Workbook();
        const resultSheet = workbook.addWorksheet(name);
        resultSheet.columns = header;
        resultSheet.addRows(rows);
        resultSheet.autoFilter = 'A1:J1';
        resultSheet.getColumn(5).alignment = { vertical: 'top', wrapText: true };
        const headerRow = resultSheet.getRow(1);
        headerRow.font = { bold: true, size: 13 };
        headerRow.eachCell((cell) => {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'C0EFFF' }
            };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
          });


        // Setting height for each row
        rows.map((r, ind) => {
            const row = resultSheet.getRow(ind + 2);
           // row.height = 90;
            row.font = { size: 12 };
        });
/*
        const filterSheet = workbook.addWorksheet('Summary');
        const filterHeader = [
            { header: 'Summary', key: '', width: 22 },
            { header: '', key: '', width: 25 }
        ];
        filterSheet.columns = filterHeader;
        const filtersApplied = this.getFiltersApplied(summary);
        filterSheet.addRows(filtersApplied);
        filtersApplied.map((r, ind) => {
            const summaryRow = filterSheet.getRow(ind + 2);
            summaryRow.font = { size: 12 };
        });
        filterSheet.getColumn(1).font = { bold: true, size: 12 };
        filterSheet.getRow(1).font = { bold: true, size: 13 }; */
  /*      workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, `${name}.xlsx`);
        });

    }

    public static getFiltersApplied(summary); {
       const { UserSSO, UserEmail, FirstName, LastName, UserRole, UserStatus, UserCategoriesList, UserModuleList } = summary;
       const rows = [
           ['SSO', UserSSO],
           ['Email Id', UserEmail],
           ['First Name', FirstName],
           ['Last Name', LastName],
           ['Role', UserRole],
           ['Status', UserStatus],
           ['Categories', UserCategoriesList],
           ['Modules', UserModuleList]
       ];
       return rows;
    }

    public static downloadPDF(header, row); {
        const doc = new jsPDF();
        doc.autoTable({
            head: header,
            body: row
        });
        doc.save('ClosedCaptionSearch.pdf');
    }

    public static getFormattedDate(date); {
        if (date) {
            return moment(date).format('MM/DD/YYYY');
        }
    }
    public static onlyUnique(value, index, self); {
        return self.indexOf(value) === index;
    }

    public static getFormattedDateForQuery(date); {
        if (date) {
            return moment(date).format('YYYY-MM-DD');
        }
    }

    public static copyArray(source: any[]); {
        const destination = [];
        source.forEach(val => {
            destination.push(JSON.parse(JSON.stringify(val)));
        });
        return destination;
    }

    public static renderElementsIntoPDF(elements: any, fileName: string, headerElements ? : any[]); {
        const promise = new Promise(resolve => {
            const pdf = new jsPDF('landscape');
            let counter = 0;
            const headerImageDimensions = {
                h: 10,
                w: 280,
                t: 10,
                l: 10
            };
            CommonFunctionsHelper.generateCanvasArray(headerElements).then((headers: any[]) => {
                CommonFunctionsHelper.generateCanvasArray(elements).then((canvases: any[]) => {
                    canvases.forEach(can => {
                        const imgData = can.canvas.toDataURL('image/png');
                        const headerHeight = headerImageDimensions.h * headers.length;
                        headers.forEach((headerElement, index) => {
                            if (headerElement.displayFor.indexOf(can.order) !== -1) {
                                const headerImgData = headerElement.canvas.toDataURL('image/png');
                                pdf.addImage(headerImgData, 'PNG', 10, 10 + (headerImageDimensions.h * index),
                                    headerImageDimensions.w,
                                    headerImageDimensions.h,
                                    '',
                                    'FAST');
                            }

                        });
                        pdf.addImage(imgData,
                            'PNG', 10,
                            headerHeight + headerImageDimensions.t,
                            280,
                            175 - headerHeight,
                            '',
                            'FAST');
                        if (counter < elements.length - 1) {
                            pdf.addPage();
                        }
                        if (counter === elements.length - 1) {
                            pdf.save(fileName + '.pdf');
                            resolve();
                        }
                        counter++;
                    });
                });

            });
        });
        return promise;
    }

    private static generateCanvasArray(elements: any[]); {
        const promise = new Promise(resolve => {
            let counter = 0;
            const canvasArray = [];
            elements.forEach(el => {
                html2canvas(el.el, {
                    width: el.el.offsetWidth + 30,
                    height: el.el.offsetHeight,
                    scale: 2
                }).then((canvas) => {

                    canvasArray.push({
                        canvas,
                        order: el.order,
                        displayFor: el.displayFor ? el.displayFor : []
                    });
                    counter++;
                    if (counter === elements.length) {
                        canvasArray.sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0));
                        resolve(canvasArray);
                    }
                });
            });
        });
        return promise;
    }

    public static convertToCSV(jsondata); {
        const out = Object.keys(jsondata).map((data) => {
            return data + ':' + jsondata[data];
        });
        return out.slice(0, out.length).join(', ').toString();

    }

    public static getUserActions(key: any); {
        const userActions: { [k: string]: any } = {};
        AppConstantsHelper.userActions.forEach(userAction => {
            if (userAction.userAction === key) {
                userActions.action = userAction.userAction;
                userActions.actionDescription = userAction.actionDescription;
            }
        });
        return userActions;
    }

    public static clearLocalStorageForAuth(); {
        localStorage.removeItem(AppConstantsHelper.loggedInUser);
        localStorage.removeItem('id_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('access_token_issuedate');
        localStorage.removeItem('expires_in');
    }

    public static sortArrayBasedOnAStringValuedProp(data, prop, direction); {
        data.sort((a, b) => {
            const nameA = a[prop].toLowerCase();
            const nameB = b[prop].toLowerCase();
            const firstCheck = direction.toLowerCase() === 'asc' ? nameA < nameB : nameA > nameB;
            const secondCheck = direction.toLowerCase() === 'asc' ? nameA > nameB : nameA < nameB;
            if (firstCheck) {
                return -1;
            }
            if (secondCheck) {
                return 1;
            }
            return 0;
        });
    }
}
 ;*/
