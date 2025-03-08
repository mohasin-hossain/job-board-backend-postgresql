import { IApplication } from "../applications/applications.interface";

export type IJob = {
  id?: number;
  title: string;
  description: string;
  company: string;
  location: string;
  created_at?: Date;
  applications?: IApplication[];
};
