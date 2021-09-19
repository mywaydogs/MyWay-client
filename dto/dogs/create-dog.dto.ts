import { DogMultipleChoiceDto } from "./dog-multiple-choice.dto";

export interface CreateDogDto {
  customerId: number;
  name: string;
  ageYears: number;
  ageMonths: number;
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
}
