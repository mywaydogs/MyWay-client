import { CustomerDto } from "../customers/customer.dto";
import { DogMultipleChoiceDto } from "./dog-multiple-choice.dto";

export interface DogDto {
  id: number;
  name: string;
  birthDate: string;
  breed: string;
  socialization: string;
  litterSeparation: string;
  origin: string;
  healthIssues: string;
  foodDrive: DogMultipleChoiceDto;
  preyDrive: DogMultipleChoiceDto;
  currentSchedule: string;
  energyLevel: DogMultipleChoiceDto;
  homeBehaviours: string;
  outsideBehaviours: string;
  customer: CustomerDto;
}
