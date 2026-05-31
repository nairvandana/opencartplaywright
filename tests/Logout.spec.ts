
import {test, expect} from '@playwright/test'
import { TestConfig } from '../test.config'
import { HomePage } from '../pages/HomePage'
import { MyAccountPage } from '../pages/MyAccountPage'
import { LoginPage } from '../pages/LoginPage'
import { LogoutPage } from '../pages/LogoutPage'

let config:TestConfig
let homepage:HomePage
let myaccountpage:MyAccountPage
let loginpage:LoginPage
let logoutpage:LogoutPage

test.beforeEach('Given_Declare all the objects and Login',async({page})=>{

    config = new TestConfig()
    homepage=  new HomePage(page)
    await homepage.clickmyAccount()
    loginpage = await homepage.clickLogin()
    myaccountpage = await loginpage.completeLogin(config.username,config.password)
    expect(await loginpage.isuccessfulLogin()).toBeTruthy()
})


test('Then_user logout of application',async()=>{

    expect(await myaccountpage.isMyAccountpresent()).toBeTruthy()
    logoutpage = await myaccountpage.LogOutOfapplication()
    let isloggedout = await logoutpage.iscontinuebuttonVisible()
    expect(isloggedout).toBeTruthy()

})