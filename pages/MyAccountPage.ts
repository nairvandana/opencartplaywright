
import {Page, Locator} from '@playwright/test'
import { LogoutPage } from './LogoutPage'

export class MyAccountPage
{
     private readonly page:Page 
     private readonly myAccountTitle:Locator
     private readonly LogoutButton:Locator

     constructor(page:Page)
     {
        this.page = page
        this.myAccountTitle = this.page.locator("h2").filter({hasText:"My Account"})
        this.LogoutButton = this.page.getByRole('link', { name: 'Logout' })
     }
     
     async LogOutOfapplication():Promise<LogoutPage>
     {
        await this.LogoutButton.click()
        return new LogoutPage(this.page)
     }

     async isMyAccountpresent():Promise<boolean>
     {
        try 
        {
        let isitvisible = await this.myAccountTitle.isVisible()
        return  isitvisible
        }catch(error)
        {
            console.log(`Error with logging in to My Account: ${error}`)
            return false
        }

     }
}



