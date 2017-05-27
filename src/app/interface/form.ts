export interface Form {
  id: number;
  category: string;
  name: string;
  description: string;
  deviceType: string;
  defaultValue: string;
  dataType: string[];
  format: {};
  enumerationsList: string[];
  rangeMin: number;
  rangeMax: number;
  precision2: number;
  accuracy: number;
}
