import { faker } from "@faker-js/faker";

export class randomDataGenerator
{

 static getFirstname()
 {
         return faker.person.firstName()
 }


 static getlastName()
 {
    return faker.person.lastName()

 }


 static getFullName()
 {
    return faker.person.fullName()
 }

 static getEmail()
 {
   return faker.internet.email()
 }

 static getTelephone()
 {
    return faker.phone.number()
 }

 static getPassword()
 {
    return faker.internet.password()
 }
 



}