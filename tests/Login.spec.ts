import {test, expect} from '@playwright/test'
import { TestConfig } from '../test.config'
import { HomePage } from '../pages/HomePage'
import { RegistrationPage } from '../pages/RegistrationPage'
import { LoginPage } from '../pages/LoginPage'
import {MyAccountPage} from '../pages/MyAccountPage'
import { DataProvider } from '../utils/dataProvider'

let config:TestConfig
let homepage:HomePage
let registrationpage: RegistrationPage
let loginpage:LoginPage
let myAccountPage:MyAccountPage

const jsonData = DataProvider.getdatafromJson("./data/loginData.json")
const CSVData = DataProvider.getdatafromCSV("./data/loginData.csv")

test.beforeEach('Declare the objects', async({page})=>{
    //Open the url
    config = new TestConfig()
    await page.goto(config.appUrl)

    //Click Register link
    homepage = new HomePage(page)
    await homepage.clickmyAccount()
    await homepage.clickRegister()
    registrationpage = new RegistrationPage(page) 
    loginpage = new LoginPage(page)
    myAccountPage = new MyAccountPage(page)
})

test('Login with valid credentials @Master @Sanity @Regression',async()=>{
    await homepage.clickmyAccount()
    await homepage.clickLogin()
    await loginpage.completeLogin(config.username,config.password)
    let isSuccessfulLogin = await myAccountPage.isMyAccountpresent()
    expect(isSuccessfulLogin).toBe(true)   
})

//datadriven test scenario

for (const data of CSVData)
{
test(`Login Scenario with data from CSV:${data.testname} @datadriven`, async()=>{

    await homepage.clickmyAccount()
    await homepage.clickLogin()
    await loginpage.completeLogin(data.username,data.password)
    let isSuccessfulLogin = await myAccountPage.isMyAccountpresent()
    if(data.expected=="Success")
        expect(isSuccessfulLogin).toBeTruthy
    else
    {
        expect(await loginpage.getLoginErrorMessage()).toContain("No match for E-Mail Address and/or Password.")
        expect(isSuccessfulLogin).toBeFalsy       
    }        

})
}

for (const data of jsonData)
{
test(`Login Scenario with data from json:${data.testname} @datadriven`, async()=>{

    await homepage.clickmyAccount()
    await homepage.clickLogin()
    await loginpage.completeLogin(data.username,data.password)
    let isSuccessfulLogin = await myAccountPage.isMyAccountpresent()
    if(data.expected=="Success")
        expect(isSuccessfulLogin).toBeTruthy
    else
    {
        expect(await loginpage.getLoginErrorMessage()).toContain("No match for E-Mail Address and/or Password.")
        expect(isSuccessfulLogin).toBeFalsy       
    }        

})
}


