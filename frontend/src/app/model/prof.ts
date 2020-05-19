import { Subject } from "./subject";

export class Prof {
  public id: string;
  public name: string;
  public image: string;
  public rateCounter: number;
  public commentCounter: number;
  public overallR: string;
  public ratesByHelpfulness: string;
  public ratesByPreparedness: string;
  public ratesByDiction: string;
  public subjects: Subject[];
}
