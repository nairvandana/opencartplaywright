import {parse} from 'csv-parse/sync'
import fs from 'fs'


//Define the type of object which is returned from CSV parser
interface LoginData {
  testname: string;
  username: string;
  password: string;
  expected: string;
}


export class DataProvider
{

  static getdatafromJson(filepath:string): LoginData[]
  {
            let retrievedObjects = JSON.parse(fs.readFileSync(filepath,'utf-8'))
            //convert jon array to javascript objects array
            return retrievedObjects
  }


  static getdatafromCSV(filepath:string):LoginData[]
  {    // Reads the CSV file as a string
       let filecontent = fs.readFileSync(filepath,'utf-8')
       //Converts the CSV string into an array of objects, where each object represents a row and keys come from the header row.
       const records:LoginData[] = parse(filecontent,{columns:true,skip_empty_lines:true,trim:true})
       return records

  }

}
