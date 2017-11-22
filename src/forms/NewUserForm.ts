import { createFormWithSchema, field } from '../containers/Form';

class NewUserSchema {
  @field() public readonly email: string;
  @field() public readonly username: string;
  @field() public readonly password: string;
}

export const NewUserForm = createFormWithSchema(NewUserSchema);
