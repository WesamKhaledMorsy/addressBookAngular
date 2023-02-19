import { Department } from "../department/department.model";
import { Job } from "../job/job.model";

export class Book{

  id !: string;
  fullName : string="";
  mobile :string="";
  address : string ="";
  dateOfBirth : string="";
  age ?: number ;
  photo: string="";

  jobId : string="";
  jobTitle : string="";

  departmentId : string="";
  departmentName : string="";

}
export class BookData{
  dapartments: Department[]=[];
  jobs:Job[]=[];
}
