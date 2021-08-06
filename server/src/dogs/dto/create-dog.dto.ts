export class CreateDogDto {
  name: string;
  age_years?: number;
  age_months?: number;
  breed?: string;
  color?: string;
  customerId: number;
}
