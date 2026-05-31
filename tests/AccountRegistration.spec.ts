import {test, expect} from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { RegistrationPage } from '../pages/RegistrationPage'
import { TestConfig } from '../test.config'
import { randomDataGenerator } from '../utils/randomDataGenerator'
import { DataProvider } from '../utils/dataProvider'

//Declare the global variables
let config:TestConfig
let homepage:HomePage
let registrationpage:RegistrationPage

test.beforeEach("Navigate to the registration page",async({page})=>{
  //Opne the url
    config = new TestConfig()
    await page.goto(config.appUrl)

    //Click Register link
    homepage = new HomePage(page)
    await homepage.clickmyAccount()
    await homepage.clickRegister()
    registrationpage = new RegistrationPage(page) 
})

test('New user registration test @Master @Sanity @Regression', async() =>{  //No page fixture is used
    //Enter all the details 
    
    const newpassword = randomDataGenerator.getPassword()
    const userData = {
        firstName:randomDataGenerator.getFirstname(),
        lastName:randomDataGenerator.getlastName(),
        email:randomDataGenerator.getEmail(),
        telephone:randomDataGenerator.getTelephone(),
        password:newpassword,
        confirmPassword:newpassword
    }
    await registrationpage.completeRegistration(userData)
    const issuccess = await registrationpage.accountCreationSuccess()
    expect(issuccess).toBe(true)
    
})

//allure generate ./allure-results -o ./allure-report --clean
//allure open ./allure-report