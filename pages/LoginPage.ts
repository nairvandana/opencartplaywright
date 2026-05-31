import {Page, expect, Locator} from '@playwright/test'
import { MyAccountPage } from './MyAccountPage'

export class LoginPage
{
    private readonly page:Page
    private readonly emailAddressTextbox:Locator
    private readonly passwordTextbox:Locator
    private readonly LoginButton:Locator
    private readonly LoginfailederrorMessage:Locator
    private readonly successLogintext:Locator

    constructor (page:Page)
    {
        this.page = page
        this.emailAddressTextbox = this.page.locator("#input-email")
        this.passwordTextbox = this.page.locator("#input-password")
        this.LoginButton = this.page.locator("input[value='Login']")
        this.LoginfailederrorMessage = this.page.locator("div.alert-danger")
        this.successLogintext = this.page.locator("#content h2")
    }

   async completeLogin(username:string, password:string):Promise<MyAccountPage>
   {
     await this.emailAddressTextbox.fill(username)
     await this.passwordTextbox.fill(password)
     await this.LoginButton.click()
     return new MyAccountPage(this.page)

   }

   async getLoginErrorMessage():Promise<string | null>
   {
    let message = await this.LoginfailederrorMessage.textContent()
    return message
   }


   async isuccessfulLogin():Promise<boolean>
   {
       const text = await this.successLogintext.textContent()
       if(text?.includes("My Account"))
        return true
      else
        return false
   }
}